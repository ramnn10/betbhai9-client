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
import Teenpattiondayrules from '../../component/casinoComponent/images/aaa-rules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import BetPlayerName from "../../component/casinoComponent/BetPlayerName";
import BetButtonCards from "../../component/casinoComponent/BetButtonCards";
import BetButton from "../../component/casinoComponent/BetButton";
import Poker6PlayerCardButton from "../../component/casinoComponent/Poker6PlayerCardButton";
import Poker6PlayerBetButton from "../../component/casinoComponent/Poker6PlayerBetButton";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import imageA from "../../component/casinoComponent/images/1.jpg";
import image2 from "../../component/casinoComponent/images/2.jpg";
import image3 from "../../component/casinoComponent/images/3.jpg";
import image4 from "../../component/casinoComponent/images/4.jpg";
import image5 from "../../component/casinoComponent/images/5.jpg";
import image6 from "../../component/casinoComponent/images/6.jpg";
import image7 from "../../component/casinoComponent/images/7.jpg";
import image8 from "../../component/casinoComponent/images/8.jpg";
import image9 from "../../component/casinoComponent/images/9.jpg";
import image10 from "../../component/casinoComponent/images/10.jpg";
import image11 from "../../component/casinoComponent/images/11.jpg";
import image12 from "../../component/casinoComponent/images/12.jpg";
import image13 from "../../component/casinoComponent/images/13.jpg";


function CasinoMeter({ eventId }) {
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
    groupedCards: { '1-9': [], '10-K': [] }
  });
  const numericValues = {
    '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
    '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
    'J': '11', 'Q': '12', 'K': '13', 'A': '1' // A can be considered as 1 or 14 depending on the game
  };


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

  useEffect(() => {
    groupCardsdataImage(casinoData && casinoData.data && casinoData.data.t1 && casinoData.data.t1[0] && casinoData.data.t1[0]?.cards)
  }, [casinoData])

  const groupCardsdataImage = (cardsData) => {
    const groupedCards = { '1-9': [], '10-K': [] };
    // Split the input string into an array of cards
    const spliceData = cardsData && cardsData !== "" ? cardsData.split(',') : [];

    // Iterate over the cards and group them based on numeric value
    spliceData.forEach((data) => {
      const value = data.slice(0, -2); // Assuming the last two characters are the suit (e.g., "H", "D")
      const numericValue = numericValues[value]; // You need to define `numericValues` mapping
      if (numericValue >= 1 && numericValue <= 9) {
        groupedCards['1-9'].push(data);
      } else if (numericValue >= 10 && numericValue <= 13) {
        groupedCards['10-K'].push(data);
      }
    });

    // Update state with the grouped cards
    setState((prevState) => ({
      ...prevState,
      groupedCards,
    }));
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

  let LowCard = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let HighCard = data && data.t2 && data.t2[1] ? data.t2[1] : {};
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
              className="fixed inset-0 bg-black bg-opacity-50 lg:hidden  flex justify-center items-top py-5 z-50"
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

                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="">

                      <div className="page_bg py-2 space-y-4">
                        {/* {groupedCards['1-9'].length > 0 ? */}
                        <div className="bg-[var(--secondary)] py-1.5">
                          <div className="flex space-x-10 py-1.5 px-3 justify-start items-center">
                            <div className="flex space-x-2">
                              <p className="text-[16px] font-semibold text-[#fdcf13]">Low</p>
                              <p className="text-[#17ec17] text-[14px]">{t1 && t1.C1 ? t1.C1 : null}</p>
                            </div>
                            <div className="flex space-x-1">
                              {state.groupedCards['1-9'].map((card, index) => (
                                <>
                                  <img className="w-8 h-10" src={`/cards/${card}.png`} alt="" />
                                </>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-10 py-1.5 px-3 justify-start items-center">
                            <div className="flex space-x-2">
                              <p className="text-[16px] font-semibold text-[#fdcf13]">High</p>
                              <p className="text-[#17ec17] text-[14px]">{t1 && t1.C2 ? t1.C2 : null}</p>
                            </div>
                            <div className="flex space-x-1">
                              {state.groupedCards['10-K'].map((card, index) => (
                                <div key={index}>
                                  <img className="w-8 h-10" src={`/cards/${card}.png`} alt="" />
                                </div>))}
                            </div>
                          </div>
                        </div>
                        {/* : null} */}

                        <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-3 space-x-0 lg:space-y-0 space-y-2">

                          <div className="white-bg py-4 relative">

                            <span className="flex justify-center items-center text-[#097c93] text-[16px] py-2.5 font-bold">Low</span>

                            <div className=" w-11/12 py-1 mx-auto grid lg:flex justify-center items-center grid-cols-5 md:space-x-2 space-x-0 gap-2 px-2 text-center ">

                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "1" }, this.section1Ref)}>
                                    <img src={imageA} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {CardA.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center"
                                    onClick={() => this.handleBackOpen(
                                      { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "2" }, this.section1Ref)}>
                                    <img src={image2} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card2.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "3" }, this.section1Ref)}>
                                    <img src={image3} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card3.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "4" }, this.section1Ref)}>
                                    <img src={image4} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card4.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "5" }, this.section1Ref)}>
                                    <img src={image5} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card5.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "6" }, this.section1Ref)}>
                                    <img src={image6} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card6.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "7" }, this.section1Ref)}>
                                    <img src={image7} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card7.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "8" }, this.section1Ref)}>
                                    <img src={image8} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card8.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: LowCard, type: "Yes", odds: LowCard.b1, nat: LowCard.nat ? LowCard.nat : LowCard.nation, betFor: "9" }, this.section1Ref)}>
                                    <img src={image9} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card9.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[LowCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[LowCard.sid] ?? 0.00}</p>
                              </span>

                            </div>
                            {LowCard.gstatus === "1" ? null : <BetLocked />}

                          </div>

                          <div className="white-bg py-4 relative">
                            <span className="flex justify-center items-center text-[#097c93] text-[16px] py-2.5 font-bold">High</span>
                            <div className="w-11/12 py-1 mx-auto flex justify-center items-center md:space-x-2 space-x-0 gap-2 px-2 text-center ">

                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: HighCard, type: "Yes", odds: HighCard.b1, nat: HighCard.nat ? HighCard.nat : HighCard.nation, betFor: "10" }, this.section1Ref)}>
                                    <img src={image10} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {Card10.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[HighCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[HighCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: HighCard, type: "Yes", odds: HighCard.b1, nat: HighCard.nat ? HighCard.nat : HighCard.nation, betFor: "11" }, this.section1Ref)}>
                                    <img src={image11} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {CardJ.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[HighCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[HighCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: HighCard, type: "Yes", odds: HighCard.b1, nat: HighCard.nat ? HighCard.nat : HighCard.nation, betFor: "12" }, this.section1Ref)}>
                                    <img src={image12} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {CardQ.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[HighCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[HighCard.sid] ?? 0.00}</p>
                              </span>
                              <span className="">
                                <div className="relative">
                                  <div className="justify-center flex-col flex items-center" onClick={() => this.handleBackOpen(
                                    { data: HighCard, type: "Yes", odds: HighCard.b1, nat: HighCard.nat ? HighCard.nat : HighCard.nation, betFor: "13" }, this.section1Ref)}>
                                    <img src={image13} alt="" className="w-12 h-14" />
                                  </div>
                                  {/* {CardK.gstatus === "1" ? null : <BetLocked />} */}
                                </div>
                                <p className={`${posArray[HighCard.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[HighCard.sid] ?? 0.00}</p>
                              </span>
                              {HighCard.gstatus === "1" ? null : <BetLocked />}

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
                            <p className={`${element && element.result && element.result === "1" ? "text-[#F75500]" : element && element.result && element.result === "2" ? "text-[#FFF523]" : "text-[#08c]"} font-medium text-[12px]`}>
                              {element && element.result && element.result === "1" ? "H" : element && element.result && element.result === "2" ? "L" : "-"}
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
                    <div className="bg-[var(--secondary)] text-white text-[14px] px-2 py-[6px] rounded-t-[4px]">
                      <span className="font-medium tracking-wide">
                        My Bet
                      </span>
                    </div>
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


export default CasinoMeter
