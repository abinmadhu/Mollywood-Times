import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { malayalamMovies } from "../constants";
import { assets, dummyDateTimeData } from "../assets/assets";
import styles from "../style";
import isoTimeFormat from "../lib/isoTimeformat";
import { ArrowRightIcon, Clock } from "lucide-react";
import BlurCircle from "../components/BlurCircle"
import toast from "react-hot-toast"

const SeatLayout = () => {
  const groupRows = [["A", "B"], ["C", "D"],["E", "F"],["G", "H"],["I", "J"]]
  const { id, date } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [show, setShow] = React.useState(null);

  const getShow = async () => {
    const show = malayalamMovies.find((show) => show.id === parseInt(id));
    if (show) {
      setShow({
        movie: show,
        dataTime: dummyDateTimeData,
      });
    }
  };

  const handleSeatClick = (seatId) => {
     if(!selectedTime){
      return toast("Please select time before seleting the seat.")
     }
     if(!selectedSeats.includes(seatId) && selectedSeats.length>4){
      return toast("You can only select 5 seats.")
     }
     setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
  }

  const renderSeats = (row, count=9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({length:count}, (_,i) => {
          const seatId = `${row}${i+1}`;
          return(
            <button key={seatId} onClick={() => handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-secondary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-secondary text-primary"}`}>
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )

  useEffect(() => {
    getShow();
  }, [id]);

  

  return show ? (
    <div
      className={`${styles.paddingX} flex flex-col md:flex-row items-center ${styles.paddingY} md:pt-5 mt-30`}
    >
      {/* Available Timings */}
      <div className="w-60 h-max bg-secondary/10 border border-secondary/20 rounded-lg py-10 flex flex-col gap-8 relative">
      <BlurCircle top="0" left="-200px"/>
        <h1 className="font-semibold text-lg px-6">Available Timings</h1>
        <div className="flex flex-col gap-3 text-sm">
          {show.dataTime[date].map((item) => (
            <div key={item.time} onClick={() => setSelectedTime(item)} className={`flex gap-2 items-center transition-all duration-200 px-6 hover:bg-secondary/30 w-max py-2 rounded-r-lg cursor-pointer
            ${selectedTime?.time === item.time ? "bg-secondary text-primary font-semibold" : ""}
            `}>
              <Clock className="w-5 h-5"/>
              <p>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* seat layout */}
      <div className="flex-1 flex flex-col items-center max-md:mt-10">
        <BlurCircle top="600px" right="100px"/>
          <h1 className="font-bold text-xl">Select your Seat</h1>
          <img src={assets.screenImage} alt="screen" className="mt-5"/>
          <p className="opacity-50 uppercase text-sm">Screen side</p>
            <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
                {groupRows[0].map(row => renderSeats(row))}
              </div>
              <div className="grid grid-cols-2 gap-11">
                {groupRows.slice(1).map((group, index) => (
                  <div key={index}>
                    {group.map(row => renderSeats(row))}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => navigate("/my-bookings")} className="mt-20 flex items-center gap-2 bg-secondary text-primary px-5 py-2 rounded-lg font-medium cursor-pointer hover:scale-105 transition ">Proceed to Checkout <ArrowRightIcon/></button>
      </div>
    </div>
  ) : (
    <div className="flex  items-center justify-center h-screen">
      <h1 className="text-xl text-center font-bold">Loading...</h1>

    </div>
  );
};

export default SeatLayout;
