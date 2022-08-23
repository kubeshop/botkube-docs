module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "@docusaurus"],
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:@docusaurus/recommended"],
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
  },
};
