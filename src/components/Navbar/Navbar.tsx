import Link from "next/link";

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          StreamTube
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-button">
            Library
          </Link>
          <Link href="/upload" className="nav-button">
            Upload
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
