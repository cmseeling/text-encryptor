module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    "space-before-function-paren": ["warn", "never"],
    "keyword-spacing": ["error", {"before": true}],
    "keyword-spacing": ["warn", {"after": false}],
    "semi": ["error", "always"],
    "brace-style": ["warn", "stroustrup"],
    "indent": ["error", 4],
    "quotes": ["warn", "single", {"allowTemplateLiterals": true}],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
