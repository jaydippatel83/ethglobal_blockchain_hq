import Card from "@/components/dashboard/Card";
import Header from "@/components/header/Header";
import Sidebar from "@/components/Sidebar";
import { generateAvatar } from "@/lib/generateAvatar";

 

export default function Dashboard() {
    const recentSearch = [
        {
          title: "Daily Practices Drawing",
          image: generateAvatar("/assets/drawing.png"),
          price: 40,
          tag: "Featured",
          author: "Lyndsey Tierney",
        },
        {
          title: "The Power of Procreate",
          image: generateAvatar("/assets/procreate.png"),
          price: 45,
          tag: "New",
          author: "Brooks Harwood",
        },
        {
          title: "Expressive Sketching",
          image: generateAvatar("/assets/sketching.png"),
          price: 35,
          tag: "",
          author: "Hilario Boyer",
        },
      ];

  const popularClass = [
    { title: "Lunacy Design Class", image: generateAvatar("/lunacy.png"), price: 50, tag: "Featured" },
    { title: "Digital Art for Print", image: generateAvatar("/digitalart.png"), price: 30, tag: "" },
  ];

  return (
    <div className="flex w-full md:w-[1100px]  border border-gray-300 rounded-custom mx-auto  shadow-lg "> 
      <Sidebar />  
      <div className="flex-grow p-6 bg-sckinCustom rounded-tr-2xl">
        <Header />

        {/* Recent Search */}
        <section className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Recent Search</h2>
          <a href="#" className="text-sm text-blue-500">
            See all
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {recentSearch.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </section>

        {/* Popular Class */}
        <section>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Popular Class</h2>
          <a href="#" className="text-sm text-blue-500">
            See all
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {popularClass.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
