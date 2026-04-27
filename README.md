# SARVADHARANI_SEEDS

## GitHub connection troubleshooting

If you see errors like **"cannot connect to GitHub repository"** or **"no configured push destination"**, verify your Git remote and authentication.

### 1) Check current remote

```bash
git remote -v
```

If nothing is returned, add your GitHub repository remote.

### 2) Add repository remote

```bash
git remote add origin https://github.com/<your-org-or-user>/<your-repo>.git
```

Or if SSH is preferred:

```bash
git remote add origin git@github.com:<your-org-or-user>/<your-repo>.git
```

### 3) Verify branch and push

```bash
git branch --show-current
git push -u origin <your-branch>
```

### 4) If using HTTPS and prompted repeatedly

Use a GitHub Personal Access Token (PAT) with repo permissions as the password.

### 5) If using SSH and access is denied

Create and add an SSH key:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub
```

Add the public key to GitHub → **Settings → SSH and GPG keys**, then test:

```bash
ssh -T git@github.com
```

### 6) Corporate network/firewall issues

If GitHub is blocked on your network, try a different network or configure your proxy:

```bash
git config --global http.proxy http://<proxy-host>:<proxy-port>
git config --global https.proxy http://<proxy-host>:<proxy-port>
```

To unset proxy settings later:

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```
