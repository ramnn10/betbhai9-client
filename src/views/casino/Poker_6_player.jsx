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
import Teenpattiondayrules from '../../component/casinoComponent/images/poker-rules.jpg';
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

function Poker_6_player({ eventId }) {
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
      "casinoType": state.shortName ? state.shortName : "6player",
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
  let Winner1 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Winner2 = data && data.t2 && data.t2[1] ? data.t2[1] : {};

  let HighCard = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Pair = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Twopair = data && data.t2 && data.t2[1] ? data.t2[1] : {};

  let Onepair1 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let Onepair2 = data && data.t2 && data.t2[3] ? data.t2[3] : {};


  let Twopair1 = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let Twopair2 = data && data.t2 && data.t2[5] ? data.t2[5] : {};


  let ThreeofaKind1 = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let ThreeofaKind2 = data && data.t2 && data.t2[7] ? data.t2[7] : {};


  let Straight1 = data && data.t2 && data.t2[8] ? data.t2[8] : {};
  let Straight2 = data && data.t2 && data.t2[9] ? data.t2[9] : {};


  let Flush1 = data && data.t2 && data.t2[10] ? data.t2[10] : {};
  let Flush2 = data && data.t2 && data.t2[11] ? data.t2[11] : {};


  let FullHouse1 = data && data.t2 && data.t2[12] ? data.t2[12] : {};
  let FullHouse2 = data && data.t2 && data.t2[13] ? data.t2[13] : {};


  let FourofaKind1 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
  let FourofaKind2 = data && data.t2 && data.t2[15] ? data.t2[15] : {};

  let StraightFlush1 = data && data.t2 && data.t2[16] ? data.t2[16] : {};
  let StraightFlush2 = data && data.t2 && data.t2[17] ? data.t2[17] : {};


  let Amar = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Akbar = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Anthony = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let Even = data && data.t2 && data.t2[3] ? data.t2[3] : {};
  let Odd = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let Red = data && data.t2 && data.t2[5] ? data.t2[5] : {};
  let Black = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let CardA = data && data.t2 && data.t2[7] ? data.t2[7] : {};
  let Card2 = data && data.t2 && data.t2[8] ? data.t2[8] : {};
  let Card3 = data && data.t2 && data.t2[9] ? data.t2[9] : {};
  let Card4 = data && data.t2 && data.t2[10] ? data.t2[10] : {};
  let Card5 = data && data.t2 && data.t2[11] ? data.t2[11] : {};
  let Card6 = data && data.t2 && data.t2[12] ? data.t2[12] : {};
  let Card7 = data && data.t2 && data.t2[13] ? data.t2[13] : {};
  let Card8 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
  let Card9 = data && data.t2 && data.t2[15] ? data.t2[15] : {};
  let Card10 = data && data.t2 && data.t2[16] ? data.t2[16] : {};
  let CardJ = data && data.t2 && data.t2[17] ? data.t2[17] : {};
  let CardQ = data && data.t2 && data.t2[18] ? data.t2[18] : {};
  let CardK = data && data.t2 && data.t2[19] ? data.t2[19] : {};
  let Under7 = data && data.t2 && data.t2[20] ? data.t2[20] : {};
  let Over7 = data && data.t2 && data.t2[21] ? data.t2[21] : {};
  let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};

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
                        <div className="absolute top-0 left-0">
                          <div className="space-y-1 p-2">

                            <div className="text-white text-[12px] font-[500] ">
                              CARD
                            </div>

                            <div className="flex space-x-1">
                              <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-7 w-6" />
                              <img src={`/cards/${t1 && t1.C5 ? t1.C5 : 1}.png`} alt="card" className="h-7 w-6" />
                            </div>

                            <div className="flex space-x-1">
                              <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-7 w-6" />
                              <img src={`/cards/${t1 && t1.C6 ? t1.C6 : 1}.png`} alt="card" className="h-7 w-6" />
                            </div>

                            <div className="flex space-x-1">
                              <img src={`/cards/${t1 && t1.C10 ? t1.C10 : 1}.png`} alt="card" className="h-7 w-6" />
                              <img src={`/cards/${t1 && t1.C7 ? t1.C7 : 1}.png`} alt="card" className="h-7 w-6" />
                            </div>

                            <div className="flex space-x-1">
                              <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-7 w-6" />
                              <img src={`/cards/${t1 && t1.C8 ? t1.C8 : 1}.png`} alt="card" className="h-7 w-6" />
                            </div>

                            <div className="flex space-x-1">
                              <img src={`/cards/${t1 && t1.C4 ? t1.C4 : 1}.png`} alt="card" className="h-7 w-6" />
                              <img src={`/cards/${t1 && t1.C9 ? t1.C9 : 1}.png`} alt="card" className="h-7 w-6" />
                            </div>

                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="flex overflow-x-auto whitespace-wrap md:space-x-0 space-x-1 text-[14px] tracking-wide capitalize  font-[500]">

                        <div className={`${activeTab2 === 1 ? "text-white bg-[var(--casinoHeader)]" : "bg-[#CCCCCC] black-text hover:text-[#0d6efd] "} flex justify-center items-center cursor-pointer px-4 py-1.5`} onClick={() => handleCardClick(1)}>
                          <span className="flex justify-center items-center ">
                            Hands
                          </span>
                        </div>

                        <div className={`${activeTab2 === 2 ? "text-white bg-[var(--casinoHeader)]" : "bg-[#CCCCCC] black-text hover:text-[#0d6efd]"} flex justify-center items-center cursor-pointer px-4 py-1.5`} onClick={() => handleCardClick(2)}>
                          <span className="flex justify-center items-center">
                            Pattern
                          </span>
                        </div>

                      </div>
                    </div>

                    <div className="w-full">

                      {activeTab2 === 1 ? (
                        <>
                          <div className="w-full space-y-1.5 py-1">
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">

                              <Poker6PlayerCardButton
                                data={Onepair1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Player 1" />

                              <Poker6PlayerCardButton
                                data={Twopair1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Player 2" />

                            </div>

                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">

                              <Poker6PlayerCardButton
                                data={Onepair1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Player 3" />

                              <Poker6PlayerCardButton
                                data={Twopair1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Player 4" />

                            </div>

                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">

                              <Poker6PlayerCardButton
                                data={Onepair1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Player 5" />

                              <Poker6PlayerCardButton
                                data={Twopair1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Player 6" />

                            </div>
                          </div>
                        </>
                      ) : null}

                      {activeTab2 === 2 ? (
                        <>
                          <div className="w-full">

                            <div className="w-full space-y-1.5 py-1">
                              <div className="grid grid-cols-3 gap-2">

                                <Poker6PlayerBetButton
                                  data={Winner1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Winner" />

                                <Poker6PlayerBetButton
                                  data={Onepair1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="One Pair" />

                                <Poker6PlayerBetButton
                                  data={Twopair1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Two Pair" />

                              </div>
                            </div>

                            <div className="w-full space-y-1.5 py-1">
                              <div className="grid grid-cols-3 gap-2">

                                <Poker6PlayerBetButton
                                  data={ThreeofaKind1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Three of a Kind" />

                                <Poker6PlayerBetButton
                                  data={Straight1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Straight" />

                                <Poker6PlayerBetButton
                                  data={Flush1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Flush" />

                              </div>
                            </div>

                            <div className="w-full space-y-1.5 py-1">
                              <div className="grid grid-cols-3 gap-2">

                                <Poker6PlayerBetButton
                                  data={FullHouse1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Full House" />

                                <Poker6PlayerBetButton
                                  data={FourofaKind1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Four of a Kind" />

                                <Poker6PlayerBetButton
                                  data={StraightFlush1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Straight Flush" />

                              </div>
                            </div>

                          </div>
                        </>
                      ) : null}

                    </div>



                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className={`w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700 ${element?.result === "11" ? "text-[#F75500] bg-[#355e3b]" : element?.result === "21" ? "text-[#FFF523] bg-[#355e3b]" : "text-[#000]"}`}>
                            <p className="font-[700] text-[14px]">
                              {element?.result === "21" ? "B" : element?.result === "11" ? "A" : "-"}
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


export default Poker_6_player
