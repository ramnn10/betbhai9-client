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
import Teenpattiondayrules from '../../component/casinoComponent/images/cards32arule.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import BetPlayerName from "../../component/casinoComponent/BetPlayerName";
import BetButtonCards from "../../component/casinoComponent/BetButtonCards";
import BetButton from "../../component/casinoComponent/BetButton";
import Poker6PlayerCardButton from "../../component/casinoComponent/Poker6PlayerCardButton";
import Poker6PlayerBetButton from "../../component/casinoComponent/Poker6PlayerBetButton";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";
import ButtonValuesModal from "../buttonvalues/ButtonValuesModal";

function Cards32_A({ eventId }) {
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
  let t2 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Player8 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Player9 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Player10 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let Player11 = data && data.t2 && data.t2[3] ? data.t2[3] : {};


  const maxValue = Math.max(t1.C1, t1.C2, t1.C3, t1.C4);
  const getColorClass = (value) => value === maxValue ? 'text-green-500' : 'text-white';

  let resultCard;
  if (t1 && t1.desc && typeof t1.desc === 'string') {
    resultCard = t1.desc.split(',');
  } else {
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
                          <div className="w-full px-1 lg:space-y-1 space-y-0">
                            <div>
                              <div className={`font-semibold p-[1px] tracking-tight text-[12px] ${t1.C1 > t1.C2 && t1.C1 > t1.C3 && t1.C1 > t1.C4 ? 'text-green-500' : 'text-white'}`}>
                                Player 8 :
                                <span className="text-[#ffc107]">{t1 && t1.C1 ? t1.C1 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[0] && resultCard[0] !== '1' ? (<img src={`/cards/${resultCard[0]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[4] && resultCard[4] !== '1' ? (<img src={`/cards/${resultCard[4]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[8] && resultCard[8] !== '1' ? (<img src={`/cards/${resultCard[8]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[12] && resultCard[12] !== '1' ? (<img src={`/cards/${resultCard[12]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[16] && resultCard[16] !== '1' ? (<img src={`/cards/${resultCard[16]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[20] && resultCard[20] !== '1' ? (<img src={`/cards/${resultCard[20]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[24] && resultCard[24] !== '1' ? (<img src={`/cards/${resultCard[24]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[28] && resultCard[28] !== '1' ? (<img src={`/cards/${resultCard[28]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[32] && resultCard[32] !== '1' ? (<img src={`/cards/${resultCard[32]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={` ${getColorClass(t1.C2)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Player 9 :
                                <span className="text-[#ffc107]">{t1 && t1.C2 ? t1.C2 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[1] && resultCard[1] !== '1' ? (<img src={`/cards/${resultCard[1]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[5] && resultCard[5] !== '1' ? (<img src={`/cards/${resultCard[5]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[9] && resultCard[9] !== '1' ? (<img src={`/cards/${resultCard[9]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[13] && resultCard[13] !== '1' ? (<img src={`/cards/${resultCard[13]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[17] && resultCard[17] !== '1' ? (<img src={`/cards/${resultCard[17]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[21] && resultCard[21] !== '1' ? (<img src={`/cards/${resultCard[21]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[25] && resultCard[25] !== '1' ? (<img src={`/cards/${resultCard[25]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[29] && resultCard[29] !== '1' ? (<img src={`/cards/${resultCard[29]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[33] && resultCard[33] !== '1' ? (<img src={`/cards/${resultCard[33]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={` ${getColorClass(t1.C3)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Player 10 :
                                <span className="text-[#ffc107]">{t1 && t1.C3 ? t1.C3 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[2] && resultCard[2] !== '1' ? (<img src={`/cards/${resultCard[2]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[6] && resultCard[6] !== '1' ? (<img src={`/cards/${resultCard[6]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[10] && resultCard[10] !== '1' ? (<img src={`/cards/${resultCard[10]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[14] && resultCard[14] !== '1' ? (<img src={`/cards/${resultCard[14]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[18] && resultCard[18] !== '1' ? (<img src={`/cards/${resultCard[18]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[22] && resultCard[22] !== '1' ? (<img src={`/cards/${resultCard[22]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[26] && resultCard[26] !== '1' ? (<img src={`/cards/${resultCard[26]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[30] && resultCard[30] !== '1' ? (<img src={`/cards/${resultCard[30]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[34] && resultCard[34] !== '1' ? (<img src={`/cards/${resultCard[34]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={` ${getColorClass(t1.C4)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Player 11 :
                                <span className="text-[#ffc107]">{t1.C4}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[3] && resultCard[3] !== '1' ? (<img src={`/cards/${resultCard[3]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[7] && resultCard[7] !== '1' ? (<img src={`/cards/${resultCard[7]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[11] && resultCard[11] !== '1' ? (<img src={`/cards/${resultCard[11]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[15] && resultCard[15] !== '1' ? (<img src={`/cards/${resultCard[15]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[19] && resultCard[19] !== '1' ? (<img src={`/cards/${resultCard[19]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[23] && resultCard[23] !== '1' ? (<img src={`/cards/${resultCard[23]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[27] && resultCard[27] !== '1' ? (<img src={`/cards/${resultCard[27]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[31] && resultCard[31] !== '1' ? (<img src={`/cards/${resultCard[31]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[35] && resultCard[35] !== '1' ? (<img src={`/cards/${resultCard[35]}.png`} alt="card" className="lg:h-10 h-6 lg:w-8 w-6 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-3 space-x-0 lg:space-y-2 space-y-0">

                      <div className="border border-gray-300 grey-color white-text mt-2 divide-y divide-[#c7c8ca] ">

                        <div className="grid grid-cols-4 text-center darktext font-[600] text-[14px] uppercase divide-x divide-[#c7c8ca]">
                          <div className="col-span-2 white-bg w-full flex justify-start white-text items-center py-1">
                          </div>
                          <div className="w-full flex justify-center light-blue items-center py-1">Back</div>
                          <div className="w-full flex justify-center odds-khaii items-center py-1">Lay</div>
                        </div>


                        <div className="w-full text-center white-bg">
                          <div className="grid grid-cols-4 divide-x divide-[#c7c8ca] ">
                            <div className="h-full text-[14px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full lg:text-center text-left -space-y-1 flex justify-between items-center">
                              <div className="">
                                {Player8 && Player8.nat ? Player8.nat : Player8.nation ? Player8.nation : "Player 8"}
                              </div>
                              <div className={`${posArray[Player8.sid] < 0 ? "text-red-500" : "text-green-800"} text-[10px]`} > {posArray[Player8.sid]}</div>
                            </div>
                            <div className="flex justify-end items-center divide-x w-full">
                              {Player8 && Player8.gstatus === 'ACTIVE' ?
                                <div className="w-full light-blue cursor-pointer"
                                  onClick={() => {
                                    if (Player8 && Player8.b1 != 0) {
                                      handleBackOpen({
                                        data: Player8, type: "Yes", odds: Player8.b1, nat: Player8.nat ? Player8.nat : Player8.nation,
                                      }, section1Ref);
                                    }
                                  }}>
                                  <div className=" text-center darktext py-1" >
                                    <div className="text-[14px] font-[600]">{Player8 && Player8.b1 ? (Player8.b1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player8 && Player8.bs1 ? (Player8.bs1) : "-"}</div>
                                  </div>
                                </div> :
                                <div className="w-full light-blue" >
                                  <div className=" text-center relative darktext py-1">
                                    <div className="text-[14px] font-[600]">{Player8 && Player8.b1 ? (Player8.b1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player8 && Player8.bs1 ? (Player8.bs1) : "-"}</div>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x w-full">
                              {Player8 && Player8.gstatus === 'ACTIVE' ?
                                <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                  if (Player8 && Player8.l1 != 0) {
                                    handleBackOpen({ data: Player8, type: "No", odds: Player8.l1, nat: Player8.nat ? Player8.nat : Player8.nation },
                                      section1Ref);
                                  }
                                }}>
                                  <div className=" text-center dark-text py-1" >
                                    <div className="text-[14px] font-[600]">{Player8 && Player8.l1 ? (Player8.l1 / 100).toFixed(2) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player8 && Player8.ls1 ? (Player8.ls1 / 100).toFixed(2) : "-"}</div>
                                  </div>
                                </div> :
                                <div className="w-full odds-khaii" >
                                  <div className=" text-center relative dark-text py-1">
                                    <div className="text-[14px] font-[600]">{Player8 && Player8.l1 ? (Player8.l1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player8 && Player8.ls1 ? (Player8.ls1) : "-"}</div>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>


                        <div className="w-full text-center white-bg">
                          <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                            <div className="h-full text-[14px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full lg:text-center text-left flex justify-between items-center ">
                              <div>
                                {Player9 && Player9.nat ? Player9.nat : Player9.nation ? Player9.nation : "Player 9"}
                              </div>
                              <div className={`${posArray[Player9.sid] < 0 ? "text-red-500" : "text-green-800"} text-[12px]`} > {posArray[Player9.sid]}</div>
                            </div>
                            <div className="flex justify-end items-center divide-x w-full">
                              {Player9 && Player9.gstatus === 'ACTIVE' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => {
                                  if (Player9 && Player9.b1 != 0) {
                                    handleBackOpen({ data: Player9, type: "Yes", odds: Player9.b1, nat: Player9.nat ? Player9.nat : Player9.nation },
                                      section1Ref);
                                  }
                                }}>
                                  <div className=" text-center darktext py-1" >
                                    <div className="text-[14px] font-[600]">{Player9 && Player9.b1 ? (Player9.b1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player9 && Player9.bs1 ? (Player9.bs1) : "-"}</div>
                                  </div>
                                </div> :
                                <div className="w-full light-blue" >
                                  <div className=" text-center relative darktext py-1">
                                    <div className="text-[14px] font-[600]">{Player9 && Player9.b1 ? (Player9.b1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player9 && Player9.bs1 ? (Player9.bs1) : "-"}</div>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x w-full">
                              {Player9 && Player9.gstatus === 'ACTIVE' ?
                                <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                  if (Player9 && Player9.l1 != 0) {
                                    handleBackOpen({ data: Player9, type: "No", odds: Player9.l1, nat: Player9.nat ? Player9.nat : Player9.nation },
                                      section1Ref);
                                  }
                                }}>
                                  <div className=" text-center darktext py-1" >
                                    <div className="text-[14px] font-[600]">{Player9 && Player9.l1 ? (Player9.l1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player9 && Player9.ls1 ? (Player9.ls1) : "-"}</div>
                                  </div>
                                </div> :
                                <div className="w-full odds-khaii" >
                                  <div className=" text-center relative darktext py-1">
                                    <div className="text-[14px] font-[600]">{Player9 && Player9.l1 ? (Player9.l1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player9 && Player9.ls1 ? (Player9.ls1) : "-"}</div>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="border border-gray-300 grey-color white-text divide-y divide-[#c7c8ca]">

                        <div className="lg:grid grid-cols-4 hidden text-center darktext font-[600] text-[14px] uppercase divide-x divide-[#c7c8ca]">
                          <div className="col-span-2 white-bg w-full flex justify-start white-text items-center py-1">
                          </div>
                          <div className="w-full flex justify-center light-blue items-center py-1">Back</div>
                          <div className="w-full flex justify-center odds-khaii items-center py-1">Lay</div>
                        </div>


                        <div className="w-full text-center white-bg">
                          <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                            <div className="h-full text-[14px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full lg:text-center text-left flex justify-between items-center ">
                              <div>
                                {Player10 && Player10.nat ? Player10.nat : Player10.nation ? Player10.nation : "Player 10"}
                              </div>
                              <div className={`${posArray[Player10.sid] < 0 ? "text-red-500" : "text-green-800"} text-[12px]`} > {posArray[Player10.sid]}</div>
                            </div>
                            <div className="flex justify-end items-center divide-x w-full">
                              {Player10 && Player10.gstatus === 'ACTIVE' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => {
                                  if (Player10 && Player10.b1 != 0) {
                                    handleBackOpen({ data: Player10, type: "Yes", odds: Player10.b1, nat: Player10.nat ? Player10.nat : Player10.nation },
                                      section1Ref);
                                  }
                                }}>
                                  <div className=" text-center darktext py-1" >
                                    <div className="text-[14px] font-[600]">{Player10 && Player10.b1 ? (Player10.b1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player10 && Player10.bs1 ? (Player10.bs1) : "-"}</div>
                                  </div>
                                </div> :
                                <div className="w-full light-blue" >
                                  <div className=" text-center relative darktext py-1">
                                    <div className="text-[14px] font-[600]">{Player10 && Player10.b1 ? (Player10.b1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player10 && Player10.bs1 ? (Player10.bs1) : "-"}</div>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x w-full">
                              {Player10 && Player10.gstatus === 'ACTIVE' ?
                                <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                  if (Player10 && Player10.l1 != 0) {
                                    handleBackOpen({ data: Player10, type: "No", odds: Player10.l1, nat: Player10.nat ? Player10.nat : Player10.nation },
                                      section1Ref);
                                  }
                                }}>
                                  <div className=" text-center darktext py-1" >
                                    <div className="text-[14px] font-[600]">{Player10 && Player10.l1 ? (Player10.l1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player10 && Player10.ls1 ? (Player10.ls1) : "-"}</div>
                                  </div>
                                </div> :
                                <div className="w-full odds-khaii" >
                                  <div className=" text-center relative darktext py-1">
                                    <div className="text-[14px] font-[600]">{Player10 && Player10.l1 ? (Player10.l1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player10 && Player10.ls1 ? (Player10.ls1) : "-"}</div>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                          </div>
                        </div>


                        <div className="w-full text-center white-bg">
                          <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                            <div className="h-full text-[14px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full lg:text-center text-left flex justify-between items-center ">
                              <div>
                                {Player11 && Player11.nat ? Player11.nat : Player11.nation ? Player11.nation : "Player 11"}
                              </div>
                              <div className={`${posArray[Player11.sid] < 0 ? "text-red-500" : "text-green-800"} text-[12px]`} > {posArray[Player11.sid]}</div>
                            </div>
                            <div className="flex justify-end items-center divide-x w-full">
                              {Player11 && Player11.gstatus === 'ACTIVE' ?
                                <div className="w-full light-blue cursor-pointer " onClick={() => {
                                  if (Player11 && Player11.b1 != 0) {
                                    handleBackOpen({ data: Player11, type: "Yes", odds: Player11.b1, nat: Player11.nat ? Player11.nat : Player11.nation },
                                      section1Ref);
                                  }
                                }}>
                                  <div className=" text-center darktext py-1" >
                                    <div className="text-[14px] font-[600]">{Player11 && Player11.b1 ? (Player11.b1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player11 && Player11.bs1 ? (Player11.bs1) : "-"}</div>
                                  </div>
                                </div> :
                                <div className="w-full light-blue" >
                                  <div className=" text-center relative darktext py-1">
                                    <div className="text-[14px] font-[600]">{Player11 && Player11.b1 ? (Player11.b1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player11 && Player11.bs1 ? (Player11.bs1) : "-"}</div>
                                    <BetLocked />
                                  </div>
                                </div>}
                            </div>
                            <div className="flex justify-end items-center divide-x w-full">
                              {Player11 && Player11.gstatus === 'ACTIVE' ?
                                <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                  if (Player11 && Player11.b1 != 0) {
                                    handleBackOpen({ data: Player11, type: "No", odds: Player11.l1, nat: Player11.nat ? Player11.nat : Player11.nation },
                                      section1Ref);
                                  }
                                }}>
                                  <div className=" text-center darktext py-1" >
                                    <div className="text-[14px] font-[600]">{Player11 && Player11.l1 ? (Player11.l1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player11 && Player11.ls1 ? (Player11.ls1) : "-"}</div>
                                  </div>
                                </div> :
                                <div className="w-full odds-khaii" >
                                  <div className=" text-center relative darktext py-1">
                                    <div className="text-[14px] font-[600]">{Player11 && Player11.l1 ? (Player11.l1) : "-"}</div>
                                    <div className="text-[10px] font-[500]">{Player11 && Player11.ls1 ? (Player11.ls1) : "-"}</div>
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
                            <p className={`font-[600] text-[13px] text-[#FFFF33]`}>
                              {element && element.result === '1' ? "8" : element && element.result === '2' ? "9" : element && element.result === '3' ? "10" : "11"}
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


export default Cards32_A
