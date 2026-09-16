 // Simple admin check (can be combined with authMiddleware)
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      message: 'এই কাজটি করার জন্য আপনার অ্যাডমিন এক্সেস প্রয়োজন' 
    });
  }
};
