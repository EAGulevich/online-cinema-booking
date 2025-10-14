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
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        map: [
          ['@components', './src/components'],
          ['@queryOptions', './src/queryOptions'],
          ['@config', './src/config'],
          ['@routes', './src/routes'],
        ],
      },
    },
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
              pattern: '@assets/**',
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
]);
