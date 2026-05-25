import FurnitureProductDisplayCard from "@/components/furniture-product-display-card";
import { BedroomProductData } from "@/data/productData";

export default function Bedroom() {
  return (
    <>
       <div><FurnitureProductDisplayCard productData={BedroomProductData} pagetitle=" Bedroom " className="mt-24" /></div>

    </>
  )
}
