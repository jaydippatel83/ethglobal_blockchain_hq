 
import Header from "@/components/header/Header";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }) => { 
    return (
        <div className="flex w-full md:w-[1100px] border border-gray-300 rounded-custom mx-auto shadow-lg">
            <Sidebar />
            <div className="flex-grow p-6 bg-sckinCustom rounded-tr-2xl">
                <Header />
                {children} 
            </div>
        </div>
    );
};

export default DashboardLayout;
