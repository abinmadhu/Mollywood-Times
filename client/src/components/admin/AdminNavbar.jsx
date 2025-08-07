import { Link } from "react-router-dom"
import styles from "../../style"

   

const AdminNavbar = () => {
  return (
    <div className={`${styles.paddingX} py-5 flex items-center justify-between border-b border-gray-300/30 h-[64px]`}>
       <Link to={"/"} className="flex items-end">
          <span className="text-white font-bold md:text-xl text-lg md:ml-1 ml-0">
            <span className="text-secondary">M</span> Times
          </span>
        </Link>
    </div>
  )
}

export default AdminNavbar