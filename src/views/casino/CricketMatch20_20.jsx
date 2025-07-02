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
import Teenpattiondayrules from '../../component/casinoComponent/images/cricket2020rules.png';
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
import ButtonValuesModal from "../buttonvalues/ButtonValuesModal";

function CricketMatch20_20({ eventId }) {
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

  const [buttonValue, setbuttonValue] = useState(false);

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

  const handleButtonValues = (e) => {
    setbuttonValue((prev) => !prev);
    document.body.classList.toggle("StakeModalOpen");
    // e.stopPropagation();
    // setBetSlipData(prev => ({
    //     ...prev,
    //     count: value
    // }));
  };

  const { ResultModel, time, count, backBetModal, LoadingBet, clicked, activeTab } = state;
  const { data, result } = casinoData ? casinoData : {};
  let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};

  let Run2 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Run3 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Run4 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let Run5 = data && data.t2 && data.t2[3] ? data.t2[3] : {};
  let Run6 = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let Run7 = data && data.t2 && data.t2[5] ? data.t2[5] : {};
  let Run8 = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let Run9 = data && data.t2 && data.t2[7] ? data.t2[7] : {};
  let Run10 = data && data.t2 && data.t2[8] ? data.t2[8] : {};


  const maxValue = Math.max(t1.C1, t1.C2, t1.C3, t1.C4);
  let resultCard;
  if (t1 && t1.desc && typeof t1.desc === 'string') {
    resultCard = t1.desc.split(',');
  } else {
    // Handle the case where t1 is undefined or t1.desc is not a string
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
          {buttonValue && (
            <div
              onClick={(e) => {
                handleButtonValues();
                e.stopPropagation();
              }}
              className="fixed top-0  bg-black bg-opacity-55 left-0 w-full h-full flex items-start justify-center z-[99999]"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="lg:w-[28%] md:w-[50%] w-full lg:p-2   "
              >
                <ButtonValuesModal handleClose={handleButtonValues} />
              </div>
            </div>
          )}
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
                  handleButtonValues={handleButtonValues}
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
                        <div className="absolute top-1 left-0 w-full">
                          <div className="w-full px-1.5 lg:space-y-1 space-y-0">
                            <div>
                              <div className={`font-semibold p-[2px] tracking-tight text-[12px] text-white`}>
                                <img src={`/cards/${t1 && t1.C1 ? t1.C1 : "1"}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-5" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="white-bg space-y-2">
                      <div className="grid lg:grid-cols-2 grid-cols-1 pt-2 lg:space-x-5 space-x-0">

                        <div className="space-y-10 shadow-sm shadow-[#aaa] border border-gray-300 p-2 pb-8">

                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball2} className="w-12 h-12"></img>
                            </div>

                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>

                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">

                                {Run2.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run2, type: "Yes", odds: Run2.b1, nat: Run2.nat ? Run2.nat : Run2.nation, betFor: Run2.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run2 && Run2.b1 && Run2.b1 ? Run2.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run2 && Run2.b1 && Run2.b1 ? Run2.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                                {Run2.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run2, type: "No", odds: Run2.b1, nat: Run2.nat ? Run2.nat : Run2.nation, betFor: Run2.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run2 && Run2.l1 && Run2.l1 ? Run2.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run2 && Run2.l1 && Run2.l1 ? Run2.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                              </div>
                              {/* <div className={`${posArray[Run2.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run2.sid] ?? 0.00}</div> */}
                            </div>

                          </div>

                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball3} className="w-12 h-12"></img>
                            </div>

                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>

                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">

                                {Run3.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run3, type: "Yes", odds: Run3.b1, nat: Run3.nat ? Run3.nat : Run3.nation, betFor: Run3.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run3 && Run3.b1 && Run3.b1 ? Run3.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run3 && Run3.b1 && Run3.b1 ? Run3.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                                {Run3.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run3, type: "No", odds: Run3.b1, nat: Run3.nat ? Run3.nat : Run3.nation, betFor: Run3.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run3 && Run3.l1 && Run3.l1 ? Run3.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run3 && Run3.l1 && Run3.l1 ? Run3.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                              </div>
                              {/* <div className={`${posArray[Run3.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run3.sid] ?? 0.00}</div> */}
                            </div>

                          </div>

                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball4} className="w-12 h-12"></img>
                            </div>

                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>

                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">

                                {Run4.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run4, type: "Yes", odds: Run4.b1, nat: Run4.nat ? Run4.nat : Run4.nation, betFor: Run4.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run4 && Run4.b1 && Run4.b1 ? Run4.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run4 && Run4.b1 && Run4.b1 ? Run4.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                                {Run4.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run4, type: "No", odds: Run4.b1, nat: Run4.nat ? Run4.nat : Run4.nation, betFor: Run4.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run4 && Run4.l1 && Run4.l1 ? Run4.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run4 && Run4.l1 && Run4.l1 ? Run4.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                              </div>
                              {/* <div className={`${posArray[Run4.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run4.sid] ?? 0.00}</div> */}
                            </div>

                          </div>

                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball5} className="w-12 h-12"></img>
                            </div>

                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>

                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">

                                {Run5.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run5, type: "Yes", odds: Run5.b1, nat: Run5.nat ? Run5.nat : Run5.nation, betFor: Run5.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run5 && Run5.b1 && Run5.b1 ? Run5.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run5 && Run5.b1 && Run5.b1 ? Run5.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                                {Run5.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run5, type: "No", odds: Run5.b1, nat: Run5.nat ? Run5.nat : Run5.nation, betFor: Run5.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run5 && Run5.l1 && Run5.l1 ? Run5.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run5 && Run5.l1 && Run5.l1 ? Run5.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                              </div>
                              {/* <div className={`${posArray[Run5.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run5.sid] ?? 0.00}</div> */}
                            </div>

                          </div>

                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball6} className="w-12 h-12"></img>
                            </div>

                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>

                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">

                                {Run6.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run6, type: "Yes", odds: Run6.b1, nat: Run6.nat ? Run6.nat : Run6.nation, betFor: Run6.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run6 && Run6.b1 && Run6.b1 ? Run6.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run6 && Run6.b1 && Run6.b1 ? Run6.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                                {Run6.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run6, type: "No", odds: Run6.b1, nat: Run6.nat ? Run6.nat : Run6.nation, betFor: Run6.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run6 && Run6.l1 && Run6.l1 ? Run6.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run6 && Run6.l1 && Run6.l1 ? Run6.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                              </div>
                              {/* <div className={`${posArray[Run6.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run6.sid] ?? 0.00}</div> */}
                            </div>

                          </div>

                        </div>

                        <div className="space-y-10 shadow-sm shadow-[#aaa] border border-gray-300 p-2 pb-8">

                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball7} className="w-12 h-12"></img>
                            </div>

                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>

                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">

                                {Run7.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run7, type: "Yes", odds: Run7.b1, nat: Run7.nat ? Run7.nat : Run7.nation, betFor: Run7.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run7 && Run7.b1 && Run7.b1 ? Run7.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run7 && Run7.b1 && Run7.b1 ? Run7.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                                {Run7.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run7, type: "No", odds: Run7.b1, nat: Run7.nat ? Run7.nat : Run7.nation, betFor: Run7.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run7 && Run7.l1 && Run7.l1 ? Run7.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run7 && Run7.l1 && Run7.l1 ? Run7.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                              </div>
                              {/* <div className={`${posArray[Run7.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run7.sid] ?? 0.00}</div> */}
                            </div>

                          </div>

                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball8} className="w-12 h-12"></img>
                            </div>

                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>

                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">

                                {Run8.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run8, type: "Yes", odds: Run8.b1, nat: Run8.nat ? Run8.nat : Run8.nation, betFor: Run8.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run8 && Run8.b1 && Run8.b1 ? Run8.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run8 && Run8.b1 && Run8.b1 ? Run8.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                                {Run8.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run8, type: "No", odds: Run8.b1, nat: Run8.nat ? Run8.nat : Run8.nation, betFor: Run8.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run8 && Run8.l1 && Run8.l1 ? Run8.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run8 && Run8.l1 && Run8.l1 ? Run8.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }

                              </div>
                              {/* <div className={`${posArray[Run8.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run8.sid] ?? 0.00}</div> */}
                            </div>

                          </div>

                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball9} className="w-12 h-12"></img>
                            </div>
                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>
                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">
                                {Run9.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run9, type: "Yes", odds: Run9.b1, nat: Run9.nat ? Run9.nat : Run9.nation, betFor: Run9.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run9 && Run9.b1 && Run9.b1 ? Run9.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run9 && Run9.b1 && Run9.b1 ? Run9.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                                {Run9.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run9, type: "No", odds: Run9.b1, nat: Run9.nat ? Run9.nat : Run9.nation, betFor: Run9.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run9 && Run9.l1 && Run9.l1 ? Run9.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run9 && Run9.l1 && Run9.l1 ? Run9.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                              {/* <div className={`${posArray[Run9.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run9.sid] ?? 0.00}</div> */}
                            </div>
                          </div>
                          <div className="score-box">
                            <div className="flex justify-center items-center absolute -top-4 left-0 right-0">
                              <img src={Ball10} className="w-12 h-12"></img>
                            </div>
                            <div className="flex justify-between items-center px-4 pt-2">
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team A</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                              <div className="-space-y-1.5">
                                <p className="text-[12px] font-bold text-white text-center">Team B</p>
                                <p className="text-[11px] font-medium text-white">221/8 19.4 Overs</p>
                              </div>
                            </div>

                            <div className="w-1/4 mx-auto -mt-[2px]">
                              <div className="flex justify-center items-center">

                                {Run10.gstatus === "ACTIVE" ?
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run10, type: "Yes", odds: Run10.b1, nat: Run10.nat ? Run10.nat : Run10.nation, betFor: Run10.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run10 && Run10.b1 && Run10.b1 ? Run10.b1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run10 && Run10.b1 && Run10.b1 ? Run10.b1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                                {Run10.gstatus === "ACTIVE" ?
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Run10, type: "No", odds: Run10.b1, nat: Run10.nat ? Run10.nat : Run10.nation, betFor: Run10.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run10 && Run10.l1 && Run10.l1 ? Run10.l1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="odds-khaii w-full text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[14px] font-[600] darktext leading-4">{Run10 && Run10.l1 && Run10.l1 ? Run10.l1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                              {/* <div className={`${posArray[Run10.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[600] pt-1 `} > {posArray[Run10.sid] ?? 0.00}</div> */}
                            </div>
                          </div>
                          {/* <div className="px-2 flex justify-center items-center py-3">
                                <div className=" text-[10px] bg-[#03B37F] px-2 py-1 text-right rounded-[16px] flex justify-between items-center">
                                  <span>
                                    <BiMessageRounded className="text-white" size={20} />
                                  </span>
                                  <marquee className="text-white font-medium">
                                    This is 21 cards game 2,3,4,5,6 x 4 = 20 and 1 Queen. Minimum total 10 or queen is required to win.
                                  </marquee>
                                </div>
                              </div> */}
                        </div>
                      </div>
                      <marquee className="text-[#097c93] font-bold text-[12px]">
                        Team B Need 12 Runs to WIN Match. If The Score is Tie Team B will WIN.
                      </marquee>
                    </div>


                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className="text-[#FFF523] font-[600] text-[13px]">
                              {element && element.result && element.result === "1" ?
                                (<img src={Ball1} className="w-7 h-7"></img>) :

                                element && element.result && element.result === "2" ?
                                  (<img src={Ball2} className="w-7 h-7"></img>) :

                                  element && element.result && element.result === "3" ?
                                    (<img src={Ball3} className="w-7 h-7"></img>) :

                                    element && element.result && element.result === "4" ?
                                      (<img src={Ball4} className="w-7 h-7"></img>) :

                                      element && element.result && element.result === "5" ?
                                        (<img src={Ball5} className="w-7 h-7"></img>) :

                                        element && element.result && element.result === "6" ?
                                          (<img src={Ball6} className="w-7 h-7"></img>) :

                                          element && element.result && element.result === "7" ?
                                            (<img src={Ball7} className="w-7 h-7"></img>) :

                                            element && element.result && element.result === "8" ?
                                              (<img src={Ball8} className="w-7 h-7"></img>) :

                                              element && element.result && element.result === "9" ?
                                                (<img src={Ball9} className="w-7 h-7"></img>) :

                                                element && element.result && element.result === "10" ?
                                                  (<img src={Ball10} className="w-7 h-7"></img>) :
                                                  "-"}
                            </p>

                          </div>
                        )) : null}
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
                      handleButtonValues={handleButtonValues}
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


export default CricketMatch20_20
