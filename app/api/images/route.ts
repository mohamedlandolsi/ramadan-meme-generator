import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");

    try {
      await fs.access(imagesDir);
    } catch {
      return NextResponse.json(
        { images: [], total: 0, error: "No images directory found" },
        { status: 404 }
      );
    }

    const allFiles = await fs.readdir(imagesDir);
    const images = allFiles
      .filter((file) =>
        SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b))
      .map((filename) => ({
        filename,
        url: `/images/${encodeURIComponent(filename)}`,
      }));

    return NextResponse.json(
      { images, total: images.length },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error listing images:", message);
    return NextResponse.json(
      { images: [], total: 0, error: "Internal server error", details: message },
      { status: 500 }
    );
  }
}
