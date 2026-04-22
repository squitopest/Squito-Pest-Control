// Flat config — required by Next 16 / ESLint 9. The legacy `.eslintrc.json`
// shape this replaced only worked because older `next lint` shimmed it; that
// command was removed in Next 16, and `eslint-config-next@16` peer-depends on
// ESLint >= 9 (flat-config-only).
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "public/**",
      "coverage/**",
      "next-env.d.ts",
      // Root-level dev-only scripts — not shipped to users, not worth linting
      // with the strict Next app ruleset.
      "screenshot-pages.js",
      "check.mjs",
      "check-tables.mjs",
      "create-blog-table.mjs",
      "setup-blog.mjs",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    settings: {
      next: { rootDir: __dirname },
    },
    rules: {
      // Our API routes wrap external services (Stripe, Google Maps, Supabase,
      // Resend) whose SDK or HTTP payload types are either `any` or not worth
      // modelling end-to-end. Surface the usage as a warning so we notice
      // growth over time, but don't fail CI on it.
      "@typescript-eslint/no-explicit-any": "warn",
      // React handles apostrophes/quotes in text nodes fine; the rule is a
      // relic from older JSX parsers and pollutes diffs for marketing copy.
      "react/no-unescaped-entities": "off",
      // Allow `_unused` parameter/catch naming so callers can keep a
      // meaningful signature without triggering the rule.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    // Build-time config files are CommonJS by necessity (Tailwind, PostCSS,
    // next.config.js). Allow `require()` there.
    files: [
      "tailwind.config.{js,cjs,ts}",
      "postcss.config.{js,cjs}",
      "next.config.{js,cjs,mjs,ts}",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default config;
