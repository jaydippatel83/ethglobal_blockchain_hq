import Link from 'next/link';
import CapsuleWallet from '../Capsule/Wallet';

export default function Navbar() {
    return (
        <header className="bg-primaryBlue shadow-sm border-b">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-white">
                    BLOCKCHAIN HQ
                </Link>
                <div className="flex items-center space-x-6">
                    <Link href="/" className="text-white px-4 py-2 rounded-lg font-semibold hover:text-gray-600">
                        Home
                    </Link>
                    <Link href="/questions" className="text-white px-4 py-2 rounded-lg font-semibold hover:text-gray-600">
                        Q & A
                    </Link>
                    <Link href="/profile" className="text-white px-4 py-2 rounded-lg font-semibold hover:text-gray-600">
                        Profile
                    </Link>
                    <CapsuleWallet />
                </div>
            </div>
        </header>
    );
}
