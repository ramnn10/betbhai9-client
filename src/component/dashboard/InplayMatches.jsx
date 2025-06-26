/* eslint-disable react/prop-types */
import { LiaDesktopSolid } from "react-icons/lia";
import { FaFacebookF, FaLock } from "react-icons/fa6";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { TbDeviceTvOld } from "react-icons/tb";
import BetLocked from "../casinoComponent/BetLocked";
import { FaFutbol, FaTv } from "react-icons/fa";
import { MdSportsTennis } from "react-icons/md";
import { useParams } from "react-router-dom";

function InplayMatches({ activeTab, matchlistItems }) {

  const [subTab, setSubTab] = useState('0');
  const implayMatchFunc = (element) => {
    const inputMoment = moment(element?.matchDate, "DD-MM-YYYY HH:mm:ss A");
    const currentMoment = moment().add(60, "minutes");
    return currentMoment.isSameOrAfter(inputMoment);
  };
  const { gameId } = useParams();
  const currentMoment = moment();

  const filteredMatches = matchlistItems
    ?.filter((element) => {
      if (activeTab === 0) {
        return (
          element.status === "INPLAY" &&
          currentMoment.isSameOrAfter(moment(element.matchDate, "DD-MM-YYYY HH:mm:ss"))
        );
      } else {
        return element.sportId == activeTab;
      }
    })
    .sort((a, b) =>
      moment(a.matchDate, "DD-MM-YYYY HH:mm:ss").isBefore(
        moment(b.matchDate, "DD-MM-YYYY HH:mm:ss")
      )
        ? -1
        : 1
    );

  // const filteredMatches = matchlistItems?.filter(
  //   (element) => element.sportId == activeTab
  // ).sort((a, b) => moment(a.matchDate, "DD-MM-YYYY HH:mm:ss").isBefore(moment(b.matchDate, "DD-MM-YYYY HH:mm:ss")) ? -1 : 1);


  const getSportIcon = (sportId) => {
    switch (sportId) {
      case 4: // Cricket
        return <img src='/dashbaord/cricket-black.png' className="w-[14px] h-[14px] filter invert-[1]" />;
      case 1: // Soccer
        return <img src='/dashbaord/football-black.png' className="w-[14px] h-[14px] filter invert-[1]" />;
      case 2: // Tennis
        return <img src='/dashbaord/tennis-black.png' className="w-[14px] h-[14px] filter invert-[1]" />;
      case 7: // Horse
        return <img src='/dashbaord/horseracing-black.png' className="w-[14px] h-[14px] filter invert-[1]" />;
      default:
        return null;
    }
  };

  const groupedBySeries = {};

  if (filteredMatches?.length > 0) {
    filteredMatches.forEach((match) => {
      const series = match.countryCode || "Other Series";
      if (!groupedBySeries[series]) {
        groupedBySeries[series] = [];
      }
      groupedBySeries[series].push(match);

    });
  }

  const functiongroupbyRacingmatch = (matchArray) => {
    const groupedByRacingMatch = {};
    if (matchArray?.length > 0) {
      matchArray.forEach((match) => {
        const matches = match.matchName || "Other Match";
        if (!groupedByRacingMatch[matches]) {
          groupedByRacingMatch[matches] = [];
        }
        groupedByRacingMatch[matches].push(match);

      });
    }
    return Object.entries(groupedByRacingMatch)?.map(([key, value]) => ({ key, value }))
  }

  const generateRandomThree = () => {
    const numbers = Array.from({ length: 6 }, (_, i) => i);
    const shuffled = numbers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  let content;

  useEffect(() => {
    const seriesKeys = Object.keys(groupedBySeries);
    if (seriesKeys.length > 0 && !subTab) {
      setSubTab(seriesKeys[0]);
    }
  }, [groupedBySeries, subTab]);

  useEffect(() => {
    setSubTab()
  }, [activeTab]);

  if (activeTab == 4339 || activeTab == 7) {
    content = (
      <div className=" text-gray-700 text-[16px]">
        {gameId === "7" && (
          <div className="text-lg font-[400] uppercase text-white px-2 w-fit bg-[var(--secondary)]">Horse Racing</div>
        )}
        {gameId === "4339" && (
          <div className="text-lg font-[400] uppercase text-white px-2 w-fit whitespace-nowrap bg-[var(--secondary)]">Greyhound Racing</div>
        )}
        <div className="flex items-center">
          {Object.keys(groupedBySeries)?.map((el, index) => {
            return (
              <>
                <div onClick={() => setSubTab(el)} className={`border border-r-[var(--secondary)]  ${subTab === el ? "bg-[var(--secondary)] px-4 py-1 text-white" : "bg-[#cccc] px-4 py-1 text-black"}`} key={index}>
                  {el}
                </div>
              </>
            )
          })}
        </div>
        <div className="bg-[#F2F2F2] ">
          {groupedBySeries[subTab] && functiongroupbyRacingmatch(groupedBySeries[subTab])?.length > 0 ? (
            functiongroupbyRacingmatch(groupedBySeries[subTab])?.map((match, index) => (
              <div key={index} className="flex xl:items-center p-1.5 xl:justify-start md:grid md:grid-cols-[0.5fr_1.5fr]  xl:flex-row flex-col items-start justify-between gap-1 my-0.5 border-b border-gray-300">
                <div className="flex flex-row justify-start items-center gap-2">
                  <FaTv className="text-black" />
                  <div className="xl:min-w-[400px] text-[15px] min-w-full">{match?.key}</div>
                </div>
                {<div className="xl:min-w-[400px]  min-w-full flex  flex-wrap justify-start items-center gap-1">

                  {match?.value?.map((allMatchTime, newindex) => (
                    <div onClick={() => {
                      window.location.href = `/sport-view-racing/${allMatchTime?.marketId}/${allMatchTime?.eventId}/${allMatchTime?.sportId}`
                    }} key={newindex} className="bg-[#cccc] rounded-[4px] text-black px-3 py-1 text-center cursor-pointer">
                      {moment(allMatchTime?.matchDate, 'YYYY-MM-DD HH:mm:ss', true).isValid() ? (
                        moment(allMatchTime.matchDate, 'YYYY-MM-DD HH:mm:ss').format("HH:mm")
                      ) : null}

                    </div>
                  ))}
                </div>}
              </div>
            ))
          ) : (
            <>
              <div className="lg:flex hidden justify-between px-1.5 py-1 w-full border-b border-t border-[#C6D2D8]">
                <h2 className="text-sm font-bold text-black w-[60%] px-2">Game</h2>
                <p className="w-[40%] grid grid-cols-3 text-center text-sm font-bold">
                  <span>1</span>
                  <span>X</span>
                  <span>2</span>
                </p>
              </div>
              <div className="border-b px-2 py-1 text-[13px]">
                No Records found
              </div>
            </>)}
        </div>
      </div>
    );
  } else {
    if (!filteredMatches || filteredMatches.length === 0) {
      content = (
        <>
          <div className="lg:flex hidden justify-between px-1.5 py-1 w-full border-b border-t border-[#C6D2D8]">
            <h2 className="text-sm font-bold text-black w-[60%] px-2">Game</h2>
            <p className="w-[40%] grid grid-cols-3 text-center text-sm font-bold">
              <span>1</span>
              <span>X</span>
              <span>2</span>
            </p>
          </div>
          <div className="border-b px-2 py-1 text-[13px]">
            No Records found
          </div>
        </>
      );
    } else {
      content = (
        <>
          <div className="lg:flex hidden justify-between px-1.5 py-1 w-full border-b border-t border-[#C6D2D8]">
            <h2 className="text-sm font-bold text-black w-[60%] px-1">Game</h2>
            <p className="w-[40%] grid grid-cols-3 text-center text-sm font-bold">
              <span>1</span>
              <span>X</span>
              <span>2</span>
            </p>
          </div>

          {filteredMatches?.map((element, index) => {
            // Lock only for sportId 1 or 2
            const showLock = element.sportId === 1 || element.sportId === 2;
            const lockStartIndex = showLock ? Math.floor(Math.random() * 5) : -1;

            return (
              <div
                className="divide-y divide-[#C6D2D8] border-b border-[#C6D2D8] lg:bg-white bg-[#f1f5f8] lg:pt-0 pt-1 md:pb-0 pb-1.5"
                key={index}
              >
                <div className="lg:flex w-full">
                  {/* Match info section */}
                  <div className="lg:w-[60%] w-full flex justify-between items-center">
                    <a
                      href={`/sport-view/${element?.marketId}/${element?.eventId}/${element?.sportId}`}
                      className="flex justify-start items-center cursor-pointer"
                    >
                      <span className="lg:flex justify-start items-center gap-1 hidden text-black text-sm px-2 font-normal hover:underline">
                        {activeTab === 0 && getSportIcon(element?.sportId)}
                        {element?.matchName} / {element?.matchDate}
                      </span>
                      <div className="lg:hidden block px-1">
                        <p className="text-black text-sm font-[500] hover:underline">
                          {element?.matchName}
                        </p>
                        <p className="text-[12px] text-[#FF0000] font-[400] hover:underline">
                          {element?.matchDate}
                        </p>
                      </div>
                    </a>

                    {/* Icons */}
                    <div className="flex items-center space-x-4 cursor-pointer md:px-10 px-1">
                      {implayMatchFunc(element) && (
                        <div className="bg-gray-50 shadow-lg border rounded-md h-2.5 w-2.5">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                          </span>
                        </div>
                      )}
                      {element?.isTv && <LiaDesktopSolid size={16} />}
                      {element?.isFancy && <FaFacebookF size={12} />}
                      {element?.isBookmaker && (<span className="font-bold text-[12px]">BM</span>)}
                    </div>
                  </div>

                  <div className="lg:hidden block ">
                    <p className="w-[100%] grid grid-cols-3 text-center text-sm font-bold">
                      <span>1</span>
                      <span>X</span>
                      <span>2</span>
                    </p>
                  </div>
                  <div className="lg:w-[40%] w-full grid grid-cols-6 text-sm font-bold lg:text-[#273A47] text-black">

                    {Array?.from({ length: 6 })?.map((_, i) => {
                      const isLagai = i % 2 === 0;

                      if (showLock && i === lockStartIndex + 1) {
                        return null;
                      }

                      const isLockedSpan = showLock && i === lockStartIndex;

                      return (
                        <div
                          key={i}
                          className={`relative w-full h-full ${isLockedSpan ? "col-span-2" : ""}`}
                        >
                          <div className={`${isLagai ? "bg-[var(--matchLagai)]" : "bg-[var(--matchKhai)]"} p-1 flex justify-center items-center w-full h-full`}>
                            {Math.floor(Math.random() * 100)}
                          </div>

                          {isLockedSpan && (
                            <div className="absolute top-0 left-0 bg-black/10 p-1 flex justify-center items-center w-full h-full col-span-2 cursor-not-allowed">
                              <BetLocked />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}


        </>
      );
    }
  }

  return (
    <div className="max-h-[200px]  overflow-y-auto  md:px-0 m-auto md:max-h-none md:overflow-auto">
      {content}
    </div>
  );
}

export default InplayMatches;