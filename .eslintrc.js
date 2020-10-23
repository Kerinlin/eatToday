module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', 'eslint:recommended'],
  rules: {
    // 0:off 1:on 2:error
    eqeqeq: 0,
    'no-console': 0,
    'vue/no-unused-vars': 1,
    'no-irregular-whitespace': 0,
    'no-unused-vars': 1,
    camelcase: 0,
    semi: [1, 'always'], // 末尾需要分号结束
    'no-extra-semi': 1, // 禁用不必要的分号
    'no-lonely-if': 1, // 禁止 if 语句作为唯一语句出现在 else 语句块中
    'no-multiple-empty-lines': [1, { max: 3 }], // 不允许多个空行,最大空行为3
    'no-whitespace-before-property': 1, // 禁止属性前有空白
    // "arrow-parens": [1,"as-needed"],  // 要求箭头函数在有多个参数情况下使用圆括号
    'space-before-function-paren': 0, // 函数括号前后需要空格
    'no-useless-escape': 0,
    'no-undef': 0,
    'comma-dangle': 0,
    'comma-spacing': 0, //不需要逗号后面加空格，
    'spaced-comment': 0
  }
};
