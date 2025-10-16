import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        map: [
          ['@components', './src/components'],
          ['@generatedApi', './src/generated'],
          ['@providers', './src/providers'],
          ['@utils', './src/utils'],
          ['@hooks', './src/hooks'],
          ['@config', './src/config'],
          ['@routes', './src/routes'],
        ],
      },
    },
    ignores: ['src/generated/**'],
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-dom',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-router**',
              group: 'external',
              position: 'before',
            },
            // Другие React-библиотеки
            {
              pattern: 'react-*',
              group: 'external',
              position: 'before',
            },
            // Ваши внутренние алиасы
            {
              pattern: '@generatedApi/**',
              group: 'internal',
            },
            {
              pattern: '@components/**',
              group: 'internal',
            },
            {
              pattern: '@config/**',
              group: 'internal',
            },
            {
              pattern: '@routes/**',
              group: 'internal',
            },
            {
              pattern: '@utils/**',
              group: 'internal',
            },
            {
              pattern: '@providers/**',
              group: 'internal',
            },
            {
              pattern: '@hooks/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          distinctGroup: false,
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'import/order': 'off', // Отключаем правило порядка импортов для тестов
    },
  },
]);
