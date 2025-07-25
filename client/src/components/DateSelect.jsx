import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const DateSelect = ({ dataTime, id }) => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = React.useState(null);

    const onBookingHandle = () => {
        if(!selectedDate) {
            toast("Please select a date to book");
            return;
        }
        navigate(`/movies/${id}/${selectedDate}`);
        scroll(0,0);
    }

  return (
    <div id="date-select" className="pt-30 w-full">
      <div className="flex flex-col items-center justify-between md:flex-row w-full p-8 bg-secondary/10 rounded-lg border border-secondary/20">
        <div>
          <h1 className="text-lg font-semibold">Choose Date</h1>
          <div className="flex gap-4 mt-4 items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-secondary cursor-pointer " />
            <div className="flex gap-4 mt-4 flex-wrap items-center justify-center">
                {Object.keys(dataTime).map((date, index) => (
              <button className={`flex flex-col items-center gap-1 border-2 px-5 py-3 rounded-lg border-secondary/20 font-semibold ${selectedDate === date ? "bg-secondary text-primary": ""}`} 
              onClick={() => setSelectedDate(date)}
              key={index}>
                <span>{new Date(date).getDate()}</span>
                <span>
                  {new Date(date).toLocaleDateString("en-us", {
                    month: "short",
                  })}
                </span>
              </button>
            ))}
            </div>
            
            <ChevronRight className="w-6 h-6 text-secondary cursor-pointer" />
          </div>
        </div>
        <button className="bg-secondary text-primary px-4 py-3 rounded-lg mt-4 md:mt-0" onClick={onBookingHandle}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
