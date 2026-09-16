import { useState } from 'react'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'
import useCartStore from '../store/cartStore'

const Checkout = () => {
  const { items, clearCart } = useCartStore()
  const [form, setForm] = useState({ name: '', phone: '', division: 'Dhaka', district: '', address: '' })
  const [submitting, setSubmitting] = useState(false)
  const [complete, setComplete] = useState(false)
  const shippingCost = form.division === 'Dhaka' ? 60 : 120
  const itemsPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/orders', { orderItems: items.map((item) => ({ product: item.id, name: item.name, quantity: item.quantity, price: item.price, image: item.image, color: item.color })), shippingAddress: { name: form.name, phone: form.phone, division: form.division, district: form.district, street: form.address }, paymentMethod: 'cod', itemsPrice, shippingCost, totalPrice: itemsPrice + shippingCost })
      clearCart()
      setComplete(true)
      toast.success('Order placed successfully')
    } catch (error) { toast.error(error.response?.data?.message || 'Could not place your order') } finally { setSubmitting(false) }
  }

  if (!items.length && !complete) return <main className="min-h-screen bg-dark px-6 py-32 text-center text-white"><h1 className="text-3xl font-bold">Your bag is empty</h1><Link to="/products" className="mt-6 inline-block text-primary">Explore the collection</Link></main>
  if (complete) return <main className="min-h-screen bg-dark px-6 py-32 text-center text-white"><CheckCircle className="mx-auto text-primary" size={56} /><h1 className="mt-6 text-4xl font-bold">Order received.</h1><p className="mx-auto mt-4 max-w-md leading-7 text-gray-400">Thank you. Our team will call you shortly to confirm your cash-on-delivery order.</p><Link to="/products" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-bold text-dark">Continue shopping</Link></main>

  return <main className="min-h-screen bg-dark px-4 pb-24 pt-16 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-5xl"><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Final step</p><h1 className="mt-4 text-5xl font-bold">Complete your order</h1><div className="mt-12 grid gap-10 lg:grid-cols-[1fr_330px]"><form onSubmit={submit} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" name="name" value={form.name} onChange={update} required /><Field label="Phone number" name="phone" value={form.phone} onChange={update} required type="tel" /></div><div className="grid gap-5 sm:grid-cols-2"><label className="mb-5 block text-sm text-gray-400">Division<select name="division" value={form.division} onChange={update} className="mt-2 w-full rounded-xl border border-white/10 bg-dark p-4 text-white outline-none focus:border-primary"><option>Dhaka</option><option>Chittagong</option><option>Rajshahi</option><option>Khulna</option><option>Sylhet</option><option>Barisal</option><option>Rangpur</option><option>Mymensingh</option></select></label><Field label="District" name="district" value={form.district} onChange={update} required /></div><Field label="Full delivery address" name="address" value={form.address} onChange={update} required textarea /><button disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 font-bold text-dark disabled:opacity-60">{submitting ? <><Loader2 size={18} className="animate-spin" /> Placing order...</> : <><Send size={17} /> Place cash-on-delivery order</>}</button></form><aside className="h-fit rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"><h2 className="text-xl font-bold">Order summary</h2><div className="mt-5 space-y-4">{items.map((item) => <div key={item.id} className="flex justify-between gap-3 text-sm"><span className="text-gray-400">{item.name} × {item.quantity}</span><span>৳{item.price * item.quantity}</span></div>)}</div><div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-gray-400"><div className="flex justify-between"><span>Subtotal</span><span>৳{itemsPrice}</span></div><div className="flex justify-between"><span>Delivery</span><span>৳{shippingCost}</span></div></div><div className="mt-5 flex justify-between text-xl font-bold"><span>Total</span><span className="text-primary">৳{itemsPrice + shippingCost}</span></div></aside></div></div></main>
}

const Field = ({ label, name, value, onChange, required, type = 'text', textarea }) => <label className="mb-5 block text-sm text-gray-400">{label}{textarea ? <textarea name={name} value={value} onChange={onChange} required={required} rows="4" className="mt-2 w-full rounded-xl border border-white/10 bg-dark p-4 text-white outline-none focus:border-primary" /> : <input name={name} value={value} onChange={onChange} required={required} type={type} className="mt-2 w-full rounded-xl border border-white/10 bg-dark p-4 text-white outline-none focus:border-primary" />}</label>
export default Checkout
