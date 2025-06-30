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
import Teenpattiondayrules from '../../component/casinoComponent/images/race20.jpg';
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

function Race20_20({ eventId }) {
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

  let KofSpade = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let KofHeart = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let KofClub = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let KofDiamond = data && data.t2 && data.t2[3] ? data.t2[3] : {};

  let TotalPoint = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let TotalCard = data && data.t2 && data.t2[5] ? data.t2[5] : {};

  let Win5 = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let Win6 = data && data.t2 && data.t2[7] ? data.t2[7] : {};
  let Win7 = data && data.t2 && data.t2[8] ? data.t2[8] : {};

  let Win15 = data && data.t2 && data.t2[9] ? data.t2[9] : {};
  let Win16 = data && data.t2 && data.t2[10] ? data.t2[10] : {};
  let Win17 = data && data.t2 && data.t2[11] ? data.t2[11] : {};

  let No = data && data.t2 && data.t2[4] ? data.t2[4] : {};

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
                        <div className="absolute top-2 left-0 bg-gray-700 py-1 ">
                          <div className="w-full px-1.5 lg:space-y-1.5 space-y-0">

                            <div className="flex justify-start items-center space-x-1">
                              <div className={`font-semibold p-[1px] tracking-tight text-[12px] ${t1.C1 > t1.C2 && t1.C1 > t1.C3 && t1.C1 > t1.C4 ? 'text-green-500' : 'text-white'}`}>
                                <BsSuitSpadeFill className='text-black' size={18} />
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

                            <div className="flex justify-start items-center space-x-1">
                              <div className={` font-semibold p-[1px] tracking-tight text-[12px]`}>
                                <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                <span className="text-[#ffc107]">{t1 && t1.C2 ? t1.C2 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[1] && resultCard[1] !== '1' ? (<img src={`/cards/${resultCard[1]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[5] && resultCard[5] !== '1' ? (<img src={`/cards/${resultCard[5]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[9] && resultCard[9] !== '1' ? (<img src={`/cards/${resultCard[9]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[13] && resultCard[13] !== '1' ? (<img src={`/cards/${resultCard[13]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div className="flex justify-start items-center space-x-1">
                              <div className={` font-semibold p-[1px] tracking-tight text-[12px]`}>
                                <BsSuitClubFill className='text-black' size={18} />
                                <span className="text-[#ffc107]">{t1 && t1.C3 ? t1.C3 : null}</span>
                              </div>
                              <div className="flex space-x-2 justify-start">
                                {resultCard && resultCard[2] && resultCard[2] !== '1' ? (<img src={`/cards/${resultCard[2]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[6] && resultCard[6] !== '1' ? (<img src={`/cards/${resultCard[6]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[10] && resultCard[10] !== '1' ? (<img src={`/cards/${resultCard[10]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                                {resultCard && resultCard[14] && resultCard[14] !== '1' ? (<img src={`/cards/${resultCard[14]}.png`} alt="card" className="lg:h-8 h-5 lg:w-7 w-5 border-[1px] border-yellow-300" />) : null}
                              </div>
                            </div>

                            <div className="flex justify-start items-center space-x-1">
                              <div className={`font-semibold p-[1px] tracking-tight text-[12px]`}>
                                <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
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
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="page_bg pt-1 space-y-4">

                      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2.5 py-1.5 px-2">

                        <div className="space-y-1">
                          <div className="flex justify-center items-center darktext ">
                            <p className="text-[14px] font-semibold" >
                              <img src={spade} alt="card" className="w-8 h-10" />
                            </p>
                          </div>

                          <div className="flex justify-center items-center space-x-1">
                            {KofSpade.gstatus === "ACTIVE" ?
                              <div className="light-blue w-full text-center py-1.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: KofSpade, type: "Yes", odds: KofSpade.b1, nat: KofSpade.nat ? KofSpade.nat : KofSpade.nation, betFor: KofSpade.nat }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{KofSpade && KofSpade.b1 && KofSpade.b1 ? KofSpade.b1 : "0.00"}</div>
                                <div className="text-[10px] font-[500] darktext leading-4">{KofSpade && KofSpade.bs1 && KofSpade.bs1 ? KofSpade.bs1 : "0.00"}</div>
                              </div>
                              :
                              <div className="light-blue w-full text-center py-1.5 relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofSpade && KofSpade.b1 && KofSpade.b1 ? KofSpade.b1 : "0.00"}</div>
                                <div className="text-[10px] font-[500] darktext leading-4">{KofSpade && KofSpade.bs1 && KofSpade.bs1 ? KofSpade.bs1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }

                            {KofSpade.gstatus === "ACTIVE" ?
                              <div onClick={() => handleBackOpen({ data: KofSpade, type: "No", odds: KofSpade.l1, nat: KofSpade.nat ? KofSpade.nat : KofSpade.nation, betFor: KofSpade.nat }, section1Ref)} className="odds-khaii w-full text-center py-1.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofSpade && KofSpade.l1 && KofSpade.l1 ? KofSpade.l1 : "0.00"}</div>
                                <div className="text-[12px] font-[500] darktext leading-4">{KofSpade && KofSpade.ls1 && KofSpade.ls1 ? KofSpade.ls1 : "0.00"}</div>
                              </div>
                              : <div className="odds-khaii w-full text-center py-1.5 relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofSpade && KofSpade.l1 && KofSpade.l1 ? KofSpade.l1 : "0.00"}</div>
                                <div className="text-[12px] font-[500] darktext leading-4">{KofSpade && KofSpade.ls1 && KofSpade.ls1 ? KofSpade.ls1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }
                          </div>
                          {/* <div className={`${posArray[KofSpade.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[500] pt-1 `} > {posArray[KofSpade.sid] ?? 0.00}</div> */}
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-center items-center darktext ">
                            <p className="text-[14px] font-semibold" >
                              <img src={heart} alt="card" className="w-8 h-10" />
                            </p>
                          </div>

                          <div className="flex justify-center items-center space-x-1">
                            {KofHeart.gstatus === "ACTIVE" ?
                              <div className="light-blue w-full text-center py-1.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: KofHeart, type: "Yes", odds: KofHeart.b1, nat: KofHeart.nat ? KofHeart.nat : KofHeart.nation, betFor: KofHeart.nat }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{KofHeart && KofHeart.b1 && KofHeart.b1 ? KofHeart.b1 : "0.00"}</div>
                                <div className="text-[10px] font-[500] darktext leading-4">{KofHeart && KofHeart.bs1 && KofHeart.bs1 ? KofHeart.bs1 : "0.00"}</div>
                              </div>
                              :
                              <div className="light-blue w-full text-center py-1.5 relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofHeart && KofHeart.b1 && KofHeart.b1 ? KofHeart.b1 : "0.00"}</div>
                                <div className="text-[10px] font-[500] darktext leading-4">{KofHeart && KofHeart.bs1 && KofHeart.bs1 ? KofHeart.bs1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }

                            {KofHeart.gstatus === "ACTIVE" ?
                              <div onClick={() => handleBackOpen({ data: KofHeart, type: "No", odds: KofHeart.l1, nat: KofHeart.nat ? KofHeart.nat : KofHeart.nation, betFor: KofHeart.nat }, section1Ref)} className="odds-khaii w-full text-center py-1.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofHeart && KofHeart.l1 && KofHeart.l1 ? KofHeart.l1 : "0.00"}</div>
                                <div className="text-[12px] font-[500] darktext leading-4">{KofHeart && KofHeart.ls1 && KofHeart.ls1 ? KofHeart.ls1 : "0.00"}</div>
                              </div>
                              : <div className="odds-khaii w-full text-center py-1.5 relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofHeart && KofHeart.l1 && KofHeart.l1 ? KofHeart.l1 : "0.00"}</div>
                                <div className="text-[12px] font-[500] darktext leading-4">{KofHeart && KofHeart.ls1 && KofHeart.ls1 ? KofHeart.ls1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }
                          </div>
                          {/* <div className={`${posArray[KofHeart.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[500] pt-1 `} > {posArray[KofHeart.sid] ?? 0.00}</div> */}
                        </div>

                        <div className="space-y-1 lg:my-0 my-1">
                          <div className="flex justify-center items-center darktext ">
                            <p className="text-[14px] font-semibold" >
                              <img src={club} alt="card" className="w-8 h-10" />
                            </p>
                          </div>

                          <div className="flex justify-center items-center space-x-1">
                            {KofClub.gstatus === "ACTIVE" ?
                              <div className="light-blue w-full text-center py-1.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: KofClub, type: "Yes", odds: KofClub.b1, nat: KofClub.nat ? KofClub.nat : KofClub.nation, betFor: KofClub.nat }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{KofClub && KofClub.b1 && KofClub.b1 ? KofClub.b1 : "0.00"}</div>
                                <div className="text-[10px] font-[500] darktext leading-4">{KofClub && KofClub.bs1 && KofClub.bs1 ? KofClub.bs1 : "0.00"}</div>
                              </div>
                              :
                              <div className="light-blue w-full text-center py-1.5 relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofClub && KofClub.b1 && KofClub.b1 ? KofClub.b1 : "0.00"}</div>
                                <div className="text-[10px] font-[500] darktext leading-4">{KofClub && KofClub.bs1 && KofClub.bs1 ? KofClub.bs1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }

                            {KofClub.gstatus === "ACTIVE" ?
                              <div onClick={() => handleBackOpen({ data: KofClub, type: "No", odds: KofClub.l1, nat: KofClub.nat ? KofClub.nat : KofClub.nation, betFor: KofClub.nat }, section1Ref)} className="odds-khaii w-full text-center py-1.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofClub && KofClub.l1 && KofClub.l1 ? KofClub.l1 : "0.00"}</div>
                                <div className="text-[12px] font-[500] darktext leading-4">{KofClub && KofClub.ls1 && KofClub.ls1 ? KofClub.ls1 : "0.00"}</div>
                              </div>
                              : <div className="odds-khaii w-full text-center py-1.5 relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofClub && KofClub.l1 && KofClub.l1 ? KofClub.l1 : "0.00"}</div>
                                <div className="text-[12px] font-[500] darktext leading-4">{KofClub && KofClub.ls1 && KofClub.ls1 ? KofClub.ls1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }
                          </div>
                          {/* <div className={`${posArray[KofClub.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[500] pt-1 `} > {posArray[KofClub.sid] ?? 0.00}</div> */}
                        </div>

                        <div className="space-y-1 lg:my-0 my-1">
                          <div className="flex justify-center items-center darktext ">
                            <p className="text-[14px] font-semibold" >
                              <img src={diamond} alt="card" className="w-8 h-10" />
                            </p>
                          </div>

                          <div className="flex justify-center items-center space-x-1">
                            {KofDiamond.gstatus === "ACTIVE" ?
                              <div className="light-blue w-full text-center py-1.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: KofDiamond, type: "Yes", odds: KofDiamond.b1, nat: KofDiamond.nat ? KofDiamond.nat : KofDiamond.nation, betFor: KofDiamond.nat }, section1Ref)}>
                                <div className="text-[14px] font-[600] darktext leading-4">{KofDiamond && KofDiamond.b1 && KofDiamond.b1 ? KofDiamond.b1 : "0.00"}</div>
                                <div className="text-[10px] font-[500] darktext leading-4">{KofDiamond && KofDiamond.bs1 && KofDiamond.bs1 ? KofDiamond.bs1 : "0.00"}</div>
                              </div>
                              :
                              <div className="light-blue w-full text-center py-1.5 relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofDiamond && KofDiamond.b1 && KofDiamond.b1 ? KofDiamond.b1 : "0.00"}</div>
                                <div className="text-[10px] font-[500] darktext leading-4">{KofDiamond && KofDiamond.bs1 && KofDiamond.bs1 ? KofDiamond.bs1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }

                            {KofDiamond.gstatus === "ACTIVE" ?
                              <div onClick={() => handleBackOpen({ data: KofDiamond, type: "No", odds: KofDiamond.l1, nat: KofDiamond.nat ? KofDiamond.nat : KofDiamond.nation, betFor: KofDiamond.nat }, section1Ref)} className="odds-khaii w-full text-center py-1.5 cursor-pointer relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofDiamond && KofDiamond.l1 && KofDiamond.l1 ? KofDiamond.l1 : "0.00"}</div>
                                <div className="text-[12px] font-[500] darktext leading-4">{KofDiamond && KofDiamond.ls1 && KofDiamond.ls1 ? KofDiamond.ls1 : "0.00"}</div>
                              </div>
                              : <div className="odds-khaii w-full text-center py-1.5 relative">
                                <div className="text-[14px] font-[600] darktext leading-4">{KofDiamond && KofDiamond.l1 && KofDiamond.l1 ? KofDiamond.l1 : "0.00"}</div>
                                <div className="text-[12px] font-[500] darktext leading-4">{KofDiamond && KofDiamond.ls1 && KofDiamond.ls1 ? KofDiamond.ls1 : "0.00"}</div>
                                <BetLocked />
                              </div>
                            }
                          </div>
                          {/* <div className={`${posArray[KofDiamond.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[500] pt-1 `} > {posArray[KofDiamond.sid] ?? 0.00}</div> */}
                        </div>

                      </div>

                      <div className="grid lg:grid-cols-6 grid-cols-1 gap-4 py-1.5 px-2">

                        <div className="lg:col-span-2 white-bg px-1.5 border border-gray-300 py-4 space-y-4">

                          <div className="grid grid-cols-3">

                            <span className="flex justify-center items-center darktext font-[600] lg:text-[15px] text-[13px] py-4">
                              Total Points
                            </span>

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]">No</p>
                              </div>

                              <div className="flex justify-center items-center">
                                {TotalPoint.gstatus === "ACTIVE" ?
                                  <div onClick={() => handleBackOpen({ data: TotalPoint, type: "No", odds: TotalPoint.l1, nat: TotalPoint.nat ? TotalPoint.nat : TotalPoint.nation, betFor: TotalPoint.nat }, section1Ref)} className="odds-khaii py-1.5 w-full text-center cursor-pointer relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{TotalPoint && TotalPoint.l1 && TotalPoint.l1 ? TotalPoint.l1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{TotalPoint && TotalPoint.ls1 && TotalPoint.ls1 ? TotalPoint.ls1 : "0.00"}</div>
                                  </div> :
                                  <div className="odds-khaii py-1.5 w-full text-center cursor-pointer relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{TotalPoint && TotalPoint.l1 && TotalPoint.l1 ? TotalPoint.l1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{TotalPoint && TotalPoint.ls1 && TotalPoint.ls1 ? TotalPoint.ls1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]" >
                                  Yes
                                </p>
                              </div>

                              <div className="flex justify-center items-center">
                                {TotalPoint.gstatus === "ACTIVE" ?
                                  <div onClick={() => handleBackOpen({ data: TotalPoint, type: "No", odds: TotalPoint.b1, nat: TotalPoint.nat ? TotalPoint.nat : TotalPoint.nation, betFor: TotalPoint.nat }, section1Ref)} className="light-blue py-1.5 w-full text-center cursor-pointer relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{TotalPoint && TotalPoint.b1 && TotalPoint.b1 ? TotalPoint.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{TotalPoint && TotalPoint.bs1 && TotalPoint.bs1 ? TotalPoint.bs1 : "0.00"}</div>
                                  </div> :
                                  <div className="light-blue py-1.5 w-full text-center cursor-pointer relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{TotalPoint && TotalPoint.b1 && TotalPoint.b1 ? TotalPoint.l1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{TotalPoint && TotalPoint.bs1 && TotalPoint.bs1 ? TotalPoint.ls1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                          </div>

                          <div className="grid grid-cols-3">


                            <span className="flex justify-center items-center darktext font-[600] lg:text-[15px] text-[13px] py-4">
                              Total Card
                            </span>

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]">No</p>
                              </div>

                              <div className="flex justify-center items-center">
                                {TotalCard.gstatus === "ACTIVE" ?
                                  <div onClick={() => handleBackOpen({ data: TotalCard, type: "No", odds: TotalCard.l1, nat: TotalCard.nat ? TotalCard.nat : TotalCard.nation, betFor: TotalCard.nat }, section1Ref)} className="odds-khaii py-1.5 w-full text-center cursor-pointer relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{TotalCard && TotalCard.l1 && TotalCard.l1 ? TotalCard.l1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{TotalCard && TotalCard.ls1 && TotalCard.ls1 ? TotalCard.ls1 : "0.00"}</div>
                                  </div> :
                                  <div className="odds-khaii py-1.5 w-full text-center cursor-pointer relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{TotalCard && TotalCard.l1 && TotalCard.l1 ? TotalCard.l1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{TotalCard && TotalCard.ls1 && TotalCard.ls1 ? TotalCard.ls1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]" >
                                  Yes
                                </p>
                              </div>

                              <div className="flex justify-center items-center">
                                {TotalCard.gstatus === "ACTIVE" ?
                                  <div onClick={() => handleBackOpen({ data: TotalCard, type: "No", odds: TotalCard.b1, nat: TotalCard.nat ? TotalCard.nat : TotalCard.nation, betFor: TotalCard.nat }, section1Ref)} className="light-blue py-1.5 w-full text-center cursor-pointer relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{TotalCard && TotalCard.b1 && TotalCard.b1 ? TotalCard.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{TotalCard && TotalCard.bs1 && TotalCard.bs1 ? TotalCard.bs1 : "0.00"}</div>
                                  </div> :
                                  <div className="light-blue py-1.5 w-full text-center cursor-pointer relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{TotalCard && TotalCard.b1 && TotalCard.b1 ? TotalCard.l1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{TotalCard && TotalCard.bs1 && TotalCard.bs1 ? TotalCard.ls1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                          </div>

                        </div>

                        <div className="lg:col-span-4 white-bg px-1.5 border border-gray-300 py-4 space-y-4">


                          <div className="grid grid-cols-3 space-x-3">

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]" >
                                  {Win5 && Win5.nat ? Win5.nat : Win5.nation ? Win5.nation : "Win with 5"}
                                </p>
                              </div>

                              <div className="flex justify-center items-center space-x-1">
                                {Win5.gstatus === "ACTIVE" ?
                                  <div className="light-blue py-1.5 w-full text-center relative cursor-pointer" onClick={() => handleBackOpen({ data: Win5, type: "Yes", odds: Win5.b1, nat: Win5.nat ? Win5.nat : Win5.nation, betFor: Win5.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win5 && Win5.b1 && Win5.b1 ? Win5.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win5 && Win5.bs1 && Win5.bs1 ? Win5.bs1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue py-1.5 w-full text-center relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win5 && Win5.b1 && Win5.b1 ? Win5.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win5 && Win5.bs1 && Win5.bs1 ? Win5.bs1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]" >
                                  {Win6 && Win6.nat ? Win6.nat : Win6.nation ? Win6.nation : "Win with 6"}
                                </p>
                              </div>

                              <div className="flex justify-center items-center space-x-1">
                                {Win6.gstatus === "ACTIVE" ?
                                  <div className="light-blue py-1.5 w-full text-center relative cursor-pointer" onClick={() => handleBackOpen({ data: Win6, type: "Yes", odds: Win6.b1, nat: Win6.nat ? Win6.nat : Win6.nation, betFor: Win6.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win6 && Win6.b1 && Win6.b1 ? Win6.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win6 && Win6.bs1 && Win6.bs1 ? Win6.bs1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue py-1.5 w-full text-center relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win6 && Win6.b1 && Win6.b1 ? Win6.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win6 && Win6.bs1 && Win6.bs1 ? Win6.bs1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]" >
                                  {Win7 && Win7.nat ? Win7.nat : Win7.nation ? Win7.nation : "Win with 7"}
                                </p>
                              </div>

                              <div className="flex justify-center items-center space-x-1">
                                {Win7.gstatus === "ACTIVE" ?
                                  <div className="light-blue py-1.5 w-full text-center relative cursor-pointer" onClick={() => handleBackOpen({ data: Win7, type: "Yes", odds: Win7.b1, nat: Win7.nat ? Win7.nat : Win7.nation, betFor: Win7.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win7 && Win7.b1 && Win7.b1 ? Win7.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win7 && Win7.bs1 && Win7.bs1 ? Win7.bs1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue py-1.5 w-full text-center relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win7 && Win7.b1 && Win7.b1 ? Win7.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win7 && Win7.bs1 && Win7.bs1 ? Win7.bs1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                          </div>

                          <div className="grid grid-cols-3 space-x-3">

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]" >
                                  {Win15 && Win15.nat ? Win15.nat : Win15.nation ? Win15.nation : "Win with 15"}
                                </p>
                              </div>

                              <div className="flex justify-center items-center space-x-1">
                                {Win15.gstatus === "ACTIVE" ?
                                  <div className="light-blue py-1.5 w-full text-center relative cursor-pointer" onClick={() => handleBackOpen({ data: Win15, type: "Yes", odds: Win15.b1, nat: Win15.nat ? Win15.nat : Win15.nation, betFor: Win15.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win15 && Win15.b1 && Win15.b1 ? Win15.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win15 && Win15.bs1 && Win15.bs1 ? Win15.bs1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue py-1.5 w-full text-center relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win15 && Win15.b1 && Win15.b1 ? Win15.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win15 && Win15.bs1 && Win15.bs1 ? Win15.bs1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]" >
                                  {Win16 && Win16.nat ? Win16.nat : Win16.nation ? Win16.nation : "Win with 16"}
                                </p>
                              </div>

                              <div className="flex justify-center items-center space-x-1">
                                {Win16.gstatus === "ACTIVE" ?
                                  <div className="light-blue py-1.5 w-full text-center relative cursor-pointer" onClick={() => handleBackOpen({ data: Win16, type: "Yes", odds: Win16.b1, nat: Win16.nat ? Win16.nat : Win16.nation, betFor: Win16.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win16 && Win16.b1 && Win16.b1 ? Win16.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win16 && Win16.bs1 && Win16.bs1 ? Win16.bs1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue py-1.5 w-full text-center relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win16 && Win16.b1 && Win16.b1 ? Win16.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win16 && Win16.bs1 && Win16.bs1 ? Win16.bs1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="">
                              <div className="flex justify-center items-center darktext ">
                                <p className="lg:text-[15px] text-[13px] font-[600]" >
                                  {Win17 && Win17.nat ? Win17.nat : Win17.nation ? Win17.nation : "Win with 17"}
                                </p>
                              </div>

                              <div className="flex justify-center items-center space-x-1">
                                {Win17.gstatus === "ACTIVE" ?
                                  <div className="light-blue py-1.5 w-full text-center relative cursor-pointer" onClick={() => handleBackOpen({ data: Win17, type: "Yes", odds: Win17.b1, nat: Win17.nat ? Win17 : Win17.nation, betFor: Win17.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win17 && Win17.b1 && Win17.b1 ? Win17.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win17 && Win17.bs1 && Win17.bs1 ? Win17.bs1 : "0.00"}</div>
                                  </div>
                                  :
                                  <div className="light-blue py-1.5 w-full text-center relative">
                                    <div className="text-[14px] font-[600] darktext leading-4">{Win17 && Win17.b1 && Win17.b1 ? Win17.b1 : "0.00"}</div>
                                    <div className="text-[10px] font-[500] darktext leading-4">{Win17 && Win17.bs1 && Win17.bs1 ? Win17.bs1 : "0.00"}</div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                          </div>


                        </div>

                      </div>

                    </div>



                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[#ffff] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className={`font-[600] text-[13px] text-[#FFFF33]`}>
                              {
                                element && element.result && element.result === "4" ?
                                  (<BsSuitDiamondFill size={18} className='text-[#FF0000]' />) :
                                  element && element.result && element.result === "1" ?
                                    (<BsSuitSpadeFill size={18} className='text-black' />) :
                                    element && element.result && element.result === "3" ?
                                      (<BsSuitClubFill size={18} className='text-black' />) :
                                      element && element.result && element.result === "2" ?
                                        (<BsFillSuitHeartFill size={18} className='text-[#FF0000]' />) :
                                        "-"
                              }
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


export default Race20_20
