import Bedroom from "@/app/bedroom/bedroom"
import Cart from "@/app/cart"
import Dining from "@/app/dining/dining"
import Home from "@/app/home/home"
import Living from "@/app/living/living"
import Office from "@/app/office/office"
import Outdoor from "@/app/outdoor/outdoor"
import Product from "@/app/product"
import Products from "@/app/products/products"
import { Route, Routes } from "react-router-dom"
import MainLayout from "../layout/mainLayout"

export default function Approute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route element={<MainLayout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/living" element={<Living />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/bedroom" element={<Bedroom />} />
          <Route path="/outdoor" element={<Outdoor />} />
          <Route path="/office" element={<Office />} />
        </Route>
      </Routes>
    </>
  )
}
