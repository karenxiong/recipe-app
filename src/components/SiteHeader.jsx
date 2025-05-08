import Link from "next/link";

function SiteHeader() {
  return (
    <header className="relative border-b border-gray-100">
      <div className="container relative mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-center py-4">
          <Link
            href="/"
            className="text-3xl font-serif italic tracking-wide text-coral"
          >
            recipes
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader; 