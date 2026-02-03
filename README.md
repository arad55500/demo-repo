# Forge Construction — Static Website

A static, multi-page website for a construction company. Built with HTML, CSS, and vanilla JavaScript.

## Publish to GitHub Pages

### 1. Set your Git identity (one-time, if you haven’t already)

In a terminal:

```bash
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

Use the email and name tied to your GitHub account.

### 2. Create the first commit (repo is already initialized)

From this project folder:

```bash
cd "c:\Users\arad5\Documents\Projects\test website"

git add .
git commit -m "Initial commit: Forge Construction static site"
git branch -M main
```

### 3. Create a new repository on GitHub

- Go to [github.com/new](https://github.com/new).
- Pick a name (e.g. `forge-construction` or `test-website`).
- Leave it **empty** (no README, no .gitignore).
- Click **Create repository**.

### 4. Push to GitHub

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name, then run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 5. Turn on GitHub Pages

- In your repo: **Settings** → **Pages** (left sidebar).
- Under **Build and deployment**, set **Source** to **Deploy from a branch**.
- Under **Branch**, choose **main** and **/ (root)**.
- Click **Save**.

The site will be live in 1–2 minutes at:

**https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/**

---

The `.nojekyll` file in this repo tells GitHub Pages to serve the files as-is (no Jekyll processing), which is what you want for this static site.
