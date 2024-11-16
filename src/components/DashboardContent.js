export default function DashboardContent() {
    return (
      <div className="p-6 bg-retroCream flex-1 overflow-y-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-retroBlack">Recent Search</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {/* Card Example */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <span className="bg-retroPink text-white text-xs px-2 py-1 rounded-md">Featured</span>
              <h3 className="font-bold text-retroBlack mt-2">Daily Practices Drawing</h3>
              <p className="text-sm text-retroBlack">$40</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <span className="bg-retroBlue text-white text-xs px-2 py-1 rounded-md">New</span>
              <h3 className="font-bold text-retroBlack mt-2">The Power of Procreate</h3>
              <p className="text-sm text-retroBlack">$45</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <span className="bg-retroBlue text-white text-xs px-2 py-1 rounded-md">New</span>
              <h3 className="font-bold text-retroBlack mt-2">The Power of Procreate</h3>
              <p className="text-sm text-retroBlack">$45</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <span className="bg-retroPink text-white text-xs px-2 py-1 rounded-md">Featured</span>
              <h3 className="font-bold text-retroBlack mt-2">Daily Practices Drawing</h3>
              <p className="text-sm text-retroBlack">$40</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <span className="bg-retroBlue text-white text-xs px-2 py-1 rounded-md">New</span>
              <h3 className="font-bold text-retroBlack mt-2">The Power of Procreate</h3>
              <p className="text-sm text-retroBlack">$45</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <span className="bg-retroBlue text-white text-xs px-2 py-1 rounded-md">New</span>
              <h3 className="font-bold text-retroBlack mt-2">The Power of Procreate</h3>
              <p className="text-sm text-retroBlack">$45</p>
            </div>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-retroBlack">Popular Class</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {/* Add more cards here */}
          </div>
        </section>
  
        <section>
          <h2 className="text-2xl font-bold text-retroBlack">Newest Class</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {/* Add more cards here */}
          </div>
        </section>
      </div>
    );
  }
  