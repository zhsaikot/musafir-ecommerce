import Product from '../models/Product.js';

// @desc    Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort('-createdAt');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
  }
};

// @desc    Get single product by slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'প্রোডাক্ট পাওয়া যায়নি' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
  }
};

// @desc    Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'প্রোডাক্ট পাওয়া যায়নি' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
  }
};

// @desc    Create product (admin)
export const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    const product = new Product({
      ...req.body,
      slug
    });
    
    const createdProduct = await product.save();
    res.status(201).json({ ...createdProduct.toObject(), message: 'প্রোডাক্ট তৈরি হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'প্রোডাক্ট তৈরি করা যায়নি', error: error.message });
  }
};

// @desc    Update product (admin)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'প্রোডাক্ট পাওয়া যায়নি' });
    }
    
    if (req.body.name) {
      req.body.slug = req.body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json({ ...updatedProduct.toObject(), message: 'প্রোডাক্ট আপডেট হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'প্রোডাক্ট আপডেট করা যায়নি', error: error.message });
  }
};

// @desc    Delete product (admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'প্রোডাক্ট পাওয়া যায়নি' });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'প্রোডাক্ট ডিলিট হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'প্রোডাক্ট ডিলিট করা যায়নি', error: error.message });
  }
};

// @desc    Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true }).limit(6);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার এরর', error: error.message });
  }
};