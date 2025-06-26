import React, { useEffect, useState } from "react";
import CasinoList from "../../component/dashboard/CasinoList";
import { useNavigate, useParams } from "react-router-dom";
import { casinoListJson } from "../../config/global";
import { FaSearchPlus } from "react-icons/fa";

const CasinoLayout = () => {

  const { casino_id } = useParams()

  const casinoNameList = [
    {
      name: "All Casino",
      payload: "All_Casino",
      url: "",
      //   games: ["All Casino"],
    },
    {
      name: "Roulette",
      payload: "Roulette",
      url: "",
      //   games: ["All Casino ,Roulette"],
    },
    {
      name: "TeenPatti",
      payload: "TeenPatti",
      url: "",
      //   game: ["All Casino ,TeenPatti"],
    },
    {
      name: "Poker",
      payload: "Poker",
      url: "",
      //   game: ["All Casino ,Poker"],
    },
    {
      name: "Baccarat",
      payload: "Baccarat",
      url: "",
      //   game: ["All Casino ,Baccarat"],
    },
    {
      name: "Dragon Tiger",
      payload: "Dragon_Tiger",
      url: "",
      //   game: ["All Casino ,Dragon Tiger"],
    },
    {
      name: "Card 32",
      payload: "Card_32",
      url: "",
      //   game: ["All Casino ,Card 32"],
    },
    {
      name: "Andar Bahar",
      payload: "Andar_Bahar",
      url: "",
      //   game: ["All Casino ,Andar Bahar"],
    },
    {
      name: "Lucky_7",
      payload: "Lucky_7",
      url: "",
      //   game: ["All Casino ,Lucky 7"],
    },
    {
      name: "3 Card Judgement",
      payload: "3_Card_Judgement",
      url: "",
      //   game: ["All Casino ,3 Card Judgement"],
    },
    {
      name: "Casino War",
      payload: "Casino_War",
      url: "",
      //   game: ["All Casino ,Casino War"],
    },
    {
      name: "worli",
      payload: "worli",
      url: "",
      //   game: ["All Casino ,worli"],
    },
    {
      name: "Sports",
      payload: "Sports",
      url: "",
      //   game: ["All Casino ,Sports"],
    },
    {
      name: "Bollywood",
      payload: "Bollywood",
      url: "",
      //   game: ["All Casino ,Bollywood"],
    },
    {
      name: "Lottery",
      payload: "Lottery",
      url: "",
      //   game: ["All Casino ,Lottery"],
    },
    {
      name: "Queen",
      payload: "Queen",
      url: "",
      //   game: ["All Casino ,Queen"],
    },
    {
      name: "Race",
      payload: "Race",
      url: "",
      //   game: ["All Casino ,Race"],
    },
    {
      name: "Others",
      payload: "other",
      url: "",
      //   game: ["All Casino ,other"],
    },
  ];

  const [casinoList, setCasinoList] = useState([]);
  const navigate = useNavigate();

  const handleResponseCasino = (product) => {
    navigate(`/casino/${product.shortName}/${product.eventId}`);
  };

  useEffect(() => {
    setCasinoList(casinoListJson);
  }, []);

  const handleCasinoClick = (name) => {
    navigate(`/casino-layout/${name}`)
  }


  return (
    <div className="w-[100%] ">
      <div className="p-2 bg-[var(--primary)] text-white font-[600] flex justify-between items-center ">
        <div className="flex justify-start items-center gap-1">
          <img src='/dashbaord/casino/casino-icon.png' className="w-[20px] h-[20px]" />
          <p>CASINO</p>
        </div>

        <div className="text-white flex font-semibold gap-1 items-center text-base cursor-pointer">
          <input
            placeholder="Search here"
            className={`py-1.5 transition-all text-black duration-1000 ease-in-out bg-white `}
          // ${searchIcon ? "w-[200px] px-[10px]" : "w-0 px-0"}
          />
          <FaSearchPlus
            className="font-bold"
            size={25}
          // onClick={handleSearchIcon}
          />
        </div>
      </div>
      <div className="flex justify-between items-center overflow-x-auto whitespace-nowrap mt-1 overflow-auto bg-[#cccccc]">
        {casinoNameList?.map((element, index) => {
          return (
            <div
              onClick={() => {
                handleCasinoClick(element?.payload)
              }}
              className={`cursor-pointer text-center text-black py-1.5 font-[400] lg:text-[16px] text-[14px] px-4 ${casino_id === element.payload ? ' text-white bg-[var(--secondary)]' : ''
                }`}
            >
              {element?.name}
            </div>
          );
        })}
      </div>
      <div>
        <div className="w-[100%]  grid grid-cols-3 2xl:grid-cols-7 lg:grid-cols-6 p-1 md:grid-cols-4 2xl:gap-y-2 lg:gap-y-2 gap-y-2 2xl:gap-x- lg:gap-x-1 gap-x-1 py-1">
          {casinoList
            ?.filter((product) => product.filterKeys?.includes(casino_id))
            ?.map((product, index) => (
              <div
                key={index}
                onClick={() => handleResponseCasino(product)}
                className="shadow-lg relative  shadow-white duration-500  sm:h-[150px] md:h-[170px] lg:h-[170px]  h-[100px]"
                style={{
                  backgroundImage: `url(${product.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className="block w-full h-full cursor-pointer">
                  <div className="px-2 py-1 rounded-sm absolute -bottom-1 w-full shadow-lg bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]">
                    <p className="md:text-xs text-[8px] font-[600] text-white truncate flex items-center justify-center uppercase">
                      {product.title}
                    </p>
                  </div>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CasinoLayout;