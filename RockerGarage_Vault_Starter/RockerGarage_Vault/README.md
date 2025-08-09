# Rocker Garage – Master Vault

This repository is the **single source of truth** for the Rocker Garage project.

## Structure
```
/avatars           # Final PNG/WebP avatar assets (Axe, Nyxx, Torque)
/voice             # MP3/OGG voice lines (intro, teasers)
/visuals           # Promo art, backgrounds (Mustang), banners
/site/             # Site build (HTML/CSS/JS) – starter included
/docs              # Tracker, logs, specs
/drops             # Dated ZIP snapshots (mirrors uploaded to Dropbox)
```

## Daily Workflow (reliable — no sandbox losses)
1) Add/replace files **inside this repo** (drag/drop on GitHub is fine).
2) Commit with a clear message (e.g., `feat: add Nyxx intro v2`).
3) Create a dated ZIP in `/drops/` for off-site backup (Dropbox).
4) Update `docs/RG_SyncLog.txt` with a 1–2 line note of what changed.

> Tip: Keep only **final** assets in `/avatars` and `/visuals`. Move experiments to `/docs/Archive` or your “Sandbox” folder outside the repo.

## One-Time Setup for Team
- Repo visibility: **Private**
- Add collaborators in GitHub → Settings → Collaborators
- Branch protection (optional): protect `main` from force-pushes

## Commands (optional, if using Git locally)
```bash
git clone https://github.com/<ORG_OR_USER>/rocker-garage-master.git
cd rocker-garage-master
git add .
git commit -m "chore: initialize vault"
git push origin main
```
