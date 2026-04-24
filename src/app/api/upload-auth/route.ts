//this is the route of storing and uploading the videos to
//imagekit.io

import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;

    if (!privateKey || !publicKey) {
      return NextResponse.json(
        { error: "ImageKit credentials are not set" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      ...getUploadAuthParams({ privateKey, publicKey }),
      publicKey,
    });
  } catch (err) {
    console.error("Error in upload-auth route", err);
    return NextResponse.json({ error: "Failed to generate credentials" });
  }
}
