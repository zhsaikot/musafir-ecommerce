import { useEffect, useState } from 'react'
import { Edit3, LogOut, PackagePlus, Save, Trash2, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'

const emptyProduct = {
  name: '',
  description: '',
  shortDescription: '',
  price: '',
  comparePrice: '',
  images: '',
  category: 'tasbih',
  stock: '',
  tags: '',
  features: '',
  isFeatured: false,
  isActive: true,
}

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyProduct)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const loadProducts = () => api.get('/products').then(({ data }) => setProducts(data)).catch(() => toast.error('Could not load products')).finally(() => setLoading(false))
  useEffect(() => { loadProducts() }, [])

  const updateField = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const resetForm = () => { setForm(emptyProduct); setEditingId(null) }
  const submit = async (event) => {
    event.preventDefault()
    const payload = {
      ...form,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
      stock: Number(form.stock),
      images: form.images.split('\n').map((value) => value.trim()).filter(Boolean),
      tags: form.tags.split('\n').map((value) => value.trim()).filter(Boolean),
      features: form.features.split('\n').map((value) => value.trim()).filter(Boolean),
    }

    try {
      if (editingId) await api.put(`/products/${editingId}`, payload)
      else await api.post('/products', payload)
      toast.success(editingId ? 'Product updated' : 'Product created')
      resetForm()
      loadProducts()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save product')
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await api.delete(`/products/${id}`)
      setProducts((current) => current.filter((product) => product._id !== id))
      toast.success('Product deleted')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete product')
    }
  }

  const logout = () => { localStorage.removeItem('userInfo'); navigate('/admin/login') }

  return <main className="min-h-screen bg-dark px-4 pb-24 pt-10 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">MUSAFIR / STUDIO</p><h1 className="mt-3 text-4xl font-bold">Product control room</h1></div><div className="flex items-center gap-4"><Link to="/products" className="text-sm text-gray-400 hover:text-white">View store</Link><button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 hover:border-primary"><LogOut size={15} /> Sign out</button></div></header><div className="mt-10 grid gap-10 lg:grid-cols-[380px_1fr]"><form onSubmit={submit} className="h-fit rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6"><div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-bold">{editingId ? 'Edit product' : 'Add product'}</h2>{editingId ? <button type="button" onClick={resetForm} className="text-gray-500 hover:text-white"><X size={18} /></button> : <PackagePlus className="text-primary" size={21} />}</div><Field label="Product name" name="name" value={form.name} onChange={updateField} required /><Field label="Short description" name="shortDescription" value={form.shortDescription} onChange={updateField} /><Field label="Description" name="description" value={form.description} onChange={updateField} required textarea /><div className="grid grid-cols-2 gap-3"><Field label="Price" name="price" value={form.price} onChange={updateField} type="number" required /><Field label="Compare price" name="comparePrice" value={form.comparePrice} onChange={updateField} type="number" /></div><div className="grid grid-cols-2 gap-3"><Field label="Stock" name="stock" value={form.stock} onChange={updateField} type="number" required /><label className="block text-xs text-gray-400">Category<select name="category" value={form.category} onChange={updateField} className="mt-2 w-full rounded-lg border border-white/10 bg-dark p-3 text-sm text-white outline-none focus:border-primary">{['tasbih', 'prayer-mat', 'islamic-gift', 'accessories', 'other'].map((item) => <option key={item}>{item}</option>)}</select></label></div><Field label="Image URLs (one per line)" name="images" value={form.images} onChange={updateField} textarea required /><Field label="Features (one per line)" name="features" value={form.features} onChange={updateField} textarea /><Field label="Tags (one per line)" name="tags" value={form.tags} onChange={updateField} textarea /><label className="mb-6 flex items-center gap-3 text-sm text-gray-300"><input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={updateField} className="h-4 w-4 accent-yellow-500" /> Feature on the store</label><label className="mb-6 flex items-center gap-3 text-sm text-gray-300"><input type="checkbox" name="isActive" checked={form.isActive} onChange={updateField} className="h-4 w-4 accent-yellow-500" /> Active product</label><button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-dark"><Save size={17} /> {editingId ? 'Save changes' : 'Create product'}</button></form><section><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-bold">Inventory <span className="ml-2 text-sm font-normal text-gray-500">{products.length} products</span></h2></div>{loading ? <p className="py-10 text-gray-500">Loading inventory...</p> : <div className="space-y-3">{products.map((product) => <div key={product._id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"><img src={product.images?.[0]} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><h3 className="truncate font-semibold">{product.name}</h3><p className="mt-1 text-sm text-gray-500">৳{product.price} · {product.stock} in stock</p></div><button onClick={() => { setEditingId(product._id); setForm({ ...product, images: (product.images || []).join('\n'), features: (product.features || []).join('\n'), tags: (product.tags || []).join('\n') }) }} className="rounded-full p-3 text-gray-400 hover:bg-white/10 hover:text-primary" aria-label={`Edit ${product.name}`}><Edit3 size={16} /></button><button onClick={() => remove(product._id)} className="rounded-full p-3 text-gray-400 hover:bg-white/10 hover:text-red-300" aria-label={`Delete ${product.name}`}><Trash2 size={16} /></button></div>)}{!products.length && <p className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-gray-500">Your inventory is empty. Add the first product.</p>}</div>}</section></div></div></main>
}

const Field = ({ label, name, value, onChange, type = 'text', required, textarea }) => <label className="mb-4 block text-xs text-gray-400">{label}{textarea ? <textarea name={name} value={value} onChange={onChange} required={required} rows="3" className="mt-2 w-full rounded-lg border border-white/10 bg-dark p-3 text-sm text-white outline-none focus:border-primary" /> : <input name={name} value={value} onChange={onChange} type={type} required={required} className="mt-2 w-full rounded-lg border border-white/10 bg-dark p-3 text-sm text-white outline-none focus:border-primary" />}</label>
export default AdminDashboard
