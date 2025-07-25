import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { CheckIcon, Star, Trash } from "lucide-react";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY_SIGN;

  const [isLoading, setIsLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPrice, setShowPrice] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [dateTimeSelection, setDateTimeSelection] = useState({});

  const getNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
    setIsLoading(false);
  };

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      console.log(dateTimeSelection);
      return prev;
    });
  };

  const handleDateTimeReomove = (date, time) => {
    setDateTimeSelection(prev => {
      const filteredTimes = prev[date].filter(t => t !== time);
      if(filteredTimes.length === 0){
        const {[date]: _, ...rest} = prev;
        return rest;
      }
      return {...prev, [date]: filteredTimes}
    })
    
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  return nowPlayingMovies.length > 0 ? (
    <div>
      <Title text1={"Add"} text2={"Shows"} />
      <p className="font-medium text-lg mt-10">Now Playing</p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedMovie(item.id)}
              className="max-w-40 relative group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300"
            >
              <div className=" rounded-lg relative overflow-hidden">
                <img
                  src={item.poster_path}
                  alt=""
                  className="w-full object-cover"
                />
                <div className="absolute left-0 bottom-0 flex justify-between w-full text-sm p-2 bg-black/70">
                  <p className="flex items-center gap-1">
                    {" "}
                    <Star className="text-secondary fill-secondary w-3 h-3 " />{" "}
                    {item.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-400">
                    {(item.vote_count / 1000).toFixed(1)}k votes
                  </p>
                </div>
              </div>
              <p className="font-medium truncate">{item.title}</p>
              <p className="text-sm text-gray-400">{item.release_date}</p>
              {selectedMovie === item.id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-secondary/70 w-6 aspect-square rounded">
                  <CheckIcon
                    className="w-4 h-4 text-primary"
                    strokeWidth={2.5}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price input section */}
      <div className="mt-5">
        <label htmlFor="" className="text-sm font-medium">
          Show Price
        </label>
        <div className="flex mt-2 gap-3 text-sm border border-secondary/30 w-max px-4 py-2 rounded">
          <p className="text-gray-400 text-sm">{currency}</p>
          <input
            type="number"
            min={0}
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none"
          />
        </div>
      </div>

      {/* Date and time input section */}
      <div className="mt-5">
        <label htmlFor="" className="text-sm font-medium">
          Select Date and Time
        </label>
        <div className="flex mt-2 gap-3 text-sm border border-secondary/30 w-max p-1 pl-3 rounded">
          <input
            type="datetime-local"
            min={0}
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md text-white"
          />
          <button
            onClick={handleDateTimeAdd}
            className="bg-secondary/80 text-primary px-3 py-2 text-sm rounded cursor-pointer"
          >
            Add
          </button>
        </div>
      </div>

      {/* Display selected times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6">
          <h2>Selected Date-Time</h2>
          <ul className="mt-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date} className="my-3">
                <p className="font-medium mb-1">{date}</p>
                <div className="flex gap-5">
                   {times.map((time) => (
                  <div key={time} className="flex items-center gap-2 border max-w px-2 py-1 text-sm rounded-lg border-secondary">
                    <span>{time}</span>
                    <Trash className="w-4 h-4 text-red-700 fill-red-700" onClick={() => handleDateTimeReomove(date, time)}/>
                  </div>
                ))}
                </div>
               
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="bg-secondary text-primary px-8 py-2 mt-6 rounded hover:bg-secondary/50  transition-all cursor-pointer">
        Add Show
      </button>
    </div>
  ) : (
    <Loading />
  );
};

export default AddShows;
