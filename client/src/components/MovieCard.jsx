import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { timeFormat } from "../lib/timeFormat";


const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const {tmdbImageBaseUrl} = useAppContext();
  return (
    <div className="flex flex-col items-center bg-primary p-4">
      <div className="w-full my-4">
        <h1 className="text-white font-bold text-xl uppercase truncate">
          {movie.title}
        </h1>
      </div>
      <img
        src={tmdbImageBaseUrl+movie.poster_path}
        alt={movie.title}      
        className="object-cover h-100 max-w-[70] rounded-lg"
        onClick={() => {navigate(`/movies/${movie._id}`); scroll(0,0)}}
      />
      <div className="my-4 text-xs md:text-md h-7">
        {new Date(movie.release_date).getFullYear()} • {movie.genres.slice(0, 2).map(genre => genre.name).join(" | ")} • {timeFormat(movie.runtime)}
      </div>
      <div className="flex justify-between w-full items-center">
        <button className="bg-secondary text-primary px-4 py-2  hover:bg-secondary/80 transition-colors">
          Buy Tickets
        </button>
        <p className="flex items-center gap-2 text-sm">
          <Star className="w-3 h-3 fill-secondary" /> {movie.vote_average.toFixed(1)}{" "}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
