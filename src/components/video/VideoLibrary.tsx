"use client";

import { Image } from "@imagekit/next";
import { Video } from "@/types/video";
import Link from "next/link";

interface Props {
  videos: Video[];
}

function VideoLibrary({ videos }: Props) {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL || "";
  if (videos.length === 0) {
    return (
      <div className="library-empty">
        <p className="library-empty-text">No Videos Yet</p>
        <Link href="/upload" className="library-upload-button">
          Upload Video
        </Link>
      </div>
    );
  }
  return (
    <div className="library-grid">
      {videos.map((video) => (
        <Link key={video.id} href={`/watch/${video.id}`} className="library-card-link">
          <div className="thumbnail-card">
            <Image
              urlEndpoint={urlEndpoint}
              alt={video.title}
              src={video.thumbnailPath || `${video.filePath}/ik-thumbnail.jpg`}
              height={320}
              width={180}
              className="thumbnail-image"
              transformation={[{ width: 320, height: 180 }]}
            />
          </div>
          <div className="thumbnail-info">
            <h3 className="thumbnail-title">{video.title}</h3>
            <p className="thumbnail-date">
              {new Date(video.createdAt).toISOString().split("T")[0]}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default VideoLibrary;
