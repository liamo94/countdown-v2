"use strict";

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  plugins: ["react", "prettier"],
  rules: {
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "react/react-in-jsx-scope": "off",
    "prefer-promise-reject-errors": "off",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "react/display-name": "off",
    "react/no-children-prop": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "es5",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
