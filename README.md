# StreamTube (Online Video Player + Uploads)

A **Next.js online video site** where you can **upload videos** and then **play them in the in-app player**. Optional **thumbnail** + **watermark** uploads are supported, and media delivery/playback is powered by **ImageKit**.

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + ImageKit + local JSON metadata in `data/videos.json` (a simple demo “database”).

## Features

- Browse a **video library** on the home page
- **Upload** a video (required) and optional **thumbnail** + **watermark**
- **Watch** a video on `/watch/[id]`
- Player includes an adjustable **quality** input (1–100) and optional watermark transform when configured
- **Persist video metadata** locally in `data/videos.json`

## Project structure (where things live)

- `src/app/page.tsx` — home library
- `src/app/upload/page.tsx` — upload UI
- `src/app/watch/[id]/page.tsx` — watch page
- `src/components/video/*` — library, upload, player UI
- `src/app/api/*` — JSON API routes + ImageKit upload auth
- `src/lib/video-storage.ts` — read/write `data/videos.json`
- `data/videos.json` — local video metadata

## Environment variables

Copy `.env.example` to `.env` and fill in your values:

- **Never commit real secrets.**
- If keys were ever shared publicly, **rotate** them in the ImageKit dashboard.

### Required

```env
# Public ImageKit base URL (safe to expose to the browser)
NEXT_PUBLIC_IMAGEKIT_URL=https://ik.imagekit.io/<your_imagekit_id>

# Server-only ImageKit API keys
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxx
```

### How they’re used in this app

- `NEXT_PUBLIC_IMAGEKIT_URL` is used for ImageKit image/video components (library + player) via `ImageKitProvider` in `src/app/layout.tsx`, and the watch page passes the endpoint into the player.
- `IMAGEKIT_PUBLIC_KEY` + `IMAGEKIT_PRIVATE_KEY` are used only on the server in `src/app/api/upload-auth/route.ts` to generate **temporary upload authentication** for the browser uploader in `src/components/video/VideoUpload.tsx`.

**Note:** You can also use Next.js `.env.local` for local development secrets, but the repo is commonly configured with a root `.env` file.

## Run locally

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Open `http://localhost:3000`.

### Build + start (production)

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## API routes (reference)

- `GET /api/videos` — list videos
- `POST /api/videos` — create video metadata
- `GET /api/videos/[id]` — fetch a video
- `GET /api/upload-auth` — ImageKit upload auth parameters

## Notes / limitations

- Metadata is **local file storage** (`data/videos.json`), not a real database
- There is no authentication / per-user video ownership in this version

## Disclaimer

This project is provided **as-is**. You may use, copy, modify, or deploy it according to the terms of this repository’s **license** (if one is present) and applicable law.

**The author(s) and contributors accept no responsibility** for how this software is used by anyone, anywhere—including commercial, personal, educational, or any other use.

**You are solely responsible** for your deployment, your content, your users, and for complying with all laws and regulations that apply to you (including copyright, privacy, data protection, and rules against illegal or harmful activity). **No warranty** is given that this project is fit for any particular purpose, secure, or free of defects.

If you use this project in a way that is **illegal, unethical, or harmful**, that is entirely **your responsibility**—not the author’s.

This software if free to use with no license but the above two lines are to be **kept in notice**

## Deploy

This is a standard Next.js app. See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Boilerplate

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
