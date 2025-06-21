import React, { useEffect, useState } from "react";
import CasinoList from "../../component/dashboard/CasinoList";
import { useNavigate, useParams } from "react-router-dom";
import { CasinoJson, casinoListJson, LIVE_CASINO } from "../../config/global";
import Loader from "../../component/loader/Loader";

const LiveCasino = () => {
  const [loader, setLoader] = useState(true)

  const { pageId, gameId } = useParams();


  useEffect(() => {

    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);


    return () => clearTimeout(timer);
  }, []);
  const casinoNameList = [
    {
      name: "Tembo",
      payload: "tembo",
      url: "",
      //   games: ["All Casino"],
    },
    {
      name: "Creedromz",
      payload: "creedromz",

      url: "",
      //   games: ["All Casino ,Roulette"],
    },
    {
      name: "Vivo Gaming",
      payload: "vivogaming",

      url: "",
      //   game: ["All Casino ,TeenPatti"],
    },
    {
      name: "Evolution",
      payload: "evolution",

      url: "",
      //   game: ["All Casino ,Poker"],
    },
    {
      name: "Ezugi",
      payload: "ezugi",

      url: "",
      //   game: ["All Casino ,Baccarat"],
    },
    {
      name: "Cock Fight",
      payload: "cock_fight",

      url: "",
      //   game: ["All Casino ,Dragon Tiger"],
    },
    {
      name: "jackport",
      payload: "jackport",

      url: "",
      //   game: ["All Casino ,Card 32"],
    },

  ];

  const [casinoList, setCasinoList] = useState([]);
  const navigate = useNavigate();
  const handleResponseCasino = (product) => {
    navigate(`/casino/${product.shortName}/${product.eventId}`);
  };




  useEffect(() => {
    setCasinoList(CasinoJson);
  }, []);

  const handleCasinoClick = (name) => {
    navigate(`/casino-layout/${name}`)


  }

  const matchedItem = casinoList?.find((element) => element?.payload === pageId);
  const casinoGameItem = matchedItem?.children?.find((element) => element?.sidebarPayload === gameId);


  return (
    <div className="w-[100%]  grid lg:grid-cols-[0.3fr_1.7fr] grid-cols-1 h-full">
      <div className=" lg:block hidden overflow-auto bg-[var(--secondary)]">
        {matchedItem?.children?.map((element, index) => {
      
          return (
            <div key={index}
              onClick={() => {
                navigate(`/live-casino/${pageId}/${element?.sidebarPayload}`)
              }}
              className={`text-center ${element?.sidebarPayload === gameId ? 'bg-[#0088cca5]' : ''} text-white py-1 px-2 `}
            >
              {element?.SidebarName}
            </div>
          );
        })}
      </div>
      <div>
        <div className=" lg:hidden flex  overflow-auto bg-[var(--secondary)]">
          {matchedItem?.children?.map((element, index) => {
            return (
              <div
                onClick={() => {
                  navigate(`/live-casino/${pageId}/${element?.sidebarPayload}`)

                }}
                className={`text-center whitespace-nowrap ${element?.sidebarPayload === gameId ? 'bg-[#0088cca5] font-[500]' : ''} text-white py-1 px-4 `}
              >
                {element?.SidebarName}
              </div>
            );
          })}
        </div>
        {loader ? <Loader /> : <div className="w-[100%]  grid grid-cols-3 2xl:grid-cols-7 lg:grid-cols-6 p-1 md:grid-cols-4 2xl:gap-y-2 lg:gap-y-2 gap-y-1 2xl:gap-x- lg:gap-x-1 gap-x-0.5 py-1">
          {casinoGameItem?.casinoPayload?.map((product, index) => (

            <div
              key={index}
              onClick={() => handleResponseCasino(product)}
              className="shadow-lg relative  shadow-black duration-500  sm:h-[150px] md:h-[170px] lg:h-[170px]  h-[100px]"
              style={{
                backgroundImage: `url(/livecasinoimg/${product?.sidebarPayload})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
           
              {/* <span className="block w-full h-full cursor-pointer">
                  <div className="px-2 py-1 rounded-sm absolute -bottom-1 w-full shadow-lg bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]">
                    <p className="md:text-xs text-[8px] font-[600] text-white truncate flex items-center justify-center uppercase">
                      {product.title}
                    </p>
                  </div>
                </span> */}
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};

export default LiveCasino;
