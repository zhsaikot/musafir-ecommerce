const ProductShowcase = () => {
  return (
    <section id="product" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Elegant <span className="text-primary">Design</span>
          </h2>
          <p className="text-gray-400">
            Crafted for comfort, built for durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Image */}
          <div className="md:col-span-2 bg-dark-light rounded-2xl overflow-hidden border border-gray-800 h-80 md:h-96 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" 
              alt="Digital Tasbih Ring Close Up"
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          {/* Side Images */}
          <div className="flex flex-col gap-6">
            <div className="bg-dark-light rounded-2xl overflow-hidden border border-gray-800 h-44 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&q=80&w=400" 
                alt="Lifestyle"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="bg-dark-light rounded-2xl overflow-hidden border border-gray-800 h-44 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1584286595398-a59f22790b49?auto=format&fit=crop&q=80&w=400" 
                alt="In Hand"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase