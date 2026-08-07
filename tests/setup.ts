// Регистрирует jest-dom матчеры (toBeInTheDocument, toHaveTextContent и т.д.)
// для тестов React-компонентов через @testing-library/react. Используем
// именно /vitest-энтрипоинт (не голый '@testing-library/jest-dom') — он
// расширяет expect из самого vitest, а не глобальный jest-style expect,
// которого при globals:false в этом проекте нет.
import '@testing-library/jest-dom/vitest';

// @testing-library/react сам чистит DOM между тестами через afterEach при
// globals:true, но у нас globals:false — регистрируем cleanup вручную.
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
