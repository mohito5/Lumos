import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// withTranslation оборачивает класс-компонент в HOC, которому в норме нужен
// I18nextProvider выше по дереву. Полноценный i18n-config.js тянет ~344KB
// data-locales (см. Performance-раздел аудита) — совершенно не нужно для
// теста самого ErrorBoundary, которому важно только что t(key, fallback)
// возвращает fallback. Мокаем HOC простым passthrough.
vi.mock('react-i18next', () => ({
  withTranslation: () => (Component: React.ComponentType<Record<string, unknown>>) =>
    function Wrapped(props: Record<string, unknown>) {
      return <Component {...props} t={(_key: string, fallback?: string) => fallback ?? _key} />;
    },
}));

vi.mock('../src/core/services/errorTracking', () => ({
  captureError: vi.fn(),
}));

import ErrorBoundary from '../src/shared/ui/errors/ErrorBoundary';
import { captureError } from '../src/core/services/errorTracking';

/** Бросает при рендере, если shouldThrow — стандартный способ протестировать ErrorBoundary. */
function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('тестовый сбой');
  return <div>всё хорошо</div>;
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('рендерит children как есть, когда потомок не падает', () => {
    render(
      <ErrorBoundary>
        <div>привет</div>
      </ErrorBoundary>,
    );
    expect(screen.getByText('привет')).toBeInTheDocument();
  });

  it('перехватывает ошибку рендера потомка и показывает фолбэк вместо краша дерева', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {}); // React сам шумит в консоль при ошибке — глушим
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument();
    expect(screen.queryByText('всё хорошо')).not.toBeInTheDocument();
    spy.mockRestore();
  });

  it('показывает сообщение упавшей ошибки', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('тестовый сбой')).toBeInTheDocument();
    spy.mockRestore();
  });

  it('вызывает captureError с самой ошибкой и componentStack в контексте (мониторинг, см. errorTracking.ts)', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(captureError).toHaveBeenCalledTimes(1);
    const [errArg, contextArg] = vi.mocked(captureError).mock.calls[0];
    expect((errArg as Error).message).toBe('тестовый сбой');
    expect(contextArg).toHaveProperty('componentStack');
    spy.mockRestore();
  });

  it('кнопка "Попробовать снова" сбрасывает состояние ошибки, позволяя новому дереву отрендериться', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { rerender } = render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument();

    // Раз ошибка уже поймана — дальнейшие rerender с новыми children сами по
    // себе фолбэк не уберут (render() смотрит на state.hasError раньше
    // props.children). Меняем children на нерабочий сценарий ДО клика, чтобы
    // проверить именно сброс state, а не "повезло, что React перемонтировал".
    rerender(
      <ErrorBoundary>
        <Bomb shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument(); // всё ещё фолбэк — state не менялся

    fireEvent.click(screen.getByText('Попробовать снова'));
    expect(screen.getByText('всё хорошо')).toBeInTheDocument();
    expect(screen.queryByText('Что-то пошло не так')).not.toBeInTheDocument();
    spy.mockRestore();
  });

  it('кнопка "На главную" сбрасывает состояние ошибки и переводит хэш-роут на "/"', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    window.location.hash = '#/some/deep/page';
    render(
      <ErrorBoundary>
        <Bomb shouldThrow />
      </ErrorBoundary>,
    );
    fireEvent.click(screen.getByText('← На главную'));
    expect(window.location.hash).toBe('#/');
    spy.mockRestore();
  });
});
