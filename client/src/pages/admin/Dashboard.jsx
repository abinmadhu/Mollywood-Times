import { TicketCheck, DollarSign, Video, Users, Star } from "lucide-react";
import { dummyDashboardData } from "../../assets/assets";
import { useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import { formatDateString } from "../../lib/dateFormat";
import Loading from "../../components/Loading";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY_SIGN;

  const { axios, getToken, user, tmdbImageBaseUrl } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData?.totalBookings || 0,
      icon: TicketCheck,
    },
    {
      title: "Total Revenue",
      value: currency + dashboardData?.totalRevenue || 0,
      icon: DollarSign,
    },
    {
      title: "Active Shows",
      value: dashboardData?.activeShows?.length || 0,
      icon: Video,
    },
    {
      title: "Total Users",
      value: dashboardData?.totalUsers || 0,
      icon: Users,
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setDashboardData(data.dashBoardData);
        console.log(dashboardData);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return !loading ? (
    <div>
      <Title text1={"Admin"} text2={"Dashboard"} />
      {/* Overall details card */}
      <div className="mt-5 flex flex-wrap items-center gap-5 w-full">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className=" border border-secondary/20 px-4 py-3 rounded flex gap-5 justify-between items-center bg-secondary/10 max-w-50 w-full"
          >
            <div>
              <p className="text-sm">{card.title}</p>
              <h2 className="text-xl font-semibold mt-2 tracking-[2px]">
                {card.value}
              </h2>
            </div>
            <card.icon className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* active shows */}
      <div className="mt-10 w-full">
        <h2 className="font-semibold text-lg">Active shows</h2>
        <div className="flex flex-wrap gap-5 mt-5">
          {dashboardData.activeShows.map((show, index) => (
            <div
              key={index}
              className="w-55 h-full pb-4  overflow-hidden rounded-lg bg-secondary/10 border border-secondary/20 hover:-translate-y-1 transition duration-300"
            >
              <img
                src={tmdbImageBaseUrl+show.movie.poster_path}
                alt="poster"
                className="h-60 w-full object-cover"
              />
              <p className="p-2 text-nowrap truncate">{show.movie.title}</p>
              <div className="flex items-end justify-between px-2 ">
                <p className="font-semibold">
                  {currency} {show.showPrice}
                </p>
                <div className="flex items-center gap-1 text-sm ">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <p className="text-gray-300/30">
                    {show.movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
              <p className="px-2 pt-2 text-sm text-gray-500">
                {formatDateString(show.showDateTime)}
              </p>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
