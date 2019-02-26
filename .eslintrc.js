module.exports = {
  env: {
    browser: true,
    es6: true,
    jasmine: true,
  },
  extends: ['airbnb', 'plugin:jasmine/recommended'],
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
    'jasmine',
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
