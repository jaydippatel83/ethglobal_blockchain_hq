import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-1/4 min-h-screen bg-white p-6 rounded-tr-lg rounded-tl-2xl flex flex-col justify-between border-r  ">
      {/* Logo */}
      <h1 className="text-3xl font-bold mb-8">Blockchain HQ</h1>

      {/* Menu */}
      <nav className="space-y-4">
        <Link href="/" className="block text-gray-800 font-bold px-4 py-2 rounded-full hover:bg-sckinCustom  transition hover:border border-black hover:shadow-[0px_4px_0px_rgba(0,0,0,1)] ">
          Home
        </Link>
        <Link href="/works" className="block text-gray-800 font-bold px-4 py-2 rounded-full hover:bg-greenCustom  transition hover:border border-black hover:shadow-[0px_4px_0px_rgba(0,0,0,1)] ">
          Gig & Works
        </Link>
        <Link href="/questions" className="block text-gray-800 font-bold px-4 py-2 rounded-full hover:bg-yellowCustom  transition hover:border border-black hover:shadow-[0px_4px_0px_rgba(0,0,0,1)] ">
          Q & A
        </Link>
        <Link href="/builders" className="block text-gray-800 font-bold px-4 py-2 rounded-full hover:bg-blueCustom  transition hover:border border-black hover:shadow-[0px_4px_0px_rgba(0,0,0,1)] ">
          Builders Point
        </Link> 
        <Link href="/leaderboard" className="block text-gray-800 font-bold px-4 py-2 rounded-full hover:bg-white  transition hover:border border-black hover:shadow-[0px_4px_0px_rgba(0,0,0,1)] ">
         Leaderboard
        </Link> 
      </nav>

      {/* Footer */}
      <div className="mt-auto">
         
      </div>
    </div>
  );
}
