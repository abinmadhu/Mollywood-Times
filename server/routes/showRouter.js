import express from "express";
import { addShow, getNowShowingMovies, getshow, getshows } from "../controllers/showController.js";
import { protectAdmin } from "../middleware/auth.js";


const showRouter = express.Router();

showRouter.get("/now-playing",protectAdmin, getNowShowingMovies);
showRouter.post("/add", addShow);
showRouter.get("/all", getshows)
showRouter.get("/:movieId", getshow)

export default showRouter;  