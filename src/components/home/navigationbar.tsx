import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Search } from "lucide-react"
import { useProductContext } from "@/context/globalContext"
import handleSearchProduct from "@/func/func-search-file"
import type { producttype } from "@/data/productData"

export default function Navigationbar({
  bgcolor,
  scrollHeight = window.innerHeight,
  navplaceholdercolor,
}: {
  bgcolor?: string
  scrollHeight?: number
  navplaceholdercolor: string
}) {
  type Menubar = {
    name: string
    link: string
  }

  const [showBg, setShowBg] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  // Fix: Explicitly type state as ProductType[]
  const [searchResult, setSearchResult] = useState<producttype[]>([])

  const location = useLocation()

  const { search, setSearch } = useProductContext()

  useEffect(() => {
    const handleScroll = () => {
      setShowBg(window.scrollY > scrollHeight)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollHeight])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const MenuItem: Menubar[] = [
    { name: "HOME", link: "/" },
    { name: "PRODUCTS", link: "/products" },
    { name: "LIVING", link: "/living" },
    { name: "DINING", link: "/dining" },
    { name: "BEDROOM", link: "/bedroom" },
    { name: "OUTDOOR", link: "/outdoor" },
    { name: "OFFICE", link: "/office" },
  ]

  const isActive = (link: string) => {
    if (link === "/") return location.pathname === "/"
    return location.pathname.startsWith(link)
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-2 transition-colors duration-300 md:px-8 ${
          showBg ? (bgcolor ? bgcolor : "bg-[#D2CBC3]") : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-x-8">
          <Link
            to="/"
            className="px-2 font-heading text-3xl tracking-[6px] md:px-8 md:text-[48px] md:tracking-[8px]"
          >
            NRT
          </Link>

          <div className="hidden gap-x-6 pr-4 lg:flex xl:gap-x-8">
            {MenuItem.map((i) => (
              <Link
                to={i.link}
                key={i.name}
                className={`relative cursor-pointer font-heading text-base tracking-wider transition-colors hover:text-primary active:border-b ${
                  isActive(i.link) ? "text-primary" : ""
                }`}
              >
                {i.name}
                {isActive(i.link) && (
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <InputGroup
            className={`md:text-md relative flex cursor-pointer items-center border-none bg-white p-3 px-2.5 font-heading text-sm font-medium shadow-lg transition-all md:px-4 ${
              showBg
                ? "bg-transparent text-primary hover:bg-transparent"
                : "bg-gradient-to-r from-primary to-[#cbaa78] text-white"
            }`}
          >
            <InputGroupInput
              placeholder="Search . . ."
              value={search}
              onChange={(e) => {
                const SearchResult: producttype[] = handleSearchProduct(
                  e.target.value
                )
                setSearchResult(SearchResult)
                setSearch(e.target.value)
              }}
              className={
                showBg
                  ? navplaceholdercolor
                    ? `placeholder:text-[${navplaceholdercolor}]`
                    : ""
                  : "placeholder:text-[#F5F0E8]"
              }
            />
            <InputGroupAddon
              className={
                showBg
                  ? navplaceholdercolor
                    ? `placeholder:text-[${navplaceholdercolor}]`
                    : "placeholder:text-primary"
                  : "placeholder:text-[#F5F0E8]"
              }
            >
              <Search />
            </InputGroupAddon>
            <InputGroupAddon
              className={`h-4.5 w-4.5 rounded-2xl ${searchResult.length == 0 || search == "" ? "" : "bg-[#F5F0E8]"} text-[#1F1917]`}
              align="inline-end"
            >
              {searchResult.length == 0 || search == ""
                ? ""
                : searchResult.length}
            </InputGroupAddon>
          </InputGroup>
          {search !== "" && (
            <div
              className={`absolute top-16 max-h-64 min-w-[200px] gap-2 overflow-auto bg-white p-4 shadow`}
            >
              {searchResult.length > 0 ? (
                <div>
                  {searchResult.map((e) => (
                    <div key={e.id} className="flex flex-col gap-2 p-1">
                      <Link
                        to={`/product/${e.id}`}
                        className="flex gap-2 rounded p-1 transition hover:bg-gray-100"
                        onClick={() => {
                          setSearch("")
                          setSearchResult([])
                        }}
                      >
                        <img src={e.url} alt={e.name} width={30} height={30} />
                        {e.name}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-400">No search result!</span>
              )}
            </div>
          )}

          <Button
            variant="default"
            className={`md:text-md flex items-center border-none px-3 font-heading text-sm font-medium shadow-lg transition-all hover:scale-105 md:px-4 ${
              showBg
                ? "bg-transparent text-primary hover:bg-transparent"
                : "bg-gradient-to-r from-primary to-[#cbaa78] text-white hover:from-[#cbaa78] hover:to-primary"
            }`}
          >
            <Link to="/cart" className="hidden sm:inline">
              CART
            </Link>
          </Button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] focus:outline-none lg:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-[1.5px] w-6 origin-center bg-current transition-all duration-300 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-current transition-all duration-300 ${menuOpen ? "scale-x-0 opacity-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-6 origin-center bg-current transition-all duration-300 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 flex h-full w-72 flex-col bg-[#D2CBC3] px-8 pt-24 pb-10 shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <p className="mb-8 font-heading text-xs tracking-[4px] text-[#9B8B78]">
            NAVIGATION
          </p>
          <nav className="flex flex-col gap-2">
            {MenuItem.map((i, idx) => (
              <Link
                to={i.link}
                key={i.name}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[#BFB9B0] py-2 font-heading text-2xl tracking-widest transition-colors ${
                  isActive(i.link)
                    ? "font-semibold text-primary"
                    : "text-[#3A2F24] hover:text-primary"
                }`}
                style={{ transitionDelay: menuOpen ? `${idx * 50}ms` : "0ms" }}
              >
                {isActive(i.link) ? `→ ${i.name}` : i.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <p className="font-heading text-xs tracking-[2px] text-[#9B8B78] uppercase">
              Crafted for living
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
