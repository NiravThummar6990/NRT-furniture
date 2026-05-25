import Navigationbar from "@/components/home/navigationbar"
import { Button } from "@/components/ui/button"
import { Lock, WalletCards, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const [cartData, setCartData] = useState<any[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const Data = localStorage.getItem("cart")
    setCartData(Data ? JSON.parse(Data) : [])
  }, [])

  const handleRemove = (id: number) => {
    const newCart = cartData.filter((item) => item.id !== id)
    setCartData(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const getTotal = () => {
    return cartData.reduce((acc, item) => {
      const pr =
        typeof item.price === "string"
          ? Number(item.price.replace(/[^0-9]/g, ""))
          : item.price
      return acc + pr * (item.quantity || 1)
    }, 0)
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-[#F5F0E8] px-4">
        <Navigationbar
          scrollHeight={-1}
          navplaceholdercolor=""
          bgcolor="bg-[#F5F0E8]"
        />
        <div className="mt-24 w-full max-w-3xl rounded-3xl border border-[#E8DFD0] bg-[#FDFAF5] p-6 shadow-lg">
          <h1 className="pb-4 text-center font-heading text-3xl tracking-wider text-[#2C2118] md:text-4xl">
            Shopping Cart
          </h1>

          {cartData.length === 0 ? (
            <div className="flex flex-col items-center gap-4 pb-4 text-center text-lg text-[#9B8B78]">
              <img
                src="/image/emptycartimg.png"
                alt="empty cart"
                width={140}
                height={140}
              />

              <span> Your cart is empty! </span>
              <span className="text-base">
                Start adding beautiful furniture to your cart.
              </span>
              <Button
                variant="secondary"
                onClick={() => navigate("/")}
                className="m-auto w-fit border-[#C8A882]/80 bg-white"
              >
                Buy More Product
              </Button>
            </div>
          ) : (
            <div className="space-y-10">
              {cartData.map((item) => (
                <div
                  key={item.id}
                  className="flex w-full flex-col items-center gap-6 rounded-2xl border border-[#E8DFD0] bg-white/90 p-6 shadow-sm transition hover:shadow-md md:flex-row"
                >
                  <div className="relative flex items-center justify-center">
                    <img
                      src={item.url}
                      alt={item.name}
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="h-32 w-32 cursor-pointer rounded-2xl border-2 border-[#dfcfae] bg-white object-cover shadow transition-transform"
                    />
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#eed5a7] to-[#dab27a] p-1 shadow-lg transition hover:bg-[#f7e6c4]"
                      title="Remove item"
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7A6A5A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 pl-0 md:pl-8">
                    <h2 className="font-heading text-2xl leading-tight font-medium text-[#2C2118] md:text-3xl">
                      {item.name}
                    </h2>
                    <p className="text-sm font-light text-[#7A6A5A]">
                      {item.description}
                    </p>
                    <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
                      <span className="flex items-center gap-3 rounded-lg bg-[#fcf5e2] px-3 py-1 text-lg font-semibold text-[#C8A882] shadow-sm">
                        <button
                          onClick={() => {
                            if ((item.quantity || 1) > 1) {
                              const updatedCart = cartData.map((cartItem) =>
                                cartItem.id === item.id
                                  ? {
                                      ...cartItem,
                                      quantity: (cartItem.quantity || 1) - 1,
                                    }
                                  : cartItem
                              )
                              setCartData(updatedCart)
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(updatedCart)
                              )
                            }
                          }}
                          className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                            (item.quantity || 1) <= 1
                              ? "cursor-not-allowed border-[#f7e6c4] bg-[#f7e6c4] text-[#d1b79a]"
                              : "cursor-pointer border-[#dab27a] bg-[#fcf5e2] text-[#c8a882] hover:bg-[#eed5a7]"
                          } transition`}
                          disabled={(item.quantity || 1) <= 1}
                          title="Decrease quantity"
                        >
                          <svg width="14" height="14" viewBox="0 0 20 20">
                            <rect
                              x="4"
                              y="9"
                              width="12"
                              height="2"
                              rx="1"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        {item.price}{" "}
                        <span className="text-xs font-normal text-[#a1886c]">
                          x {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => {
                            const updatedCart = cartData.map((cartItem) =>
                              cartItem.id === item.id
                                ? {
                                    ...cartItem,
                                    quantity: (cartItem.quantity || 1) + 1,
                                  }
                                : cartItem
                            )
                            setCartData(updatedCart)
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(updatedCart)
                            )
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dab27a] bg-[#fcf5e2] text-[#c8a882] transition hover:bg-[#eed5a7]"
                          title="Increase quantity"
                        >
                          <svg width="14" height="14" viewBox="0 0 20 20">
                            <rect
                              x="9"
                              y="4"
                              width="2"
                              height="12"
                              rx="1"
                              fill="currentColor"
                            />
                            <rect
                              x="4"
                              y="9"
                              width="12"
                              height="2"
                              rx="1"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </span>
                      <span className="ml-1 flex flex-row items-center gap-1 text-sm font-medium text-[#b69968]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="#b69968"
                          className="-mt-0.5 inline"
                        >
                          <path
                            d="M6 10.5l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />
                        </svg>
                        Subtotal:{" "}
                        <span className="ml-1 font-semibold text-[#C8A882]">
                          ₹
                          {(
                            parseInt(item.price.replace(/[^\d]/g, "")) *
                            (item.quantity || 1)
                          ).toLocaleString()}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-4 rounded-2xl border-t border-[#E8DFD0] bg-[#fcf7ee] px-6 py-6 shadow-inner md:flex-row md:items-center md:justify-between">
                <span className="font-heading text-lg tracking-wide text-[#99884a] md:text-xl">
                  <span className="mr-2 font-semibold text-[#2C2118]">
                    Total
                  </span>
                  ({cartData.length} {cartData.length === 1 ? "item" : "items"})
                </span>
                <span className="ml-0 font-heading text-[2rem] font-bold tracking-wide text-[#C8A882] md:ml-2">
                  ₹{getTotal().toLocaleString()}
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-end">
                <button
                  onClick={() => {
                    localStorage.removeItem("cart")
                    setCartData([])
                  }}
                  className="mr-0 inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#C8A882]/80 bg-white px-6 py-3 font-heading text-lg text-[#A57248] shadow transition hover:border-[#C8A882] hover:bg-[#f0e5ce] md:mr-4"
                >
                  <X />
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="mr-0 inline-flex items-center justify-center gap-3 rounded-lg border-2 border-[#C8A882]/80 bg-white px-6 py-3 font-heading text-lg text-[#A57248] shadow transition hover:border-[#C8A882] hover:bg-[#f0e5ce] md:mr-4"
                >
                  <WalletCards size={20} />
                  Buy More
                </button>
                <button className="inline-flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-primary to-[#cbaa78] px-8 py-3 font-heading text-lg text-white shadow-xl transition-all hover:scale-[1.03] hover:from-[#cbaa78] hover:to-primary">
                  <Lock size={20} />
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
