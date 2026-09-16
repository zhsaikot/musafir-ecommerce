import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-dark text-white shadow-md sticky top-0 z-50 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary tracking-wider">
              MUSAFIR
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary transition">
              Features
            </a>
            <a href="#product" className="text-gray-700 hover:text-primary transition">
              Product
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-primary transition">
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-primary transition">
              FAQ
            </a>
            <button className="bg-primary hover:bg-primary-dark text-dark px-6 py-2 rounded-lg font-bold transition">
            Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <a href="#features" className="block py-2 text-gray-700 hover:text-primary">
              Features
            </a>
            <a href="#product" className="block py-2 text-gray-700 hover:text-primary">
              Product
            </a>
            <a href="#pricing" className="block py-2 text-gray-700 hover:text-primary">
              Pricing
            </a>
            <a href="#faq" className="block py-2 text-gray-700 hover:text-primary">
              FAQ
            </a>
            <button className="mt-4 w-full bg-primary text-white px-6 py-2 rounded-lg font-semibold">
              Order Now
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar