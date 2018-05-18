/* eslint-disable no-magic-numbers */

module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
  },
  'extends': 'eslint:all',
  // 'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module',
  },
  'rules': {
    'array-bracket-newline': [
      'warn',
      'never',
    ],
    'array-bracket-spacing': [
      'error',
      'never',
    ],
    'array-callback-return': [
      'error',

    ],
    'arrow-body-style': [
      'error',
    ],
    'arrow-parens': [
      'error',

    ],
    'arrow-spacing': [
      'error',
    ],
    'block-scoped-var': [
      'warn',
    ],
    'block-spacing': [
      'error',
    ],
    'brace-style': [
      'error',

    ],
    'camelcase': [
      'error',

    ],
    'capitalized-comments': [
      'warn',

    ],
    'comma-dangle': [
      'error',
      'always',
    ],
    'comma-spacing': [
      'warn',
      {
        'after': true,
        'before': false,
      },

    ],
    'comma-style': [
      'warn',
    ],
    'consistent-return': [
      'error',
      {
        'treatUndefinedAsUnspecified': true,
      },
    ],
    'curly': [
      'warn',
      'all',
    ],
    'default-case': [
      'error',
    ],
    'dot-location': [
      'error',
      'property',
    ],
    'dot-notation': [
      'warn',
    ],
    'eol-last': [
      'warn',

    ],
    'eqeqeq': [
      'error',

    ],
    'func-names': [
      'error',
    ],
    'func-style': [
      'warn',
      'declaration',
    ],
    'global-require': [
      'error',

    ],
    'id-length': [
      'off',
    ],
    'indent': [
      'error',
      2,

    ],
    'linebreak-style': [
      'error',
      'unix',

    ],
    'max-len': [
      'off',
    ],
    'multiline-ternary': [
      'warn',
      'never',

    ],
    'new-cap': [
      'warn',

    ],
    'new-parens': [
      'error',
    ],
    'no-catch-shadow': [
      'error',
    ],
    'no-console': 'off',
    'no-else-return': [
      'error',
    ],
    'no-empty-function': [
      'error',
    ],
    'no-extra-parens': [
      'error',
    ],
    'no-lonely-if': [
      'error',

    ],
    'no-magic-numbers': [
      'warn',

    ],
    'no-mixed-operators': [
      'error',
    ],
    'no-multi-spaces': [
      'warn',
    ],
    'no-return-assign': [
      'error',
    ],
    'no-sequences': [
      'warn',
    ],
    'no-shadow': [
      'error',
    ],
    'no-ternary': [
      'warn',
    ],
    'no-trailing-spaces': [
      'error',
    ],
    'no-unneeded-ternary': [
      'error',
    ],
    'no-use-before-define': [
      'error',
    ],
    'no-useless-concat': [
      'error',
    ],
    'no-useless-return': [
      'warn',
    ],
    'no-var': [
      'error',
    ],
    'object-curly-newline': [
      'warn',
      'always',
    ],
    'object-curly-spacing': [
      'warn',
      'never',
    ],
    'one-var': [
      'error',
      'never',
    ],
    'padded-blocks': [
      'warn',

    ],
    'prefer-const': [
      'error',

    ],
    'prefer-template': [
      'error',

    ],
    'quote-props': [
      'error',

    ],
    'quotes': [
      'error',
      'single',
    ],
    'require-jsdoc': [
      'error',
    ],
    'semi': [
      'error',
      'always',

    ],
    'sort-keys': [
      'warn',
    ],
    'space-before-blocks': [
      'error',

    ],
    'space-before-function-paren': [
      'error',
    ],
    'space-in-parens': [
      'error',

    ],
    'space-infix-ops': [
      'error',

    ],
    'space-unary-ops': [
      'error',

    ],
    'spaced-comment': [
      'error',

    ],
    'strict': [
      'error',

    ],
    'valid-jsdoc': [
      'warn',

    ],
    'no-sync': [
      'warn',
    ],
    'no-unused-vars': [
      'error',
    ],
    'no-prototype-builtins': [
      'error',
    ],
    'guard-for-in': [
      'error',
    ],
    'no-process-env': [
      'warn',
    ],
    'max-lines': [
      'off',
    ],
    'sort-imports': [
      'warn',
    ],
    'max-statements': [
      'off',
    ],
    'no-param-reassign': [
      'error',
    ],
    'no-plusplus': [
      'off',
    ],
    'no-const-assign': [
      'error',
    ],
    'no-new-object': [
      'warn',
    ],
    'no-array-constructor': [
      'warn',
    ],
    'no-undef': [
      'error',
    ],
    'no-eq-null': [
      'error',
    ],
    'eqeqeq': [
      'warn',
    ],
    'radix': [
      'error',
    ],
    'prefer-destructuring': [
      'off',
    ],
    'no-negated-condition': [
      'warn',
    ],
    'max-params': [
      'off',
    ],
    'no-mixed-operators': [
      'off',
    ],
    'init-declarations': [
      'warn',
    ],
    'line-comment-position': [
      'off',
    ],
    'no-inline-comments': [
      'off',
    ],
    'no-continue': [
      'warn',
    ],
    'consistent-return': [
      'error',
    ],
    'no-shadow': [
      'error',
    ],
    'no-unused-expressions': [
      'error',
    ],
    'no-sequences': [
      'error',
    ],
    'no-underscore-dangle': [
      'off',
    ],
    'max-statements-per-line': [
      'off',
    ],
    'class-methods-use-this': [
      'warn',
    ],
    'lines-around-comment': [
      'error',
      {
        'beforeBlockComment': true,
        'afterBlockComment': false,
        'beforeLineComment': false,
        'afterLineComment': false,
        'allowBlockStart': false,
        'allowBlockEnd': false,
        'allowObjectStart': false,
        'allowObjectEnd': false,
        'allowArrayStart': false,
        'allowArrayEnd': false,
      },
    ],
    'space-before-function-paren': [
      'warn',
      'always',
    ],
  },
};
