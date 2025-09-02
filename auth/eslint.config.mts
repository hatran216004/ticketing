import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

declare global {
  interface ImportMeta {
    readonly dirname: string;
  }
}

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname // FIX lỗi path
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: true,
          tabWidth: 2,
          trailingComma: 'none',
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
];
