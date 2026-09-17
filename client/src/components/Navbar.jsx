import { useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const cartState = JSON.parse(localStorage.getItem('musafir-cart') || '{"state":{"items":[]}}')
  const cartCount = cartState.state.items.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="bg-dark text-white shadow-md sticky top-0 z-50 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="MUSAFIR home">
            <img src="/MUSAFIR-BRAND-LOGO.webp" alt="MUSAFIR Islamic Lifestyle" className="h-12 w-auto max-w-[190px] object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-7 md:flex">
            <Link to="/products" className="text-gray-300 transition hover:text-primary">Shop</Link>
            <Link to="/about" className="text-gray-300 transition hover:text-primary">About</Link>
            <Link to="/contact" className="text-gray-300 transition hover:text-primary">Contact</Link>
            <Link to="/cart" className="relative rounded-full border border-white/10 p-2 text-gray-300 transition hover:border-primary hover:text-primary" aria-label="Shopping bag"><ShoppingBag size={19} />{cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-dark">{cartCount}</span>}</Link>
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
            <Link to="/products" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-primary">Shop</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-primary">About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-primary">Contact</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="mt-3 flex items-center gap-2 text-gray-300 hover:text-primary"><ShoppingBag size={17} /> Shopping bag ({cartCount})</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar