 import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
    orderItems: [
      {
        product: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Product',
          required: true 
        },
        name: { type: String, required: true },
        quantity: { 
          type: Number, 
          required: true,
          min: 1
        },
        price: { 
          type: Number, 
          required: true,
          min: 0
        },
        image: String,
        color: String
      }
    ],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      division: { type: String, required: true },
      district: { type: String, required: true },
      upazila: { type: String },
      street: { type: String },
      postalCode: { type: String }
    },
    paymentMethod: { 
      type: String, 
      required: true,
      enum: ['cod', 'bkash', 'nagad', 'sslcommerz']
    },
    paymentResult: {
      transactionId: String,
      status: String,
      amount: Number,
      paidAt: Date
    },
    itemsPrice: { 
      type: Number, 
      required: true,
      min: 0
    },
    shippingCost: { 
      type: Number, 
      default: 60, // ৳60 default shipping
      min: 0
    },
    totalPrice: { 
      type: Number, 
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    isPaid: { 
      type: Boolean, 
      default: false 
    },
    isDelivered: { 
      type: Boolean, 
      default: false 
    },
    deliveredAt: Date,
    notes: String, // Customer notes/special instructions
    cancelledReason: String
  },
  { timestamps: true }
);

// Index for faster queries
orderSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Order', orderSchema);
