# 🌙 تم تعبئة الكرش بنجاح — Ramadan Meme Generator

A fun, one-page Ramadan meme generator built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Click a button, get a random Ramadan meme, and share the laughs.

## ✨ Features

- 🎲 Random meme generation with one click
- 🌙 Beautiful Ramadan night-sky theme (glassmorphism, gradients, star particles)
- ⬇️ Download memes directly
- 📱 Fully responsive (mobile → tablet → desktop)
- 🔤 Arabic + English text support
- ⚡ Fast — static assets, no database, no external APIs

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | IBM Plex Sans Arabic, Inter, Poppins |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**

### Setup

```bash
git clone <repo-url>
cd ramadan-karsh
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## 🖼 Adding Meme Images

Drop your images into the `public/images/` directory:

```
public/images/
├── meme1.png
├── meme2.png
├── your-new-meme.jpg
└── ...
```

**Supported formats**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

The API picks a random image from this folder each time the button is clicked.

## 📡 API

### `GET /api/random-image`

Returns a random image from `public/images/` with proper `Content-Type` headers and cache-busting.

| Status | Response |
|--------|----------|
| 200 | Binary image data |
| 404 | `{ "error": "No images found" }` |
| 500 | `{ "error": "Internal server error" }` |

## 🚢 Deploy to Vercel

1. Push the repo to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Deploy — that's it!

No environment variables required.

## 📄 License

MIT
