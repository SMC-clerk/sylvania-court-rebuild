---
description: How to install Node.js on macOS using nvm
---

1. Install nvm (Node Version Manager) by running the install script.
2. Activate nvm in your current shell.
3. Install the latest Long Term Support (LTS) version of Node.js.
4. Verify the installation.

```bash
# 1. Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 2. Activate nvm (you might need to restart your terminal after this, or run these lines)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 3. Install Node.js LTS
nvm install --lts

# 4. Verify
node -v
npm -v
```
