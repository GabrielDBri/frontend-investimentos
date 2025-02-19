import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full p-4 bg-gray-900 text-white shadow-md flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold tracking-wide">API de Investimentos</h1>
      <ul className="flex gap-6 text-lg">
        <li>
          <Link href="/" className="hover:text-gray-300 transition duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link href="/investments/investiment-list" className="hover:text-gray-300 transition duration-200">
            Listar
          </Link>
        </li>
      </ul>
    </nav>
  );
}
