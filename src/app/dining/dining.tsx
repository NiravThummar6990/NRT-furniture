import FurnitureProductDisplayCard from "@/components/furniture-product-display-card";
import { DiningProductData } from "@/data/productData";

export default function Dining() {
  return (
    <>
      <div><FurnitureProductDisplayCard productData={DiningProductData} pagetitle=" Dining " className="mt-24" /></div>
      
    </>
  )
}
