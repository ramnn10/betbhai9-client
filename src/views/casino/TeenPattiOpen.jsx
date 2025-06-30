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

function TeenPattiOpen({ eventId }) {
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

  let Player1 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Player2 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Player3 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let Player4 = data && data.t2 && data.t2[3] ? data.t2[3] : {};
  let Player5 = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let Player6 = data && data.t2 && data.t2[5] ? data.t2[5] : {};
  let Player7 = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let Player8 = data && data.t2 && data.t2[7] ? data.t2[7] : {};

  let PairPlus1 = data && data.t2 && data.t2[8] ? data.t2[8] : {};
  let PairPlus2 = data && data.t2 && data.t2[9] ? data.t2[9] : {};
  let PairPlus3 = data && data.t2 && data.t2[10] ? data.t2[10] : {};
  let PairPlus4 = data && data.t2 && data.t2[11] ? data.t2[11] : {};
  let PairPlus5 = data && data.t2 && data.t2[12] ? data.t2[12] : {};
  let PairPlus6 = data && data.t2 && data.t2[13] ? data.t2[13] : {};
  let PairPlus7 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
  let PairPlus8 = data && data.t2 && data.t2[15] ? data.t2[15] : {};


  let resultCard;
  if (t1 && t1.cards && typeof t1.cards === 'string') {
    resultCard = t1.cards.split(',');
  } else {
    resultCard = [];
  }


  return (
    <>

      {showLoader ?
        <Loader active={showLoader === true} />

        :
        <div className={`w-full relative page_bg  text-sm flex`}>
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
                        <div className="absolute top-0 left-0">
                          <div className="w-full p-1">
                            <div className="text-white text-[16px] font-[600]">DEALER</div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[8] && resultCard[8] !== '1' ? (<img src={`/cards/${resultCard[8]}.png`} alt="card" className="lg:h-12 h-6 lg:w-11 w-6 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[17] && resultCard[17] !== '1' ? (<img src={`/cards/${resultCard[17]}.png`} alt="card" className="lg:h-12 h-6 lg:w-11 w-6 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[26] && resultCard[26] !== '1' ? (<img src={`/cards/${resultCard[26]}.png`} alt="card" className="lg:h-12 h-6 lg:w-11 w-6 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="border border-gray-300 white-text divide-y divide-[#c7c8ca] mt-1.5">

                      {/* <div className="grid lg:grid-cols-7 grid-cols-6 text-center divide-x divide-[#c7c8ca]  font-semibold text-[12px] gray-text">
                          <div className="lg:col-span-4 col-span-2 w-full flex justify-center items-center py-[2px]"></div>
                          <div className="lg:col-span-3 col-span-4 w-full flex justify-center items-center py-[2px] light-blue">Back</div>
                        </div> */}

                      <div className="grid lg:grid-cols-5 grid-cols-6 text-center divide-x divide-[#c7c8ca]  gray-text font-semibold lg:text-[16px] text-[12px]">
                        <div className="col-span-2 w-full flex justify-center items-center py-1.5"></div>
                        <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                          <div className="w-full flex justify-center items-center py-1.5 light-blue">Odds</div>
                          <div className="w-full flex justify-center items-center py-1.5 light-blue">Pair Plus</div>
                          <div className="w-full flex justify-center items-center py-1.5 light-blue">Total</div>
                        </div>
                      </div>

                      <div className="w-full text-center colour_back_odds ">
                        <div className="grid lg:grid-cols-5 grid-cols-6 divide-x divide-[#c7c8ca]" >
                          <div className="col-span-2 h-full lg:text-[16px] text-[12px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-start items-center space-x-1">
                            <div>
                              {Player1 && Player1.nat ? Player1.nat : Player1.nation ? Player1.nation : (Player1.nat)}
                            </div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[0] && resultCard[0] !== '1' ? (<img src={`/cards/${resultCard[0]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[9] && resultCard[9] !== '1' ? (<img src={`/cards/${resultCard[9]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[18] && resultCard[18] !== '1' ? (<img src={`/cards/${resultCard[18]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                            {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                          </div>
                          <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player1 && Player1.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player1, type: "Yes", odds: Player1.rate - oddsDifference, nat: Player1.nat ? Player1.nat : Player1.nation, sid: Player1.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player1 && Player1.rate ? (Player1.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player1 && Player1.rate ? (Player1.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {PairPlus1 && PairPlus1.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PairPlus1, type: "Yes", odds: PairPlus1.rate - oddsDifference, nat: PairPlus1.nat ? PairPlus1.nat : PairPlus1.nation, sid: PairPlus1.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus1 && PairPlus1.nat ? PairPlus1.nat : PairPlus1.nation ? PairPlus1.nation : "Pair Plus 1"}
                                    </span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus1 && PairPlus1.nat ? PairPlus1.nat : PairPlus1.nation ? PairPlus1.nation : "Pair Plus 1"}
                                    </span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player1 && Player1.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player1, type: "Yes", odds: Player1.rate - oddsDifference, nat: Player1.nat ? Player1.nat : Player1.nation, sid: Player1.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player1 && Player1.rate ? (Player1.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player1 && Player1.rate ? (Player1.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center colour_back_odds ">
                        <div className="grid lg:grid-cols-5 grid-cols-6 divide-x divide-[#c7c8ca]" >
                          <div className="col-span-2 h-full lg:text-[16px] text-[12px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-start items-center space-x-1">
                            <div>
                              {Player2 && Player2.nat ? Player2.nat : Player2.nation ? Player2.nation : (Player2.nat)}
                            </div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[1] && resultCard[1] !== '1' ? (<img src={`/cards/${resultCard[1]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[10] && resultCard[10] !== '1' ? (<img src={`/cards/${resultCard[10]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[19] && resultCard[19] !== '1' ? (<img src={`/cards/${resultCard[19]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                            {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                          </div>
                          <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player2 && Player2.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player2, type: "Yes", odds: Player2.rate - oddsDifference, nat: Player2.nat, sid: Player2.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player2 && Player2.rate ? (Player2.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player2 && Player2.rate ? (Player2.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {PairPlus2 && PairPlus2.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PairPlus2, type: "Yes", odds: PairPlus2.rate - oddsDifference, nat: PairPlus2.nat, sid: PairPlus2.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus2 && PairPlus2.nat ? PairPlus2.nat : PairPlus2.nation ? PairPlus2.nation : "Pair Plus 2"}
                                    </span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus2 && PairPlus2.nat ? PairPlus2.nat : PairPlus2.nation ? PairPlus2.nation : "Pair Plus 2"}
                                    </span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player2 && Player2.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player2, type: "Yes", odds: Player2.rate - oddsDifference, nat: Player2.nat, sid: Player2.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player2 && Player2.rate ? (Player2.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player2 && Player2.rate ? (Player2.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center colour_back_odds ">
                        <div className="grid lg:grid-cols-5 grid-cols-6 divide-x divide-[#c7c8ca]" >
                          <div className="col-span-2 h-full lg:text-[16px] text-[12px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-start items-center space-x-1">
                            <div>
                              {Player3 && Player3.nat ? Player3.nat : Player3.nation ? Player3.nation : (Player3.nat)}
                            </div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[2] && resultCard[2] !== '1' ? (<img src={`/cards/${resultCard[2]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[11] && resultCard[11] !== '1' ? (<img src={`/cards/${resultCard[11]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[20] && resultCard[20] !== '1' ? (<img src={`/cards/${resultCard[20]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                            {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                          </div>
                          <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player3 && Player3.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player3, type: "Yes", odds: Player3.rate - oddsDifference, nat: Player3.nat, sid: Player3.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player3 && Player3.rate ? (Player3.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player3 && Player3.rate ? (Player3.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {PairPlus3 && PairPlus3.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PairPlus3, type: "Yes", odds: PairPlus3.rate - oddsDifference, nat: PairPlus3.nat, sid: PairPlus3.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus3 && PairPlus3.nat ? PairPlus3.nat : PairPlus3.nation ? PairPlus3.nation : "Pair Plus 3"}
                                    </span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus3 && PairPlus3.nat ? PairPlus3.nat : PairPlus3.nation ? PairPlus3.nation : "Pair Plus 3"}
                                    </span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player3 && Player3.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player3, type: "Yes", odds: Player3.rate - oddsDifference, nat: Player3.nat, sid: Player3.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player3 && Player3.rate ? (Player3.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player3 && Player3.rate ? (Player3.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center colour_back_odds ">
                        <div className="grid lg:grid-cols-5 grid-cols-6 divide-x divide-[#c7c8ca]" >
                          <div className="col-span-2 h-full lg:text-[16px] text-[12px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-start items-center space-x-1">
                            <div>
                              {Player4 && Player4.nat ? Player4.nat : Player4.nation ? Player4.nation : (Player4.nat)}
                            </div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[3] && resultCard[3] !== '1' ? (<img src={`/cards/${resultCard[3]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[12] && resultCard[12] !== '1' ? (<img src={`/cards/${resultCard[12]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[21] && resultCard[21] !== '1' ? (<img src={`/cards/${resultCard[21]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                            {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                          </div>
                          <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player4 && Player4.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player4, type: "Yes", odds: Player4.rate - oddsDifference, nat: Player4.nat, sid: Player4.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player4 && Player4.rate ? (Player4.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player4 && Player4.rate ? (Player4.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {PairPlus4 && PairPlus4.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PairPlus4, type: "Yes", odds: PairPlus4.rate - oddsDifference, nat: PairPlus4.nat, sid: PairPlus4.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus4 && PairPlus4.nat ? PairPlus4.nat : PairPlus4.nation ? PairPlus4.nation : "Pair Plus 4"}
                                    </span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus4 && PairPlus4.nat ? PairPlus4.nat : PairPlus4.nation ? PairPlus4.nation : "Pair Plus 4"}
                                    </span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player4 && Player4.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player4, type: "Yes", odds: Player4.rate - oddsDifference, nat: Player4.nat, sid: Player4.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player4 && Player4.rate ? (Player4.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player4 && Player4.rate ? (Player4.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center colour_back_odds ">
                        <div className="grid lg:grid-cols-5 grid-cols-6 divide-x divide-[#c7c8ca]" >
                          <div className="col-span-2 h-full lg:text-[16px] text-[12px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-start items-center space-x-1">
                            <div>
                              {Player5 && Player5.nat ? Player5.nat : Player5.nation ? Player5.nation : (Player5.nat)}
                            </div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[4] && resultCard[4] !== '1' ? (<img src={`/cards/${resultCard[4]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[13] && resultCard[13] !== '1' ? (<img src={`/cards/${resultCard[13]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[22] && resultCard[22] !== '1' ? (<img src={`/cards/${resultCard[22]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                            {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                          </div>
                          <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player5 && Player5.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player5, type: "Yes", odds: Player5.rate - oddsDifference, nat: Player5.nat, sid: Player5.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player5 && Player5.rate ? (Player5.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player5 && Player5.rate ? (Player5.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {PairPlus5 && PairPlus5.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PairPlus5, type: "Yes", odds: PairPlus5.rate - oddsDifference, nat: PairPlus5.nat, sid: PairPlus5.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus5 && PairPlus5.nat ? PairPlus5.nat : PairPlus5.nation ? PairPlus5.nation : "Pair Plus 5"}
                                    </span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus5 && PairPlus5.nat ? PairPlus5.nat : PairPlus5.nation ? PairPlus5.nation : "Pair Plus 5"}
                                    </span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player5 && Player5.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player5, type: "Yes", odds: Player5.rate - oddsDifference, nat: Player5.nat, sid: Player5.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player5 && Player5.rate ? (Player5.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player5 && Player5.rate ? (Player5.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center colour_back_odds ">
                        <div className="grid lg:grid-cols-5 grid-cols-6 divide-x divide-[#c7c8ca]" >
                          <div className="col-span-2 h-full lg:text-[16px] text-[12px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-start items-center space-x-1">
                            <div>
                              {Player6 && Player6.nat ? Player6.nat : Player6.nation ? Player6.nation : (Player6.nat)}
                            </div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[5] && resultCard[5] !== '1' ? (<img src={`/cards/${resultCard[5]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[14] && resultCard[14] !== '1' ? (<img src={`/cards/${resultCard[14]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[23] && resultCard[23] !== '1' ? (<img src={`/cards/${resultCard[23]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                            {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                          </div>
                          <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player6 && Player6.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player6, type: "Yes", odds: Player6.rate - oddsDifference, nat: Player6.nat, sid: Player6.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player6 && Player6.rate ? (Player6.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player6 && Player6.rate ? (Player6.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {PairPlus6 && PairPlus6.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PairPlus6, type: "Yes", odds: PairPlus6.rate - oddsDifference, nat: PairPlus6.nat, sid: PairPlus6.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus6 && PairPlus6.nat ? PairPlus6.nat : PairPlus6.nation ? PairPlus6.nation : "Pair Plus 6"}
                                    </span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus6 && PairPlus6.nat ? PairPlus6.nat : PairPlus6.nation ? PairPlus6.nation : "Pair Plus 6"}
                                    </span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player6 && Player6.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player6, type: "Yes", odds: Player6.rate - oddsDifference, nat: Player6.nat, sid: Player6.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player6 && Player6.rate ? (Player6.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player6 && Player6.rate ? (Player6.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center colour_back_odds ">
                        <div className="grid lg:grid-cols-5 grid-cols-6 divide-x divide-[#c7c8ca]" >
                          <div className="col-span-2 h-full lg:text-[16px] text-[12px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-start items-center space-x-1">
                            <div>
                              {Player7 && Player7.nat ? Player7.nat : Player7.nation ? Player7.nation : (Player7.nat)}
                            </div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[6] && resultCard[6] !== '1' ? (<img src={`/cards/${resultCard[6]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[15] && resultCard[15] !== '1' ? (<img src={`/cards/${resultCard[15]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[24] && resultCard[24] !== '1' ? (<img src={`/cards/${resultCard[24]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                            {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                          </div>
                          <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player7 && Player7.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player7, type: "Yes", odds: Player7.rate - oddsDifference, nat: Player7.nat, sid: Player7.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player7 && Player7.rate ? (Player7.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player7 && Player7.rate ? (Player7.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {PairPlus7 && PairPlus7.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PairPlus7, type: "Yes", odds: PairPlus7.rate - oddsDifference, nat: PairPlus7.nat, sid: PairPlus7.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus7 && PairPlus7.nat ? PairPlus7.nat : PairPlus7.nation ? PairPlus7.nation : "Pair Plus 7"}
                                    </span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus7 && PairPlus7.nat ? PairPlus7.nat : PairPlus7.nation ? PairPlus7.nation : "Pair Plus 7"}
                                    </span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player7 && Player7.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player7, type: "Yes", odds: Player7.rate - oddsDifference, nat: Player7.nat, sid: Player7.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player7 && Player7.rate ? (Player7.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player7 && Player7.rate ? (Player7.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full text-center colour_back_odds ">
                        <div className="grid lg:grid-cols-5 grid-cols-6 divide-x divide-[#c7c8ca]" >
                          <div className="col-span-2 h-full lg:text-[16px] text-[12px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-start items-center space-x-1">
                            <div>
                              {Player8 && Player8.nat ? Player8.nat : Player8.nation ? Player8.nation : (Player8.nat)}
                            </div>
                            <div className="flex space-x-1 justify-start">
                              {resultCard && resultCard[7] && resultCard[7] !== '1' ? (<img src={`/cards/${resultCard[7]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[16] && resultCard[16] !== '1' ? (<img src={`/cards/${resultCard[16]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                              {resultCard && resultCard[25] && resultCard[25] !== '1' ? (<img src={`/cards/${resultCard[25]}.png`} alt="card" className="h-5 w-4 border-[1px] border-yellow-300" />
                              ) : null}
                            </div>
                            {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                          </div>
                          <div className="grid grid-cols-3 lg:col-span-3 col-span-4 divide-x divide-[#c7c8ca]" >
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player8 && Player8.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player8, type: "Yes", odds: Player8.rate - oddsDifference, nat: Player8.nat, sid: Player8.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player8 && Player8.rate ? (Player8.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player8 && Player8.rate ? (Player8.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {PairPlus8 && PairPlus8.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PairPlus8, type: "Yes", odds: PairPlus8.rate - oddsDifference, nat: PairPlus8.nat, sid: PairPlus8.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus8 && PairPlus8.nat ? PairPlus8.nat : PairPlus8.nation ? PairPlus8.nation : "Pair Plus 8"}
                                    </span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] capitalize darktext">
                                      {PairPlus8 && PairPlus8.nat ? PairPlus8.nat : PairPlus8.nation ? PairPlus8.nation : "Pair Plus 8"}
                                    </span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                              {Player8 && Player8.gstatus == '1' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Player8, type: "Yes", odds: Player8.rate - oddsDifference, nat: Player8.nat, sid: Player8.sid }, section1Ref)}>
                                  <div className=" text-center py-2.5" >
                                    <span className="text-[14px] font-[600] darktext">{Player8 && Player8.rate ? (Player8.rate - oddsDifference) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center py-2.5 relative">
                                    <span className="text-[14px] font-[600] darktext">{Player8 && Player8.rate ? (Player8.rate - oddsDifference) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className={`font-[700] text-[#FFF523] text-[13px] ${element?.result === "31" ? "text-[#33c6ff]" : element?.result === "11" ? "text-[#F75500] " : element?.result === "21" ? "text-[#FFF523] " : "text-white"}`}>
                              {element && element.result === '11' ? "T" : element && element.result === '21' ? "L" : element && element.result === '31' ? "D" : "R"}
                            </p>

                          </div>
                        )) : null}
                      </div>
                    </div>

                    <div className='w-full lg:hidden block pb-20'>
                      <div className="bg-[var(--primary)] text-white text-[14px] px-2 py-[6px] font-medium tracking-wide mt-3">
                        Rules
                      </div>
                      <div className='overflow-x-auto w-full'>
                        <table className="table w-full bg-[#f7f7f7] darktext text-[14px] border border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                          <thead>
                            <tr className='bg-white'>
                              <th colspan="3" class="text-center font-[600]">Pair Plus </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-[#c7c8ca]'>
                            <tr className='divide-x divide-[#c7c8ca] '>
                              <td className='text-left'><span className="ms-2">Pair</span></td>
                              <td className="text-left">1 TO 1 </td>
                            </tr>
                            <tr className='divide-x divide-[#c7c8ca] '>
                              <td className='text-left'><span className="ms-2">Flush	</span></td>
                              <td className="text-left">1 TO 4 </td>
                            </tr>
                            <tr className='divide-x divide-[#c7c8ca] '>
                              <td className='text-left'><span className="ms-2">Straight</span></td>
                              <td className="text-left">1 TO 6 </td>
                            </tr>
                            <tr className='divide-x divide-[#c7c8ca] '>
                              <td className='text-left'><span className="ms-2">Trio	</span></td>
                              <td className="text-left">1 TO 30 </td>
                            </tr>
                            <tr className='divide-x divide-[#c7c8ca] '>
                              <td className='text-left'><span className="ms-2">Straight Flush			</span></td>
                              <td className="text-left">1 TO 40 </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                  <div className="lg:w-[30%] sticky top-0  lg:h-[calc(100vh-400px)] w-full bg-white lg:px-1.5 lg:block hidden">
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


export default TeenPattiOpen
