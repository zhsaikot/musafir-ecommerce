import { useEffect, useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'

const categories = ['all', 'tasbih', 'prayer-mat', 'islamic-gift', 'accessories', 'other']

const Products = () => {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => setProducts(data))
      .catch(() => setError('Products are unavailable right now. Please try again shortly.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category
    const search = query.toLowerCase()
    return matchesCategory && (!search || `${product.name} ${product.description} ${(product.tags || []).join(' ')}`.toLowerCase().includes(search))
  }), [products, query, category])

  return (
    <main className="min-h-screen bg-dark px-4 pb-24 pt-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">The collection</p>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">Objects for a more intentional day.</h1>
          <p className="mt-5 text-lg leading-8 text-gray-400">Thoughtful tools and gifts designed around prayer, presence, and everyday rituals.</p>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-y border-white/10 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white outline-none focus:border-primary" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal size={17} className="mr-2 shrink-0 text-primary" />
            {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm capitalize transition ${category === item ? 'bg-primary font-bold text-dark' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{item.replace('-', ' ')}</button>)}
          </div>
        </div>
        {loading && <p className="py-24 text-center text-gray-400">Loading the collection...</p>}
        {error && <p className="py-24 text-center text-red-300">{error}</p>}
        {!loading && !error && filteredProducts.length === 0 && <p className="py-24 text-center text-gray-400">No products match that search.</p>}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </div>
    </main>
  )
}

export default Products
