"use client";
import { useState } from "react";
import { Video, buildSrc, Transformation } from "@imagekit/next";
import { Video as VideoType } from "@/types/video";

interface VideoPlayerProps {
  video: VideoType;
  urlEndpoint: string;
}

const strip = (p: string) => (p.startsWith("/") ? p.slice(1) : p);
const MIN_Q = 1;
const MAX_Q = 100;

function VideoPlayer({ video, urlEndpoint }: VideoPlayerProps) {
  const [quality, setQuality] = useState(video.quality ?? 50);
  const transformation: Transformation[] = [
    { quality },
    ...(video.format ? [{ format: video.format }] : []),
    ...(video.watermark
      ? [
          {
            overlay: {
              type: "image" as const,
              input: strip(video.watermark.imagePath),
              position: { focus: video.watermark.position || "bottom_right" },
              transformation: [{ width: video.watermark.width || 120 }],
            },
          },
        ]
      : []),
  ];

  const thumbSrc = video.thumbnailPath || `${video.filePath}/ik-thumbnail.jpg`;
  const posterUrl = buildSrc({
    urlEndpoint,
    src: thumbSrc,
    transformation: [{ width: 1920, height: 1080 }],
  });

  const onQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = e.target.valueAsNumber;
    if (!Number.isNaN(n))
      setQuality(Math.min(MAX_Q, Math.max(MIN_Q, Math.round(n))));
  };
  return (
    <div className="simple-player">
      <Video
        key={quality}
        urlEndpoint={urlEndpoint}
        src={video.filePath}
        transformation={transformation}
        poster={posterUrl}
        controls
        playinline
        preload="metadata"
        className="simple-player-video"
      />
      <div className="simple-player-controls">
        <label className="simple-player-quality-label" htmlFor="quality-input">
          Quality
        </label>
        <input
          id="quality-input"
          type="number"
          min={MIN_Q}
          max={MAX_Q}
          value={quality}
          className="simple-player-quality-input"
          onChange={onQualityChange}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
