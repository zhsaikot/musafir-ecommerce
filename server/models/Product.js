 import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'প্রোডাক্টের নাম প্রয়োজন'], 
      trim: true,
      maxlength: 100
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true
    },
    description: { 
      type: String, 
      required: [true, 'বর্ণনা প্রয়োজন']
    },
    shortDescription: { 
      type: String,
      maxlength: 200
    },
    price: { 
      type: Number, 
      required: [true, 'মূল্য প্রয়োজন'],
      min: 0
    },
    comparePrice: { 
      type: Number,
      min: 0
    },
    images: [{ 
      type: String 
    }],
    category: { 
      type: String, 
      default: 'tasbih',
      enum: ['tasbih', 'prayer-mat', 'islamic-gift', 'accessories', 'other']
    },
    colors: [{
      name: String,
      hex: String,
      stock: Number
    }],
    stock: { 
      type: Number, 
      required: true, 
      default: 0,
      min: 0
    },
    features: [String], // e.g., ["OLED Display", "Bluetooth", "Rechargeable"]
    specifications: {
      battery: String,
      display: String,
      connectivity: String,
      waterproof: Boolean,
      weight: String,
      dimensions: String
    },
    rating: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5
    },
    numReviews: { 
      type: Number, 
      default: 0 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    tags: [String] // e.g., ["ramadan", "gift", "digital-tasbih"]
  },
  { timestamps: true }
);

// Create index for better search performance
productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);
