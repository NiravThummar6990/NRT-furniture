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
        <div className="m-auto mb-4 flex w-fit items-center justify-center border-b-2 pb-4 font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-primary drop-shadow-md text-center">
          Shop All Categories
        </div>

        {/* Responsive grid: xs:1, sm:2, md:3, lg:4 */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7">
          {ProductData.map((i) => (
            <div
              key={i.id}
              className="flex flex-col items-center justify-center gap-4 p-4 sm:p-5 md:p-6 rounded-xl bg-white transition duration-200"
            >
              <Link to={`/product/${i.id}`} className="w-full flex justify-center items-center">
                <img
                  src={i.url}
                  alt={i.name}
                  className="aspect-square w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg bg-[#F7F7F7]"
                />
              </Link>
              <span className="font-sans text-base sm:text-lg md:text-xl font-medium tracking-tight text-[#3A2F24] drop-shadow text-center">
                {i.name}
              </span>
              <div className="flex flex-col xs:flex-row justify-between items-center gap-2 sm:gap-4 w-full">
                <span className="rounded-md bg-[#f4ecd8]/20 px-2 py-1 text-base sm:text-lg font-medium text-[#654321] text-center">
                  {i.price}
                </span>

                <div className="relative flex items-center">
                  <Button
                    variant="secondary"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#ede1ce] p-0 flex items-center justify-center text-[#1C1616]"
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
                    <ShoppingBasket size={22} />
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
