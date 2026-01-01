import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { prettier },
    rules: prettierConfig.rules,
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { Bun: 'readonly' },
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '*.lock'],
  },
];
