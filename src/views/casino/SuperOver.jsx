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
import Teenpattiondayrules from '../../component/casinoComponent/images/superoverrules.jpg';
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
import heart from "../../component/casinoComponent/images/heart.png";
import club from "../../component/casinoComponent/images/club.png";
import diamond from "../../component/casinoComponent/images/diamond.png";
import spade from "../../component/casinoComponent/images/spade.png"
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";
import ButtonValuesModal from "../buttonvalues/ButtonValuesModal";

function SuperOver({ eventId }) {
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
  let t2 = data && data.t1 && data.t1[1] ? data.t1[1] : {};
  let t3 = data && data.t3 ? data.t3 : null;
  let t4 = data && data.t4 ? data.t4 : null;

  let Name1 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Name2 = data && data.t2 && data.t2[1] ? data.t2[1] : {};

  let Name3 = data && data.t3 && data.t3[0] ? data.t3[0] : {};
  let Name4 = data && data.t3 && data.t3[1] ? data.t3[1] : {};

  let Name5 = data && data.t4 && data.t4[0] ? data.t4[0] : {};
  let Name6 = data && data.t4 && data.t4[1] ? data.t4[1] : {};
  let Name7 = data && data.t4 && data.t4[2] ? data.t4[2] : {};
  let Name8 = data && data.t4 && data.t4[3] ? data.t4[3] : {};
  let Name9 = data && data.t4 && data.t4[4] ? data.t4[4] : {};
  let Name10 = data && data.t4 && data.t4[5] ? data.t4[5] : {};
  let Name11 = data && data.t4 && data.t4[6] ? data.t4[6] : {};
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
                        <div className="absolute top-0 left-0 w-full">
                          <div className="text-white font-semibold px-1 lg:py-[2px] py-0 tracking-wide uppercase text-[14px]">Card</div>
                          <div className="w-full p-1 space-y-1">
                            <div>
                              <div className="flex space-x-1 justify-start">
                                <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                              </div>
                              {/* <div className="text-white font-semibold p-[1px] tracking-wide bg-black/80 text-[12px]">Player A</div> */}
                            </div>

                            <div>
                              <div className="flex space-x-1 justify-start">
                                <img src={`/cards/${t2 && t2.C1 ? t2.C1 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                <img src={`/cards/${t2 && t2.C2 ? t2.C2 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                <img src={`/cards/${t2 && t2.C3 ? t2.C3 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                              </div>
                              {/* <div className="text-white font-semibold p-[1px] tracking-wide bg-black/80 text-[12px]">Player B</div> */}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="page_bg white-text lg:mt-1.5 mt-0 space-y-1.5">

                      <div className="">

                        <div className="even-background white-text font-[600] text-[14px] px-2 py-1.5">Bookmaker</div>

                        <div className=" grid lg:grid-cols-10 grid-cols-5 text-center darktext font-[600] text-[14px] uppercase divide-x divide-[#c7c8ca]">
                          <div className="lg:col-span-8 col-span-3 w-full text-[#097c93] text-[12px] flex justify-start items-center px-2 py-1">
                            MIN:{minStake} &nbsp; MAX:{maxStake}
                          </div>
                          <div className="w-full flex justify-center items-center light-blue py-1">Back</div>
                          <div className="w-full flex justify-center items-center odds-khaii py-1">Lay</div>
                        </div>

                        <div className="w-full text-center bg-white">
                          <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y divide-[#c7c8ca]">
                            <div className="grey-color lg:col-span-8 col-span-3 h-full text-[14px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                              <div>
                                {Name1 && Name1.nat ? Name1.nat : Name1.nation ? Name1.nation : (Name1.nat)}
                              </div>
                              <div className={`text-[12px] ${posArray[Name1.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name1.sid]}</div>
                            </div>

                            <div className="flex justify-end items-center w-full">
                              {Name1 && Name1.status === 'ACTIVE' && Name1.b1 != 0 ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Name1, type: "Yes", odds: Name1.b1, nat: Name1.nat ? Name1.nat : Name1.nation, type: "Yes" }, section1Ref)}>
                                  <div className=" text-center py-1" >
                                    <span className="text-[14px] dark-text font-medium">{Name1 && Name1.b1 ? (Name1.b1) : "-"}</span><br />
                                    <span className="text-[10px] dark-text font-medium">{Name1 && Name1.bs1 ? (Name1.bs1) : "-"}</span>
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center relative lagai-background dark-text py-1">
                                    {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                    <span className="text-[14px] font-semibold">{Name1 && Name1.b1 ? (Name1.b1) : "-"}</span><br />
                                    <span className="text-[10px] dark-text font-medium">{Name1 && Name1.bs1 ? (Name1.bs1) : "-"}</span>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center w-full">
                              {Name1 && Name1.status === 'ACTIVE' && Name1.l1 != 0 ?
                                <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name1, type: "Yes", odds: Name1.l1, nat: Name1.nat ? Name1.nat : Name1.nation, type: "No" }, section1Ref)}>
                                  <div className=" text-center py-1" >
                                    <span className="text-[14px] dark-text font-medium">{Name1 && Name1.l1 ? (Name1.l1) : "-"}</span><br />
                                    <span className="text-[10px] dark-text font-medium">{Name1 && Name1.ls1 ? (Name1.ls1) : "-"}</span>
                                  </div>
                                </div> :
                                <div className="w-full odds-khaii cursor-pointer " >
                                  <div className=" text-center relative khai-background darktext py-1">
                                    <span className="text-[14px] font-semibold">{Name1 && Name1.l1 ? (Name1.l1) : "-"}</span><br />
                                    <span className="text-[10px] font-medium">{Name1 && Name1.ls1 ? (Name1.ls1) : "-"}</span>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>

                          </div>
                        </div>

                        <div className="w-full text-center bg-white">
                          <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y divide-[#c7c8ca]">
                            <div className="grey-color lg:col-span-8 col-span-3 h-full text-[14px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                              <div>
                                {Name2 && Name2.nat ? Name2.nat : Name2.nation ? Name2.nation : (Name2.nat)}
                              </div>
                              <div className={`text-[12px] ${posArray[Name2.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name2.sid]}</div>
                            </div>
                            <div className="flex justify-end items-center w-full">
                              {Name2 && Name2.status === 'ACTIVE' && Name2.b1 != 0 ?
                                <div className="w-full light-blue cursor-pointer darktext py-1" onClick={() => handleBackOpen({ data: Name2, type: "Yes", odds: Name2.b1, nat: Name2.nat ? Name2.nat : Name2.nation, type: "Yes" }, section1Ref)}>
                                  <div className=" text-center" >
                                    <span className="text-[14px] font-[600]">{Name2 && Name2.b1 ? (Name2.b1) : "-"}</span><br />
                                    <span className="text-[10px] font-medium">{Name2 && Name2.bs1 ? (Name2.bs1) : "-"}</span><br />
                                  </div>
                                </div> :
                                <div className="w-full light-blue cursor-pointer " >
                                  <div className=" text-center relative lagai-background darktext py-1">
                                    <span className="text-[14px] font-[600]">{Name2 && Name2.b1 ? (Name2.b1) : "-"}</span><br />
                                    <span className="text-[10px] font-medium">{Name2 && Name2.bs1 ? (Name2.bs1) : "-"}</span><br />
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center w-full">
                              {Name2 && Name2.status === 'ACTIVE' && Name2.l1 != 0 ?
                                <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name2, type: "Yes", odds: Name2.l1, nat: Name2.nat ? Name2.nat : Name2.nation, type: "No" }, section1Ref)}>
                                  <div className=" text-center darktext py-1" >
                                    <span className="text-[14px] font-[600]">{Name2 && Name2.l1 ? (Name2.l1) : "-"}</span><br />
                                    <span className="text-[10px] font-medium">{Name2 && Name2.ls1 ? (Name2.ls1) : "-"}</span>
                                  </div>
                                </div> :
                                <div className="w-full odds-khaii cursor-pointer " >
                                  <div className=" text-center relative khai-background dark-text py-1">
                                    <span className="text-[14px] font-[600]">{Name2 && Name2.l1 ? (Name2.l1) : "-"}</span><br />
                                    <span className="text-[10px] dark-text font-medium">{Name2 && Name2.ls1 ? (Name2.ls1) : "-"}</span>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>

                      </div>



                      <div className="">
                        <div className="grid lg:grid-cols-1 grid-cols-1 lg:space-y-4 space-y-2">

                          <div>
                            {t3 == null ? null
                              : (
                                <>
                                  <div className="even-background white-text font-[600] text-[14px] px-2 py-1.5">Fancy</div>
                                  <div className="page_bg grid lg:grid-cols-10 grid-cols-5 text-center darktext font-[600] text-[14px] uppercase divide-x divide-[#c7c8ca]">
                                    <div className="lg:col-span-7 col-span-3 w-full text-[12px] flex justify-start white-text items-center py-1"></div>
                                    <div className="w-full flex justify-center items-center odds-khaii py-1">No</div>
                                    <div className="w-full flex justify-center items-center light-blue py-1">Yes</div>
                                    <div className="w-full lg:flex hidden justify-center items-center py-1"></div>
                                  </div>

                                  {Name3 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y divide-[#c7c8ca]">
                                        <div className="grey-color lg:col-span-7 col-span-3 h-full text-[13px] capitalize darktext font-[500] px-2 py-1 w-full text-left">
                                          <div>{Name3.nat || ""}</div>
                                          <div className={`text-[12px] ${posArray[Name3.sid] < 0 ? "text-red-500" : "text-green-800"}`}>
                                            {posArray[Name3.sid]}
                                          </div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name3.status === 'ACTIVE' && Name3.l1 != 0 ? (
                                            <div
                                              className="w-full odds-khaii darktext cursor-pointer"
                                              onClick={() =>
                                                handleBackOpen(
                                                  { data: Name3, type: "No", odds: Name3.l1, nat: Name3.nat ? Name3.nat : Name3.nation },
                                                  section1Ref
                                                )
                                              }
                                            >
                                              <div className="text-center darktext py-1">
                                                <span className="text-[14px] font-[600]">{Name3.l1 || "-"}</span>
                                                <br />
                                                <span className="text-[10px] font-[500]">{Name3.ls1 || "-"}</span>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="w-full odds-khaii cursor-pointer">
                                              <div className="text-center relative khai-background darktext py-1">
                                                <span className="text-[14px] font-[600]">{Name3.l1 || "-"}</span>
                                                <br />
                                                <span className="text-[10px] font-[500]">{Name3.ls1 || "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name3.status === 'ACTIVE' && Name3.b1 != 0 ? (
                                            <div
                                              className="w-full light-blue darktext cursor-pointer"
                                              onClick={() =>
                                                handleBackOpen(
                                                  { data: Name3, type: "Yes", odds: Name3.b1, nat: Name3.nat ? Name3.nat : Name3.nation },
                                                  section1Ref
                                                )
                                              }
                                            >
                                              <div className="text-center py-1">
                                                <span className="text-[14px] font-[600]">{Name3.b1 || "-"}</span>
                                                <br />
                                                <span className="text-[10px] font-[500]">{Name3.bs1 || "-"}</span>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="w-full light-blue cursor-pointer">
                                              <div className="text-center relative lagai-background darktext py-1">
                                                <span className="text-[14px] font-[600]">{Name3.b1 || "-"}</span>
                                                <br />
                                                <span className="text-[10px] font-[500]">{Name3.bs1 || "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2 py-1 relative">
                                          <span>MIN: {minStake}</span>
                                          <br />
                                          <span>&nbsp;MAX: {maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {Name4 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y divide-[#c7c8ca]">
                                        <div className="grey-color lg:col-span-7 col-span-3 h-full text-[13px] capitalize darktext font-[500] px-2 py-1 w-full text-left">
                                          <div>{Name4.nat || ""}</div>
                                          <div className={`text-[12px] ${posArray[Name4.sid] < 0 ? "text-red-500" : "text-green-800"}`}>
                                            {posArray[Name4.sid]}
                                          </div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name4.status === 'ACTIVE' && Name4.l1 != 0 ? (
                                            <div
                                              className="w-full odds-khaii darktext cursor-pointer"
                                              onClick={() =>
                                                handleBackOpen(
                                                  { data: Name4, type: "No", odds: Name4.l1, nat: Name4.nat ? Name4.nat : Name4.nation },
                                                  section1Ref
                                                )
                                              }
                                            >
                                              <div className="text-center py-1">
                                                <span className="text-[14px] font-[600]">{Name4.l1 || "-"}</span>
                                                <br />
                                                <span className="text-[10px] font-[500]">{Name4.ls1 || "-"}</span>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="w-full odds-khaii cursor-pointer">
                                              <div className="text-center relative khai-background darktext py-1">
                                                <span className="text-[14px] font-[600]">{Name4.l1 || "-"}</span>
                                                <br />
                                                <span className="text-[10px] font-[500]">{Name4.ls1 || "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name4.status === 'ACTIVE' && Name4.b1 != 0 ? (
                                            <div
                                              className="w-full light-blue darktext cursor-pointer"
                                              onClick={() =>
                                                handleBackOpen(
                                                  { data: Name4, type: "Yes", odds: Name4.b1, nat: Name4.nat ? Name4.nat : Name4.nation },
                                                  section1Ref
                                                )
                                              }
                                            >
                                              <div className="text-center py-1">
                                                <span className="text-[14px] font-[600]">{Name4.b1 || "-"}</span>
                                                <br />
                                                <span className="text-[10px] font-[500]">{Name4.bs1 || "-"}</span>
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="w-full light-blue cursor-pointer">
                                              <div className="text-center relative lagai-background darktext py-1">
                                                <span className="text-[14px] font-[600]">{Name4.b1 || "-"}</span>
                                                <br />
                                                <span className="text-[10px] font-[500]">{Name4.bs1 || "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2 py-1 relative">
                                          <span>MIN: {minStake}</span>
                                          <br />
                                          <span>&nbsp;MAX: {maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                          </div>



                          <div>
                            {/* {(Name5 && Name5.length > 0) || (Name6 && Name6.length > 0) || (Name7 && Name7.length > 0) || (Name8 && Name8.length > 0) || (Name9 && Name9.length > 0) || (Name10 && Name10.length > 0) || (Name11 && Name11.length > 0) ? */}
                            {t4 == null ? null
                              : (
                                <>
                                  <div className="even-background white-text font-[600] text-[14px] px-2 py-1.5">Fancy1</div>

                                  <div className="page_bg grid lg:grid-cols-10 grid-cols-5 text-center darktext font-[600] text-[14px] uppercase divide-x divide-[#c7c8ca]">
                                    <div className="lg:col-span-7 col-span-3 w-full flex justify-start white-text items-center py-1"></div>
                                    <div className="w-full flex justify-center items-center light-blue py-1">Back</div>
                                    <div className="w-full flex justify-center items-center odds-khaii py-1">Lay</div>
                                    <div className="w-full flex justify-center items-center"></div>
                                  </div>

                                  {Name5 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y  divide-[#c7c8ca]">
                                        <div className="lg:col-span-7 col-span-3 h-full text-[13px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                                          <div>
                                            {Name5 && Name5.nat ? Name5.nat : Name5.nation ? Name5.nation : (Name5.nat)}
                                          </div>
                                          <div className={`text-[12px] ${posArray[Name5.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name5.sid]}</div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name5 && Name5.status === 'ACTIVE' && Name5.b1 != 0 ?
                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Name5, type: "Yes", odds: Name5.b1, nat: Name5.nat ? Name5.nat : Name5.nation, type: "Yes" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name5 && Name5.b1 ? (Name5.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name5 && Name5.bs1 ? (Name5.bs1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full light-blue cursor-pointer " >
                                              <div className=" text-center relative lagai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name5 && Name5.b1 ? (Name5.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name5 && Name5.bs1 ? (Name5.bs1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name5 && Name5.status === 'ACTIVE' && Name5.l1 != 0 ?
                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name5, type: "Yes", odds: Name5.l1, nat: Name5.nat ? Name5.nat : Name5.nation, type: "No" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name5 && Name5.l1 ? (Name5.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name5 && Name5.ls1 ? (Name5.ls1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full odds-khaii cursor-pointer " >
                                              <div className=" text-center relative khai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name5 && Name5.l1 ? (Name5.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name5 && Name5.ls1 ? (Name5.ls1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2  py-1 relative">
                                          <span className="">MIN :{minStake} </span><br />
                                          <span className="">&nbsp; MAX :{maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {Name6 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y  divide-[#c7c8ca]">
                                        <div className="lg:col-span-7 col-span-3 h-full text-[13px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                                          <div>
                                            {Name6 && Name6.nat ? Name6.nat : Name6.nation ? Name6.nation : (Name6.nat)}
                                          </div>
                                          <div className={`text-[12px] ${posArray[Name6.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name6.sid]}</div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name6 && Name6.status === 'ACTIVE' && Name6.b1 != 0 ?
                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Name6, type: "Yes", odds: Name6.b1, nat: Name6.nat ? Name6.nat : Name6.nation, type: "Yes" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name6 && Name6.b1 ? (Name6.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name6 && Name6.bs1 ? (Name6.bs1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full light-blue cursor-pointer " >
                                              <div className=" text-center relative lagai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name6 && Name6.b1 ? (Name6.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name6 && Name6.bs1 ? (Name6.bs1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name6 && Name6.status === 'ACTIVE' && Name6.l1 != 0 ?
                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name6, type: "Yes", odds: Name6.l1, nat: Name6.nat ? Name6.nat : Name6.nation, type: "No" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name6 && Name6.l1 ? (Name6.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name6 && Name6.ls1 ? (Name6.ls1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full odds-khaii cursor-pointer " >
                                              <div className=" text-center relative khai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name6 && Name6.l1 ? (Name6.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name6 && Name6.ls1 ? (Name6.ls1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2  py-1 relative">
                                          <span className="">MIN :{minStake} </span><br />
                                          <span className="">&nbsp; MAX :{maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {Name7 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y  divide-[#c7c8ca]">
                                        <div className="lg:col-span-7 col-span-3 h-full text-[13px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                                          <div>
                                            {Name7 && Name7.nat ? Name7.nat : Name7.nation ? Name7.nation : (Name7.nat)}
                                          </div>
                                          <div className={`text-[12px] ${posArray[Name7.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name7.sid]}</div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name7 && Name7.status === 'ACTIVE' && Name7.b1 != 0 ?
                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Name7, type: "Yes", odds: Name7.b1, nat: Name7.nat ? Name7.nat : Name7.nation, type: "Yes" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name7 && Name7.b1 ? (Name7.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name7 && Name7.bs1 ? (Name7.bs1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full light-blue cursor-pointer " >
                                              <div className=" text-center relative lagai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name7 && Name7.b1 ? (Name7.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name7 && Name7.bs1 ? (Name7.bs1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name7 && Name7.status === 'ACTIVE' && Name7.l1 != 0 ?
                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name7, type: "Yes", odds: Name7.l1, nat: Name7.nat ? Name7.nat : Name7.nation, type: "No" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name7 && Name7.l1 ? (Name7.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name7 && Name7.ls1 ? (Name7.ls1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full odds-khaii cursor-pointer " >
                                              <div className=" text-center relative khai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name7 && Name7.l1 ? (Name7.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name7 && Name7.ls1 ? (Name7.ls1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2  py-1 relative">
                                          <span className="">MIN :{minStake} </span><br />
                                          <span className="">&nbsp; MAX :{maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {Name8 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y  divide-[#c7c8ca]">
                                        <div className="lg:col-span-7 col-span-3 h-full text-[13px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                                          <div>
                                            {Name8 && Name8.nat ? Name8.nat : Name8.nation ? Name8.nation : (Name8.nat)}
                                          </div>
                                          <div className={`text-[12px] ${posArray[Name8.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name8.sid]}</div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name8 && Name8.status === 'ACTIVE' && Name8.b1 != 0 ?
                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Name8, type: "Yes", odds: Name8.b1, nat: Name8.nat ? Name8.nat : Name8.nation, type: "Yes" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name8 && Name8.b1 ? (Name8.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name8 && Name8.bs1 ? (Name8.bs1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full light-blue cursor-pointer " >
                                              <div className=" text-center relative lagai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name8 && Name8.b1 ? (Name8.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name8 && Name8.bs1 ? (Name8.bs1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name8 && Name8.status === 'ACTIVE' && Name8.l1 != 0 ?
                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name8, type: "Yes", odds: Name8.l1, nat: Name8.nat ? Name8.nat : Name8.nation, type: "No" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name8 && Name8.l1 ? (Name8.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name8 && Name8.ls1 ? (Name8.ls1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full odds-khaii cursor-pointer " >
                                              <div className=" text-center relative khai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name8 && Name8.l1 ? (Name8.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name8 && Name8.ls1 ? (Name8.ls1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2  py-1 relative">
                                          <span className="">MIN :{minStake} </span><br />
                                          <span className="">&nbsp; MAX :{maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {Name9 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y  divide-[#c7c8ca]">
                                        <div className="lg:col-span-7 col-span-3 h-full text-[13px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                                          <div>
                                            {Name9 && Name9.nat ? Name9.nat : Name9.nation ? Name9.nation : (Name9.nat)}
                                          </div>
                                          <div className={`text-[12px] ${posArray[Name9.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name9.sid]}</div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name9 && Name9.status === 'ACTIVE' && Name9.b1 != 0 ?
                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Name9, type: "Yes", odds: Name9.b1, nat: Name9.nat ? Name9.nat : Name9.nation, type: "Yes" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name9 && Name9.b1 ? (Name9.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name9 && Name9.bs1 ? (Name9.bs1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full light-blue cursor-pointer " >
                                              <div className=" text-center relative lagai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name9 && Name9.b1 ? (Name9.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name9 && Name9.bs1 ? (Name9.bs1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name9 && Name9.status === 'ACTIVE' && Name9.l1 != 0 ?
                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name9, type: "Yes", odds: Name9.l1, nat: Name9.nat ? Name9.nat : Name9.nation, type: "No" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name9 && Name9.l1 ? (Name9.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name9 && Name9.ls1 ? (Name9.ls1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full odds-khaii cursor-pointer " >
                                              <div className=" text-center relative khai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name9 && Name9.l1 ? (Name9.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name9 && Name9.ls1 ? (Name9.ls1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2  py-1 relative">
                                          <span className="">MIN :{minStake} </span><br />
                                          <span className="">&nbsp; MAX :{maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {Name10 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y  divide-[#c7c8ca]">
                                        <div className="lg:col-span-7 col-span-3 h-full text-[13px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                                          <div>
                                            {Name10 && Name10.nat ? Name10.nat : Name10.nation ? Name10.nation : (Name10.nat)}
                                          </div>
                                          <div className={`text-[12px] ${posArray[Name10.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name10.sid]}</div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name10 && Name10.status === 'ACTIVE' && Name10.b1 != 0 ?
                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Name10, type: "Yes", odds: Name10.b1, nat: Name10.nat ? Name10.nat : Name10.nation, type: "Yes" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name10 && Name10.b1 ? (Name10.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name10 && Name10.bs1 ? (Name10.bs1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full light-blue cursor-pointer " >
                                              <div className=" text-center relative lagai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name10 && Name10.b1 ? (Name10.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name10 && Name10.bs1 ? (Name10.bs1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name10 && Name10.status === 'ACTIVE' && Name10.l1 != 0 ?
                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name10, type: "Yes", odds: Name10.l1, nat: Name10.nat ? Name10.nat : Name10.nation, type: "No" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name10 && Name10.l1 ? (Name10.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name10 && Name10.ls1 ? (Name10.ls1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full odds-khaii cursor-pointer " >
                                              <div className=" text-center relative khai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name10 && Name10.l1 ? (Name10.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name10 && Name10.ls1 ? (Name10.ls1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2  py-1 relative">
                                          <span className="">MIN :{minStake} </span><br />
                                          <span className="">&nbsp; MAX :{maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {Name11 && (
                                    <div className="w-full text-center grey-color">
                                      <div className="grid lg:grid-cols-10 grid-cols-5 divide-x divide-y  divide-[#c7c8ca]">
                                        <div className="lg:col-span-7 col-span-3 h-full text-[13px] capitalize text-gray-800 font-medium px-2 py-1 w-full text-left">
                                          <div>
                                            {Name11 && Name11.nat ? Name11.nat : Name11.nation ? Name11.nation : (Name11.nat)}
                                          </div>
                                          <div className={`text-[12px] ${posArray[Name11.sid] < 0 ? "text-red-500" : "text-green-800"}`} >{posArray[Name11.sid]}</div>
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name11 && Name11.status === 'ACTIVE' && Name11.b1 != 0 ?
                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: Name11, type: "Yes", odds: Name11.b1, nat: Name11.nat ? Name11.nat : Name11.nation, type: "Yes" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name11 && Name11.b1 ? (Name11.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name11 && Name11.bs1 ? (Name11.bs1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full light-blue cursor-pointer " >
                                              <div className=" text-center relative lagai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name11 && Name11.b1 ? (Name11.b1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name11 && Name11.bs1 ? (Name11.bs1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="flex justify-end items-center w-full">
                                          {Name11 && Name11.status === 'ACTIVE' && Name11.l1 != 0 ?
                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Name11, type: "Yes", odds: Name11.l1, nat: Name11.nat ? Name11.nat : Name11.nation, type: "No" }, section1Ref)}>
                                              <div className=" text-center darktext py-1" >
                                                <span className="text-[14px] font-[600]">{Name11 && Name11.l1 ? (Name11.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name11 && Name11.ls1 ? (Name11.ls1) : "-"}</span>
                                              </div>
                                            </div> :
                                            <div className="w-full odds-khaii cursor-pointer " >
                                              <div className=" text-center relative khai-background darktext py-1">
                                                {/* <span className='bg-white/50 px-1.5 py-1 border-[1px] border-black uppercase'>suspended</span> */}
                                                <span className="text-[14px] font-[600]">{Name11 && Name11.l1 ? (Name11.l1) : "-"}</span><br />
                                                <span className="text-[10px] font-[500]">{Name11 && Name11.ls1 ? (Name11.ls1) : "-"}</span>
                                                <BetLocked />
                                              </div>
                                            </div>}
                                        </div>
                                        <div className="lg:block hidden text-[#097c93] font-[600] w-full lg:text-[12px] text-[10px] text-right px-2  py-1 relative">
                                          <span className="">MIN :{minStake} </span><br />
                                          <span className="">&nbsp; MAX :{maxStake}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                </>
                              )}
                            {/* : null} */}
                          </div>


                        </div>
                      </div>

                    </div>



                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className="text-[#FFF523] font-[600] text-[13px]">
                              {element && element.result === '2' ? "R" :
                                element && element.result === '1' ? <p className="text-[#FF4502] font-[600] text-[13px]">E</p> : "T"}
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


export default SuperOver
