import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  const tools = [
    { name: "Platform One", url: "https://example.com" },
    { name: "SaaS Tool Two", url: "https://example.com" },
    { name: "App Three", url: "https://example.com" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="w-full max-w-4xl text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">Klyro Hub</h1>
        <p className="text-gray-500 mt-2">
          A modern hub for all your platforms and SaaS tools
        </p>
      </header>

      {/* Tool Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
        {tools.map((tool, idx) => (
          <a
            key={idx}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white shadow rounded-2xl text-center hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{tool.name}</h2>
          </a>
        ))}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center py-8 mt-12 border-t">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Klyro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
