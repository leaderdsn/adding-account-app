import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'

export default [
  {
    ignores: [
      'node_modules/**',
      '.history/**',
      'dist/**',
      '*.min.js',
      'coverage/**',
      '*.log',
      '.env*',
      '**/*.d.ts'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      vue
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-components': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/require-default-prop': 'off',
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          ignores: [
            'a-',
            'ant-',
            'router-link',
            'router-view',
            'transition',
            'keep-alive'
          ]
        }
      ]
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        },
        alias: {
          map: [
            ['@', './src']
          ],
          extensions: ['.ts', '.vue', '.js']
        }
      }
    }
  }
]