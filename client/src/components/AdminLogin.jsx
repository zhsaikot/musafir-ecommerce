import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await api.post('/auth/login', { email, password })

      if (data.role === 'admin') {
        // Save to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))
        toast.success('Admin Login Successful!')
        navigate('/admin/dashboard')
      } else {
        toast.error('Access Denied. Admins only.')
      }
    } catch (error) {
      if (!error.response) {
        toast.error('Cannot reach the store server. Start the API or check VITE_API_URL.')
      } else {
        toast.error(error.response.data?.message || 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f0e3] p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#d8c99f] bg-[#fffdf7] p-8 shadow-[0_24px_70px_rgba(33,29,19,0.16)]">
        <div className="text-center mb-8">
          <img src="/MUSAFIR-BRAND-LOGO.webp" alt="MUSAFIR Islamic Lifestyle" className="mx-auto mb-5 h-20 w-auto max-w-[290px] object-contain" />
          <h2 className="text-xl font-semibold text-[#17202a]">Admin Portal</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#17202a]">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#c9c0aa] bg-white p-3 pl-10 text-[#17202a] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                placeholder="admin@musafir.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#17202a]">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#c9c0aa] bg-white p-3 pl-10 text-[#17202a] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold text-dark transition hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin