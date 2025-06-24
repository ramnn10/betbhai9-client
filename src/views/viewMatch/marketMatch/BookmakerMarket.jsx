import React from 'react';
import BlinkingComponent from '../BlinkingComponent';
import CashOutSystem from '../CashoutTesting';
import { FaInfoCircle } from 'react-icons/fa';
import PlaceBetMobile from '../../../component/betplaceMobile/PlaceBetMobile';


const BookmakerComponent = ({
  inplayMatch,
  activeTab,
  bookmaker2Fancy,
  matchScoreDetails,
  isMatchCoin,
  positionObj,
  marketId,
  returnDataObject,
  returnDataFancyObject,
  toggleRowVisibility,
  handleBackOpen,
  formatNumber,
  setModalTrue,

  // openBets, closeRow, betSlipData, placeBet, errorMessage, successMessage, betLoading, decreaseCount, increaseCount,handleBackclose, setBetSlipData, handleButtonValues

}) => {
  if (!inplayMatch?.isBookmaker || !(activeTab === "bookmaker" || activeTab === "all")) {
    return null;
  }

  // const [betSlipData, setBetSlipData] = useState({
  //     stake: '0',
  //     count: 0,
  //     teamname: '',
  //     teamData: null
  // });



  return (
    <div className="w-full flex justify-start gap-2 items-center">

      <div className={`${bookmaker2Fancy?.length > 0 ? "w-[75%]" : 'w-[100%]'}`}>
        {matchScoreDetails?.team_data?.length > 0 && (
          <>
            <header className="mt-1">
              <div className="bg-[var(--secondary)] gap-2 flex justify-between items-center  relative z-0 py-1 px-2">
                <div className="flex justify-start items-center gap-1">
                  <div className="flex text-white align-items-center h-100 uppercase text-[14px] font-semibold">
                    Bookmaker
                  </div>
                  <div >
                    <CashOutSystem
                      marketList={matchScoreDetails?.team_data}
                      positionObj={positionObj}
                      handleBackOpen={handleBackOpen}
                      toggleRowVisibility={toggleRowVisibility}
                      marketId={marketId}
                      betFor={"odds"}
                      oddsType={"bookmaker"}
                    />
                  </div>
                </div>
                <div onClick={() => setModalTrue()}>
                  <FaInfoCircle className='text-white cursor-pointer' />
                </div>
              </div>
            </header>

            <div className="flex whitespace-normal max-w-full border-b border-gray-300">
              <div className="lg:w-1/2 xl:w-[40%] w-[65%] flex px-2">
                <div className="w-full py-1 leading-3 flex items-center text-xs text-[#097c93]">
                  <span className="text-[12px] font-bold">
                    Max: {formatNumber(isMatchCoin?.max)}
                  </span>
                </div>
              </div>

              <div className="lg:w-1/2 xl:w-[60%] w-[35%] grid grid-cols-6">
                <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                <span className="lg:col-span-1 col-span-3 rounded-md">
                  <div className="py-1 flex justify-center items-center bg-[#72bbef]">
                    <div className="text-center leading-3">
                      <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">BACK</span>
                    </div>
                  </div>
                </span>
                <span className="lg:col-span-1 col-span-3 rounded-md">
                  <div className="py-1 flex justify-center items-center bg-[#faa9ba]">
                    <div className="text-center leading-3">
                      <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">LAY</span>
                    </div>
                  </div>
                </span>
                <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
              </div>
            </div>
            {matchScoreDetails.team_data.map((commList, index) => (
              <div>
                <div key={index} className="relative border-b border-gray-300 flex decoration-none whitespace-normal max-w-full">
                  <div className="lg:w-1/2 xl:w-[40%] w-[65%] flex">
                    <div className="w-full leading-3 flex items-center capitalize text-[#333333]">
                      <span className="text-[13px] px-2 font-bold">
                        <span>{commList.team_name}</span>
                        <br />
                        <span className={
                          positionObj[commList?.selectionid] > 0
                            ? "text-[var(--success-color)]"
                            : positionObj[commList?.selectionid] < 0
                              ? "text-red-600"
                              : "text-[var(--success-color)]"
                        }>
                          {positionObj[commList?.selectionid]
                            ? (Math.floor(Number(positionObj[commList?.selectionid]) * 100) / 100).toFixed(2)
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
                      className="md:col-span-1 col-span-3 md:col-start-3 lg:block hidden cursor-pointer"
                      onClick={() => {
                        toggleRowVisibility(commList.selectionid);
                        handleBackOpen({
                          data: commList,
                          nameOther: matchScoreDetails.team_data,
                          type: "Yes",
                          odds: commList.lgaai,
                          name: commList.team_name,
                          betFor: "odds",
                          oddsType: "bookmaker",
                          betType: "L",
                          selectionId: commList.selectionid,
                          teamData: commList.lgaai,
                          betfairMarketId: marketId,
                          price: commList.khaai * 100,
                          size: "0",
                          position: returnDataObject,
                          newPosition: returnDataObject,
                        });
                      }}
                    >
                      <BlinkingComponent
                        price={(commList.lgaai * 100).toFixed(2)}
                        size={(commList.khaai * 100).toFixed(2)}
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
                          nameOther: matchScoreDetails.team_data,
                          type: "Yes",
                          odds: commList.lgaai,
                          name: commList.team_name,
                          betFor: "odds",
                          oddsType: "bookmaker",
                          betType: "L",
                          selectionId: commList.selectionid,
                          teamData: commList.lgaai,
                          betfairMarketId: marketId,
                          price: commList.khaai * 100,
                          size: "0",
                          position: returnDataObject,
                          newPosition: returnDataObject,
                        });
                      }}
                    >
                      <BlinkingComponent
                        price={(commList.lgaai * 100).toFixed(2)}
                        size={(commList.khaai * 100).toFixed(2)}
                        color={"bg-[#72bbef]"}
                        blinkColor={"bg-[#00B2FF]"}
                        textColors={"text-black"}
                        boderColors={"border-[#489bbd]"}
                      />
                    </span>

                    <span
                      className="md:col-span-1 col-span-3 md:col-start-4 lg:block hidden cursor-pointer"
                      onClick={() => {
                        toggleRowVisibility(commList.selectionid);
                        handleBackOpen({
                          data: commList,
                          nameOther: matchScoreDetails.team_data,
                          type: "No",
                          odds: commList.khaai,
                          name: commList.team_name,
                          betFor: "odds",
                          oddsType: "bookmaker",
                          betType: "K",
                          selectionId: commList.selectionid,
                          teamData: commList.khaai,
                          betfairMarketId: marketId,
                          price: commList.lgaai * 100,
                          size: "0",
                          position: returnDataObject,
                          newPosition: returnDataObject,
                        });
                      }}
                    >
                      <BlinkingComponent
                        price={(commList.khaai * 100).toFixed(2)}
                        size={(commList.lgaai * 100).toFixed(2)}
                        color={"bg-[#faa9ba]"}
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

                    <span
                      className="col-span-3 lg:hidden block cursor-pointer"
                      onClick={() => {
                        toggleRowVisibility(commList.selectionid);
                        handleBackOpen({
                          data: commList,
                          nameOther: matchScoreDetails.team_data,
                          type: "No",
                          odds: commList.khaai,
                          name: commList.team_name,
                          betFor: "odds",
                          oddsType: "bookmaker",
                          betType: "K",
                          selectionId: commList.selectionid,
                          teamData: commList.khaai,
                          betfairMarketId: marketId,
                          price: commList.lgaai * 100,
                          size: "0",
                          position: returnDataObject,
                          newPosition: returnDataObject,
                        });
                      }}
                    >
                      <BlinkingComponent
                        price={(commList.khaai * 100).toFixed(2)}
                        size={(commList.lgaai * 100).toFixed(2)}
                        color={"bg-[#faa9ba]"}
                        blinkColor={"bg-[#FE7A7F]"}
                        textColors={"text-black"}
                        boderColors={"border-[#f996ab]"}
                      />
                    </span>
                  </div>

                  {(commList.lgaai === "0.00" || commList.lgaai === "0.000") && (
                    <div className="xl:w-[60%] lg:w-1/2 w-[35%] px-0.5 right-0 h-full absolute bg-[var(--suspended-color)] flex justify-center items-center z-30">
                      <div className="2xl:px-14 lg:px-14 py-2 px-2 text-nowrap rounded font-bold bg-transparent opacity-90">
                        <span className="text-[#FF071B] xl:text-lg text-sm font-bold uppercase">
                          SUSPENDED
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* {betSlipData?.name &&
                  <PlaceBetMobile
                    openBets={openBets}
                    closeRow={closeRow}
                    matchName={inplayMatch?.matchName}
                    betSlipData={betSlipData}
                    placeBet={placeBet}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                    count={betSlipData.count}
                    betLoading={betLoading}
                    increaseCount={increaseCount}
                    decreaseCount={decreaseCount}
                    handleClose={handleBackclose}
                    setBetSlipData={setBetSlipData}
                    handleButtonValues={handleButtonValues}
                  />} */}


              </div>
            ))}


          </>
        )}
      </div>

      {bookmaker2Fancy?.length > 0 && (
        <div className="w-[25%]">
          <>
            <header className="mt-1">
              <div className="bg-[var(--secondary)] items-center flex justify-between relative z-0 py-1 px-2">
                <div className="flex text-white align-items-center h-100 uppercase text-[14px] font-semibold">
                  Bookmaker 2
                </div>
                <button disabled className="bg-[var(--success-color)] opacity-35 text-sm text-white px-3 py-1">
                  Cashout
                </button>
              </div>
            </header>

            <div className="flex whitespace-normal max-w-full border-b border-gray-300">
              <div className="w-1/2 flex px-2">
                <div className="w-full py-1 leading-3 flex items-center text-xs text-[#097c93]">
                  <span className="text-[12px] font-bold">
                    Max: {formatNumber(isMatchCoin?.max)}
                  </span>
                </div>
              </div>

              <div className="w-1/2 grid grid-cols-2">
                <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                <span className="lg:col-span-1 col-span-3 rounded-md">
                  <div className="py-1 flex justify-center items-center bg-[#8DD2F0]">
                    <div className="text-center leading-3">
                      <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">BACK</span>
                    </div>
                  </div>
                </span>
                <span className="lg:col-span-1 col-span-3 rounded-md">
                  <div className="py-1 flex justify-center items-center bg-[#faa9ba]">
                    <div className="text-center leading-3">
                      <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">LAY</span>
                    </div>
                  </div>
                </span>
                <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
                <span className="lg:col-span-1 col-span-2 rounded-md lg:block hidden"></span>
              </div>
            </div>

            {bookmaker2Fancy.map((commList, index) => (
              <div key={index} className="relative border-b border-gray-300 flex decoration-none whitespace-normal max-w-full">
                <div className="w-1/2 flex">
                  <div className="w-full leading-3 flex items-center capitalize text-[#333333]">
                    <span className="text-[13px] px-2 font-bold">
                      <span>{commList.session_name}</span>
                      <br />
                      <span className={
                        positionObj[commList?.selectionid] > 0
                          ? "text-[var(--success-color)]"
                          : positionObj[commList?.selectionid] < 0
                            ? "text-red-600"
                            : "text-[var(--success-color)]"
                      }>
                        {positionObj[commList?.selectionid]
                          ? (Math.floor(Number(positionObj[commList?.selectionid]) * 100) / 100).toFixed(2)
                          : ''}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="w-1/2 grid grid-cols-2">
                  <span
                    className="lg:block hidden cursor-pointer"
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
                      color={"bg-[#8DD2F0]"}
                      blinkColor={"bg-[#00B2FF]"}
                      textColors={"text-black"}
                      boderColors={"border-[#489bbd]"}
                    />
                  </span>

                  <span
                    className="lg:hidden block cursor-pointer"
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
                      color={"bg-[#8DD2F0]"}
                      blinkColor={"bg-[#00B2FF]"}
                      textColors={"text-black"}
                      boderColors={"border-[#489bbd]"}
                    />
                  </span>

                  <span
                    className="lg:block hidden cursor-pointer"
                    onClick={() => {
                      toggleRowVisibility(commList.session_id);
                      handleBackOpen({
                        data: commList,
                        type: "No",
                        odds: commList.oddsNo,
                        name: commList.session_name,
                        nameSession: commList.session_name,
                        betFor: "fancy",
                        oddsType: "fancy",
                        betType: "N",
                        run: commList.runsNo,
                        selectionId: commList.session_id,
                        price: commList.runsNo,
                        size: commList.oddsNo,
                        position: returnDataFancyObject,
                      });
                    }}
                  >
                    <BlinkingComponent
                      price={commList.runsNo}
                      size={(commList.oddsNo * 100).toFixed(2).replace(/\.00$/, "")}
                      color={"bg-[#faa9ba]"}
                      blinkColor={"bg-[#FE7A7F]"}
                      textColors={"text-black"}
                      boderColors={"border-[#f996ab]"}
                    />
                  </span>

                  <span
                    className="lg:hidden block cursor-pointer"
                    onClick={() => {
                      toggleRowVisibility(commList.session_id);
                      handleBackOpen({
                        data: commList,
                        type: "No",
                        odds: commList.oddsNo,
                        name: commList.session_name,
                        nameSession: commList.session_name,
                        betFor: "fancy",
                        oddsType: "fancy",
                        betType: "N",
                        run: commList.runsNo,
                        selectionId: commList.session_id,
                        price: commList.runsNo,
                        size: commList.oddsNo,
                        position: returnDataFancyObject,
                      });
                    }}
                  >
                    <BlinkingComponent
                      price={commList.runsNo}
                      size={(commList.oddsNo * 100).toFixed(2).replace(/\.00$/, "")}
                      color={"bg-[#faa9ba]"}
                      blinkColor={"bg-[#FE7A7F]"}
                      textColors={"text-black"}
                      boderColors={"border-[#f996ab]"}
                    />
                  </span>
                </div>

                {(commList.lgaai === "0.00" || commList.lgaai === "0.000") && (
                  <div className="xl:w-[42%] lg:w-1/2 w-[35%] px-0.5 right-0 h-full absolute bg-[var(--suspended-color)] flex justify-center items-center z-30">
                    <div className="2xl:px-14 lg:px-14 py-2 px-2 text-nowrap rounded font-bold bg-transparent opacity-90">
                      <span className="text-[#FF071B] xl:text-lg text-sm font-bold uppercase">
                        SUSPENDED
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default BookmakerComponent;