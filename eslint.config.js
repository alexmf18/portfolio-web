import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  { ignores: ["dist/", "archive/", "node_modules/"] },

  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],

  {
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ["src/__tests__/**"],
    languageOptions: {
      globals: { ...globals.node, ...globals.vitest },
    },
  },

  // Formatting is Prettier's job; turn off rules that would conflict
  prettier,
];
