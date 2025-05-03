import eslint from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    // might be able to find a way to not ignore some of these but i just ignore them
    ignores: [
      '**/dist',
      '**/vite.config.ts',
      'tailwind.config.js',
      'eslint.config.mjs',
      'postcss.config.js'
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json'], // <-- this file exists in vite projects, otherwise just use tsconfig.json
        tsconfigRootDir: import.meta.dirname,
        
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.stylisticTypeChecked,
  // ...tseslint.configs.strictTypeChecked, // <-- most important line, max strictness. if any of th rules don't work for your codebase as being too strict, disable them one by one, but it is worth trying to crank up strictness to max
  importPlugin.flatConfigs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'react-hooks': eslintPluginReactHooks,
    },
    rules: eslintPluginReactHooks.configs.recommended.rules,
  },
  {
    rules: {
      'prettier/prettier': ["error", {
        'printWidth': 80,
        'tabWidth': 2,
        'singleQuote': false,
        'trailingComma': 'all',
        'arrowParens': 'always',
        'semi': true,
        'endOfLine': 'auto',
      }],
      "@typescript-eslint/no-unsafe-assignment": "off",
      // allow console.warn and console.error, but not console.log. personal pref
      'no-console': [
        'warn',
        {
          allow: ['error', 'warn'],
        },
      ],
      
      // force use of curly brackts on if statements
      curly: 'error',
      
      // force space after comments
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],
      
      // prefer template strings over string appends
      'prefer-template': 'error',

      
      // if you use 'new jsx transform' don't have to import React from 'react'
      'react/react-in-jsx-scope': 'off',
      
      

      // take it or leave it, it sorts and organizes import statements
      // there might be other ways but this prevents me from manually fiddling with order
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          named: true,
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
          },
          groups: [
            'builtin',
            ['external', 'internal'],
            ['parent', 'sibling', 'index', 'object'],
            'type',
          ],
          pathGroups: [
            {
              group: 'builtin',
              pattern: 'react',
              position: 'before',
            },
            {
              group: 'external',
              pattern: '@mui/icons-material',
              position: 'after',
            },
          ],

          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
    },
  },
)