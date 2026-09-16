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
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="bg-dark-light border border-gray-800 p-8 rounded-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">MUSAFIR</h1>
          <h2 className="text-xl text-white font-semibold">Admin Portal</h2>
          <p className="text-gray-400 text-sm mt-2">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark border border-gray-700 rounded-lg pl-10 p-3 text-white focus:ring-2 focus:ring-primary outline-none transition"
                placeholder="admin@musafir.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark border border-gray-700 rounded-lg pl-10 p-3 text-white focus:ring-2 focus:ring-primary outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-dark font-bold py-3 rounded-lg transition flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin