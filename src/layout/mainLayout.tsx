import Navigationbar from "@/components/home/navigationbar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <>
      <div>
        <Navigationbar
          bgcolor="bg-[#FFFFFF]"
          navplaceholdercolor=""
          scrollHeight={-1}
          
        />
        <Outlet />
      </div>
    </>
  )
}
