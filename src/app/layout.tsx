import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/library.css";
import "@/styles/upload.css";
import "@/styles/watch.css";
import Navbar from "@/components/Navbar/Navbar";
import { ImageKitProvider } from "@imagekit/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL}>
          <Navbar />
          <main className="main">{children}</main>
        </ImageKitProvider>
      </body>
    </html>
  );
}
