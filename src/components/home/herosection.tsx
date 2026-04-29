import { MoveRight } from "lucide-react"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

export default function Herosection() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full max-w-screen flex-col items-center justify-center gap-2 px-4 text-center">
      <p className="xs:text-[10px] font-heading text-[9px] tracking-[3px] text-[#9B8B78] uppercase sm:tracking-[4px]">
        Est. 2004 · Handcrafted
      </p>

      <h1 className="xs:text-3xl font-heading text-2xl leading-tight tracking-widest drop-shadow-lg sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
        Century Furniture
      </h1>

      <div className="xs:w-10 h-1/2 w-8 bg-[#C8A882] sm:h-[1.5px] sm:w-12" />

      <p className="xs:max-w-xs xs:text-base max-w-[90vw] text-center text-sm leading-relaxed text-[#000000] sm:max-w-sm sm:text-lg md:max-w-md md:text-xl">
        Elevate your space with elegant, timeless furniture built to last.
      </p>

      <div className="xs:gap-3 mt-4 flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-4">
        <Button
          variant="default"
          size="lg"
          onClick={() => navigate("/products")}
          className="group xs:gap-3 xs:px-6 xs:py-3 xs:text-base flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary/90 to-[#cbaa78]/90 px-4 py-2 font-heading text-sm font-bold text-white shadow-lg transition-all hover:from-[#cbaa78] hover:to-primary sm:w-auto sm:px-8 sm:py-4 sm:text-lg md:text-xl"
        >
          Shop Now
          <MoveRight className="xs:h-5 xs:w-5 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6" />
        </Button>
      </div>
    </div>
  )
}
