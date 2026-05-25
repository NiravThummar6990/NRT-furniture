import { Link, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { BaggageClaim, Search, X } from "lucide-react"
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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
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
    // { name: "PRODUCTS", link: "/products" },
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
        <div className="flex items-center gap-x-4">
          <Link
            to="/"
            className="px-2 font-heading text-3xl tracking-[6px] md:px-3 md:text-[48px] md:tracking-[8px]"
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

        <div className="flex items-center gap-2 md:gap-4">
          {/* Search — desktop only */}
          <div className="relative hidden md:block">
            <InputGroup
              className={`flex items-center gap-2 border px-3 py-1.5 transition-all ${
                showBg
                  ? "border-[#C8A84B] bg-white"
                  : "border-white/50 bg-white/10"
              }`}
            >
              <Search
                className={`h-3.5 w-3.5 flex-shrink-0 ${showBg ? "text-[#9a8060]" : "text-white/60"}`}
              />
              <InputGroupInput
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  const SearchResult: producttype[] = handleSearchProduct(
                    e.target.value
                  )
                  setSearchResult(SearchResult)
                  setSearch(e.target.value)
                }}
                className={`w-24 bg-transparent font-heading text-sm transition-all outline-none focus:w-36 ${
                  showBg
                    ? "text-[#3F2305] placeholder:text-[#9a8060]"
                    : "text-white placeholder:text-white/50"
                }`}
              />
              {search !== "" && searchResult.length > 0 && (
                <InputGroupAddon align="inline-end">
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-sm bg-[#C8A84B] px-1 text-[10px] font-semibold text-white">
                    {searchResult.length}
                  </span>
                </InputGroupAddon>
              )}
            </InputGroup>

            {/* Search dropdown — desktop */}
            {search !== "" && (
              <div className="absolute top-10 z-50 max-h-64 min-w-[220px] overflow-auto border border-[#C8A84B]/20 bg-white shadow-lg">
                {searchResult.length > 0 ? (
                  searchResult.map((e) => (
                    <Link
                      key={e.id}
                      to={`/product/${e.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3F2305] transition hover:bg-[#FFF8E7]"
                      onClick={() => {
                        setSearch("")
                        setSearchResult([])
                      }}
                    >
                      <img
                        src={e.url}
                        alt={e.name}
                        width={28}
                        height={28}
                        className="rounded-sm object-cover"
                      />
                      <span className="font-heading">{e.name}</span>
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-[#9a8060]">
                    No results found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Search icon — mobile only (toggle) */}
          <button
            className={`flex items-center justify-center md:hidden ${showBg ? "text-[#3F2305]" : "text-white"}`}
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className={`relative flex items-center justify-center border border-[#C8A84B] p-1.5 transition-all hover:bg-[#FFF8E7] md:p-2 ${
              showBg ? "bg-white text-[#3F2305]" : "bg-white/10 text-[#C8A84B]"
            }`}
            aria-label="View Cart"
          >
            <BaggageClaim className="h-5 w-5 md:h-6 md:w-6" />
          </Link>

          {/* LOGIN + SIGN UP — desktop only */}
          <Button
            variant="ghost"
            asChild
            className="hidden rounded-none border border-[#C8A84B] bg-white px-4 py-2 font-serif text-sm font-semibold tracking-widest text-[#3F2305] transition-all hover:bg-[#FFF8E7] lg:flex"
          >
            <Link to="/login">LOGIN</Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="hidden rounded-none border border-[#C8A84B] bg-white px-4 py-2 font-serif text-sm font-semibold tracking-widest text-[#3F2305] transition-all hover:bg-[#C8A84B] hover:text-white lg:flex"
          >
            <Link to="/register">SIGN UP</Link>
          </Button>

          {/* Hamburger — mobile/tablet */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] focus:outline-none lg:hidden ${
              showBg ? "text-[#3F2305]" : "text-white"
            }`}
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

        {/* Mobile search bar — slides down when open */}
        {/* Mobile search bar — slides down when open */}
        {mobileSearchOpen && (
          <div className="relative border-t border-[#C8A84B]/20 bg-white px-4 py-3 md:hidden">
            <div className="flex items-center gap-2 border-b border-[#C8A84B] pb-2">
              <Search className="h-4 w-4 flex-shrink-0 text-[#9a8060]" />
              <input
                autoFocus
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  const SearchResult: producttype[] = handleSearchProduct(
                    e.target.value
                  )
                  setSearchResult(SearchResult)
                  setSearch(e.target.value)
                }}
                className="w-full bg-transparent font-heading text-sm text-[#3F2305] outline-none placeholder:text-[#9a8060]"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("")
                    setSearchResult([])
                  }}
                  className="text-[#9a8060]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Mobile search results — ABSOLUTE, floats over content */}
            {search !== "" && (
              <div className="absolute top-full right-0 left-0 z-[999] max-h-52 overflow-auto border border-[#C8A84B]/20 bg-white shadow-lg">
                {searchResult.length > 0 ? (
                  searchResult.map((e) => (
                    <Link
                      key={e.id}
                      to={`/product/${e.id}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3F2305] transition hover:bg-[#FFF8E7]"
                      onClick={() => {
                        setSearch("")
                        setSearchResult([])
                        setMobileSearchOpen(false)
                      }}
                    >
                      <img
                        src={e.url}
                        alt={e.name}
                        width={28}
                        height={28}
                        className="rounded-sm object-cover"
                      />
                      <span className="font-heading">{e.name}</span>
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-[#9a8060]">
                    No results found
                  </p>
                )}
              </div>
            )}
          </div>
        )}
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
                className={`border-b border-[#BFB9B0] py-2 font-heading text-xl tracking-widest transition-colors ${
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
