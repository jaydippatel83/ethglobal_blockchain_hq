const SkeletonLoader = () => {
    return (
        <div className="mb-4 p-4 border-b last:border-b-0 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
    );
};

export default SkeletonLoader;
