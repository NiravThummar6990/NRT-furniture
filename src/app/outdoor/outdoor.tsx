import FurnitureProductDisplayCard from "@/components/furniture-product-display-card";
import { OutdoorProductData } from "@/data/productData";

export default function Outdoor() {
  return (
    <>
            <div><FurnitureProductDisplayCard productData={OutdoorProductData} pagetitle=" Outdoor " className="mt-24" /></div>

    </>
  )
}
