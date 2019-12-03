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
    'arrow-parens': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
  },
  overrides: [
    {
      files: '*.test.js',
      rules: {
        'no-console': 0,
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-underscore-dangle': 0,
        'no-unused-expressions': 0,
      },
    },
  ],
};
