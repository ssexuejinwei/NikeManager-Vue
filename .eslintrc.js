module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    camelcase: 'off' // 强制驼峰法命名
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
