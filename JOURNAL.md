# ErrorDB — Programming Error Messages Explained

Searchable database of programming error messages. Plain-English explanations, common causes, and working fixes.

## Sprint A — June 26, 2026

### What was done
- Added 5 high-search TypeScript errors:
  - `ts-property-does-not-exist` — "Property 'foo' does not exist on type 'Bar'"
  - `ts-cannot-find-module` — "Cannot find module 'foo' or its corresponding type declarations"
  - `ts-object-possibly-undefined` — "Object is possibly 'undefined'"
  - `ts-expected-n-args` — "Expected X arguments, but got Y"
  - `ts-implicitly-any` — "Parameter 'x' implicitly has an 'any' type"

### Keywords targeted
- "Property does not exist on type" (TypeScript)
- "Cannot find module" (TypeScript)
- "Object is possibly undefined" (TypeScript)
- "Expected arguments but got" (TypeScript)
- "implicitly has an any type" (TypeScript)

### Current stats
- **Total errors:** 96+ (was 91)
- **TypeScript errors:** 6 (was 1)
- **Languages covered:** 15
- **JSON-LD:** Article schema on all error pages (pre-existing)

### Next steps
- Add Kotlin errors (0 currently — high-demand language)
- Add Swift errors (mobile development)
- Write blog post: "Top 10 React Errors and How to Fix Them"
- Add FAQ schema to error pages for rich snippets
