import FurnitureProductDisplayCard from "@/components/furniture-product-display-card";
import { LivingRoomProductData } from "@/data/productData";

export default function Living() {
  return (
    <>
      <div><FurnitureProductDisplayCard productData={LivingRoomProductData} pagetitle=" Living " className="mt-24" /></div>
    </>
  )
}
