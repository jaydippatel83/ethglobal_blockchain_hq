import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-retroGray w-1/5 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-retroBlack mb-8">BLOCKCHAIN HQ</h1>
      <nav className="space-y-4">
        <Link href="/" className="block text-retroBlack font-semibold hover:text-retroOrange">
         Home
        </Link>
        <Link href="/questions" className="block text-retroBlack font-semibold hover:text-retroOrange">
          Q & A
        </Link>
        <Link href="/profile" className="block text-retroBlack font-semibold hover:text-retroOrange">
          Profile
        </Link> 
      </nav>
      <button className="mt-10 bg-retroOrange text-white font-bold py-2 px-4 rounded-lg shadow-lg">
        Log Out
      </button>
    </aside>
  );
}
