import React, { useEffect, useState } from "react";
import { dummyShowsData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { formatDateString } from "../../lib/dateFormat";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY_SIGN;

  const [show, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);
  return !loading ? (
    <div>
      <Title text1={"List"} text2={"Shows"} />
      <div className="max-w-4xl overflow-x-auto mt-6">
        <table className="w-full text-nowrap overflow-hidden border-collapse rounded-md">
          <thead>
            <tr className="bg-secondary/20 text-left text-white">
              <th className="p-2 font-medium pl-2">Movie Name</th>
              <th className="p-2 font-medium">Show Time</th>
              <th className="p-2 font-medium">Total Bookings</th>
              <th className="p-2 font-medium">Earnings</th>
            </tr>
          </thead>
           <tbody className="text-sm font-light">
          {show.map((show, index) => (
            <tr
              key={index}
              className="border-b border-secondary/10 bg-secondary/5 even:bg-secondary/10"
            >
              <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
              <td className="p-2">{formatDateString(show.showDateTime)}</td>
              <td className="p-2">{Object.keys(show.occupiedSeats).length}</td>
              <td className="p-2">{currency} {Object.keys(show.occupiedSeats).length * show.showPrice}</td>
            </tr>
          ))}
        </tbody>
        </table>
       
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListShows;
