import VideoLibrary from "@/components/video/VideoLibrary";
import { getAllVideos } from "@/lib/video-storage";
import Link from "next/link";

export default function Home() {
  const videos = getAllVideos();
  return (
    <>
      <section className="home-hero" aria-label="StreamTube home">
        <p className="home-eyebrow">StreamTube</p>
        <h1 className="home-title">Your personal streaming hub</h1>
        <p className="home-description">
          Upload your videos, pick thumbnails, and play everything in a clean
          player—built for browsing like a real streaming service. No clutter,
          just your library, ready whenever you are.
        </p>
        <div className="home-hero-actions">
          <Link href="/upload" className="home-cta home-cta--primary">
            Upload a video
          </Link>
          <a href="#library" className="home-cta home-cta--secondary">
            Browse the library
          </a>
        </div>
      </section>

      <h2 className="section-heading" id="library">
        Library
      </h2>
      <p className="section-lead">Everything you&apos;ve added—click a title to start watching.</p>
      <VideoLibrary videos={videos} />
    </>
  );
}
