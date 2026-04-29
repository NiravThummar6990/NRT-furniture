"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ShoppingBasket } from "lucide-react"
import { handleAddToCart } from "@/func/func-handle-cart"
import type { producttype } from "@/data/productData"

export function SonnerDemo({ id, name }: { id: producttype; name?: string }) {
  return (
    <Button
      variant="outline"
      className="border-none "
      onClick={() => {
        handleAddToCart(id)
        toast("Add to cart Successfully", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }}
    >
      {name ? name : <ShoppingBasket />}
    </Button>
  )
}
