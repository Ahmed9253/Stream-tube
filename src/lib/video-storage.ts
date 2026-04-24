//in this file system we are working with local storage of the pc or movbile
// and storing the videos or uploading...

import { Video } from "@/types/video";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "videos.json");

function readData(): { videos: Video[] } {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE))
    fs.writeFileSync(DATA_FILE, JSON.stringify({ videos: [] }, null, 2));
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeData(data: { videos: Video[] }): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function getAllVideos(): Video[] {
  return readData().videos || [];
}

export function getVideoById(id: string): Video | undefined {
  return readData().videos.find((v) => v.id === id);
}

export function saveVideo(video: Video): Video {
  const data = readData();
  data.videos.push(video);
  writeData(data);
  return video;
}
