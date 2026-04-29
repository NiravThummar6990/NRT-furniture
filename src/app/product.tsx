import { useParams } from "react-router-dom"
import Navigationbar from "@/components/home/navigationbar"
import { ProductData } from "@/data/productData"
import { useProductContext } from "@/context/globalContext"

import { toast, Toaster } from "sonner"
import { handleAddToCart } from "@/func/func-handle-cart"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { getTodayInformation } from "@/data/todayInformation"

export default function Product() {
  const { id } = useParams<{ id: string }>()

  const { wishlisted, setWishlisted, added } = useProductContext()

  const { date, day, time } = getTodayInformation()

  const { setAdded } = useProductContext()

  const cartadded = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const productDetail = ProductData.find(
    (item) => String(item.id) === String(id)
  )

  return (
    <>
      <Navigationbar navplaceholdercolor="[#3A2F24]" bgcolor="bg-[#FFFFFF]" />
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E8] p-6 md:p-10">
        <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#E8DFD0] bg-[#FDFAF5] shadow-sm md:flex-row">
          <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-[#EDE5D8] md:min-h-[420px] md:w-80">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.35)_0%,transparent_65%)]" />

            <button
              onClick={() => setWishlisted?.(!wishlisted)}
              className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#D4C8B8] bg-white/60 backdrop-blur-sm transition-all hover:border-[#C8A882] hover:bg-white"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={wishlisted ? "#C8A882" : "none"}
                stroke={wishlisted ? "#C8A882" : "#7A6A5A"}
                strokeWidth="1.8"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>

            <div className="relative z-1 p-4">
              <img
                src={productDetail?.url}
                alt={productDetail?.name}
                className="h-56 w-56 rounded-2xl border border-white/50 object-cover shadow-md md:h-64 md:w-64"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-6 p-7 md:p-10">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-normal tracking-[2px] text-[#9B8B78] uppercase">
                Artisan Collection
              </p>
              <h1
                className="text-3xl leading-tight font-semibold text-[#2C2118] md:text-4xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {productDetail?.name}
              </h1>
              <div className="h-[1.5px] w-10 bg-[#C8A882]" />
              <p className="text-sm leading-relaxed font-light text-[#7A6A5A]">
                {productDetail?.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] tracking-[1.5px] text-[#9B8B78] uppercase">
                  Price
                </span>
                <span
                  className="text-3xl font-medium text-[#3A2F24]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {productDetail?.price}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <Button
                variant={"link"}
                onClick={() => {
                  handleAddToCart(productDetail)
                  cartadded()
                  toast("Add to cart Successfully", {
                    description: `${day} , ${date} , ${time}`,
                  })
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3A2F24] py-4 text-sm font-medium tracking-wide text-[#FDFAF5] transition-all duration-200 active:scale-[0.98]"
              >
                {added ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag />
                    Add to cart
                  </>
                )}
              </Button>

              <Toaster />

              <div className="flex gap-6 border-t border-[#EDE5D8] pt-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] tracking-[1.5px] text-[#9B8B78] uppercase">
                    Ships in
                  </span>
                  <span className="text-[13px] font-medium text-[#3A2F24]">
                    2–4 days
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] tracking-[1.5px] text-[#9B8B78] uppercase">
                    Material
                  </span>
                  <span className="text-[13px] font-medium text-[#3A2F24]">
                    Premium
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] tracking-[1.5px] text-[#9B8B78] uppercase">
                    In Stock
                  </span>
                  <span className="text-[13px] font-medium text-[#3A2F24]">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
