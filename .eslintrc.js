module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/prefer-default-export': 0,
    'react/forbid-prop-types': 0,
    'prefer-destructuring': 1,
    'no-return-await': 1,
    'consistent-return': 1,
    'no-control-regex': 1,
    'no-useless-escape': 1,
    'no-unused-expressions': 1,
    'import/prefer-default-export ': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 1,
    'import/no-unresolved': 1,
    'no-prototype-builtins': 1,
    'vars-on-top': 1,
    'react/jsx-filename-extension': [
      0,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    "quotes": [
      "error",
      "single",
      { "avoidEscape": true, "allowTemplateLiterals": false }
    ],
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-return-await": 2,
    "no-unused-expressions": 0
  },
};
