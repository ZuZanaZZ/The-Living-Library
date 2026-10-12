# The Living Library

A small web app for keeping a personal plant collection: browse plants, add new ones with a photo, and move plants to the graveyard when they die.

Your collection is stored in **your browser** (`localStorage`), so there is no server and each visitor has their own private collection. Clearing site data resets it to the sample plants.

## Run locally

```
npm install
npm run dev
```

## Deploy

Push to `main`. In the GitHub repo, set **Settings → Pages → Source** to **GitHub Actions**; `.github/workflows/deploy.yml` builds and publishes the site.
