module.exports = {
  env: {
    "test": {
      plugins: [
        'istanbul',
      ],
    },
  },
  plugins: [
    ['@babel/plugin-transform-react-jsx', {
      pragma: 'h'
    }],
  ],
  presets: [
    '@babel/preset-env',
  ],
};
