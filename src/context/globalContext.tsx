import { createContext, useContext, useState } from "react"
import type { Dispatch, ReactNode, SetStateAction } from "react"

type ProductContextType = {
  wishlisted: boolean
  setWishlisted: Dispatch<SetStateAction<boolean>>
  added: boolean
  setAdded: Dispatch<SetStateAction<boolean>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

export const ProductContext = createContext<ProductContextType | null>(null)

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const [search, setSearch] = useState("")
  const [isSearch, setIsSearch] = useState(false)

  const value = {
    wishlisted,
    setWishlisted,
    added,
    setAdded,
    search,
    setSearch,
    isSearch,
    setIsSearch
  }

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error("useProductContext must be used within ProductProvider")
  }

  return context
}
