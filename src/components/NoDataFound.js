import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

 

const NoDataFound = ({ label }) => {
  return (
    <div className="h-auto flex flex-col items-center justify-center py-32  sm:space-y-3 px-4">
    <ExclamationCircleIcon className="w-12 h-12 text-gray-700" />
    <p className="text-lg sm:text-xl font-semibold text-gray-700">No {label} Data Available</p> 
  </div>
  );
};

export default NoDataFound;