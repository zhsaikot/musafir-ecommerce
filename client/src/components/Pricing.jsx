import { Check, Zap } from 'lucide-react'

const Pricing = () => {
  const scrollToOrder = () => {
    document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20 bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dark-light border border-primary/30 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Special Launch Offer
            </h2>
            <p className="text-gray-400 mb-8">Get your Digital Tasbih Ring today at an exclusive price.</p>
            
            <div className="flex justify-center items-center gap-4 mb-8">
              <span className="text-gray-500 line-through text-2xl">৳2500</span>
              <span className="text-5xl md:text-6xl font-bold text-primary">৳1700</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
              <FeatureItem text="Free Delivery inside Dhaka" />
              <FeatureItem text="1 Year Official Warranty" />
              <FeatureItem text="Cash on Delivery Available" />
              <FeatureItem text="Original Box & Accessories" />
            </div>

            <button 
              onClick={scrollToOrder}
              className="bg-primary hover:bg-primary-dark text-dark font-bold text-xl px-10 py-4 rounded-xl transition shadow-lg shadow-primary/20 flex items-center gap-2 mx-auto"
            >
              <Zap size={24} fill="currentColor" />
              Order Now - Cash on Delivery
            </button>
            <p className="text-gray-500 text-sm mt-4">Limited stock available. Hurry up!</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3 text-gray-300">
    <div className="bg-primary/20 p-1 rounded-full">
      <Check size={16} className="text-primary" />
    </div>
    <span>{text}</span>
  </div>
)

export default Pricing