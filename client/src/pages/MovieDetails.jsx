import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { malayalamMovies } from "../constants";
import { dummyDateTimeData } from "../assets/assets";
import styles from "../style";
import { Heart, PlayCircle, Star } from "lucide-react";
import DateSelect from "../components/DateSelect";
import BlurCircle from "../components/BlurCircle";

const MovieDetails = () => {
  const { id } = useParams();
  // Fetch movie details using the id
  const [show, setShow] = React.useState(null);

  const getShow = async () => {
    const show = malayalamMovies.find((movie) => movie.id === parseInt(id));
    if (show) {
      setShow({ movie: show, dataTime: dummyDateTimeData });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div
      className={`${styles.paddingX} ${styles.flexCenter} flex-col mt-20 ${styles.paddingY} relative overflow-hidden`}
    >
      <BlurCircle top="200px" right="-50px"/>
      <BlurCircle top="400px" left="-50px"/>
      <div className="flex flex-col md:flex-row items-start w-full gap-8 max-w-6xl mx-auto">
        <div className="max-md:mx-auto">
          <img
            src={show.movie.image}
            alt=""
            className="h-104 max-w-70 rounded-2xl"
          />
        </div>
        <div>
          <p className="uppercase text-secondary font-semibold mt-8">
            Malayalam
          </p>
          <h1 className="text-4xl font-bold mt-3">{show.movie.title}</h1>
          <div className="flex gap-2 items-center mt-3">
            <Star className="w-4 h-4 text-secondary" />
            <p>{show.movie.rating}</p>
            <p>User Rating</p>
          </div>
          <p className="mt-2 opacity-70 max-w-3xl">{show.movie.description}</p>
          <div className="flex gap-2 items-center mt-4 ">
            <p>{show.movie.duration}</p>
            &#9679;
            <p>{show.movie.genre}</p> &#9679;
            <p>{show.movie.year}</p>
          </div>
          <div className="flex gap-4 items-center mt-5">
            <button className="flex items-center gap-2 bg-primary px-4 py-3 rounded-lg">
              <PlayCircle />
              Watch Trailer
            </button>
            <button className="flex items-center gap-2 bg-secondary text-primary px-4 py-3 rounded-lg">
              <a href="#date-select">Buy Tickets</a>
            </button>
            <div className="bg-primary p-3 rounded-full">
              <Heart className="text-secondary  w-6 h-6 " />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 max-w-6xl mx-auto w-full">
        <h2 className="text-xl font-bold">Cast Details</h2>
        <div className="overflow-x-auto pb-4 no-scrollbar mt-8 ">
          <div className="flex items-center gap-4 w-max px-4">
            {show.movie.cast.map((cast, index) => (
              <div
                className="flex flex-col items-center gap-4 mb-4 w-25"
                key={index}
              >
                <img
                  src={cast.image}
                  alt={cast.name}
                  className="h-20 md:h-25 aspect-square rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-sm font-semibold">
                    {cast.character.slice(0, 10)}...
                  </h3>
                  <p className="text-xs text-secondary">
                    {cast.actor.slice(0, 10)}..
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DateSelect dataTime={show.dataTime} id={id} />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl text-center font-bold">Loading...</h1>
    </div>
  );
};

export default MovieDetails;
