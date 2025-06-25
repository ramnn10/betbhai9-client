import React from 'react';
import BlinkingComponent from '../BlinkingComponent';
import { FaInfoCircle } from 'react-icons/fa';
import PlaceBetMobile from '../../../component/betplaceMobile/PlaceBetMobile';

const GroupedFancyComponent = ({
  inplayMatch,
  activeTab,
  groupedData,
  handleBackOpen,
  marketId,
  returnDataFancyObject,
  setModalTrue,
  hiddenRows, toggleRowVisibility,
  openBets, closeRow, betSlipData, placeBet, errorMessage, successMessage, betLoading, decreaseCount, increaseCount, handleBackclose, setBetSlipData, handleButtonValues
}) => {
  return (
    inplayMatch?.isFancy && (activeTab === "fancy" || activeTab === "all") && (
      <div className="grid xl:grid-cols-2 gap-0.5 grid-cols-1">
        {groupedData && Object.keys(groupedData).length > 0 &&
          Object.entries(groupedData).map(([sessionName, items], index) => (
            <div key={index} className="mb-4 overflow-hidden">
              {/* Header */}
              <div className="bg-[var(--secondary)] text-white p-2 text-sm font-bold uppercase flex justify-between items-center">
                <span>{sessionName}</span>
                <div onClick={() => setModalTrue()}>
                  <FaInfoCircle className='text-white cursor-pointer' />
                </div>
              </div>

              {/* Min/Max */}
              <div className="grid grid-cols-[80%_20%] gap-2 border-t text-sm">
                <div className="text-[11px] text-[teal] px-2 py-1 font-medium">
                  Min: 100 Max: 1L
                </div>
                <div className={`py-1 flex justify-center items-center bg-[#72bbef]`}>
                  <div className='text-center leading-3'>
                    <span className="2xl:text-[16px] lg:text-[16px] text-xs text-gray-800 font-bold">Back</span>
                  </div>
                </div>
              </div>

              {/* Odds Rows */}
              {items.map((commList, i) => (
                <div key={i}>
                  <div
                    className="grid grid-cols-[80%_20%] gap-2 border-t text-sm"
                  >
                    <div className="px-2">{i} Number</div>
                    <div
                      className="text-center bg-red-900 text-black cursor-pointer"
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
                    </div>
                  </div>
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
          ))}
      </div>
    )
  );
};

export default GroupedFancyComponent;