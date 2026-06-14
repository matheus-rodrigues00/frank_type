# Frank Type

A small Rails 8 + Hotwire + Stimulus typing trainer inspired by monkeytype, but using normalized public-domain prose instead of random word bags.

## What is in the first version

- Rails-rendered pages with Tailwind CSS, Turbo, and Stimulus.
- A responsive typing room with 15s, 30s, and 60s sessions.
- Accurate browser-side key timing using `performance.now()`.
- Per-session metrics: WPM, raw WPM, accuracy, mistakes, character timings, word timings, and full key event history.
- No authentication. Completed session data is stored in local storage.
- A local profile page with WPM and accuracy trend charts.
- Public-domain excerpt attribution and a future-friendly normalization service.

## Development

```bash
bin/setup
bin/dev
```

Open <http://localhost:3000>.

## Tests

```bash
bin/rails test
npm test
bin/rails tailwindcss:build
```

`bin/ci` runs Rails tests, JavaScript unit tests, RuboCop, Brakeman, bundler-audit, and importmap audit.

## Public-domain corpus strategy

Use Project Gutenberg as the canonical source, but do not scrape its human-facing pages. Ingestion should use official feeds, robot harvest URLs, rsync mirrors, or Gutendex metadata. Store title, author, ebook id, source URL, copyright flag, and attribution with every excerpt.

Current seed excerpts are attributed public-domain passages and normalized into lowercase alphanumeric word streams.

## Docker

Local production-style container:

```bash
docker compose up --build
```

Then open <http://localhost:3200>.

Build and push the Docker Hub image when ready:

```bash
docker build -t akitaonrails/frank_type:latest .
docker push akitaonrails/frank_type:latest
```

If Docker Hub credentials are needed, source your local secret file in the shell that performs `docker login`; do not commit secrets.

## Homeserver deploy

This follows the `frank_mega` compose pattern:

1. Build/push `akitaonrails/frank_type:latest`.
2. Copy `docker-compose.prod.yml` and a real `.env.production` to the homeserver.
3. Create `/var/opt/docker/frank_type/storage` on the host.
4. Run:

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

The container exposes Rails through Thruster on host port `3200`.
