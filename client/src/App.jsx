import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AdminLogin from './components/AdminLogin'
import AdminRoute from './components/AdminRoute'

// We will create Dashboard in the next step
const DashboardPlaceholder = () => <div className="min-h-screen bg-dark text-white p-10 text-center">Dashboard Coming Soon...</div>

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        
        <Routes>
          {/* Public Landing Page Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <DashboardPlaceholder />
            </AdminRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App