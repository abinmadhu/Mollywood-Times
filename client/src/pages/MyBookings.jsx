import { useEffect, useState } from "react";
import { dummyBookingData } from "../assets/assets";
import styles from "../style";
import { timeFormat } from "../lib/timeFormat";
import { formatDateString } from "../lib/dateFormat";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/AppContext.jsx";
import Loading from "../components/Loading.jsx";
import { Link } from "react-router-dom";


const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY_SIGN;

  const { axios, getToken, user, tmdbImageBaseUrl } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/user/bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("error while fetching bookings", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getMyBookings();
    }
  }, [user]);

  return !loading ? (
    <div
      className={`${styles.paddingX} ${styles.paddingY} flex flex-col mt-20 overflow-hidden w-full h-screen relative`}
    >
      <BlurCircle top="200px" left="100px" />
      <BlurCircle top="230px" right="-100px" />
      <h1 className="font-bold text-xl">My Bookings</h1>
      <div className="flex flex-col items-center w-full px-10 gap-4 mt-10">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="bg-secondary/10 border border-secondary/20 p-3 flex flex-col md:flex-row w-full justify-between"
          >
            {/* movie info */}
            <div className="flex flex-col md:flex-row">
              <img
                src={tmdbImageBaseUrl+item.show.movie.poster_path}
                alt="poster"
                className="md:max-w-45 aspect-video h-auto object-cover rounded"
              />
              <div className="flex flex-col items-start md:ml-6 max-md:mt-5">
                <h2 className="text-lg font-semibold">
                  {item.show.movie.title}
                </h2>
                <p className="text-sm opacity-50 mt-1">
                  {timeFormat(item.show.movie.runtime)}
                </p>
                <p className="text-sm opacity-50 mt-1 md:mt-4 ">
                  {formatDateString(item.show.showDateTime)}
                </p>
              </div>
            </div>
            {/* ticket info */}
            <div className="flex flex-col items-start md:items-end mt-5 md:mt-3 md:mr-5">
              <div className="flex items-center gap-4 mb-3 md:mb-5">
                <h1 className="font-bold md:text-xl text-lg">
                  {currency} {item.show.showPrice}
                </h1>
                {!item.isPaid && (
                  <Link to={item.paymentLink} className="bg-secondary text-primary px-3 py-1  text-xs rounded font-semibold cursor-pointer">
                    Pay Now
                  </Link>
                )}
              </div>
              <p className="text-sm text-g mb-1">
                <span className="opacity-50">Total Tickets:</span>{" "}
                {item.bookedSeats.length}
              </p>
              <p className="text-sm text-g">
                <span className="opacity-50">Seat Numbers:</span>{" "}
                {item.bookedSeats.join(",  ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <Loading/>
    </div>
  );
};

export default MyBookings;
