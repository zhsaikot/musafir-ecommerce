import { Link } from 'react-router-dom'
import { ArrowUpRight, ShoppingBag, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import useCartStore from '../store/cartStore'
import { fallbackImage } from '../constants/product'

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem)
  const image = product.images?.[0] || fallbackImage

  const handleAdd = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image,
      stock: product.stock,
      color: product.colors?.[0]?.name || 'Default',
    })
    toast.success('Added to your bag')
  }

  return (
    <article className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-primary/50">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
          <img src={image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          {product.isFeatured && <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-dark">Featured</span>}
        </div>
      </Link>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-primary/80">
          <span>{product.category?.replace('-', ' ')}</span>
          <span className="flex items-center gap-1 text-gray-400"><Star size={13} fill="currentColor" /> {product.rating || 'New'}</span>
        </div>
        <Link to={`/products/${product.slug}`}><h3 className="text-xl font-semibold text-white transition hover:text-primary">{product.name}</h3></Link>
        <p className="mt-2 min-h-10 text-sm leading-5 text-gray-400">{product.shortDescription || product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <span className="text-2xl font-bold text-primary">৳{product.price}</span>
            {product.comparePrice > product.price && <span className="ml-2 text-sm text-gray-500 line-through">৳{product.comparePrice}</span>}
          </div>
          <button onClick={handleAdd} disabled={!product.stock} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-dark transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50">
            <ShoppingBag size={16} /> {product.stock ? 'Add' : 'Sold out'}
          </button>
        </div>
        <Link to={`/products/${product.slug}`} className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-primary">View details <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  )
}

export default ProductCard
