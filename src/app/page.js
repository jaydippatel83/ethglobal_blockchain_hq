import CapsuleWallet from "@/components/Capsule/Wallet";
import Creators from "@/components/Creators";
import Layout from "@/components/Layout";
import Image from "next/image";


// export default function Home() {
//   return (
//     <Layout>
//       <Creators />
//     </Layout>
//   );
// }

export default function Home() {
  return (
    <div className="flex justify-center  min-h-screen">
      <div className="w-full  bg-sckinCustom p-6 ">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white border border-gray-300 rounded-custom p-3 mb-6 sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Blockchain HQ</h1>
          <CapsuleWallet />
        </div>

        <div className="mx-auto py-10 text-center md:py-20">
          <h1 className="text-5xl md:text-8xl font-bebas font-semibold">The Super App for Web3 Builders</h1>
        </div>

        {/* Balance Cards Section */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-300 rounded-custom p-6 flex justify-between items-center">
            <div>
              <p className="text-lg">Card balance</p>
              <h2 className="text-2xl font-bold">$4,023.20</h2>
            </div>
            <button className="bg-greenCustom text-black px-4 py-2 rounded-md shadow hover:opacity-90">
              Top up
            </button>
          </div>
          <div className="bg-white border border-gray-300 rounded-custom p-6 flex justify-between items-center">
            <div>
              <p className="text-lg">Card balance</p>
              <h2 className="text-2xl font-bold">$2,500.00</h2>
            </div>
            <button className="bg-greenCustom text-black px-4 py-2 rounded-md shadow hover:opacity-90">
              Top up
            </button>
          </div>
          <div className="bg-white border border-gray-300 rounded-custom p-6 flex justify-between items-center">
            <div>
              <p className="text-lg">Card balance</p>
              <h2 className="text-2xl font-bold">$1,750.00</h2>
            </div>
            <button className="bg-greenCustom text-black px-4 py-2 rounded-md shadow hover:opacity-90">
              Top up
            </button>
          </div>
          <div className="bg-white border border-gray-300 rounded-custom p-6 flex justify-between items-center">
            <div>
              <p className="text-lg">Card balance</p>
              <h2 className="text-2xl font-bold">$3,100.00</h2>
            </div>
            <button className="bg-greenCustom text-black px-4 py-2 rounded-md shadow hover:opacity-90">
              Top up
            </button>
          </div>
        </div> */}

        <div className="grid grid-cols-3 gap-4 mx-auto justify-items-center">
          <div className="flex flex-col items-center bg-yellowCustom border border-gray-300 rounded-lg shadow-lg p-8 w-80 ">
            {/* Icon or Image */}
            <Image
              width={300}
              height={300}
              src="/assets/gig-economy.png"
              alt="gig-economy"
              className="h-24 w-24 object-contain"
            />
 
            <button className="mt-4 font-bold text-lg bg-white border border-black px-6 py-2 rounded-full shadow-md hover:bg-gray-100 ">
            Gigs & Work
            </button>
          </div>


          <div className="flex flex-col items-center bg-greenCustom border border-gray-300 rounded-lg shadow p-8 w-80 ">
            <Image width={300} height={300} src="/assets/question.png" alt="q&a" className="h-24 w-24" />
            <button className="mt-4 font-bold text-lg bg-white border border-black px-6 py-2 rounded-full shadow-md hover:bg-gray-100 ">
            Q & A
            </button>
          </div>


          <div className="flex flex-col items-center bg-pinkCustom border border-gray-300 rounded-lg shadow p-8 w-80 ">
            <Image width={300} height={300} src="/assets/teamwork.png" alt="Teamwork" className="h-24 w-24" />
            <button className="mt-4 font-bold text-lg bg-white border border-black px-6 py-2 rounded-full shadow-md hover:bg-gray-100 ">
            Builders Point
            </button>
          </div>
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
}

