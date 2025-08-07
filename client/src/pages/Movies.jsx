import BlurCircle from "../components/BlurCircle"
import MovieCard from "../components/MovieCard"
import { malayalamMovies } from "../constants"
import { useAppContext } from "../context/AppContext"
import styles from "../style"

const Movies = () => {
  const {shows} = useAppContext();

    return shows.length > 0 ? (
    <div className={`${styles.paddingX} flex-col mt-10 ${styles.paddingY} overflow-hidden relative`}>
      <BlurCircle top="300px" right="-50px" />
      <BlurCircle top="600px" left="-50px" />
      <h1 className="text-lg font-bold mb-6">Now Showing</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-10 mt-8 w-full px-8 md:px-10">
            {
                shows.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))
            }
        </div>
    </div>
  ):
  (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl text-center font-bold">No Movies Available</h1>
    </div>
  )
}

export default Movies