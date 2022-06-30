module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off', // import of react no longer required
    'tailwindcss/classnames-order': 'off', // conflicts with official prettier-plugin-tailwindcss and tailwind v3
    // set more strict to highlight in editor
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/migration-from-tailwind-2': 'error',
    'no-unused-expressions': 'error',
    'react/self-closing-comp': 'error',
    'no-implicit-coercion': 'error',
    'react/no-unescaped-entities': 'off',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-const': 'error',
    'prefer-destructuring': ['error', { object: true }],
    'prefer-template': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    '@typescript-eslint/array-type': ['error', { readonly: 'generic' }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],
    'tailwindcss/no-custom-classname': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
  },
  settings: {
    tailwindcss: {
      config: 'tailwind.config.cjs',
      whitelist: [
        'aa-ItemLink',
        'aa-ItemContent',
        'aa-ItemContentBody',
        'aa-ItemContentTitle',
        'aa-ItemContentSubtitle',
        'aa-SourceHeader',
        'aa-SourceHeaderTitle',
      ],
    },
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['postcss.config.js', 'rollup.config.js', 'scripts/canary-release.js'],
      env: {
        node: true,
      },
    },
  ],
};
