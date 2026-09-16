import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'নাম প্রয়োজন'], 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'ইমেইল প্রয়োজন'], 
      unique: true, 
      lowercase: true,
      trim: true
    },
    phone: { 
      type: String, 
      required: [true, 'ফোন নম্বর প্রয়োজন'],
      trim: true
    },
    password: { 
      type: String, 
      required: [true, 'পাসওয়ার্ড প্রয়োজন'],
      minlength: 6,
      select: false
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    },
    address: {
      division: { type: String },
      district: { type: String },
      upazila: { type: String },
      street: { type: String },
      postalCode: { type: String }
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Hash password before saving - FIXED VERSION
userSchema.pre('save', async function() {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);