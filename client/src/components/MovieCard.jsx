import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";


const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center bg-primary p-4">
      <div className="w-full my-4">
        <h1 className="text-white font-bold text-xl uppercase">
          {movie.title}
        </h1>
      </div>
      <img
        src={movie.image}
        alt={movie.title}      
        className="object-cover h-[300px] w-full rounded-lg"
        onClick={() => {navigate(`/movies/${movie.id}`); scroll(0,0)}}
      />
      <div className="my-4 text-sm md:text-md">
        {movie.year} • {movie.genre} • {movie.duration}
      </div>
      <div className="flex justify-between w-full items-center">
        <button className="bg-secondary text-primary px-4 py-2  hover:bg-secondary/80 transition-colors">
          Buy Tickets
        </button>
        <p className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-secondary" /> {movie.rating}{" "}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
