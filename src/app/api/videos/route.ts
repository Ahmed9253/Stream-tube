import { NextResponse, NextRequest } from "next/server";
import { getAllVideos, saveVideo } from "@/lib/video-storage";
import { Video } from "@/types/video";
import { v4 as uuidv4 } from "uuid";

//this will get video from the local storage
export async function GET() {
  try {
    return NextResponse.json({ videos: getAllVideos() });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "fail to fetch videos " },
      { status: 500 },
    );
  }
}

//this will save the video to the uers local storage
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const video: Video = {
      id: uuidv4(),
      title: body.title || "Untitled Video",
      discription: body.discription || "",
      filePath: body.filePath,
      fileName: body.fileName,
      thumbnailPath: body.thumbnailPath || "",
      duration: body.duration,
      createdAt: new Date().toISOString(),
      watermark: body.watermark,
    };
    return NextResponse.json({ video: saveVideo(video) }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to create video" },
      { status: 500 },
    );
  }
}
