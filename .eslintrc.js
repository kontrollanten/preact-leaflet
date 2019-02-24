module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    react: {
      pragma: 'h',
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'jest',
    'react',
  ],
  rules: {
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
  },
  overrides: [
    {
      files: '*.test.js',
      rules: {
        'no-underscore-dangle': 0,
        'no-unused-expressions': 0,
      },
    },
  ],
};
