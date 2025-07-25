import React, { useState } from 'react';
import BlinkingComponent from '../BlinkingComponent';
import CashOutSystem from '../CashoutTesting';
import { FaInfoCircle } from 'react-icons/fa';
import MatchRulesModal from '../../../component/matchRulesModal/MatchRulesModal';
import PlaceBetMobile from '../../../component/betplaceMobile/PlaceBetMobile';

const TossDataComponent = ({
  inplayMatch,
  activeTab,
  matchScoreDetails,
  isTossCoin,
  positionObj,
  handleBackOpen,
  marketId,
  returnDataObject,
  formatNumber,
  setModalTrue,
  hiddenRows, toggleRowVisibility,
  openBets, closeRow, betSlipData, placeBet, errorMessage, successMessage, betLoading, decreaseCount, increaseCount, handleBackclose, setBetSlipData, handleButtonValues

}) => {


  return (
    <>
      {inplayMatch?.isToss && (activeTab === "other" || activeTab === "all") ? (
        <>
          <div>
            {matchScoreDetails &&
              matchScoreDetails.toss_data &&
              matchScoreDetails.toss_data.length > 0 ? (
              <>
                <header className="mt-1">
                  <div className="bg-[var(--secondary)] gap-2 flex justify-between items-center  relative z-0 py-1 px-2">
                    <div className="flex justify-start items-center gap-1">
                      <div className="flex text-white align-items-center h-100 uppercase text-[14px] font-semibold">
                        toss_data
                      </div>
                      <div >
                        <CashOutSystem
                          marketList={matchScoreDetails?.toss_data}
                          positionObj={positionObj}
                          handleBackOpen={handleBackOpen}
                          toggleRowVisibility={toggleRowVisibility}
                          marketId={marketId}
                          betFor={"toss"}
                          oddsType={"toss"}
                        />
                      </div>
                    </div>
                    <div onClick={() => setModalTrue("toss")}>
                      <FaInfoCircle className='text-white cursor-pointer' />
                    </div>
                  </div>
                </header>

                <div className="flex whitespace-normal max-w-full border-b border-gray-300">
                  <div className="lg:w-1/2 xl:w-[40%] w-[65%] flex px-2">
                    <div className="w-full py-1 leading-3 flex items-center text-xs text-[#097c93]">
                      <span className="text-[12px] font-bold">
                        Max: {formatNumber(isTossCoin?.max)}
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-1/2 xl:w-[60%] w-[35%] grid grid-cols-6">
                    <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                    <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                    <span className="lg:col-span-1 col-span-3 rounded-md">
                      <div className="py-1 flex justify-center items-center lg:bg-[#72bbef] bg-[#a7d8fd]">
                        <div className="text-center leading-3">
                          <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">BACK</span>
                        </div>
                      </div>
                    </span>
                    <span className="lg:col-span-1 col-span-3 rounded-md">
                      <div className="py-1 flex justify-center items-center lg:bg-[#faa9ba] bg-[#f9c9d4]">
                        <div className="text-center leading-3">
                          <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">LAY</span>
                        </div>
                      </div>
                    </span>
                    <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                    <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                  </div>
                </div>

                <>
                  {matchScoreDetails &&
                    matchScoreDetails.toss_data &&
                    matchScoreDetails.toss_data.length > 0
                    ? matchScoreDetails.toss_data.map((commList, index) => (
                      <div key={index}>
                        <div
                          className="relative border-b border-gray-300 flex decoration-none whitespace-normal max-w-full"
                        >
                          <div className="lg:w-1/2 xl:w-[40%] w-[65%] bg-[#f2f2f2] flex px-2">
                            <div className="w-full leading-3 flex items-center">
                              <span className="text-[13px] font-bold text-[#333333]">
                                <span>{commList.team_name}</span>
                                <br />
                                <span
                                  key={index}
                                  className={
                                    positionObj[commList?.selectionId] > 0
                                      ? "text-[var(--success-color)]"
                                      : positionObj[commList?.selectionId] < 0
                                        ? "text-red-500"
                                        : "text-[var(--success-color)]"
                                  }
                                >
                                  {positionObj[commList?.selectionId]
                                    ? (Math.floor(Number(positionObj[commList?.selectionId]) * 100) / 100).toFixed(2)
                                    : ''}
                                </span>
                              </span>
                            </div>
                          </div>

                          <div className="lg:w-1/2 xl:w-[60%] w-[35%] grid grid-cols-6">
                            <span className="lg:block hidden">
                              <BlinkingComponent
                                price={0}
                                size={0}
                                color={"bg-[#b2d7f1]"}
                                blinkColor={"bg-[#CDEBEB]"}
                                textColors={"text-black"}
                                boderColors={"border-black"}
                              />
                            </span>
                            <span className="lg:block hidden">
                              <BlinkingComponent
                                price={0}
                                size={0}
                                color={"bg-[#92c9f0]"}
                                blinkColor={"bg-[#CDEBEB]"}
                                textColors={"text-black"}
                                boderColors={"border-black"}
                              />
                            </span>
                            <span
                              className="md:col-span-1 sm:col-span-2 col-span-3 md:col-start-3 lg:block hidden cursor-pointer"
                              onClick={() =>
                                handleBackOpen({
                                  data: commList,
                                  type: "Yes",
                                  odds: commList.lgaai,
                                  name: commList.team_name,
                                  betFor: "toss",
                                  oddsType: "toss",
                                  betType: "L",
                                  selectionId: commList.selectionid,
                                  betfairMarketId: marketId,
                                  price: commList.khaai * 100,
                                  size: "100",
                                  position: returnDataObject,
                                  newPosition: returnDataObject,
                                  nameOther: matchScoreDetails.toss_data,
                                })
                              }
                            >
                              <BlinkingComponent
                                price={parseFloat(commList.lgaai * 100).toFixed(2).replace(/\.?0+$/, "")}
                                size={100}
                                color={"bg-[#72bbef]"}
                                blinkColor={"bg-[#00B2FF]"}
                                textColors={"text-black"}
                                boderColors={"border-[#489bbd]"}
                              />
                            </span>

                            <span
                              className="col-span-3 lg:hidden block cursor-pointer"
                              onClick={() => {
                                toggleRowVisibility(commList.selectionid);
                                handleBackOpen({
                                  data: commList,
                                  type: "Yes",
                                  odds: commList.lgaai,
                                  name: commList.team_name,
                                  betFor: "toss",
                                  oddsType: "toss",
                                  betType: "L",
                                  selectionId: commList.selectionid,
                                  betfairMarketId: marketId,
                                  price: commList.khaai * 100,
                                  size: "100",
                                  position: returnDataObject,
                                  newPosition: returnDataObject,
                                  nameOther: matchScoreDetails.toss_data,
                                });
                              }}
                            >
                              <BlinkingComponent
                                price={parseFloat(commList.lgaai * 100).toFixed(2).replace(/\.?0+$/, "")}
                                size={100}
                                color={"bg-[#a7d8fd]"}
                                blinkColor={"bg-[#00B2FF]"}
                                textColors={"text-black"}
                                boderColors={"border-[#489bbd]"}
                              />
                            </span>
                            <span
                              className="md:col-span-1 sm:col-span-2 col-span-3 md:col-start-4 lg:block hidden cursor-pointer"
                              onClick={() =>
                                handleBackOpen({
                                  data: commList,
                                  type: "No",
                                  odds: commList.khaai,
                                  name: commList.team_name,
                                  betFor: "toss",
                                  oddsType: "toss",
                                  betType: "K",
                                  selectionId: commList.selectionid,
                                  betfairMarketId: marketId,
                                  price: commList.lgaai * 100,
                                  size: "100",
                                  position: returnDataObject,
                                  newPosition: returnDataObject,
                                  nameOther: matchScoreDetails.toss_data,
                                })
                              }
                            >
                              <BlinkingComponent
                                price={parseFloat(commList.khaai * 100).toFixed(2).replace(/\.?0+$/, "")}
                                size={100}
                                color={"bg-[#faa9ba]"}
                                blinkColor={"bg-[#FE7A7F]"}
                                textColors={"text-black"}
                                boderColors={"border-[#f996ab]"}
                              />
                            </span>

                            <span
                              className="col-span-3 lg:hidden block cursor-pointer"
                              onClick={() => {
                                toggleRowVisibility(commList.selectionid);
                                handleBackOpen({
                                  data: commList,
                                  type: "No",
                                  odds: commList.khaai,
                                  name: commList.team_name,
                                  betFor: "toss",
                                  oddsType: "toss",
                                  betType: "K",
                                  selectionId: commList.selectionid,
                                  betfairMarketId: marketId,
                                  price: commList.lgaai * 100,
                                  size: "100",
                                  position: returnDataObject,
                                  newPosition: returnDataObject,
                                  nameOther: matchScoreDetails.toss_data,
                                });
                              }}
                            >
                              <BlinkingComponent
                                price={parseFloat(commList.khaai * 100).toFixed(2).replace(/\.?0+$/, "")}
                                size={100}
                                color={"bg-[#f9c9d4]"}
                                blinkColor={"bg-[#FE7A7F]"}
                                textColors={"text-black"}
                                boderColors={"border-[#f996ab]"}
                              />
                            </span>
                            <span className="lg:block hidden">
                              <BlinkingComponent
                                price={0}
                                size={0}
                                color={"bg-[#f8bcc8]"}
                                blinkColor={"bg-[#CDEBEB]"}
                                textColors={"text-black"}
                                boderColors={"border-black"}
                              />
                            </span>
                            <span className="lg:block hidden">
                              <BlinkingComponent
                                price={0}
                                size={0}
                                color={"bg-[#f6ced6]"}
                                blinkColor={"bg-[#CDEBEB]"}
                                textColors={"text-black"}
                                boderColors={"border-black"}
                              />
                            </span>
                          </div>

                          {commList.lgaai === "0.00" || commList.lgaai === "0.000" ? (
                            <div className="xl:w-[60%] lg:w-1/2 w-[35%] px-0.5 right-0 h-full absolute bg-[var(--suspended-color)] flex justify-center items-center z-30">
                              <div className="2xl:px-14 lg:px-14 py-2 px-2 text-nowrap rounded font-bold bg-transparent opacity-90">
                                <span className="text-[#FF071B] xl:text-lg text-sm font-bold uppercase">
                                  SUSPENDED
                                </span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                        {hiddenRows?.includes(commList.selectionid) && (
                          <PlaceBetMobile
                            openBets={openBets}
                            closeRow={closeRow}
                            closeSec={commList.selectionid}
                            matchName={inplayMatch?.matchName}
                            betSlipData={betSlipData}
                            placeBet={placeBet}
                            count={betSlipData.count}
                            betLoading={betLoading}
                            increaseCount={increaseCount}
                            decreaseCount={decreaseCount}
                            handleClose={handleBackclose}
                            setBetSlipData={setBetSlipData}
                            errorMessage={errorMessage}
                            successMessage={successMessage}
                            handleButtonValues={handleButtonValues}
                          />
                        )}
                      </div>
                    ))
                    : null}
                </>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default TossDataComponent;