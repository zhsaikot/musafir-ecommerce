 import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ 
        message: 'সব তথ্য পূরণ করুন' 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        message: 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে' 
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password, // Will be hashed automatically by User model
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
        message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে'
      });
    } else {
      res.status(400).json({ 
        message: 'অ্যাকাউন্ট তৈরি করা যায়নি' 
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      message: 'সার্ভার এরর',
      error: error.message 
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'ইমেইল এবং পাসওয়ার্ড দিন' 
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        message: 'ইমেইল বা পাসওয়ার্ড ভুল' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        message: 'ইমেইল বা পাসওয়ার্ড ভুল' 
      });
    }

    // Send user data with token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
      token: generateToken(user._id),
      message: 'লগইন সফল হয়েছে'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'সার্ভার এরর',
      error: error.message 
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: user.address,
        isVerified: user.isVerified,
        createdAt: user.createdAt
      });
    } else {
      res.status(404).json({ 
        message: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি' 
      });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'সার্ভার এরর',
      error: error.message 
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      
      if (req.body.address) {
        user.address = req.body.address;
      }

      // Update password if provided
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        address: updatedUser.address,
        token: generateToken(updatedUser._id),
        message: 'প্রোফাইল আপডেট হয়েছে'
      });
    } else {
      res.status(404).json({ 
        message: 'ব্যবহারকারী খুঁজে পাওয়া যায়নি' 
      });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'সার্ভার এরর',
      error: error.message 
    });
  }
};
