import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect", // Reactのバージョンを自動検出
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }], // console.warnとconsole.errorを許可
      semi: ["error", "always"], // セミコロンを必須に
    },
  },
  // pluginreact.jsx-runtime,
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier, // Prettierとの統合
];