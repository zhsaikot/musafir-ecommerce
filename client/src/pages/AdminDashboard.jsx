import { useEffect, useMemo, useState } from 'react'
import {
  Archive,
  Check,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  ImagePlus,
  LogOut,
  PackagePlus,
  Plus,
  Save,
  Search,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'

const categories = ['tasbih', 'prayer-mat', 'islamic-gift', 'accessories', 'other']

const emptyProduct = {
  name: '', shortDescription: '', description: '', price: '', comparePrice: '', stock: '',
  category: 'tasbih', images: '', features: '', tags: '', isFeatured: false, isActive: true,
}

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyProduct)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const loadProducts = async () => {
    try {
      const { data } = await api.get('/products/admin/all')
      setProducts(data)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not load inventory')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadProducts() }, [])

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter((product) => product.isActive).length,
    lowStock: products.filter((product) => product.stock > 0 && product.stock <= 5).length,
    outOfStock: products.filter((product) => product.stock === 0).length,
  }), [products])

  const filteredProducts = useMemo(() => products.filter((product) => {
    const searchable = `${product.name} ${product.category} ${(product.tags || []).join(' ')}`.toLowerCase()
    const matchesQuery = searchable.includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all'
      || (statusFilter === 'active' && product.isActive)
      || (statusFilter === 'inactive' && !product.isActive)
      || (statusFilter === 'low' && product.stock > 0 && product.stock <= 5)
      || (statusFilter === 'out' && product.stock === 0)
    return matchesQuery && matchesStatus
  }), [products, query, statusFilter])

  const updateField = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const resetForm = () => { setForm(emptyProduct); setEditingId(null) }

  const editProduct = (product) => {
    setEditingId(product._id)
    setForm({
      ...emptyProduct, ...product,
      images: (product.images || []).join('\n'),
      features: (product.features || []).join('\n'),
      tags: (product.tags || []).join('\n'),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      price: Number(form.price),
      comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
      stock: Number(form.stock),
      images: form.images.split('\n').map((value) => value.trim()).filter(Boolean),
      features: form.features.split('\n').map((value) => value.trim()).filter(Boolean),
      tags: form.tags.split('\n').map((value) => value.trim()).filter(Boolean),
    }

    try {
      if (editingId) await api.put(`/products/${editingId}`, payload)
      else await api.post('/products', payload)
      toast.success(editingId ? 'Product updated' : 'Product created')
      resetForm()
      await loadProducts()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not save product')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this product permanently?')) return
    try {
      await api.delete(`/products/${id}`)
      setProducts((current) => current.filter((product) => product._id !== id))
      if (editingId === id) resetForm()
      toast.success('Product deleted')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not delete product')
    }
  }

  const changeStock = async (product, amount) => {
    try {
      const { data } = await api.put(`/products/${product._id}`, { stock: Math.max(0, product.stock + amount) })
      setProducts((current) => current.map((item) => item._id === product._id ? data : item))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not update stock')
    }
  }

  const logout = () => { localStorage.removeItem('userInfo'); navigate('/admin/login') }

  return (
    <main className="min-h-screen bg-dark px-4 pb-20 pt-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">MUSAFIR / STUDIO</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">Inventory workspace</h1><p className="mt-2 text-sm text-gray-500">Manage what is available, visible, and ready to ship.</p></div>
          <div className="flex items-center gap-3"><Link to="/products" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 hover:border-primary hover:text-white"><ExternalLink size={15} /> View store</Link><button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 hover:border-red-300 hover:text-red-200"><LogOut size={15} /> Sign out</button></div>
        </header>

        <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Metric label="Total products" value={stats.total} icon={Archive} /><Metric label="Live in store" value={stats.active} icon={Eye} tone="green" /><Metric label="Low stock" value={stats.lowStock} icon={PackagePlus} tone="yellow" /><Metric label="Out of stock" value={stats.outOfStock} icon={EyeOff} tone="red" /></section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[390px_1fr]">
          <form onSubmit={submit} className="h-fit rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 xl:sticky xl:top-6">
            <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.25em] text-primary">Catalog editor</p><h2 className="mt-2 text-2xl font-bold">{editingId ? 'Edit product' : 'Add product'}</h2></div>{editingId ? <button type="button" onClick={resetForm} className="rounded-full p-2 text-gray-500 hover:bg-white/10 hover:text-white" aria-label="Cancel editing"><X size={18} /></button> : <PackagePlus className="mt-1 text-primary" size={22} />}</div>
            <Field label="Product name" name="name" value={form.name} onChange={updateField} required placeholder="e.g. Noor Digital Tasbih" />
            <Field label="Short description" name="shortDescription" value={form.shortDescription} onChange={updateField} placeholder="One-line product summary" />
            <Field label="Description" name="description" value={form.description} onChange={updateField} required textarea placeholder="Tell customers what makes this product special" />
            <div className="grid grid-cols-2 gap-3"><Field label="Price (BDT)" name="price" value={form.price} onChange={updateField} type="number" required min="0" /><Field label="Compare price" name="comparePrice" value={form.comparePrice} onChange={updateField} type="number" min="0" /></div>
            <div className="grid grid-cols-2 gap-3"><Field label="Stock units" name="stock" value={form.stock} onChange={updateField} type="number" required min="0" /><label className="mb-4 block text-xs text-gray-400">Category<select name="category" value={form.category} onChange={updateField} className="mt-2 w-full rounded-lg border border-white/10 bg-dark p-3 text-sm text-white outline-none focus:border-primary">{categories.map((item) => <option key={item} value={item}>{item.replace('-', ' ')}</option>)}</select></label></div>
            <Field label="Image URLs (one per line)" name="images" value={form.images} onChange={updateField} required textarea placeholder="https://..." /><p className="-mt-2 mb-4 flex items-center gap-2 text-xs text-gray-500"><ImagePlus size={14} /> Add hosted image URLs. Cloud upload can be connected later.</p>
            <Field label="Features (one per line)" name="features" value={form.features} onChange={updateField} textarea placeholder={'Premium materials\nFast delivery'} />
            <Field label="Tags (one per line)" name="tags" value={form.tags} onChange={updateField} textarea placeholder={'ramadan\ngift'} />
            <div className="space-y-3 border-t border-white/10 pt-4"><Toggle name="isActive" checked={form.isActive} onChange={updateField} label="Visible in store" /><Toggle name="isFeatured" checked={form.isFeatured} onChange={updateField} label="Show as featured" /></div>
            <button disabled={saving} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-bold text-dark transition hover:bg-primary-light disabled:cursor-wait disabled:opacity-60">{saving ? 'Saving...' : <><Save size={17} /> {editingId ? 'Save changes' : 'Create product'}</>}</button>
          </form>

          <section className="min-w-0"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-bold">Products</h2><p className="mt-1 text-sm text-gray-500">{filteredProducts.length} of {products.length} products shown</p></div><button onClick={resetForm} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-dark hover:bg-primary"><Plus size={16} /> New product</button></div>
            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, categories, tags" className="w-full rounded-lg border border-white/10 bg-dark py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-primary" /></div><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border border-white/10 bg-dark px-3 py-2.5 text-sm text-white outline-none focus:border-primary"><option value="all">All products</option><option value="active">Live products</option><option value="inactive">Hidden products</option><option value="low">Low stock</option><option value="out">Out of stock</option></select></div>
            <div className="mt-4 space-y-3">{loading ? <p className="rounded-2xl border border-white/10 p-10 text-center text-gray-500">Loading inventory...</p> : filteredProducts.map((product) => <ProductRow key={product._id} product={product} onEdit={editProduct} onDelete={remove} onStockChange={changeStock} />)}{!loading && !filteredProducts.length && <p className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-gray-500">No products match this view.</p>}</div>
          </section>
        </div>
      </div>
    </main>
  )
}

const Metric = ({ label, value, icon: Icon, tone = 'primary' }) => {
  const colors = { primary: 'text-primary bg-primary/10', green: 'text-emerald-300 bg-emerald-300/10', yellow: 'text-yellow-300 bg-yellow-300/10', red: 'text-red-300 bg-red-300/10' }
  return <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"><span className={`rounded-xl p-3 ${colors[tone]}`}><Icon size={20} /></span><div><p className="text-2xl font-bold">{value}</p><p className="text-xs uppercase tracking-wider text-gray-500">{label}</p></div></div>
}

const ProductRow = ({ product, onEdit, onDelete, onStockChange }) => {
  const image = product.images?.[0]
  return <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="flex min-w-0 flex-1 items-center gap-4"><div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white/10">{image ? <img src={image} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-gray-600"><ImagePlus size={20} /></div>}</div><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate font-semibold">{product.name}</h3>{product.isFeatured && <Star size={14} fill="currentColor" className="text-primary" />}</div><p className="mt-1 text-sm capitalize text-gray-500">{product.category?.replace('-', ' ')} <span className="px-1">·</span> ৳{product.price}</p><div className="mt-2 flex flex-wrap gap-2 text-xs"><span className={`rounded-full px-2 py-1 ${product.isActive ? 'bg-emerald-300/10 text-emerald-300' : 'bg-white/10 text-gray-500'}`}>{product.isActive ? 'Live' : 'Hidden'}</span><span className={`rounded-full px-2 py-1 ${product.stock === 0 ? 'bg-red-300/10 text-red-300' : product.stock <= 5 ? 'bg-yellow-300/10 text-yellow-300' : 'bg-white/10 text-gray-400'}`}>{product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}</span></div></div></div><div className="flex items-center justify-between gap-2 border-t border-white/10 pt-3 sm:border-0 sm:pt-0"><div className="flex items-center rounded-lg border border-white/10"><button onClick={() => onStockChange(product, -1)} disabled={product.stock === 0} className="px-3 py-2 text-gray-400 hover:text-white disabled:opacity-30" aria-label={`Decrease stock for ${product.name}`}>-</button><span className="min-w-8 text-center text-sm">{product.stock}</span><button onClick={() => onStockChange(product, 1)} className="px-3 py-2 text-gray-400 hover:text-white" aria-label={`Increase stock for ${product.name}`}>+</button></div><button onClick={() => onEdit(product)} className="rounded-lg p-2.5 text-gray-400 hover:bg-white/10 hover:text-primary" aria-label={`Edit ${product.name}`}><Edit3 size={17} /></button><button onClick={() => onDelete(product._id)} className="rounded-lg p-2.5 text-gray-400 hover:bg-white/10 hover:text-red-300" aria-label={`Delete ${product.name}`}><Trash2 size={17} /></button></div></div></article>
}

const Field = ({ label, name, value, onChange, type = 'text', required, textarea, placeholder, min }) => <label className="mb-4 block text-xs text-gray-400">{label}{textarea ? <textarea name={name} value={value} onChange={onChange} required={required} rows="3" placeholder={placeholder} className="mt-2 w-full rounded-lg border border-white/10 bg-dark p-3 text-sm text-white outline-none placeholder:text-gray-700 focus:border-primary" /> : <input name={name} value={value} onChange={onChange} type={type} min={min} required={required} placeholder={placeholder} className="mt-2 w-full rounded-lg border border-white/10 bg-dark p-3 text-sm text-white outline-none placeholder:text-gray-700 focus:border-primary" />}</label>

const Toggle = ({ name, checked, onChange, label }) => <label className="flex cursor-pointer items-center justify-between text-sm text-gray-300"><span className="flex items-center gap-2">{checked ? <Check size={15} className="text-primary" /> : <X size={15} className="text-gray-600" />}{label}</span><input type="checkbox" name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-yellow-500" /></label>

export default AdminDashboard
