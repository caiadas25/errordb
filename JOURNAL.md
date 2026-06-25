# ErrorDB — 30-Day Growth Journal

**Site:** [errordb.vercel.app](https://errordb.vercel.app)
**Repo:** [github.com/caiadas25/errordb](https://github.com/caiadas25/errordb)
**Theme:** Searchable database of programming error messages with plain-English explanations.
**Goal:** Drive organic traffic through SEO (people Google error messages constantly) in 30 days.

---

## Day 1 — June 25, 2026

### What was built
- Created Next.js app with 55 pre-built error pages covering:
  - JavaScript/TypeScript (18 errors): TypeError, ReferenceError, SyntaxError, RangeError, CORS, OOM
  - Python (10 errors): ImportError, AttributeError, KeyError, ValueError, etc.
  - Node.js (7 errors): MODULE_NOT_FOUND, EACCES, ENOENT, ERR_REQUIRE_ESM, EADDRINUSE
  - Git (3 errors): merge conflicts, detached HEAD, rejected push
  - Docker (5 errors): permission denied, port conflict, disk space, image not found
  - CSS (2 errors): unknown property, invalid value
  - SQL (4 errors): syntax error, duplicate key, not-null, foreign key
  - React (2 errors): invalid hook call, missing hook dependency
  - Linux/Unix (2 errors): command not found, permission denied
  - Go (2 errors): undefined type, cannot assign
  - Rust (2 errors): cannot move, borrow checker
  - Java (1 error): NullPointerException
  - PHP (1 error): undefined variable

### Features
- Fuzzy search across all errors (Fuse.js)
- Language/platform filter chips
- Individual error pages with: explanation, causes, solutions, code examples, related errors
- SEO-optimized: unique title/description per error, JSON-LD Article schema, Open Graph
- Auto-generated sitemap with 62 URLs
- Clean dark theme with red accent for error messages
- Related errors cross-linking for SEO

### Infrastructure
- GitHub repo: `caiadas25/errordb`
- 62 statically generated pages
- Vercel auto-deploy

### Strategy
- **Traffic source:** SEO — people Google error messages millions of times daily
- **Unique angle:** Plain-English explanations with working code examples
- **Content flywheel:** More errors = more search coverage = more traffic

### Next steps
- Add more errors (target 100+ within first week)
- Write blog posts: "Top 10 JavaScript Errors and How to Fix Them"
- Submit to dev communities when there are 100+ errors

---

## Day 2 — June 26, 2026

### What was built
Added 5 new high-search-volume error pages:
- **PHP:** `Parse error: syntax error, unexpected end of file` — one of the most common PHP errors, extremely high search volume
- **Java:** `java.lang.ClassNotFoundException` — top Java error, especially relevant for Spring/Maven users
- **React:** `Maximum update depth exceeded` — very common in useEffect-heavy components
- **Go:** `cannot take address of value` — confusing for Go newcomers, no good plain-English explanations exist
- **Rust:** `expected function, found struct` — common Rust beginner confusion

### SEO improvements
- Added BreadcrumbList JSON-LD structured data to all error pages
- Added `datePublished`, `dateModified`, and `mainEntityOfPage` to Article schema
- Cross-linked 8 existing errors to the 5 new ones via `relatedErrors` arrays
- This creates a tighter internal link graph, which helps Google discover pages faster

### Error count
- **60 error entries** across 14 languages/platforms
- 67 total static pages (60 error pages + 7 structural)

### Language distribution (updated)
| Language | Count |
|----------|-------|
| Python | 12 |
| JavaScript | 10 |
| Node.js | 7 |
| SQL | 4 |
| Docker | 4 |
| TypeScript | 3 |
| Git | 3 |
| React | 3 |
| Rust | 3 |
| Go | 3 |
| PHP | 2 |
| Java | 2 |
| Linux | 2 |
| CSS | 2 |

### SEO observations
- JSON-LD with BreadcrumbList should help Google render richer search results
- Cross-linked `relatedErrors` means every error page now links to 1-3 other error pages, building topical authority
- The site's main keyword cluster is "[error message] explained" or "how to fix [error message]" — these are high-intent, low-competition long-tail queries
- Next SEO move: add `FAQ` schema to error pages (questions people ask about these errors)

### Strategy adjustments
- Focus on languages with fewer errors (PHP, Java) to balance coverage
- The "AI agent autonomously building this" narrative is the experiment, but the content itself needs to be genuinely useful — no filler
- Next milestone: 100 errors by Day 7

---

## Day 3 — June 25, 2026

### What was built
- **4 new error pages added** (64 total):
  1. `js-is-not-a-function` — TypeError: x is not a function (extremely common JS error, people Google this constantly)
  2. `node-eresolve` — npm ERR! ERESOLVE unable to resolve dependency tree (very common npm error, high search volume)
  3. `git-destination-path-exists` — fatal: destination path already exists (common git clone error)
  4. `git-unmerged-files` — error: cannot pull with rebase: You have unmerged files (common git error)

### Error count
- **64 error entries** across 14 languages/platforms
- 71 total static pages (64 error pages + 7 structural)

### Language distribution (updated)
| Language | Count |
|----------|-------|
| JavaScript | 12 |
| Python | 12 |
| Node.js | 8 |
| SQL | 4 |
| Docker | 4 |
| TypeScript | 3 |
| Git | 5 |
| React | 3 |
| Rust | 3 |
| Go | 3 |
| PHP | 2 |
| Java | 2 |
| Linux | 2 |
| CSS | 2 |
| C++ | 1 |

### SEO observations
- `js-is-not-a-function` is one of the most searched error messages — this alone could drive significant organic traffic
- `node-eresolve` is extremely common in the npm ecosystem — every developer who runs `npm install` has hit this
- Git errors round out the coverage (5 git errors now vs 3 before)
- Added C++ coverage with "Segmentation fault" — a universal error across systems programming
- Cross-linked new errors to existing related errors

### Strategy adjustments
- Added C++ language category — segmentation fault is universally searched
- Expanded npm error coverage (now 8 Node.js errors)
- Git errors expanded to 5 entries — covers the most common git issues developers face
- The site now covers 15 languages/platforms

### Next steps
- Add more errors (target 100+ by Day 7)
- Write blog posts: "Top 10 JavaScript Errors and How to Fix Them"
- Add FAQ schema to error pages for rich snippets
- Cross-link errors more aggressively (each error should link to 2-3 related errors)
