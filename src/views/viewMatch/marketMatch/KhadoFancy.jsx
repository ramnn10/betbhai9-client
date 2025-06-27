import React from 'react';
import BlinkingComponent from '../BlinkingComponent';
import { FaInfoCircle } from 'react-icons/fa';
import PlaceBetMobile from '../../../component/betplaceMobile/PlaceBetMobile';

const KhadoFancyComponent = ({
  inplayMatch,
  activeTab,
  KhadoFancy,
  fancyPositionObj,
  handleBackOpen,
  marketId,
  returnDataFancyObject,
  formatNumber,
  handleFancyPositionModal,
  setModalTrue,
  hiddenRows, toggleRowVisibility,
  openBets, closeRow, betSlipData, placeBet, errorMessage, successMessage, betLoading, decreaseCount, increaseCount, handleBackclose, setBetSlipData, handleButtonValues
}) => {
  return (
    inplayMatch?.isFancy && (activeTab === "fancy" || activeTab === "all") && (
      <div>
        {KhadoFancy && KhadoFancy?.length > 0 ? (
          <>
            <header className="mt-1">
              <div className="bg-[var(--secondary)] gap-2 flex justify-between items-center  relative z-0 py-1 px-2">
                <div className="flex text-white align-items-center h-100 uppercase text-[14px] font-semibold">
                  Khedo
                </div>
                <div onClick={() => setModalTrue("fancy")}>
                  <FaInfoCircle className='text-white cursor-pointer' />
                </div>
              </div>
            </header>

            <div className="grid xl:grid-cols-1 grid-cols-1">
              <div className="flex relative decoration-none border-b border-gray-300 whitespace-normal max-w-full">
                <div className="xl:w-[75%] w-[65%] flex px-2">
                  <div className="w-full leading-3 flex items-center">
                    <span className="lg:hidden flex z-20 pr-1">
                      <span className="text-black flex items-center justify-center"></span>
                    </span>
                    <span className="text-xs truncate">
                      <span className="text-sm truncate"></span>
                      <br />
                      <p></p>
                    </span>
                  </div>
                </div>
                <div className="xl:w-[25%] w-[35%] grid lg:grid-cols-3 grid-cols-2">
                  <span className="lg:block hidden lg:col-span-2">
                    <div className="py-1 flex justify-center items-center bg-[#72bbef]">
                      <div className="text-center leading-3">
                        <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">BACK</span>
                      </div>
                    </div>
                  </span>
                  <span className="lg:hidden block col-span-2">
                    <div className="py-1 flex justify-center items-center lg:bg-[#72bbef] bg-[#a7d8fd]">
                      <div className="text-center leading-3">
                        <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">BACK</span>
                      </div>
                    </div>
                  </span>
                  <span className="lg:flex items-center text-end px-1 w-full justify-end hidden z-20 text-cyan-500 text-[9px] 2xl:text-[13px] overflow-hidden"></span>
                </div>
              </div>
            </div>

            <div className="grid xl:grid-cols-1 grid-cols-1">
              {KhadoFancy?.map((commList, index) => (
                <div key={index}>
                  <div className="border-b border-gray-300 relative flex decoration-none whitespace-normal max-w-full">
                    <div className="xl:w-[75%] w-[65%] flex px-2">
                      <div className="w-full leading-3 flex items-center">
                        <span className="lg:hidden flex z-20 pr-1">
                          <span
                            onClick={() => handleFancyPositionModal({ positionData: commList })}
                            className="text-black flex items-center justify-center cursor-pointer"
                          ></span>
                        </span>
                        <span className="text-xs truncate">
                          <span className="text-[13px] truncate text-[#333333]">
                            {commList.session_name} - {commList.runsNo}
                          </span>
                          <br />
                          <p
                            className={
                              isNaN(parseFloat(fancyPositionObj[commList?.session_id]))
                                ? "text-[var(--success-color)]"
                                : parseFloat(fancyPositionObj[commList?.session_id]) > 0
                                  ? "text-[var(--success-color)]"
                                  : parseFloat(fancyPositionObj[commList?.session_id]) < 0
                                    ? "text-red-500"
                                    : "text-[var(--success-color)]"
                            }
                          >
                            {fancyPositionObj[commList?.session_id]
                              ? (Math.floor(Number(fancyPositionObj[commList?.session_id]) * 100) / 100).toFixed(2)
                              : ''}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="xl:w-[25%] w-[35%] grid lg:grid-cols-3 grid-cols-1">
                      <span
                        className="lg:block lg:col-span-2 hidden cursor-pointer"
                        onClick={() => {
                          toggleRowVisibility(commList.session_id);
                          handleBackOpen({
                            data: commList,
                            type: "Yes",
                            odds: commList.oddsYes,
                            name: commList.session_name,
                            nameSession: commList.session_name,
                            betFor: "fancy",
                            oddsType: "fancy",
                            betType: "Y",
                            run: commList.runsYes,
                            selectionId: commList.session_id,
                            betfairMarketId: marketId,
                            price: commList.runsYes,
                            size: commList.oddsYes,
                            position: returnDataFancyObject,
                          });
                        }}
                      >
                        <BlinkingComponent
                          price={commList.runsYes}
                          size={(commList.oddsYes * 100).toFixed(2).replace(/\.00$/, "")}
                          color={"bg-[#72bbef]"}
                          blinkColor={"bg-[#00B2FF]"}
                          textColors={"text-black"}
                          boderColors={"border-[#489bbd]"}
                        />
                      </span>
                      <span
                        className="cursor-pointer lg:hidden block col-span-2"
                        onClick={() => {
                          toggleRowVisibility(commList.session_id);
                          handleBackOpen({
                            data: commList,
                            type: "Yes",
                            odds: commList.oddsYes,
                            name: commList.session_name,
                            nameSession: commList.session_name,
                            betFor: "fancy",
                            oddsType: "fancy",
                            betType: "Y",
                            run: commList.runsYes,
                            selectionId: commList.session_id,
                            betfairMarketId: marketId,
                            price: commList.runsYes,
                            size: commList.oddsYes,
                            position: returnDataFancyObject,
                          });
                        }}
                      >
                        <BlinkingComponent
                          price={commList.runsYes}
                          size={(commList.oddsYes * 100).toFixed(2).replace(/\.00$/, "")}
                          color={"bg-[#a7d8fd]"}
                          blinkColor={"bg-[#00B2FF]"}
                          textColors={"text-black"}
                          boderColors={"border-[#489bbd]"}
                        />
                      </span>

                      <span className="xl:flex hidden items-center text-end px-2 gap-1 w-full justify-end z-20 text-[#000000] font-[500] text-[9px] xl:text-[5px] 2xl:text-[10px] overflow-hidden bg-gray-50">
                        <p> Min:100</p>
                        <p>Max:{formatNumber(commList?.max)}</p>
                      </span>

                      {commList && commList.running_status &&
                        (commList.running_status === "SUSPENDED" ||
                          commList.running_status === "CLOSE" ||
                          commList.running_status === "Ball Running") ? (
                        <div className="xl:w-[25%] lg:w-1/2 w-[35%] px-0.5 right-0 h-full absolute bg-[var(--suspended-color)] flex justify-center items-center z-30">
                          <div className="2xl:px-14 lg:px-14 py-2 px-2 text-nowrap rounded font-bold bg-transparent opacity-90">
                            <span className="text-red-500 xl:text-lg text-sm font-bold uppercase">
                              {commList.running_status}
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {commList?.remark &&
                    <div className="px-1 text-[#097c93] text-left text-[11px] w-full">{commList?.remark}</div>
                  }
                  {hiddenRows?.includes(commList.session_id) && (
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
              ))}
            </div>
          </>
        ) : null}
      </div>
    )
  );
};

export default KhadoFancyComponent;