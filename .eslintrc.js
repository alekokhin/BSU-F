module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  plugins: ['simple-import-sort', 'testing-library'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:security/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
  ],
  rules: {
    'no-console': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          kebabCase: true,
        },
      },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/new-for-builtins': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': ['error', 5],
    'security/detect-object-injection': 'off',
    'jsx-a11y/no-autofocus': 'off',
    // For Windows OS!
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      env: {
        'jest/globals': true,
      },
      // A subset of the recommended rules:
      rules: {
        // https://github.com/jest-community/eslint-plugin-jest
        'jest/no-conditional-expect': 'error',
        'jest/no-identical-title': 'error',
        'jest/no-interpolation-in-snapshots': 'error',
        'jest/no-jasmine-globals': 'error',
        'jest/no-jest-import': 'error',
        'jest/no-mocks-import': 'error',
        'jest/valid-describe': 'error',
        'jest/valid-expect': 'error',
        'jest/valid-expect-in-promise': 'error',
        'jest/valid-title': 'warn',

        // https://github.com/testing-library/eslint-plugin-testing-library
        'testing-library/await-async-query': 'error',
        'testing-library/await-async-utils': 'error',
        'testing-library/no-await-sync-query': 'warn',
        'testing-library/no-dom-import': ['error', 'react'],
        'testing-library/no-wait-for-empty-callback': 'error',
        'testing-library/no-wait-for-snapshot': 'error',
      },
    },
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: ['@typescript-eslint'],
      // If adding a typescript-eslint version of an existing ESLint rule,
      // make sure to disable the ESLint rule here.
      rules: {
        // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
        'default-case': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
        'no-dupe-class-members': 'off',
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        'no-undef': 'off',

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        '@typescript-eslint/consistent-type-assertions': 'warn',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'warn',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'warn',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false,
          },
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn',
      },
    },
  ],
}
