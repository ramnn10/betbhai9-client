/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import useCasinoData from "../../context/useCasinoData";
import CustomReactFlipCounter from "../../component/counter/CustomReactFlipCounter";
import BetLocked from "../../component/casinoComponent/BetLocked";
import RoundedTabBmx from "../../component/casinoComponent/RoundedTabBmx";
import Loader from "../../component/casinoComponent/Loader";
import ResultModelBmx from "../../component/casinoComponent/ResultModelBmx";
import { apiCall } from "../../config/HTTP";
import CasinoBetPlaceDesktop from "../../component/casinoComponent/CasinoBetPlaceDesktop";
import BetListTableDesktop from "../../component/casinoComponent/BetListTableDesktop";
import CasinoPageheader from "../../component/casinoComponent/CasinoPageheader";
import Teenpattiondayrules from '../../component/casinoComponent/images/tponeday-rules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import BetPlayerName from "../../component/casinoComponent/BetPlayerName";
import BetButtonCards from "../../component/casinoComponent/BetButtonCards";
import BetButton from "../../component/casinoComponent/BetButton";
import Poker6PlayerCardButton from "../../component/casinoComponent/Poker6PlayerCardButton";
import Poker6PlayerBetButton from "../../component/casinoComponent/Poker6PlayerBetButton";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import { BsFillSuitHeartFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill } from "react-icons/bs";
import Ball1 from "../../component/casinoComponent/images/ball1.png";
import Ball2 from "../../component/casinoComponent/images/ball2.png";
import Ball3 from "../../component/casinoComponent/images/ball3.png";
import Ball4 from "../../component/casinoComponent/images/ball4.png";
import Ball5 from "../../component/casinoComponent/images/ball5.png";
import Ball6 from "../../component/casinoComponent/images/ball6.png";
import Ball7 from "../../component/casinoComponent/images/ball7.png";
import Ball8 from "../../component/casinoComponent/images/ball8.png";
import Ball9 from "../../component/casinoComponent/images/ball9.png";
import Ball10 from "../../component/casinoComponent/images/ball10.png";
import ScoreBg from "../../component/casinoComponent/images/score-bg-cricket.png"
import scorebat from "../../component/casinoComponent/images/score-bat-icon.png";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";

function InstantWorli({ eventId }) {
  const {
    casinoData,
    showLoader,
    tvUrl,
    name,
    minStake,
    maxStake,
    betList,
    posArray,
    shortName,
    oddsDifference,
    betListHandler
  } = useCasinoData(eventId)

  const section1Ref = useRef(null);
  const scrollTimeout = useRef(null);

  const dispatch = useDispatch()

  const [state, setState] = useState({
    isTvScreen: false,
    clicked: false,
    count: 0,
    betSlipData: {
      stake: '0',
      data: {},
      nat: '',
      type: '',
    },
    backBetModal: false,
    ResultModel: false,
    result: null,
    LoadingBet: false,
    shortName: null,
    activeTab: 1,
  });


  const [activeTab2, setActivetab2] = useState(1)

  const handleCardClick = (tab) => {
    setActivetab2(tab)
  }
  const handleBackOpen = (data) => {
    if (scrollTimeout.current) {
      clearInterval(scrollTimeout.current);
    }
    setState(prevState => ({
      ...prevState,
      backBetModal: true,
      betSlipData: { ...data, stake: "0" },
      count: data.odds,

    }));

  };


  const handleResultModel = (data) => {
    setState(prevState => ({ ...prevState, ResultModel: true, result: data }));
  };


  const updateStake = (event) => {
    try {
      let { value } = event.target;
      if (value.startsWith('0') && value.length > 1) {
        value = value.slice(1);
      }
      setState(prevState => ({
        ...prevState,
        betSlipData: { ...prevState.betSlipData, stake: value },
      }));
    } catch (error) {
      console.error('Error updating stake:', error);
    }
  };

  const placeBet = async () => {
    setState(prevState => ({ ...prevState, LoadingBet: true }));
    let { data } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let betObject = {
      "roundId": t1.mid,
      "sid": `${state.betSlipData?.data?.sid}`,
      "rate": state.count + "",
      "amount": Number(state.betSlipData.stake),
      "casinoType": state.shortName ? state.shortName : "card32-a",
      "eventId": eventId,
      "betFor": state.betSlipData.betFor + "",
      "isLay": state.betSlipData.type === "No" ? true : false,


    };
    dispatch(casinoBetPlaceFunc(betObject))
      .then(data => {
        if (!data?.error) {
          setState(prevState => ({
            ...prevState,
            betresponse: data?.data,
          }));
        }
      })
      .catch(error => {
        console.error("Error placing bet:", error);
      })
      .finally(() => {
        handleClose();
        betListHandler(eventId)
        setState(prevState => ({ ...prevState, LoadingBet: false }));
      });
  };

  const inputChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (value < 0 || isNaN(Number(value))) {
      value = 0;
    }

    if (value[0] === '0' && value.length > 1) {
      value = value.substring(1);
    }

    setState(prevState => ({
      ...prevState,
      betSlipData: { ...prevState.betSlipData, stake: value },
      [name]: Number(value),
    }));
  };

  const handleClose = () => {
    setState(prevState => ({ ...prevState, betSlipData: { stake: '0', data: {}, nat: '', type: '', }, backBetModal: false, }))
  };

  const handleCloseResult = () => {
    setState(prevState => ({ ...prevState, ResultModel: false }));
  };

  const handleTabClick = (tabIndex) => {
    setState(prevState => ({ ...prevState, activeTab: tabIndex }));
  };
  const updateStackOnClick = (element) => setState({ ...state, betSlipData: { ...state.betSlipData, stake: Number(state.betSlipData.stake) + element } })




  const { ResultModel, time, count, backBetModal, LoadingBet, clicked, activeTab } = state;
  const { data, result } = casinoData ? casinoData : {};
  let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
  let ENG = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  return (
    <>

      {showLoader ?
        <Loader active={showLoader === true} />

        :
        <div className={`w-full relative  page_bg  text-sm flex`}>
          {ResultModel &&
            ResultModel === true ? (
            <ResultModelBmx
              handleClose={handleCloseResult}
              PageTitle={name ? name : "20-20 Teenpatti"}
              shortName={shortName ? shortName : "teen"}
              result={state.result}
            />
          ) : null}
          {backBetModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 lg:hidden  flex justify-center items-top py-0 z-50"
              onClick={handleClose}
            >

              <div onClick={(e) => e.stopPropagation()} >
                <CasinoBetPlaceDesktop
                  betSlipData={state.betSlipData}
                  updateStackOnclick={(element) => updateStackOnClick(element)}
                  inputChange={inputChange}
                  placeBet={placeBet}
                  LoadingBet={LoadingBet}
                  handleClose={handleClose}
                  updateStake={updateStake}
                  clearStake={() => setState({ ...state, betSlipData: { ...state.betSlipData, stake: '' } })}
                />
              </div>

            </div>
          )}

          <div className="lg:flex block w-full lg:pt-1 pt-0 scroll-md lg:space-x-2">



            <div className="lg:hidden block">
              <CasinoTab
                activeTab={activeTab}
                handleTabClick={handleTabClick}
                ruleImage={Teenpattiondayrules}
                t1={t1}
                totalBet={betList && betList.length ? betList.length : "0"}
              />
            </div>
            <div className="w-full lg:flex">
              {activeTab === 1 ? (
                <div className="w-full lg:flex block">
                  <div className="lg:w-[70%] w-full bg-white">
                    <CasinoPageheader
                      PageTitle={name ? name : "20-20 Teenpatti"}
                      ruleImage={Teenpattiondayrules}
                      t1={t1}
                    />
                    <div className="bg-black flex justify-between w-full relative md:text-sm text-[10px] xl:h-[460px] md:h-[300px] h-[200px]">
                      <iframe src={tvUrl ? tvUrl : null} title=" " className='relative w-full  ' />
                      <div className=" flex justify-between">
                        <div className=" absolute top-0 left-0">
                          <div className="flex justify-start space-x-1 p-2">
                            <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-10 w-8" />
                            <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-10 w-8" />
                            <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-10 w-8" />
                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="relative mt-2">
                      <div className="flex justify-between items-center text-center py-1">
                        <p></p>
                        <p className="text-[14px] font-[600] darktext">{9.5 - oddsDifference}</p>
                        <p></p>
                      </div>

                      <div className="w-full grid grid-cols-7 divide-x divide-y">

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '1 Single', sid: 1 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">1</p>
                          </div>
                          <div className={`${posArray[1] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[1] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '2 Single', sid: 2 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">2</p>
                          </div>
                          <div className={`${posArray[2] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[2] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '3 Single', sid: 3 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">3</p>
                          </div>
                          <div className={`${posArray[3] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[3] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '4 Single', sid: 4 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">4</p>
                          </div>
                          <div className={`${posArray[4] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[4] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '5 Single', sid: 5 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">5</p>
                          </div>
                          <div className={`${posArray[5] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[5] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: 'Line 1', sid: 10 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="md:text-[20px] text-[16px] font-semibold">Line 1</p>
                          </div>
                          <div className={`${posArray[10] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[10] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: 'ODD', sid: 12 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="md:text-[20px] text-[16px] font-semibold">ODD</p>
                          </div>
                          <div className={`${posArray[12] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[12] ?? 0.00}</div>
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-7 divide-x divide-y">
                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '6 Single', sid: 6 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">6</p>
                          </div>
                          <div className={`${posArray[6] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[6] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '7 Single', sid: 7 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">7</p>
                          </div>
                          <div className={`${posArray[7] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[7] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '8 Single', sid: 8 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">8</p>
                          </div>
                          <div className={`${posArray[8] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[8] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '9 Single', sid: 9 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">9</p>
                          </div>
                          <div className={`${posArray[9] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[9] ?? 0.00}</div>
                        </div>

                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '0 Single', sid: 0 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="text-[30px] font-semibold">0</p>
                          </div>
                          <div className={`${posArray[0] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[0] ?? 0.00}</div>
                        </div>
                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: 'Line 2', sid: 11 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="md:text-[20px] text-[16px] font-semibold">Line 2</p>
                          </div>
                          <div className={`${posArray[11] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[11] ?? 0.00}</div>
                        </div>
                        <div>
                          <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: 'EVEN', sid: 13 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer py-4">
                            <p className="md:text-[20px] text-[16px] font-semibold">EVEN</p>
                          </div>
                          <div className={`${posArray[13] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[13] ?? 0.00}</div>
                        </div>
                      </div>
                      {ENG && ENG.gstatus === '1' ? null : <BetLocked />}
                    </div>
                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className="text-[#FFF523] font-[600] text-[13px]">
                              R
                            </p>
                          </div>
                        )) : null}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-[30%] w-full sticky top-0  lg:h-[calc(100vh-400px)] bg-white lg:px-1.5 lg:block hidden">
                    {backBetModal && <CasinoBetPlaceDesktop betSlipData={state.betSlipData}
                      updateStackOnclick={(element) => updateStackOnClick(element)}
                      inputChange={inputChange}
                      placeBet={placeBet}
                      LoadingBet={LoadingBet}
                      handleClose={handleClose}
                      updateStake={updateStake}
                      clearStake={() => setState({ ...state, betSlipData: { ...state.betSlipData, stake: '' } })}
                    />
                    }
                    <MyBetHeader />
                    <div className="pb-20">
                      <div className="space-y-[1px] bg-gray-200 pb-1 rounded">
                        <BetListTableDesktop betList={betList} eventId={eventId} />
                      </div>
                    </div>

                  </div>
                </div>
              ) : null}
              {activeTab === 2 ? (
                <MobileBetList
                  betList={betList}
                />
              ) : null}
            </div>
          </div>
        </div >}
    </>
  );
};


export default InstantWorli
