'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => {
    const pathMap = {
      '/dashboard': () => pathname === '/',
      '/dashboard/works': () => pathname.startsWith('/dashboard/works'),
      '/dashboard/questions': () => pathname.startsWith('/dashboard/questions'),
      '/dashboard/builders': () => pathname.startsWith('/dashboard/builders'),
      '/dashboard/leaderboard': () => pathname.startsWith('/dashboard/leaderboard'),
      '/dashboard/register': () => pathname.startsWith('/dashboard/register'),
    };

    return pathMap[path] ? pathMap[path]() : pathname.startsWith(path) && (pathname.length === path.length || pathname[path.length] === '/');
  };

  return (
    <div className="w-1/4 min-h-screen bg-white p-6 rounded-tr-lg rounded-tl-2xl flex flex-col justify-between border-r  ">
      {/* Logo */}
      <h1 className="text-3xl font-bold mb-8">Blockchain HQ</h1>

      {/* Menu */}
      <nav className="space-y-4">
        <Link href="/" className={`block text-gray-800 font-bold px-4 py-2 rounded-full ${isActive('/') ? 'bg-sckinCustom border border-black shadow-[0px_4px_0px rgba(0,0,0,1)]' : 'hover:bg-sckinCustom hover:shadow-[0px_4px_0px rgba(0,0,0,1)]'} transition hover:border border-black`}>
          Home
        </Link>
        <Link href="/dashboard/works" className={`block text-gray-800 font-bold px-4 py-2 rounded-full ${isActive('/dashboard/works') ? 'bg-greenCustom border border-black shadow-[0px_4px_0px rgba(0,0,0,1)]' : 'hover:bg-greenCustom hover:shadow-[0px_4px_0px rgba(0,0,0,1)]'} transition hover:border border-black`}>
          Gig & Works
        </Link>
        <Link href="/dashboard/escrow" className={`block text-gray-800 font-bold px-4 py-2 rounded-full ${isActive('/dashboard/escrow') ? 'bg-greenCustom border border-black shadow-[0px_4px_0px rgba(0,0,0,1)]' : 'hover:bg-greenCustom hover:shadow-[0px_4px_0px rgba(0,0,0,1)]'} transition hover:border border-black`}>
          Aggrements
        </Link>
        <Link href="/dashboard/myagreement" className={`block text-gray-800 font-bold px-4 py-2 rounded-full ${isActive('/dashboard/myagreement') ? 'bg-greenCustom border border-black shadow-[0px_4px_0px rgba(0,0,0,1)]' : 'hover:bg-greenCustom hover:shadow-[0px_4px_0px rgba(0,0,0,1)]'} transition hover:border border-black`}>
          My Aggrements
        </Link>
        <Link href="/dashboard/questions" className={`block text-gray-800 font-bold px-4 py-2 rounded-full ${isActive('/dashboard/questions') ? 'bg-yellowCustom border border-black shadow-[0px_4px_0px rgba(0,0,0,1)]' : 'hover:bg-yellowCustom '} transition hover:border border-black`}>
          Q & A
        </Link>
        <Link href="/dashboard/builders" className={`block text-gray-800 font-bold px-4 py-2 rounded-full ${isActive('/dashboard/builders') ? 'bg-blueCustom border border-black shadow-[0px_4px_0px rgba(0,0,0,1)]' : 'hover:bg-blueCustom hover:shadow-[0px_4px_0px rgba(0,0,0,1)]'} transition hover:border border-black`}>
          Builders Point
        </Link>
        <Link href="/dashboard/leaderboard" className={`block text-gray-800 font-bold px-4 py-2 rounded-full ${isActive('/dashboard/leaderboard') ? 'bg-white border border-black shadow-[0px_4px_0px rgba(0,0,0,1)]' : 'hover:bg-white hover:shadow-[0px_4px_0px rgba(0,0,0,1)]'} transition hover:border border-black`}>
          Leaderboard
        </Link>
        <Link href="/dashboard/register" className={`block text-gray-800 font-bold px-4 py-2 rounded-full ${isActive('/dashboard/register') ? 'bg-white border border-black shadow-[0px_4px_0px rgba(0,0,0,1)]' : 'hover:bg-white hover:shadow-[0px_4px_0px rgba(0,0,0,1)]'} transition hover:border border-black`}>
          Register
        </Link>
      </nav>

      {/* Footer */}
      <div className="mt-auto">

      </div>
    </div>
  );
}
