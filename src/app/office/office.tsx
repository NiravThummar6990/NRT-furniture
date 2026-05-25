import FurnitureProductDisplayCard from "@/components/furniture-product-display-card";
import { OfficeProductData } from "@/data/productData";

export default function Office () {
  return (
    <>
            <div><FurnitureProductDisplayCard productData={OfficeProductData} pagetitle=" Office " className="mt-24" /></div>

    </>
  )
}
