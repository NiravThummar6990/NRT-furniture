
import { getTodayInformation } from "@/data/todayInformation"
import { ShoppingBasket } from "lucide-react"
import { Link } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { Button } from "./ui/button"
import { handleAddToCart } from "@/func/func-handle-cart"
import type { producttype } from "@/data/productData"

export default function FurnitureProductDisplayCard({
  className,
  productData,
  pagetitle,
}: {
  className?: string
  productData: producttype[]
  pagetitle: string
}) {
  const { date, day, time } = getTodayInformation()

  return (
    <>
      <div className={`mt-12 flex flex-col ${className}`}>
        <div className="m-auto mb-4 flex w-fit items-center justify-center border-b-2 pb-4 font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-primary text-center">
          {pagetitle}
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {productData.map((i) => (
            <div
              key={i.id}
              className="flex flex-col items-center justify-between gap-2 p-4 sm:p-6 bg-white rounded-2xl transition duration-200 h-full"
            >
              <Link
                to={`/product/${i.id}`}
                className="w-full flex justify-center items-center "
              >
                <img
                  src={i.url}
                  alt={i.name}
                  className="aspect-square w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover rounded bg-[#F7F7F7]"
                  loading="lazy"
                />
              </Link>
              <span className="font-sans text-base sm:text-lg md:text-xl font-medium tracking-tight text-[#3A2F24] drop-shadow text-center">
                {i.name}
              </span>
              <div className="flex w-full items-center justify-center gap-4 ">
                <span className="flex items-center gap-1 rounded-tl-2xl rounded-br-xl bg-gradient-to-r from-[#f9e7c5] via-[#f4ecd8] to-[#f6e2bb] px-4 py-1.5 text-base font-semibold text-[#a67c52] shadow-sm">
                  {i.price}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    aria-label={`Add ${i.name} to cart`}
                    className="flex items-center gap-2 rounded-tr-xl rounded-bl-xl bg-gradient-to-r from-[#ede1ce] to-[#e1d2bc] px-4  text-sm font-semibold text-[#2b1e11] shadow-none hover:scale-105 transition-transform duration-150 min-w-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => {
                      handleAddToCart(i)
                      toast("Added to cart!", {
                        description: (
                          <span className="text-black font-medium">
                            {day}, {date} at {time}
                          </span>
                        ),
                      })
                    }}
                  >
                    <ShoppingBasket className="w-2 h-2" />
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