/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["@repo/eslint-config/next.js", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    // complexity: ["error", 12],
    "no-await-in-loop": "warn",
    "no-eval": "error",
    "no-implied-eval": "error",
    "prefer-promise-reject-errors": "warn",
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
      },
    ],
    "max-len": [
      "error",
      {
        code: 120,
        tabWidth: 2,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
