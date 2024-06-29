module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: 'current', 'jest/globals': true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
  ],
  overrides: [
    {
      files: ['**__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'jest'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'jest/no-focused-tests': 'off',
  },
};
