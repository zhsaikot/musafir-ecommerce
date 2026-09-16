import { Star, ShieldCheck, Truck, BadgeCheck } from 'lucide-react'

const reviews = [
  {
    name: "Abdullah Rahman",
    location: "Dhaka",
    text: "MashAllah, the build quality is premium. The OLED display is very clear and the battery lasts long. Highly recommended!",
    rating: 5
  },
  {
    name: "Fatima Akter",
    location: "Chittagong",
    text: "Bought it as a gift for my father. He loves it. The Bluetooth app feature makes it very easy to track daily Zikr.",
    rating: 5
  },
  {
    name: "Mohammad Karim",
    location: "Sylhet",
    text: "Fast delivery and genuine product. The waterproof feature is a big plus for daily Wudu. JazakAllah Khair MUSAFIR!",
    rating: 5
  }
]

const SocialProof = () => {
  return (
    <section className="py-20 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="flex flex-col items-center text-center p-4">
            <Truck className="text-primary mb-2" size={32} />
            <h4 className="text-white font-bold">Fast Delivery</h4>
            <p className="text-gray-400 text-sm">All over Bangladesh</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <ShieldCheck className="text-primary mb-2" size={32} />
            <h4 className="text-white font-bold">1 Year Warranty</h4>
            <p className="text-gray-400 text-sm">100% Genuine Product</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <BadgeCheck className="text-primary mb-2" size={32} />
            <h4 className="text-white font-bold">Cash on Delivery</h4>
            <p className="text-gray-400 text-sm">Pay after you receive</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Star className="text-primary mb-2" size={32} />
            <h4 className="text-white font-bold">5000+ Happy Customers</h4>
            <p className="text-gray-400 text-sm">Trusted by Muslims</p>
          </div>
        </div>

        {/* Reviews */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our <span className="text-primary">Customers</span> Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-dark p-6 rounded-xl border border-gray-800">
              <div className="flex text-primary mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{review.text}"</p>
              <div>
                <h4 className="text-white font-bold">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof