import { ProductData } from "@/data/productData"
import { handleAddToCart } from "@/func/func-handle-cart"
import { ShoppingBasket } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { Toaster } from "../ui/sonner"
import { Button } from "../ui/button"
import { getTodayInformation } from "@/data/todayInformation"

export default function ProductCategory({ className }: { className?: string }) {
  const { date, day, time } = getTodayInformation()

  return (
    <>
      <div className={`mt-12 flex flex-col ${className}`}>
        <div className="m-auto mb-4 flex w-fit items-center justify-center border-b-2 pb-4 font-heading text-4xl font-bold tracking-wide text-primary drop-shadow-md">
          Shop All Categories
        </div>

        <div className="grid grid-cols-4">
          {ProductData.map((i) => (
            <div
              key={i.id}
              className="flex flex-col items-center justify-center gap-4 p-6"
            >
              <Link to={`/product/${i.id}`}>
                <img
                  src={i.url}
                  alt={i.name}
                  className="h-50 w-50 bg-[#F7F7F7]"
                />
              </Link>
              <span className="font-sans text-xl font-medium tracking-tight text-[#3A2F24] drop-shadow">
                {i.name}
              </span>
              <div className="flex justify-between gap-4">
                <span className="rounded-md bg-[#f4ecd8]/20 px-2 py-1 text-lg font-medium text-[#654321] shadow-inner">
                  {i.price}
                </span>

                <div className="relative flex items-center">
                  <Button
                    variant="secondary"
                    className="w-10 rounded-sm bg-[#ede1ce] p-4 text-[#1C1616] shadow-sm"
                    onClick={() => {
                      handleAddToCart(i)
                      toast("Add to cart Successfully", {
                        description: (
                          <span className="text-black">
                            {day}, {date} at {time}
                          </span>
                        ),
                      })
                    }}
                  >
                    <ShoppingBasket />
                  </Button>
                  <Toaster className="text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
