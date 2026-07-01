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
