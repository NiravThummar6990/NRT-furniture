import { BedroomProductData, DiningProductData, LivingRoomProductData, OfficeProductData, OutdoorProductData, ProductData, type producttype } from "@/data/productData"

export default function handleSearchProduct(search: string):producttype[] {
  const searchData = [
    ...ProductData.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ),
    ...LivingRoomProductData.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ),
    ...DiningProductData.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ),
    ...BedroomProductData.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ),
    ...OutdoorProductData.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ),
    ...OfficeProductData.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ),
  ];

  return searchData
}
