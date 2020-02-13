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
    eqeqeq: 'off', // 必须使用全等
    camelcase: 'off'// 强制驼峰法命名
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
