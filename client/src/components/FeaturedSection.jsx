import { ArrowRight } from "lucide-react"
import styles from "../style"
import BlurCircle from "./BlurCircle"
import { malayalamMovies } from "../constants"
import MovieCard from "./MovieCard"
import { useNavigate } from "react-router-dom"


const FeaturedSection = () => {
    const navigate = useNavigate();
  return (
    <div className={`${styles.paddingX} flex flex-col items-center w-full ${styles.paddingY} overflow-hidden`}>
        <div className="flex justify-between w-full relative">
            <BlurCircle top="0" right="-50px"/>
            <p className="text-lg">Now Showing</p>
            <p className="flex gap-2">View all <ArrowRight /> </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-8 w-full px-8 md:px-10">
            {
                malayalamMovies.slice(0,4).map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))
            }
        </div>
        <button className="mt-10 bg-secondary text-primary px-6 py-2  hover:bg-secondary/80 transition-colors" onClick={() => {navigate('/movies'); scroll(0,0)}}>
            Show More
        </button>
    </div>
  )
}

export default FeaturedSection