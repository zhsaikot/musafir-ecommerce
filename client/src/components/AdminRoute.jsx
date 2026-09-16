import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  // Get user info from localStorage
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null

  // If user is logged in AND is an admin, show the page
  if (userInfo && userInfo.role === 'admin') {
    return children
  }

  // Otherwise, redirect to admin login
  return <Navigate to="/admin/login" replace />
}

export default AdminRoute