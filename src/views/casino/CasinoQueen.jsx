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
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";
import ButtonValuesModal from "../buttonvalues/ButtonValuesModal";

function CasinoQueen({ eventId }) {
  const {
    casinoData,
    showLoader,
    tvUrl,
    name,
    betList,
    posArray,
    shortName,
    betListHandler
  } = useCasinoData(eventId)
  const dispatch = useDispatch()
  const section1Ref = useRef(null);
  const scrollTimeout = useRef(null);


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
      "sid": state.betSlipData.data.sid,
      "rate": state.count + "",
      "amount": Number(state.betSlipData.stake),
      "casinoType": state.shortName ? state.shortName : "Teen",
      "eventId": 3031,
      "betFor": state.betSlipData.nat + "",
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
  let { data, result } = casinoData ? casinoData : {};
  let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};

  let Total0 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Total1 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Total2 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let Total3 = data && data.t2 && data.t2[3] ? data.t2[3] : {};

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
        <div className={`w-full relative page_bg text-sm flex`}>
          {ResultModel &&
            ResultModel === true ? (
            <ResultModelBmx
              handleClose={handleCloseResult}
              name={name ? name : "Teenpatti onday"}
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
                        <div className="absolute top-2 left-0 w-full">
                          <div className="w-full px-1.5 lg:space-y-1 space-y-0 text-white">
                            <div>
                              <div className={`font-semibold p-[1px] tracking-tight text-[12px] ${t1.C1 > t1.C2 && t1.C1 > t1.C3 && t1.C1 > t1.C4 ? 'text-green-500' : 'text-white'}`}>
                                Total 0 :
                                <span className="text-[#ffc107]">{t1 && t1.C1 ? t1.C1 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[0] && resultCard[0] !== '1' ? (<img src={`/cards/${resultCard[0]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[4] && resultCard[4] !== '1' ? (<img src={`/cards/${resultCard[4]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[8] && resultCard[8] !== '1' ? (<img src={`/cards/${resultCard[8]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[12] && resultCard[12] !== '1' ? (<img src={`/cards/${resultCard[12]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[16] && resultCard[16] !== '1' ? (<img src={`/cards/${resultCard[16]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={` font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Total 1 :
                                <span className="text-[#ffc107]">{t1 && t1.C2 ? t1.C2 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[1] && resultCard[1] !== '1' ? (<img src={`/cards/${resultCard[1]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[5] && resultCard[5] !== '1' ? (<img src={`/cards/${resultCard[5]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[9] && resultCard[9] !== '1' ? (<img src={`/cards/${resultCard[9]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[13] && resultCard[13] !== '1' ? (<img src={`/cards/${resultCard[13]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={` font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Total 2 :
                                <span className="text-[#ffc107]">{t1 && t1.C3 ? t1.C3 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[2] && resultCard[2] !== '1' ? (<img src={`/cards/${resultCard[2]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[6] && resultCard[6] !== '1' ? (<img src={`/cards/${resultCard[6]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[10] && resultCard[10] !== '1' ? (<img src={`/cards/${resultCard[10]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[14] && resultCard[14] !== '1' ? (<img src={`/cards/${resultCard[14]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={`font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Total 3 :
                                <span className="text-[#ffc107]">{t1.C4}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[3] && resultCard[3] !== '1' ? (<img src={`/cards/${resultCard[3]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[7] && resultCard[7] !== '1' ? (<img src={`/cards/${resultCard[7]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[11] && resultCard[11] !== '1' ? (<img src={`/cards/${resultCard[11]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[15] && resultCard[15] !== '1' ? (<img src={`/cards/${resultCard[15]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.lasttime} />
                        </div>
                      </div>
                    </div>

                    <div className="page_bg lg:px-0 px-1">

                      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2 py-2">

                        <div className="">
                          <div className="flex justify-center items-center darktext ">
                            <p className="text-[14px] font-semibold" >
                              {Total0 && Total0.nat ? Total0.nat : Total0.nation ? Total0.nation : "Total 0"}
                            </p>
                          </div>

                          <div className="flex justify-center items-center space-x-1">

                            {Total0.gstatus === "ACTIVE" ?
                              <div className="light-blue w-full text-center py-2.5 cursor-pointer relative" onClick={() => handleBackOpen(
                                { data: Total0, type: "Yes", odds: Total0.b1, nat: Total0.nat ? Total0.nat : Total0.nation, betFor: "queen" }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{Total0 && Total0.b1 && Total0.b1 ? Total0.b1 : "0.00"}</div>
                              </div>
                              :
                              <div className="light-blue w-full text-center py-2.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{Total0 && Total0.b1 && Total0.b1 ? Total0.b1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }
                            {Total0.gstatus === "ACTIVE" ?
                              <div className="odds-khaii  w-full text-center py-2.5 cursor-pointer relative" onClick={() => handleBackOpen({ data: Total0, type: "No", odds: Total0.l1, nat: Total0.nat ? Total0.nat : Total0.nation, betFor: "queen" }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{Total0 && Total0.l1 && Total0.l1 ? Total0.l1 : "0.00"}</div>
                              </div>
                              :
                              <div className="odds-khaii  w-full text-center py-2.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{Total0 && Total0.l1 && Total0.l1 ? Total0.l1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }

                          </div>
                        </div>

                        <div className="">
                          <div className="flex justify-center items-center darktext ">
                            <p className="text-[14px] font-semibold">
                              {Total1 && Total1.nat ? Total1.nat : Total1.nation ? Total1.nation : "Total 1 "}
                            </p>
                          </div>
                          <div className="flex justify-center items-center space-x-1">

                            {Total1.gstatus === "ACTIVE" ?
                              <div className="light-blue w-full text-center py-2.5 cursor-pointer relative" onClick={() => handleBackOpen(
                                { data: Total1, type: "Yes", odds: Total1.b1, nat: Total1.nat ? Total1.nat : Total1.nation, betFor: "queen" }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{Total1 && Total1.b1 && Total1.b1 ? Total1.b1 : "0.00"}</div>
                              </div>
                              :
                              <div className="light-blue w-full text-center py-2.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{Total1 && Total1.b1 && Total1.b1 ? Total1.b1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }
                            {Total1.gstatus === "ACTIVE" ?
                              <div className="odds-khaii  w-full text-center py-2.5 cursor-pointer relative" onClick={() => handleBackOpen({ data: Total1, type: "No", odds: Total1.l1, nat: Total1.nat ? Total1.nat : Total1.nation, betFor: "queen" }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{Total1 && Total1.l1 && Total1.l1 ? Total1.l1 : "0.00"}</div>
                              </div>
                              :
                              <div className="odds-khaii  w-full text-center py-2.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{Total1 && Total1.l1 && Total1.l1 ? Total1.l1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }

                          </div>
                        </div>

                        <div className="">
                          <div className="flex justify-center items-center darktext">
                            <p className="text-[14px] font-semibold">
                              {Total2 && Total2.nat ? Total2.nat : Total2.nation ? Total2.nation : "Total 2"}
                            </p>
                          </div>
                          <div className="flex justify-center items-center space-x-1">

                            {Total2.gstatus === "ACTIVE" ?
                              <div className="light-blue w-full text-center py-2.5 cursor-pointer relative" onClick={() => handleBackOpen(
                                { data: Total2, type: "Yes", odds: Total2.b1, nat: Total2.nat ? Total2.nat : Total2.nation, betFor: "queen" }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{Total2 && Total2.b1 && Total2.b1 ? Total2.b1 : "0.00"}</div>
                              </div>
                              :
                              <div className="light-blue w-full text-center py-2.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{Total2 && Total2.b1 && Total2.b1 ? Total2.b1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }
                            {Total2.gstatus === "ACTIVE" ?
                              <div className="odds-khaii  w-full text-center py-2.5 cursor-pointer relative" onClick={() => handleBackOpen({ data: Total2, type: "No", odds: Total2.l1, nat: Total2.nat ? Total2.nat : Total2.nation, betFor: "queen" }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{Total2 && Total2.l1 && Total2.l1 ? Total2.l1 : "0.00"}</div>
                              </div>
                              :
                              <div className="odds-khaii  w-full text-center py-2.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{Total2 && Total2.l1 && Total2.l1 ? Total2.l1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }

                          </div>
                        </div>

                        <div className="">
                          <div className="flex justify-center items-center darktext">
                            <p className="text-[14px] font-semibold">
                              {Total3 && Total3.nat ? Total3.nat : Total3.nation ? Total3.nation : "Total 3 "}
                            </p>
                          </div>
                          <div className="flex justify-center items-center space-x-1">

                            {Total3.gstatus === "ACTIVE" ?
                              <div className="light-blue w-full text-center py-2.5 cursor-pointer relative" onClick={() => handleBackOpen(
                                { data: Total3, type: "Yes", odds: Total3.b1, nat: Total3.nat ? Total3.nat : Total3.nation, betFor: "queen" }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{Total3 && Total3.b1 && Total3.b1 ? Total3.b1 : "0.00"}</div>
                              </div>
                              :
                              <div className="light-blue w-full text-center py-2.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{Total3 && Total3.b1 && Total3.b1 ? Total3.b1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }
                            {Total3.gstatus === "ACTIVE" ?
                              <div className="odds-khaii  w-full text-center py-2.5 cursor-pointer relative" onClick={() => handleBackOpen({ data: Total3, type: "No", odds: Total3.l1, nat: Total3.nat ? Total3.nat : Total3.nation, betFor: "queen" }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{Total3 && Total3.l1 && Total3.l1 ? Total3.l1 : "0.00"}</div>
                              </div>
                              :
                              <div className="odds-khaii  w-full text-center py-2.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{Total3 && Total3.l1 && Total3.l1 ? Total3.l1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }

                          </div>

                        </div>

                      </div>

                      <marquee className="text-[#097c93] font-bold text-[12px] py-1">
                        This is 21 cards game 2,3,4,5,6 x 4 =20 and 1 Queen. Minimum total 10 or queen is required to win.
                      </marquee>

                    </div>


                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className="text-[#ffff33] font-[600] text-[13px]">
                              {element && element.result && element.result === "4" ? "3" : element && element.result && element.result === "1" ? "0" : element && element.result && element.result === "2" ? "1" : element && element.result && element.result === "3" ? "2" : "-"}
                            </p>
                          </div>
                        )) : null}
                      </div>
                    </div>

                  </div>
                  <div className="lg:w-[30%]  sticky top-0  lg:h-[calc(100vh-400px)] w-full bg-white lg:px-1.5 lg:block hidden">
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
                        <BetListTableDesktop betList={betList} />
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


export default CasinoQueen
