module.exports = {
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
      experimentalObjectRestSpread: true
    },
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended'
  ],
  plugins: [
    'react',
    'react-native'
  ],
  rules: {
    'comma-dangle': 0,
    'radix': 0,
    'global-require': 1,
    'no-nested-ternary': 0,
    'no-return-assign': 0,
    'react/require-default-props': 0,
    'react/prefer-stateless-function': 0,
    'function-paren-newline': 0,
    'import/prefer-default-export': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'arrow-body-style': 'warn',
    'no-console': 0,
    'react/prop-types': 0,
    'react/no-string-refs': 0,
    'no-undef': 'error',
    'linebreak-style': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': ["error", { devDependencies: true }],
    'react/no-did-mount-set-state': 0,
    'react/sort-comp': 0,
    "no-param-reassign": 0,
    'implicit-arrow-linebreak': 0
  },
  globals: {
    "__DEV__": [true, true]
  }
}
