import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock || Infinity) }
                  : item,
              ),
            }
          }

          return { items: [...state.items, { ...product, quantity: Math.min(quantity, product.stock || Infinity) }] }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeAll: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== productId) })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'musafir-cart' },
  ),
)

export default useCartStore
