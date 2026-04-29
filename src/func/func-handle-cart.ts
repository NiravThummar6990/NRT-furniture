export const handleAddToCart = (product: any) => {
  if (!product) return

  const data = localStorage.getItem("cart")
  const cart = data ? JSON.parse(data) : []

  const existingItem = cart.find(
    (i: any) => String(i.id) === String(product.id)
  )

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...product, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}
