import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images");

    // Check if directory exists
    try {
      await fs.access(imagesDir);
    } catch {
      console.error(`Images directory not found at: ${imagesDir}`);
      return NextResponse.json(
        { error: "No images directory found" },
        { status: 404 }
      );
    }

    const files = (await fs.readdir(imagesDir)).filter((file) =>
      SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase())
    );

    if (files.length === 0) {
      console.warn(`No supported images found in: ${imagesDir}`);
      return NextResponse.json(
        { error: "No images found" },
        { status: 404 }
      );
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(imagesDir, randomFile);
    
    // Read file asynchronously
    const buffer = await fs.readFile(filePath);
    
    const ext = path.extname(randomFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Error serving random image:", error);
    // Return actual error message for debugging
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
