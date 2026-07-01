## Sprint A (Round 28) -- July 1, 2026 (Growth Sprint)
### What was done
- Added 2 high-volume errors:
  - python-indentationerror: "IndentationError: unexpected indent"
    - Causes: mixed tabs/spaces, missing colon, extra indentation
    - Solutions: use 4 spaces, auto-format with black, enable whitespace view
  - go-undeclared-import: "imported and not used"
    - Causes: unused imports, removed code, typos
    - Solutions: remove unused imports, use goimports, blank identifier for side effects
- Total: 207 errors (was 205)

### Keywords targeted
- "Python IndentationError unexpected indent" (new error page -- very high volume)
- "Go imported and not used" (new error page -- high volume)
- "Python tabs vs spaces" (error content)
- "Go unused import" (error content)

### SEO fixes
- Auto-generated sitemap includes new error pages
- Cross-linked related errors

---

## Sprint C (Round 26) -- July 1, 2026 (Growth Sprint)
### What was done
- Added 3 high-volume errors:
  - python-importerror-cannot-import-name: "ImportError: cannot import name 'something'"
    - Causes: typo, circular import, wrong package version
    - Solutions: check module exports, lazy import, fix circular deps
  - js-cors-error: CORS policy blocked by No Access-Control-Allow-Origin header
    - Causes: missing CORS headers, different origin, preflight failure
    - Solutions: server CORS headers, proxy, Next.js rewrites
  - docker-container-exits-immediately: Container starts then exits
    - Causes: CMD finishes immediately, startup crash, missing env vars
    - Solutions: docker logs, interactive debug, foreground process, exec
  - All with causes, solutions, code examples, and cross-links
- Total: 203 errors (was 200)

### Keywords targeted
- "ImportError cannot import name" (new error page -- very high volume)
- "CORS policy No Access-Control-Allow-Origin" (new error page -- very high volume)
- "Docker container exits immediately" (new error page -- high volume)
- "how to fix CORS error" (error content)

### SEO fixes
- Auto-generated sitemap includes new error pages
- Cross-linked related errors

---

## Sprint B (Round 25) -- July 1, 2026 (Growth Sprint)
### What was done
- Added 3 high-volume errors:
  - node-err-require-esm: "Error [ERR_REQUIRE_ESM]: require() of ES Module not supported"
    - Causes: ESM-only package, CommonJS context, require() vs import
    - Solutions: Use import, dynamic import, type:module, dual CJS/ESM
  - python-typeerror-unhashable-type: "TypeError: unhashable type: 'dict'"
    - Causes: dict as key, list in set, hash() on mutable
    - Solutions: frozenset, tuple, json.dumps as key
  - js-out-of-memory: "FATAL ERROR: Reached heap limit Allocation failed"
    - Causes: memory leak, large files, infinite recursion
    - Solutions: --max-old-space-size, streaming, DevTools profiling
  - Total: 200 errors (was 197)

### Keywords targeted
- "Node.js ERR_REQUIRE_ESM" (new error page -- high volume)
- "Python TypeError unhashable type dict" (new error page -- high volume)
- "JavaScript heap out of memory" (new error page -- high volume)
- "ERR_REQUIRE_ESM fix" (error content)

---

## Sprint A (Round 24) -- June 30, 2026 (Growth Sprint)
### What was done
- Added 2 high-volume errors:
  - python-keyerror: "KeyError: 'name'" (dict.get, defaultdict, try/except solutions)
  - js-cannot-read-property-of-undefined: "TypeError: Cannot read properties of undefined" (optional chaining, nullish coalescing)
  - All with causes, solutions, code examples, and cross-links
  - Total: 197 errors (was 195)

### Keywords targeted
- "Python KeyError" (new error page -- very high volume)
- "JavaScript Cannot read properties of undefined" (new error page -- very high volume)

---

## Sprint D (Round 27) -- July 1, 2026 (Growth Sprint)
### What was done
- Added 2 high-volume errors:
  - python-nonetype-not-callable: TypeError: 'NoneType' object is not callable (missing return, shadowed built-ins)
  - js-referenceerror-not-defined: ReferenceError: myVariable is not defined (undeclared variables, scope issues)
  - All with causes, solutions, code examples, and cross-links
  - Total: 205 errors (was 203)

### Keywords targeted
- "TypeError NoneType object is not callable" (new error page -- very high volume)
- "ReferenceError is not defined" (new error page -- very high volume)
- "Python NoneType callable" (error content)
- "JavaScript ReferenceError" (error content)

---
