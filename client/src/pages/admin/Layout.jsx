import { Outlet } from "react-router-dom"
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminSidebar from "../../components/admin/AdminSidebar"
import styles from "../../style"
import { useAppContext } from "../../context/AppContext"
import { useEffect } from "react"
import Loading from "../../components/Loading"

const Layout = () => {
  const {isAdmin, fetchIsAdmin} = useAppContext();

  useEffect(() => {
    fetchIsAdmin()
  },[])
  return isAdmin ? (
    <>
    <AdminNavbar/>
    <div className="flex overflow-y-hidden">
        <AdminSidebar/>
        <div className={`${styles.paddingX} py-8 flex-1 overflow-y-auto h-[calc(100vh-64px)]`}>
            <Outlet/>
        </div>
    </div>
    </>
  ): (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <Loading/>
    </div> 
  )
}

export default Layout