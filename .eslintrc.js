module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  plugins: ['jest', 'prettier', '@typescript-eslint'],
  extends: [
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
