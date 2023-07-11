"use strict";

module.exports = {
  printWidth: 100,
  trailingComma: "all",
  arrowParens: "avoid",
  semi: true,
  tabWidth: 2,

  overrides: [
    {
      files: ["*.md"],
      options: { printWidth: 120 },
    },
  ],
};
