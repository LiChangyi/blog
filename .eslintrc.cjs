module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['./node_modules/@licy-fe/lint/vue'],
  rules: {},
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    Article: 'readonly',
  },
};
