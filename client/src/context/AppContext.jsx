import { useAuth, useUser } from "@clerk/clerk-react";
import {  createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const {user} = useUser();
    const {getToken} = useAuth();
    const location = useLocation()
    const navigate = useNavigate();
    const tmdbImageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
    
    

    const fetchIsAdmin = async () => {
        try {
            const {data} = await axios.get('/api/admin/is-admin', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });
            
            setIsAdmin(data.isAdmin);

            if(!data.isAdmin && location.pathname.startsWith('/admin')){
                navigate('/');
                toast.error("You are not authorized to access admin dashboard.")
            }
        } catch (error) {
            console.log(error);
            toast.error("some error occured")
        }
    }

    // to fetch shows from the backend
    const fetchShows = async () => {
        try {
            const {data} = await axios.get('/api/show/all');
            if(data.success){
                setShows(data.shows)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error fetching shows:", error);
            
        }
    }

    // fetch favorites movies of user
    const fetchFavoriteMovies = async () => {
        try {
            const {data} = await axios.get('/api/user/favorites', {headers: {
                Authorization: `Bearer ${await getToken()}`
            }})
            if(data.success){
                setFavoriteMovies(data.movies)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error fetching favorite movies:", error);
        }
    }

    useEffect(() => {
        fetchShows()
    },[])

    useEffect(() => {
        if(user){
            fetchIsAdmin();
            fetchFavoriteMovies();
            
            
        }
    },[user])
      
    const value = {
        axios,
        fetchIsAdmin,user,getToken, navigate, isAdmin,tmdbImageBaseUrl,shows, favoriteMovies,fetchFavoriteMovies
    }
     return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
     )
}

export const useAppContext = () => useContext(AppContext);