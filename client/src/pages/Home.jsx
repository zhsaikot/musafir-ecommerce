import { useEffect, useState } from 'react'
import { ArrowRight, ShoppingBag, Star, Truck, Shield, BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => {
        // Get first 4 products as featured
        setFeaturedProducts(data.slice(0, 4))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-dark min-h-screen">
      
      {/* ===== 1. HERO SECTION ===== */}
      <section className="bg-gradient-to-br from-dark via-dark-light to-dark text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Welcome to Musafir</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Islamic Products for the <span className="text-primary">Modern Muslim</span>
              </h1>
              <p className="text-xl mb-4 text-gray-300">
                Discover thoughtful tools and gifts designed around prayer, presence, and everyday rituals.
              </p>
              <p className="text-lg mb-8 text-gray-400">
                From digital tasbihs to prayer mats, find everything you need to enhance your spiritual journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-dark px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-primary/20"
                >
                  <ShoppingBag size={20} />
                  Shop Now
                </Link>
                <Link 
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-full font-bold text-lg transition"
                >
                  Learn More
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1584286595398-a59f22790b49?auto=format&fit=crop&q=80&w=600" 
                  alt="Islamic Products Collection"
                  className="relative w-full max-w-md rounded-2xl shadow-2xl border border-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. TRUST BADGES ===== */}
      <section className="py-12 bg-dark-light border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TrustBadge icon={<Truck />} title="Fast Delivery" desc="All over Bangladesh" />
            <TrustBadge icon={<Shield />} title="1 Year Warranty" desc="100% Genuine Products" />
            <TrustBadge icon={<BadgeCheck />} title="Cash on Delivery" desc="Pay after you receive" />
            <TrustBadge icon={<Star />} title="5000+ Happy Customers" desc="Trusted by Muslims" />
          </div>
        </div>
      </section>

      {/* ===== 3. FEATURED PRODUCTS ===== */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Collection</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured <span className="text-primary">Products</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Handpicked items to enhance your daily worship and spiritual practice.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-400 py-12">Loading products...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link 
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition border border-white/10"
                >
                  View All Products
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===== 4. CATEGORIES SECTION ===== */}
      <section className="py-20 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Browse By</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Shop <span className="text-primary">Categories</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <CategoryCard name="Digital Tasbih" image="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400" link="/products?category=tasbih" />
            <CategoryCard name="Prayer Mats" image="https://images.unsplash.com/photo-1584286595398-a59f22790b49?auto=format&fit=crop&q=80&w=400" link="/products?category=prayer-mat" />
            <CategoryCard name="Islamic Gifts" image="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&q=80&w=400" link="/products?category=islamic-gift" />
            <CategoryCard name="Accessories" image="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400" link="/products?category=accessories" />
          </div>
        </div>
      </section>

      {/* ===== 5. ABOUT PREVIEW ===== */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1584286595398-a59f22790b49?auto=format&fit=crop&q=80&w=600" 
                alt="About Musafir"
                className="rounded-2xl shadow-2xl border border-gray-800"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Serving the Muslim <span className="text-primary">Community</span>
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Musafir is dedicated to providing high-quality Islamic products that blend tradition with modern technology. We believe in making worship easier and more meaningful for Muslims everywhere.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Premium quality products
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Fast delivery across Bangladesh
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Dedicated customer support
                </li>
              </ul>
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-bold text-lg transition"
              >
                Learn More About Us
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. CTA SECTION ===== */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
            Ready to Enhance Your Spiritual Journey?
          </h2>
          <p className="text-dark/80 text-lg mb-8 max-w-2xl mx-auto">
            Browse our collection of premium Islamic products and find the perfect tools for your daily worship.
          </p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 bg-dark hover:bg-dark/80 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-lg"
          >
            <ShoppingBag size={20} />
            Start Shopping
          </Link>
        </div>
      </section>

    </div>
  )
}

// ===== HELPER COMPONENTS =====

const TrustBadge = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="text-primary mb-3">{icon}</div>
    <h4 className="text-white font-bold mb-1">{title}</h4>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
)

const CategoryCard = ({ name, image, link }) => (
  <Link to={link} className="group relative overflow-hidden rounded-2xl aspect-square">
    <img 
      src={image} 
      alt={name}
      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-xl font-bold text-white group-hover:text-primary transition">{name}</h3>
    </div>
  </Link>
)

export default Home