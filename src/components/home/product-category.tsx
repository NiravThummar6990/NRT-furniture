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
      <div className={`mt-12 flex flex-col ${className ?? ""}`}>
        <div className="m-auto mb-4 flex w-fit items-center justify-center border-b-2 pb-4 text-center font-heading text-2xl font-bold tracking-wide text-primary drop-shadow-md sm:text-3xl md:text-4xl">
          Shop All Categories
        </div>

        {/* Responsive grid: xs:1, sm:2, md:3, lg:4 */}
        <div className="xs:grid-cols-2 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-7 lg:grid-cols-4">
          {ProductData.map((i) => (
            <div
              key={i.id}
              className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 transition duration-200 sm:p-5 md:p-6"
            >
              <Link
                to={`/product/${i.id}`}
                className="flex w-full items-center justify-center"
              >
                <img
                  src={i.url}
                  alt={i.name}
                  className="aspect-square h-32 w-32 rounded-lg bg-[#F7F7F7] object-cover sm:h-36 sm:w-36 md:h-40 md:w-40"
                />
              </Link>
              <span className="text-center font-sans text-base font-medium tracking-tight text-[#3A2F24] drop-shadow sm:text-lg md:text-xl">
                {i.name}
              </span>
              <div className="flex w-full items-center justify-center gap-4">
                <span className="flex items-center gap-1 rounded-tl-2xl rounded-br-xl bg-gradient-to-r from-[#f9e7c5] via-[#f4ecd8] to-[#f6e2bb] px-4 py-1.5 text-base font-semibold text-[#a67c52] shadow-sm">
                  {i.price}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    aria-label={`Add ${i.name} to cart`}
                    className="flex min-w-0 items-center gap-2 rounded-tr-xl rounded-bl-xl bg-gradient-to-r from-[#ede1ce] to-[#e1d2bc] px-4 text-sm font-semibold text-[#2b1e11] shadow-none transition-transform duration-150 hover:scale-105 focus:ring-2 focus:ring-primary focus:outline-none"
                    onClick={() => {
                      handleAddToCart(i)
                      toast("Added to cart!", {
                        description: (
                          <span className="font-medium text-black">
                            {day}, {date} at {time}
                          </span>
                        ),
                      })
                    }}
                  >
                    <ShoppingBasket className="h-2 w-2" />
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
