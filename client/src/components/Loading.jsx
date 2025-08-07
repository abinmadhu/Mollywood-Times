import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Loading = () => {

  const {nextUrl} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(nextUrl){
      setTimeout(() => {
        navigate('/'+nextUrl);
      },5000)
    }
  },[])
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#CCFF00] border-t-transparent" />
    </div>
  );
};

export default Loading;
