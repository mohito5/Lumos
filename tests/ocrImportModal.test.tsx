import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Реальный i18next был бы тяжелее (весь data-locale materials-неймспейс) и
// не нужен для проверки самого поведения модалки — мокаем t() простым
// passthrough (defaultValue), как и в errorBoundary.test.tsx.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, arg2?: string | Record<string, unknown>, arg3?: Record<string, unknown>) => {
      // Поддерживаем обе формы: t(key, 'default') и t(key, 'default', {count}),
      // как реально вызывается в OcrImportModal.jsx (см. ocr.savedCount).
      let text: string;
      let interpolation: Record<string, unknown> | undefined;
      if (typeof arg2 === 'string') {
        text = arg2;
        interpolation = arg3;
      } else if (arg2 && typeof arg2 === 'object' && 'defaultValue' in arg2) {
        text = String(arg2.defaultValue);
        interpolation = arg2;
      } else {
        return key;
      }
      if (interpolation) {
        for (const [k, v] of Object.entries(interpolation)) {
          if (k !== 'defaultValue') text = text.replace(`{{${k}}}`, String(v));
        }
      }
      return text;
    },
  }),
}));

import OcrImportModal from '../src/features/profile/components/OcrImportModal';

const ALL_MATERIALS = [
  { id: 'mora', icon: '/mora.png', rarity: 1, type: 'common_currencies' },
  { id: 'crystal-core', icon: '/crystal.png', rarity: 3, type: 'character_weapon_enhancement' },
];

function baseProps(overrides: Record<string, unknown> = {}) {
  return {
    isOpen: true,
    onClose: vi.fn(),
    onProcess: vi.fn(),
    cvLoadingStatus: 'ready',
    ocrProgress: { progress: 0, status: '' },
    isProcessing: false,
    selectedFile: null,
    onFileChange: vi.fn(),
    onReset: vi.fn(),
    scanResult: null,
    allMaterials: ALL_MATERIALS,
    onConfirmScan: vi.fn(),
    onDiscardScan: vi.fn(),
    ...overrides,
  };
}

describe('OcrImportModal — экран загрузки (вариант A)', () => {
  it('показывает подсказку про сканирование по частям на основном экране', () => {
    render(<OcrImportModal {...baseProps()} />);
    expect(
      screen.getByText('Инвентарь большой — сканируйте по частям, результаты скана суммируются автоматически.'),
    ).toBeInTheDocument();
  });
});

describe('OcrImportModal — экран проверки результата (вариант C)', () => {
  function reviewProps(overrides: Record<string, unknown> = {}) {
    return baseProps({
      ocrProgress: { progress: 100, status: 'Готово. Метод: auto. Найдено: 2 видов материалов.' },
      scanResult: { mora: 158, 'crystal-core': 5 },
      ...overrides,
    });
  }

  it('показывает найденные строки с их количествами', () => {
    render(<OcrImportModal {...reviewProps()} />);
    expect(screen.getByText('Проверьте результат')).toBeInTheDocument();
    expect(screen.getByDisplayValue('158')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('не вызывает onConfirmScan сразу — ждёт явного подтверждения', () => {
    const onConfirmScan = vi.fn();
    render(<OcrImportModal {...reviewProps({ onConfirmScan })} />);
    expect(onConfirmScan).not.toHaveBeenCalled();
  });

  it('позволяет вручную поправить количество перед сохранением', () => {
    const onConfirmScan = vi.fn();
    render(<OcrImportModal {...reviewProps({ onConfirmScan })} />);

    const moraInput = screen.getByDisplayValue('158');
    fireEvent.change(moraInput, { target: { value: '200' } });

    fireEvent.click(screen.getByText('Сохранить в инвентарь'));

    expect(onConfirmScan).toHaveBeenCalledWith({ mora: 200, 'crystal-core': 5 });
  });

  it('позволяет убрать ложно распознанную строку перед сохранением', () => {
    const onConfirmScan = vi.fn();
    render(<OcrImportModal {...reviewProps({ onConfirmScan })} />);

    fireEvent.click(screen.getAllByTitle('Убрать из результата')[0]);
    fireEvent.click(screen.getByText('Сохранить в инвентарь'));

    expect(onConfirmScan).toHaveBeenCalledWith({ 'crystal-core': 5 });
  });

  it('кнопка "Отменить" отклоняет результат и возвращает к экрану загрузки', () => {
    const onDiscardScan = vi.fn();
    const onFileChange = vi.fn();
    render(<OcrImportModal {...reviewProps({ onDiscardScan, onFileChange })} />);

    fireEvent.click(screen.getByText('Отменить'));

    expect(onDiscardScan).toHaveBeenCalled();
    expect(onFileChange).toHaveBeenCalledWith(null);
  });
});

describe('OcrImportModal — экран "Готово" с кнопкой "Сканировать ещё" (вариант B)', () => {
  it('после подтверждения показывает кнопку "Сканировать ещё" рядом с "Закрыть", не требуя переоткрывать модалку', () => {
    const props = baseProps({
      ocrProgress: { progress: 100, status: 'Готово.' },
      scanResult: { mora: 158 },
    });
    render(<OcrImportModal {...props} />);

    fireEvent.click(screen.getByText('Сохранить в инвентарь'));

    expect(screen.getByText('Сохранено в инвентарь: 1 видов материалов.')).toBeInTheDocument();
    expect(screen.getByText('Сканировать ещё')).toBeInTheDocument();
    expect(screen.getByText('Закрыть')).toBeInTheDocument();
  });

  it('"Сканировать ещё" сбрасывает файл и результат, не закрывая модалку', () => {
    const onClose = vi.fn();
    const onFileChange = vi.fn();
    const props = baseProps({
      ocrProgress: { progress: 100, status: 'Готово.' },
      scanResult: { mora: 158 },
      onClose,
      onFileChange,
    });
    render(<OcrImportModal {...props} />);

    fireEvent.click(screen.getByText('Сохранить в инвентарь'));
    fireEvent.click(screen.getByText('Сканировать ещё'));

    expect(onClose).not.toHaveBeenCalled();
    expect(onFileChange).toHaveBeenCalledWith(null);
  });
});

describe('OcrImportModal — скан без результата (0 найдено)', () => {
  it('показывает простой экран "Готово" без экрана проверки, когда scanResult отсутствует', () => {
    const props = baseProps({
      ocrProgress: { progress: 100, status: 'Готово. Материалы не найдены.' },
      scanResult: null,
    });
    render(<OcrImportModal {...props} />);
    expect(screen.getByText('Готово. Материалы не найдены.')).toBeInTheDocument();
    expect(screen.queryByText('Проверьте результат')).not.toBeInTheDocument();
  });
});
