import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Klyro
        </Link>

        {/* Links */}
        <div className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/ads" className="text-gray-700 hover:text-blue-600">
            Ads
          </Link>
        </div>
      </div>
    </nav>
  );
  }
