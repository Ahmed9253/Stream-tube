//this file is defining the type of video which will be played on app...
//just like the schema of a model...

export interface Video {
  id: string;
  title: string;
  discription: string;
  filePath: string;
  fileName: string;
  thumbnailPath?: string;
  duration?: number;
  createdAt: string;
  watermark?: WatermarkConfig;
  quality?: number;
  format?: "auto" | "mp4" | "webm";
}

export interface WatermarkConfig {
  imagePath: string;
  position: "top_left" | "top_right" | "bottom_left" | "bottom_right";
  opacity?: number;
  width?: number;
}
