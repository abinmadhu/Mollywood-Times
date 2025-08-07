import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData } from "../assets/assets";
import styles from "../style";
import isoTimeFormat from "../lib/isoTimeformat";
import { ArrowRightIcon, Clock, ReceiptEuro } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";

const SeatLayout = () => {
  const { axios, getToken, user } = useAppContext();
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [show, setShow] = React.useState(null);
  const [occupiedSeats, setOccupiedSeats] = React.useState([]);

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/api/show/${id}`);
      if (data.success) {
        setShow(data);
      }
    } catch (error) {
      console.error("error while fetching show", error);
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time before seleting the seat.");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats.");
    }
    if (occupiedSeats.includes(seatId))
      return toast("Seat is already occupied, please select another one.");
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-secondary/60 cursor-pointer 
            ${selectedSeats.includes(seatId) && "bg-secondary text-primary"} ${
                occupiedSeats.includes(seatId) && "opacity-50"
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  // to get occupies seats from the backend
  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/seats/${selectedTime.showId}`
      );
      if (data.success) { 
        setOccupiedSeats(data.occupiedSeats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching occupied seats", error);
    }
  };

  // function to book tickets
  const bookTickets = async () => {
    try {
      if (!user) return toast.error("Please login to book tickets.");

      if (!selectedTime || !selectedSeats.length)
        return toast.error("Please select time and seats before booking.");

      const { data } = await axios.post(
        "/api/booking/create",
        { showId: selectedTime.showId, selectedSeats },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.message || "Something went wrong while booking tickets."
      );
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  useEffect(() => {
    if (selectedTime) {
      getOccupiedSeats()
    }
  }, [selectedTime]);

  return show ? (
    <div
      className={`${styles.paddingX} flex flex-col md:flex-row items-center ${styles.paddingY} md:pt-5 mt-30`}
    >
      {/* Available Timings */}
      <div className="w-60 h-max bg-secondary/10 border border-secondary/20 rounded-lg py-10 flex flex-col gap-8 relative">
        <BlurCircle top="0" left="-200px" />
        <h1 className="font-semibold text-lg px-6">Available Timings</h1>
        <div className="flex flex-col gap-3 text-sm">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex gap-2 items-center transition-all duration-200 px-6 hover:bg-secondary/30 w-max py-2 rounded-r-lg cursor-pointer
            ${
              selectedTime?.time === item.time
                ? "bg-secondary text-primary font-semibold"
                : ""
            }
            `}
            >
              <Clock className="w-5 h-5" />
              <p>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* seat layout */}
      <div className="flex-1 flex flex-col items-center max-md:mt-10">
        <BlurCircle top="600px" right="100px" />
        <h1 className="font-bold text-xl">Select your Seat</h1>
        <img src={assets.screenImage} alt="screen" className="mt-5" />
        <p className="opacity-50 uppercase text-sm">Screen side</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, index) => (
              <div key={index}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>
        <button
          onClick={bookTickets}
          className="mt-20 flex items-center gap-2 bg-secondary text-primary px-5 py-2 rounded-lg font-medium cursor-pointer hover:scale-105 transition "
        >
          Proceed to Checkout <ArrowRightIcon />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex  items-center justify-center h-screen">
      <Loading />
    </div>
  );
};

export default SeatLayout;
