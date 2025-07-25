import React from "react";
import styles from "../style";
import ReactPlayer from "react-player";
import { dummyTrailers } from "../constants";
import BlurCircle from "./BlurCircle";
import { PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = React.useState(dummyTrailers[0]);
  return (
    <div
      className={`${styles.paddingX} flex flex-col items-center w-full ${styles.paddingY} overflow-hidden `}
    >
      <div className="max-w-[960px] ">
       
        <h1 className="text-lg font-semibold">Trailers</h1>
      </div>
      <div className="w-full mt-5 relative">
        <BlurCircle top="0" left="-50px"/>
        <ReactPlayer
          src={currentTrailer.videoUrl}
          controls={false}
          className="mx-auto max-w-full"
          style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
        />
      </div>
      <div className="group grid grid-cols-4 gap-4 lg:gap-8 mt-5 max-w-3xl">
        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            className={`cursor-pointer relative rounded-lg ${currentTrailer.videoUrl === trailer.videoUrl ? "border-2 border-secondary" : ""}
            group-hover:not-hover:opacity-50 transition-all duration-300 hover:translate-y-1`}
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt={`Trailer ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
            <PlayCircleIcon strokeWidth={1.6} className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection;
