import { Link, useNavigate } from "react-router-dom";
import styles from "../style";
import { navLinks } from "../constants";
import { MenuIcon, Search, TicketPlus, X } from "lucide-react";
import { useState } from "react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  return (
    <nav
      className={`fixed top-0 left-0 flex justify-between items-center w-full ${styles.paddingX} py-5 z-100 bg-transparent`}
    >
      <div>
        <Link to={"/"} className="flex items-end">
          <span className="text-white font-bold md:text-xl text-lg md:ml-1 ml-0">
            <span className="text-secondary">M</span> Times
          </span>
        </Link>
      </div>
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center
        max-md:justify-center gap-8 min-md:px-8 py-2 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border 
        border-gray-300/20 overflow-hidden transition-width duration-300 ease-in-out ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <X
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        {navLinks.map((link) => (
          <Link
            key={link.id}
            to={link.path}
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            className="text-white font-semibold lg:text-lg text-[14px] hover:text-gray-300"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className=" max-md:hidden">
          <Search />
        </button>
        {!user ? (
          <p
            className="text-primary font-bold  bg-secondary px-3 py-1 rounded-[20px] "
            onClick={openSignIn}
          >
            Login
          </p>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus />}
                onClick={() => navigate("/bookings")}
                width={15}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        <MenuIcon
          className="w-10 h-10 md:w-8 md:h-8 text-white cursor-pointer md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
