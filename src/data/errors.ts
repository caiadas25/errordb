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
    id: "js Assignment to constant",
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
      "Add `\"type\": \"module\"` to package.json and use import",
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
    relatedErrors: ["react-hooks-deps"]
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
    relatedErrors: ["react-invalid-hook-call"]
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
    relatedErrors: []
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
    relatedErrors: []
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
    relatedErrors: ["rust-borrow-checker"]
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
    relatedErrors: ["rust-cannot-move"]
  },
  // Java ===
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
    relatedErrors: ["js-cannot-read-properties-of-undefined"]
  },
  // Additional JavaScript ===
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
  // Additional Python ===
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
  // === Docker additional ===
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
  // === TypeScript specific ===
  {
    id: "ts-type-not-assignable",
    errorMessage: "Type 'string' is not assignable to type 'number'",
    language: "TypeScript",
    category: "Type Error",
    explanation: "TypeScript detected a type mismatch at compile time. The value's type doesn't match the expected type.",
    causes: [
      "Function parameter received wrong type",
      "Variable type annotation doesn't match assigned value",
      "Return type doesn't match declared type",
      "Object shape doesn't match interface"
    ],
    solutions: [
      "Fix the type mismatch at the source",
      "Use type assertions if you're sure: `value as number`",
      "Update the type annotation to match the actual type",
      "Add runtime validation"
    ],
    relatedErrors: ["py-type-error"]
  },
  {
    id: "ts-property-does-not-exist",
    errorMessage: "Property 'foo' does not exist on type 'Bar'",
    language: "TypeScript",
    category: "Type Error",
    explanation: "You're accessing a property that TypeScript doesn't know exists on the given type. This is a compile-time error.",
    causes: [
      "Property not defined in the type/interface",
      "Typo in property name",
      "Union type doesn't include that property",
      "Object doesn't match the expected interface"
    ],
    solutions: [
      "Add the property to the type/interface",
      "Use optional chaining: `obj?.foo`",
      "Use type narrowing before access",
      "Check if the property is on a different type in the union"
    ],
    relatedErrors: ["ts-type-not-assignable"]
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
];
