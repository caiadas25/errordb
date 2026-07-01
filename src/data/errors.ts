export interface ErrorEntry {
  id: string;
  errorMessage: string;
  language: string;
  category: string;
  explanation: string;
  causes: string[];
  solutions: string[];
  codeExample?: string;
  relatedErrors: string[];
}

export const errors: ErrorEntry[] = [
  // === JavaScript / TypeScript ===
  {
    id: "js-cannot-read-properties-of-undefined",
    errorMessage: "TypeError: Cannot read properties of undefined (reading 'foo')",
    language: "JavaScript",
    category: "TypeError",
    explanation: "You're trying to access a property or method on a value that is `undefined`. This happens when a variable, function return value, or object property hasn't been assigned yet.",
    causes: [
      "Accessing a property on a variable that was never initialized",
      "Accessing a property on a function return value that returns undefined",
      "Nested property access where an intermediate object is missing",
      "Async data not yet loaded when the code runs",
      "Typo in property name"
    ],
    solutions: [
      "Use optional chaining: `obj?.foo`",
      "Add a null/undefined check before accessing the property",
      "Initialize variables with default values",
      "Ensure async data is loaded before accessing it"
    ],
    codeExample: `// ❌ Bad\nconst user = getUser();\nconsole.log(user.name); // TypeError if getUser() returns undefined\n\n// ✅ Good\nconst user = getUser();\nconsole.log(user?.name);\n\n// ✅ Good\nconst user = getUser();\nif (user) {\n  console.log(user.name);\n}`,
    relatedErrors: ["js-cannot-set-properties-of-undefined", "js-object-is-possibly-null"]
  },
  {
    id: "js-cannot-set-properties-of-undefined",
    errorMessage: "TypeError: Cannot set properties of undefined (setting 'foo')",
    language: "JavaScript",
    category: "TypeError",
    explanation: "You're trying to set a property on `undefined`. This is the write-side equivalent of 'Cannot read properties of undefined'.",
    causes: [
      "Trying to assign a property to an uninitialized object",
      "Array index assignment on an undefined variable",
      "State mutation before state is initialized"
    ],
    solutions: [
      "Initialize the object before setting properties",
      "Use optional chaining with assignment: `obj?.foo = bar`",
      "Add defensive checks"
    ],
    codeExample: `// ❌ Bad\nlet config;\nconfig.theme = "dark"; // TypeError\n\n// ✅ Good\nconst config = {};\nconfig.theme = "dark";`,
    relatedErrors: ["js-cannot-read-properties-of-undefined"]
  },
  {
    id: "js-object-is-possibly-null",
    errorMessage: "TypeError: 'obj' is possibly null",
    language: "TypeScript",
    category: "TypeError",
    explanation: "TypeScript detected that a value could be `null` at runtime, and you're trying to use it without null-checking first.",
    causes: [
      "DOM querySelector that might not find an element",
      "Function that can return null",
      "Optional chaining not used"
    ],
    solutions: [
      "Add a null check: `if (obj !== null)`",
      "Use non-null assertion: `obj!.property` (if you're sure)",
      "Use optional chaining: `obj?.property`",
      "Use a type guard function"
    ],
    relatedErrors: ["js-cannot-read-properties-of-undefined"]
  },
  {
    id: "js-reference-not-defined",
    errorMessage: "ReferenceError: foo is not defined",
    language: "JavaScript",
    category: "ReferenceError",
    explanation: "You're using a variable name that hasn't been declared anywhere in the current scope. Unlike 'undefined', the variable doesn't exist at all.",
    causes: [
      "Typo in variable name",
      "Variable declared in a different scope",
      "Forgetting to import a module",
      "Using a variable before declaration",
      "Forgot to define a global variable"
    ],
    solutions: [
      "Check for typos in the variable name",
      "Ensure the variable is declared in the correct scope",
      "Import the module that exports the variable",
      "Declare the variable before using it"
    ],
    codeExample: `// ❌ Bad\nconsole.log(userName); // ReferenceError\n\n// ✅ Good\nconst userName = "Alice";\nconsole.log(userName);`,
    relatedErrors: ["js-cannot-access-before-initialization"]
  },
  {
    id: "js-cannot-access-before-initialization",
    errorMessage: "ReferenceError: Cannot access 'x' before initialization",
    language: "JavaScript",
    category: "ReferenceError",
    explanation: "You're using a `let` or `const` variable before its declaration is reached. These variables exist in a 'temporal dead zone' from the start of the block until the declaration.",
    causes: [
      "Using a let/const variable before its line",
      "Hoisting confusion (let/const are hoisted but not initialized)",
      "Circular dependencies in modules"
    ],
    solutions: [
      "Move the variable declaration above the usage",
      "Use `var` if you need hoisting behavior",
      "Restructure code to avoid forward references"
    ],
    codeExample: `// ❌ Bad\nconsole.log(x); // ReferenceError\nconst x = 5;\n\n// ✅ Good\nconst x = 5;\nconsole.log(x);`,
    relatedErrors: ["js-reference-not-defined"]
  },
  {
    id: "js-assignment-to-constant",
    errorMessage: "TypeError: Assignment to constant variable",
    language: "JavaScript",
    category: "TypeError",
    explanation: "You're trying to reassign a variable declared with `const`. Constants cannot be reassigned after initialization.",
    causes: [
      "Using const for a value that needs to change",
      "Attempting to reassign a loop counter declared with const"
    ],
    solutions: [
      "Use `let` instead of `const` for values that change",
      "For objects/arrays, const allows mutation of contents, just not reassignment"
    ],
    codeExample: `// ❌ Bad\nconst count = 0;\ncount = 1; // TypeError\n\n// ✅ Good\nlet count = 0;\ncount = 1; // Works`,
    relatedErrors: []
  },
  {
    id: "js-unexpected-token",
    errorMessage: "SyntaxError: Unexpected token '>'",
    language: "JavaScript",
    category: "SyntaxError",
    explanation: "The JavaScript parser encountered a character it didn't expect at that position. This is a syntax error — the code can't even be parsed.",
    causes: [
      "Missing comma, semicolon, or bracket",
      "JSX used in a non-JSX file",
      "Using modern syntax in an older runtime",
      "Template literal in wrong context"
    ],
    solutions: [
      "Check the line number and look for missing punctuation",
      "Ensure your build tool is configured for JSX/TSX",
      "Check browser/runtime compatibility",
      "Use a code editor with syntax highlighting"
    ],
    relatedErrors: ["js-unexpected-end-of-input"]
  },
  {
    id: "js-unexpected-end-of-input",
    errorMessage: "SyntaxError: Unexpected end of input",
    language: "JavaScript",
    category: "SyntaxError",
    explanation: "The parser reached the end of the file while still expecting more tokens. Usually means a missing closing bracket, parenthesis, or string delimiter.",
    causes: [
      "Missing closing bracket, brace, or parenthesis",
      "Unclosed string or template literal",
      "Incomplete function or block"
    ],
    solutions: [
      "Count opening and closing brackets",
      "Check for unclosed strings",
      "Use a formatter (Prettier) to catch structural issues"
    ],
    relatedErrors: ["js-unexpected-token"]
  },
  {
    id: "js-range-max-call-stack",
    errorMessage: "RangeError: Maximum call stack size exceeded",
    language: "JavaScript",
    category: "RangeError",
    explanation: "Your code has entered infinite recursion — a function is calling itself (or creating a circular reference) without a base case to stop.",
    causes: [
      "Recursive function without a base case",
      "Circular object reference in JSON.stringify",
      "Infinite event listener loops",
      "React state update triggering infinite re-render"
    ],
    solutions: [
      "Add a base case to recursive functions",
      "Break circular references",
      "Use iterative approach instead of recursion",
      "Check for infinite loops in useEffect"
    ],
    codeExample: `// ❌ Bad\nfunction factorial(n) {\n  return n * factorial(n - 1); // No base case!\n}\n\n// ✅ Good\nfunction factorial(n) {\n  if (n <= 1) return 1; // Base case\n  return n * factorial(n - 1);\n}`,
    relatedErrors: []
  },
  {
    id: "js-promise-rejected",
    errorMessage: "UnhandledPromiseRejection: This error originated either by throwing inside an async function without a catch block",
    language: "JavaScript",
    category: "Promise",
    explanation: "An async function threw an error or a promise was rejected, and no `.catch()` handler was attached to handle it.",
    causes: [
      "Missing try/catch in async function",
      "Promise chain without .catch()",
      "Async function called without awaiting or catching"
    ],
    solutions: [
      "Wrap async code in try/catch",
      "Add .catch() to promise chains",
      "Use an error boundary (React) for component errors"
    ],
    codeExample: `// ❌ Bad\nasync function fetchData() {\n  const res = await fetch(url); // No try/catch!\n}\n\n// ✅ Good\nasync function fetchData() {\n  try {\n    const res = await fetch(url);\n  } catch (err) {\n    console.error("Fetch failed:", err);\n  }\n}`,
    relatedErrors: []
  },
  {
    id: "js-is-not-a-function",
    errorMessage: "TypeError: x is not a function",
    language: "JavaScript",
    category: "TypeError",
    explanation: "You're trying to call a value as a function, but that value isn't a function. This could mean you're calling a variable that holds a non-function value, or you've confused a method name.",
    causes: [
      "Calling a variable that isn't a function (e.g., calling a string or number)",
      "Typo in function name",
      "Forgetting to import a function",
      "Calling a class without `new`",
      "Object property that isn't a method being called as one",
      "Module export/import mismatch"
    ],
    solutions: [
      "Check the value's type: `console.log(typeof x)` before calling",
      "Verify the function name is spelled correctly",
      "Ensure the function is imported",
      "Use `new` for class constructors",
      "Check module exports match what you're importing"
    ],
    codeExample: `// ❌ Bad\nconst greet = "hello";\ngreet(); // TypeError: greet is not a function\n\n// ✅ Good\nconst greet = (name) => "Hello, " + name;\ngreet("Alice");`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "js-reference-not-defined"]
  },
  // === Python ===
  {
    id: "py-import-error",
    errorMessage: "ModuleNotFoundError: No module named 'requests'",
    language: "Python",
    category: "ImportError",
    explanation: "Python can't find the module you're trying to import. The module either isn't installed, isn't in your Python path, or is misspelled.",
    causes: [
      "Module not installed in the current environment",
      "Wrong virtual environment activated",
      "Typo in module name",
      "Module installed for a different Python version"
    ],
    solutions: [
      "Install the module: `pip install requests`",
      "Activate the correct virtual environment",
      "Check `pip list` to see what's installed",
      "Use `pip install --upgrade pip` first"
    ],
    relatedErrors: ["py-import-circular"]
  },
  {
    id: "py-import-circular",
    errorMessage: "ImportError: cannot import name 'X' from partially initialized module 'Y' (most likely due to a circular import)",
    language: "Python",
    category: "ImportError",
    explanation: "Two modules are trying to import each other, creating a circular dependency. Python starts executing module A, which tries to import module B, which tries to import module A — but A isn't fully loaded yet.",
    causes: [
      "Two modules directly import each other",
      "Import at module level that creates circular chain",
      "Placing import inside a function breaks the cycle"
    ],
    solutions: [
      "Move the import inside the function that uses it",
      "Restructure code to remove the circular dependency",
      "Create a third module that both import from"
    ],
    relatedErrors: ["py-import-error"]
  },
  {
    id: "py-attribute-error",
    errorMessage: "AttributeError: 'dict' object has no attribute 'append'",
    language: "Python",
    category: "AttributeError",
    explanation: "You're calling a method or accessing an attribute that doesn't exist for the object's type. Dicts don't have `.append()` — lists do.",
    causes: [
      "Wrong data type (dict instead of list)",
      "Typo in method name",
      "Object is a different type than expected",
      "Missing import for the class"
    ],
    solutions: [
      "Check the type of your variable: `type(obj)`",
      "Use the correct method for the data type",
      "For dicts, use `.update()` or `d[key] = value`"
    ],
    codeExample: `# ❌ Bad\nd = {"key": "value"}\nd.append("new")  # AttributeError\n\n# ✅ Good\nd = {"key": "value"}\nd["new_key"] = "new"`,
    relatedErrors: ["py-type-error"]
  },
  {
    id: "py-key-error",
    errorMessage: "KeyError: 'missing_key'",
    language: "Python",
    category: "KeyError",
    explanation: "You're trying to access a dictionary key that doesn't exist. Python dicts raise KeyError instead of returning None.",
    causes: [
      "Key was never added to the dictionary",
      "Typo in key name",
      "Case sensitivity mismatch",
      "Key was deleted or renamed"
    ],
    solutions: [
      "Use `.get(key, default)` instead of direct access",
      "Check if key exists first: `if key in d`",
      "Use `collections.defaultdict` for automatic defaults"
    ],
    codeExample: `# ❌ Bad\nvalue = d["missing_key"]  # KeyError\n\n# ✅ Good\nvalue = d.get("missing_key", None)\n\n# ✅ Good\nif "missing_key" in d:\n    value = d["missing_key"]`,
    relatedErrors: ["py-attribute-error"]
  },
  {
    id: "py-value-error",
    errorMessage: "ValueError: invalid literal for int() with base 10: 'abc'",
    language: "Python",
    category: "ValueError",
    explanation: "A function received the right type of argument but the wrong value. `int()` got a string, but the string doesn't represent a valid integer.",
    causes: [
      "Passing non-numeric string to int() or float()",
      "Wrong format for date parsing",
      "Invalid value for a function's expected range"
    ],
    solutions: [
      "Validate input before conversion",
      "Use try/except around conversion",
      "Strip whitespace: `int(s.strip())`"
    ],
    codeExample: `# ❌ Bad\nnum = int("abc")  # ValueError\n\n# ✅ Good\ntry:\n    num = int(user_input)\nexcept ValueError:\n    print("Please enter a valid number")`,
    relatedErrors: ["py-type-error"]
  },
  {
    id: "py-type-error",
    errorMessage: "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
    language: "Python",
    category: "TypeError",
    explanation: "You're trying to use an operator with incompatible types. Python won't implicitly convert between int and str for arithmetic.",
    causes: [
      "Mixing types in arithmetic operations",
      "Passing wrong type to function",
      "Missing type conversion"
    ],
    solutions: [
      "Explicitly convert types: `str(num) + text` or `int(text) + num`",
      "Use f-strings for string formatting: `f\"{num}\"`",
      "Validate types before operations"
    ],
    codeExample: `# ❌ Bad\nresult = 5 + "hello"  # TypeError\n\n# ✅ Good\nresult = str(5) + "hello"  # "5hello"\nresult = f"{5}hello"  # "5hello"`,
    relatedErrors: ["py-value-error"]
  },
  {
    id: "py-indentation-error",
    errorMessage: "IndentationError: unexpected indent",
    language: "Python",
    category: "IndentationError",
    explanation: "Python uses indentation to define code blocks. An unexpected indent means a line has extra whitespace that doesn't match the current block level.",
    causes: [
      "Mixed tabs and spaces",
      "Extra indentation on a line",
      "Missing colon after if/for/while/def/class",
      "Paste from different editor with different indentation"
    ],
    solutions: [
      "Use consistent indentation (4 spaces recommended)",
      "Configure editor to show whitespace",
      "Run autopep8 or black formatter",
      "Convert all tabs to spaces"
    ],
    relatedErrors: ["py-tab-error"]
  },
  {
    id: "py-tab-error",
    errorMessage: "TabError: inconsistent use of tabs and spaces in indentation",
    language: "Python",
    category: "TabError",
    explanation: "Python 3 doesn't allow mixing tabs and spaces in the same file. This file has inconsistent indentation characters.",
    causes: [
      "Mixing tab and space characters",
      "Pasting code from different sources",
      "Editor configured with tabs but codebase uses spaces"
    ],
    solutions: [
      "Convert entire file to spaces: `expand -t 4 file.py`",
      "Configure editor to use spaces",
      "Run autopep8 or black formatter"
    ],
    relatedErrors: ["py-indentation-error"]
  },
  {
    id: "py-list-index-out-of-range",
    errorMessage: "IndexError: list index out of range",
    language: "Python",
    category: "IndexError",
    explanation: "You're accessing a list index that doesn't exist. The index is greater than or equal to the list's length.",
    causes: [
      "Off-by-one error (using <= instead of <)",
      "Empty list",
      "Index calculated from external data that's shorter than expected"
    ],
    solutions: [
      "Check list length before accessing: `if i < len(lst)`",
      "Use enumerate() for iteration",
      "Use try/except IndexError",
      "Use slicing for safe access"
    ],
    codeExample: `# ❌ Bad\nitems = [1, 2, 3]\nprint(items[5])  # IndexError\n\n# ✅ Good\nitems = [1, 2, 3]\nif len(items) > 5:\n    print(items[5])`,
    relatedErrors: ["py-key-error"]
  },
  {
    id: "py-zero-division",
    errorMessage: "ZeroDivisionError: division by zero",
    language: "Python",
    category: "ZeroDivisionError",
    explanation: "You're dividing by zero. Python (unlike some languages) does not allow division by zero and raises an exception.",
    causes: [
      "Denominator variable is zero",
      "Counter or divisor not initialized properly",
      "Empty collection length used as divisor"
    ],
    solutions: [
      "Check denominator before dividing",
      "Use try/except ZeroDivisionError",
      "Provide a default value"
    ],
    codeExample: `# ❌ Bad\nresult = 10 / 0  # ZeroDivisionError\n\n# ✅ Good\ndef safe_divide(a, b):\n    if b == 0:\n        return None\n    return a / b`,
    relatedErrors: []
  },
  // === Node.js ===
  {
    id: "node-module-not-found",
    errorMessage: "Error: Cannot find module './config'",
    language: "Node.js",
    category: "MODULE_NOT_FOUND",
    explanation: "Node.js can't find the module you're requiring/importing. The file doesn't exist at the specified path, or the module isn't installed.",
    causes: [
      "File doesn't exist at the path (typo or wrong directory)",
      "Forgot to npm install",
      "Module is in a different directory",
      "File extension mismatch"
    ],
    solutions: [
      "Check the file path and name",
      "Run `npm install`",
      "Use absolute path or configure module resolution",
      "Check if module is in package.json"
    ],
    relatedErrors: ["node-cannot-find-module"]
  },
  {
    id: "node-cannot-find-module",
    errorMessage: "Error: Cannot find module 'express'",
    language: "Node.js",
    category: "MODULE_NOT_FOUND",
    explanation: "A required npm package isn't installed. Node.js looked in node_modules but couldn't find it.",
    causes: [
      "Package not installed (missing from node_modules)",
      "package.json not in current directory",
      "Wrong Node.js version",
      "Corrupted node_modules"
    ],
    solutions: [
      "Run `npm install package-name`",
      "Delete node_modules and package-lock.json, then `npm install`",
      "Check you're in the right directory"
    ],
    relatedErrors: ["node-module-not-found"]
  },
  {
    id: "node-eacces",
    errorMessage: "Error: EACCES: permission denied, open '/var/log/app.log'",
    language: "Node.js",
    category: "EACCES",
    explanation: "The operating system denied permission to access a file or directory. This is a file system permissions issue, not a Node.js bug.",
    causes: [
      "Running as wrong user (not file owner)",
      "File permissions too restrictive",
      "Directory not executable (for traversal)",
      "SELinux or AppArmor blocking access"
    ],
    solutions: [
      "Check file permissions: `ls -la /path/to/file`",
      "Change ownership: `chown user:group /path`",
      "Don't run Node as root — use a proper user",
      "Check SELinux: `getenforce`"
    ],
    relatedErrors: ["node-enoent"]
  },
  {
    id: "node-enoent",
    errorMessage: "Error: ENOENT: no such file or directory, open '/path/to/file.txt'",
    language: "Node.js",
    category: "ENOENT",
    explanation: "The file or directory doesn't exist. ENOENT stands for 'Error NO ENTry' — the path you specified doesn't point to anything.",
    causes: [
      "File hasn't been created yet",
      "Wrong path (typo or relative vs absolute)",
      "File was deleted",
      "Directory in the path doesn't exist"
    ],
    solutions: [
      "Verify the path exists: `ls -la /path/to/dir`",
      "Create directories first: `fs.mkdirSync(dir, { recursive: true })`",
      "Use path.resolve() or path.join() for cross-platform paths",
      "Check __dirname vs process.cwd()"
    ],
    relatedErrors: ["node-eacces"]
  },
  {
    id: "node-err-require-esm",
    errorMessage: "Error [ERR_REQUIRE_ESM]: require() of ES Module 'package-name' not supported",
    language: "Node.js",
    category: "ERR_REQUIRE_ESM",
    explanation: "You're trying to `require()` an ES module. Some packages have switched to ESM-only and can't be loaded with CommonJS require().",
    causes: [
      "Package is ESM-only but you're using require()",
      "Your project is CommonJS (type not set in package.json)",
      "package.json has no \"type\": \"module\""
    ],
    solutions: [
      "Add \"type\": \"module\" to package.json and use import",
      "Use dynamic import(): `const mod = await import('pkg')`",
      "Find a CommonJS-compatible alternative package",
      "Use a package like `esm` for CommonJS projects"
    ],
    relatedErrors: []
  },
  {
    id: "node-port-in-use",
    errorMessage: "Error: listen EADDRINUSE: address already in use :::3000",
    language: "Node.js",
    category: "EADDRINUSE",
    explanation: "Another process is already using the port your server is trying to bind to. The port is occupied.",
    causes: [
      "Previous instance of the server is still running",
      "Another application using the same port",
      "Zombie process not properly terminated"
    ],
    solutions: [
      "Kill the process using the port: `lsof -i :3000` then `kill -9 <PID>`",
      "Use a different port",
      "Set SO_REUSEADDR: `server.listen({ port: 3000, reuseAddress: true })`",
      "For development: `npx kill-port 3000`"
    ],
    relatedErrors: []
  },
  {
    id: "node-eresolve",
    errorMessage: "npm ERR! code ERESOLVE\nnpm ERR! ERESOLVE unable to resolve dependency tree",
    language: "Node.js",
    category: "npm",
    explanation: "npm can't install a package because of a dependency conflict. Two packages require incompatible versions of the same dependency. This is npm's way of protecting you from installing broken dependency trees.",
    causes: [
      "Two packages depend on different major versions of the same package",
      "Outdated lockfile with stale dependency resolutions",
      "Trying to install a package that requires a newer version of a shared dependency than what's already installed",
      "Monorepo with conflicting dependency versions"
    ],
    solutions: [
      "Try `npm install --legacy-peer-deps` to skip peer dependency checks",
      "Use `npm install --force` (use with caution, may cause runtime errors)",
      "Update the conflicting package to a compatible version",
      "Delete node_modules and package-lock.json, then `npm install` fresh",
      "Use `npm ls` to see the dependency tree and find the conflict"
    ],
    codeExample: `# See the dependency tree\nnpm ls --all\n\n# Force install (use carefully)\nnpm install --force\n\n# Skip peer dep checks (often safe)\nnpm install --legacy-peer-deps\n\n# Nuclear option: fresh install\nrm -rf node_modules package-lock.json\nnpm install`,
    relatedErrors: ["node-cannot-find-module", "node-err-require-esm"]
  },
  // === Git ===
  {
    id: "git-merge-conflict",
    errorMessage: "CONFLICT (content): Merge conflict in file.js",
    language: "Git",
    category: "Merge Conflict",
    explanation: "Git can't automatically merge changes because the same lines were modified in both branches. You need to manually resolve the conflict markers.",
    causes: [
      "Same lines changed in both branches",
      "File was modified in one branch and deleted in another",
      "Structural changes to the same file"
    ],
    solutions: [
      "Open the file and look for <<<<<<< ======= >>>>>>> markers",
      "Choose which changes to keep (or combine them)",
      "Remove the conflict markers",
      "git add the resolved file and continue the merge"
    ],
    codeExample: `<<<<<<< HEAD\nconst timeout = 3000;\n=======\nconst timeout = 5000;\n>>>>>>> feature-branch\n\n// Resolve by choosing one (or a blend):\nconst timeout = 4000;`,
    relatedErrors: []
  },
  {
    id: "git-detached-head",
    errorMessage: "You are in 'detached HEAD' state",
    language: "Git",
    category: "Warning",
    explanation: "You've checked out a specific commit instead of a branch. Any new commits won't belong to any branch and will be lost when you switch away.",
    causes: [
      "Running `git checkout <commit-hash>`",
      "Checking out a tag",
      "CI/CD systems checking out specific commits"
    ],
    solutions: [
      "Create a branch: `git checkout -b my-branch`",
      "Return to a branch: `git checkout main`",
      "If you need to keep commits, create a branch first"
    ],
    relatedErrors: []
  },
  {
    id: "git-rejected-push",
    errorMessage: "! [rejected] main -> main (fetch first)",
    language: "Git",
    category: "Push Rejected",
    explanation: "Your local branch is behind the remote. Someone (or another process) pushed changes to the remote that you don't have locally.",
    causes: [
      "Remote has new commits you haven't fetched",
      "Another developer pushed first",
      "Force push was required but not used"
    ],
    solutions: [
      "Pull first: `git pull origin main`",
      "Resolve any conflicts that arise",
      "Then push: `git push origin main`",
      "For force push (dangerous): `git push --force-with-lease`"
    ],
    relatedErrors: ["git-merge-conflict"]
  },
  {
    id: "git-destination-path-exists",
    errorMessage: "fatal: destination path already exists and is not an empty directory.",
    language: "Git",
    category: "Clone Error",
    explanation: "You're trying to clone a repository into a directory that already exists and isn't empty. Git won't clone into an existing non-empty directory.",
    causes: [
      "Repository directory already exists from a previous clone",
      "Wrong directory name specified in the clone command",
      "Trying to re-clone without removing the old directory first"
    ],
    solutions: [
      "Remove the existing directory: `rm -rf repo-name` then clone again",
      "Clone into a different directory: `git clone url new-name`",
      "If the directory has your work, pull instead: `git pull`",
      "Check if it's already a git repo: `git status`"
    ],
    codeExample: `# ❌ Bad\ngit clone https://github.com/user/repo.git repo\n# fatal: destination path already exists...\n\n# ✅ Good: remove and re-clone\nrm -rf repo\ngit clone https://github.com/user/repo.git repo\n\n# ✅ Good: clone with different name\ngit clone https://github.com/user/repo.git repo-new`,
    relatedErrors: []
  },
  {
    id: "git-unmerged-files",
    errorMessage: "error: cannot pull with rebase: You have unmerged files.",
    language: "Git",
    category: "Pull Error",
    explanation: "You have unresolved merge conflicts from a previous merge or pull. Git won't allow you to pull or rebase until you resolve or abort the current merge.",
    causes: [
      "Unresolved merge conflicts from a previous merge",
      "Forgot to `git add` resolved files after fixing conflicts",
      "Interrupted merge process"
    ],
    solutions: [
      "Resolve conflicts in each file, then `git add <file>` and `git commit`",
      "Or abort the merge: `git merge --abort`",
      "Or abort the rebase: `git rebase --abort`",
      "Use `git diff --name-only --diff-filter=U` to list conflicting files"
    ],
    codeExample: `# See which files have conflicts\ngit diff --name-only --diff-filter=U\n\n# After resolving conflicts\ngit add file1.js file2.js\ngit commit -m "Resolve merge conflicts"\n\n# Or abort entirely\ngit merge --abort`,
    relatedErrors: ["git-merge-conflict"]
  },
  // === Docker ===
  {
    id: "docker-permission-denied",
    errorMessage: "Got permission denied while trying to connect to the Docker daemon socket",
    language: "Docker",
    category: "Permission Denied",
    explanation: "Your user doesn't have permission to access the Docker daemon. By default, only root can run Docker commands.",
    causes: [
      "User not in docker group",
      "Running Docker without sudo",
      "Docker socket permissions wrong"
    ],
    solutions: [
      "Add user to docker group: `sudo usermod -aG docker $USER`",
      "Run with sudo (not recommended for development)",
      "Fix socket permissions: `sudo chmod 666 /var/run/docker.sock`",
      "Log out and back in after group change"
    ],
    relatedErrors: []
  },
  {
    id: "docker-port-already-allocated",
    errorMessage: "Bind for 0.0.0.0:8080 failed: port is already allocated",
    language: "Docker",
    category: "Port Conflict",
    explanation: "A container is trying to use a host port that's already in use by another container or process.",
    causes: [
      "Another container already maps to the same host port",
      "A native process is using the port",
      "Previous container wasn't properly removed"
    ],
    solutions: [
      "Check what's using the port: `docker ps` or `lsof -i :8080`",
      "Stop the conflicting container: `docker stop <name>`",
      "Use a different host port: `-p 8081:80`",
      "Remove stopped containers: `docker container prune`"
    ],
    relatedErrors: ["node-port-in-use"]
  },
  {
    id: "docker-no-space",
    errorMessage: "no space left on device",
    language: "Docker",
    category: "Disk Space",
    explanation: "The Docker host has run out of disk space. Docker images, containers, and volumes accumulate over time.",
    causes: [
      "Too many unused images",
      "Old containers not pruned",
      "Large log files from containers",
      "Volumes with accumulated data"
    ],
    solutions: [
      "Clean up: `docker system prune -a` (removes all unused data)",
      "Remove dangling images: `docker image prune`",
      "Check disk usage: `docker system df`",
      "Set log rotation in daemon.json"
    ],
    relatedErrors: []
  },
  {
    id: "docker-image-not-found",
    errorMessage: "Error response from daemon: manifest for nginx:latest not found",
    language: "Docker",
    category: "Image Not Found",
    explanation: "Docker can't find the specified image or tag in the registry. The image name, tag, or registry is wrong.",
    causes: [
      "Typo in image name or tag",
      "Image removed from registry",
      "Using wrong registry (Docker Hub vs private)",
      "Image is in a different namespace"
    ],
    solutions: [
      "Check image name and tag on Docker Hub",
      "Try pulling explicitly: `docker pull nginx:latest`",
      "Check if using a private registry: `docker login`",
      "Use full path for non-Docker Hub images"
    ],
    relatedErrors: []
  },
  // === CSS ===
  {
    id: "css-unknown-property",
    errorMessage: "Unknown property: 'display-flex'",
    language: "CSS",
    category: "Syntax",
    explanation: "The CSS property name is incorrect or not recognized by the browser. Often caused by using shorthand incorrectly or mixing up property names.",
    causes: [
      "Typo in property name",
      "Using Sass/SCSS syntax in plain CSS",
      "Property doesn't exist in the CSS spec",
      "Vendor prefix missing"
    ],
    solutions: [
      "Use `display: flex` instead of `display-flex`",
      "Check MDN for correct property name",
      "Add vendor prefixes if needed (-webkit, -moz)",
      "Use a CSS linter"
    ],
    relatedErrors: ["css-invalid-value"]
  },
  {
    id: "css-invalid-value",
    errorMessage: "Invalid value for 'width': 'auto px'",
    language: "CSS",
    category: "Syntax",
    explanation: "The CSS value is syntactically invalid for the given property. The browser ignores the entire declaration.",
    causes: [
      "Mixed units (e.g., 'auto px')",
      "Missing space between value and unit",
      "Using a string where a number is expected",
      "Property doesn't accept the given value type"
    ],
    solutions: [
      "Use valid CSS values: `width: auto` or `width: 100px`",
      "Check MDN for accepted values",
      "Use CSS validation tools"
    ],
    relatedErrors: ["css-unknown-property"]
  },
  // === SQL ===
  {
    id: "sql-syntax-error",
    errorMessage: "ERROR: syntax error at or near \"FROM\"",
    language: "SQL",
    category: "Syntax",
    explanation: "The SQL parser encountered a syntax error. The query structure doesn't match valid SQL grammar at the indicated position.",
    causes: [
      "Missing comma between columns",
      "Wrong keyword order",
      "Unclosed parenthesis or quote",
      "Using reserved words as identifiers without quoting"
    ],
    solutions: [
      "Check the SQL syntax near the error position",
      "Use an SQL formatter to spot structural issues",
      "Quote reserved words with double quotes or backticks",
      "Validate query in a SQL playground first"
    ],
    relatedErrors: []
  },
  {
    id: "sql-duplicate-key",
    errorMessage: "ERROR: duplicate key value violates unique constraint \"users_email_key\"",
    language: "SQL",
    category: "Unique Violation",
    explanation: "You're trying to INSERT or UPDATE a row with a value that already exists in a column with a UNIQUE constraint.",
    causes: [
      "INSERT with a value that already exists in a unique column",
      "Race condition in concurrent inserts",
      "Trying to re-create an existing record"
    ],
    solutions: [
      "Use INSERT ... ON CONFLICT DO UPDATE (PostgreSQL) or INSERT ... ON DUPLICATE KEY UPDATE (MySQL)",
      "Check if the record exists before inserting",
      "Handle the constraint violation in application code"
    ],
    codeExample: `-- PostgreSQL: Upsert\nINSERT INTO users (email, name)\nVALUES ('alice@example.com', 'Alice')\nON CONFLICT (email)\nDO UPDATE SET name = EXCLUDED.name;`,
    relatedErrors: ["sql-not-null-violation"]
  },
  {
    id: "sql-not-null-violation",
    errorMessage: "ERROR: null value in column \"name\" violates not-null constraint",
    language: "SQL",
    category: "Not Null Violation",
    explanation: "You're inserting or updating a row with NULL in a column that has a NOT NULL constraint.",
    causes: [
      "Missing required field in INSERT",
      "Variable holding NULL instead of expected value",
      "JOIN producing NULL where NOT NULL expected"
    ],
    solutions: [
      "Provide a value for all NOT NULL columns",
      "Use DEFAULT values in the schema",
      "Add COALESCE for potentially NULL values: `COALESCE(name, 'Unknown')`"
    ],
    relatedErrors: ["sql-duplicate-key"]
  },
  {
    id: "sql-foreign-key-violation",
    errorMessage: "ERROR: insert or update on table \"orders\" violates foreign key constraint \"orders_user_id_fkey\"",
    language: "SQL",
    category: "Foreign Key Violation",
    explanation: "You're referencing a row in another table that doesn't exist. The foreign key value doesn't match any primary key in the referenced table.",
    causes: [
      "Referencing a non-existent parent record",
      "Deleting a parent record that has children",
      "Typo in the foreign key value",
      "Wrong table order in inserts"
    ],
    solutions: [
      "Insert the parent record first",
      "Verify the referenced record exists",
      "Use ON DELETE CASCADE or ON DELETE SET NULL if appropriate",
      "Check foreign key values are correct"
    ],
    relatedErrors: []
  },
  // === React ===
  {
    id: "react-invalid-hook-call",
    errorMessage: "Invalid hook call. Hooks can only be called inside of the body of a function component.",
    language: "React",
    category: "Hooks",
    explanation: "A React Hook is being called outside a function component, inside a class component, or in a duplicate copy of React.",
    causes: [
      "Calling a hook inside a class component",
      "Calling a hook inside a regular function (not a component)",
      "Multiple copies of React loaded (monorepo issue)",
      "Breaking the Rules of Hooks (conditional calls, loops)"
    ],
    solutions: [
      "Ensure hooks are only called in function components or custom hooks",
      "Check for duplicate React in node_modules",
      "Never call hooks inside conditions, loops, or nested functions",
      "Use React DevTools to check component tree"
    ],
    relatedErrors: ["react-hooks-deps", "react-max-update-depth"]
  },
  {
    id: "react-hooks-deps",
    errorMessage: "React Hook useEffect has a missing dependency: 'foo'",
    language: "React",
    category: "Hooks",
    explanation: "A hook's dependency array is missing a value from the hook's body that could change between renders. This can cause stale closures.",
    causes: [
      "Omitting a variable from the dependency array",
      "Using a value inside useEffect that isn't in deps",
      "Unnecessary re-renders from changing dependency objects"
    ],
    solutions: [
      "Add the missing dependency to the array",
      "Use useCallback/useMemo to stabilize references",
      "Move the value inside the effect if it shouldn't trigger re-runs",
      "Suppress with eslint-disable if genuinely safe"
    ],
    relatedErrors: ["react-invalid-hook-call", "react-max-update-depth"]
  },
  {
    id: "react-max-update-depth",
    errorMessage: "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.",
    language: "React",
    category: "Error",
    explanation: "React detected an infinite re-render loop. A component's state update is triggering another render, which triggers another state update, and so on. React caps this at ~50 iterations to prevent your browser from freezing.",
    causes: [
      "setState called directly inside the render body or return statement",
      "useEffect with a dependency that changes every render (new object/array reference)",
      "useEffect without a dependency array runs after every render",
      "Setter function called in a useEffect that also depends on that state",
      "Derived state stored in useState instead of computed during render"
    ],
    solutions: [
      "Move setState calls into useEffect, event handlers, or callbacks — never into the render body",
      "Memoize objects and arrays passed as dependencies: useMemo or useCallback",
      "Use useCallback for functions passed as useEffect dependencies",
      "If deriving state from props, compute it during render instead of storing in useState",
      "Add a debugger or console.log inside the suspected useEffect to verify it's not re-triggering"
    ],
    codeExample: `// ❌ Bad: new array ref every render triggers useEffect loop\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const items = [count]; // new reference every render\n\n  useEffect(() => {\n    setCount(c => c + 1); // re-renders, items is new, useEffect runs again\n  }, [items]);\n\n  return <div>{count}</div>;\n}\n\n// ✅ Good: derive during render, no useEffect needed\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  const doubled = count * 2; // computed, not stored\n  return <div>{doubled}</div>;\n}`,
    relatedErrors: ["react-hooks-deps", "react-invalid-hook-call"]
  },
  // === Linux / Unix ===
  {
    id: "linux-command-not-found",
    errorMessage: "bash: docker: command not found",
    language: "Linux",
    category: "Shell",
    explanation: "The shell can't find the command in your PATH. The program either isn't installed or isn't in a directory listed in $PATH.",
    causes: [
      "Program not installed",
      "Program installed but not in PATH",
      "Typo in command name",
      "Using wrong shell (zsh vs bash PATH)"
    ],
    solutions: [
      "Install the program: `apt install docker.io` or `brew install docker`",
      "Check PATH: `echo $PATH`",
      "Find where it's installed: `which docker` or `find / -name docker`",
      "Add to PATH: `export PATH=$PATH:/new/path`"
    ],
    relatedErrors: []
  },
  {
    id: "linux-permission-denied",
    errorMessage: "bash: ./script.sh: Permission denied",
    language: "Linux",
    category: "Permissions",
    explanation: "The file doesn't have execute permission. Even if it's a script, you need to mark it as executable.",
    causes: [
      "File doesn't have execute permission set",
      "Downloaded file without +x bit",
      "Wrong file ownership"
    ],
    solutions: [
      "Make executable: `chmod +x script.sh`",
      "Run with interpreter: `bash script.sh`",
      "Check permissions: `ls -la script.sh`",
      "Change ownership: `chown user:group script.sh`"
    ],
    relatedErrors: ["node-eacces"]
  },
  // === Go ===
  {
    id: "go-undefined-type",
    errorMessage: "undefined: myStruct in mypackage.myStruct",
    language: "Go",
    category: "Compilation",
    explanation: "Go compiler can't find the type you're referencing. This is a compile-time error, not a runtime error.",
    causes: [
      "Type not defined in the package",
      "Import cycle between packages",
      "Wrong package name in import path",
      "Unexported type used from another package"
    ],
    solutions: [
      "Ensure the type is defined and exported (capital first letter)",
      "Check import paths are correct",
      "Break import cycles by restructuring packages",
      "Run `go mod tidy` to clean up dependencies"
    ],
    relatedErrors: ["go-cannot-take-address"]
  },
  {
    id: "go-cannot-assign",
    errorMessage: "cannot assign to value of type ... (non- assignable)",
    language: "Go",
    category: "Compilation",
    explanation: "You're trying to assign to something that can't be assigned to — like a function return value, a constant, or a value of the wrong type.",
    causes: [
      "Trying to assign to a function return value",
      "Type mismatch between source and target",
      "Assigning to a map element with wrong key type"
    ],
    solutions: [
      "Assign to a variable first, then modify",
      "Check types match",
      "Use make() for maps before assigning"
    ],
    relatedErrors: ["go-cannot-take-address"]
  },
  {
    id: "go-cannot-take-address",
    errorMessage: "cannot take address of value",
    language: "Go",
    category: "Compiler Error",
    explanation: "You're trying to use the `&` operator to get a pointer to a value that can't have its address taken. In Go, only addressable values (variables, pointer dereferences, slice indexing) can have their address taken. Literals, constants, and function return values are not addressable.",
    causes: [
      "Taking the address of a string or numeric literal",
      "Taking the address of a function return value",
      "Taking the address of a map value directly",
      "Taking the address of a constant",
      "Trying to take the address of a composite literal without assigning it first"
    ],
    solutions: [
      "Assign the value to a variable first, then take its address",
      "Use a temporary variable for function return values",
      "For maps, get the value into a variable first: `v := m[key]; &v`",
      "Consider whether you actually need a pointer in this case",
      "For string concatenation results, store in a variable before using &"
    ],
    codeExample: `// ❌ Bad\nstr := &("hello") // cannot take address of string literal\n\n// ✅ Good: assign first\nstr := \"hello\"\np := &str\n\n// ❌ Bad: can't take address of function return\np := &(getUser().Name)\n\n// ✅ Good\nuser := getUser()\np := &user.Name`,
    relatedErrors: ["go-undefined-type", "go-cannot-assign"]
  },
  // === Rust ===
  {
    id: "rust-cannot-move",
    errorMessage: "error[E0382]: borrow of moved value: `s`",
    language: "Rust",
    category: "Ownership",
    explanation: "You've used a value after moving it. Rust's ownership system ensures values are only used by one owner at a time.",
    causes: [
      "Passing a value to a function that takes ownership",
      "Assigning a value to a new variable (moves the original)",
      "Not using .clone() or .copy() when needed"
    ],
    solutions: [
      "Clone the value: `s.clone()` before passing",
      "Borrow instead of move: pass `&s`",
      "Use .copy() for Copy types (i32, bool, etc.)",
      "Restructure to avoid moving"
    ],
    codeExample: `// ❌ Bad\nlet s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1); // Error: s1 was moved\n\n// ✅ Good\nlet s1 = String::from("hello");\nlet s2 = s1.clone();\nprintln!("{}", s1); // Works: s1 is still valid`,
    relatedErrors: ["rust-borrow-checker", "rust-expected-function"]
  },
  {
    id: "rust-borrow-checker",
    errorMessage: "error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable",
    language: "Rust",
    category: "Ownership",
    explanation: "You're trying to mutably borrow a value that's already immutably borrowed. Rust doesn't allow simultaneous mutable and immutable references.",
    causes: [
      "Iterating over a collection while trying to modify it",
      "Passing immutable reference then trying to mutate",
      "Holding a reference while trying to take another"
    ],
    solutions: [
      "Complete the immutable borrow before mutating",
      "Clone data to avoid sharing references",
      "Use indices instead of iterators for mutation",
      "Restructure code to separate read and write phases"
    ],
    relatedErrors: ["rust-cannot-move", "rust-expected-function"]
  },
  {
    id: "rust-expected-function",
    errorMessage: "expected function, found struct `Foo`",
    language: "Rust",
    category: "TypeError",
    explanation: "You're trying to call something as a function, but Rust found a struct (or enum, or other type) at that location instead. This commonly happens when you confuse a type name with a constructor function, or when you forget the `::new()` syntax.",
    causes: [
      "Using `TypeName()` instead of `TypeName::new()` or `TypeName { }`",
      "Calling a struct as if it were a function (Rust structs aren't callable by default)",
      "Importing a type name that shadows a function",
      "Using lowercase type name that looks like a function call",
      "Confusing `Type` with `Type::default()` or a builder pattern"
    ],
    solutions: [
      "Use struct literal syntax: `MyStruct { field: value }`",
      "Use an associated function: `MyStruct::new()`",
      "Implement the `Fn` trait or use `Box<dyn Fn>` if you need callable structs",
      "Check if you meant to call a function with the same name in scope",
      "Look at the struct's `impl` block for available constructor methods"
    ],
    codeExample: `// ❌ Bad\nstruct Config {\n    debug: bool,\n}\n\nlet cfg = Config(true); // error: expected function, found struct\n\n// ✅ Good: struct literal syntax\nlet cfg = Config { debug: true };\n\n// ✅ Good: associated constructor\nimpl Config {\n    fn new(debug: bool) -> Self {\n        Config { debug }\n    }\n}\nlet cfg = Config::new(true);`,
    relatedErrors: ["rust-cannot-move", "rust-borrow-checker"]
  },
  // === Java ===
  {
    id: "java-null-pointer",
    errorMessage: "java.lang.NullPointerException",
    language: "Java",
    category: "NullPointerException",
    explanation: "You called a method or accessed a field on a null reference. This is one of the most common Java errors.",
    causes: [
      "Object reference not initialized",
      "Method returning null instead of an object",
      "Unboxing a null Integer/Double/etc.",
      "Missing initialization in a constructor"
    ],
    solutions: [
      "Add null checks before using the reference",
      "Use Optional<T> for values that may be absent",
      "Initialize objects in constructor or at declaration",
      "Use Objects.requireNonNull() for validation"
    ],
    relatedErrors: ["js-cannot-read-properties-of-undefined", "java-class-not-found"]
  },
  {
    id: "java-class-not-found",
    errorMessage: "java.lang.ClassNotFoundException: com.example.MyClass",
    language: "Java",
    category: "ClassNotFoundException",
    explanation: "The JVM tried to load a class by name but couldn't find it on the classpath. This is distinct from `NoClassDefFoundError`, which means the class was found at compile time but not at runtime. ClassNotFoundException typically points to a configuration or dependency issue.",
    causes: [
      "Class not included in the compiled output (JAR/WAR)",
      "Typo in the fully qualified class name",
      "Dependency not added to the classpath at runtime",
      "Classloader mismatch in application servers or OSGi environments",
      "Class was removed or renamed after compilation"
    ],
    solutions: [
      "Verify the class exists in the expected JAR: `jar tf myapp.jar | grep MyClass`",
      "Check for typos in the fully qualified class name",
      "Ensure the dependency is declared in your build file (Maven pom.xml or Gradle build.gradle)",
      "Check the classpath at runtime: `-verbose:class` JVM flag shows what's loaded",
      "In Spring Boot, verify the class is in a scanned package"
    ],
    codeExample: `// ❌ Common mistake: wrong package name\nClass.forName("com.exmaple.MyClass"); // typo in "example"\n\n// ✅ Correct\nClass.forName("com.example.MyClass");\n\n// Maven: ensure dependency is declared\n// <dependency>\n//   <groupId>com.example</groupId>\n//   <artifactId>my-lib</artifactId>\n//   <version>1.0</version>\n// </dependency>`,
    relatedErrors: ["java-null-pointer"]
  },
  // === PHP ===
  {
    id: "php-undefined-variable",
    errorMessage: "Warning: Undefined variable $username in /var/www/html/index.php on line 5",
    language: "PHP",
    category: "Notice",
    explanation: "You're using a variable that hasn't been defined yet. PHP creates it on-the-fly but emits a warning.",
    causes: [
      "Typo in variable name",
      "Variable defined in a different scope",
      "Variable not initialized before use",
      "Variable defined inside a conditional that wasn't met"
    ],
    solutions: [
      "Initialize the variable before use: `$username = null;`",
      "Check for typos in variable name",
      "Use strict mode: `declare(strict_types=1);`",
      "Set error_reporting to E_ALL in development"
    ],
    relatedErrors: ["js-reference-not-defined"]
  },
  {
    id: "php-parse-error-unexpected-eof",
    errorMessage: "Parse error: syntax error, unexpected end of file",
    language: "PHP",
    category: "Parse Error",
    explanation: "PHP hit the end of a file before it expected to. There's a missing closing bracket, semicolon, or keyword somewhere above this point. PHP's parser is line-by-line and stops at the first syntax issue it can't recover from.",
    causes: [
      "Missing closing curly brace `}` for a function, class, or control structure",
      "Missing semicolon at the end of a statement",
      "Unclosed string literal or array",
      "Missing closing parenthesis or bracket",
      "Unterminated `if`, `else`, `foreach`, or `while` block"
    ],
    solutions: [
      "Count opening and closing braces, parentheses, and brackets to find the mismatch",
      "Start from the bottom of the file and work upward, tracking nesting levels",
      "Use an IDE with bracket-matching (VS Code highlights matching pairs)",
      "Check for missing semicolons on the last line before the unexpected EOF",
      "Run `php -l filename.php` to get the exact line number"
    ],
    codeExample: `// ❌ Bad\n<?php\nfunction greet($name) {\n  echo \"Hello, \" . $name\n} // Missing semicolon AND missing closing brace for function\n\n// ✅ Good\n<?php\nfunction greet($name) {\n  echo \"Hello, \" . $name;\n}\n\ngreet("Alice");`,
    relatedErrors: ["php-undefined-variable"]
  },
  // === C/C++ ===
  {
    id: "cpp-segmentation-fault",
    errorMessage: "Segmentation fault (core dumped)",
    language: "C++",
    category: "Memory Error",
    explanation: "Your program tried to access memory it doesn't own. This is the most common fatal error in C and C++ programs. The operating system kills the process to prevent it from corrupting other memory.",
    causes: [
      "Dereferencing a null or uninitialized pointer",
      "Accessing an array out of bounds",
      "Writing to read-only memory (like a string literal)",
      "Stack overflow from deep recursion",
      "Use-after-free: accessing memory that was already freed",
      "Double free: freeing the same memory twice"
    ],
    solutions: [
      "Use a debugger (gdb, lldb) to find the exact line: `gdb ./program` then `run`",
      "Compile with address sanitizer: `g++ -fsanitize=address main.cpp`",
      "Initialize pointers before use: `int* p = nullptr;`",
      "Check array bounds before accessing",
      "Use smart pointers (std::unique_ptr, std::shared_ptr) instead of raw pointers",
      "Valgrind can detect memory errors: `valgrind ./program`"
    ],
    codeExample: `// ❌ Bad: null pointer dereference\nint* p = nullptr;\n*p = 42; // Segmentation fault\n\n// ✅ Good\nint x = 42;\nint* p = &x;\n*p = 42; // Works\n\n// ❌ Bad: out-of-bounds access\nint arr[3] = {1, 2, 3};\narr[10] = 5; // Undefined behavior / segfault\n\n// ✅ Good: bounds checking\nint arr[3] = {1, 2, 3};\nif (index >= 0 && index < 3) {\n  arr[index] = 5;\n}`,
    relatedErrors: []
  },
  // Additional JavaScript
  {
    id: "js-fetch-cors",
    errorMessage: "Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' has been blocked by CORS policy",
    language: "JavaScript",
    category: "CORS",
    explanation: "The browser blocked a cross-origin HTTP request because the server didn't include the right CORS headers. This is a browser security feature.",
    causes: [
      "Server doesn't send Access-Control-Allow-Origin header",
      "Request includes credentials but server doesn't allow them",
      "Preflight request failed",
      "Request method not allowed by server"
    ],
    solutions: [
      "Configure server to send CORS headers",
      "Use a proxy server in development",
      "Use no-cors mode (limited): `fetch(url, { mode: 'no-cors' })`",
      "For development: use browser extension to disable CORS (testing only)"
    ],
    relatedErrors: []
  },
  {
    id: "js-out-of-memory",
    errorMessage: "JavaScript heap out of memory",
    language: "Node.js",
    category: "OOM",
    explanation: "The Node.js process ran out of memory. The default heap size (~1.5GB) was exceeded.",
    causes: [
      "Loading very large files into memory",
      "Memory leak (variables not being garbage collected)",
      "Infinite loop creating objects",
      "Processing large datasets without streaming"
    ],
    solutions: [
      "Increase memory: `node --max-old-space-size=4096 script.js`",
      "Use streaming for large files",
      "Fix memory leaks (check for unclosed event listeners)",
      "Process data in chunks instead of all at once"
    ],
    relatedErrors: ["js-range-max-call-stack"]
  },
  // Additional Python
  {
    id: "py-syntax-error",
    errorMessage: "SyntaxError: invalid syntax",
    language: "Python",
    category: "SyntaxError",
    explanation: "Python can't parse the code. There's a fundamental syntax issue on the indicated line.",
    causes: [
      "Missing colon after if/for/while/def/class",
      "Unmatched parentheses or brackets",
      "Python 2 print statement in Python 3",
      "Wrong indentation after if/for block"
    ],
    solutions: [
      "Check the line number for the syntax issue",
      "Ensure all brackets are matched",
      "Use `print()` function (not statement) in Python 3",
      "Run `python -m py_compile file.py` for detailed error"
    ],
    relatedErrors: ["py-indentation-error"]
  },
  {
    id: "py-file-not-found",
    errorMessage: "FileNotFoundError: [Errno 2] No such file or directory: 'data.csv'",
    language: "Python",
    category: "FileNotFoundError",
    explanation: "Python can't find the file at the specified path. The file doesn't exist or the path is incorrect.",
    causes: [
      "File doesn't exist at the given path",
      "Wrong working directory",
      "Relative path used instead of absolute",
      "File was moved or deleted"
    ],
    solutions: [
      "Check the file exists: `ls -la data.csv`",
      "Use absolute paths: `/full/path/to/file`",
      "Check working directory: `os.getcwd()`",
      "Use pathlib for cross-platform paths"
    ],
    relatedErrors: ["node-enoent"]
  },
  // === npm specific ===
  {
    id: "npm-peer-dep-err",
    errorMessage: "npm ERR! code EPEERINVALID\nnpm ERR! EPEERINVALID peer dep",
    language: "Node.js",
    category: "npm",
    explanation: "A package has a peer dependency that conflicts with the version you have installed. npm warns (or errors) when peer dependency requirements aren't met.",
    causes: [
      "Package requires a specific version range of a peer dependency",
      "Multiple packages need different versions of the same peer dep",
      "Outdated npm version handling peer deps differently"
    ],
    solutions: [
      "Use `npm install --legacy-peer-deps` to skip peer dep checks",
      "Update the conflicting package to a compatible version",
      "Use `npm ls` to see which peer deps are broken",
      "Consider using yarn which handles peer deps more gracefully"
    ],
    relatedErrors: ["node-eresolve"]
  },
  // === Day 5 new additions: high-search-volume errors ===
  {
    id: "ts-type-not-assignable",
    errorMessage: "Type 'string' is not assignable to type 'number'",
    language: "TypeScript",
    category: "TypeError",
    explanation: "TypeScript's type checker found a type mismatch. You're trying to assign a value of one type to a variable or parameter expecting a different type.",
    causes: [
      "Passing a string to a function or variable typed as number",
      "Incorrect type annotation on a variable",
      "Function return type doesn't match the actual return value",
      "Object property types don't match the interface definition",
      "Using a union type without narrowing first"
    ],
    solutions: [
      "Convert the value to the correct type: `Number(value)` or `parseInt(value)`",
      "Update the type annotation to match the actual data",
      "Use type assertions if you're sure of the type: `value as number`",
      "Use a type guard to narrow the type before assignment",
      "Check if the API returns the expected type"
    ],
    codeExample: `// ❌ Bad\nconst count: number = "42"; // Type 'string' is not assignable to type 'number'\n\n// ✅ Good\nconst count: number = 42;\nconst count: number = Number("42");\nconst count: number = parseInt("42", 10);`,
    relatedErrors: ["ts-object-is-possibly-null", "js-cannot-read-properties-of-undefined"]
  },
  {
    id: "js-syntax-error-import",
    errorMessage: "SyntaxError: Cannot use import statement outside a module",
    language: "JavaScript",
    category: "SyntaxError",
    explanation: "You're using ES module syntax (import/export) in a file that JavaScript is treating as a CommonJS script. This happens when the file isn't configured as an ES module.",
    causes: [
      "Missing \"type\": \"module\" in package.json",
      "Using import/export in a .js file without ESM configuration",
      "Running a Node.js script without the --experimental-modules flag (older Node)",
      "Using ESM syntax in a file bundled by a tool expecting CommonJS",
      "Babel or TypeScript not configured for ESM output"
    ],
    solutions: [
      "Add \"type\": \"module\" to your package.json",
      "Rename the file to .mjs to treat it as an ES module",
      "Use require() instead of import for CommonJS projects",
      "Configure your bundler (webpack, esbuild, etc.) to handle ES modules",
      "Update Node.js to version 12+ for native ESM support"
    ],
    codeExample: `// ❌ Bad (in a CommonJS project)\nimport express from 'express';\n\n// ✅ Good (CommonJS)\nconst express = require('express');\n\n// ✅ Good (ES Module - add "type": "module" to package.json)\nimport express from 'express';`,
    relatedErrors: ["node-err-require-esm", "node-module-not-found"]
  },
  {
    id: "js-cannot-destructure",
    errorMessage: "TypeError: Cannot destructure property 'x' of 'y' as it is undefined",
    language: "JavaScript",
    category: "TypeError",
    explanation: "You're trying to destructure (unpack) properties from an object that is undefined or null. The destructuring syntax expects a valid object on the right side.",
    causes: [
      "Destructuring a function return value that returns undefined",
      "Async data not yet loaded when destructuring occurs",
      "Destructuring an object property that doesn't exist",
      "Passing undefined to a function that destructures its parameters",
      "Using destructuring in a callback where the argument is missing"
    ],
    solutions: [
      "Add a fallback with default value: `const { x } = obj || {}`",
      "Use optional chaining before destructuring: `const x = obj?.x`",
      "Ensure the data is loaded before destructuring",
      "Add a null check before the destructuring line",
      "Provide default values in destructuring: `const { x = 'default' } = obj`"
    ],
    codeExample: `// ❌ Bad\nfunction greet({ name, age }) {\n  return \`\${name} is \${age}\`;\n}\ngreet(undefined); // TypeError: Cannot destructure\n\n// ✅ Good\nfunction greet({ name = 'Guest', age = 0 } = {}) {\n  return \`\${name} is \${age}\`;\n}\n\ngreet({ name: 'Alice', age: 30 }); // "Alice is 30"\ngreet(); // "Guest is 0"`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "js-cannot-set-properties-of-undefined"]
  },
  {
    id: "react-element-type-invalid",
    errorMessage: "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined",
    language: "React",
    category: "RenderError",
    explanation: "React received an undefined component when rendering. This usually means a component import is wrong, a component isn't exported properly, or a render function returns undefined.",
    causes: [
      "Importing a component that doesn't exist in the module",
      "Using a default export without .default (mixed module systems)",
      "Circular import dependencies causing undefined at render time",
      "Conditional rendering that evaluates to undefined instead of null",
      "Component file exports the component with the wrong name"
    ],
    solutions: [
      "Check the import path and ensure the component exists",
      "Verify the export type: default export vs named export",
      "Use React.lazy with proper fallback for code splitting",
      "Ensure conditional renders return null instead of undefined",
      "Check for circular dependencies in your import chain"
    ],
    codeExample: `// ❌ Bad - importing named export as default\nimport MyComponent from './MyComponent'; // but it's exported as: export function MyComponent()\n\n// ✅ Good - match the export type\nimport { MyComponent } from './MyComponent';\n\n// ❌ Bad - conditional returns undefined\nconst App = () => condition && <Child />; // returns false when condition is false\n\n// ✅ Good - explicit null\nconst App = () => condition ? <Child /> : null;`,
    relatedErrors: ["react-invalid-hook-call", "react-hooks-deps"]
  },
  {
    id: "java-stackoverflow",
    errorMessage: "java.lang.StackOverflowError",
    language: "Java",
    category: "StackOverflowError",
    explanation: "The JVM ran out of stack space. This almost always means infinite recursion or extremely deep call stacks.",
    causes: [
      "Infinite recursion: method A calls method B which calls method A",
      "Missing base case in a recursive function",
      "toString() methods calling each other in a cycle",
      "Infinite loop with deep method calls",
      "Circular object references in serialization"
    ],
    solutions: [
      "Add a base case to stop recursion",
      "Convert recursion to iteration using a loop and stack data structure",
      "Increase stack size: `java -Xss2m MainClass`",
      "Check toString(), equals(), and hashCode() for circular references",
      "Use tail-call optimization where possible (Java doesn't optimize, but design around it)"
    ],
    codeExample: `// ❌ Bad - infinite recursion\npublic int factorial(int n) {\n  return n * factorial(n); // never stops!\n}\n\n// ✅ Good - with base case\npublic int factorial(int n) {\n  if (n <= 1) return 1; // base case\n  return n * factorial(n - 1);\n}\n\n// ✅ Good - iterative approach\npublic int factorial(int n) {\n  int result = 1;\n  for (int i = 2; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}`,
    relatedErrors: ["java-null-pointer", "js-range-max-call-stack"]
  },
  {
    id: "java-out-of-memory",
    errorMessage: "java.lang.OutOfMemoryError: Java heap space",
    language: "Java",
    category: "OutOfMemoryError",
    explanation: "The JVM ran out of memory in the heap space. This happens when the application allocates more objects than the JVM can handle with the configured maximum heap size.",
    causes: [
      "Loading very large datasets into memory (e.g., large files, big result sets)",
      "Memory leaks: objects held in collections/variables that are never released",
      "Infinite loops creating new objects without cleanup",
      "Insufficient JVM heap size for the application's workload",
      "Bitmaps or images too large for available memory"
    ],
    solutions: [
      "Increase heap size: `java -Xmx4g MainClass`",
      "Use streaming/pagination instead of loading everything into memory",
      "Profile with VisualVM or JProfiler to find memory leaks",
      "Use WeakReference or SoftReference for cache objects",
      "Process data in batches instead of all at once"
    ],
    codeExample: `// ❌ Bad - loading entire file into memory\nbyte[] data = Files.readAllBytes(largeFile.toPath());\n\n// ✅ Good - streaming approach\ntry (BufferedReader reader = Files.newBufferedReader(largeFile.toPath())) {\n  String line;\n  while ((line = reader.readLine()) != null) {\n    process(line);\n  }\n}\n\n// ✅ Good - increase heap\n// java -Xmx8g -jar myapp.jar`,
    relatedErrors: ["java-stackoverflow", "java-gc-overhead-limit"]
  },
  {
    id: "java-out-of-memory-metaspace",
    errorMessage: "java.lang.OutOfMemoryError: Metaspace",
    language: "Java",
    category: "OutOfMemoryError",
    explanation: "The JVM ran out of Metaspace memory, which stores class metadata. This is different from heap space — it means too many classes have been loaded, typically due to classloader leaks.",
    causes: [
      "Dynamic class generation (CGLIB, proxies, scripting engines) without unloading",
      "Classloader leak in hot-reload scenarios (e.g., re-deploying in an app server)",
      "Too many JSP pages compiled at runtime",
      "Memory profiling agents loading extra classes",
      "Frameworks that generate classes at runtime (Hibernate, Spring CGLIB proxies)"
    ],
    solutions: [
      "Increase Metaspace: `java -XX:MaxMetaspaceSize=512m MainClass`",
      "Fix classloader leaks — ensure proper cleanup on undeploy",
      "Reduce dynamic class generation (use caching for proxies)",
      "Check for duplicate class definitions",
      "Restart the application periodically in development"
    ],
    codeExample: `// ❌ Bad - creating new classloaders without cleanup\nfor (int i = 0; i < 1000; i++) {\n  ClassLoader cl = new URLClassLoader(urls);\n  Class<?> clazz = cl.loadClass(\"com.example.MyClass\");\n}\n\n// ✅ Good - reuse classloaders\n// Or set Metaspace limit:\n// java -XX:MaxMetaspaceSize=512m -jar app.jar`,
    relatedErrors: ["java-out-of-memory", "java-class-not-found"]
  },
  {
    id: "java-concurrent-modification",
    errorMessage: "java.util.ConcurrentModificationException",
    language: "Java",
    category: "ConcurrentModificationException",
    explanation: "A collection was modified while being iterated over using a for-each loop or Iterator. This is a safety mechanism to detect concurrent access that could produce unpredictable results.",
    causes: [
      "Removing elements from a collection inside a for-each loop",
      "Adding elements to a list while iterating over it",
      "Another thread modifying the collection during iteration",
      "Using an iterator's remove() method inconsistently",
      "Modifying the collection in a method called during iteration"
    ],
    solutions: [
      "Use Iterator.remove() instead of Collection.remove() during iteration",
      "Use a copy of the collection for modification: `new ArrayList<>(list)`",
      "Use ConcurrentHashMap or CopyOnWriteArrayList for multi-threaded access",
      "Use removeIf() (Java 8+) to safely remove during iteration",
      "Use streams with collect to filter instead of modifying in place"
    ],
    codeExample: `// ❌ Bad - modifying during iteration\nfor (String item : list) {\n  if (item.startsWith(\"bad\")) {\n    list.remove(item); // ConcurrentModificationException!\n  }\n}\n\n// ✅ Good - use Iterator\nIterator<String> it = list.iterator();\nwhile (it.hasNext()) {\n  if (it.next().startsWith(\"bad\")) {\n    it.remove(); // safe\n  }\n}\n\n// ✅ Good - use removeIf (Java 8+)\nlist.removeIf(item -> item.startsWith(\"bad\"));`,
    relatedErrors: ["java-null-pointer", "java-array-index-out-of-bounds"]
  },
  {
    id: "react-hydration-failed",
    errorMessage: "Hydration failed because the initial UI does not match what was rendered on the server",
    language: "React",
    category: "HydrationError",
    explanation: "React tried to hydrate (make interactive) the server-rendered HTML, but the server output doesn't match what the client would render. This is a Next.js / React SSR issue.",
    causes: [
      "Using browser-only APIs (window, document, localStorage) during SSR",
      "Date/time rendering that differs between server and client",
      "Using Math.random() or other non-deterministic values in render",
      "Conditional rendering based on client-only state",
      "Extensions or browser plugins modifying the DOM before hydration"
    ],
    solutions: [
      "Wrap browser-only code in useEffect (runs only on client)",
      "Use next/dynamic with { ssr: false } for client-only components",
      "Use suppressHydrationWarning on elements that intentionally differ",
      "Ensure date/time rendering is deterministic (use fixed timezone)",
      "Check for browser extensions injecting content into the page"
    ],
    codeExample: `// ❌ Bad - window is undefined on server\nconst theme = window.localStorage.getItem('theme');\n\n// ✅ Good - only access on client\nimport { useState, useEffect } from 'react';\nconst [theme, setTheme] = useState('light');\nuseEffect(() => {\n  setTheme(window.localStorage.getItem('theme') || 'light');\n}, []);`,
    relatedErrors: ["react-invalid-hook-call", "js-cannot-read-properties-of-undefined"]
  },
  {
    id: "js-unhandled-rejection",
    errorMessage: "UnhandledPromiseRejectionWarning: Error: [your error here]",
    language: "Node.js",
    category: "PromiseError",
    explanation: "A Promise was rejected and nothing caught the error. In older Node.js versions this was a warning; in Node.js 15+ it crashes the process.",
    causes: [
      "Missing .catch() on a Promise chain",
      "Async function without try/catch",
      "Returning a rejected promise without handling it",
      "Using .then() without a rejection handler",
      "Event listener that throws inside an async callback"
    ],
    solutions: [
      "Add .catch() to Promise chains: `promise.catch(console.error)`",
      "Wrap async code in try/catch blocks",
      "Use async/await with try/catch for cleaner error handling",
      "Add a global handler: `process.on('unhandledRejection', (err) => {})`",
      "Use the --unhandled-rejections=warn flag during development"
    ],
    codeExample: `// ❌ Bad - no error handling\nfetchData().then(data => process(data));\n\n// ❌ Bad - async without try/catch\nasync function doWork() {\n  const data = await fetchData(); // if this throws, nothing catches it\n}\n\n// ✅ Good\nfetchData()\n  .then(data => process(data))\n  .catch(err => console.error('Failed:', err));\n\n// ✅ Good\nasync function doWork() {\n  try {\n    const data = await fetchData();\n    process(data);\n  } catch (err) {\n    console.error('Failed:', err);\n  }\n}`,
    relatedErrors: ["js-promise-rejected", "js-out-of-memory"]
  },
  {
    id: "node-err-module-not-found",
    errorMessage: "ERR_MODULE_NOT_FOUND: Cannot find package 'x' imported from 'y'",
    language: "Node.js",
    category: "ESM",
    explanation: "Node.js ESM loader can't find the specified package. This is the ES module equivalent of MODULE_NOT_FOUND and is common when working with native ES modules in Node.js.",
    causes: [
      "Package not installed (missing from node_modules)",
      "Using 'type': 'module' in package.json but package only supports CommonJS",
      "Missing .js extension in import path (required in ESM)",
      "Package not listed as a dependency",
      "node_modules not installed or corrupted"
    ],
    solutions: [
      "Install the package: `npm install <package-name>`",
      "Add file extensions to relative imports: `import { x } from './utils.js'`",
      "Check that the package supports ES modules",
      "Run `npm install` to rebuild node_modules",
      "Use createRequire for CommonJS packages: `import { createRequire } from 'module'`"
    ],
    codeExample: `// ❌ Bad - missing .js extension in ESM\nimport { helper } from './utils';\n\n// ✅ Good - include extension in ESM\nimport { helper } from './utils.js';\n\n// ✅ Good - use createRequire for CommonJS packages\nimport { createRequire } from 'module';\nconst require = createRequire(import.meta.url);\nconst pkg = require('some-cjs-package');`,
    relatedErrors: ["node-err-require-esm", "node-module-not-found"]
  },
  {
    id: "sql-table-doesnt-exist",
    errorMessage: "relation \"users\" does not exist",
    language: "SQL",
    category: "TableError",
    explanation: "The database can't find the table you're querying. Either the table hasn't been created, you're querying the wrong schema, or there's a typo in the table name.",
    causes: [
      "Table hasn't been created yet (missing migration)",
      "Typo in the table name",
      "Querying the wrong database or schema",
      "Table was dropped or renamed",
      "Using unquoted identifiers that get case-folded (PostgreSQL lowercases unquoted names)"
    ],
    solutions: [
      "Run your database migrations: `npx prisma migrate dev` or `alembic upgrade head`",
      "Check the table name for typos",
      "Verify you're connected to the correct database: `\\c database_name`",
      "List tables: `\\dt` in psql, `SHOW TABLES;` in MySQL",
      "For PostgreSQL, check if the table is in a specific schema: `SELECT * FROM schema_name.table_name`"
    ],
    codeExample: `-- ❌ Table doesn't exist\nSELECT * FROM users;\n\n-- Check what tables exist\n\\dt                    -- PostgreSQL\nSHOW TABLES;           -- MySQL\n\n-- Create the table\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  name VARCHAR(255)\n);`,
    relatedErrors: ["sql-syntax-error", "sql-duplicate-key"]
  },
  {
    id: "py-name-error",
    errorMessage: "NameError: name 'x' is not defined",
    language: "Python",
    category: "NameError",
    explanation: "You're using a variable or function name that hasn't been defined in the current scope. Python doesn't have variable hoisting, so names must be defined before use.",
    causes: [
      "Using a variable before it's assigned",
      "Typo in the variable or function name",
      "Variable defined in a different scope (local vs global)",
      "Forgetting to import a module or function",
      "Using a built-in that was shadowed or removed"
    ],
    solutions: [
      "Define the variable before using it",
      "Check for typos in the name",
      "Ensure the variable is in the correct scope",
      "Import the required module or function",
      "Use `locals()` or `dir()` to debug available names"
    ],
    codeExample: `# ❌ Bad\nprint(username) # NameError: name 'username' is not defined\n\n# ✅ Good\nusername = "alice"\nprint(username)\n\n# ❌ Bad - scope issue\ndef greet():\n    print(name) # NameError if name not defined before greet()\n\nname = "alice"\ngreet() # Works now`,
    relatedErrors: ["py-import-error", "js-reference-not-defined"]
  },
  {
    id: "py-indentation-error",
    errorMessage: "IndentationError: expected an indented block",
    language: "Python",
    category: "IndentationError",
    explanation: "Python uses indentation to define code blocks. After a colon (in if, for, while, def, class, etc.), the next line must be indented. An empty block or incorrect indentation triggers this error.",
    causes: [
      "Forgot to indent after a colon (if/for/while/def/class)",
      "Empty block without a pass statement",
      "Mixed tabs and spaces for indentation",
      "Inconsistent indentation levels"
    ],
    solutions: [
      "Add proper indentation (4 spaces recommended) after the colon",
      "Use `pass` for empty blocks: `if True: pass`",
      "Configure your editor to use spaces, not tabs",
      "Enable 'show whitespace' in your editor to spot mixed indentation"
    ],
    codeExample: `# ❌ Bad\ndef greet():\n    print("hello")\n    if True:\n\n# ✅ Good\ndef greet():\n    print("hello")\n    if True:\n        pass\n\n# ✅ Good\ndef greet():\n    print("hello")\n    if True:\n        print("condition met")`,
    relatedErrors: ["py-indentation-error-unexpected"]
  },
  {
    id: "py-index-out-of-range",
    errorMessage: "IndexError: list index out of range",
    language: "Python",
    category: "IndexError",
    explanation: "You're trying to access an element at an index that doesn't exist in the list (or string/tuple). The index is either negative beyond the start or greater than or equal to the length.",
    causes: [
      "Index is greater than or equal to the list length",
      "Off-by-one error in a loop (using <= instead of <)",
      "Empty list being indexed",
      "List modified during iteration"
    ],
    solutions: [
      "Check the list length before indexing: `if i < len(lst)`",
      "Use `enumerate()` instead of manual index tracking",
      "Add bounds checking or try/except for dynamic data",
      "Use `len(lst) - 1` for the last valid index"
    ],
    codeExample: `# ❌ Bad\nitems = [1, 2, 3]\nprint(items[3])  # IndexError\n\n# ✅ Bad - off by one\nfor i in range(len(items) + 1):  # includes invalid index\n    print(items[i])\n\n# ✅ Good\nfor i in range(len(items)):  # only valid indices\n    print(items[i])\n\n# ✅ Best\nfor item in items:\n    print(item)`,
    relatedErrors: ["py-key-error", "js-cannot-read-properties-of-undefined"]
  },
  {
    id: "js-syntax-error-unexpected-token",
    errorMessage: "SyntaxError: Unexpected token",
    language: "JavaScript",
    category: "SyntaxError",
    explanation: "The JavaScript parser encountered a character or sequence of characters it didn't expect at that position. This is a syntax error — the code cannot be executed at all.",
    causes: [
      "Missing closing bracket, parenthesis, or brace",
      "Missing comma between elements or arguments",
      "Trailing comma in older environments (ES5)",
      "Using reserved words as identifiers",
      "Mixing up = and == or ===",
      "Async/await used outside async function"
    ],
    solutions: [
      "Check for missing closing brackets/braces/parentheses",
      "Look at the line number and the line before for missing commas",
      "Remove trailing commas if targeting older browsers",
      "Use your editor's syntax highlighting to spot issues",
      "Paste into an online syntax checker for a clear error message"
    ],
    codeExample: `// ❌ Bad - missing closing brace\ndef greet() {\n  console.log("hi")\n// ❌ Bad - trailing comma in old JS\nconst arr = [1, 2, 3,];\n\n// ✅ Good\ndef greet() {\n  console.log("hi")\n}\nconst arr = [1, 2, 3];`,
    relatedErrors: ["js-is-not-a-function", "js-reference-not-defined"]
  },
  {
    id: "node-econnrefused",
    errorMessage: "Error: connect ECONNREFUSED 127.0.0.1:5432",
    language: "Node.js",
    category: "ConnectionError",
    explanation: "Your Node.js application tried to connect to a network service (database, API, Redis, etc.) but the target server refused the connection. It's either not running, listening on a different port, or blocked by a firewall.",
    causes: [
      "The target service is not running",
      "Wrong host or port in the connection string",
      "Service is listening on a different interface (e.g., localhost vs 0.0.0.0)",
      "Firewall blocking the connection",
      "Docker container not started or port not mapped"
    ],
    solutions: [
      "Start the service: `docker-compose up -d` or `systemctl start postgresql`",
      "Verify the port matches the service's actual listening port",
      "Check if the service is bound to 127.0.0.1 vs 0.0.0.0",
      "Use `netstat -tlnp` or `ss -tlnp` to check listening ports",
      "For Docker, ensure port mapping: `-p 5432:5432`"
    ],
    codeExample: `# Check if the service is running\nnetstat -tlnp | grep 5432\n# or\nss -tlnp | grep 5432\n\n# Start PostgreSQL (Ubuntu)\nsudo systemctl start postgresql\n\n# Start with Docker\ndocker-compose up -d postgres`,
    relatedErrors: ["node-enoent", "node-eaddrinuse"]
  },
  {
    id: "sql-duplicate-key-constraint",
    errorMessage: "ERROR: duplicate key value violates unique constraint",
    language: "SQL",
    category: "ConstraintError",
    explanation: "You're trying to INSERT or UPDATE a row with a value that already exists in a column with a UNIQUE constraint (like a primary key or unique index). The database rejects the duplicate value.",
    causes: [
      "Inserting a row with a primary key that already exists",
      "Duplicate value in a unique email/username column",
      "Race condition in concurrent inserts",
      "Re-running a migration or seed script"
    ],
    solutions: [
      "Use INSERT ... ON CONFLICT (PostgreSQL) or INSERT ... ON DUPLICATE KEY UPDATE (MySQL)",
      "Check for existing records before inserting: `SELECT 1 FROM users WHERE email = $1`",
      "Use UUIDs instead of sequential IDs for primary keys",
      "Wrap concurrent inserts in a transaction with proper locking",
      "For migrations: check if data exists before re-seeding"
    ],
    codeExample: `-- ❌ Bad - will fail if email exists\nINSERT INTO users (email, name) VALUES ('alice@example.com', 'Alice');\n\n-- ✅ Good - upsert (PostgreSQL)\nINSERT INTO users (email, name)\nVALUES ('alice@example.com', 'Alice')\nON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;\n\n-- ✅ Good - upsert (MySQL)\nINSERT INTO users (email, name)\nVALUES ('alice@example.com', 'Alice')\nON DUPLICATE KEY UPDATE name = VALUES(name);`,
    relatedErrors: ["sql-not-null-constraint", "sql-foreign-key-constraint"]
  },
  // === High-volume additions ===
  {
    id: "react-rendered-more-hooks",
    errorMessage: "React Hook rules violated: Rendered more hooks than during the previous render",
    language: "React",
    category: "HooksError",
    explanation: "The number of hooks called between renders changed. React requires hooks to be called in the same order every time. Conditional logic, early returns, or loops before hooks cause this.",
    causes: [
      "Calling hooks inside if/else conditions or loops",
      "An early return before all hooks are called",
      "Dynamically adding/removing hooks based on props or state",
      "Using hooks inside a callback or nested function"
    ],
    solutions: [
      "Move all hooks to the top of the component, before any early returns",
      "Never call hooks conditionally — use a flag variable instead",
      "Extract conditional logic into separate components that each call their own hooks",
      "Use the React Rules of Hooks linter plugin to catch violations"
    ],
    codeExample: `// ❌ Bad - early return before hooks\nfunction Profile({ userId }) {\n  if (!userId) return null;\n  const user = useUser(userId); // Hook called conditionally!\n  return <div>{user.name}</div>;\n}\n\n// ✅ Good - hooks first, conditional render later\nfunction Profile({ userId }) {\n  const user = useUser(userId);\n  if (!userId) return null;\n  return <div>{user.name}</div>;\n}`,
    relatedErrors: ["react-invalid-hook-call", "react-infinite-loop"]
  },
  {
    id: "ts-type-not-assignable",
    errorMessage: "Type 'string' is not assignable to type 'number'",
    language: "TypeScript",
    category: "TypeError",
    explanation: "TypeScript detected a type mismatch. You're passing a value of one type where a different type is expected. This is a compile-time error that prevents bugs.",
    causes: [
      "Function parameter type doesn't match the value being passed",
      "Object property type doesn't match the assigned value",
      "Implicit type conversion issues",
      "API response type doesn't match the expected interface"
    ],
    solutions: [
      "Check the function/variable type annotation and fix the mismatch",
      "Use type assertion if you're sure about the type: `value as number`",
      "Add runtime validation before assignment",
      "Update the type definition to match the actual data shape"
    ],
    codeExample: `// ❌ Bad\nfunction add(a: number, b: number) { return a + b; }\nadd("1", "2"); // Error: Type 'string' is not assignable to type 'number'\n\n// ✅ Good\nadd(1, 2);\n\n// ✅ Good - parse first\nadd(parseInt("1"), parseInt("2"));`,
    relatedErrors: ["js-object-is-possibly-null", "ts-cannot-find-module"]
  },
  {
    id: "git-unrelated-histories",
    errorMessage: "fatal: refusing to merge unrelated histories",
    language: "Git",
    category: "Merge Error",
    explanation: "Git is refusing to merge two branches that don't share a common ancestor commit. This happens when you try to merge branches from different repositories or when the repository was re-initialized.",
    causes: [
      "Merging branches from two different git repositories",
      "Running `git init` inside an existing project and making initial commits",
      "Force-pushed a completely different commit history",
      "Merging after squashing or rewriting history"
    ],
    solutions: [
      "Use `git merge --allow-unrelated-histories branch-name` to force the merge",
      "Set up a proper remote and pull before merging",
      "For new repos, clone instead of init + add remote",
      "Use `git rebase` to establish a shared history first"
    ],
    codeExample: `# ❌ Bad - merge without common ancestor\ngit merge origin/main\n# fatal: refusing to merge unrelated histories\n\n# ✅ Good - allow unrelated histories\ngit merge --allow-unrelated-histories origin/main\n\n# ✅ Better - pull with allow-unrelated for initial setup\ngit pull origin main --allow-unrelated-histories`,
    relatedErrors: ["git-detached-head", "git-push-rejected"]
  },
  {
    id: "docker-daemon-not-running",
    errorMessage: "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?",
    language: "Docker",
    category: "ConnectionError",
    explanation: "The Docker client can't communicate with the Docker daemon. The daemon process isn't running, your user doesn't have permission, or the socket path is wrong.",
    causes: [
      "Docker service is not started",
      "User is not in the docker group (permission denied)",
      "Docker Desktop is not running (macOS/Windows)",
      "Socket file is missing or Docker was installed incorrectly"
    ],
    solutions: [
      "Start Docker: `sudo systemctl start docker`",
      "Add user to docker group: `sudo usermod -aG docker $USER` then log out/in",
      "On macOS/Windows: open Docker Desktop",
      "Verify Docker is installed: `docker --version`"
    ],
    codeExample: `# Check if Docker is running\nsudo systemctl status docker\n\n# Start Docker if it's not running\nsudo systemctl start docker\n\n# Add yourself to docker group (avoids sudo)\nsudo usermod -aG docker $USER\n# Log out and back in for group change to take effect`,
    relatedErrors: ["docker-permission-denied", "docker-port-in-use"]
  },
  {
    id: "python-syntax-error-eol",
    errorMessage: "SyntaxError: EOL while scanning string literal",
    language: "Python",
    category: "SyntaxError",
    explanation: "Python reached the end of a line while still reading a string. The string was never properly closed with a matching quote character.",
    causes: [
      "Missing closing quote on a string",
      "Using the wrong quote type to close (mixing single and double quotes)",
      "A backslash at the end of a line escapes the newline, joining strings unintentionally",
      "String spanning multiple lines without triple quotes"
    ],
    solutions: [
      "Add the missing closing quote character",
      "Use triple quotes for multi-line strings: `\"\"\"text\"\"\"`",
      "Check for mismatched quote types (single vs double)",
      "Remove trailing backslashes unless you intentionally want line continuation"
    ],
    codeExample: `# ❌ Bad - missing closing quote\nmessage = "Hello, world\nprint(message)\n\n# ❌ Bad - mixed quotes\ntext = "It's broken'\n\n# ✅ Good\ntext = "It's working"\ntext = 'It\\'s working'\nmulti = """This spans\nmultiple lines"""`,
    relatedErrors: ["js-unexpected-token", "js-unexpected-end-of-input"]
  },
  {
    id: "react-cannot-update-state",
    errorMessage: "Can't perform a React state update on an unmounted component",
    language: "React",
    category: "MemoryWarning",
    explanation: "You're trying to update state on a component that has already been removed from the DOM. React no longer warns about this (since React 18), but it indicates a memory leak from uncleaned subscriptions.",
    causes: [
      "Missing cleanup in useEffect (no return function to unsubscribe)",
      "Async operation completes after component unmounts (fetch, setTimeout)",
      "Event listener not removed on unmount",
      "Subscription not cancelled on unmount"
    ],
    solutions: [
      "Return a cleanup function from useEffect",
      "Use AbortController for fetch requests",
      "Use mounted flag or AbortSignal to guard state updates",
      "Use libraries like SWR or React Query that handle cleanup automatically"
    ],
    codeExample: `// ❌ Bad - no cleanup\nuseEffect(() => {\n  fetch('/api/data').then(res => res.json()).then(data => {\n    setData(data); // May run after unmount!\n  });\n}, []);\n\n// ✅ Good - with AbortController\nuseEffect(() => {\n  const controller = new AbortController();\n  fetch('/api/data', { signal: controller.signal })\n    .then(res => res.json())\n    .then(data => setData(data))\n    .catch(() => {}); // Ignore AbortError\n  return () => controller.abort();\n}, []);`,
    relatedErrors: ["react-infinite-loop", "react-rendered-more-hooks"]
  },
  {
    id: "docker-no-space-left",
    errorMessage: "no space left on device",
    language: "Docker",
    category: "DiskSpace",
    explanation: "The Docker host has run out of disk space. Docker images, stopped containers, build cache, and volumes accumulate over time and consume significant space.",
    causes: [
      "Docker images not cleaned up after builds",
      "Stopped containers accumulating",
      "Build cache growing over time",
      "Volumes holding large data"
    ],
    solutions: [
      "Prune everything: `docker system prune -a --volumes`",
      "Remove unused images: `docker image prune -a`",
      "Remove stopped containers: `docker container prune`",
      "Check disk usage: `docker system df`",
      "Set up Docker BuildKit with `--no-cache` for CI builds"
    ],
    codeExample: `# Check what's using space\ndocker system df\n\n# Remove everything unused\ndocker system prune -a --volumes\n\n# Remove only stopped containers\ndocker container prune\n\n# Remove dangling images\ndocker image prune\n\n# Nuclear option: remove all unused data\ndocker system prune -a --volumes --filter "until=24h"`,
    relatedErrors: ["docker-port-in-use", "docker-image-not-found"]
  },
  {
    id: "git-branch-not-found",
    errorMessage: "error: pathspec 'main' did not match any file(s) known to git",
    language: "Git",
    category: "BranchError",
    explanation: "Git can't find the branch you're trying to checkout or switch to. The branch name is wrong, or the branch doesn't exist locally or on the remote.",
    causes: [
      "Typo in branch name (case-sensitive)",
      "Branch exists on remote but not locally (need to fetch first)",
      "Default branch name changed (master vs main)",
      "Repository has no commits yet"
    ],
    solutions: [
      "List local branches: `git branch`",
      "List remote branches: `git branch -r`",
      "Fetch and checkout: `git fetch origin && git checkout main`",
      "If repo has no commits, make one first: `git commit --allow-empty -m 'init'`"
    ],
    codeExample: `# Check what branches exist\ngit branch -a\n\n# Fetch remote branches and checkout\ngit fetch origin\ngit checkout main\n\n# If you see master instead of main\ngit checkout master\n\n# Rename if needed\ngit branch -m master main`,
    relatedErrors: ["git-detached-head", "git-unrelated-histories"]
  },
  {
    id: "react-keys-warning",
    errorMessage: "Warning: Each child in a list should have a unique \"key\" prop",
    language: "React",
    category: "Warning",
    explanation: "React needs a stable, unique key for each element in a list to efficiently track which items changed, were added, or removed. Without keys, React falls back to index-based tracking which causes bugs during reordering or filtering.",
    causes: [
      "Using array index as key when list can be reordered",
      "Not providing a key at all",
      "Using non-unique values as keys (e.g., duplicate IDs)",
      "Using Math.random() as key (changes every render)"
    ],
    solutions: [
      "Use a stable, unique identifier: `item.id` or `item.uuid`",
      "For static lists without unique IDs, array index is acceptable",
      "Never use Math.random() as a key",
      "Generate IDs at creation time, not render time"
    ],
    codeExample: `// ❌ Bad - using index (causes bugs on reorder)\n{items.map((item, i) => <li key={i}>{item.name}</li>)}\n\n// ❌ Bad - Math.random() changes every render\n{items.map(item => <li key={Math.random()}>{item.name}</li>)}\n\n// ✅ Good - stable unique ID\n{items.map(item => <li key={item.id}>{item.name}</li>)}`,
    relatedErrors: ["react-rendered-more-hooks", "react-infinite-loop"]
  },
  {
    id: "python-typeerror-none",
    errorMessage: "TypeError: argument of type 'NoneType' is not iterable",
    language: "Python",
    category: "TypeError",
    explanation: "You're trying to use the `in` operator or iterate over a value that is `None`. Python can't check membership or loop over None.",
    causes: [
      "Function returns None implicitly (missing return statement)",
      "Variable was never assigned a value",
      "Dictionary lookup returns None instead of raising KeyError",
      "API response or database query returned None"
    ],
    solutions: [
      "Check for None before iterating: `if result is not None:`",
      "Ensure functions always return a value",
      "Use `or []` as a default: `for item in (result or []):`",
      "Set default values for variables"
    ],
    codeExample: `# ❌ Bad - function returns None implicitly\ndef get_users():\n  users = db.query("SELECT * FROM users")\n  # Missing return!\n\nfor user in get_users():  # TypeError: NoneType is not iterable\n  print(user)\n\n# ✅ Good\ndef get_users():\n  return db.query("SELECT * FROM users") or []\n\n# ✅ Good - guard against None\nusers = get_users()\nif users:\n  for user in users:\n    print(user)`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "python-keyerror"]
  },
  // === Sprint A: TypeScript errors (high search volume) ===
  {
    id: "ts-property-does-not-exist",
    errorMessage: "Property 'foo' does not exist on type 'Bar'",
    language: "TypeScript",
    category: "TypeError",
    explanation: "TypeScript can't find the property you're accessing on the given type. The property name is wrong, the type definition is missing it, or the value could be a different type than expected.",
    causes: [
      "Typo in the property name",
      "Property exists at runtime but isn't declared in the type/interface",
      "Value is a union type and the property only exists on some branches",
      "Object was typed as `any` but the type annotation is wrong",
      "Using optional chaining on a property that isn't optional in the type"
    ],
    solutions: [
      "Check the property name for typos",
      "Add the property to the interface/type definition",
      "Use type narrowing before accessing the property",
      "Use optional chaining: `obj?.foo`",
      "Update the type to use an index signature: `[key: string]: unknown`"
    ],
    codeExample: `// ❌ Bad\ninterface User {\n  name: string;\n  email: string;\n}\nconst user: User = { name: 'Alice', email: 'a@b.com' };\nconsole.log(user.age); // Property 'age' does not exist on type 'User'\n\n// ✅ Good - add to interface\ninterface User {\n  name: string;\n  email: string;\n  age?: number;\n}\nconsole.log(user.age); // OK, age is optional`,
    relatedErrors: ["ts-type-not-assignable", "js-cannot-read-properties-of-undefined"]
  },
  {
    id: "ts-cannot-find-module",
    errorMessage: "Cannot find module 'foo' or its corresponding type declarations",
    language: "TypeScript",
    category: "ModuleError",
    explanation: "TypeScript can't locate the module you're trying to import. Either the package isn't installed, it lacks TypeScript type declarations, or the import path is wrong.",
    causes: [
      "Package not installed (missing from node_modules)",
      "Package doesn't include TypeScript types (@types package needed)",
      "Import path is wrong (typo, wrong directory)",
      "Module resolution settings in tsconfig.json don't cover the path",
      "Using require() instead of import in an ESM project"
    ],
    solutions: [
      "Install the package: `npm install package-name`",
      "Install types: `npm install -D @types/package-name`",
      "Check the import path for typos",
      "Add path aliases in tsconfig.json: `\"paths\": { \"@/*\": [\"./src/*\"] }`",
      "Create a declaration file: `declare module 'foo'`"
    ],
    codeExample: `// ❌ Bad - types not installed\nimport express from 'express';\n// Cannot find module 'express' or its corresponding type declarations\n\n// ✅ Good - install types\n// npm install -D @types/express\nimport express from 'express';\n\n// ✅ Good - declare unknown module\n// src/types/foo.d.ts\ndeclare module 'foo' {\n  export function doSomething(): void;\n}`,
    relatedErrors: ["node-module-not-found", "node-cannot-find-module"]
  },
  {
    id: "ts-object-possibly-undefined",
    errorMessage: "Object is possibly 'undefined'",
    language: "TypeScript",
    category: "TypeError",
    explanation: "TypeScript detected that a value could be `undefined` at runtime, and you're trying to access a property or method without checking first. This is stricter than JavaScript — TypeScript catches potential runtime errors at compile time.",
    causes: [
      "Accessing a property on an optional parameter or variable",
      "Array.find() or similar method that can return undefined",
      "Function that returns T | undefined",
      "DOM querySelector that might not find an element",
      "Object property access without nullish check"
    ],
    solutions: [
      "Add a null check: `if (obj !== undefined)`",
      "Use optional chaining: `obj?.property`",
      "Use non-null assertion: `obj!.property` (only if you're sure)",
      "Use default values: `const val = obj?.property ?? defaultValue`",
      "Use a type guard function"
    ],
    codeExample: `// ❌ Bad\nconst el = document.getElementById('app');\nel.innerHTML = 'Hello'; // Object is possibly 'undefined'\n\n// ✅ Good - null check\nconst el = document.getElementById('app');\nif (el) {\n  el.innerHTML = 'Hello';\n}\n\n// ✅ Good - optional chaining + nullish coalescing\nconst text = el?.textContent ?? 'default';`,
    relatedErrors: ["ts-object-is-possibly-null", "js-cannot-read-properties-of-undefined"]
  },
  {
    id: "ts-expected-n-args",
    errorMessage: "Expected X arguments, but got Y",
    language: "TypeScript",
    category: "TypeError",
    explanation: "You're calling a function with a different number of arguments than its type signature declares. This catches bugs where you forget required parameters or pass too many.",
    causes: [
      "Missing required parameters in function call",
      "Using spread operator that expands to wrong number of args",
      "Function overloads don't match the call signature",
      "Calling a bound function with different arity",
      "Rest parameters counted differently than expected"
    ],
    solutions: [
      "Check the function signature and provide all required arguments",
      "Use optional parameters in the definition: `function foo(a: string, b?: number)`",
      "Add default values: `function foo(a: string, b = 0)`",
      "Check for function overloads that match your use case",
      "Use spread carefully: `func(...args)` where args has correct length"
    ],
    codeExample: `// ❌ Bad\nfunction greet(name: string, age: number): string {\n  return \`\${name} is \${age}\`;\n}\ngreet('Alice'); // Expected 2 arguments, but got 1\n\n// ✅ Good - optional param\ngreet('Alice', 30); // OK\ngreet('Alice'); // Now it works if age is optional`,
    relatedErrors: ["ts-type-not-assignable", "js-cannot-read-properties-of-undefined"]
  },
  {
    id: "ts-implicitly-any",
    errorMessage: "Parameter 'x' implicitly has an 'any' type",
    language: "TypeScript",
    category: "TypeError",
    explanation: "TypeScript can't infer the type of a parameter and defaults to `any`, but your configuration (usually `noImplicitAny: true`) requires explicit type annotations. This is one of the most common TypeScript errors for developers new to the language.",
    causes: [
      "Function parameter without a type annotation",
      "Callback parameter in forEach/map/filter without type",
      "Destructured parameter without type",
      "TypeScript strict mode enabled with `noImplicitAny: true`",
      "Imported function without type definitions"
    ],
    solutions: [
      "Add explicit type annotation: `function foo(x: string)`",
      "Type callback parameters: `arr.map((item: ItemType) => ...)`",
      "Type destructured params: `({ name, age }: { name: string; age: number })`",
      "Enable TypeScript auto-inference where possible",
      "Install @types packages for third-party libraries"
    ],
    codeExample: `// ❌ Bad - noImplicitAny: true\ngreet(name) {  // Parameter 'name' implicitly has an 'any' type\n  return \`Hello, \${name}\`;\n}\n\n// ✅ Good - explicit type\ngreet(name: string): string {\n  return \`Hello, \${name}\`;\n}\n\n// ✅ Good - typed callback\nusers.map((user: { name: string; age: number }) => user.name);`,
    relatedErrors: ["ts-type-not-assignable", "ts-property-does-not-exist"]
  },
  {
    id: "ts-no-overload-matches",
    errorMessage: "No overload matches this call",
    language: "TypeScript",
    category: "TypeError",
    explanation: "None of the function overload signatures match the arguments you passed. This often happens with generic functions, event handlers, or callback APIs where the expected type is more specific than what you're providing.",
    causes: [
      "Passing wrong argument types to an overloaded function",
      "Incorrect generic type inference",
      "Callback parameter types don't match the expected signature",
      "Using spread operator with wrong element types",
      "Missing required properties in an object literal"
    ],
    solutions: [
      "Check the function's overload signatures and match argument types",
      "Provide explicit generic type parameters: `fn<Type>(args)`",
      "Cast arguments to the expected type: `fn(arg as ExpectedType)`",
      "Check that object literals have all required properties"
    ],
    codeExample: `// ❌ Bad\nfunction process(data: string[]): void;\nfunction process(data: Record<string, string>): void;\nprocess([1, 2, 3]); // No overload matches — number[] isn't string[]\n\n// ✅ Good — match an overload signature\nprocess(["a", "b", "c"]);`,
    relatedErrors: ["ts-type-not-assignable", "ts-expected-n-args"]
  },
  {
    id: "ts-index-signature",
    errorMessage: "Element implicitly has an 'any' type because expression of type 'string' can't be used to index",
    language: "TypeScript",
    category: "TypeError",
    explanation: "You're trying to access an object property using a dynamic key, but the object's type doesn't have an index signature that allows string indexing. TypeScript doesn't know what type the result would be.",
    causes: [
      "Using a variable as an object key without an index signature",
      "Accessing a property that doesn't exist on the type",
      "Using bracket notation with a non-literal string",
      "Map-like objects typed as specific interfaces"
    ],
    solutions: [
      "Add an index signature: `[key: string]: unknown`",
      "Use `Record<string, ValueType>` instead of a plain interface",
      "Use `hasOwnProperty` check before access",
      "Use optional chaining with type assertion"
    ],
    codeExample: `// ❌ Bad\ninterface Config {\n  host: string;\n  port: number;\n}\nconst key = "host";\nconsole.log(config[key]); // implicit any\n\n// ✅ Good — use Record type\nconst config: Record<string, string | number> = { host: "localhost", port: 5432 };\nconsole.log(config[key]); // OK`,
    relatedErrors: ["ts-property-does-not-exist", "ts-implicitly-any"]
  },
  {
    id: "ts-cannot-invoke",
    errorMessage: "Cannot invoke an object which is possibly 'undefined'",
    language: "TypeScript",
    category: "TypeError",
    explanation: "You're trying to call a function that might be undefined. This commonly happens with optional methods, callback parameters, or values from lookups that may not find a match.",
    causes: [
      "Calling a function stored in a variable that might be undefined",
      "Invoking a method that's marked as optional",
      "Using a callback parameter without null-checking first",
      "Function looked up from a Map or Record without guard"
    ],
    solutions: [
      "Add a null check before invoking: `if (fn) fn()`",
      "Use optional chaining: `fn?.()`",
      "Provide a default: `(fn ?? defaultFn)()`",
      "Use the non-null assertion only when you're certain: `fn!()`"
    ],
    codeExample: `// ❌ Bad\nfunction callHandler(handler?: Function) {\n  handler(); // Cannot invoke which is possibly undefined\n}\n\n// ✅ Good — guard the call\nfunction callHandler(handler?: Function) {\n  if (handler) handler();\n}\n\n// ✅ Good — optional chaining\nfunction callHandler(handler?: Function) {\n  handler?.();\n}`,
    relatedErrors: ["ts-object-possibly-undefined", "js-cannot-read-properties-of-undefined"]
  },
  // === Kotlin ===
  {
    id: "kotlin-null-pointer",
    errorMessage: "kotlinNullPointerException: Attempt to invoke virtual method on a null object reference",
    language: "Kotlin",
    category: "NullPointerException",
    explanation: "You're trying to call a method or access a property on a null reference. Kotlin's null safety system is designed to prevent this, but it can still happen with nullable types, platform types from Java interop, or force-unwrapping.",
    causes: [
      "Calling a method on a nullable variable without null-checking",
      "Force-unwrapping with `!!` operator on a null value",
      "Platform types from Java code that Kotlin treats as nullable",
      "Uninitialized lateinit variable accessed before assignment",
      "Returning null from a function typed as non-null"
    ],
    solutions: [
      "Use safe call operator: `obj?.method()`",
      "Use let block: `obj?.let { it.method() }`",
      "Use Elvis operator for defaults: `obj ?: defaultValue`",
      "Remove `!!` and handle null explicitly",
      "Use `lateinit` only when you're sure it will be initialized"
    ],
    codeExample: `// ❌ Bad\nval name: String? = null\nprintln(name!!.length) // NullPointerException\n\n// ✅ Good - safe call\nval name: String? = null\nprintln(name?.length) // prints null\n\n// ✅ Good - Elvis operator\nval length = name?.length ?: 0 // prints 0`,
    relatedErrors: ["kotlin-type-mismatch"]
  },
  {
    id: "kotlin-type-mismatch",
    errorMessage: "Type mismatch: inferred type is String but Int was expected",
    language: "Kotlin",
    category: "TypeMismatch",
    explanation: "The type you provided doesn't match what was expected. Kotlin is strongly typed, so you can't pass a String where an Int is expected without explicit conversion.",
    causes: [
      "Passing wrong type to a function parameter",
      "Assigning a value of wrong type to a variable",
      "Implicit conversion not supported (Kotlin doesn't do this)",
      "Null value passed to non-null parameter",
      "Platform type ambiguity from Java interop"
    ],
    solutions: [
      "Use explicit conversion: `str.toInt()`, `num.toString()`",
      "Check the function signature for expected types",
      "Use nullable types if null is a valid value",
      "Add null checks before passing values"
    ],
    codeExample: `// ❌ Bad\nval num: Int = "42" // Type mismatch\n\n// ✅ Good\nval num: Int = "42".toInt()\n\n// ✅ Good - safe conversion\nval num: Int? = "abc".toIntOrNull() // null`,
    relatedErrors: ["kotlin-null-pointer"]
  },
  {
    id: "kotlin-unresolved-reference",
    errorMessage: "Unresolved reference: foo",
    language: "Kotlin",
    category: "CompileError",
    explanation: "The compiler can't find the variable, function, class, or property you're referencing. This is Kotlin's equivalent of 'Cannot find symbol'.",
    causes: [
      "Typo in the name of a variable or function",
      "Missing import statement",
      "The symbol is defined in a different module that isn't imported",
      "Accessing a private member from outside its scope",
      "Using a platform type that hasn't been imported from Java"
    ],
    solutions: [
      "Check for typos in the name",
      "Add the missing import: `import com.example.Foo`",
      "Ensure the module/dependency is included in build.gradle",
      "Check visibility modifiers (public, internal, private)",
      "Use IDE auto-import feature"
    ],
    relatedErrors: ["kotlin-null-pointer"]
  },
  // === Swift ===
  {
    id: "swift-implicitly-unwrapped-optional",
    errorMessage: "Unexpectedly found nil while implicitly unwrapping an Optional value",
    language: "Swift",
    category: "RuntimeError",
    explanation: "You're force-unwrapping an optional (!) that contains nil. This crashes your app at runtime.",
    causes: [
      "Force-unwrapping a variable with `!` that hasn't been assigned a value",
      "Outlets connected in Interface Builder that haven't loaded yet",
      "API response missing an expected field",
      "Optional chain result that resolved to nil"
    ],
    solutions: [
      "Use optional binding: `if let value = optional { ... }`",
      "Use guard statement: `guard let value = optional else { return }`",
      "Use the nil-coalescing operator: `optional ?? defaultValue`",
      "Use optional chaining: `optional?.property`",
      "Avoid using `!` unless you're certain the value exists"
    ],
    codeExample: `// ❌ Bad - force unwrap crashes if nil\nlet name = user!.name\n\n// ✅ Good - optional binding\nif let name = user?.name {\n  print(name)\n}\n\n// ✅ Good - nil coalescing\nlet name = user?.name ?? "Unknown"`,
    relatedErrors: ["js-cannot-read-properties-of-undefined"]
  },
  {
    id: "swift-index-out-of-range",
    errorMessage: "Index out of range",
    language: "Swift",
    category: "RuntimeError",
    explanation: "You're trying to access an array element at an index that doesn't exist. Swift arrays are zero-indexed.",
    causes: [
      "Accessing an array element with an index >= array.count",
      "Off-by-one errors in loops",
      "Using an index from user input without bounds checking",
      "Empty array access"
    ],
    solutions: [
      "Check bounds first: `if index < array.count`",
      "Use optional subscript: `array[safe: index]`",
      "Use `array.indices` for safe iteration",
      "Use `first`, `last`, or `randomElement()` instead of direct indexing"
    ],
    codeExample: `// ❌ Bad - crashes if index is out of bounds\nlet value = array[5]\n\n// ✅ Good - bounds check\nif index < array.count {\n  let value = array[index]\n}\n\n// ✅ Good - safe subscript extension\nextension Array {\n  subscript(safe index: Int) -> Element? {\n    return indices.contains(index) ? self[index] : nil\n  }\n}`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "python-index-out-of-range"]
  },
  {
    id: "swift-exit-code-1-compilation",
    errorMessage: "Command failed due to signal: Segmentation fault: 11",
    language: "Swift",
    category: "CompilationError",
    explanation: "The Swift compiler crashed (segfault). This is a compiler bug, not your code — though complex generics or very large files can trigger it.",
    causes: [
      "Compiler bug in the Swift compiler itself",
      "Extremely complex generic type inference",
      "Very large source files with many type constraints",
      "Using nightly or beta Xcode versions"
    ],
    solutions: [
      "Update to the latest stable Xcode/Swift toolchain",
      "Simplify complex generic types",
      "Split large files into smaller ones",
      "File a bug report at bugs.swift.org with a minimal reproduction",
      "Try adding explicit type annotations to help the compiler"
    ],
    relatedErrors: ["kotlin-unresolved-reference"]
  },
  // === Go ===
  {
    id: "go-nil-pointer-dereference",
    errorMessage: "runtime error: invalid memory address or nil pointer dereference",
    language: "Go",
    category: "RuntimeError",
    explanation: "You're trying to use a pointer that points to nil. This happens when you dereference a pointer before it's been assigned a value.",
    causes: [
      "Dereferencing a pointer that was never initialized",
      "Using a nil interface value",
      "Calling a method on a nil pointer",
      "Uninitialized struct pointer",
      "Failed error check (ignoring nil return)"
    ],
    solutions: [
      "Always check if a pointer is nil before dereferencing: `if ptr != nil { ... }`",
      "Use the address-of operator to initialize: `ptr = &value`",
      "Use error returns: always check errors from functions that return pointers",
      "Use the `new()` function to allocate zero-valued storage",
      "Initialize struct pointers with `&StructName{}`"
    ],
    codeExample: `// ❌ Bad
var user *User
fmt.Println(user.Name) // panic: nil pointer dereference

// ✅ Good
var user *User
if user != nil {
    fmt.Println(user.Name)
}

// ✅ Good - initialize the pointer
user = &User{Name: "Alice"}
fmt.Println(user.Name)`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "swift-implicitly-unwrapped-optional"]
  },
  {
    id: "go-concurrent-map-write",
    errorMessage: "fatal error: concurrent map writes",
    language: "Go",
    category: "RuntimeError",
    explanation: "Multiple goroutines are writing to the same map simultaneously. Go maps are not safe for concurrent use.",
    causes: [
      "Multiple goroutines writing to the same map without synchronization",
      "Missing mutex protection on shared map",
      "Using map as a channel-like communication mechanism",
      "Racing conditions in concurrent code"
    ],
    solutions: [
      "Use `sync.Mutex` to protect map access",
      "Use `sync.Map` for concurrent-safe maps",
      "Use channels instead of shared maps for goroutine communication",
      "Use `sync.RWMutex` for read-heavy workloads"
    ],
    codeExample: `// ❌ Bad - will crash under concurrent writes
m := make(map[string]int)
go func() { m["a"] = 1 }()
go func() { m["b"] = 2 }()

// ✅ Good - use a mutex
var mu sync.Mutex
m := make(map[string]int)
go func() {
    mu.Lock()
    m["a"] = 1
    mu.Unlock()
}()

// ✅ Good - use sync.Map
var m sync.Map
m.Store("a", 1)`,
    relatedErrors: ["js-cannot-set-properties-of-undefined"]
  },
  {
    id: "go-unreachable-code",
    errorMessage: "unreachable code",
    language: "Go",
    category: "CompileError",
    explanation: "The Go compiler detected code that can never be executed. This typically happens after a return statement, break, continue, or in an infinite loop.",
    causes: [
      "Statements after a return, break, or continue",
      "Code in a branch that's always false",
      "Code after an infinite for loop",
      "Unreachable error handling after a panic"
    ],
    solutions: [
      "Remove the unreachable code",
      "Check if the logic before it is correct",
      "If the code should be reachable, restructure the control flow",
      "Use the `go vet` tool to catch these issues"
    ],
    codeExample: `// ❌ Bad
func greet() string {
    return "hello"
    fmt.Println("this never runs") // unreachable
}

// ✅ Good
func greet() string {
    if false {
        fmt.Println("never runs")
    }
    return "hello"
}`,
    relatedErrors: ["kotlin-unresolved-reference"]
  },
  // === Ruby ===
  {
    id: "ruby-no-method-error",
    errorMessage: "NoMethodError: undefined method `foo' for nil:NilClass",
    language: "Ruby",
    category: "NoMethodError",
    explanation: "You're calling a method on `nil` when the object doesn't have that method. This is one of the most common Ruby errors, especially when dealing with optional data or method chaining.",
    causes: [
      "Calling a method on a variable that is nil",
      "Method chaining where an intermediate method returns nil",
      "Missing data from a database query or API call",
      "Typo in the method name"
    ],
    solutions: [
      "Use the safe navigation operator: `obj&.foo`",
      "Add a nil check before calling the method: `obj.foo if obj`",
      "Use `try` in Rails: `obj.try(:foo)`",
      "Initialize variables with default values"
    ],
    codeExample: `# ❌ Bad\nuser = User.find_by(email: "missing@example.com")\nputs user.name  # NoMethodError: undefined method 'name' for nil:NilClass\n\n# ✅ Good\nuser = User.find_by(email: "missing@example.com")\nputs user&.name  # Returns nil safely\n\n# ✅ Good\nuser = User.find_by(email: "missing@example.com")\nif user\n  puts user.name\nend`,
    relatedErrors: ["ruby-type-error"]
  },
  {
    id: "ruby-type-error",
    errorMessage: "TypeError: no implicit conversion of Symbol into Integer",
    language: "Ruby",
    category: "TypeError",
    explanation: "You're trying to use the wrong type where a specific type is expected. This commonly happens when accessing arrays with symbols or mixing up method argument types.",
    causes: [
      "Accessing an array with a symbol key instead of an integer index",
      "Passing wrong argument types to a method",
      "Trying to concatenate incompatible types",
      "Mixing up hashes and arrays"
    ],
    solutions: [
      "Check the expected type and use the correct one",
      "Use `.class` to inspect the object type",
      "Convert types explicitly: `symbol.to_s`, `string.to_sym`",
      "Read the error backtrace to find the exact line"
    ],
    codeExample: `# ❌ Bad\narr = [1, 2, 3]\narr[:first]  # TypeError: no implicit conversion of Symbol into Integer\n\n# ✅ Good\narr = [1, 2, 3]\narr[0]  # => 1\n\n# ✅ Good\narr = [1, 2, 3]\narr.first  # => 1`,
    relatedErrors: ["ruby-argument-error"]
  },
  {
    id: "ruby-syntax-error",
    errorMessage: "SyntaxError: unexpected keyword_end",
    language: "Ruby",
    category: "SyntaxError",
    explanation: "The Ruby parser found a syntax error in your code. This usually means a missing or extra keyword (end, def, class, if, etc.) or incorrect indentation.",
    causes: [
      "Missing `end` keyword to close a block",
      "Extra `end` keyword without matching opening keyword",
      "Missing comma between arguments",
      "Incorrect string interpolation syntax"
    ],
    solutions: [
      "Check that every `def`, `class`, `module`, `if`, `unless`, `do` has a matching `end`",
      "Use a code editor with bracket/keyword matching",
      "Count opening and closing keywords manually",
      "Check for typos in keyword names"
    ],
    codeExample: `# ❌ Bad\ndef greet(name)\n  puts "Hello, #{name}"\n  # Missing 'end'\n\n# ✅ Good\ndef greet(name)\n  puts "Hello, #{name}"\nend`,
    relatedErrors: ["ruby-load-error"]
  },
  {
    id: "ruby-load-error",
    errorMessage: "LoadError: cannot load such file -- some_library",
    language: "Ruby",
    category: "LoadError",
    explanation: "Ruby can't find the file or library you're trying to load. This commonly happens with missing gems, incorrect require paths, or gems that aren't installed.",
    causes: [
      "The gem is not installed (missing from Gemfile or not yet bundled)",
      "The require path is incorrect (typo or wrong module name)",
      "The gem name differs from the require name",
      "Load path not configured correctly"
    ],
    solutions: [
      "Run `bundle install` to install missing gems",
      "Check the gem's documentation for the correct require path",
      "Add the gem to your Gemfile if not present",
      "Try `gem install gem_name` for non-Bundler projects"
    ],
    codeExample: `# ❌ Bad\nrequire 'rails'  # LoadError if Rails gem not installed\n\n# ✅ Good\n# Make sure gem is in Gemfile:\n# gem 'rails'\n# Then run: bundle install\n\n# Some gems have different require names:\nrequire 'active_support'  # Not 'rails'\nrequire 'pry'             # The gem is called 'pry-byebug'`,
    relatedErrors: ["ruby-name-error"]
  },
  {
    id: "ruby-name-error",
    errorMessage: "NameError: uninitialized constant SomeClass",
    language: "Ruby",
    category: "NameError",
    explanation: "Ruby can't find the constant, class, or module you're referencing. This is different from NoMethodError — it means the name itself doesn't exist in the current scope.",
    causes: [
      "Class or module hasn't been required/loaded yet",
      "Typo in the class or constant name",
      "Wrong namespace or module scope",
      "Trying to use a variable as a constant (first letter capitalized)"
    ],
    solutions: [
      "Ensure the file containing the class is required",
      "Check the spelling and capitalization of the constant",
      "Use the fully qualified name: `::Module::ClassName`",
      "Don't capitalize local variables (Ruby treats them as constants)"
    ],
    codeExample: `# ❌ Bad\nclass MyService\n  def call\n    User.all  # NameError if User model file not loaded\n  end\nend\n\n# ✅ Bad (common gotcha)\nmy_variable = 42\nputs My_Variable  # NameError: uninitialized constant My_Variable\n# Ruby thinks My_Variable is a constant!\n\n# ✅ Good\nclass MyService\n  def call\n    ::User.all  # Use fully qualified name\n  end\nend`,
    relatedErrors: ["ruby-no-method-error"]
  },
  // === C++ ===
  {
    id: "cpp-segmentation-fault",
    errorMessage: "Segmentation fault (core dumped)",
    language: "C++",
    category: "Runtime Error",
    explanation: "A segmentation fault (segfault) occurs when your program tries to access memory it doesn't own. This is the C++ equivalent of a null pointer dereference — the OS kills your process to prevent memory corruption.",
    causes: [
      "Dereferencing a null or uninitialized pointer",
      "Accessing an array out of bounds",
      "Using a pointer after freeing the memory it points to (dangling pointer)",
      "Writing to read-only memory (e.g., modifying a string literal)",
      "Stack overflow from infinite recursion"
    ],
    solutions: [
      "Use a debugger (gdb, lldb) to find the exact line causing the segfault",
      "Initialize all pointers before use",
      "Use smart pointers (std::unique_ptr, std::shared_ptr) instead of raw pointers",
      "Check array bounds before accessing elements",
      "Use AddressSanitizer: compile with -fsanitize=address"
    ],
    codeExample: `// ❌ Bad\nint* ptr = nullptr;\n*ptr = 42;  // Segmentation fault!\n\n// ✅ Good\nint value = 42;\nint* ptr = &value;\nstd::cout << *ptr;  // Works\n\n// ✅ Better — use smart pointers\nauto ptr = std::make_unique<int>(42);\nstd::cout << *ptr;  // Works, auto-cleanup`,
    relatedErrors: ["cpp-uninitialized-variable"]
  },
  {
    id: "cpp-uninitialized-variable",
    errorMessage: "warning: 'variable' is used uninitialized in this function",
    language: "C++",
    category: "Warning",
    explanation: "Using a variable before initializing it leads to undefined behavior. The variable contains whatever garbage value was left in that memory location.",
    causes: [
      "Declaring a variable without assigning a value",
      "Conditional initialization where not all branches set the value",
      "Using a variable declared in a different scope"
    ],
    solutions: [
      "Always initialize variables at declaration: `int x = 0;`",
      "Use std::optional for variables that may not have a value",
      "Enable compiler warnings: -Wall -Wextra"
    ],
    codeExample: `// ❌ Bad\nint count;\nif (condition) {\n  count = 10;\n}\nstd::cout << count;  // Undefined behavior if condition is false\n\n// ✅ Good\nint count = 0;\nif (condition) {\n  count = 10;\n}\nstd::cout << count;  // Always defined`,
    relatedErrors: ["cpp-segmentation-fault"]
  },
  // === PHP ===
  {
    id: "php-undefined-variable",
    errorMessage: "Notice: Undefined variable: variable_name",
    language: "PHP",
    category: "Notice",
    explanation: "You're trying to use a variable that hasn't been defined in the current scope. PHP creates the variable with a null value but throws a notice.",
    causes: [
      "Typo in variable name",
      "Variable defined in a different scope (e.g., inside a function but used outside)",
      "Variable not initialized before use",
      "Using a variable from an included file that doesn't exist"
    ],
    solutions: [
      "Initialize the variable before use: `$variable = null;`",
      "Check variable scoping (local vs global)",
      "Use `isset()` to check if a variable exists before using it",
      "Enable strict error reporting in development"
    ],
    codeExample: `// ❌ Bad\nfunction greet() {\n  $name = 'Alice';\n}\necho $name;  // Undefined variable\n\n// ✅ Good\nfunction greet() {\n  global $name;\n  $name = 'Alice';\n}\necho $name;  // Works\n\n// ✅ Better\n$name = 'Alice';\necho $name;  // No need for global`,
    relatedErrors: ["php-undefined-array-key"]
  },
  {
    id: "php-undefined-array-key",
    errorMessage: "Warning: Undefined array key \"key_name\"",
    language: "PHP",
    category: "Warning",
    explanation: "You're trying to access an array key that doesn't exist. PHP 8+ throws a warning instead of silently returning null.",
    causes: [
      "Accessing a key that was never set",
      "Typo in the key name",
      "JSON response missing expected keys",
      "Array was not decoded properly"
    ],
    solutions: [
      "Use isset() or array_key_exists() before accessing",
      "Use the null coalescing operator: $arr['key'] ?? 'default'",
      "Use array_fill_keys() to initialize expected keys"
    ],
    codeExample: `// ❌ Bad\necho $data['name'];  // Warning if 'name' key doesn't exist\n\n// ✅ Good\n$name = isset($data['name']) ? $data['name'] : 'Unknown';\n\n// ✅ Better (PHP 7+)\n$name = $data['name'] ?? 'Unknown';\n\n// ✅ Best\necho $data['name'] ?? 'Unknown';`,
    relatedErrors: ["php-undefined-variable"]
  },
  {
    id: "php-fatal-error-out-of-memory",
    errorMessage: "Fatal error: Allowed memory size of 134217728 bytes exhausted",
    language: "PHP",
    category: "Fatal Error",
    explanation: "Your script tried to allocate more memory than PHP's memory_limit allows. This usually means you're loading a huge file into memory or have an infinite loop creating objects.",
    causes: [
      "Loading a large file entirely into memory (e.g., file_get_contents on a huge file)",
      "Infinite loop creating objects or appending to arrays",
      "Processing very large datasets without pagination",
      "Memory leak from circular references (pre-PHP 8)"
    ],
    solutions: [
      "Increase memory_limit in php.ini or with ini_set('memory_limit', '256M')",
      "Process large files line by line (fgetcsv instead of file_get_contents)",
      "Add pagination to database queries",
      "Use generators (yield) for large datasets"
    ],
    codeExample: `// ❌ Bad — loads entire file into memory\n$content = file_get_contents('huge_file.csv');\n\n// ✅ Good — process line by line\n$handle = fopen('huge_file.csv', 'r');\nwhile (($line = fgetcsv($handle)) !== false) {\n  processLine($line);\n}\nfclose($handle);`,
    relatedErrors: ["php-undefined-variable"]
  },
  // === C# ===
  {
    id: "csharp-nullreference",
    errorMessage: "System.NullReferenceException: Object reference not set to an instance of an object.",
    language: "C#",
    category: "NullReferenceException",
    explanation: "You're trying to use an object that is null. This is the most common C# exception and usually means an object wasn't initialized, a method returned null, or a cast failed.",
    causes: [
      "Using a variable before assigning a value (default is null for reference types)",
      "A method returned null but you didn't check for it",
      "Casting a null object to a specific type",
      "Accessing a property on a null collection element",
      "Entity Framework navigation property not loaded"
    ],
    solutions: [
      "Use null-conditional operator: `obj?.Property`",
      "Use null-coalescing operator: `value ?? defaultValue`",
      "Initialize objects at declaration: `var list = new List<string>();`",
      "Check for null before use: `if (obj != null)`",
      "Enable nullable reference types in .csproj: `<Nullable>enable</Nullable>`"
    ],
    codeExample: `// ❌ Bad\nstring name = null;\nConsole.WriteLine(name.Length);  // NullReferenceException\n\n// ✅ Good — null check\nstring name = GetName();\nif (name != null) {\n    Console.WriteLine(name.Length);\n}\n\n// ✅ Better — null-conditional\nConsole.WriteLine(name?.Length ?? 0);\n\n// ✅ Best — enable nullable reference types\nstring name = GetName() ?? "Unknown";`,
    relatedErrors: ["csharp-index-out-of-range"]
  },
  {
    id: "csharp-index-out-of-range",
    errorMessage: "System.IndexOutOfRangeException: Index was outside the bounds of the array.",
    language: "C#",
    category: "IndexOutOfRangeException",
    explanation: "You're trying to access an array element at an index that doesn't exist. Arrays are zero-indexed, so the last valid index is Length - 1.",
    causes: [
      "Off-by-one error: using `arr.Length` as an index instead of `arr.Length - 1`",
      "Loop condition uses `<=` instead of `<`",
      "Empty array with no elements",
      "Collection modified during iteration"
    ],
    solutions: [
      "Always check array length before accessing by index",
      "Use `for (int i = 0; i < arr.Length; i++)` (not `<=`)",
      "Use LINQ methods like `.FirstOrDefault()` instead of indexing",
      "Use `List<T>` instead of arrays when size is dynamic"
    ],
    codeExample: `// ❌ Bad\nint[] arr = { 1, 2, 3 };\nConsole.WriteLine(arr[3]);  // IndexOutOfRangeException!\n\n// ✅ Good\nint[] arr = { 1, 2, 3 };\nif (arr.Length > 3) {\n    Console.WriteLine(arr[3]);\n}\n\n// ✅ Better — use LINQ\nvar arr = new[] { 1, 2, 3 };\nint? third = arr.ElementAtOrDefault(3);  // returns null\nConsole.WriteLine(third ?? 0);`,
    relatedErrors: ["csharp-nullreference"]
  },
  {
    id: "csharp-task-cancelled",
    errorMessage: "System.Threading.Tasks.TaskCanceledException: A task was canceled.",
    language: "C#",
    category: "TaskCanceledException",
    explanation: "An async task was canceled via a CancellationToken, or it timed out. This is common in HTTP calls and database queries with timeouts.",
    causes: [
      "CancellationToken was triggered before the task completed",
      "HttpClient timeout expired (default is 100 seconds)",
      "Database query timeout exceeded",
      "Task.Wait() or Task.Result called on a canceled task"
    ],
    solutions: [
      "Check if the task was canceled before accessing results",
      "Increase HttpClient timeout: `client.Timeout = TimeSpan.FromMinutes(5)`",
      "Handle OperationCanceledException in try-catch blocks",
      "Don't call .Result on tasks — use await instead"
    ],
    codeExample: `// ❌ Bad\nvar response = await client.GetAsync(url);  // May throw if canceled\n\n// ✅ Good\ntry {\n    var response = await client.GetAsync(url, cancellationToken);\n    response.EnsureSuccessStatusCode();\n} catch (OperationCanceledException) {\n    Console.WriteLine("Request was canceled or timed out");\n}\n\n// ✅ Better — configure timeout\nclient.Timeout = TimeSpan.FromSeconds(30);`,
    relatedErrors: ["csharp-nullreference"]
  },
  // === Rust (additional) ===
  {
    id: "rust-lifetime-mismatch",
    errorMessage: "error[E0621]: explicit lifetime required in the type of `data`",
    language: "Rust",
    category: "Lifetime",
    explanation: "A reference doesn't live long enough for the function signature. Rust requires references to outlive the data they point to, and this error means the borrow checker can't verify that.",
    causes: [
      "Returning a reference to a local variable",
      "Storing a reference in a struct without a lifetime annotation",
      "Passing short-lived references where long-lived ones are expected",
      "Forgetting lifetime annotations on struct definitions"
    ],
    solutions: [
      "Add explicit lifetime annotations: `fn foo<'a>(x: &'a str) -> &'a str`",
      "Use owned types (String, Vec) instead of references",
      "Clone the data to extend its lifetime",
      "Restructure to avoid holding references across scopes"
    ],
    codeExample: `// ❌ Bad\nstruct Parser<'a> {\n    input: &'a str,\n}\n\nfn parse() -> Parser {\n    let input = String::from("hello");\n    Parser { input: &input } // Error: input dropped too soon\n}\n\n// ✅ Good\nstruct Parser {\n    input: String, // Own the data\n}\n\nfn parse() -> Parser {\n    let input = String::from("hello");\n    Parser { input } // Works: data is owned`,
    relatedErrors: ["rust-cannot-move", "rust-borrow-checker"]
  },
  {
    id: "rust-mutability",
    errorMessage: "error[E0596]: cannot borrow `*vec` as mutable, as it is behind a `&` reference",
    language: "Rust",
    category: "BorrowChecker",
    explanation: "You're trying to mutate a value through an immutable reference. In Rust, you need `&mut` for mutable access, and only one `&mut` reference can exist at a time.",
    causes: [
      "Iterating with `for item in &vec` then trying to modify items",
      "Passing `&vec` to a function that tries to modify it",
      "Capturing an immutable reference in a closure that needs mutation",
      "Using `.iter()` instead of `.iter_mut()`"
    ],
    solutions: [
      "Use `&mut` when you need mutation: `for item in &mut vec`",
      "Use `.iter_mut()` instead of `.iter()`",
      "Pass mutable references: `fn modify(v: &mut Vec<i32>)`",
      "Clone data if you need both read and write access"
    ],
    codeExample: `// ❌ Bad\nlet vec = vec![1, 2, 3];\nfor item in &vec {\n    *item += 1; // Error: cannot borrow as mutable\n}\n\n// ✅ Good\nlet mut vec = vec![1, 2, 3];\nfor item in &mut vec {\n    *item += 1; // Works: mutable reference`,
    relatedErrors: ["rust-borrow-checker", "rust-cannot-move"]
  },
  {
    id: "rust-unwrap-none",
    errorMessage: "called `Option::unwrap()` on a `None` value",
    language: "Rust",
    category: "Panic",
    explanation: "You called `.unwrap()` on an Option that was None. This causes a panic and crashes your program. `.unwrap()` is fine in tests and prototypes but dangerous in production code.",
    causes: [
      "Using `.unwrap()` on a function that returns None",
      "Not checking for None before unwrapping",
      "Parsing user input without validation",
      "Accessing a HashMap key that doesn't exist"
    ],
    solutions: [
      "Use `.unwrap_or(default)` or `.unwrap_or_else(|| ...)` for fallback values",
      "Use `match` or `if let` to handle None explicitly",
      "Use the `?` operator to propagate errors",
      "Use `.expect(\"descriptive message\")` at minimum for better error messages"
    ],
    codeExample: `// ❌ Bad — panics if value is None\nlet name = config.get("name").unwrap();\n\n// ✅ Good — handle None explicitly\nmatch config.get("name") {\n    Some(name) => println!(\"Name: {}\", name),\n    None => println!(\"Name not found\"),\n}\n\n// ✅ Good — use a default\nlet name = config.get("name").unwrap_or(&"Anonymous".to_string());`,
    relatedErrors: ["rust-cannot-move", "rust-expected-function"]
  },
  // === Swift ===
  {
    id: "swift-value-type",
    errorMessage: "Cannot assign to property: 'self' is immutable",
    language: "Swift",
    category: "Compile Error",
    explanation: "You're trying to modify a property of a struct (value type) from a method that isn't marked `mutating`. In Swift, structs are value types — methods can't modify them unless explicitly marked as mutating.",
    causes: [
      "Calling a non-mutating method on a struct property from within a struct method",
      "Trying to change a `let` constant property",
      "Attempting to modify a property in an immutable context (like a computed property getter)",
      "Working with structs inside a `let` binding"
    ],
    solutions: [
      "Mark the method as `mutating`: `mutating func update() { ... }`",
      "Change `let` to `var` for the variable being modified",
      "Use a `class` (reference type) instead of a `struct` if mutation is needed",
      "Return a new instance instead of mutating: `func updated() -> Self`"
    ],
    codeExample: `// ❌ Bad\nstruct Counter {\n    var count = 0\n    func increment() {\n        count += 1 // Error: cannot assign to property\n    }\n}\n\n// ✅ Good — mark as mutating\nstruct Counter {\n    var count = 0\n    mutating func increment() {\n        count += 1\n    }\n}`,
    relatedErrors: ["swift-optional-binding", "swift-cannot-invoke"]
  },
  {
    id: "swift-optional-binding",
    errorMessage: "Value of optional type must be unwrapped to a value of type",
    language: "Swift",
    category: "Type Error",
    explanation: "You're trying to use an Optional value directly where a non-optional is expected. Swift forces you to explicitly handle the possibility that an Optional might be nil, preventing nil-related crashes.",
    causes: [
      "Using an optional variable without unwrapping it first",
      "Passing an Optional where a non-optional parameter is expected",
      "Forcing an optional value into a non-optional context",
      "Returning an Optional from a function that doesn't expect one"
    ],
    solutions: [
      "Use optional binding: `if let value = optional { ... }`",
      "Use guard: `guard let value = optional else { return }`",
      "Use nil coalescing: `let value = optional ?? defaultValue`",
      "Force unwrap (carefully!): `let value = optional!` — only when you're sure it's not nil"
    ],
    codeExample: `// ❌ Bad\nlet name: String? = "Alice"\nprint(name.count) // Error: optional must be unwrapped\n\n// ✅ Good — optional binding\nif let name = name {\n    print(name.count) // 5\n}\n\n// ✅ Good — nil coalescing\nlet count = (name ?? "Unknown").count`,
    relatedErrors: ["swift-value-type", "swift-cannot-invoke"]
  },
  {
    id: "swift-cannot-invoke",
    errorMessage: "Cannot invoke initializer for type with an argument list of type",
    language: "Swift",
    category: "Compile Error",
    explanation: "You're trying to create an instance of a type (initialize it) but the arguments don't match any of its available initializers. Swift is strict about type matching in function and initializer calls.",
    causes: [
      "Passing wrong argument types to an initializer",
      "Passing wrong number of arguments",
      "Missing required argument labels (Swift uses external parameter names)",
      "The type doesn't have a custom initializer accepting those parameters"
    ],
    solutions: [
      "Check the initializer's parameter types and labels in the documentation",
      "Add or correct argument labels: `Type(label: value)` instead of `Type(value)`",
      "Use the correct types — Swift won't implicitly convert types like `Int` to `String`",
      "Define a custom initializer if needed"
    ],
    codeExample: `// ❌ Bad\nstruct User {\n    var name: String\n    var age: Int\n}\nlet user = User("Alice", 30) // Error: missing labels\n\n// ✅ Good — include argument labels\nlet user = User(name: "Alice", age: 30)\n\n// ✅ Good — define custom init without labels\nstruct User {\n    var name: String\n    var age: Int\n    init(_ name: String, _ age: Int) {\n        self.name = name\n        self.age = age\n    }\n}`,
    relatedErrors: ["swift-value-type", "swift-optional-binding"]
  },
  // === PHP ===
  {
    id: "php-memory-exhausted",
    errorMessage: "Allowed memory size of X bytes exhausted (tried to allocate Y bytes)",
    language: "PHP",
    category: "Fatal Error",
    explanation: "Your script tried to use more memory than PHP is configured to allow. This commonly happens when processing large datasets, loading huge files, or when code creates unbounded data structures.",
    causes: [
      "Loading an entire large file into memory (e.g., file_get_contents on a GB file)",
      "Processing millions of rows without chunking",
      "Memory leak in a loop (accumulating data without releasing it)",
      "Infinite recursion or very deep call stack",
      "Loading large images or DOM documents"
    ],
    solutions: [
      "Increase memory limit: `ini_set('memory_limit', '512M');`",
      "Process data in chunks instead of loading everything at once",
      "Use generators (`yield`) for large datasets",
      "Use SplFixedArray instead of regular arrays for known-size datasets",
      "Free variables when done: `$var = null;`"
    ],
    codeExample: `// ❌ Bad — loads entire file\n$data = file_get_contents('huge_file.csv');\n$lines = explode("\\n", $data);\n\n// ✅ Good — process line by line\n$handle = fopen('huge_file.csv', 'r');\nwhile (($line = fgetcsv($handle)) !== false) {\n    process_line($line);\n}\nfclose($handle);`,
    relatedErrors: ["php-undefined-variable", "php-fatal-error-out-of-memory"]
  },
  // === Dart / Flutter ===
  {
    id: "dart-type-cast-error",
    errorMessage: "type 'X' is not a subtype of type 'Y' in type cast",
    language: "Dart",
    category: "TypeError",
    explanation: "You're trying to cast an object to a type it doesn't actually belong to. Dart is a strongly typed language and won't allow implicit type conversions that lose information.",
    causes: [
      "Casting a JSON response to a specific type when the data doesn't match",
      "Using the cast operator `as` on an incompatible type",
      "Passing the wrong type to a function that expects a specific type",
      "Deserializing data without checking the actual runtime type"
    ],
    solutions: [
      "Use `is` operator to check type before casting: `if (obj is String) { ... }`",
      "Use `tryCast()` instead of `as` for safe casting: `obj.tryCast<String>()`",
      "Validate JSON data before casting: check key existence and value types",
      "Use pattern matching with switch expressions in Dart 3"
    ],
    codeExample: `// ❌ Bad\nfinal name = data['name'] as String; // Throws if null or wrong type\n\n// ✅ Good — safe cast\nfinal name = data['name'] as String? ?? 'Unknown';\n\n// ✅ Good — type check first\nif (data['name'] is String) {\n  final name = data['name'] as String;\n  print(name);\n}`,
    relatedErrors: ["dart-null-check", "dart-cannot-invoke"]
  },
  {
    id: "dart-null-check",
    errorMessage: "Null check operator used on a null value",
    language: "Dart",
    category: "Runtime Error",
    explanation: "You used the `!` (null check) operator on a variable that is null at runtime. Dart's sound null safety means this error only happens when you explicitly force-unwrap a nullable value using `!`.",
    causes: [
      "Using `!` on a nullable variable that happens to be null",
      "State not yet initialized when accessed (e.g., in initState before async load completes)",
      "API response missing expected fields",
      "Widget disposed before async operation completes"
    ],
    solutions: [
      "Use null-aware operators: `??` (default), `?.` (optional chaining)",
      "Use `if` null checks before using the value",
      "Use `late` keyword with initialization guarantee, or `late` with `final` and ensure initialization",
      "Handle null states in the UI with loading/error states"
    ],
    codeExample: `// ❌ Bad\nfinal String name = user!.name; // Crashes if user is null\n\n// ✅ Good — null-aware operators\nfinal String name = user?.name ?? 'Anonymous';\n\n// ✅ Good — explicit check\nif (user != null) {\n  print(user!.name);\n}`,
    relatedErrors: ["dart-type-cast-error", "dart-index-out-of-range"]
  },
  {
    id: "dart-index-out-of-range",
    errorMessage: "RangeError (index): Invalid value: Not in inclusive range 0..X-1: Y",
    language: "Dart",
    category: "RangeError",
    explanation: "You're trying to access a list element at an index that doesn't exist. The index Y is outside the valid range of 0 to (length - 1).",
    causes: [
      "Accessing a list element with an index >= list.length",
      "Using a negative index (Dart lists don't support negative indexing)",
      "Off-by-one error in a loop: using `<=` instead of `<` for the upper bound",
      "Accessing an empty list"
    ],
    solutions: [
      "Check list bounds before accessing: `if (index < list.length)`",
      "Use `elementAtOrNull(index)` for safe access (returns null if out of bounds)",
      "Use `list.isEmpty` check before accessing elements",
      "Review loop conditions: use `< list.length` not `<= list.length`"
    ],
    codeExample: `// ❌ Bad\nfinal items = [1, 2, 3];\nprint(items[5]); // RangeError!\n\n// ✅ Good — bounds check\nif (index < items.length) {\n  print(items[index]);\n}\n\n// ✅ Good — use safe access\nprint(items.elementAtOrNull(5)); // prints null`,
    relatedErrors: ["dart-null-check", "dart-type-cast-error"]
  },
  // === Kotlin ===
  {
    id: "kotlin-null-pointer",
    errorMessage: "kotlin.KotlinNullPointerException",
    language: "Kotlin",
    category: "NullPointerException",
    explanation: "You tried to access a nullable reference that was null. This typically happens when you force-unwrap a nullable type using the `!!` operator, or when Java interop returns null where Kotlin expected non-null.",
    causes: [
      "Using the `!!` (non-null assertion) operator on a null value",
      "Java interop method returning null where Kotlin expects non-null",
      "Uninitialized lateinit variable accessed before assignment",
      "Platform type ambiguity from Java code"
    ],
    solutions: [
      "Use safe calls: `obj?.property` instead of `obj!!.property`",
      "Use the Elvis operator: `val name = obj?.name ?: \"default\"`",
      "Use `let` for null-safe operations: `obj?.let { doSomething(it) }`",
      "Check `::variable.isInitialized` before using lateinit vars",
      "Use `@Nullable` / `@NonNull` annotations for Java interop boundaries"
    ],
    codeExample: "// Kotlin\\nval name: String? = null\\n\\n// ❌ Bad\\nprintln(name!!.length) // KotlinNullPointerException\\n\\n// ✅ Good — safe call\\nprintln(name?.length) // prints null\\n\\n// ✅ Good — Elvis operator\\nprintln(name?.length ?: 0) // prints 0\\n\\n// ✅ Good — let block\\nname?.let { println(it.length) }",
    relatedErrors: ["kotlin-type-mismatch", "kotlin-lateinit"]
  },
  {
    id: "kotlin-type-mismatch",
    errorMessage: "Type mismatch: inferred type is String but Int was expected",
    language: "Kotlin",
    category: "Type Mismatch",
    explanation: "Kotlin's type system detected that you're passing a value of the wrong type to a function or variable. Kotlin is strongly typed and won't implicitly convert between incompatible types.",
    causes: [
      "Passing a String where an Int (or other type) is expected",
      "JSON deserialization returning the wrong type",
      "Function parameter type doesn't match the argument",
      "Incorrect use of generics or type parameters"
    ],
    solutions: [
      "Explicitly convert types: `str.toInt()`, `num.toString()`",
      "Use safe conversion: `str.toIntOrNull() ?: 0`",
      "Verify the expected type from the function signature",
      "Use type-checking before conversion: `if (x is Int) { ... }`"
    ],
    codeExample: "// Kotlin\\nval input: String = \"42\"\\nval num: Int = input // Type mismatch!\\n\\n// ✅ Good — explicit conversion\\nval num: Int = input.toInt()\\n\\n// ✅ Good — safe conversion\\nval num: Int = input.toIntOrNull() ?: 0\\n\\n// ✅ Good — type check\\nif (input is Int) {\\n  val num: Int = input\\n}",
    relatedErrors: ["kotlin-null-pointer", "kotlin-no-such-element"]
  },
  {
    id: "kotlin-lateinit",
    errorMessage: "kotlin.UninitializedPropertyAccessException: lateinit property has not been initialized",
    language: "Kotlin",
    category: "UninitializedPropertyAccessException",
    explanation: "You declared a variable with the `lateinit` modifier but tried to access it before it was assigned a value. Kotlin tracks the initialization state of lateinit properties at runtime.",
    causes: [
      "Accessing a lateinit var before it's been assigned",
      "Initialization happening in a different coroutine/thread",
      "Conditional initialization where one code path doesn't set the value",
      "Dependency injection not completing before access"
    ],
    solutions: [
      "Check initialization: `if (::property.isInitialized) { ... }`",
      "Use nullable type instead of lateinit: `var name: String? = null`",
      "Ensure initialization happens in all code paths",
      "Use `by lazy` for lazy initialization that's always safe"
    ],
    codeExample: "// Kotlin\\nclass MyFragment {\\n  private lateinit var binding: FragmentBinding\\n\\n  // ❌ Bad — may crash\\n  fun doWork() = binding.root // UninitializedPropertyAccessException\\n\\n  // ✅ Good — check first\\n  fun doWork() {\\n    if (::binding.isInitialized) {\\n      binding.root\\n    }\\n  }\\n}",
    relatedErrors: ["kotlin-null-pointer"]
  },
  // === Next.js ===
  {
    id: "nextjs-app-dir-client-component",
    errorMessage: "Error: Event handlers cannot be passed to Client Component props.",
    language: "Next.js",
    category: "Error",
    explanation: "You're passing a function (like an event handler) to a Server Component. Server Components cannot accept functions as props because they're serialized — functions can't be serialized.",
    causes: [
      "Using 'use server' instead of 'use client' at the top of the file",
      "Parent component is a Server Component passing functions to a child",
      "Passing event handlers to a component that isn't marked 'use client'",
      "Using server-side data fetching functions as callbacks in client components"
    ],
    solutions: [
      "Add 'use client' directive at the top of the child component file",
      "Restructure to lift the interactive part into a Client Component",
      "Use Server Actions instead of passing handlers from Server Components",
      "Wrap interactive portions in a separate 'use client' component"
    ],
    codeExample: "// ❌ Bad — page.tsx is a Server Component\nimport { MyButton } from './MyButton'\nexport default function Page() {\n  return <MyButton onClick={() => console.log('clicked')} />\n}\n\n// ✅ Good — make the interactive part a Client Component\n'use client'\nexport function MyButton({ onClick }) {\n  return <button onClick={onClick}>Click me</button>\n}",
    relatedErrors: ["react-hydration-failed", "react-invalid-hook-call"]
  },
  {
    id: "nextjs-use-client-missing",
    errorMessage: "Error: 'use client' must be at the top of the file, before any other code.",
    language: "Next.js",
    category: "Error",
    explanation: "The 'use client' directive must appear as the very first statement in the file — before imports, before comments, before any other code.",
    causes: [
      "Placing 'use client' after import statements",
      "Adding a comment or 'use strict' before 'use client'",
      "Using 'use client' in a separate file instead of at the top of the component file",
      "Copy-pasting with leading whitespace or BOM characters"
    ],
    solutions: [
      "Place 'use client' as the absolute first line in the file",
      "Remove any code, comments, or blank lines before 'use client'",
      "Ensure no BOM characters precede the directive"
    ],
    codeExample: "// ❌ Bad\nimport { useState } from 'react'\n'use client'\n\n// ✅ Good\n'use client'\nimport { useState } from 'react'",
    relatedErrors: ["nextjs-app-dir-client-component"]
  },
  {
    id: "react-useeffect-missing-dependency",
    errorMessage: "React Hook useEffect has a missing dependency: 'foo'. Either include it or remove the dependency array.",
    language: "React",
    category: "Warning",
    explanation: "React detected that your useEffect callback references a variable that isn't in the dependency array. This means the effect may use stale values when the variable changes.",
    causes: [
      "Forgetting to add a variable used inside useEffect to the dependency array",
      "Intentionally omitting a dependency without understanding the consequences",
      "Using object or array literals as dependencies (they're recreated each render)"
    ],
    solutions: [
      "Add the missing variable to the dependency array",
      "If the omission is intentional, use useCallback or useRef to stabilize the reference",
      "Extract the value with useMemo if it's an expensive computation",
      "Use the exhaustive-deps ESLint rule to catch this automatically"
    ],
    codeExample: "// ❌ Bad\nuseEffect(() => {\n  fetchData(userId);\n}, []); // userId is missing!\n\n// ✅ Good\nuseEffect(() => {\n  fetchData(userId);\n}, [userId]);",
    relatedErrors: ["react-hooks-deps", "react-max-update-depth"]
  },
  {
    id: "nextjs-hydration-mismatch",
    errorMessage: "Hydration failed because the initial UI does not match what was rendered on the server.",
    language: "Next.js",
    category: "Error",
    explanation: "The HTML rendered on the server doesn't match what the client-side React expected. This usually happens when the component renders differently on the server vs the client.",
    causes: [
      "Using `typeof window !== 'undefined'` checks that change output",
      "Using `Date.now()` or `Math.random()` in the render output",
      "Browser extensions injecting elements into the DOM",
      "Using `useEffect` to modify state that should be in initial render",
      "Conditional rendering based on browser-only APIs"
    ],
    solutions: [
      "Use `useEffect` or useState to handle browser-only values after mount",
      "Avoid Date.now() or Math.random() in JSX — move to useState/useEffect",
      "Disable browser extensions during development",
      "Use `suppressHydrationWarning` only for benign mismatches (e.g., timestamps)",
      "Use dynamic import with `ssr: false` for browser-only components"
    ],
    codeExample: "// ❌ Bad\nfunction Page() {\n  return <p>Time: {Date.now()}</p>; // Different on server vs client\n}\n\n// ✅ Good\nfunction Page() {\n  const [time, setTime] = useState('');\n  useEffect(() => setTime(String(Date.now())), []);\n  return <p>Time: {time}</p>;\n}",
    relatedErrors: ["react-hydration-failed"]
  },
  {
    id: "go-nil-pointer-dereference",
    errorMessage: "runtime error: invalid memory address or nil pointer dereference",
    language: "Go",
    category: "Runtime Error",
    explanation: "You're trying to use a pointer that points to nil (nothing). This happens when you access a method or field on a nil pointer, or dereference a pointer that was never assigned a value.",
    causes: [
      "Forgetting to check if an error was returned before using the result",
      "Uninitialized pointer variables (var p *T gives nil)",
      "Map or slice returns nil for missing keys",
      "Calling methods on a nil interface value"
    ],
    solutions: [
      "Always check if an error is non-nil before using the result",
      "Use the short variable declaration `:=` with new() or make() to initialize",
      "Use nil checks: `if p != nil { ... }`",
      "Use the guard clause pattern: `if err != nil { return err }`"
    ],
    codeExample: "// ❌ Bad\nvar user *User\nfmt.Println(user.Name) // panic!\n\n// ✅ Good\nuser := new(User)\nfmt.Println(user.Name)\n\n// ✅ Good\nif user != nil {\n  fmt.Println(user.Name)\n}",
    relatedErrors: ["go-assignment-to-nil-map", "go-invalid-receiver"]
  },
  {
    id: "go-assignment-to-nil-map",
    errorMessage: "assignment to entry in nil map",
    language: "Go",
    category: "Runtime Error",
    explanation: "You're trying to assign a value to a map that is nil. In Go, you must initialize a map before writing to it. Reading from a nil map is fine (returns zero value), but writing panics.",
    causes: [
      "Declaring a map with `var m map[string]int` instead of `make(map[string]int)`",
      "Forgetting to initialize a map returned from a function that returned nil",
      "Using a map variable before it's assigned"
    ],
    solutions: [
      "Use `make()` to initialize: `m := make(map[string]int)`",
      "Use map literal: `m := map[string]int{}`",
      "Always check if a returned map is nil before writing to it"
    ],
    codeExample: "// ❌ Bad\nvar scores map[string]int\nscores[\"Alice\"] = 100 // panic!\n\n// ✅ Good\nscores := make(map[string]int)\nscores[\"Alice\"] = 100\n\n// ✅ Good\nscores := map[string]int{\"Alice\": 100}",
    relatedErrors: ["go-nil-pointer-dereference", "go-index-out-of-range"]
  },
  {
    id: "go-index-out-of-range",
    errorMessage: "runtime error: index out of range",
    language: "Go",
    category: "Runtime Error",
    explanation: "You're trying to access an array, slice, or string at an index that doesn't exist. This is a common panic in Go when iterating or accessing elements.",
    causes: [
      "Accessing an index beyond the length of a slice or array",
      "Off-by-one errors in loop conditions (using <= instead of <)",
      "Using an index variable that was calculated incorrectly",
      "Empty slice or array with no length check"
    ],
    solutions: [
      "Always check the length before accessing: `if i < len(s) { ... }`",
      "Use range-based for loops: `for i, v := range s { ... }`",
      "Use slices for dynamic data: `s = append(s, value)`",
      "Add bounds checking in functions that receive slices"
    ],
    codeExample: "// ❌ Bad\nnums := []int{1, 2, 3}\nfmt.Println(nums[5]) // panic!\n\n// ✅ Good\nnums := []int{1, 2, 3}\nif len(nums) > 5 {\n  fmt.Println(nums[5])\n}\n\n// ✅ Good\nfor i, v := range nums {\n  fmt.Println(i, v)\n}",
    relatedErrors: ["go-nil-pointer-dereference", "go-assignment-to-nil-map"]
  },
  {
    id: "rust-type-mismatch",
    errorMessage: "expected `&str`, found `&String`",
    language: "Rust",
    category: "TypeError",
    explanation: "You're passing a value of one type where a different type is expected. This is common when converting between Rust's string types or numeric types.",
    causes: [
      "Passing &String where &str is expected (missing auto-deref)",
      "Passing i64 where i32 is expected without casting",
      "Returning a different type than the function signature declares",
      "Mismatched generic type parameters"
    ],
    solutions: [
      "Use .as_str() or &* to convert &String to &str",
      "Use .to_string() or .to_owned() to convert &str to String",
      "Cast numeric types: x as i32 or i32::from(x)",
      "Use turbofish syntax to specify types: parse::<i32>()"
    ],
    codeExample: "// ❌ Bad\nfn greet(name: &str) { println!(\"Hello, {}\", name);\n}\ngreet(&String::from(\"World\")); // works but &String where &str expected\n\n// ✅ Good\nlet s = String::from(\"World\");\ngreet(&s); // Rust auto-derefs &String to &str\n\n// ✅ Good\nlet s: &str = \"World\";\ngreet(s);",
    relatedErrors: ["rust-borrow-checker", "rust-cannot-move"]
  },
  {
    id: "rust-missing-match-arm",
    errorMessage: "non-exhaustive patterns: ... not covered",
    language: "Rust",
    category: "Compile Error",
    explanation: "A match expression doesn't handle all possible values. Rust requires exhaustive pattern matching to prevent runtime surprises.",
    causes: [
      "A new enum variant was added without updating all match expressions",
      "Forgot to add a catch-all _ pattern",
      "Matching on Option without handling None",
      "Matching on a bool without handling both true and false"
    ],
    solutions: [
      "Add a catch-all arm: _ => { ... }",
      "Handle every enum variant explicitly",
      "Use if let for simple single-arm patterns",
      "Use matches! macro for boolean checks"
    ],
    codeExample: "// ❌ Bad\nmatch direction {\n  Direction::North => go_north(),\n  Direction::South => go_south(),\n}\n\n// ✅ Good\nmatch direction {\n  Direction::North => go_north(),\n  Direction::South => go_south(),\n  Direction::East => go_east(),\n  Direction::West => go_west(),\n}\n\n// ✅ Good — catch-all\nmatch direction {\n  Direction::North => go_north(),\n  Direction::South => go_south(),\n  _ => {},\n}",
    relatedErrors: ["rust-cannot-move", "rust-mutability"]
  },
  {
    id: "rust-overflow",
    errorMessage: "attempt to add with overflow",
    language: "Rust",
    category: "ArithmeticError",
    explanation: "In debug mode, Rust panics on integer overflow. In release mode, it wraps around silently, which can cause subtle bugs.",
    causes: [
      "Adding two numbers that exceed the type's maximum value",
      "Using unchecked arithmetic in debug builds",
      "Not using saturating or wrapping arithmetic methods",
      "Converting between numeric types incorrectly"
    ],
    solutions: [
      "Use .checked_add() to handle overflow safely",
      "Use .saturating_add() to cap at min/max values",
      "Use .wrapping_add() for intentional overflow behavior",
      "Use .overflowing_add() to get both result and overflow flag"
    ],
    codeExample: "// ❌ Bad — panics in debug mode\nlet x: u8 = 255;\nlet y = x + 1; // panic!\n\n// ✅ Good — checked arithmetic\nlet x: u8 = 255;\nmatch x.checked_add(1) {\n  Some(result) => println!(\"{}\", result),\n  None => println!(\"overflow!\"),\n}\n\n// ✅ Good — saturating arithmetic\nlet x: u8 = 255;\nlet y = x.saturating_add(1); // y = 255\n\n// ✅ Good — wrapping arithmetic\nlet x: u8 = 255;\nlet y = x.wrapping_add(1); // y = 0",
    relatedErrors: ["rust-unwrap-none", "rust-type-mismatch"]
  },
  // === Python ===
  {
    id: "python-nameerror",
    errorMessage: "NameError: name 'x' is not defined",
    language: "Python",
    category: "NameError",
    explanation: "You're trying to use a variable or function name that hasn't been defined in the current scope. Python doesn't have variable hoisting — names must be assigned before use.",
    causes: [
      "Using a variable before assigning it",
      "Typo in variable or function name",
      "Using a variable defined in a different scope (e.g., inside a function vs. global)",
      "Forgetting to import a module or function",
      "Using a keyword as a variable name"
    ],
    solutions: [
      "Check the spelling of the variable name",
      "Make sure the variable is defined before it's used",
      "Use 'global' or 'nonlocal' if you need to access outer scope variables",
      "Import the required module or function before using it"
    ],
    codeExample: "# Bad — name not defined\nprint(message)\n\n# Good — define before use\nmessage = \"Hello, World!\"\nprint(message)\n\n# Good — import before use\nfrom math import sqrt\nresult = sqrt(16)",
    relatedErrors: ["python-typeerror", "python-attributeerror"]
  },
  {
    id: "python-attributeerror",
    errorMessage: "AttributeError: 'str' object has no attribute 'append'",
    language: "Python",
    category: "AttributeError",
    explanation: "You're trying to call a method or access an attribute that doesn't exist for the given object type. This often happens when you confuse variable types or use the wrong API.",
    causes: [
      "Calling a method that doesn't exist for the object's type",
      "Confusing string methods with list methods (or vice versa)",
      "Using an attribute from a different version of a library",
      "Accessing a property on a None value",
      "Typo in the method or attribute name"
    ],
    solutions: [
      "Check the type of the variable with type() or isinstance()",
      "Review the documentation for the correct method name",
      "Use hasattr() to check if an attribute exists before accessing it",
      "Add None checks before accessing attributes on potentially None values"
    ],
    codeExample: "# Bad — strings don't have append\nname = \"hello\"\nname.append(\" world\")\n\n# Good — use string concatenation\nname = \"hello\"\nname = name + \" world\"\n\n# Good — check type first\nmy_list = [1, 2, 3]\nif hasattr(my_list, 'append'):\n    my_list.append(4)",
    relatedErrors: ["python-nameerror", "python-typeerror"]
  },
  {
    id: "python-importerror",
    errorMessage: "ModuleNotFoundError: No module named 'requests'",
    language: "Python",
    category: "ImportError",
    explanation: "Python can't find the module you're trying to import. This means the package isn't installed in your current Python environment, or the module name is wrong.",
    causes: [
      "The package isn't installed in the current environment",
      "Using a different Python version than the one where the package is installed",
      "Typo in the module name",
      "Circular imports between modules",
      "Virtual environment isn't activated"
    ],
    solutions: [
      "Install the package: pip install <package-name>",
      "Make sure you're using the right Python version",
      "Activate your virtual environment if you're using one",
      "Check if the package has a different import name"
    ],
    codeExample: "# Install first: pip install requests\nimport requests\nresponse = requests.get('https://example.com')\n\n# Good — use try/except for optional deps\ntry:\n    import pandas as pd\nexcept ImportError:\n    print('pandas not installed. Run: pip install pandas')",
    relatedErrors: ["python-nameerror", "python-syntaxerror"]
  },
  // === Java ===
  {
    id: "java-nullpointer",
    errorMessage: "java.lang.NullPointerException",
    language: "Java",
    category: "NullPointerException",
    explanation: "You're calling a method or accessing a field on a variable that is null. This is the most common runtime exception in Java and can happen anywhere a reference hasn't been initialized or was explicitly set to null.",
    causes: [
      "Calling a method on a null reference",
      "Accessing an array element that hasn't been assigned",
      "Unboxing a null wrapper type (Integer, Boolean, etc.)",
      "Not initializing fields before use",
      "A method returning null when you expect a value"
    ],
    solutions: [
      "Add null checks: if (obj != null) before using",
      "Use Optional<T> to handle potentially absent values",
      "Use Objects.requireNonNull() for early null detection",
      "Initialize collections and fields in constructors"
    ],
    codeExample: "// Bad — will throw NullPointerException\nString name = null;\nSystem.out.println(name.length());\n\n// Good — null check\nif (name != null) {\n    System.out.println(name.length());\n}\n\n// Good — use Objects.requireNonNull\nObjects.requireNonNull(name, \"name must not be null\");\n\n// Good — use Optional\nOptional.ofNullable(name)\n    .ifPresent(n -> System.out.println(n.length()));",
    relatedErrors: ["java-classcastexception", "java-indexoutofboundsexception"]
  },
  {
    id: "java-indexoutofboundsexception",
    errorMessage: "java.lang.IndexOutOfBoundsException",
    language: "Java",
    category: "IndexOutOfBoundsException",
    explanation: "You're trying to access an index in an array, ArrayList, or String that doesn't exist. Valid indices range from 0 to size()-1.",
    causes: [
      "Using an index equal to or greater than the collection size",
      "Off-by-one error in loop conditions",
      "Forgetting that array indices start at 0",
      "Concurrent modification changing the size during iteration"
    ],
    solutions: [
      "Check bounds before accessing: if (index < list.size())",
      "Use enhanced for-loops (for-each) to avoid manual index management",
      "Use list.size() - 1 for the last element instead of hardcoding",
      "Use ConcurrentModificationException-safe iterators"
    ],
    codeExample: "// Bad — off by one\nList<String> items = List.of(\"a\", \"b\", \"c\");\nString item = items.get(3); // IndexOutOfBoundsException\n\n// Good — check bounds\nif (index >= 0 && index < items.size()) {\n    String item = items.get(index);\n}\n\n// Good — use for-each\nfor (String item : items) {\n    System.out.println(item);\n}",
    relatedErrors: ["java-arraystoreexception", "java-nullpointer"]
  },
  {
    id: "java-classcastexception",
    errorMessage: "java.lang.ClassCastException",
    language: "Java",
    category: "ClassCastException",
    explanation: "You're trying to cast an object to a type that it is not. This typically happens with generic collections, inheritance hierarchies, or when deserializing data.",
    causes: [
      "Casting an object to an incompatible type",
      "Raw generic types losing type safety at runtime",
      "Classloader issues where the same class is loaded by different loaders",
      "Incorrect assumption about what a collection contains"
    ],
    solutions: [
      "Use instanceof before casting: if (obj instanceof String)",
      "Use generics properly to get compile-time type checking",
      "Use pattern matching for instanceof (Java 16+): if (obj instanceof String s)",
      "Verify your assumptions about data types at runtime boundaries"
    ],
    codeExample: "// Bad — unsafe cast\nObject obj = Integer.valueOf(42);\nString str = (String) obj; // ClassCastException\n\n// Good — check type first\nif (obj instanceof String str) {\n    System.out.println(str.length());\n}\n\n// Good — use generics\nList<String> names = new ArrayList<>();\nnames.add(\"Alice\");\n// Compiler prevents adding non-String objects",
    relatedErrors: ["java-nullpointer", "java-nosuchmethoderror"]
  },
  // === High-Volume Error Messages ===
  {
    id: "js-typeerror-is-not-a-function",
    errorMessage: "TypeError: x is not a function",
    language: "JavaScript",
    category: "TypeError",
    explanation: "You're trying to call a value that isn't a function. This happens when you call something that's undefined, null, or a non-function value.",
    causes: [
      "Calling a variable that isn't a function",
      "Importing a module incorrectly (default vs named export)",
      "Calling a method that doesn't exist on an object",
      "Forgetting to instantiate a class before calling methods",
      "Using a property name that conflicts with a built-in method"
    ],
    solutions: [
      "Verify the value is actually a function: console.log(typeof x)",
      "Check your import statements — named vs default exports",
      "Ensure the object has the method you're calling",
      "Check for typos in method names",
      "Use typeof x === 'function' before calling"
    ],
    codeExample: `// ❌ Bad\nconst obj = { name: 'Alice' };\nobj.greet(); // TypeError: obj.greet is not a function\n\n// ✅ Good\nconst obj = { greet: () => 'hello' };\nobj.greet(); // 'hello'\n\n// ❌ Bad — wrong import\nimport { MyComponent } from './MyComponent';\n\n// ✅ Good — default export\nimport MyComponent from './MyComponent';`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "js-reference-not-defined"]
  },
  {
    id: "ts-type-not-assignable",
    errorMessage: "Type 'X' is not assignable to type 'Y'",
    language: "TypeScript",
    category: "TypeError",
    explanation: "TypeScript detected a type mismatch between the value you're providing and the expected type. This is one of the most common TypeScript errors.",
    causes: [
      "Passing the wrong type to a function parameter",
      "Assigning a value of the wrong type to a variable",
      "Returning the wrong type from a function",
      "Using a string where a number is expected (or vice versa)",
      "Not using a type assertion when you know the type is correct"
    ],
    solutions: [
      "Check the expected type and ensure the value matches",
      "Use type assertions: value as string (if you're sure)",
      "Add type guards: if (typeof value === 'string')",
      "Update the function signature to accept the correct type",
      "Use generic types to make functions more flexible"
    ],
    codeExample: `// ❌ Bad\nfunction greet(name: string): string {\n  return name.length;\n}\n\n// ✅ Good\nfunction greet(name: string): string {\n  return \`Hello, \${name}\`;\n}\n\n// ❌ Bad\nlet x: number = 'hello';\n\n// ✅ Good\nlet x: string = 'hello';`,
    relatedErrors: ["ts-object-is-possibly-null", "ts-type-undefined"]
  },
  {
    id: "js-unhandled-promise-rejection",
    errorMessage: "UnhandledPromiseRejection",
    language: "JavaScript",
    category: "Promise",
    explanation: "A Promise was rejected but there's no error handler to catch it. This can cause your application to crash or behave unexpectedly.",
    causes: [
      "Missing .catch() on a Promise chain",
      "Not using try/catch with async/await",
      "The Promise's rejection reason is not handled",
      "Network errors or API failures without error handling",
      "Multiple async operations where one fails without handling"
    ],
    solutions: [
      "Add .catch() to handle promise rejections",
      "Use try/catch with async/await",
      "Add a global unhandledrejection handler",
      "Handle errors in each async operation",
      "Use Promise.allSettled() to handle all outcomes"
    ],
    codeExample: `// ❌ Bad — no error handling\nfetch('https://api.example.com/data')\n  .then(response => response.json());\n\n// ✅ Good — with error handling\nfetch('https://api.example.com/data')\n  .then(response => response.json())\n  .catch(error => console.error('Failed:', error));\n\n// ✅ Good — async/await\ntry {\n  const response = await fetch('https://api.example.com/data');\n  const data = await response.json();\n} catch (error) {\n  console.error('Failed:', error);\n}`,
    relatedErrors: ["js-is-not-a-function", "js-reference-not-defined"]
  },
  // === Additional Python Errors ===
  {
    id: "python-keyerror",
    errorMessage: "KeyError: 'key'",
    language: "Python",
    category: "KeyError",
    explanation: "You're trying to access a dictionary key that doesn't exist. Unlike JavaScript, Python dictionaries don't return undefined for missing keys — they raise a KeyError.",
    causes: [
      "Typo in the key name",
      "Accessing a key that hasn't been added to the dictionary yet",
      "Using bracket notation instead of .get() for optional keys",
      "Dictionary structure differs from expected (nested keys missing)"
    ],
    solutions: [
      "Use dict.get(key, default) to provide a fallback: `d.get('name', 'unknown')`",
      "Check if key exists first: `if 'key' in d:`",
      "Use try/except KeyError for expected missing keys",
      "Use collections.defaultdict for automatic default values"
    ],
    codeExample: `# Bad\nuser = {"name": "Alice"}\nemail = user["email"]  # KeyError\n\n# Good — use .get()\nemail = user.get("email", "no-email@example.com")\n\n# Good — check first\nif "email" in user:\n    email = user["email"]\n\n# Good — try/except\ntry:\n    email = user["email"]\nexcept KeyError:\n    email = "no-email@example.com"`,
    relatedErrors: ["python-attributeerror", "python-typeerror-none"]
  },
  {
    id: "python-typeerror-operand",
    errorMessage: "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
    language: "Python",
    category: "TypeError",
    explanation: "You're trying to use an operator (+, -, *, etc.) with incompatible types. Python won't implicitly convert between types like JavaScript does.",
    causes: [
      "Adding a number to a string without explicit conversion",
      "Mixing types in arithmetic operations",
      "Forgetting to convert user input (which is always a string)",
      "Using + with a string and a non-string type"
    ],
    solutions: [
      "Convert types explicitly: `int(str_value)` or `str(int_value)`",
      "Use f-strings for string interpolation: `f\"Value: {num}\"`",
      "Validate input types before operations",
      "Use isinstance() to check types before combining"
    ],
    codeExample: `# Bad\nage = input("Enter age: ")  # returns str\nnext_year = age + 1  # TypeError: str + int\n\n# Good\nage = int(input("Enter age: "))\nnext_year = age + 1\n\n# Good — string formatting\nmessage = f"You will be {age + 1} next year"`,
    relatedErrors: ["python-typeerror-none", "python-keyerror"]
  },
  {
    id: "python-list-index-out-of-range",
    errorMessage: "IndexError: list index out of range",
    language: "Python",
    category: "IndexError",
    explanation: "You're trying to access a list element at an index that doesn't exist. Python lists are zero-indexed, so the last element is at index len(list) - 1.",
    causes: [
      "Accessing an index beyond the list length",
      "Off-by-one error in loops (using <= instead of <)",
      "Empty list with no elements",
      "Assuming a list has more elements than it does"
    ],
    solutions: [
      "Check list length first: `if len(my_list) > index:`",
      "Use try/except IndexError for expected empty cases",
      "Use for-each loops instead of index-based loops: `for item in my_list:`",
      "Use enumerate() when you need both index and value"
    ],
    codeExample: `# Bad\nitems = [1, 2, 3]\nprint(items[5])  # IndexError\n\n# Good — check first\nif len(items) > 5:\n    print(items[5])\n\n# Good — use for-each\nfor item in items:\n    print(item)\n\n# Good — use enumerate\nfor i, item in enumerate(items):\n    print(f"{i}: {item}")`,
    relatedErrors: ["python-keyerror", "python-attributeerror"]
  },
  {
    id: "python-recursionerror",
    errorMessage: "RecursionError: maximum recursion depth exceeded",
    language: "Python",
    category: "RecursionError",
    explanation: "Your function called itself too many times, exceeding Python's default recursion limit (typically 1000). This usually means a missing base case or infinite recursion.",
    causes: [
      "Missing or incorrect base case in recursive function",
      "Infinite recursion due to circular references",
      "Recursion limit too low for a legitimate deep recursion",
      "Mutual recursion without proper termination"
    ],
    solutions: [
      "Add or fix the base case in your recursive function",
      "Convert recursive algorithm to iterative using a loop or stack",
      "Increase recursion limit: `sys.setrecursionlimit(2000)` (use with caution)",
      "Use tail-call optimization if available in your Python variant"
    ],
    codeExample: `# Bad — no base case\ndef count_down(n):\n    print(n)\n    count_down(n - 1)  # RecursionError!\n\n# Good — base case\ndef count_down(n):\n    if n <= 0:\n        print("Done!")\n        return\n    print(n)\n    count_down(n - 1)\n\n# Alternative — iterative\ndef count_down(n):\n    while n > 0:\n        print(n)\n        n -= 1\n    print("Done!")`,
    relatedErrors: ["python-infinite-loop", "python-stackoverflow"]
  },
  {
    id: "python-unicodedecodeerror",
    errorMessage: "UnicodeDecodeError: 'utf-8' codec can't decode byte 0xff in position 0",
    language: "Python",
    category: "UnicodeDecodeError",
    explanation: "Python tried to read a file as UTF-8 but encountered bytes that aren't valid UTF-8. This commonly happens with files created on Windows (which use different encodings) or binary files opened in text mode.",
    causes: [
      "File is not UTF-8 encoded (common with Windows files using cp1252 or latin-1)",
      "Binary file opened in text mode",
      "Corrupted file",
      "Mixed encodings in the same file"
    ],
    solutions: [
      "Specify the correct encoding: `open('file.txt', encoding='cp1252')`",
      "Open binary files in binary mode: `open('file.txt', 'rb')`",
      "Use errors parameter: `open('file.txt', errors='ignore')`",
      "Detect encoding first with chardet or charset-normalizer library"
    ],
    codeExample: `# Bad — assumes UTF-8\nwith open('windows_file.txt') as f:\n    content = f.read()  # UnicodeDecodeError!\n\n# Good — specify encoding\nwith open('windows_file.txt', encoding='cp1252') as f:\n    content = f.read()\n\n# Good — use errors parameter\nwith open('file.txt', errors='replace') as f:\n    content = f.read()  # replaces bad bytes with ?`,
    relatedErrors: ["python-ioerror", "python-file-not-found"]
  },
  {
    id: "python-valueerror-literal",
    errorMessage: "ValueError: invalid literal for int() with base 10: 'abc'",
    language: "Python",
    category: "ValueError",
    explanation: "You tried to convert a string to an integer using int(), but the string doesn't contain a valid number. The string must contain only digits (and optionally a sign and decimal point for float conversion).",
    causes: [
      "String contains non-numeric characters (letters, spaces, special chars)",
      "String has leading/trailing whitespace",
      "User input that wasn't validated before conversion",
      "String contains locale-specific number formatting (e.g., commas as thousands separator)"
    ],
    solutions: [
      "Validate input before conversion: `if s.isdigit(): int(s)`",
      "Strip whitespace first: `int(s.strip())`",
      "Remove formatting: `int(s.replace(',', ''))`",
      "Use try/except: `try: val = int(s) except ValueError: handle_error()`"
    ],
    codeExample: `# Bad — no validation\nuser_input = "abc"\nnum = int(user_input)  # ValueError!\n\n# Good — validate first\nuser_input = "abc"\nif user_input.isdigit():\n    num = int(user_input)\n\n# Good — try/except\ntry:\n    num = int(user_input)\nexcept ValueError:\n    print(f"'{user_input}' is not a valid number")\n\n# Good — handle floats too\ntry:\n    num = float(user_input)\nexcept ValueError:\n    print("Invalid number")`,
    relatedErrors: ["python-typeerror", "python-keyerror"]
  },
  // === Docker ===
  {
    id: "docker-cannot-connect-to-daemon",
    errorMessage: "Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?",
    language: "Docker",
    category: "ConnectionError",
    explanation: "The Docker CLI cannot communicate with the Docker daemon. This usually means the daemon service is not running or the current user lacks permission to access the Docker socket.",
    causes: [
      "Docker daemon service is stopped or crashed",
      "User is not in the docker group (Linux)",
      "Docker Desktop not started (macOS/Windows)",
      "Socket file permissions are incorrect"
    ],
    solutions: [
      "Start the daemon: `sudo systemctl start docker` (Linux) or restart Docker Desktop (macOS/Windows)",
      "Add user to docker group: `sudo usermod -aG docker $USER` then log out and back in",
      "Check Docker status: `docker info`",
      "On macOS, ensure Docker Desktop is running in the menu bar"
    ],
    codeExample: `# Check if Docker is running\ndocker info\n\n# Start Docker daemon (Linux)\nsudo systemctl start docker\nsudo systemctl enable docker  # auto-start on boot\n\n# Add user to docker group\nsudo usermod -aG docker $USER\n# Then log out and back in`,
    relatedErrors: ["docker-daemon-not-running", "docker-permission-denied"]
  },
  {
    id: "docker-no-matching-manifest",
    errorMessage: "no matching manifest for linux/arm64/v8 in the manifest list entries",
    language: "Docker",
    category: "ManifestError",
    explanation: "You are trying to pull a Docker image that does not have a build for your platform architecture. This is common on Apple Silicon (M1/M2/M3) Macs and ARM-based Linux systems when the image was only built for amd64.",
    causes: [
      "Image was built only for amd64/x86_64 and not for ARM",
      "Using an older image that predates multi-architecture support",
      "Private registry has limited platform builds"
    ],
    solutions: [
      "Use `--platform linux/amd64` to force the amd64 version: `docker pull --platform linux/amd64 image:tag`",
      "Check available platforms: `docker manifest inspect image:tag`",
      "Find an alternative image that supports your architecture",
      "Build the image yourself for your platform"
    ],
    codeExample: `# Force pull amd64 image on ARM\ndocker pull --platform linux/amd64 nginx:latest\n\n# Check what platforms are available\ndocker manifest inspect nginx:latest\n\n# Run with platform specification\ndocker run --platform linux/amd64 nginx:latest`,
    relatedErrors: ["docker-image-not-found", "docker-exec-failed"]
  },
  {
    id: "docker-exec-failed",
    errorMessage: "OCI runtime exec failed: exec failed: unable to start container process: exec: \"bash\": executable file not found in $PATH",
    language: "Docker",
    category: "ExecError",
    explanation: "You tried to run a command inside a container using `docker exec`, but the specified shell or binary does not exist in the container. Minimal images (like Alpine or scratch-based) often lack bash.",
    causes: [
      "Using `bash` in a minimal image that only has `sh` (Alpine, scratch)",
      "Typo in the shell or command name",
      "Binary is not installed in the container image",
      "PATH environment variable is different inside the container"
    ],
    solutions: [
      "Try `sh` instead of `bash`: `docker exec -it container sh`",
      "Check available shells: `docker exec -it container ls /bin/`",
      "Install bash in the container: `apt-get install bash` (Debian) or `apk add bash` (Alpine)",
      "Use `docker exec -it container /bin/sh` for minimal images"
    ],
    codeExample: `# Wrong — bash may not exist\ndocker exec -it my-container bash\n\n# Right — try sh for minimal images\ndocker exec -it my-container sh\n\n# Right — use full path\ndocker exec -it my-container /bin/sh\n\n# Install bash in Alpine container\ndocker exec -it my-container apk add bash`,
    relatedErrors: ["docker-permission-denied", "docker-port-already-allocated"]
  },
  // === CSS ===
  {
    id: "css-selector-not-working",
    errorMessage: "My CSS selector isn't applying styles to the expected element",
    language: "CSS",
    category: "SelectorIssue",
    explanation: "Your CSS selector is valid but not targeting the element you expect. This is usually caused by specificity issues, incorrect selectors, or the element not existing in the DOM at the time the styles are applied.",
    causes: [
      "Another rule with higher specificity overrides your styles",
      "The selector doesn't match the element structure (wrong parent, wrong class name)",
      "Inline styles or !important override stylesheet rules",
      "The element is dynamically added after the styles load",
      "Using the wrong selector syntax (e.g., .class instead #id)"
    ],
    solutions: [
      "Use browser DevTools to inspect the element and see which rules apply",
      "Increase specificity: #id is stronger than .class, .class is stronger than element",
      "Avoid !important — use more specific selectors instead",
      "Check for typos in class names or IDs",
      "For dynamic content, ensure styles are in the main stylesheet, not scoped"
    ],
    codeExample: `/* ❌ Low specificity — overridden by .container p */\np { color: red; }\n\n/* ✅ Higher specificity */\n.container > p { color: red; }\n\n/* ❌ Wrong — missing dot for class selector */\nmy-class { color: red; }\n\n/* ✅ Correct */\n.my-class { color: red; }`,
    relatedErrors: ["css-unknown-property", "css-invalid-value"]
  },
  {
    id: "css-flexbox-not-working",
    errorMessage: "Flexbox container is not laying out children as expected",
    language: "CSS",
    category: "LayoutIssue",
    explanation: "Flexbox properties aren't producing the expected layout. This is often caused by missing the display: flex declaration, misunderstanding flex-direction defaults, or child elements not being direct flex children.",
    causes: [
      "Missing `display: flex` on the parent container",
      "Child elements are not direct children (nested too deep)",
      "Using margin without accounting for flexbox auto margins",
      "Conflicting width/height constraints on flex items",
      "Using inline elements that don't respond to flex properties"
    ],
    solutions: [
      "Ensure the parent has `display: flex` or `display: inline-flex`",
      "Only direct children of the flex container are flex items",
      "Use `margin: auto` on a flex child for centering",
      "Remove fixed widths/heights that conflict with flex behavior",
      "Use `flex: 1` or `flex-grow: 1` to fill available space"
    ],
    codeExample: `/* ❌ Parent is not a flex container */\n.parent > .child { flex: 1; }\n\n/* ✅ Parent must be display: flex */\n.parent {\n  display: flex;\n  gap: 1rem;\n}\n.parent > .child { flex: 1; }\n\n/* ✅ Centering with flex */\n.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
    relatedErrors: ["css-unknown-property", "css-invalid-value"]
  },
  {
    id: "css-z-index-not-working",
    errorMessage: "z-index is not working — element is not stacking above others",
    language: "CSS",
    category: "StackingIssue",
    explanation: "z-index only works on positioned elements (position: relative, absolute, fixed, or sticky). If the element has no positioning, z-index has no effect. A parent's stacking context can also limit the z-index of its children.",
    causes: [
      "Element has no positioning (z-index requires position property)",
      "A parent creates a new stacking context that limits the child",
      "Another element has a higher z-index in the same stacking context",
      "Using z-index on elements that are not siblings"
    ],
    solutions: [
      "Add `position: relative` (or absolute/fixed/sticky) to the element",
      "Check parent elements for z-index or opacity that creates stacking contexts",
      "Use DevTools to see the actual stacking order",
      "Avoid z-index values over 1000 — use a z-index scale (1-10, 100-110, etc.)"
    ],
    codeExample: `/* ❌ z-index has no effect without positioning */\n.element { z-index: 100; }\n\n/* ✅ Add positioning */\n.element {\n  position: relative;\n  z-index: 100;\n}\n\n/* ✅ Fixed positioning for overlays */\n.overlay {\n  position: fixed;\n  z-index: 1000;\n  top: 0; left: 0; right: 0; bottom: 0;\n}`,
    relatedErrors: ["css-unknown-property", "css-selector-not-working"]
  },
  {
    id: "rust-cannot-borrow-as-mutable",
    errorMessage: "cannot borrow `x` as mutable because it is also borrowed as immutable",
    language: "Rust",
    category: "BorrowChecker",
    explanation: "Rust's borrow checker prevents having both an immutable and mutable reference to the same data at the same time. This is one of Rust's most common compilation errors for newcomers.",
    causes: [
      "Trying to mutate a value while an immutable reference to it still exists",
      "Holding a reference across a mutating call",
      "Iterating over a collection while trying to modify it",
      "Calling a method that takes &mut self while holding a & reference"
    ],
    solutions: [
      "Clone the data if you need both a read and write copy",
      "Restructure code so the immutable reference goes out of scope before the mutable one",
      "Use indices instead of references when iterating and modifying",
      "Use RefCell<T> for interior mutability when the borrow checker is too strict"
    ],
    codeExample: `// ❌ Bad\nlet mut vec = vec![1, 2, 3];\nlet first = &vec[0]; // immutable borrow\nvec.push(4);         // mutable borrow — ERROR!\nprintln!("{}", first);\n\n// ✅ Good: read first, then write\nlet mut vec = vec![1, 2, 3];\nlet first = vec[0]; // copy the value\nvec.push(4);\nprintln!("{}", first);`,
    relatedErrors: ["rust-use-after-free", "rust-multiple-mutable-references"]
  },
  {
    id: "rust-use-after-free",
    errorMessage: "borrow later used here after move",
    language: "Rust",
    category: "OwnershipError",
    explanation: "You're trying to use a value after it has been moved to another owner. In Rust, assignment transfers ownership by default, so the original variable becomes invalid.",
    causes: [
      "Passing a value to a function by value (not by reference) and using it afterwards",
      "Assigning a value to another variable without copying",
      "Moving a value into a closure or thread",
      "Calling .to_owned(), .to_string(), or similar conversion methods"
    ],
    solutions: [
      "Use references (&T) instead of moving values",
      "Clone the value before moving: `let clone = val.clone();`",
      "Use Copy types (i32, f64, bool, char) which are copied instead of moved",
      "Use Rc<T> or Arc<T> for shared ownership"
    ],
    codeExample: `// ❌ Bad\nlet s1 = String::from("hello");\nlet s2 = s1;      // s1 is moved to s2\nprintln!("{}", s1); // ERROR: s1 was moved\n\n// ✅ Good: clone first\nlet s1 = String::from("hello");\nlet s2 = s1.clone();\nprintln!("{} {}", s1, s2);\n\n// ✅ Good: use references\nlet s1 = String::from("hello");\nlet s2 = &s1;\nprintln!("{} {}", s1, s2);`,
    relatedErrors: ["rust-cannot-borrow-as-mutable", "rust-value-dropped-after-binding"]
  },
  {
    id: "rust-index-out-of-bounds",
    errorMessage: "index out of bounds: the len is L but the index is I",
    language: "Rust",
    category: "PanicError",
    explanation: "You're trying to access an array or vector element at an index that doesn't exist. Rust panics immediately rather than returning garbage data like C/C++.",
    causes: [
      "Hard-coded index that exceeds the array length",
      "Off-by-one error in loop bounds",
      "Using .unwrap() on a get() return value",
      "Calculating an index from user input without bounds checking"
    ],
    solutions: [
      "Use .get() method which returns Option<T> instead of panicking",
      "Check bounds before indexing: `if i < vec.len()`",
      "Use .get_mut() for mutable access",
      "Use .enumerate() in loops to get safe index-value pairs"
    ],
    codeExample: `// ❌ Bad\nlet v = vec![1, 2, 3];\nlet x = v[5]; // PANIC: index out of bounds\n\n// ✅ Good: use get()\nlet v = vec![1, 2, 3];\nif let Some(x) = v.get(5) {\n    println!("{}", x);\n} else {\n    println!("Index out of bounds");\n}\n\n// ✅ Good: safe iteration\nfor (i, val) in v.iter().enumerate() {\n    println!("{}: {}", i, val);\n}`,
    relatedErrors: ["rust-unwrap-on-none", "rust-panic-unwinding"]
  },
  // === Kotlin ===
  {
    id: "kotlin-no-value-passed-for-parameter",
    errorMessage: "No value passed for parameter 'paramName'",
    language: "Kotlin",
    category: "CompilationError",
    explanation: "A function or constructor requires parameters that you haven't provided. Kotlin enforces strict parameter matching at compile time — no optional parameters without default values.",
    causes: [
      "Missing required arguments in a function call",
      "Calling a constructor without all required parameters",
      "Not using named arguments when parameter order is ambiguous",
      "Calling a Java method that has overloaded versions"
    ],
    solutions: [
      "Provide all required parameters in the correct order",
      "Use named arguments: `fun(param1 = value1, param2 = value2)`",
      "Check function signature for default parameter values",
      "Use @JvmOverloads to generate overloaded methods from Kotlin defaults"
    ],
    codeExample: `// ❌ Bad\nfun greet(name: String, age: Int) { println("$name is $age") }\ngreet("Alice") // Error: No value passed for parameter 'age'\n\n// ✅ Good\ngreet("Alice", 30)\n\n// ✅ Good: use named arguments\ngreet(name = "Alice", age = 30)\n\n// ✅ Good: default parameters\nfun greet(name: String, age: Int = 25) { println("$name is $age") }\ngreet("Alice") // Works now`,
    relatedErrors: ["kotlin-type-mismatch", "kotlin-unresolved-reference"]
  },
  {
    id: "kotlin-cannot-infer-type-parameter",
    errorMessage: "Cannot infer type parameter T",
    language: "Kotlin",
    category: "TypeInferenceError",
    explanation: "The Kotlin compiler cannot determine the type parameter for a generic function or class. This usually happens when there isn't enough context to infer the type from usage.",
    causes: [
      "Empty collection literal without explicit type",
      "Generic function with no arguments that could determine the type",
      "Using a nullable type where a non-null type is expected",
      "Ambiguous return type from a lambda"
    ],
    solutions: [
      "Explicitly specify the type: `listOf<String>()` or `emptyList<Int>()`",
      "Add a type annotation to the variable: `val x: List<String> = listOf()`",
      "Provide a type parameter to the function: `arrayOf<String>(\"a\")`",
      "Check that the context provides enough information for type inference"
    ],
    codeExample: `// ❌ Bad\nval list = listOf() // Cannot infer type parameter\n\n// ✅ Good: explicit type\nval list: List<String> = listOf()\n\n// ✅ Good: type parameter\nval list = listOf<String>()\n\n// ✅ Good: empty list with type\nval map = emptyMap<String, Int>()`,
    relatedErrors: ["kotlin-type-mismatch", "kotlin-unresolved-reference"]
  },
  {
    id: "kotlin-illegalargumentexception",
    errorMessage: "IllegalArgumentException: <message>",
    language: "Kotlin",
    category: "RuntimeException",
    explanation: "An argument passed to a function is invalid or out of expected range. This is a common runtime exception that indicates a precondition check failed.",
    causes: [
      "Passing a null value to a non-null parameter",
      "Providing a value outside an allowed range",
      "Invalid format string or URL",
      "Passing empty string when non-empty is required"
    ],
    solutions: [
      "Validate arguments before passing: `require(name.isNotBlank())`",
      "Use the `require()` standard library function for precondition checks",
      "Check the function documentation for expected parameter ranges",
      "Use `check()` for conditions that should never be false"
    ],
    codeExample: `// ❌ Bad: no validation\nfun setAge(age: Int) {\n    if (age < 0 || age > 150) throw IllegalArgumentException("Invalid age")\n    // ...\n}\n\n// ✅ Good: use require()\nfun setAge(age: Int) {\n    require(age in 0..150) { "Age must be 0-150, got $age" }\n    // ...\n}\n\n// ✅ Good: require for preconditions\nfun divide(a: Int, b: Int): Int {\n    require(b != 0) { "Division by zero" }\n    return a / b\n}`,
    relatedErrors: ["kotlin-null-pointer", "kotlin-type-mismatch"]
  },
  // === Flutter / Dart ===
  {
    id: "dart-undefined-named-parameter",
    errorMessage: "Error: The named parameter 'foo' isn't defined",
    language: "Dart",
    category: "CompileError",
    explanation: "You're passing a named parameter to a function or constructor that doesn't exist or is misspelled. Dart is strict about named parameters and will catch this at compile time.",
    causes: [
      "Typo in the parameter name",
      "The parameter was renamed in a recent API update",
      "The parameter exists in a different version of the package",
      "Using a named parameter on a positional parameter"
    ],
    solutions: [
      "Check the function/constructor signature for the correct parameter name",
      "Look at the package documentation or source code",
      "Use the IDE's autocomplete to find the correct parameter name",
      "Check if the package was recently updated and the API changed"
    ],
    codeExample: `// ❌ Bad\nContainer(\n  color: Colors.red,\n  background: Colors.blue, // Error: 'background' isn't defined\n)\n\n// ✅ Good\nContainer(\n  color: Colors.red,\n  decoration: BoxDecoration(color: Colors.blue),\n)`,
    relatedErrors: ["dart-too-many-positional-arguments", "dart-type-not-subtype"]
  },
  {
    id: "dart-type-not-subtype",
    errorMessage: "type 'Foo' is not a subtype of type 'Bar'",
    language: "Dart",
    category: "TypeError",
    explanation: "You're trying to assign a value of one type to a variable or parameter that expects a different type. This is a runtime error in Dart when dynamic typing is involved.",
    causes: [
      "Using a dynamic variable that holds a different type at runtime",
      "Casting a value to an incorrect type",
      "Passing the wrong type to a function parameter",
      "Using `as` keyword for an invalid cast"
    ],
    solutions: [
      "Use type checking with `is` before casting: `if (obj is String) { obj.length }`",
      "Use `as?` for safe casting: `final name = obj as? String`",
      "Ensure the variable is the correct type before assignment",
      "Use pattern matching with switch statements for complex cases"
    ],
    codeExample: `// ❌ Bad\ndynamic value = 42;\nString name = value; // type 'int' is not a subtype of type 'String'\n\n// ✅ Good: safe cast\ndynamic value = 42;\nif (value is String) {\n  print(value.length);\n}\n\n// ✅ Good: as? operator\ndynamic value = 42;\nString? name = value as String?; // null if not a String`,
    relatedErrors: ["dart-argument-type-not-assignable", "dart-illegal-override"]
  },
  {
    id: "dart-cannot-assign-final-variable",
    errorMessage: "Error: Can't assign variable 'foo'",
    language: "Dart",
    category: "CompileError",
    explanation: "You're trying to reassign a variable declared as `final` or `const`. In Dart, `final` variables can only be assigned once, and `const` variables are compile-time constants.",
    causes: [
      "Using `final` instead of `var` for a variable that needs to be reassigned",
      "Trying to reassign a `const` variable",
      "Trying to reassign a parameter that's declared as `final`",
      "Using `final` in a class field that needs to be mutable"
    ],
    solutions: [
      "Change `final` to `var` if the variable needs to be reassigned",
      "Use `late final` if you need to initialize it later",
      "For class fields, use `var` instead of `final` if you need mutation",
      "For `const`, change to `final` or `var` if you need runtime assignment"
    ],
    codeExample: `// ❌ Bad\nfinal count = 0;\ncount = 1; // Error: Can't assign variable 'count'\n\n// ✅ Good: use var\nvar count = 0;\ncount = 1;\n\n// ✅ Good: late final\nlate final String name;\nname = 'Alice'; // first assignment works\n// name = 'Bob'; // Error: second assignment fails`,
    relatedErrors: ["dart-uninitialized-final-variable", "dart-constant-value"]
  },
  {
    id: "python-permission-error",
    errorMessage: "PermissionError: [Errno 13] Permission denied",
    language: "Python",
    category: "PermissionError",
    explanation: "Your program tried to access a file or directory without the necessary operating system permissions. This is common when working with system files, logs, or directories owned by another user.",
    causes: [
      "Trying to write to a file owned by root or another user",
      "Trying to execute a script without the execute permission bit set",
      "Trying to read a file with restrictive permissions (e.g., /etc/shadow)",
      "Directory does not have write permission",
      "Running the script as a regular user when it needs elevated privileges"
    ],
    solutions: [
      "Check file permissions with `ls -la /path/to/file`",
      "Change permissions with `chmod` (e.g., `chmod +x script.py` for execute)",
      "Change ownership with `chown` (e.g., `sudo chown $USER /path/to/file`)",
      "Run with appropriate privileges (use `sudo` carefully)",
      "For directories, ensure the parent directory allows writing"
    ],
    codeExample: `# ❌ Bad — file owned by root
with open("/var/log/app.log", "a") as f:
    f.write("data")\n# PermissionError: [Errno 13] Permission denied

# ✅ Good — check permissions first
import os
path = "/var/log/app.log"
if os.access(path, os.W_OK):
    with open(path, "a") as f:
        f.write("data")
else:
    print(f"No write permission for {path}")`,
    relatedErrors: ["python-fileno-error", "linux-permission-denied"],
  },
  {
    id: "go-imported-and-not-used",
    errorMessage: "imported and not used",
    language: "Go",
    category: "Compile Error",
    explanation: "You imported a package but never used any of its exported symbols. Go enforces that all imports must be used — unused imports are a compile error, not a warning.",
    causes: [
      "Imported a package but removed the code that used it",
      "Typo in the function or type name from the imported package",
      "Imported the wrong package for the function you're calling",
      "Refactored code and forgot to remove the import"
    ],
    solutions: [
      "Remove the unused import line",
      "Use the package: call a function or reference a type from it",
      "Check for typos in function names from the imported package",
      "Use `_` to import for side effects: `import _ \"database/sql/driver\"`"
    ],
    codeExample: `// ❌ Bad
package main

import (
    "fmt"
    "os" // imported and not used
)

func main() {
    fmt.Println("Hello")
}

// ✅ Good — remove unused import
package main

import "fmt"

func main() {
    fmt.Println("Hello")
}`,
    relatedErrors: ["go-undefined-type", "go-cannot-assign"],
  },
  {
    id: "python-http-connection-refused",
    errorMessage: "ConnectionRefusedError: [Errno 111] Connection refused",
    language: "Python",
    category: "ConnectionError",
    explanation: "Your program tried to connect to a network address (IP:port) but the target machine refused the connection. The port is either not listening, the service is down, or a firewall is blocking it.",
    causes: [
      "The target server/service is not running",
      "The service is listening on a different port",
      "A firewall is blocking the connection",
      "The server is listening on localhost but you're connecting to 127.0.0.1",
      "Too many connections already open on the target port"
    ],
    solutions: [
      "Verify the service is running: `systemctl status <service>` or `docker ps`",
      "Check which port the service is listening on: `ss -tlnp` or `netstat -tlnp`",
      "Ensure the hostname/IP and port are correct in your code",
      "Check firewall rules: `sudo ufw status` or `sudo iptables -L`",
      "Try connecting with `telnet host port` or `curl -v host:port` to diagnose"
    ],
    codeExample: `import requests

# ❌ Bad — server not running on this port
response = requests.get("http://localhost:5000/api/data")
# ConnectionRefusedError

# ✅ Good — check connectivity first
import socket

def check_port(host, port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2)
    result = sock.connect_ex((host, port))
    sock.close()
    return result == 0

if check_port("localhost", 5000):
    response = requests.get("http://localhost:5000/api/data")
else:
    print("Service not running on port 5000")`,
    relatedErrors: ["python-timeout-error", "node-econnrefused"],
  },
  // === High-Volume Errors (Round 16) ===
  {
    id: "js-cannot-read-properties-of-null",
    errorMessage: "TypeError: Cannot read properties of null (reading 'addEventListener')",
    language: "JavaScript",
    category: "TypeError",
    explanation: "You're trying to call a method or access a property on `null`. This happens when `document.querySelector()` or similar DOM methods return null because the element doesn't exist in the DOM when your script runs.",
    causes: [
      "The DOM element hasn't loaded yet when your script executes",
      "The selector (ID, class, tag) doesn't match any element",
      "The element was removed from the DOM before your script ran",
      "A typo in the element ID or class name",
      "The script is in the `<head>` without `defer` or `DOMContentLoaded`"
    ],
    solutions: [
      "Add your script at the end of `<body>` or use `defer` attribute",
      "Wrap code in `document.addEventListener('DOMContentLoaded', () => { ... })`",
      "Check your selector matches an element: `console.log(document.querySelector('#myId'))`",
      "Use optional chaining: `el?.addEventListener(...)` for defensive code"
    ],
    codeExample: `// ❌ Bad — script runs before DOM loads
const btn = document.querySelector("#myBtn");
btn.addEventListener("click", handler); // TypeError if btn is null

// ✅ Good — wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#myBtn");
  btn?.addEventListener("click", handler);
});

// ✅ Good — script at end of body + optional chaining
const btn = document.querySelector("#myBtn");
btn?.addEventListener("click", handler);`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "node-document-is-not-defined"],
  },
  {
    id: "python-modulenotfounderror",
    errorMessage: "ModuleNotFoundError: No module named 'requests'",
    language: "Python",
    category: "ImportError",
    explanation: "Python can't find the module you're trying to import. The module isn't installed, or you're using the wrong Python version/pip environment.",
    causes: [
      "The package isn't installed in the current Python environment",
      "You're using a virtual environment but forgot to activate it",
      "You installed with `pip3` but are running with `python` (or vice versa)",
      "The package name differs from the import name (e.g., `Pillow` vs `PIL`)",
      "A typo in the module name"
    ],
    solutions: [
      "Install the package: `pip install <package-name>`",
      "Ensure you're in the right environment: `which python` and `pip list`",
      "Use `python -m pip install <package>` to install for the active Python",
      "Check the correct import name in the package docs"
    ],
    codeExample: `# ❌ Bad — module not installed
import requests  # ModuleNotFoundError

# ✅ Good — install first
# pip install requests
import requests

# ✅ Good — check if installed
import importlib.util
spec = importlib.util.find_spec("requests")
if spec is None:
    print("requests not installed. Run: pip install requests")
else:
    import requests`,
    relatedErrors: ["python-importerror", "python-circular-import"],
  },
  {
    id: "rust-expected-binding",
    errorMessage: "error[E0658]: cannot find value `x` in this scope",
    language: "Rust",
    category: "NameError",
    explanation: "You're trying to use a variable that hasn't been defined in the current scope. In Rust, variables must be declared before use, and they follow strict scoping rules.",
    causes: [
      "The variable is defined inside a block but used outside it",
      "A typo in the variable name",
      "The variable was moved and can no longer be used",
      "The variable is defined in a different scope (e.g., inside an if block without binding)"
    ],
    solutions: [
      "Declare the variable before the block where you use it",
      "Check for typos in variable names",
      "Use `clone()` or `copy()` if the variable is moved",
      "Bind the variable outside the block and assign inside: `let x; if condition { x = value; }`"
    ],
    codeExample: `// ❌ Bad — variable scope limited to if block
if condition {
    let x = 42;
}
println!("{}", x); // cannot find value 'x'

// ✅ Good — declare outside
let x;
if condition {
    x = 42;
} else {
    x = 0;
}
println!("{}", x);`,
    relatedErrors: ["rust-cannot-move", "rust-borrow-checker"],
  },
  // === High-Volume Errors (Sprint B) ===
  {
    id: "java-indexoutofboundsexception-range",
    errorMessage: "java.lang.IndexOutOfBoundsException: Index 0 out of bounds for length 0",
    language: "Java",
    category: "IndexOutOfBoundsException",
    explanation: "You tried to access an element at an index that does not exist in the array or List. This usually happens when the collection is empty (size 0) and you try to access index 0.",
    causes: [
      "The array or List is empty (size 0)",
      "You are using an index >= size() or >= .length",
      "A loop counter goes beyond the collection bounds",
      "The List was not populated before access",
      "Off-by-one error in loop conditions"
    ],
    solutions: [
      "Check the size before accessing: `if (!list.isEmpty()) { list.get(0); }`",
      "Use a for-each loop instead of indexed access: `for (String s : list)`",
      "Verify the collection was populated correctly",
      "Add bounds checking in your loop: `for (int i = 0; i < list.size(); i++)`"
    ],
    codeExample: `// Bad: assumes list has elements
List<String> list = new ArrayList<>();
String first = list.get(0); // IndexOutOfBoundsException

// Good: check size first
List<String> list = new ArrayList<>();
if (!list.isEmpty()) {
    String first = list.get(0);
}

// Good: use for-each loop
for (String item : list) {
    System.out.println(item);
}`,
    relatedErrors: ["java-indexoutofboundsexception", "java-arrayindexoutofboundsexception"],
  },
  {
    id: "node-unhandled-promise-rejection",
    errorMessage: "UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory",
    language: "Node.js",
    category: "PromiseRejection",
    explanation: "A Promise was rejected (an async operation failed) but no .catch() handler or try/catch block caught the error. In modern Node.js, unhandled promise rejections crash the process.",
    causes: [
      "An async function throws an error without a try/catch",
      "A .then() chain lacks a .catch() handler",
      "File system operations fail (file not found, permissions)",
      "Network requests fail (DNS, timeout, connection refused)",
      "Database queries fail (connection lost, syntax error)"
    ],
    solutions: [
      "Wrap async code in try/catch: try { await doSomething(); } catch (e) { ... }",
      "Add .catch() to Promise chains: doSomething().catch(handleError)",
      "Use process.on(unhandledRejection, ...) for global error handling",
      "Always handle file/network errors before they propagate"
    ],
    codeExample: `// Bad: no error handling
async function readFile(path) {
  const data = await fs.readFile(path, "utf8"); // crashes if file missing
  return data;
}

// Good: try/catch
async function readFile(path) {
  try {
    const data = await fs.readFile(path, "utf8");
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("File not found:", path);
      return null;
    }
    throw err;
  }
}`,
    relatedErrors: ["node-enoent", "python-http-connection-refused"],
  },
  // === New entries: Sprint B Round 17 ===
  {
    id: "node-econnreset",
    errorMessage: "Error: read ECONNRESET",
    language: "Node.js",
    category: "NetworkError",
    explanation: "The remote server closed the TCP connection abruptly while data was being read. This means the server killed the connection before your Node.js client finished receiving the response.",
    causes: [
      "Server crashed or shut down while handling the request",
      "Server has a timeout shorter than your request takes",
      "Network interruption between client and server",
      "Server is under load and dropping connections",
      "Keep-alive connection was closed by the server"
    ],
    solutions: [
      "Add retry logic with exponential backoff",
      "Check if the server is running and healthy",
      "Reduce request payload size or add streaming",
      "Set appropriate timeouts on your HTTP client",
      "Use Connection: close header instead of keep-alive",
      "Check firewall or proxy settings for connection limits"
    ],
    codeExample: `// ❌ No retry logic
const response = await fetch("https://api.example.com/data");

// ✅ With retry logic
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
      return response;
    } catch (err) {
      if (err.code === "ECONNRESET" && i < retries - 1) {
        await new Promise(r => setTimeout(r, 1000 * 2 ** i));
        continue;
      }
      throw err;
    }
  }
}`,
    relatedErrors: ["node-econnrefused", "python-http-connection-refused"],
  },
  {
    id: "py-ssl-cert-verify-failed",
    errorMessage: "ssl.SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed",
    language: "Python",
    category: "SSLError",
    explanation: "Python's SSL/TLS library could not verify the server's SSL certificate. This commonly happens on macOS (missing root certificates) or when connecting to servers with self-signed certificates.",
    causes: [
      "macOS Python install missing root certificates (install Certificates.command)",
      "Self-signed or expired server certificate",
      "Corporate proxy intercepting HTTPS traffic",
      "System clock is incorrect (certificate appears not yet valid or expired)",
      "Outdated CA certificate bundle in Python"
    ],
    solutions: [
      "macOS: Run /Applications/Python 3.x/Install Certificates.command",
      "Install certifi: pip install certifi",
      "Update CA certs: pip install --upgrade certifi",
      "For self-signed certs: use verify=False (development only) or provide CA bundle",
      "Set REQUESTS_CA_BUNDLE or CURL_CA_BUNDLE environment variable",
      "Fix system clock if dates are wrong"
    ],
    codeExample: `# ❌ Certificate verification fails
import requests
response = requests.get("https://self-signed.example.com")
# ssl.SSLCertVerificationError

# ✅ Option 1: Use certifi
import certifi
response = requests.get("https://self-signed.example.com", verify=certifi.where())

# ✅ Option 2: Disable verification (dev only, NEVER in production)
response = requests.get("https://self-signed.example.com", verify=False)

# ✅ Option 3: Provide CA bundle
response = requests.get("https://self-signed.example.com", verify="/path/to/ca-bundle.crt")`,
    relatedErrors: ["python-http-connection-refused", "node-econnrefused"],
  },
  {
    id: "react-hydration-mismatch",
    errorMessage: "Hydration failed because the initial UI does not match what was rendered on the server",
    language: "React",
    category: "HydrationError",
    explanation: "React expected the server-rendered HTML to match exactly what the client rendered, but they differ. This happens when rendering depends on client-only state (browser APIs, window object, Date.now(), localStorage).",
    causes: [
      "Using browser APIs (window, document, navigator) during render",
      "Using Date.now() or new Date() that differs between server and client",
      "Reading from localStorage/sessionStorage during render",
      "Conditional rendering based on screen size or media queries",
      "Third-party scripts modifying the DOM before hydration",
      "useEffect logic accidentally placed in render"
    ],
    solutions: [
      "Move client-only code into useEffect (runs only on client)",
      "Use suppressHydrationWarning on elements that intentionally differ",
      "Use dynamic import with { ssr: false } for client-only components",
      "Use useSyncExternalStore for browser state (localStorage, media queries)",
      "Ensure date/time rendering is consistent (use UTC or suppress warnings)",
      "Disable browser extensions that modify DOM during testing"
    ],
    codeExample: `// ❌ Renders differently on server vs client
function Greeting() {
  const isClient = typeof window !== "undefined"; // undefined on server
  return <p>{isClient ? "Welcome back!" : "Welcome!"}</p>;
}

// ✅ Use useEffect for client-only state
function Greeting() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return <p>{isClient ? "Welcome back!" : "Welcome!"}</p>;
}

// ✅ Or use suppressHydrationWarning
function CurrentTime() {
  return <time suppressHydrationWarning>{new Date().toLocaleTimeString()}</time>;
}`,
    relatedErrors: ["react-invalid-hook-call", "react-hooks-deps"],
  },
  {
    id: "node-enoent",
    errorMessage: "Error: ENOENT: no such file or directory, open '/path/to/file'",
    language: "Node.js",
    category: "FileSystemError",
    explanation: "The system cannot find the file specified. ENOENT stands for 'Error NO ENTry' (no entry). This happens when you try to read, write, or access a file or directory that doesn't exist at the specified path.",
    causes: [
      "File path is incorrect (typo, wrong directory)",
      "File hasn't been created yet",
      "Working directory is different than expected",
      "File was deleted or moved",
      "Using relative path when absolute is needed (or vice versa)"
    ],
    solutions: [
      "Verify the file path exists: fs.existsSync(path) or check with ls/dir",
      "Use path.resolve() or path.join() to build absolute paths",
      "Check your working directory with process.cwd()",
      "Create the file/directory before accessing it: fs.mkdirSync(dir, { recursive: true })",
      "Use try/catch to handle missing files gracefully"
    ],
    codeExample: `// ❌ File doesn't exist
const data = fs.readFileSync('config.json', 'utf-8');

// ✅ Check first
if (fs.existsSync('config.json')) {
  const data = fs.readFileSync('config.json', 'utf-8');
}

// ✅ Use try/catch
try {
  const data = fs.readFileSync('config.json', 'utf-8');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('File not found, using defaults');
  }
}

// ✅ Use async with error handling
const { readFile } = require('fs/promises');
try {
  const data = await readFile('config.json', 'utf-8');
} catch (err) {
  if (err.code === 'ENOENT') {
    // Handle missing file
  }
}`,
    relatedErrors: ["python-filenotfounderror", "java-filenotfoundexception"],
  },
  {
    id: "java-nullpointerexception",
    errorMessage: "java.lang.NullPointerException",
    language: "Java",
    category: "NullPointerException",
    explanation: "You tried to call a method or access a field on an object reference that is null. This is one of the most common Java exceptions and occurs when an object hasn't been initialized or has been explicitly set to null.",
    causes: [
      "Calling a method on a null reference",
      "Accessing a field on a null object",
      "Array indexing on a null array",
      "Unboxing a null Integer/Double/etc to a primitive",
      "Method parameter was null when it shouldn't be"
    ],
    solutions: [
      "Add null checks before using objects: if (obj != null)",
      "Use Optional<T> for values that may be absent",
      "Initialize objects before using them",
      "Use Objects.requireNonNull() for parameter validation",
      "Use the null-safe operator in Kotlin or similar patterns"
    ],
    codeExample: `// ❌ NullPointerException
String name = null;
System.out.println(name.length()); // NPE!

// ✅ Null check
if (name != null) {
    System.out.println(name.length());
}

// ✅ Use Optional
Optional<String> optName = Optional.ofNullable(name);
optName.ifPresent(n -> System.out.println(n.length()));

// ✅ Objects.requireNonNull for parameters
public void processName(String name) {
    Objects.requireNonNull(name, "Name must not be null");
    System.out.println(name.length());
}`,
    relatedErrors: ["python-nonetype-object", "js-cannot-read-properties-of-undefined"],
  },
  {
    id: "python-nonetype-object",
    errorMessage: "AttributeError: 'NoneType' object has no attribute 'xyz'",
    language: "Python",
    category: "AttributeError",
    explanation: "You're trying to access an attribute or method on None. This happens when a function returns None (explicitly or by default) and you treat the result as if it has a value.",
    causes: [
      "Function returns None implicitly (no return statement)",
      "Variable assigned None and not checked before use",
      "Dictionary.get() returns None for missing key",
      "List.pop() on empty list returns None",
      "Assignment expressions (walrus operator) returning None"
    ],
    solutions: [
      "Check for None before using the value: if result is not None",
      "Use assert statements in development: assert result is not None",
      "Use try/except with AttributeError",
      "Set default values: result = func() or default_value",
      "Use typing.Optional and check in type-checking tools (mypy)"
    ],
    codeExample: `# ❌ NoneType has no attribute
def find_user(id):
    if id > 100:
        return {"name": "Alice"}
    # implicitly returns None

user = find_user(1)
print(user["name"])  # AttributeError: 'NoneType' object has no attribute '__getitem__'

# ✅ Check for None
user = find_user(1)
if user is not None:
    print(user["name"])

# ✅ Use default value
user = find_user(1) or {"name": "Unknown"}
print(user["name"])

# ✅ Use Optional type hint
from typing import Optional

def find_user(id: int) -> Optional[dict]:
    if id > 100:
        return {"name": "Alice"}
    return None`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "java-nullpointerexception"],
  },
  {
    id: "python-modulenotfounderror",
    errorMessage: "ModuleNotFoundError: No module named 'xyz'",
    language: "Python",
    category: "ImportError",
    explanation: "Python can't find the module you're trying to import. This means the module isn't installed, isn't in your Python path, or you have a typo in the module name.",
    causes: [
      "The module is not installed in the current Python environment",
      "You're using a different Python version or virtual environment than expected",
      "Typo in the module or package name",
      "The module name conflicts with a local file (e.g., naming your file 'random.py')",
      "The module was installed for a different Python interpreter (e.g., pip3 vs pip)"
    ],
    solutions: [
      "Install the module: `pip install module_name`",
      "Check you're using the right Python environment: `which python` and `pip list`",
      "Verify the module name spelling",
      "Don't name your files the same as standard library modules",
      "Use `python -m pip install module_name` if multiple Python versions exist"
    ],
    codeExample: `# ❌ Module not installed
import pandas as pd  # ModuleNotFoundError: No module named 'pandas'

# ✅ Install it first
# Terminal: pip install pandas
import pandas as pd

# ❌ Wrong environment
# If you have multiple Python versions:
python3 -m pip install requests  # installs for python3
python2 -m pip install requests  # installs for python2

# ✅ Check which Python you're using
import sys
print(sys.executable)  # Shows which Python is running
print(sys.path)        # Shows module search paths

# ❌ File name conflicts with module
# If you name your file "random.py":
import random  # Imports YOUR file, not the stdlib module!

# ✅ Rename your file to something else`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "python-nonetype-object"],
  },
  {
    id: "js-typeerror-x-is-not-a-function",
    errorMessage: "TypeError: x is not a function",
    language: "JavaScript",
    category: "TypeError",
    explanation: "You're trying to call something as a function, but it's not a function. The variable might be undefined, null, a number, a string, or an object that isn't callable.",
    causes: [
      "Calling a variable that hasn't been assigned a function value",
      "Calling a method that doesn't exist on an object",
      "Using arrow function syntax incorrectly",
      "Import/export mismatch (calling a named export as default or vice versa)",
      "Async function called without await (returns Promise, not result)"
    ],
    solutions: [
      "Check if the value is actually a function: `typeof x === 'function'`",
      "Verify the import/export names match",
      "Use optional chaining for methods: `obj?.method?.()`",
      "Check if you need to instantiate a class: `new ClassName()` instead of `ClassName()`",
      "Ensure async functions are awaited properly"
    ],
    codeExample: `// ❌ Calling a non-function
let result = "hello";
result();  // TypeError: result is not a function

// ❌ Wrong import
// utils.js exports: export const fetchData = () => {...}
import { fetchData } from './utils';
const data = fetchData();  // ✅ correct

// utils.js default export: export default () => {...}
import fetchData from './utils';
const data = fetchData();  // ✅ correct
import { fetchData } from './utils';  // ❌ TypeError

// ❌ Async without await
async function getData() {
  return fetch('/api/data');
}
const response = getData();     // ❌ Returns Promise, not Response
const data = response.json();   // ❌ TypeError

// ✅ Correct async usage
async function getData() {
  const response = await getData();  // ✅ Await the promise
  const data = await response.json(); // ✅ Then call .json()
  return data;
}

// ❌ Class without new
class Dog {
  constructor(name) { this.name = name; }
}
const dog = Dog("Rex");  // ❌ TypeError

// ✅ Use new
const dog = new Dog("Rex");  // ✅`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "js-reference-not-defined"],
  },
  // === Python ===
  {
    id: "python-indexerror-list-index-out-of-range",
    errorMessage: "IndexError: list index out of range",
    language: "Python",
    category: "IndexError",
    explanation: "You're trying to access an element at an index that doesn't exist in the list. Python lists are zero-indexed, so the first element is at index 0, and the last element is at index len(list) - 1.",
    causes: [
      "Accessing an index beyond the list length (e.g., my_list[10] when list has 5 elements)",
      "Off-by-one error in loop bounds (e.g., range(len(list) + 1) instead of range(len(list)))",
      "Empty list — accessing any index fails",
      "Using negative index on empty list (e.g., my_list[-1] when list is empty)",
      "Wrong assumption about list contents after filtering or slicing"
    ],
    solutions: [
      "Check list length before accessing: if i < len(my_list)",
      "Use for item in my_list instead of indexing with range()",
      "Use try/except IndexError to handle edge cases gracefully",
      "Use my_list[-1] only after confirming list is not empty",
      "Debug: print(len(my_list)) and the index you're accessing"
    ],
    codeExample: `# ❌ Bad\nmy_list = [1, 2, 3]\nprint(my_list[5])  # IndexError\n\n# ❌ Bad (off-by-one)\nfor i in range(len(my_list) + 1):\n    print(my_list[i])  # IndexError on last iteration\n\n# ✅ Good — iterate directly\nfor item in my_list:\n    print(item)\n\n# ✅ Good — safe access\ndef get_item(lst, index):\n    if 0 <= index < len(lst):\n        return lst[index]\n    return None`,
    relatedErrors: ["python-typeerror-list-index-out-of-range", "python-keyerror"],
  },
  {
    id: "python-typeerror-unsupported-operand",
    errorMessage: "TypeError: unsupported operand type(s) for +: 'int' and 'str'",
    language: "Python",
    category: "TypeError",
    explanation: "You're trying to use an operator (like +, -, *) between two types that don't support that operation. The most common case is trying to concatenate a string and a number.",
    causes: [
      "Adding a string and an integer: 'age: ' + 25",
      "Forgetting to convert input() to int (input() always returns a string)",
      "Mixing numeric types in unexpected ways",
      "Passing a string where a number is expected",
      "Forgetting to convert between types before arithmetic"
    ],
    solutions: [
      "Convert the string to int/float: int('25') or float('3.14')",
      "Use f-strings or str(): f\"age: {25}\" or \"age: \" + str(25)",
      "Always validate input types before operations",
      "Use type hints to catch issues early",
      "Check with isinstance() before arithmetic"
    ],
    codeExample: `# ❌ Bad\nage = input("Enter age: ")  # Returns a string\nnext_year = age + 1  # TypeError!\n\n# ✅ Good — convert input\nage = int(input("Enter age: "))\nnext_year = age + 1\n\n# ❌ Bad\nresult = "Total: " + 42  # TypeError\n\n# ✅ Good\nresult = f"Total: {42}"\n# or\nresult = "Total: " + str(42)`,
    relatedErrors: ["python-valueerror-literal", "python-typeerror-not-supported"],
  },
  // === Ruby ===
  {
    id: "ruby-nomethoderror-undefined-method",
    errorMessage: "NoMethodError: undefined method `foo' for #<Bar:0x00007f>",
    language: "Ruby",
    category: "NoMethodError",
    explanation: "You're calling a method that doesn't exist on the object. This is Ruby's equivalent of TypeError for method calls. The error message shows the method name, the receiver object, and its class.",
    causes: [
      "Typo in the method name",
      "Calling a method on nil (very common: nil has very few methods)",
      "Method was renamed or removed in a newer version",
      "Calling an instance method where a class method is needed (or vice versa)",
      "The method exists on a superclass but not the subclass",
      "Using a method from a gem that isn't required/loaded"
    ],
    solutions: [
      "Check for nil: use `obj&.method` (safe navigation) or `obj&.method || default`",
      "Verify the method name spelling and check the API docs",
      "Use `respond_to?` to check if a method exists before calling it",
      "Check `obj.class` and `obj.methods` to see what methods are available",
      "Ensure all gems are properly required at the top of your file",
      "Use `extend` or `include` to mix in the module that defines the method"
    ],
    codeExample: `# ❌ Bad — calling method on nil
user = User.find_by(email: "test@example.com")  # returns nil
user.name  # NoMethodError: undefined method 'name' for nil:NilClass

# ✅ Good — safe navigation operator
user&.name
user&.name || "Anonymous"

# ✅ Good — check existence first
if user
  user.name
end

# ❌ Bad — calling class method on instance
array = [1, 2, 3]
array.new  # NoMethodError — Array.new is a class method

# ✅ Good — use the correct scope
my_array = Array.new(5)  # [nil, nil, nil, nil, nil]

# ✅ Good — check if method exists
if obj.respond_to?(:foo)
  obj.foo
end`,
    relatedErrors: ["ruby-argumenterror", "js-cannot-read-properties-of-undefined"],
  },
  // === Go ===
  {
    id: "go-nil-pointer-dereference",
    errorMessage: "runtime error: invalid memory address or nil pointer dereference",
    language: "Go",
    category: "RuntimeError",
    explanation: "You're dereferencing (accessing fields or methods of) a pointer that is nil. In Go, nil pointers don't point to valid memory, so any attempt to access their fields causes a panic.",
    causes: [
      "Calling a method on a nil pointer receiver",
      "Accessing a field of a nil struct pointer",
      "Using a map or slice that was never initialized (nil map/slice)",
      "Not checking the error return before using a value",
      "Forgetting to initialize a pointer with & or new()",
      "Unmarshaling JSON into a nil pointer"
    ],
    solutions: [
      "Always check if a pointer is nil before dereferencing: if ptr != nil { ... }",
      "Initialize maps and slices: m := make(map[string]int) or s := []int{}",
      "Use the safe pattern: if err != nil { return err } immediately after the call",
      "Use a zero-value check: if ptr == nil { return default }",
      "Initialize struct pointers with &StructName{} before use",
      "Use the blank identifier _ for unused return values where appropriate"
    ],
    codeExample: `// ❌ Bad — dereferencing nil pointer
type User struct {
    Name string
}
func getUser(id int) *User {
    return nil  // user not found
}
u := getUser(999)
fmt.Println(u.Name)  // panic: nil pointer dereference

// ✅ Good — check for nil
u := getUser(999)
if u != nil {
    fmt.Println(u.Name)
} else {
    fmt.Println("User not found")
}

// ❌ Bad — nil map
var m map[string]int
m["key"] = 1  // panic: assignment to entry in nil map

// ✅ Good — initialize map
m := make(map[string]int)
m["key"] = 1

// ✅ Good — use safe error handling
result, err := doSomething()
if err != nil {
    log.Fatal(err)
}
fmt.Println(result)`,
    relatedErrors: ["go-index-out-of-range", "js-cannot-read-properties-of-undefined"],
  },
  // === JavaScript ===
  {
    id: "js-syntaxerror-unexpected-end-json",
    errorMessage: "SyntaxError: Unexpected end of JSON input",
    language: "JavaScript",
    category: "SyntaxError",
    explanation: "You're calling JSON.parse() on a string that isn't valid JSON — typically an empty string, incomplete response, or HTML error page. This happens most often when fetching data from an API and the response is not what you expect.",
    causes: [
      "API returns an empty response body (200 with no content)",
      "API returns an HTML error page instead of JSON (404, 500, etc.)",
      "Network error causes an empty or truncated response",
      "Response body was already consumed (read twice)",
      "CORS error causes an opaque response with empty body",
      "Server returns 'null' or empty string instead of JSON"
    ],
    solutions: [
      "Check response.ok before parsing: if (!response.ok) throw new Error()",
      "Log response.text() before JSON.parse() to see what you actually received",
      "Use try/catch around JSON.parse() to handle malformed responses",
      "Check Content-Type header: response.headers.get('content-type')",
      "Verify the API URL is correct and returns JSON",
      "Check browser Network tab to see the actual response body"
    ],
    codeExample: `// ❌ Bad — no check before parsing
const res = await fetch('/api/data');
const data = await res.json(); // SyntaxError if response is empty

// ✅ Good — validate response first
const res = await fetch('/api/data');
if (!res.ok) {
  throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
}
const data = await res.json();

// ✅ Good — with try/catch
try {
  const data = await JSON.parse(someString);
} catch (e) {
  console.error('Invalid JSON:', e.message);
}`,
    relatedErrors: ["js-typeerror-x-is-not-a-function", "node-enoent"],
  },
  // === Python ===
  {
    id: "python-valueerror-too-many-values-to-unpack",
    errorMessage: "ValueError: too many values to unpack (expected 2)",
    language: "Python",
    category: "ValueError",
    explanation: "You're unpacking an iterable into variables, but the iterable has more items than variables. For example, trying to unpack 3 values into 2 variables.",
    causes: [
      "Unpacking a tuple/list with more elements than variables: a, b = (1, 2, 3)",
      "Dictionary .items() returns more key-value pairs than expected",
      "Function returns a tuple with unexpected number of values",
      "CSV row has more columns than expected",
      "Iterating over nested data with wrong unpacking pattern"
    ],
    solutions: [
      "Use * to capture remaining values: a, *rest = (1, 2, 3)",
      "Check the length of the iterable before unpacking",
      "Use indexing instead of unpacking: values[0], values[1]",
      "Use a loop if the number of elements varies",
      "Print the iterable first to see its actual structure",
      "Use named tuples or dataclasses for structured data"
    ],
    codeExample: `# ❌ Bad — too many values to unpack
point = (1, 2, 3)
x, y = point  # ValueError: too many values to unpack

# ✅ Good — use star to capture extras
x, *rest = point  # x=1, rest=[2, 3]

# ✅ Good — or use all three
x, y, z = point  # x=1, y=2, z=3

# ❌ Bad — wrong unpacking from dict.items()
data = {'a': 1, 'b': 2, 'c': 3}
for key, value in data.items():
    print(key)  # works fine

# ✅ Good — when structure is unknown, use indexing
data = [(1, 2, 3), (4, 5, 6)]
for row in data:
    first = row[0]  # safe access
    print(first)`,
    relatedErrors: ["python-typeerror-unsupported-operand"],
  },
  // === Node.js ===
  {
    id: "node-err-require-esm",
    errorMessage: "Error [ERR_REQUIRE_ESM]: require() of ES Module ... not supported.",
    language: "Node.js",
    category: "ERR_REQUIRE_ESM",
    explanation: "You're trying to `require()` an ES Module (ESM) from a CommonJS (CJS) context. Node.js cannot load ESM modules using `require()` — ESM must be loaded with `import` or dynamic `import()`.",
    causes: [
      "The dependency you're importing has been updated to use ES Modules (type: module in package.json)",
      "Your project uses CommonJS (no type: module in package.json) but imports an ESM-only package",
      "Using require() instead of import in a file that depends on ESM packages",
      "The package.json of the dependency specifies \"type\": \"module\""
    ],
    solutions: [
      "Convert your file to use `import` instead of `require()`",
      "Add `\"type\": \"module\"` to your package.json (may require other changes)",
      "Use dynamic import: `const mod = await import('package-name')`",
      "Check if the package offers a CJS build (some packages have dual CJS/ESM exports)",
      "Downgrade the dependency to a version that still supports CJS",
      "Use a bundler like esbuild or webpack that can handle ESM/CJS interop"
    ],
    codeExample: `// ❌ Bad — CommonJS require() of ESM package
const somePackage = require('some-esm-package');

// ✅ Good — Use import
import somePackage from 'some-esm-package';

// ✅ Good — Dynamic import in CommonJS
const somePackage = await import('some-esm-package');

// ✅ Good — Add "type": "module" to package.json
// Then use import everywhere`,
    relatedErrors: ["node-cannot-find-module", "node-enoent"]
  },
  // === Python ===
  {
    id: "python-typeerror-unhashable-type",
    errorMessage: "TypeError: unhashable type: 'dict'",
    language: "Python",
    category: "TypeError",
    explanation: "You're trying to use a mutable object (like a dict, list, or set) as a dictionary key or as an element of a set. Only hashable (immutable) types can be used as dictionary keys or set elements.",
    causes: [
      "Using a dictionary as a key in another dictionary: `{my_dict: value}`",
      "Using a list as a set element: `{[1, 2, 3]}`",
      "Passing a dict/list to a function that requires hashable arguments (like `hash()`)",
      "Using a dict/list as a key in a `defaultdict` or `Counter`",
      "Trying to add a mutable object to a `frozenset`"
    ],
    solutions: [
      "Convert the dict to a `frozenset` or tuple: `frozenset(my_dict.items())`",
      "Use a tuple instead of a list as a set element: `{(1, 2, 3)}`",
      "Use an immutable type as a dict key (str, int, tuple, frozenset)",
      "If you need to store complex structures as keys, consider using a nested dict instead",
      "Use `json.dumps()` to convert a dict to a hashable string key"
    ],
    codeExample: `# ❌ Bad — dict is not hashable
my_dict = {"a": 1, "b": 2}
lookup = {my_dict: "value"}  # TypeError

# ✅ Good — Use a frozenset or tuple
lookup = {frozenset(my_dict.items()): "value"}

# ✅ Good — Use a tuple for list keys
my_list = [1, 2, 3]
lookup = {tuple(my_list): "value"}

# ✅ Good — Use json string as key
import json
lookup = {json.dumps(my_dict, sort_keys=True): "value"}`,
    relatedErrors: ["python-typeerror-unhashable-type-set", "python-typeerror-list-index-out-of-range"]
  },
  // === JavaScript ===
  {
    id: "js-out-of-memory",
    errorMessage: "FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory",
    language: "JavaScript",
    category: "MemoryError",
    explanation: "Node.js has run out of memory. The V8 engine has a default heap size limit (typically 1.5GB-4GB depending on platform) and your program has exceeded it.",
    causes: [
      "Memory leak: variables, event listeners, or closures holding references that prevent garbage collection",
      "Processing very large files or datasets entirely in memory",
      "Infinite recursion or very deep call stacks",
      "Accumulating objects in arrays/maps without cleanup",
      "Loading a very large module tree or many dependencies",
      "Circular references preventing garbage collection"
    ],
    solutions: [
      "Increase the heap size: `node --max-old-space-size=8192 script.js`",
      "Fix memory leaks: use Chrome DevTools heap snapshots to find retained objects",
      "Stream large files instead of loading entirely into memory (fs.createReadStream)",
      "Use generators or async iteration for large datasets",
      "Process data in chunks instead of loading everything at once",
      "Check for event listener leaks: remove listeners when done",
      "Use `--inspect` flag to profile memory usage"
    ],
    codeExample: `// ❌ Bad — Loading entire large file
const fs = require('fs');
const data = fs.readFileSync('huge-file.json', 'utf8');
const parsed = JSON.parse(data); // Uses 2x memory

// ✅ Good — Stream and process in chunks
const fs = require('fs');
const readline = require('readline');
const stream = fs.createReadStream('huge-file.json');
const rl = readline.createInterface({ input: stream });
rl.on('line', (line) => {
  // Process one line at a time
});

// ✅ Good — Increase heap size for build tools
// NODE_OPTIONS="--max-old-space-size=4096" next build`,
    relatedErrors: ["node-heap-out-of-memory", "js-cannot-read-properties-of-undefined"]
  },
  {
    id: "python-importerror-cannot-import-name",
    errorMessage: "ImportError: cannot import name 'something' from 'module_name'",
    language: "Python",
    category: "ImportError",
    explanation: "Python can't find the specific name (function, class, variable) you're trying to import from the module. The module exists, but the name you specified doesn't exist within it.",
    causes: [
      "Typo in the name you're importing",
      "The name doesn't exist in the module (it may have been removed or renamed)",
      "Circular import: module A imports from module B which imports from module A",
      "The module hasn't been fully initialized yet when the import runs",
      "You're importing from the wrong version of a package",
      "The name is defined conditionally or lazily and isn't available yet"
    ],
    solutions: [
      "Check the module's documentation for the correct name",
      "Use `import module` and then `module.name` to see what's available",
      "Run `dir(module_name)` in a Python shell to list all exports",
      "Fix circular imports by moving the import inside a function",
      "Upgrade or downgrade the package to the correct version",
      "Use `from module import *` temporarily to see what names exist"
    ],
    codeExample: `# ❌ Bad — wrong name\nfrom collections import OrderedDict2\n\n# ❌ Bad — circular import\n# a.py imports from b.py, b.py imports from a.py\n\n# ✅ Good — check what's available\nimport collections\nprint(dir(collections))\n\n# ✅ Good — use the correct name\nfrom collections import OrderedDict\n\n# ✅ Good — lazy import to break circular dependency\ndef get_something():\n    from my_module import something\n    return something`,
    relatedErrors: ["python-modulenotfounderror", "python-nameerror-name-is-not-defined"]
  },
  // === JavaScript ===
  {
    id: "js-cors-error",
    errorMessage: "Access to XMLHttpRequest at 'https://api.example.com' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
    language: "JavaScript",
    category: "NetworkError",
    explanation: "The browser's CORS (Cross-Origin Resource Sharing) policy is blocking the request. The server at the target URL didn't include the required `Access-Control-Allow-Origin` header in its response, so the browser refuses to let your JavaScript code access the response.",
    causes: [
      "The API server doesn't include CORS headers in its response",
      "You're making a request from a different origin (protocol, domain, or port) than the server",
      "The server only allows specific origins and yours isn't in the list",
      "The request includes custom headers that trigger a preflight OPTIONS request that fails",
      "Using credentials (cookies/auth) without the server allowing it",
      "The API requires a specific Content-Type that triggers preflight"
    ],
    solutions: [
      "Add CORS headers on the server: `Access-Control-Allow-Origin: *` or specific origin",
      "Use a proxy server or Next.js API routes to bypass CORS during development",
      "Configure your backend to include proper CORS headers for your frontend domain",
      "In development, use your framework's proxy setting (e.g., Next.js rewrites)",
      "Ensure the server handles OPTIONS preflight requests correctly",
      "Check if the API provides a CORS configuration option"
    ],
    codeExample: `// ❌ Bad — direct cross-origin request (blocked)\nfetch('https://api.example.com/data')\n  .then(res => res.json())\n  .catch(err => console.error('CORS error'));\n\n// ✅ Good — use a proxy in Next.js (next.config.js)\n// module.exports = {\n//   async rewrites() {\n//     return [{\n//       source: '/api/:path*',\n//       destination: 'https://api.example.com/:path*'\n//     }];\n//   }\n// };\n\n// ✅ Good — Express server CORS setup\nconst cors = require('cors');\napp.use(cors({ origin: 'http://localhost:3000' }));\n\n// ✅ Good — fetch through your own API route\nfetch('/api/proxy/data').then(res => res.json());`,
    relatedErrors: ["js-network-request-failed", "node-econnreset"]
  },
  // === Docker ===
  {
    id: "docker-container-exits-immediately",
    errorMessage: "Error response from daemon: Cannot start container xyz: OCI runtime create failed: container process is already dead",
    language: "Docker",
    category: "ContainerError",
    explanation: "Your Docker container starts and immediately exits. This usually means the main process inside the container is crashing or finishing instantly, often because the command isn't set up for long-running execution.",
    causes: [
      "The CMD or ENTRYPOINT command finishes immediately (e.g., a script that runs and exits)",
      "The application inside the container has a startup error and crashes",
      "The Dockerfile CMD uses exec form but the process isn't found",
      "Missing environment variables that the application requires",
      "The container doesn't have a foreground process (daemon mode issue)",
      "Volume mount points to a non-existent directory or wrong permissions"
    ],
    solutions: [
      "Check logs: `docker logs <container_id>` to see the crash output",
      "Run interactively to debug: `docker run -it <image> /bin/sh`",
      "Ensure your CMD runs a foreground process (not a daemon script)",
      "For web servers, make sure the command doesn't fork to background",
      "Check that required environment variables are set with `-e` flags",
      "Verify the entrypoint script has correct permissions and line endings",
      "Use `docker run --rm <image>` to see exit behavior clearly"
    ],
    codeExample: `# ❌ Bad — script runs and exits immediately\nCMD ["./startup.sh"]\n# startup.sh runs db migration then exits\n\n# ✅ Good — run the app in foreground\nCMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]\n# Or for Node.js:\nCMD ["node", "server.js"]\n\n# ✅ Good — combine migration + foreground in one script\n#!/bin/sh\npython manage.py migrate\nexec python manage.py runserver 0.0.0.0:8000\n# exec replaces the shell so PID 1 is your app\n\n# Debug commands:\ndocker logs <container_id>\ndocker run -it <image> /bin/sh\ndocker inspect <container_id>`,
    relatedErrors: ["docker-cannot-find-image", "docker-no-space-left-on-device"]
  },
  // === Python ===
  {
    id: "python-nonetype-not-callable",
    errorMessage: "TypeError: 'NoneType' object is not callable",
    language: "Python",
    category: "TypeError",
    explanation: "You're trying to call a variable like a function, but its value is None. This happens when a function doesn't have an explicit return statement (implicitly returns None), and you then try to call the result as if it were a function.",
    causes: [
      "A function has no return statement and you call its return value as a function",
      "You accidentally shadowed a built-in function (e.g., list = [1,2,3]; list())",
      "An assignment overwrites a function with None (e.g., my_func = my_func())",
      "A method returns None and you try to chain another call on it",
      "A variable was expected to hold a function/class but is None due to a failed import or initialization"
    ],
    solutions: [
      "Check the function for a missing or misplaced return statement",
      "Avoid using variable names that shadow built-ins (don't use list, dict, type as variable names)",
      "Use a debugger or print statements to check the variable's value before calling",
      "Add a None check: `if my_func is not None: my_func()`",
      "Verify that imports are successful and the function/class is actually loaded"
    ],
    codeExample: `# ❌ Bad — function returns None, then called as function\ndef get_multiplier(factor):\n    result = factor * 2\n    # Missing return statement!\n\nmultiplier = get_multiplier(5)\nprint(multiplier(3))  # TypeError: 'NoneType' object is not callable\n\n# ✅ Good — add return statement\ndef get_multiplier(factor):\n    def multiply(x):\n        return x * factor\n    return multiply\n\nmultiplier = get_multiplier(5)\nprint(multiplier(3))  # 15\n\n# ❌ Bad — shadowing built-in\ntype = "hello"\nprint(type(42))  # TypeError: 'str' object is not callable\n\n# ✅ Good — don't shadow built-ins\ntype_name = "hello"\nprint(type(42))  # <class 'int'>`,
    relatedErrors: ["python-nameerror-name-is-not-defined", "python-attributeerror-nonetype"]
  },
  // === JavaScript ===
  {
    id: "js-referenceerror-not-defined",
    errorMessage: "ReferenceError: myVariable is not defined",
    language: "JavaScript",
    category: "ReferenceError",
    explanation: "You're trying to use a variable, function, or object that hasn't been declared in the current scope. Unlike some other languages, JavaScript doesn't create variables until they're explicitly declared with var, let, or const.",
    causes: [
      "The variable hasn't been declared yet (typo or missing declaration)",
      "The variable is declared in a different scope (block, function, module)",
      "The variable is declared with const/let in a block scope and used outside it",
      "A function is called before it's defined (for function declarations, they're hoisted, but not for function expressions or arrow functions)",
      "You're trying to access an undeclared global variable",
      "The variable name has a typo"
    ],
    solutions: [
      "Declare the variable before using it with let, const, or var",
      "Check for typos in the variable name",
      "Move the declaration to the appropriate scope",
      "For function expressions and arrow functions, define them before calling",
      "Use typeof to safely check if a variable exists: `if (typeof myVar !== 'undefined')`",
      "Enable strict mode to catch undeclared variables early"
    ],
    codeExample: `// ❌ Bad — variable not declared\nconsole.log(name); // ReferenceError: name is not defined\n\n// ✅ Good — declare before use\nconst name = "Alice";\nconsole.log(name); // Alice\n\n// ❌ Bad — block scope leak\nif (true) {\n  let secret = 42;\n}\nconsole.log(secret); // ReferenceError: secret is not defined\n\n// ✅ Good — declare in accessible scope\nlet secret;\nif (true) {\n  secret = 42;\n}\nconsole.log(secret); // 42\n\n// ❌ Bad — function expression called before defined\nsayHello(); // ReferenceError: Cannot access 'sayHello' before initialization\nconst sayHello = () => console.log("Hello!");\n\n// ✅ Good — function declaration is hoisted\nsayHello(); // Hello!\nfunction sayHello() { console.log("Hello!"); }`,
    relatedErrors: ["js-cannot-read-properties-of-undefined", "js-cannot-access-before-initialization"]
  },
];
