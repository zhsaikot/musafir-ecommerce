import { 
  Truck, Shield, Monitor, Bluetooth, Bell, Battery, 
  Droplets, Hash, Star, BadgeCheck 
} from 'lucide-react'

// Import the new sections we created
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import OrderForm from '../components/OrderForm'

const Home = () => {
  return (
    <div className="bg-dark min-h-screen">
      
      {/* ===== 1. HERO SECTION ===== */}
      <section className="bg-dark text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Digital Tasbih <span className="text-primary">Ring</span>
              </h1>
              <p className="text-xl mb-4 text-gray-300">
                Track Your Dhikr Anywhere
              </p>
              <p className="text-lg mb-8 text-gray-400">
                Count your Zikr effortlessly with this smart OLED display ring. 
                Bluetooth enabled, rechargeable, and waterproof.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('order-form').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary hover:bg-primary-dark text-dark px-8 py-3 rounded-lg font-bold text-lg transition shadow-lg shadow-primary/20"
                >
                  Order Now - ৳1700
                </button>
                <button className="border border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-bold text-lg transition">
                  Watch Video
                </button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-primary" />
                  <span>COD Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-primary" />
                  <span>1 Year Warranty</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-dark-light p-8 rounded-2xl border border-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400" 
                  alt="Digital Tasbih Ring"
                  className="w-full max-w-sm rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. FEATURES SECTION ===== */}
      <section className="py-20 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Premium <span className="text-primary">Features</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Designed for the modern Muslim. Combining faith with smart technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={<Monitor size={32} />} title="OLED Display" desc="Bright, clear screen to track your count effortlessly." />
            <FeatureCard icon={<Bluetooth size={32} />} title="Bluetooth App" desc="Connect to mobile app to track daily Zikr goals." />
            <FeatureCard icon={<Bell size={32} />} title="Prayer Reminder" desc="Gentle vibration reminders for daily Dhikr." />
            <FeatureCard icon={<Battery size={32} />} title="Rechargeable" desc="Long-lasting battery. Charge once, use for weeks." />
            <FeatureCard icon={<Droplets size={32} />} title="Waterproof" desc="Wudu-safe design. Wear it anytime without worry." />
            <FeatureCard icon={<Hash size={32} />} title="Smart Counter" desc="Accurate digital counting. Never lose track again." />
          </div>
        </div>
      </section>

      {/* ===== 3. PRODUCT SHOWCASE ===== */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Elegant <span className="text-primary">Design</span>
            </h2>
            <p className="text-gray-400">Crafted for comfort, built for durability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-dark-light rounded-2xl overflow-hidden border border-gray-800 h-80 md:h-96 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" 
                alt="Product"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-dark-light rounded-2xl overflow-hidden border border-gray-800 h-44 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&q=80&w=400" alt="Lifestyle" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="bg-dark-light rounded-2xl overflow-hidden border border-gray-800 h-44 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1584286595398-a59f22790b49?auto=format&fit=crop&q=80&w=400" alt="In Hand" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. SOCIAL PROOF ===== */}
      <section className="py-20 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <TrustBadge icon={<Truck />} title="Fast Delivery" desc="All over Bangladesh" />
            <TrustBadge icon={<Shield />} title="1 Year Warranty" desc="100% Genuine Product" />
            <TrustBadge icon={<BadgeCheck />} title="Cash on Delivery" desc="Pay after you receive" />
            <TrustBadge icon={<Star />} title="5000+ Happy Customers" desc="Trusted by Muslims" />
          </div>

          {/* Reviews */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="text-primary">Customers</span> Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard name="Abdullah Rahman" location="Dhaka" text="MashAllah, the build quality is premium. The OLED display is very clear!" rating={5} />
            <ReviewCard name="Fatima Akter" location="Chittagong" text="Bought it as a gift for my father. He loves it. Highly recommended!" rating={5} />
            <ReviewCard name="Mohammad Karim" location="Sylhet" text="Fast delivery and genuine product. JazakAllah Khair MUSAFIR!" rating={5} />
          </div>
        </div>
      </section>

      {/* ===== 5. PRICING SECTION ===== */}
      <Pricing />

      {/* ===== 6. FAQ SECTION ===== */}
      <FAQ />

      {/* ===== 7. ORDER FORM SECTION ===== */}
      <OrderForm />

    </div>
  )
}

// ===== HELPER COMPONENTS =====

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-dark p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition duration-300 group">
    <div className="text-primary mb-4 group-hover:scale-110 transition duration-300">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{desc}</p>
  </div>
)

const TrustBadge = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="text-primary mb-2">{icon}</div>
    <h4 className="text-white font-bold">{title}</h4>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
)

const ReviewCard = ({ name, location, text, rating }) => (
  <div className="bg-dark p-6 rounded-xl border border-gray-800">
    <div className="flex text-primary mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={16} fill="currentColor" />
      ))}
    </div>
    <p className="text-gray-300 mb-6 italic">"{text}"</p>
    <div>
      <h4 className="text-white font-bold">{name}</h4>
      <p className="text-gray-500 text-sm">{location}</p>
    </div>
  </div>
)

export default Home