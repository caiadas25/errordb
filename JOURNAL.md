## Sprint A (Round 36) -- July 2, 2026 (Growth Sprint)
### What was done
- Added 2 high-volume errors:
  - docker-permission-denied: "Got permission denied while trying to connect to the Docker daemon socket"
    - Causes: user not in docker group, wrong socket permissions, Docker not running
    - Solutions: add user to docker group, run with sudo, fix socket permissions
  - python-connectionrefused-errno-111: "ConnectionRefusedError: [Errno 111] Connection refused"
    - Causes: server not running, wrong port, interface binding, firewall blocking
    - Solutions: verify server running, check port, check firewall, retry with backoff
- Total: 230 errors (was 228)

### Keywords targeted
- "Docker permission denied while trying to connect to the Docker daemon socket" (new error page — very high volume)
- "ConnectionRefusedError Errno 111 Connection refused Python" (new error page — very high volume)

### SEO fixes
- Auto-generated sitemap includes new error pages
- Cross-linked related errors

---

## Sprint A (Round 35) -- July 1, 2026 (Growth Sprint)
### What was done
- Added 2 high-volume errors:
  - python-typeerror-unsupported-operand: "TypeError: unsupported operand type(s) for +: 'int' and 'str'"
    - Causes: type mismatch, input() returns string, forgot casting
    - Solutions: type conversion, f-strings, isinstance checks
  - node-module-not-found: "Error: Cannot find module 'express'"
    - Causes: forgot npm install, corrupted node_modules, typo
    - Solutions: npm install, reinstall, check package.json
- Total: 228 errors (was 226)

### Keywords targeted
- "TypeError unsupported operand type(s) for + int and str Python" (new error page — very high volume)
- "Cannot find module express Node.js" (new error page — very high volume)

### SEO fixes
- Auto-generated sitemap includes new error pages
- Cross-linked related errors
