import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/axios'
import useCartStore from '../store/cartStore'
import { fallbackImage } from '../constants/product'

const ProductDetails = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    api.get(`/products/slug/${slug}`).then(({ data }) => setProduct(data)).catch(() => setProduct(false))
  }, [slug])

  if (product === null) return <main className="min-h-screen bg-dark px-6 py-32 text-center text-gray-400">Loading product...</main>
  if (!product) return <main className="min-h-screen bg-dark px-6 py-32 text-center text-white"><h1 className="text-3xl font-bold">Product not found</h1><Link to="/products" className="mt-6 inline-block text-primary">Back to collection</Link></main>

  const images = product.images?.length ? product.images : [fallbackImage]
  const addToCart = () => {
    addItem({ id: product._id, name: product.name, price: product.price, image: images[selectedImage], stock: product.stock, color: product.colors?.[0]?.name || 'Default' }, quantity)
    toast.success(`${quantity} item${quantity > 1 ? 's' : ''} added to your bag`)
  }

  return <main className="min-h-screen bg-dark px-4 pb-24 pt-12 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl"><Link to="/products" className="mb-10 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary"><ArrowLeft size={16} /> Back to collection</Link>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="lg:sticky lg:top-24"><div className="aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"><img src={images[selectedImage]} alt={product.name} className="h-full w-full object-cover" /></div><div className="mt-4 flex gap-3 overflow-auto">{images.map((image, index) => <button key={image} onClick={() => setSelectedImage(index)} className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}><img src={image} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" /></button>)}</div></div>
        <div className="pt-2"><p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">{product.category?.replace('-', ' ')}</p><h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{product.name}</h1><div className="mt-5 flex items-center gap-3"><span className="text-3xl font-bold text-primary">৳{product.price}</span>{product.comparePrice > product.price && <span className="text-lg text-gray-500 line-through">৳{product.comparePrice}</span>}<span className="ml-2 flex items-center gap-1 text-sm text-gray-400"><Star size={15} fill="currentColor" className="text-primary" /> {product.rating || 'New'} ({product.numReviews || 0})</span></div><p className="mt-7 text-lg leading-8 text-gray-400">{product.description}</p>
          <div className="my-8 grid gap-3 border-y border-white/10 py-6 sm:grid-cols-2">{(product.features || []).map((feature) => <div key={feature} className="flex items-center gap-2 text-gray-300"><Check size={17} className="text-primary" /> {feature}</div>)}</div>
          <div className="flex flex-wrap items-center gap-4"><div className="flex items-center rounded-full border border-white/15"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-gray-400 hover:text-white"><Minus size={16} /></button><span className="w-8 text-center">{quantity}</span><button onClick={() => setQuantity(Math.min(product.stock || 1, quantity + 1))} className="p-3 text-gray-400 hover:text-white"><Plus size={16} /></button></div><button onClick={addToCart} disabled={!product.stock} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-bold text-dark transition hover:bg-primary-light disabled:opacity-50"><ShoppingBag size={19} /> {product.stock ? 'Add to bag' : 'Sold out'}</button></div><p className="mt-5 text-sm text-gray-500">{product.stock ? `${product.stock} available now` : 'Currently unavailable'}. Cash on delivery available across Bangladesh.</p>
        </div>
      </div>
    </div>
  </main>
}

export default ProductDetails
