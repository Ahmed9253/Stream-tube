"use client";

import { useState } from "react";
import { upload } from "@imagekit/next";
import { useRouter } from "next/navigation";

function VideoUpload() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", discription: "" });
  const [files, setFiles] = useState<Record<string, File | null>>({
    video: null,
    thumbnail: null,
    watermark: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File, folder: string) => {
    const auth = await fetch("/api/upload-auth").then((r) => r.json());
    return upload({ file, fileName: file.name, folder, ...auth });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.video) return;
    setLoading(true);
    setError("");
    try {
      const [videoRes, thumbRes, wmRes] = await Promise.all([
        uploadFile(files.video, "/videos"),
        files.thumbnail ? uploadFile(files.thumbnail, "/thumbnail") : null,
        files.watermark ? uploadFile(files.watermark, "/watermark") : null,
      ]);
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          discription: form.discription,
          filePath: videoRes.filePath || "",
          fileName: videoRes.name || files.video.name,
          thumbnailPath: thumbRes?.filePath || "",
          watermark: wmRes
            ? {
                imagePath: wmRes.filePath || "",
                position: "bottom-right",
                opacity: 0.7,
                width: 120,
              }
            : undefined,
        }),
      });

      if (!res.ok) throw new Error("failed to save");
      const { video } = await res.json();
      router.push(`/watch/${video.id}`);
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : "Upload failed");
      setLoading(false);
    }
  };

  const setFile = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles((f) => ({ ...f, [key]: e.target.files?.[0] || null }));
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      {error && <div className="upload-error">{error}</div>}
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="form-input"
          placeholder="Video Title"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Discription</label>
        <input
          type="text"
          value={form.discription}
          onChange={(e) =>
            setForm((f) => ({ ...f, discription: e.target.value }))
          }
          className="form-input"
          placeholder="Video Discription"
        />
      </div>
      <div className="form-group">
        <label className="form-label">Video FIle *</label>
        <input type="file" accept="video/*" onChange={setFile("video")} />
      </div>
      <div className="form-group">
        <label className="form-label">Thumbnail File</label>
        <input type="file" accept="image/*" onChange={setFile("thumbnail")} />
      </div>
      <div className="form-group">
        <label className="form-label">Watermark fIle (optional)</label>
        <input type="file" accept="image/*" onChange={setFile("watermark")} />
      </div>
      <button
        type="submit"
        disabled={loading || !files.video}
        className="submit-button"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}

export default VideoUpload;
