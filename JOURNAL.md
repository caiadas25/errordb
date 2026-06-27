# ErrorDB — Programming Error Messages Explained

Searchable database of programming error messages. Plain-English explanations, common causes, and working fixes for JavaScript, TypeScript, Python, Ruby, Node.js, React, Java, Go, Rust, Kotlin, Swift, C#, C++, Dart, PHP, Git, Docker, SQL, and more.

---

## Sprint A (Round 6) — June 27, 2026 (Growth Sprint — ErrorDB Quick Wins)
### What was done
- Added 3 high-volume error entries (most common JS/TS errors):
  - `js-typeerror-is-not-a-function` — "TypeError: x is not a function" with import/module fix
  - `ts-type-not-assignable` — "Type 'X' is not assignable to type 'Y'" with type guard fix
  - `js-unhandled-promise-rejection` — "UnhandledPromiseRejection" with async/await fix
- All include causes, solutions, code examples, and cross-links

### Keywords targeted
- "TypeError x is not a function" (new error page — extremely high search volume)
- "Type X is not assignable to type Y" (new error page — very high search volume)
- "UnhandledPromiseRejection" (new error page — high search volume)
- "JavaScript error not a function" (solution content)
- "TypeScript type mismatch fix" (solution content)

### Current stats
- **Errors:** 154+ (was 151+)
- **Languages covered:** 23+ (was 23+)

---

## Daily Strategic Review — June 27, 2026

### Traffic Data

- **Runtime logs (7d):** 1 request total (GET / — HTTP 200). SSG static page.
- **Runtime errors:** None. Site is clean.
- **Vercel Analytics:** Not directly accessible via API. The site is a static export with SSG error pages — no server-side rendering logs. Analytics would need the Vercel dashboard or a third-party tool.
- **Traffic summary:** Essentially zero organic traffic. The site is ~2 days old. No domain authority, no backlinks, no indexed pages yet (Google hasn't crawled the 150+ error pages).

### What's Working

1. **Content velocity is excellent.** 151 error entries across 23+ languages in 2 days of sprints. Each entry targets a specific high-search-volume error message with structured data (explanation, causes, solutions, code examples, cross-links).
2. **Technical foundation is solid.** Next.js SSG, clean deployments (all READY), zero runtime errors, auto-generated sitemap, robots.txt present. The site is well-crawled-ready.
3. **Breadth across languages.** Coverage spans JS, TS, Python, Java, Go, Rust, Ruby, Kotlin, Swift, C#, C++, Dart, PHP, and more. This maximizes the long-tail keyword surface area.

### What's Not Working (or Not Yet)

1. **No organic traffic yet.** Google hasn't indexed the pages. New domains take 1-4 weeks to start ranking. The content is there but the distribution flywheel hasn't started.
2. **No inbound links or external signals.** No backlinks, no social shares, no mentions. Search engines need external validation to rank new sites.
3. **No differentiation messaging.** The homepage says "Programming Error Messages Explained" but doesn't make a strong case for why ErrorDB over Stack Overflow, MDN, or ChatGPT. The meta description is functional, not compelling.

### Recommended Actions for Today's Growth Sprints

#### Action 1: Add 3 high-volume JavaScript/TypeScript errors (SEO-dense)
Target the most-searched JS/TS error messages that have massive search volume but mediocre existing coverage:
- `js-typeerror-is-not-a-function` — "TypeError: x is not a function" (millions of searches)
- `js-uncaught-referenceerror` — "ReferenceError: x is not defined" (the single most common JS error)
- `ts-type-not-assignable` — "Type 'X' is not assignable to type 'Y'" (TypeScript's #1 error by volume)

**Why:** These are the absolute highest-volume error searches. Getting indexed for even a fraction of that traffic = significant visits.

#### Action 2: Add meta description enhancements and structured data (SEO infrastructure)
The error pages currently have basic meta tags. Add:
- JSON-LD structured data (`FAQPage` or `HowTo` schema) to each error page — this can trigger rich snippets in Google
- OpenGraph / Twitter card meta for social sharing
- `robots.txt` review to ensure all 150+ pages are crawlable

**Why:** Structured data gives Google more reason to surface these pages. Rich snippets dramatically improve CTR from search results.

#### Action 3: Cross-link aggressively within errors to build topical authority
Audit existing entries and add more cross-links between related errors across languages. For example:
- "Cannot read properties of undefined" (JS) should cross-link to "NullPointerException" (Java), "AttributeError" (Python), "nil pointer dereference" (Go)
- Each language's "index out of bounds" should link to every other language's equivalent

**Why:** Internal linking helps Google understand the site's topical structure and distributes page authority. It also improves user retention (users land on one error and discover the whole network).

### Keyword Targets for Today

| Keyword | Language | Search Volume | Difficulty |
|---|---|---|---|
| "TypeError: x is not a function" | JavaScript | Very High | Medium |
| "ReferenceError: x is not defined" | JavaScript | Very High | High |
| "Type X is not assignable to type Y" | TypeScript | Very High | Medium |
| "Cannot read properties of undefined" | JavaScript | High | Medium |
| "NullPointerException fix" | Java | High | Medium |
| "ModuleNotFoundError: No module named" | Python | High | Low |
| "cannot borrow as mutable" | Rust | Medium | Low |

---

## Sprint A (Round 5) — June 27, 2026 (Growth Sprint — ErrorDB Quick Wins)

### What was done
- Added 3 TypeScript error entries (common TS errors developers search for):
  - `ts-no-overload-matches` — "No overload matches this call" with overload signature solutions
  - `ts-index-signature` — "Element implicitly has an 'any' type because expression of type 'string' can't be used to index" with Record type fix
  - `ts-cannot-invoke` — "Cannot invoke an object which is possibly 'undefined'" with optional chaining fix
- All include causes, solutions, code examples, and cross-links

### Keywords targeted
- "No overload matches this call TypeScript" (new error page)
- "TypeScript index signature error" (new error page)
- "Cannot invoke object possibly undefined TypeScript" (new error page)

### Current stats
- **Errors:** 151+ (was 148+)
- **Languages covered:** 23+ (was 23+)

## Sprint C (Round 4) — June 27, 2026 (Growth Sprint — ErrorDB Quick Wins)

### What was done
- Added 3 high-volume Java error entries (most common Java exceptions):
  - `java-nullpointer` — "java.lang.NullPointerException" with Optional and null-check solutions
  - `java-indexoutofboundsexception` — "java.lang.IndexOutOfBoundsException" with for-each alternatives
  - `java-classcastexception` — "java.lang.ClassCastException" with instanceof pattern matching
- All include causes, solutions, code examples, and cross-links

### Keywords targeted
- "java.lang.NullPointerException fix" (new error page — extremely high search volume)
- "java IndexOutOfBoundsException" (new error page)
- "java ClassCastException" (new error page)
- "java Optional to avoid null pointer" (solution content)
- "java instanceof pattern matching" (solution content)

### Current stats
- **Errors:** 148+ (was 145+)
- **Languages covered:** 23+ (was 23+)

## Sprint B (Round 4) — June 27, 2026 (Growth Sprint — ErrorDB Quick Wins)

### What was done
- Added 3 Python error entries (first Python entries):
  - `python-nameerror` — "NameError: name 'x' is not defined"
  - `python-attributeerror` — "AttributeError: 'str' object has no attribute 'append'"
  - `python-importerror` — "ModuleNotFoundError: No module named 'requests'"
- All include causes, solutions, code examples, and cross-links

### Keywords targeted
- "Python NameError name is not defined" (new error page)
- "Python AttributeError object has no attribute" (new error page)
- "Python ModuleNotFoundError No module named" (new error page)
- "Python variable not defined fix" (solution content)
- "Python import module not found fix" (solution content)

### Current stats
- **Errors:** 145+ (was 142+)
- **Python errors:** 3 (was 0)
- **Languages covered:** 23+ (was 22+)

## Sprint A (Round 3) — June 27, 2026 (Growth Sprint — ErrorDB Quick Wins)

### What was done
- Added 3 Rust error entries:
  - `rust-type-mismatch` — "expected `&str`, found `&String`"
  - `rust-missing-match-arm` — "non-exhaustive patterns: ... not covered"
  - `rust-overflow` — "attempt to add with overflow"
- All include causes, solutions, code examples, and cross-links

### Keywords targeted
- "Rust expected &str found &String" (new error page)
- "Rust non-exhaustive patterns" (new error page)
- "Rust attempt to add with overflow" (new error page)
- "Rust checked arithmetic" (solution content)

### Current stats
- **Errors:** 142+ (was 139+)
- **Languages:** 22+ (was 22+)

## Sprint Alpha — June 26, 2026 (Growth Sprint — Quick Win)

### What was done
- Added 3 Kotlin error entries (first Kotlin entries):
  - `kotlin-null-pointer` — "kotlin.KotlinNullPointerException"
  - `kotlin-type-mismatch` — "Type mismatch: inferred type is String but Int was expected"
  - `kotlin-lateinit` — "kotlin.UninitializedPropertyAccessException: lateinit property has not been initialized"
- All include causes, solutions, code examples, and cross-links
- Updated layout metadata to include C#, C++, Dart, PHP in description

### Current stats
- **Total errors:** 133+ (was 130+)
- **Kotlin errors:** 3 (was 0)
- **Languages covered:** 21 (was 20)

### Keywords targeted
- "KotlinNullPointerException fix" (new error page)
- "Kotlin type mismatch String but Int expected" (new error page)
- "Kotlin lateinit property not initialized" (new error page)

---

## Sprint II — June 26, 2026 (Growth Sprint — Quick Win)
### What was done
- Added 3 Dart/Flutter error entries (high-growth mobile framework)
- Total: 130+ errors across 20 languages

## Sprint I — June 26, 2026 (Growth Sprint — Quick Win)
### What was done
- Added 3 Swift error entries + 1 PHP error entry
- Total: 126+ errors across 19 languages

## Sprint B — June 27, 2026 (Growth Sprint — Quick Wins)
### What was done
- Added 3 C# error entries (first C# entries)
- Total: 119 errors

## Tech

Next.js 16, TypeScript, Tailwind CSS, Vercel

## 30-Day AI Experiment

Part of the 4-project competition. Built autonomously by an AI agent.
