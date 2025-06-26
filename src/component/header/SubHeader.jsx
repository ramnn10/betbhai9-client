import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CrashC from "../crashC/CrashC";


const menuItems = [
  { id: 1, label: "Home", url: "/", inplay: false },
  { id: 3, label: "Cricket", url: `in-play/4`, inplay: true },
  { id: 6, label: "Football", url: `in-play/1`, inplay: true },
  { id: 5, label: "Tennis", url: `in-play/2`, inplay: true },
  // { id: 2, label: "Lottery", sportId: 2005, inplay: false },
  { id: 4, label: "Casino", url: '/all-games', inplay: false },
  { id: 9, label: "SportsBook", url: '/', inplay: false },

  { id: 11, label: "Baccarat", url: "/casino-layout/Baccarat", inplay: false },
  { id: 12, label: "32 Cards", url: "/casino-layout/Card_32", inplay: false },
  { id: 13, label: "Teenpatti", url: "/casino-layout/TeenPatti", inplay: false },
  { id: 14, label: "Poker", url: "/casino-layout/Poker" },
  { id: 15, label: "Lucky 7", url: "/casino-layout/Lucky_7", inplay: false },

  { id: 16, label: "Horse Racing", url: "/", inplay: false },

  { id: 17, label: "Greyhound Racing", url: "/", inplay: false },

  { id: 18, label: "Binary", url: "/", inplay: false },

  { id: 19, label: "Kabaddi", url: "/", inplay: false },

  { id: 20, label: "Politics", url: "/", inplay: false },

  { id: 21, label: "Basketball", url: "/", inplay: false },

  { id: 22, label: "Baseball", url: "/", inplay: false },

  { id: 8, label: "Table Tennis", url: "in-play/3232", inplay: true },


  { id: 23, label: "Volleyball", url: "/", inplay: false },

  { id: 24, label: "Icehockey", url: "/", inplay: false },
  { id: 25, label: "Rugby", url: "/", inplay: false },
  { id: 26, label: "Mixed Martial Arts", url: "/", inplay: false },

  { id: 27, label: "Darts", url: "/", inplay: false },
  { id: 27, label: "Futsal", url: "/", inplay: false },



];

const SubHeader = () => {
  const [activeBar, setActiveBar] = useState(null);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const sportData = JSON.parse(localStorage.getItem("matchList"));

  const onClickHomeMenu = (url) => {
    navigate(url);
    setNavbarOpen(!navbarOpen);
  };

  const onClickMenu = (pathName) => {
    // navigate.push(`/app/game-list/${sportId}`);
    navigate(pathName)
    setNavbarOpen(!navbarOpen);
  };


  return (
    <>
      <div className="bg-[var(--secondary)] text-white xl:flex hidden font-bold text-[14px] py-2.5">
        <div
          className="items-center flex overflow-x-auto whitespace-nowrap scrollbar-height-0 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {menuItems?.map((item) => {
            const isActive = activeBar === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {

                  if (item.url) {
                    onClickHomeMenu(item.url);
                  }
                  setActiveBar(item.id);
                }}
                className={`group px-[14px] uppercase  relative cursor-pointer  ${isActive
                  ? "hover:text-white border-white border-b-2 transition-all duration-150 group"
                  : "bg-transparent cd"
                  } cursor-pointer `}
              >
                {item.label}
              </div>
            );
          })}
          {/* <div className="w-12 h-6 hover:border-white hover:border-b-2 transition-all duration-150 relative">
            <CrashC /></div> */}
        </div>
      </div>
    </>
  );
};

export default SubHeader;