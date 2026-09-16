 import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - require authentication
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'অনুমতি নেই, লগইন করুন' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'লগইন করুন' });
  }
};

// Admin only middleware
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'শুধুমাত্র অ্যাডমিনের জন্য' });
  }
};
