import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favourite from "./pages/Favorite";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import {Toaster} from "react-hot-toast";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/addShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";


function App() {
  
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
    <Toaster />
    {/* Render Navbar and Footer only if not on admin route */}
    {!isAdminRoute && <Navbar />}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/movies/:id/:date" element={<SeatLayout />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/favorites" element={<Favourite />} />
      <Route path="/admin/*" element={<Layout />}>
        <Route index element={<Dashboard/>}/>
        <Route path="add-shows" element={<AddShows/>}/>
        <Route path="list-shows" element={<ListShows/>}/>
        <Route path="list-bookings" element={<ListBookings/>}/>
      </Route>
    </Routes>
    {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
