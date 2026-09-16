import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    division: 'Dhaka', // Default to Dhaka
    district: '',
    address: '',
    quantity: 1
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Smart Shipping Cost Logic for Bangladesh
  const getShippingCost = (division) => {
    return division === 'Dhaka' ? 60 : 120 // ৳60 inside Dhaka, ৳120 outside
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.address || !formData.district) {
      toast.error('দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন')
      return
    }

    // Phone number validation for Bangladesh
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)')
      return
    }

    setIsSubmitting(true)
    
    try {
      const quantity = parseInt(formData.quantity)
      const itemsPrice = 1700 * quantity
      const shippingCost = getShippingCost(formData.division)
      const totalPrice = itemsPrice + shippingCost

      const payload = {
        orderItems: [
          {
            product: "6a9e92f7b27555b78236515e", // Your actual Product ID from Step 9
            name: "Digital Tasbih Ring - OLED Display",
            quantity: quantity,
            price: 1700,
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=400",
            color: "Black"
          }
        ],
        shippingAddress: {
          name: formData.name,
          phone: formData.phone,
          division: formData.division,
          district: formData.district,
          street: formData.address
        },
        paymentMethod: "cod",
        itemsPrice,
        shippingCost,
        totalPrice
      }

      const response = await api.post('/orders', payload)
      
      if (response.status === 201) {
        setIsSuccess(true)
        toast.success(response.data.message || 'অর্ডার সফল হয়েছে!')
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSuccess(false)
          setFormData({ name: '', phone: '', division: 'Dhaka', district: '', address: '', quantity: 1 })
        }, 5000)
      }
    } catch (error) {
      console.error('Order error:', error)
      const errorMsg = error.response?.data?.message || 'অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
      toast.error(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="order-form" className="py-20 bg-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Place Your <span className="text-primary">Order</span>
          </h2>
          <p className="text-gray-400">ফর্মটি পূরণ করুন। আমরা ২৪ ঘণ্টার মধ্যে আপনাকে কল করে অর্ডার কনফার্ম করব।</p>
        </div>

        <div className="bg-dark-light border border-gray-800 rounded-2xl p-8">
          {isSuccess ? (
            <div className="text-center py-12 animate-fade-in">
              <CheckCircle className="text-primary mx-auto mb-4" size={64} />
              <h3 className="text-2xl font-bold text-white mb-2">অর্ডার কনফার্ম হয়েছে!</h3>
              <p className="text-gray-400">জাযাকাল্লাহু খাইরান। আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="আপনার নাম *" name="name" value={formData.name} onChange={handleChange} placeholder="পূর্ণ নাম লিখুন" />
                <InputField label="মোবাইল নম্বর *" name="phone" value={formData.phone} onChange={handleChange} placeholder="01XXXXXXXXX" type="tel" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">বিভাগ *</label>
                  <select 
                    name="division" 
                    value={formData.division} 
                    onChange={handleChange}
                    className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    required
                  >
                    <option value="Dhaka">Dhaka (৳60 Delivery)</option>
                    <option value="Chittagong">Chittagong (৳120 Delivery)</option>
                    <option value="Rajshahi">Rajshahi (৳120 Delivery)</option>
                    <option value="Khulna">Khulna (৳120 Delivery)</option>
                    <option value="Sylhet">Sylhet (৳120 Delivery)</option>
                    <option value="Barisal">Barisal (৳120 Delivery)</option>
                    <option value="Rangpur">Rangpur (৳120 Delivery)</option>
                    <option value="Mymensingh">Mymensingh (৳120 Delivery)</option>
                  </select>
                </div>
                <InputField label="জেলা *" name="district" value={formData.district} onChange={handleChange} placeholder="যেমন: Dhaka" />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">বিস্তারিত ঠিকানা *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="বাসা নং, রোড নং, এলাকা, থানা"
                  rows="3"
                  className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between bg-dark p-4 rounded-lg border border-gray-700 gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-gray-400 text-sm">সর্বমোট মূল্য (ডেলিভারি চার্জ সহ)</p>
                  <p className="text-3xl font-bold text-primary">
                    ৳{(1700 * formData.quantity) + getShippingCost(formData.division)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-gray-300">পরিমাণ:</label>
                  <select 
                    name="quantity" 
                    value={formData.quantity} 
                    onChange={handleChange}
                    className="bg-dark border border-gray-700 text-white rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="1">1 পিস (৳1700)</option>
                    <option value="2">2 পিস (৳3400)</option>
                    <option value="3">3 পিস (৳5100)</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-dark font-bold text-lg py-4 rounded-xl transition shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    প্রসেসিং হচ্ছে...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    অর্ডার কনফার্ম করুন (Cash on Delivery)
                  </>
                )}
              </button>
              
              <p className="text-center text-gray-500 text-xs">
                অর্ডার করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন। পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// Helper Input Component
const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="block text-gray-300 mb-2 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
      required
    />
  </div>
)

export default OrderForm