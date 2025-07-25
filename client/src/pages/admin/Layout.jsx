import { Outlet } from "react-router-dom"
import AdminNavbar from "../../components/admin/AdminNavbar"
import AdminSidebar from "../../components/admin/AdminSidebar"
import styles from "../../style"

const Layout = () => {
  return (
    <>
    <AdminNavbar/>
    <div className="flex">
        <AdminSidebar/>
        <div className={`${styles.paddingX} py-8 flex-1 overflow-y-auto h-[calc(100vh-64px)]`}>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Layout