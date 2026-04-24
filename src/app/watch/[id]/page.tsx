import { notFound } from "next/navigation";
import { getVideoById } from "@/lib/video-storage";
import VideoPlayer from "@/components/video/player/VideoPlayer";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const video = getVideoById(id);
  if (!video) return notFound();
  return (
    <div className="watch-page">
      <Link href="/" className="back-link">
        Back To Library
      </Link>
      <div className="video-container">
        <VideoPlayer
          video={video}
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL!}
        />
      </div>
      <div className="video-meta">
        <h1 className="video-title">{video.title}</h1>
        {video.discription && (
          <p className="video-description">{video.discription}</p>
        )}
      </div>
    </div>
  );
}
