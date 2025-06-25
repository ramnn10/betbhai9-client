import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TopHeader from "../../component/dashboard/TopHeader";
import { MdHowToVote, MdOutlineSportsEsports, MdSportsCricket } from "react-icons/md";
import { IoFootballSharp, IoTennisball } from "react-icons/io5";
import { FaFootballBall, FaHorseHead, FaMotorcycle, FaRegPlayCircle } from 'react-icons/fa';
import { IoIosColorWand } from 'react-icons/io';
import { FaBasketball, FaTableTennisPaddleBall } from "react-icons/fa6";
import InplayMatches from "../../component/dashboard/InplayMatches";
import CasinoList from "../../component/dashboard/CasinoList";
import DashboardModal from "../../component/dashboardModal/DashboardModal";
import { CiBaseball, CiBasketball } from "react-icons/ci";
import { BiCricketBall } from "react-icons/bi";
import { GiBoxingGlove, GiPoolTriangle, GiTennisRacket } from "react-icons/gi";
import { PiFootballHelmetFill } from "react-icons/pi";

export const sportlistArray = [
  {
    sportId: 4,
    sportName: "Cricket",
    icon: <BiCricketBall />,
    // image: '/dashbaord/sportsicon/balls.png',

  },
  {
    sportId: 1,
    sportName: "Football",
    icon: <IoFootballSharp />
  },
  {
    sportId: 2,
    sportName: "Tennis",
    icon: <IoTennisball />
  },
  {
    sportId: 999,
    sportName: "Election",
    icon: <MdHowToVote />
  },

]

export const AllSportsArray = [
  {
    sportName: "Inplay",
    sportId: 0,
    icons: <FaRegPlayCircle />
  },
  {
    sportName: "Cricket",
    sportId: 4,
    image: '/dashbaord/sportsicon/cricket.png',
  },
  {
    sportName: "Football",
    sportId: 1,
    image: '/dashbaord/sportsicon/football.png',
  },
  {
    sportName: "Tennis",
    sportId: 2,
    image: '/dashbaord/sportsicon/tennis.png'
  },
  {
    sportName: "Esoccer",
    sportId: 46,
    icons: <MdOutlineSportsEsports />
  },
  {
    sportName: "Horse Racing",
    sportId: 7,
    image: '/dashbaord/sportsicon/horse.png'
  },
  {
    sportName: "Greyhound Racing",
    sportId: 4339,
    image: '/dashbaord/sportsicon/greyhound.png'
  },
  {
    sportName: "Table Tennis",
    sportId: 76544645,
    image: '/dashbaord/sportsicon/tabletennis.png'
  },
  {
    sportName: "Basketball",
    sportId: 6746546548,
    // icons: <FaFootballBall />,
    image: '/dashbaord/sportsicon/basketball.png',
  },
  {
    sportName: "Boxing",
    sportId: 974556455,
    icons: <GiBoxingGlove />
  },
  {
    sportName: "Mixed Martial Arts",
    sportId: 145450,
    image: '/dashbaord/sportsicon/martialart.png',
  },
  {
    sportName: "American Football",
    sportId: 15675651,
    icons: <PiFootballHelmetFill />
  },
  {
    sportName: "Volleyball",
    sportId: 1565672,
    image: '/dashbaord/sportsicon/volleyball.png',
  },
  {
    sportName: "Badminton",
    sportId: 156568453,
    icons: <GiTennisRacket />
  },
  {
    sportName: "Snooker",
    sportId: 1578554,
    icons: <GiPoolTriangle />
  },
  {
    sportName: "Ice Hockey",
    sportId: 154585685,
    image: '/dashbaord/sportsicon/icehockey.png',
  },
  {
    sportName: "E Games",
    sportId: 15656566,
    icons: <FaFootballBall />
  },
  {
    sportName: "Politics",
    sportId: 5656565617,
    image: '/dashbaord/sportsicon/politics.png',
  },
  {
    sportName: "Futsal",
    sportId: 1565656688,
    image: '/dashbaord/sportsicon/futusal.png',
  },
  {
    sportName: "Handball",
    sportId: 156546559,
    image: '/dashbaord/sportsicon/handball.png',
  },
  {
    sportName: "Motor Sports",
    sportId: 2055656767,
    icons: <FaMotorcycle />
  },
  {
    sportName: "Kabaddi",
    sportId: 75677686721,
    image: '/dashbaord/sportsicon/kabaddi.png',
  }
];

const Dashboard = () => {

  const dashboardModalOpen = JSON.parse(localStorage?.getItem("dashboardModalOpen"));
  const { sportMatchList } = useSelector((state) => state.sport);
  const [activeAllSporttab, setactiveAllSporttab] = useState(0)
  // localStorage.getItem('dashboardActiveTabKey')
  const [matchData, setMatchData] = useState([]);
  const matchlistLocal = localStorage.getItem("matchList")
    ? JSON.parse(localStorage.getItem("matchList"))
    : null;



  useEffect(() => {
    let matchListData = matchlistLocal ? matchlistLocal : sportMatchList;
    setMatchData(matchListData);
  }, [sportMatchList]);

  return (
    <section className="overflow-hidden">
      {dashboardModalOpen && (
        <DashboardModal />
      )}

      <TopHeader activeAllSporttab={activeAllSporttab} setactiveAllSporttab={setactiveAllSporttab} matchList={matchData} />
      <InplayMatches activeTab={activeAllSporttab} matchlistItems={matchData} />
      <div className="w-full py-4">
        <CasinoList />
      </div>
    </section>
  );
};

export default Dashboard;
