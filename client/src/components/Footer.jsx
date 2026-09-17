import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-primary/40 bg-[#f6f0e3] text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src="/MUSAFIR-BRAND-LOGO.webp" alt="MUSAFIR Islamic Lifestyle" className="mb-4 h-16 w-auto max-w-[230px] object-contain object-left" />
            <p className="text-gray-700">
              Islamic Lifestyle & Smart Products Brand
            </p>
            <p className="mt-2 text-gray-700">
              Making worship convenient in the modern world.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-dark">Contact Us</h4>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>017XX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>support@musafir.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Social - Simplified */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-dark">Follow Us</h4>
            <p className="text-sm text-gray-700">
              Coming Soon - Facebook & Instagram
            </p>
            <Link to="/admin/login" className="mt-5 inline-flex items-center gap-2 text-xs text-gray-600 transition hover:text-primary-dark">
              <ShieldCheck size={14} /> Studio login
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-dark/15 pt-8 text-center text-gray-600">
          <p>&copy; 2026 MUSAFIR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer