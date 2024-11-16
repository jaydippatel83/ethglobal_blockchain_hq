import CapsuleWallet from "../Capsule/Wallet";

export default function Header() {
    return (
      <div className="flex justify-between items-center p-4">
        {/* Search */}
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-1/2">
          <input
            type="text"
            placeholder="Search anything"
            className="bg-transparent w-full outline-none"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm5 8a5 5 0 11-10 0 5 5 0 0110 0z" />
            </svg>
          </button>
        </div>
        
        {/* User Info */}
        <div className="flex items-center gap-4">
           <CapsuleWallet/>
        </div>
      </div>
    );
  }
  