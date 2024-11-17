import AgreementApp from "@/components/AgreementApp";
import CapsuleWallet from "@/components/Capsule/Wallet";
import LandingCards from "@/components/landing/LandingCards";
import QuestionsCardComponents from "@/components/landing/QuestionsCardComponents";
import WorksCardComponents from "@/components/landing/WorksCardComponents";
import QuestionsCards from "@/components/landing/WorksCardComponents";



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
        <LandingCards />
        <div className="mx-auto py-10 text-center md:py-20">
          <WorksCardComponents />
        </div>
        <div className="mx-auto  text-center mb-10">
          <QuestionsCardComponents />
        </div>
      </div>
    </div>
  );
}

