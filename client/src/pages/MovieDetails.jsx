import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { malayalamMovies } from "../constants";
import { dummyDateTimeData } from "../assets/assets";
import styles from "../style";
import { Heart, PlayCircle, Star } from "lucide-react";
import DateSelect from "../components/DateSelect";
import BlurCircle from "../components/BlurCircle";
import {useAppContext} from "../context/AppContext.jsx"
import MovieCard from "../components/MovieCard.jsx";
import toast from "react-hot-toast";
import Loading from "../components/Loading.jsx";

const MovieDetails = () => {
  const { id } = useParams();
  // Fetch movie details using the id
  const [show, setShow] = React.useState(null);

  const {shows, axios, getToken, user, navigate, fetchFavoriteMovies, favoriteMovies, tmdbImageBaseUrl} = useAppContext();

  const getShow = async () => {
    try {
      const {data} = await axios.get(`/api/show/${id}`);
      
      if(data.success){
        setShow(data)
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleFavorite = async () => {
    try {
      if(!user) return toast.error("Please login to add to favorites");
      const { data } = await axios.post('/api/user/update-favorites', {movieId: id}, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
      }
      })

      if(data.success){
        await fetchFavoriteMovies();
        toast.success(data.message)
        console.log(favoriteMovies);
        
      }
    } catch (error) {
      console.log(error);
    }
  }

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
            src={tmdbImageBaseUrl+show.movie.poster_path
              
            }
            alt=""
            className="h-104 max-w-70 rounded-2xl"
          />
        </div>
        <div>
          <p className="uppercase text-secondary font-semibold mt-8">
            {show.movie.original_language}
          </p>
          <h1 className="text-4xl font-bold mt-3">{show.movie.title}</h1>
          <div className="flex gap-2 items-center mt-3">
            <Star className="w-4 h-4 text-secondary" />
            <p>{show.movie.vote_average}</p>
            <p>User Rating</p>
          </div>
          <p className="mt-2 opacity-70 max-w-3xl">{show.movie.overview}</p>
          <div className="flex gap-2 items-center mt-4 ">
            <p>{show.movie.runtime}</p>
            &#9679;
            <p>{show.movie.genres.map(genre => genre.name).join(" | ")}</p> &#9679;
            <p>{new Date(show.movie.release_date).getFullYear()}</p>
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
              <Heart onClick={handleFavorite} className={`text-secondary  w-6 h-6 ${favoriteMovies?.find(movie => movie._id === id) ? "fill-secondary" : ''}` } />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 max-w-6xl mx-auto w-full">
        <h2 className="text-xl font-bold">Cast Details</h2>
        <div className="overflow-x-auto pb-4 no-scrollbar mt-8 ">
          <div className="flex items-center gap-4 w-max px-4">
            {show.movie.casts.map((cast, index) => (
              <div
                className="flex flex-col items-center gap-4 mb-4 w-25"
                key={index}
              >
                <img
                  src={tmdbImageBaseUrl+cast.profile_path}
                  alt={cast.name}
                  className="h-20 md:h-25 aspect-square rounded-full object-cover"
                />
                <div className="text-center">
                  <h3 className="text-sm font-semibold">
                    {cast.name.slice(0, 10)}...
                  </h3>
                  <p className="text-xs text-secondary">
                    {cast.character.slice(0, 10)}..
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DateSelect dataTime={show.dateTime} id={id} />
      <p className="text-lg font-medium mt-20 mb-8">You may also like</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              shows.slice(0,4).map((show, index) => (
                <MovieCard key={index} movie={show} />
              ))
            }
      </div>
      <div className="flex justify-center mt-20">
        <button 
        className="px-10 py-3 bg-secondary text-primary font-bold  cursor-pointer"
        onClick={() => {navigate('/movies'); scrollTo(0,0)}}>
          Show More
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <Loading/>
    </div>
  );
};

export default MovieDetails;
