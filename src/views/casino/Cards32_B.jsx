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

function Cards32_B({ eventId }) {
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
  const [buttonValue, setbuttonValue] = useState(false);

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



  const handleBackOpen = (data) => {
    betForSet(data.nat)
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

  const betForSet = (nat) => {
    let value = nat;
    if (value === "Player 8" || value === "Player 9" || value === "Player 10" || value === "Player 11") {
      setState(prevState => ({ ...prevState, betFor: "card32eu" }));
    } else if (value === "Player 8 Odd" || value === "Player 8 Even" || value === "Player 9 Odd" || value === "Player 9 Even" || value === "Player 10 Odd" || value === "Player 10 Even" || value === "Player 11 Odd" || value === "Player 11 Even") {
      setState(prevState => ({ ...prevState, betFor: "oddEven" }));
    } else if (value === "Any Three Card Black" || value === "Any Three Card Red" || value === "Two Black Two Red value") {
      setState(prevState => ({ ...prevState, betFor: "anyThree" }));
    } else if (value === "8 & 9 Total" || value === "10 & 11 Total") {
      setState(prevState => ({ ...prevState, betFor: "total" }));
    } else if (value === "1 Single" || value === "2 Single" || value === "3 Single" || value === "4 Single" || value === "5 Single" || value === "6 Single" || value === "7 Single" || value === "8 Single" || value === "9 Single" || value === "0 Single") {
      setState(prevState => ({ ...prevState, betFor: "number" }));
    }
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
      "casinoType": state.shortName ? state.shortName : "card32eu",
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
  let Player8Odd = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let Player8Even = data && data.t2 && data.t2[5] ? data.t2[5] : {};


  let Player9 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Player9Odd = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let Player9Even = data && data.t2 && data.t2[7] ? data.t2[7] : {};

  let Player10 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let Player10Odd = data && data.t2 && data.t2[8] ? data.t2[8] : {};
  let Player10Even = data && data.t2 && data.t2[9] ? data.t2[9] : {};

  let Player11 = data && data.t2 && data.t2[3] ? data.t2[3] : {};
  let Player11Odd = data && data.t2 && data.t2[10] ? data.t2[10] : {};
  let Player11Even = data && data.t2 && data.t2[11] ? data.t2[11] : {};


  let CardBlack = data && data.t2 && data.t2[12] ? data.t2[12] : {};
  let CardRed = data && data.t2 && data.t2[13] ? data.t2[13] : {};

  let TwoBlackRed = data && data.t2 && data.t2[26] ? data.t2[26] : {};

  let Single1 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
  let Single2 = data && data.t2 && data.t2[15] ? data.t2[15] : {};
  let Single3 = data && data.t2 && data.t2[16] ? data.t2[16] : {};
  let Single4 = data && data.t2 && data.t2[17] ? data.t2[17] : {};
  let Single5 = data && data.t2 && data.t2[18] ? data.t2[18] : {};
  let Single6 = data && data.t2 && data.t2[19] ? data.t2[19] : {};
  let Single7 = data && data.t2 && data.t2[20] ? data.t2[20] : {};
  let Single8 = data && data.t2 && data.t2[21] ? data.t2[21] : {};
  let Single9 = data && data.t2 && data.t2[22] ? data.t2[22] : {};
  let Single0 = data && data.t2 && data.t2[23] ? data.t2[23] : {};


  let Total8and9 = data && data.t2 && data.t2[24] ? data.t2[24] : {};
  let Total10and11 = data && data.t2 && data.t2[25] ? data.t2[25] : {};




  const maxValue = Math.max(t1.C1, t1.C2, t1.C3, t1.C4);
  const getColorClass = (value) => value === maxValue ? 'text-green-500' : 'text-white';

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
                          <div className="text-white font-semibold px-1 lg:py-[2px] py-0 tracking-wide uppercase text-[14px]">Cards</div>
                          <div className="w-full px-1 lg:space-y-1 space-y-0">
                            <div>
                              <div className={`font-semibold p-[1px] tracking-tight text-[12px] ${t1.C1 > t1.C2 && t1.C1 > t1.C3 && t1.C1 > t1.C4 ? 'text-green-500' : 'text-white'}`}>
                                Player 8 :
                                <span className="text-[#ffc107]">{t1 && t1.C1 ? t1.C1 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[0] && resultCard[0] !== '1' ? (<img src={`/cards/${resultCard[0]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[4] && resultCard[4] !== '1' ? (<img src={`/cards/${resultCard[4]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[8] && resultCard[8] !== '1' ? (<img src={`/cards/${resultCard[8]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[12] && resultCard[12] !== '1' ? (<img src={`/cards/${resultCard[12]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[16] && resultCard[16] !== '1' ? (<img src={`/cards/${resultCard[16]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[20] && resultCard[20] !== '1' ? (<img src={`/cards/${resultCard[20]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[24] && resultCard[24] !== '1' ? (<img src={`/cards/${resultCard[24]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[28] && resultCard[28] !== '1' ? (<img src={`/cards/${resultCard[28]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[32] && resultCard[32] !== '1' ? (<img src={`/cards/${resultCard[32]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={` ${getColorClass(t1.C2)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Player 9 :
                                <span className="text-[#ffc107]">{t1 && t1.C2 ? t1.C2 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[1] && resultCard[1] !== '1' ? (<img src={`/cards/${resultCard[1]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[5] && resultCard[5] !== '1' ? (<img src={`/cards/${resultCard[5]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[9] && resultCard[9] !== '1' ? (<img src={`/cards/${resultCard[9]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[13] && resultCard[13] !== '1' ? (<img src={`/cards/${resultCard[13]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[17] && resultCard[17] !== '1' ? (<img src={`/cards/${resultCard[17]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[21] && resultCard[21] !== '1' ? (<img src={`/cards/${resultCard[21]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[25] && resultCard[25] !== '1' ? (<img src={`/cards/${resultCard[25]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[29] && resultCard[29] !== '1' ? (<img src={`/cards/${resultCard[29]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[33] && resultCard[33] !== '1' ? (<img src={`/cards/${resultCard[33]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={` ${getColorClass(t1.C3)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Player 10 :
                                <span className="text-[#ffc107]">{t1 && t1.C3 ? t1.C3 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[2] && resultCard[2] !== '1' ? (<img src={`/cards/${resultCard[2]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[6] && resultCard[6] !== '1' ? (<img src={`/cards/${resultCard[6]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[10] && resultCard[10] !== '1' ? (<img src={`/cards/${resultCard[10]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[14] && resultCard[14] !== '1' ? (<img src={`/cards/${resultCard[14]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[18] && resultCard[18] !== '1' ? (<img src={`/cards/${resultCard[18]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[22] && resultCard[22] !== '1' ? (<img src={`/cards/${resultCard[22]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[26] && resultCard[26] !== '1' ? (<img src={`/cards/${resultCard[26]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[30] && resultCard[30] !== '1' ? (<img src={`/cards/${resultCard[30]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[34] && resultCard[34] !== '1' ? (<img src={`/cards/${resultCard[34]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div>
                              <div className={` ${getColorClass(t1.C4)} font-semibold p-[1px] tracking-tight text-[12px]`}>
                                Player 11 :
                                <span className="text-[#ffc107]">{t1.C4}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[3] && resultCard[3] !== '1' ? (<img src={`/cards/${resultCard[3]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[7] && resultCard[7] !== '1' ? (<img src={`/cards/${resultCard[7]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[11] && resultCard[11] !== '1' ? (<img src={`/cards/${resultCard[11]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[15] && resultCard[15] !== '1' ? (<img src={`/cards/${resultCard[15]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[19] && resultCard[19] !== '1' ? (<img src={`/cards/${resultCard[19]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[23] && resultCard[23] !== '1' ? (<img src={`/cards/${resultCard[23]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[27] && resultCard[27] !== '1' ? (<img src={`/cards/${resultCard[27]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[31] && resultCard[31] !== '1' ? (<img src={`/cards/${resultCard[31]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[35] && resultCard[35] !== '1' ? (<img src={`/cards/${resultCard[35]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="w-full space-y-3">

                      <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-2 space-x-0">

                        <div className="border border-gray-300 grey-color white-text divide-y divide-[#c7c8ca] ">

                          <div className="grid grid-cols-4 text-center darktext font-[600] text-[14px] capitalize divide-x divide-[#c7c8ca]">
                            <div className="col-span-2 white-bg w-full flex justify-start white-text items-center py-1">
                            </div>
                            <div className="w-full flex justify-center light-blue items-center py-1">Back</div>
                            <div className="w-full flex justify-center odds-khaii items-center py-1">Lay</div>
                          </div>

                          <div className="w-full text-center white-bg">
                            <div className="grid grid-cols-4 divide-x divide-[#c7c8ca] ">
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full lg:text-center text-left flex justify-between items-center">
                                <div className="">
                                  {Player8 && Player8.nat ? Player8.nat : Player8.nation ? Player8.nation : "Player 11"}
                                </div>
                                <div className={`${posArray[Player8.sid] < 0 ? "text-red-500" : "text-green-800"} text-[10px]`} > {posArray[Player8.sid]}</div>
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {Player8 && Player8.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (Player8 && Player8.b1 !== 0) {
                                      handleBackOpen({ data: Player8, type: "Yes", odds: Player8.b1, nat: Player8.nat ? Player8.nat : Player8.nation },
                                        section1Ref);
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
                                    if (Player8 && Player8.l1 !== 0) {
                                      handleBackOpen({ data: Player8, odds: Player8.l1, nat: Player8.nat ? Player8.nat : Player8.nation, type: "No" },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center dark-text py-1" >
                                      <div className="text-[14px] font-[600]">{Player8 && Player8.l1 ? (Player8.l1) : "-"}</div>
                                      <div className="text-[10px] font-[500]">{Player8 && Player8.ls1 ? (Player8.ls1) : "-"}</div>
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
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full lg:text-center text-left flex justify-between items-center ">
                                <div>
                                  {Player9 && Player9.nat ? Player9.nat : Player9.nation ? Player9.nation : "Player 9"}
                                </div>
                                <div className={`${posArray[Player9.sid] < 0 ? "text-red-500" : "text-green-800"} text-[12px]`} > {posArray[Player9.sid]}</div>
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {Player9 && Player9.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (Player9 && Player9.b1 !== 0) {
                                      handleBackOpen({ data: Player9, odds: Player9.b1, nat: Player9.nat ? Player9.nat : Player9.nation, type: "Yes" },
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
                                    if (Player9 && Player9.l1 !== 0) {
                                      handleBackOpen({ data: Player9, odds: Player9.l1, nat: Player9.nat ? Player9.nat : Player9.nation, type: "No" },
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

                          <div className="w-full text-center white-bg">
                            <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full lg:text-center text-left flex justify-between items-center ">
                                <div>
                                  {Player10 && Player10.nat ? Player10.nat : Player10.nation ? Player10.nation : "Player 10"}
                                </div>
                                <div className={`${posArray[Player10.sid] < 0 ? "text-red-500" : "text-green-800"} text-[12px]`} > {posArray[Player10.sid]}</div>
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {Player10 && Player10.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (Player10 && Player10.b1 !== 0) {
                                      handleBackOpen({ data: Player10, odds: Player10.b1, nat: Player10.nat ? Player10.nat : Player10.nation, type: "Yes" },
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
                                    if (Player10 && Player10.b1 !== 0) {
                                      handleBackOpen({ data: Player10, odds: Player10.l1, nat: Player10.nat ? Player10.nat : Player10.nation, type: "No" },
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
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full lg:text-center text-left flex justify-between items-center ">
                                <div>
                                  {Player11 && Player11.nat ? Player11.nat : Player11.nation ? Player11.nation : "Player 11"}
                                </div>
                                <div className={`${posArray[Player11.sid] < 0 ? "text-red-500" : "text-green-800"} text-[12px]`} > {posArray[Player11.sid]}</div>
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {Player11 && Player11.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (Player11 && Player11.l1 !== 0) {
                                      handleBackOpen({ data: Player11, odds: Player11.b1, nat: Player11.nat ? Player11.nat : Player11.nation, type: "Yes" },
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
                                    if (Player11 && Player11.l1 !== 0) {
                                      handleBackOpen({ data: Player11, odds: Player11.l1, nat: Player11.nat ? Player11.nat : Player11.nation, type: "No" },
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

                        <div className="white-bg white-text divide-y divide-[#c7c8ca] ">

                          <div className="card-border divide-y divide-[#c7c8ca]">

                            <div className="grid grid-cols-4 text-center darktext font-[600] text-[14px] capitalize divide-x divide-[#c7c8ca]">
                              <div className="col-span-2 white-bg w-full text-[12px] flex justify-start white-text items-center px-[6px] py-1">
                              </div>
                              <div className="w-full flex justify-center light-blue items-center py-1">Odd</div>
                              <div className="w-full flex justify-center light-blue items-center py-1">Even</div>
                            </div>

                            <div className="w-full text-center white-bg">
                              <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                                <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full text-left flex justify-between items-center">
                                  <div>
                                    {Player8 && Player8.nat ? Player8.nat : Player8.nation ? Player8.nation : "Player 8"}
                                  </div>
                                  <div className={`${posArray[Player8Odd.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[Player8Odd.sid]} </div>
                                </div>
                                <div className="flex justify-end items-center divide-x w-full">
                                  {Player8Odd && Player8Odd.gstatus === 'ACTIVE' ?
                                    <div className="w-full light-blue cursor-pointer "
                                      onClick={() => {
                                        if (Player8Odd && Player8Odd.b1 !== 0) {
                                          handleBackOpen({
                                            data: Player8Odd,
                                            odds: Player8Odd.b1,
                                            nat: Player8Odd.nat ? Player8Odd.nat : Player8Odd.nation,
                                            type: "Yes"
                                          }, section1Ref);
                                        }
                                      }}
                                    >
                                      <div className=" text-center darktext py-1" >
                                        <div className="text-[14px] font-[600]">{Player8Odd && Player8Odd.b1 ? (Player8Odd.b1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player8Odd && Player8Odd.bs1 ? (Player8Odd.bs1) : "-"}</div>
                                      </div>
                                    </div> :
                                    <div className="w-full light-blue" >
                                      <div className=" text-center relative darktext py-1">
                                        <div className="text-[14px] font-[600]">{Player8Odd && Player8Odd.b1 ? (Player8Odd.b1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player8Odd && Player8Odd.bs1 ? (Player8Odd.bs1) : "-"}</div>
                                        <BetLocked />
                                      </div>
                                    </div>}
                                </div>
                                <div className="flex justify-end items-center divide-x w-full">
                                  {Player8Even && Player8Even.gstatus === 'ACTIVE' ?
                                    <div className="w-full light-blue cursor-pointer "
                                      onClick={() => {
                                        if (Player8Even && Player8Even.l1 != 0) {
                                          handleBackOpen({
                                            data: Player8Even, odds: Player8Even.l1, nat: Player8Even.nat ? Player8Even.nat : Player8Even.nation, type: "Yes"
                                          }, section1Ref);
                                        }
                                      }}>
                                      <div className=" text-center darktext py-1" >
                                        <div className="text-[14px] font-[600]">{Player8Even && Player8Even.l1 ? (Player8Even.l1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player8Even && Player8Even.ls1 ? (Player8Even.ls1) : "-"}</div>
                                      </div>
                                    </div> :
                                    <div className="w-full light-blue" >
                                      <div className=" text-center relative darktext py-1">
                                        <div className="text-[14px] font-[600]">{Player8Even && Player8Even.l1 ? (Player8Even.l1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player8Even && Player8Even.ls1 ? (Player8Even.ls1) : "-"}</div>
                                        <BetLocked />
                                      </div>
                                    </div>}
                                </div>
                              </div>
                            </div>

                            <div className="w-full text-center white-bg">
                              <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                                <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full text-left flex justify-between items-center">
                                  <div>
                                    {Player9 && Player9.nat ? Player9.nat : Player9.nation ? Player9.nation : "Player 8"}
                                  </div>
                                  <div className={`${posArray[Player9Odd.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[Player9Odd.sid]}</div>
                                </div>
                                <div className="flex justify-end items-center divide-x w-full">
                                  {Player9Odd && Player9Odd.gstatus === 'ACTIVE' ?
                                    <div className="w-full light-blue cursor-pointer " onClick={() => {
                                      if (Player9Odd && Player9Odd.b1 != 0) {
                                        handleBackOpen({ data: Player9Odd, type: "Yes", odds: Player9Odd.b1, nat: Player9Odd.nat ? Player9Odd.nat : Player9Odd.nation },
                                          section1Ref);
                                      }
                                    }}>
                                      <div className=" text-center darktext py-1" >
                                        <div className="text-[14px] font-[600]">{Player9Odd && Player9Odd.b1 ? (Player9Odd.b1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player9Odd && Player9Odd.bs1 ? (Player9Odd.bs1) : "-"}</div>
                                      </div>
                                    </div> :
                                    <div className="w-full light-blue" >
                                      <div className=" text-center relative darktext py-1">
                                        <div className="text-[14px] font-[600]">{Player9Odd && Player9Odd.b1 ? (Player9Odd.b1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player9Odd && Player9Odd.bs1 ? (Player9Odd.bs1) : "-"}</div>
                                        <BetLocked />
                                      </div>
                                    </div>}
                                </div>
                                <div className="flex justify-end items-center divide-x w-full">
                                  {Player9Even && Player9Even.gstatus === 'ACTIVE' ?
                                    <div className="w-full light-blue cursor-pointer " onClick={() => {
                                      if (Player9Even && Player9Even.l1 != 0) {
                                        handleBackOpen({ data: Player9Even, type: "Yes", odds: Player9Even.l1, nat: Player9Even.nat ? Player9Even.nat : Player9Even.nation },
                                          section1Ref);
                                      }
                                    }}>
                                      <div className=" text-center darktext py-1" >
                                        <div className="text-[14px] font-[600]">{Player9Even && Player9Even.l1 ? (Player9Even.l1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player9Even && Player9Even.ls1 ? (Player9Even.ls1) : "-"}</div>
                                      </div>
                                    </div> :
                                    <div className="w-full light-blue" >
                                      <div className=" text-center relative darktext py-1">
                                        <div className="text-[14px] font-[600]">{Player9Even && Player9Even.l1 ? (Player9Even.l1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player9Even && Player9Even.ls1 ? (Player9Even.ls1) : "-"}</div>
                                        <BetLocked />
                                      </div>
                                    </div>}
                                </div>
                              </div>
                            </div>

                            <div className="w-full text-center white-bg">
                              <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                                <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full text-left flex justify-between items-center">
                                  <div>
                                    {Player10 && Player10.nat ? Player10.nat : Player10.nation ? Player10.nation : "Player 10"}
                                  </div>
                                  <div className={`${posArray[Player10Odd.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[Player10Odd.sid]} </div>
                                </div>
                                <div className="flex justify-end items-center divide-x w-full">
                                  {Player10Odd && Player10Odd.gstatus === 'ACTIVE' ?
                                    <div className="w-full light-blue cursor-pointer " onClick={() => {
                                      if (Player10Odd && Player10Odd.b1 != 0) {
                                        handleBackOpen({ data: Player10Odd, type: "Yes", odds: Player10Odd.b1, nat: Player10Odd.nat ? Player10Odd.nat : Player10Odd.nation },
                                          section1Ref);
                                      }
                                    }}>
                                      <div className=" text-center darktext py-1" >
                                        <div className="text-[14px] font-[600]">{Player10Odd && Player10Odd.b1 ? (Player10Odd.b1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player10Odd && Player10Odd.bs1 ? (Player10Odd.bs1) : "-"}</div>
                                      </div>
                                    </div> :
                                    <div className="w-full light-blue" >
                                      <div className=" text-center relative darktext py-1">
                                        <div className="text-[14px] font-[600]">{Player10Odd && Player10Odd.b1 ? (Player10Odd.b1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player10Odd && Player10Odd.bs1 ? (Player10Odd.bs1) : "-"}</div>
                                        <BetLocked />
                                      </div>
                                    </div>}
                                </div>
                                <div className="flex justify-end items-center divide-x w-full">
                                  {Player10Even && Player10Even.gstatus === 'ACTIVE' ?
                                    <div className="w-full light-blue cursor-pointer " onClick={() => {
                                      if (Player10Even && Player10Even.l1 != 0) {
                                        handleBackOpen({ data: Player10Even, type: "Yes", odds: Player10Even.l1, nat: Player10Even.nat ? Player10Even.nat : Player10Even.nation },
                                          section1Ref);
                                      }
                                    }}>
                                      <div className=" text-center darktext py-1" >
                                        <div className="text-[14px] font-[600]">{Player10Even && Player10Even.l1 ? (Player10Even.l1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player10Even && Player10Even.ls1 ? (Player10Even.ls1) : "-"}</div>
                                      </div>
                                    </div> :
                                    <div className="w-full light-blue" >
                                      <div className=" text-center relative darktext py-1">
                                        <div className="text-[14px] font-[600]">{Player10Even && Player10Even.l1 ? (Player10Even.l1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player10Even && Player10Even.ls1 ? (Player10Even.ls1) : "-"}</div>
                                        <BetLocked />
                                      </div>
                                    </div>}
                                </div>

                              </div>
                            </div>

                            <div className="w-full text-center white-bg">
                              <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                                <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full text-left flex justify-between items-center">
                                  <div>
                                    {Player11 && Player11.nat ? Player11.nat : Player11.nation ? Player11.nation : "Player 11"}

                                  </div>
                                  <div className={`${posArray[Player11Odd.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[Player11Odd.sid]}</div>
                                </div>
                                <div className="flex justify-end items-center divide-x w-full">
                                  {Player11Odd && Player11Odd.gstatus === 'ACTIVE' ?
                                    <div className="w-full light-blue cursor-pointer " onClick={() => {
                                      if (Player11Odd && Player11Odd.b1 != 0) {
                                        handleBackOpen({ data: Player11Odd, type: "Yes", odds: Player11Odd.b1, nat: Player10Odd.nat ? Player10Odd.nat : Player10Odd.nation },
                                          section1Ref);
                                      }
                                    }}>
                                      <div className=" text-center darktext py-1" >
                                        <div className="text-[14px] font-[600]">{Player11Odd && Player11Odd.b1 ? (Player11Odd.b1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player11Odd && Player11Odd.bs1 ? (Player11Odd.bs1) : "-"}</div>
                                      </div>
                                    </div> :
                                    <div className="w-full light-blue" >
                                      <div className=" text-center relative darktext py-1">
                                        <div className="text-[14px] font-[600]">{Player11Odd && Player11Odd.b1 ? (Player11Odd.b1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player11Odd && Player11Odd.bs1 ? (Player11Odd.bs1) : "-"}</div>
                                        <BetLocked />
                                      </div>
                                    </div>}
                                </div>
                                <div className="flex justify-end items-center divide-x w-full">
                                  {Player11Even && Player11Even.gstatus === 'ACTIVE' ?
                                    <div className="w-full light-blue cursor-pointer " onClick={() => {
                                      if (Player11Even && Player11Even.l1 != 0) {
                                        handleBackOpen({ data: Player11Even, type: "Yes", odds: Player11Even.l1, nat: Player11Even.nat ? Player11Even.nat : Player11Even.nation },
                                          section1Ref);
                                      }
                                    }}>
                                      <div className=" text-center darktext py-1" >
                                        <div className="text-[14px] font-[600]">{Player11Even && Player11Even.l1 ? (Player11Even.l1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player11Even && Player11Even.ls1 ? (Player11Even.ls1) : "-"}</div>
                                      </div>
                                    </div> :
                                    <div className="w-full light-blue" >
                                      <div className=" text-center relative darktext py-1">
                                        <div className="text-[14px] font-[600]">{Player11Even && Player11Even.l1 ? (Player11Even.l1) : "-"}</div>
                                        <div className="text-[10px] font-normal">{Player11Even && Player11Even.ls1 ? (Player11Even.ls1) : "-"}</div>
                                        <BetLocked />
                                      </div>
                                    </div>}
                                </div>

                              </div>
                            </div>

                          </div>

                        </div>

                      </div>

                      <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-2 space-x-0">

                        <div className="card-border divide-y divide-[#c7c8ca]">

                          <div className="grid grid-cols-4 text-center darktext font-[600] text-[14px] capitalize divide-x divide-[#c7c8ca]">
                            <div className="col-span-2 white-bg w-full flex justify-start white-text items-center py-1">
                            </div>
                            <div className="w-full flex justify-center light-blue items-center py-1">Back</div>
                            <div className="w-full flex justify-center odds-khaii items-center py-1">Lay</div>
                          </div>

                          <div className="w-full text-center white-bg">
                            <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext py-1 font-[600] px-2 col-span-2 w-full text-left flex justify-between items-center">
                                <div>
                                  {CardBlack && CardBlack.nat ? CardBlack.nat : CardBlack.nation ? CardBlack.nation : "Any 3 Card Black"}
                                </div>
                                <div className={`${posArray[CardBlack.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[CardBlack.sid]} </div>
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {CardBlack && CardBlack.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (CardBlack && CardBlack.b1 != 0) {
                                      handleBackOpen({ data: CardBlack, type: "Yes", odds: CardBlack.b1, nat: CardBlack.nat ? CardBlack.nat : CardBlack.nation },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center darktext py-1" >
                                      <div className="text-[14px] font-[600]">{CardBlack && CardBlack.b1 ? (CardBlack.b1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{CardBlack && CardBlack.bs1 ? (CardBlack.bs1) : "-"}</div>
                                    </div>
                                  </div> :
                                  <div className="w-full light-blue" >
                                    <div className=" text-center relative darktext py-1">
                                      <div className="text-[14px] font-[600]">{CardBlack && CardBlack.b1 ? (CardBlack.b1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{CardBlack && CardBlack.bs1 ? (CardBlack.bs1) : "-"}</div>
                                      <BetLocked />
                                    </div>
                                  </div>}
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {CardBlack && CardBlack.gstatus === 'ACTIVE' ?
                                  <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                    if (CardBlack && CardBlack.l1 != 0) {
                                      handleBackOpen({ data: CardBlack, type: "No", odds: CardBlack.l1, nat: CardBlack.nat ? CardBlack.nat : CardBlack.nation },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center darktext py-1" >
                                      <div className="text-[14px] font-[600]">{CardBlack && CardBlack.l1 ? (CardBlack.l1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{CardBlack && CardBlack.ls1 ? (CardBlack.ls1) : "-"}</div>
                                    </div>
                                  </div> :
                                  <div className="w-full odds-khaii" >
                                    <div className=" text-center relative darktext py-1">
                                      <div className="text-[14px] font-[600]">{CardBlack && CardBlack.l1 ? (CardBlack.l1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{CardBlack && CardBlack.ls1 ? (CardBlack.ls1) : "-"}</div>
                                      <BetLocked />
                                    </div>
                                  </div>}
                              </div>
                            </div>
                          </div>

                          <div className="w-full text-center white-bg">
                            <div className="grid grid-cols-4 divide-x divide-[#c7c8ca] ">
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full text-left flex justify-between items-center ">
                                <div>
                                  {CardRed && CardRed.nat ? CardRed.nat : CardRed.nation ? CardRed.nation : "Any 3 Card Red"}
                                </div>
                                <div className={`${posArray[CardRed.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[CardRed.sid]}</div>
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {CardRed && CardRed.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (CardRed && CardRed.b1 != 0) {
                                      handleBackOpen({ data: CardRed, type: "Yes", odds: CardRed.b1, nat: CardRed.nat ? CardRed.nat : CardRed.nation },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center darktext py-1" >
                                      <div className="text-[14px] font-[600]">{CardRed && CardRed.b1 ? (CardRed.b1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{CardRed && CardRed.bs1 ? (CardRed.bs1) : "-"}</div>
                                    </div>
                                  </div> :
                                  <div className="w-full light-blue" >
                                    <div className=" text-center relative darktext py-1">
                                      <div className="text-[14px] font-[600]">{CardRed && CardRed.b1 ? (CardRed.b1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{CardRed && CardRed.bs1 ? (CardRed.bs1) : "-"}</div>
                                      <BetLocked />
                                    </div>
                                  </div>}
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {CardRed && CardRed.gstatus === 'ACTIVE' ?
                                  <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                    if (CardRed && CardRed.l1 != 0) {
                                      handleBackOpen({ data: CardRed, type: "No", odds: CardRed.l1, nat: CardRed.nat ? CardRed.nat : CardRed.nation },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center darktext py-1" >
                                      <div className="text-[14px] font-[600]">{CardRed && CardRed.l1 ? (CardRed.l1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{CardRed && CardRed.ls1 ? (CardRed.ls1) : "-"}</div>
                                    </div>
                                  </div> :
                                  <div className="w-full odds-khaii" >
                                    <div className=" text-center relative darktext py-1">
                                      <div className="text-[14px] font-[600]">{CardRed && CardRed.l1 ? (CardRed.l1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{CardRed && CardRed.ls1 ? (CardRed.ls1) : "-"}</div>
                                      <BetLocked />
                                    </div>
                                  </div>}
                              </div>
                            </div>
                          </div>

                          <div className="w-full text-center white-bg">
                            <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 py-1 col-span-2 w-full text-left flex justify-between items-center">
                                <div>
                                  {TwoBlackRed && TwoBlackRed.nat ? TwoBlackRed.nat : TwoBlackRed.nation ? TwoBlackRed.nation : "Two Black Two Red"}
                                </div>
                                <div className={`${posArray[TwoBlackRed.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[TwoBlackRed.sid]} </div>
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {TwoBlackRed && TwoBlackRed.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (TwoBlackRed && TwoBlackRed.b1 != 0) {
                                      handleBackOpen({ data: TwoBlackRed, type: "Yes", odds: TwoBlackRed.b1, nat: TwoBlackRed.nat ? TwoBlackRed.nat : TwoBlackRed.nation },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center darktext py-1" >
                                      <div className="text-[14px] font-[600]">{TwoBlackRed && TwoBlackRed.b1 ? (TwoBlackRed.b1 / 100).toFixed(2) : "-"}</div>
                                      <div className="text-[10px] font-normal">{TwoBlackRed && TwoBlackRed.bs1 ? (TwoBlackRed.bs1 / 100).toFixed(2) : "-"}</div>
                                    </div>
                                  </div> :
                                  <div className="w-full light-blue" >
                                    <div className=" text-center relative darktext py-1">
                                      <div className="text-[14px] font-[600]">{TwoBlackRed && TwoBlackRed.b1 ? (TwoBlackRed.b1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{TwoBlackRed && TwoBlackRed.bs1 ? (TwoBlackRed.bs1) : "-"}</div>
                                      <BetLocked />
                                    </div>
                                  </div>}
                              </div>
                              <div className="flex justify-end items-center divide-x w-full">
                                {TwoBlackRed && TwoBlackRed.gstatus === 'ACTIVE' ?
                                  <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                    if (TwoBlackRed && TwoBlackRed.l1 != 0) {
                                      handleBackOpen({ data: TwoBlackRed, type: "No", odds: TwoBlackRed.l1, nat: TwoBlackRed.nat ? TwoBlackRed.nat : TwoBlackRed.nation },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center darktext py-1" >
                                      <div className="text-[14px] font-[600]">{TwoBlackRed && TwoBlackRed.l1 ? (TwoBlackRed.l1 / 100).toFixed(2) : "-"}</div>
                                      <div className="text-[10px] font-normal">{TwoBlackRed && TwoBlackRed.ls1 ? (TwoBlackRed.ls1 / 100).toFixed(2) : "-"}</div>
                                    </div>
                                  </div> :
                                  <div className="w-full odds-khaii" >
                                    <div className=" text-center relative darktext py-1">
                                      <div className="text-[14px] font-[600]">{TwoBlackRed && TwoBlackRed.l1 ? (TwoBlackRed.l1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{TwoBlackRed && TwoBlackRed.ls1 ? (TwoBlackRed.ls1) : "-"}</div>
                                      <BetLocked />
                                    </div>
                                  </div>}
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="card-border divide-y divide-[#c7c8ca]">

                          <div className="grid grid-cols-4 text-center darktext font-[600] text-[14px] capitalize divide-x divide-[#c7c8ca]">
                            <div className="col-span-2 white-bg w-full text-[14px] flex justify-start white-text items-center px-[6px] py-3">
                            </div>
                            <div className="w-full col-span-2 flex justify-center light-blue items-center py-3">Back</div>
                          </div>

                          <div className="w-full text-center white-bg ">
                            <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 col-span-2 w-full text-left flex justify-between items-center">
                                <div>
                                  {Total8and9 && Total8and9.nat ? Total8and9.nat : Total8and9.nation ? Total8and9.nation : "8 & 9 Total"}
                                </div>
                                <div className={`${posArray[Total8and9.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[Total8and9.sid]} </div>
                              </div>
                              <div className="flex justify-end items-center col-span-2 divide-x w-full">
                                {Total8and9 && Total8and9.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (Total8and9 && Total8and9.b1 != 0) {
                                      handleBackOpen({ data: Total8and9, type: "Yes", odds: Total8and9.b1, nat: Total8and9.nat ? Total8and9.nat : Total8and9.nation },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center darktext py-3" >
                                      <div className="text-[14px] font-[600]">{Total8and9 && Total8and9.b1 ? (Total8and9.b1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{Total8and9 && Total8and9.bs1 ? (Total8and9.bs1) : "-"}</div>
                                    </div>
                                  </div> :
                                  <div className="w-full light-blue" >
                                    <div className=" text-center relative darktext py-3">
                                      <div className="text-[14px] darktext font-[600]">{Total8and9 && Total8and9.b1 ? (Total8and9.b1) : "-"}</div>
                                      <div className="text-[10px] dark-text font-normal">{Total8and9 && Total8and9.bs1 ? (Total8and9.bs1) : "-"}</div>
                                      <BetLocked />
                                    </div>
                                  </div>}
                              </div>

                            </div>
                          </div>

                          <div className="w-full text-center white-bg">
                            <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">
                              <div className="h-full lg:text-[14px] text-[12px] capitalize darktext font-[600] px-2 col-span-2 w-full text-left flex justify-between items-center">
                                <div>
                                  {Total10and11 && Total10and11.nat ? Total10and11.nat : Total10and11.nation ? Total10and11.nation : "10 & 11 Total"}
                                </div>
                                <div className={`${posArray[Total10and11.sid] < 0 ? "text-red-500" : "text-green-800"} text-[11px]`} > {posArray[Total10and11.sid]} </div>
                              </div>
                              <div className="flex justify-end items-center col-span-2 divide-x w-full">
                                {Total10and11 && Total10and11.gstatus === 'ACTIVE' ?
                                  <div className="w-full light-blue cursor-pointer " onClick={() => {
                                    if (Total10and11 && Total10and11.b1 != 0) {
                                      handleBackOpen({ data: Total10and11, type: "Yes", odds: Total10and11.l1, nat: Total10and11.nat ? Total10and11.nat : Total10and11.nation },
                                        section1Ref);
                                    }
                                  }}>
                                    <div className=" text-center darktext py-3" >
                                      <div className="text-[14px] font-[600]">{Total10and11 && Total10and11.b1 ? (Total10and11.b1) : "-"}</div>
                                      <div className="text-[10px] font-normal">{Total10and11 && Total10and11.bs1 ? (Total10and11.bs1) : "-"}</div>
                                    </div>
                                  </div> :
                                  <div className="w-full light-blue" >
                                    <div className=" text-center relative darktext py-3">
                                      <div className="text-[14px] darktext font-[600]">{Total10and11 && Total10and11.b1 ? (Total10and11.bs1) : "-"}</div>
                                      <div className="text-[10px] dark-text font-normal">{Total10and11 && Total10and11.bs1 ? (Total10and11.bs1) : "-"}</div>
                                      <BetLocked />
                                    </div>
                                  </div>}
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>

                      <div className="relative py-1">
                        <div className="flex justify-between items-center text-center py-1">
                          <p></p>
                          <p className="text-[14px] font-medium gray-text">{9.5 - oddsDifference}</p>
                          <p></p>
                        </div>

                        <div className="w-full grid grid-cols-5 divide-x divide-y py-1">
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single1, type: "Yes", odds: 9.5, nat: '1 Single', sid: Single1.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">1</p>
                            </div>
                            <div className={`${posArray[Single1.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single1.sid] ?? 0.00}</div>
                          </div>
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single2, type: "Yes", odds: 9.5, nat: '2 Single', sid: Single2.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">2</p>
                            </div>
                            <div className={`${posArray[Single2.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single2.sid] ?? 0.00}</div>
                          </div>
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single3, type: "Yes", odds: 9.5, nat: '3 Single', sid: Single3.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">3</p>
                            </div>
                            <div className={`${posArray[Single3.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single3.sid] ?? 0.00}</div>
                          </div>
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single4, type: "Yes", odds: 9.5, nat: '4 Single', sid: Single4.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">4</p>
                            </div>
                            <div className={`${posArray[Single4.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single4.sid] ?? 0.00}</div>
                          </div>
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single5, type: "Yes", odds: 9.5, nat: '5 Single', sid: Single5.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">5</p>
                            </div>
                            <div className={`${posArray[Single5.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single5.sid] ?? 0.00}</div>
                          </div>
                        </div>

                        <div className="w-full grid grid-cols-5  divide-x divide-y py-1">

                          <div>
                            <div onClick={() => handleBackOpen({ data: Single6, type: "Yes", odds: 9.5, nat: '6 Single', sid: Single6.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">6</p>
                            </div>
                            <div className={`${posArray[Single6.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single6.sid] ?? 0.00}</div>
                          </div>
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single7, type: "Yes", odds: 9.5, nat: '7 Single', sid: Single7.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">7</p>
                            </div>
                            <div className={`${posArray[Single7.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single7.sid] ?? 0.00}</div>
                          </div>
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single8, type: "Yes", odds: 9.5, nat: '8 Single', sid: Single8.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">8</p>
                            </div>

                            <div className={`${posArray[Single8.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single8.sid] ?? 0.00}</div>
                          </div>
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single9, type: "Yes", odds: 9.5, nat: '9 Single', sid: Single9.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">9</p>
                            </div>
                            <div className={`${posArray[Single9.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single9.sid] ?? 0.00}</div>
                          </div>
                          <div>
                            <div onClick={() => handleBackOpen({ data: Single0, type: "Yes", odds: 9.5, nat: '0 Single', sid: Single0.sid })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                              <p className="text-[40px] font-semibold">0</p>
                            </div>
                            <div className={`${posArray[Single0.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[Single0.sid] ?? 0.00}</div>
                          </div>
                        </div>
                        {Single1 && Single1.gstatus === 'ACTIVE' ? null : <BetLocked />}
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


export default Cards32_B
