import { ProductData, type producttype } from "@/data/productData"

export default function handleSearchProduct(search: string):producttype[] {
  const searchData = ProductData.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  )

  return searchData
}
