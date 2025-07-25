import { ArrowRight, Calendar, Clock } from "lucide-react";
import { assets } from "../assets/assets";
import styles from "../style";

const HeroSection = () => {
  return (
    <div
      className={`bg-[url("mammookka.jpg")] bg-cover bg-center h-screen ${styles.paddingX} flex flex-col items-start justify-end pb-10`}
    >
      <img src={assets.amalLogo} alt="logo" className="w-[150px]"/>
      <h1 className="text-white font-extrabold text-6xl md:text-7xl mt-2 flex items-start uppercase">
        Bheeshma <br />
        Paravam
      </h1>
      <div className="flex items-center gap-4 mt-4 tracking-[2px] text-sm md:text-lg">
        <p>Action | Drama | Thriller</p>
        <p className="flex items-center">
          <Calendar className="mr-2 w-5 h-5" />
          2022
        </p>
        <p className="flex items-center">
          <Clock className="mr-2 w-5 h-5" />
          2h 30m
        </p>
      </div>
      <p className="text-white mt-2 max-w-[478px]">
        While the Anjootti family lead life according to Michael's restrictions,
        the younger generation challenges him. However, when they ally with
        Michael's rivals, the former thug must retrace his past.
      </p>
      <button className="mt-4 flex gap-2 bg-secondary text-black px-4 py-2 font-semibold cursor-pointer hover:bg-secondary/30 hover:text-white transition">
        Explore Movies <ArrowRight />
      </button>
    </div>
  );
};

export default HeroSection;
