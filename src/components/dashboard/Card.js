export default function Card({ title, image, price, tag, author }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-36 object-cover" />
        {tag && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {tag}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-600 mt-1">{author}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-bold text-gray-900">${price}</span>
        </div>
      </div>
    </div>
  );
}
