// ============================================================================
// DigitCalibrationPage.tsx — dev-инструмент: (1) визуализация пайплайна
// детекции с ИНТЕРАКТИВНОЙ настройкой границ областей (включая сам
// контейнер, не только под-области внутри него) и (2) сборка шаблонов цифр.
//
// НЕ линкуется из основного UI — открывается вручную по адресу
// #/dev/digit-calibration.
//
// ИСТОРИЯ НАХОДОК (чтобы понимать, зачем именно эти ползунки):
//   - Проценты icon/stars/number, подобранные по одним примерам, не
//     подошли для других (5★ гемма) — сделаны ползунками, тюнятся вживую.
//   - Оказалось, что дело не только в под-областях: сам контейнер (84% от
//     ячейки, отступы 8%/8%) обрезался СНИЗУ раньше, чем заканчивалось
//     число — то есть данных для числа физически не было в кропе, никакая
//     настройка процентов ВНУТРИ контейнера это не спасала. Теперь границы
//     самого контейнера тоже ползунки.
//   - Экстраполированная сетка иногда достаёт до шапки/панели описания —
//     добавлен индикатор "похоже на карточку материала" (доля золотых
//     пикселей в полосе звёзд — у шапки/панели их нет).
// ============================================================================

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useCvStatus } from '../../context/CvLoaderContext';
import { loadImageToMat, safeDeleteAll, binarizeAutoPolarity } from './utils/opencv/mat-utils';
import { autoDetectContainers, detectSingleContainer, goldPixelFraction, MIN_GOLD_FRACTION } from './utils/opencv/auto-detection';
import { detectSlots } from './utils/opencv/grid-detection';
import { segmentGlyphs, extractGlyph } from './utils/opencv/digit-matching';
import { ocrLog } from './utils/opencv/ocr-logger';
import type { CvMat, SlotRect } from './types/inventory.types';

interface GlyphItem {
  id: string;
  dataUrl: string;
  label: string;
  sourceCell: string;
}

interface CellInfo {
  index: number;
  slot: SlotRect; // абсолютные координаты в исходном скриншоте
  brightness: number;
}

interface RegionPercents {
  containerTop: number;
  containerBottom: number;
  iconH: number;
  starsY: number;
  starsH: number;
  numY: number;
  numH: number;
}

// Откалибровано 2026-07 на реальных скриншотах (5★/3★/2★ редкости) —
// см. те же значения в useOcrProcess.ts и digit-matching.ts. Если позже
// понадобится перекалибровать — двигай ползунки от этой точки, а не с нуля.
const DEFAULT_PCT: RegionPercents = {
  containerTop: 5, containerBottom: 97,
  iconH: 70, starsY: 70, starsH: 17, numY: 86, numH: 14,
};

const matToDataUrl = (mat: CvMat): string => {
  const canvas = document.createElement('canvas');
  window.cv.imshow(canvas, mat);
  return canvas.toDataURL('image/png');
};

const offsetRect = (base: SlotRect, local: SlotRect): SlotRect => ({
  x: base.x + local.x,
  y: base.y + local.y,
  width: local.width,
  height: local.height,
});

/** Считает container из slot, затем icon/stars/number из container — всё по текущим %. */
const computeRegions = (slot: SlotRect, pct: RegionPercents) => {
  const top = Math.round(slot.height * (pct.containerTop / 100));
  const bottom = Math.round(slot.height * (pct.containerBottom / 100));
  const container = offsetRect(slot, { x: Math.round(slot.width * 0.08), y: top, width: Math.round(slot.width * 0.84), height: Math.max(1, bottom - top) });

  const CH = container.height;
  const CW = container.width;
  const iconH = Math.round(CH * (pct.iconH / 100));
  const starsY = Math.round(CH * (pct.starsY / 100));
  const starsH = Math.round(CH * (pct.starsH / 100));
  const numY = Math.round(CH * (pct.numY / 100));
  const numH = Math.min(Math.round(CH * (pct.numH / 100)), CH - numY);

  return {
    container,
    icon: offsetRect(container, { x: 0, y: 0, width: CW, height: iconH }),
    stars: offsetRect(container, { x: 0, y: starsY, width: CW, height: Math.max(0, starsH) }),
    number: offsetRect(container, { x: 0, y: numY, width: CW, height: Math.max(0, numH) }),
    numYLocal: numY,
    numHLocal: Math.max(0, numH),
    starsYLocal: starsY,
    starsHLocal: Math.max(0, starsH),
  };
};

/** Доля золотых пикселей — JS/Canvas-версия (без OpenCV) для превью в UI. */
const goldFractionFromCanvas = (img: HTMLImageElement, region: SlotRect): number => {
  if (region.width <= 0 || region.height <= 0) return 0;
  const canvas = document.createElement('canvas');
  canvas.width = region.width;
  canvas.height = region.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;
  ctx.drawImage(img, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height);
  const data = ctx.getImageData(0, 0, region.width, region.height).data;
  let gold = 0;
  const total = region.width * region.height;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const v = max;
    const s = max === 0 ? 0 : (max - min) / max;
    let h = 0;
    if (max !== min) {
      if (max === r) h = 60 * (((g - b) / (max - min)) % 6);
      else if (max === g) h = 60 * ((b - r) / (max - min) + 2);
      else h = 60 * ((r - g) / (max - min) + 4);
    }
    if (h < 0) h += 360;
    // золотой/жёлтый: hue ~30-70°, насыщенный, яркий
    if (h >= 30 && h <= 70 && s >= 0.35 && v >= 140) gold++;
  }
  return total > 0 ? gold / total : 0;
};

const REGION_COLORS = {
  slot: '#22c55e',
  container: '#38bdf8',
  icon: '#a78bfa',
  stars: '#facc15',
  number: '#ef4444',
};

const DigitCalibrationPage: React.FC = () => {
  const { status: cvStatus, ensureLoaded } = useCvStatus();
  useEffect(() => {
    ensureLoaded();
  }, [ensureLoaded]);

  const imgRef = useRef<HTMLImageElement>(null);
  const overviewCanvasRef = useRef<HTMLCanvasElement>(null);
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);

  const [tab, setTab] = useState<'regions' | 'digits'>('regions');
  const [pct, setPct] = useState<RegionPercents>(DEFAULT_PCT);
  const [glyphs, setGlyphs] = useState<GlyphItem[]>([]);
  const [cells, setCells] = useState<CellInfo[]>([]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
  const [goldInfo, setGoldInfo] = useState<{ fraction: number; passes: boolean } | null>(null);

  const processFile = useCallback(async (file: File) => {
    if (!imgRef.current || !window.cv?.imread) return;
    setIsProcessing(true);
    setGlyphs([]);
    setCells([]);
    setSelectedCell(null);
    setImgLoaded(false);
    const url = URL.createObjectURL(file);
    let mainMat: CvMat | null = null;

    try {
      await new Promise<void>((res, rej) => {
        if (!imgRef.current) return rej(new Error('imgRef не найден'));
        imgRef.current.onload = () => res();
        imgRef.current.onerror = () => rej(new Error('Изображение не загрузилось'));
        imgRef.current.src = url;
      });
      setImgLoaded(true);

      mainMat = await loadImageToMat(imgRef.current);
      const mat: CvMat = mainMat;
      const SW = mat.cols;
      const SH = mat.rows;

      let slots = autoDetectContainers(mat);
      let method = slots.length > 0 ? 'auto' : 'none';
      if (slots.length === 0) {
        const single = detectSingleContainer(mat);
        if (single) { slots = [single]; method = 'single'; }
      }
      if (slots.length === 0) {
        const fb = detectSlots(SW, SH, null);
        slots = fb.slots;
        method = fb.method;
      }

      const collectedCells: CellInfo[] = [];
      for (let i = 0; i < slots.length; i++) {
        const slotRaw = slots[i];
        const sx = Math.max(0, Math.round(slotRaw.x));
        const sy = Math.max(0, Math.round(slotRaw.y));
        const sw = Math.min(Math.round(slotRaw.width), SW - sx);
        const sh = Math.min(Math.round(slotRaw.height), SH - sy);
        if (sw <= 10 || sh <= 10) continue;
        const slot: SlotRect = { x: sx, y: sy, width: sw, height: sh };

        const slotMat = mat.roi(new window.cv.Rect(sx, sy, sw, sh)).clone();
        const brightness = window.cv.mean(slotMat)[2];
        collectedCells.push({ index: i, slot, brightness });
        slotMat.delete();
      }

      setCells(collectedCells);
      setStats(`Метод: ${method}. Ячеек: ${slots.length}. Настрой ползунки, потом «Пересчитать символы».`);
      ocrLog.info('calibration', `метод=${method}, ${collectedCells.length} ячеек`);
    } catch (e) {
      ocrLog.error('calibration', 'ошибка обработки', e);
      setStats(`Ошибка: ${String(e)}`);
    } finally {
      if (mainMat) safeDeleteAll(mainMat);
      URL.revokeObjectURL(url);
      setIsProcessing(false);
    }
  }, []);

  const recomputeGlyphs = useCallback(async () => {
    if (!imgRef.current || cells.length === 0) return;
    setIsProcessing(true);
    let mainMat: CvMat | null = null;
    try {
      mainMat = await loadImageToMat(imgRef.current);
      const mat: CvMat = mainMat;
      const collected: GlyphItem[] = [];
      let counter = 0;
      let rejectedByGold = 0;

      for (const cell of cells) {
        if (cell.brightness < 20) continue;
        const { container, numYLocal, numHLocal, stars } = computeRegions(cell.slot, pct);
        if (numHLocal < 3) continue;

        const containerMat = mat.roi(new window.cv.Rect(container.x, container.y, container.width, container.height)).clone();

        // Тот же фильтр "похоже на карточку материала", что и в реальном пайплайне.
        const starsLocalMat = containerMat.roi(new window.cv.Rect(0, stars.y - container.y, container.width, stars.height || 1)).clone();
        const gold = goldPixelFraction(starsLocalMat);
        starsLocalMat.delete();
        if (gold < MIN_GOLD_FRACTION) {
          rejectedByGold++;
          containerMat.delete();
          continue;
        }

        const stripRgba = containerMat.roi(new window.cv.Rect(0, numYLocal, container.width, numHLocal)).clone();
        const gray = new window.cv.Mat();
        window.cv.cvtColor(stripRgba, gray, window.cv.COLOR_RGBA2GRAY);
        const binary = binarizeAutoPolarity(gray);

        const rects = segmentGlyphs(binary);
        for (const rect of rects) {
          const glyphMat = extractGlyph(binary, rect);
          counter++;
          collected.push({
            id: `g${counter}`,
            dataUrl: matToDataUrl(glyphMat),
            label: '',
            sourceCell: `#${cell.index + 1} (${cell.slot.x},${cell.slot.y})`,
          });
          glyphMat.delete();
        }
        safeDeleteAll(containerMat, stripRgba, gray, binary);
      }

      setGlyphs(collected);
      setStats(`Символов: ${collected.length}. Отброшено фильтром "не похоже на материал": ${rejectedByGold}.`);
    } catch (e) {
      ocrLog.error('calibration', 'ошибка пересчёта глифов', e);
    } finally {
      if (mainMat) safeDeleteAll(mainMat);
      setIsProcessing(false);
    }
  }, [cells, pct]);

  useEffect(() => {
    if (!imgLoaded || !imgRef.current || cells.length === 0) return;
    const canvas = overviewCanvasRef.current;
    if (!canvas) return;
    const img = imgRef.current;
    const maxW = 900;
    const scale = img.naturalWidth > maxW ? maxW / img.naturalWidth : 1;
    canvas.width = img.naturalWidth * scale;
    canvas.height = img.naturalHeight * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (const cell of cells) {
      const isSelected = cell.index === selectedCell;
      ctx.strokeStyle = isSelected ? '#f97316' : REGION_COLORS.slot;
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.strokeRect(cell.slot.x * scale, cell.slot.y * scale, cell.slot.width * scale, cell.slot.height * scale);
      ctx.fillStyle = isSelected ? '#f97316' : '#22c55e';
      ctx.font = '10px monospace';
      ctx.fillText(String(cell.index + 1), cell.slot.x * scale + 2, cell.slot.y * scale + 11);
    }
  }, [cells, selectedCell, imgLoaded]);

  const handleOverviewClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = overviewCanvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || cells.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / img.naturalWidth;
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width / scale;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height / scale;
    const hit = cells.find(c =>
      clickX >= c.slot.x && clickX <= c.slot.x + c.slot.width &&
      clickY >= c.slot.y && clickY <= c.slot.y + c.slot.height,
    );
    setSelectedCell(hit ? hit.index : null);
  };

  useEffect(() => {
    if (selectedCell === null || !imgRef.current) return;
    const cell = cells.find(c => c.index === selectedCell);
    const canvas = zoomCanvasRef.current;
    if (!cell || !canvas) return;
    const img = imgRef.current;

    const ZOOM = 4;
    canvas.width = cell.slot.width * ZOOM;
    canvas.height = cell.slot.height * ZOOM;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, cell.slot.x, cell.slot.y, cell.slot.width, cell.slot.height, 0, 0, canvas.width, canvas.height);

    const { container, icon, stars, number } = computeRegions(cell.slot, pct);
    const drawRegion = (region: SlotRect, color: string, label: string) => {
      if (region.height <= 0) return;
      const rx = (region.x - cell.slot.x) * ZOOM;
      const ry = (region.y - cell.slot.y) * ZOOM;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(rx, ry, region.width * ZOOM, region.height * ZOOM);
      ctx.fillStyle = color;
      ctx.font = 'bold 11px monospace';
      ctx.fillText(label, rx + 2, ry - 3 < 10 ? ry + 12 : ry - 3);
    };
    drawRegion(container, REGION_COLORS.container, 'container');
    drawRegion(icon, REGION_COLORS.icon, 'icon');
    drawRegion(stars, REGION_COLORS.stars, 'stars');
    drawRegion(number, REGION_COLORS.number, 'number');

    const fraction = goldFractionFromCanvas(img, stars);
    setGoldInfo({ fraction, passes: fraction >= MIN_GOLD_FRACTION });
  }, [selectedCell, cells, pct]);

  const updateLabel = (id: string, label: string) => {
    setGlyphs(prev => prev.map(g => (g.id === id ? { ...g, label: label.slice(0, 1) } : g)));
  };

  const labeledCount = glyphs.filter(g => g.label).length;

  const exportTemplates = () => {
    const labeled = glyphs.filter(g => g.label);
    const grouped: Record<string, string[]> = {};
    for (const g of labeled) {
      (grouped[g.label] ??= []).push(g.dataUrl);
    }
    const payload = { generatedAt: new Date().toISOString(), regionPercents: pct, templates: grouped };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'digit-templates-export.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const selectedCellInfo = cells.find(c => c.index === selectedCell);

  const slider = (key: keyof RegionPercents, label: string, min = 0, max = 100) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
      <span style={{ width: 100, fontSize: 12 }}>{label}</span>
      <input
        type="range" min={min} max={max} value={pct[key]}
        onChange={(e) => setPct(p => ({ ...p, [key]: Number(e.target.value) }))}
        style={{ width: 160 }}
      />
      <input
        type="number" min={min} max={max} value={pct[key]}
        onChange={(e) => setPct(p => ({ ...p, [key]: Number(e.target.value) }))}
        style={{ width: 50 }}
      />
      <span style={{ fontSize: 11, opacity: 0.6 }}>%</span>
    </div>
  );

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto', fontFamily: 'monospace' }}>
      <h2>Отладка OCR: сетка, области, шаблоны цифр</h2>
      <p style={{ opacity: 0.7, fontSize: 13 }}>cv статус: {cvStatus}</p>

      <img ref={imgRef} style={{ display: 'none' }} alt="" />

      <input
        type="file"
        accept="image/*"
        disabled={cvStatus !== 'ready' || isProcessing}
        onChange={(e) => { const file = e.target.files?.[0]; if (file) processFile(file); }}
      />

      {isProcessing && <p>Обработка...</p>}
      {stats && <p style={{ whiteSpace: 'pre-wrap' }}>{stats}</p>}

      {cells.length > 0 && (
        <>
          <div style={{ display: 'flex', gap: 8, margin: '16px 0 8px' }}>
            <button onClick={() => setTab('regions')} style={{ fontWeight: tab === 'regions' ? 'bold' : 'normal' }}>
              Сетка и области
            </button>
            <button onClick={() => setTab('digits')} style={{ fontWeight: tab === 'digits' ? 'bold' : 'normal' }}>
              Калибровка цифр
            </button>
          </div>

          {tab === 'regions' && (
            <div>
              <div style={{ background: '#f5f5f5', padding: 10, borderRadius: 6, marginBottom: 10, display: 'inline-block' }}>
                <div style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4 }}>Границы контейнера (от ячейки)</div>
                {slider('containerTop', 'верх')}
                {slider('containerBottom', 'низ')}
                <div style={{ fontSize: 11, fontWeight: 'bold', margin: '10px 0 4px' }}>Под-области (от контейнера)</div>
                {slider('iconH', 'icon высота')}
                {slider('starsY', 'stars начало')}
                {slider('starsH', 'stars высота')}
                {slider('numY', 'number начало')}
                {slider('numH', 'number высота')}
                <button onClick={recomputeGlyphs} disabled={isProcessing} style={{ marginTop: 6 }}>
                  Пересчитать символы с этими настройками →
                </button>
              </div>
              <p style={{ fontSize: 12, opacity: 0.7 }}>
                <span style={{ color: REGION_COLORS.container }}>■ контейнер</span>{' '}
                <span style={{ color: REGION_COLORS.icon }}>■ иконка</span>{' '}
                <span style={{ color: REGION_COLORS.stars }}>■ звёзды</span>{' '}
                <span style={{ color: REGION_COLORS.number }}>■ число</span>
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <canvas
                  ref={overviewCanvasRef}
                  onClick={handleOverviewClick}
                  style={{ border: '1px solid #444', cursor: 'pointer', maxWidth: '100%' }}
                />
                <div>
                  <canvas ref={zoomCanvasRef} style={{ border: '1px solid #444', imageRendering: 'pixelated' }} />
                  {selectedCellInfo && (
                    <div style={{ fontSize: 11, marginTop: 6, lineHeight: 1.6 }}>
                      <div>ячейка #{selectedCellInfo.index + 1}, slot ({selectedCellInfo.slot.x},{selectedCellInfo.slot.y}) {selectedCellInfo.slot.width}×{selectedCellInfo.slot.height}</div>
                      <div>яркость: {selectedCellInfo.brightness.toFixed(0)} {selectedCellInfo.brightness < 20 ? '(пусто, пропущено бы)' : ''}</div>
                      {goldInfo && (
                        <div style={{ color: goldInfo.passes ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                          золото в stars: {(goldInfo.fraction * 100).toFixed(1)}% — {goldInfo.passes ? 'похоже на материал ✓' : `НЕ похоже (нужно ≥${MIN_GOLD_FRACTION * 100}%)`}
                        </div>
                      )}
                    </div>
                  )}
                  {!selectedCellInfo && <p style={{ fontSize: 12, opacity: 0.6 }}>← кликни на ячейку</p>}
                </div>
              </div>
            </div>
          )}

          {tab === 'digits' && (
            <div>
              <div style={{ margin: '12px 0', display: 'flex', gap: 12, alignItems: 'center' }}>
                <button onClick={exportTemplates} disabled={labeledCount === 0}>
                  Скачать шаблоны ({labeledCount}/{glyphs.length} подписано)
                </button>
                <button onClick={recomputeGlyphs} disabled={isProcessing}>Пересчитать</button>
              </div>
              {glyphs.length === 0 && (
                <p style={{ opacity: 0.7 }}>
                  Символов нет. Настрой ползунки на вкладке "Сетка и области" и нажми там
                  «Пересчитать символы».
                </p>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 10 }}>
                {glyphs.map(g => (
                  <div key={g.id} style={{ border: '1px solid #444', padding: 6, borderRadius: 4, textAlign: 'center' }}>
                    <img loading="lazy" src={g.dataUrl} alt={g.id} style={{ width: '100%', imageRendering: 'pixelated', background: '#fff' }} />
                    <input
                      value={g.label}
                      onChange={(e) => updateLabel(g.id, e.target.value)}
                      placeholder="?"
                      maxLength={1}
                      style={{ width: 30, textAlign: 'center', marginTop: 4 }}
                      autoComplete="off"
                    />
                    <div style={{ fontSize: 9, opacity: 0.5 }}>{g.sourceCell}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DigitCalibrationPage;
