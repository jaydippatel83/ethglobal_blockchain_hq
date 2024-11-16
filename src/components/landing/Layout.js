import React from 'react';
import CapsuleWallet from '../Capsule/Wallet';

const Layout = () => {
    return (
        <div className="flex justify-center  min-h-screen">
        <div className="w-full  bg-sckinCustom p-6 ">
          {/* Header Section */}
          <div className="flex justify-between items-center bg-white border border-gray-300 rounded-custom p-3 mb-6">
            <h1 className="text-2xl font-bold">BLOCKCHAIN HQ</h1> 
            <CapsuleWallet/>
          </div>
  
          {/* Balance Card */}
          <div className="bg-white border border-gray-300 rounded-custom p-6 flex justify-between items-center mb-6">
            <div>
              <p className="text-lg">Card balance</p>
              <h2 className="text-2xl font-bold">$4,023.20</h2>
            </div>
            <button className="bg-greenCustom text-black px-4 py-2 rounded-md shadow hover:opacity-90">
              Top up
            </button>
          </div>
  
          {/* Services Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Choose services</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pinkCustom text-center py-4 rounded-custom text-black font-bold cursor-pointer">
                Car
              </div>
              <div className="bg-yellowCustom text-center py-4 rounded-custom text-black font-bold cursor-pointer">
                Motorbike
              </div>
              <div className="bg-blueCustom text-center py-4 rounded-custom text-black font-bold cursor-pointer">
                Delivery
              </div>
              <div className="bg-greenCustom text-center py-4 rounded-custom text-black font-bold cursor-pointer">
                Other
              </div>
            </div>
          </div>
  
          {/* Last Trips Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Your last trips</h3>
            <div className="bg-yellowCustom border border-gray-300 rounded-custom p-4 mb-4">
              <p>Ride to Central Berkeley</p>
              <p className="text-sm text-gray-600">August 7, 2023</p>
              <h4 className="text-lg font-bold">$14.00</h4>
            </div>
            <div className="bg-yellowCustom border border-gray-300 rounded-custom p-4">
              <p>Ride to Thousand Oaks</p>
              <p className="text-sm text-gray-600">August 5, 2023</p>
              <h4 className="text-lg font-bold">$20.00</h4>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Layout;