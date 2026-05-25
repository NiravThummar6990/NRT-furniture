import Herosection from "@/components/home/herosection"
import Navigationbar from "@/components/home/navigationbar"
import ProductCategory from "@/components/home/product-category"

export default function Home() {
  return (
    <>
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden p-0">
        <img
          src="/image/qqqq.png"
          alt="Landing Background"
          className="absolute top-0 left-0 h-full w-full object-cover"
        />

        <Navigationbar
          navplaceholdercolor=""
          bgcolor="bg-[#E5DFD9]"
          scrollHeight={-1}
        />

        <div className="relative z-0 flex h-full w-full flex-col justify-center">
          <Herosection />
        </div>
      </div>

      <div className="mx-8">
        <ProductCategory />
      </div>
    </>
  )
}
