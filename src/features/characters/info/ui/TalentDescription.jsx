import '../styles/TalentDescription.css';

const ELEMENTS = {
  pyro: ['pyro', 'пиро'],
  hydro: ['hydro', 'гидро'],
  cryo: ['cryo', 'крио'],
  electro: ['electro', 'электро'],
  anemo: ['anemo', 'анемо'],
  geo: ['geo', 'гео'],
  dendro: ['dendro', 'дендро', 'дэндро'],
  physical: [
    'physical',
    'физический',
    'физического',
    'физическому',
    'физическим',
  ],
};

const DAMAGE_WORDS = [
  'damage',
  'dmg',
  'урон',
  'урона',
  'урону',
  'уроном',
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function createPattern() {
  const names = Object.values(ELEMENTS)
    .flat()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|');

  const damageWords = DAMAGE_WORDS
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|');

  /*
    Сначала пытаемся найти:
    
    Anemo DMG
    Анемо урон
    Pyro Damage
    
    А если рядом нет слова урона —
    просто:
    
    Anemo
    Анемо
  */

  return new RegExp(
    `(?<!\\p{L})(${names})(?:\\s+(${damageWords}))?(?!\\p{L})`,
    'giu'
  );
}

const ELEMENT_PATTERN = createPattern();

function getElement(text) {
  const normalized = text.toLowerCase();

  for (const [element, names] of Object.entries(ELEMENTS)) {
    if (
      names.some(
        (name) => normalized === name.toLowerCase()
      )
    ) {
      return element;
    }
  }

  return null;
}

function renderDescription(text) {
  const result = [];

  let currentIndex = 0;
  let match;
  let index = 0;

  ELEMENT_PATTERN.lastIndex = 0;

  while ((match = ELEMENT_PATTERN.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;

    // Обычный текст
    if (currentIndex < start) {
      result.push(text.slice(currentIndex, start));
    }

    const matchedText = match[0];

    // Первый capture group — название элемента
    const elementName = match[1];

    const element = getElement(elementName);

    if (element) {
      result.push(
        <span
          key={`element-${index}`}
          className={`talent-description__element talent-description__element--${element}`}
        >
          {matchedText}
        </span>
      );
    } else {
      result.push(matchedText);
    }

    currentIndex = end;
    index++;
  }

  // Остаток текста
  if (currentIndex < text.length) {
    result.push(text.slice(currentIndex));
  }

  return result;
}

export default function TalentDescription({ text }) {
  if (!text) return null;

  return (
    <p className="talent-description">
      {renderDescription(text)}
    </p>
  );
}