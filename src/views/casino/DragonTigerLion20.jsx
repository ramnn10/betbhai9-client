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
import Teenpattiondayrules from '../../component/casinoComponent/images/dragon-tiger-20-rules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import GameCard from "../../component/casinoComponent/GameCard";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import { BsFillSuitHeartFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill } from "react-icons/bs";
import GameCardDtl20 from "../../component/casinoComponent/GameCardDtl20";
import A1 from "../../component/casinoComponent/images/1.jpg";
import A2 from "../../component/casinoComponent/images/2.jpg";
import A3 from "../../component/casinoComponent/images/3.jpg";
import A4 from "../../component/casinoComponent/images/4.jpg";
import A5 from "../../component/casinoComponent/images/5.jpg";
import A6 from "../../component/casinoComponent/images/6.jpg";
import A7 from "../../component/casinoComponent/images/7.jpg";
import A8 from "../../component/casinoComponent/images/8.jpg";
import A9 from "../../component/casinoComponent/images/9.jpg";
import A10 from "../../component/casinoComponent/images/10.jpg";
import A11 from "../../component/casinoComponent/images/11.jpg";
import A12 from "../../component/casinoComponent/images/12.jpg";
import A13 from "../../component/casinoComponent/images/13.jpg";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";

function DragonTigerLion20({ eventId }) {
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
  const dispatch = useDispatch()
  const section1Ref = useRef(null);
  const scrollTimeout = useRef(null);
  const [activeTabDtl, setActiveTabDtl] = useState(1)
  const handledtlClick = (tab) => {
    setActiveTabDtl(tab)
  }

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
    if (scrollTimeout.current) {
      clearInterval(scrollTimeout.current);
    }
    setState(prevState => ({
      ...prevState,
      backBetModal: true,
      betSlipData: { ...data, stake: "0" },
      count: data.rate,

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
      "casinoType": state.shortName ? state.shortName : "dtl20",
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
  let { data, result } = casinoData ? casinoData : {};
  let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};

  let Winner1 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Winner2 = data && data.t2 && data.t2[1] ? data.t2[1] : {};

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
              shortName={shortName ? shortName : "dt20"}
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
                          <div className="px-2 pt-1 space-y-1">

                            <div className="text-white text-[12px] font-[500] ">
                              CARD
                            </div>

                            <div className="flex space-x-1">
                              <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-9 w-7 border-[1px] border-yellow-300" />
                              <img src={`/cards/${t1 && t1.C5 ? t1.C5 : 1}.png`} alt="card" className="h-9 w-7 border-[1px] border-yellow-300" />
                              <img src={`/cards/${t1 && t1.C6 ? t1.C6 : 1}.png`} alt="card" className="h-9 w-7 border-[1px] border-yellow-300" />
                            </div>

                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>
                    <div className="lg:hidden block">
                      <div className="pt-1">
                        <div className="flex overflow-x-auto whitespace-wrap text-[14px] tracking-wide capitalize font-[500] divide-x divide-[#52796f]">

                          <div className={`${activeTabDtl === 1 ? "text-white even-background" : " worli-color black-text "} flex justify-center items-center cursor-pointer px-4 py-1.5`} onClick={() => handledtlClick(1)}>
                            <span className="flex justify-center items-center ">
                              Dragon
                            </span>
                          </div>

                          <div className={`${activeTabDtl === 2 ? "text-white even-background" : " worli-color black-text"} flex justify-center items-center cursor-pointer px-4 py-1.5`} onClick={() => handledtlClick(2)}>
                            <span className="flex justify-center items-center">
                              Tiger
                            </span>
                          </div>

                          <div className={`${activeTabDtl === 3 ? "text-white even-background" : " worli-color black-text"} flex justify-center items-center cursor-pointer px-4 py-1.5`} onClick={() => handledtlClick(3)}>
                            <span className="flex justify-center items-center">
                              Lion
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>


                    <div className="">

                      <div className="py-2">

                        <div className="lg:grid lg:grid-cols-2 grid-cols-1 gap-4 hidden w-full">

                          <div className=" odds-bet w-full border border-gray-300 divide-y divide-[#c7c8ca]">

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-center items-center "></div>

                              <div className="flex justify-center items-center py-1 light-blue">
                                Dragon
                              </div>

                              <div className="flex justify-center items-center py-1 light-blue">
                                Tiger
                              </div>

                              <div className="flex justify-center items-center py-1 light-blue">
                                Lion
                              </div>

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                Winner
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start space-x-1 px-2 items-center text-[14px] py-1 font-[600]">
                                <span>Black</span>
                                <span className="flex space-x-1">
                                  <BsSuitSpadeFill className='text-black' />
                                  <BsSuitClubFill className='text-black' />
                                </span>
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start space-x-1 px-2 items-center text-[14px] py-1 font-[600]">
                                <span>Red</span>
                                <span className="flex space-x-1">
                                  <BsFillSuitHeartFill className='text-[#FF0000]' />
                                  <BsSuitDiamondFill className='text-[#FF0000]' />
                                </span>
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                Odd
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                Even
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A1} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A2} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A3} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A4} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                          </div>

                          <div className=" odds-bet w-full border border-gray-300 divide-y divide-[#c7c8ca]">

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-center items-center "></div>

                              <div className="flex justify-center items-center py-1 light-blue">
                                Dragon
                              </div>

                              <div className="flex justify-center items-center py-1 light-blue">
                                Tiger
                              </div>

                              <div className="flex justify-center items-center py-1 light-blue">
                                Lion
                              </div>

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A5} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A6} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A7} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A8} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A9} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A10} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A11} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A12} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                            <div className="grid grid-cols-5 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                              <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                <img src={A13} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                              </div>

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                              <GameCardDtl20 />

                            </div>

                          </div>

                        </div>

                        <div className="grid  grid-cols-2 gap-4 lg:hidden w-full">

                          {activeTabDtl === 1 ? (
                            <>

                              <div className=" odds-bet w-full border border-gray-300 divide-y divide-[#c7c8ca]">



                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Winner
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start space-x-1 px-2 items-center text-[14px] py-1 font-[600]">
                                    <span>Black</span>
                                    <span className="flex space-x-1">
                                      <BsSuitSpadeFill className='text-black' />
                                      <BsSuitClubFill className='text-black' />
                                    </span>
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start space-x-1 px-2 items-center text-[14px] py-1 font-[600]">
                                    <span>Red</span>
                                    <span className="flex space-x-1">
                                      <BsFillSuitHeartFill className='text-[#FF0000]' />
                                      <BsSuitDiamondFill className='text-[#FF0000]' />
                                    </span>
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Odd
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Even
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A1} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A2} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />

                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A3} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A4} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                              </div>

                              <div className=" odds-bet w-full border border-gray-300 divide-y divide-[#c7c8ca]">



                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A5} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A6} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />

                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A7} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A8} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A9} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A10} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A11} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A12} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A13} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                              </div>

                            </>
                          ) : null}

                          {activeTabDtl === 2 ? (
                            <>

                              <div className=" odds-bet w-full border border-gray-300 divide-y divide-[#c7c8ca]">



                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Winner
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start space-x-1 px-2 items-center text-[14px] py-1 font-[600]">
                                    <span>Black</span>
                                    <span className="flex space-x-1">
                                      <BsSuitSpadeFill className='text-black' />
                                      <BsSuitClubFill className='text-black' />
                                    </span>
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start space-x-1 px-2 items-center text-[14px] py-1 font-[600]">
                                    <span>Red</span>
                                    <span className="flex space-x-1">
                                      <BsFillSuitHeartFill className='text-[#FF0000]' />
                                      <BsSuitDiamondFill className='text-[#FF0000]' />
                                    </span>
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Odd
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Even
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A1} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A2} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />

                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A3} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A4} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                              </div>

                              <div className=" odds-bet w-full border border-gray-300 divide-y divide-[#c7c8ca]">



                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A5} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A6} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />

                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A7} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A8} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A9} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A10} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A11} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A12} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A13} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                              </div>

                            </>
                          ) : null}


                          {activeTabDtl === 3 ? (
                            <>

                              <div className=" odds-bet w-full border border-gray-300 divide-y divide-[#c7c8ca]">



                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Winner
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start space-x-1 px-2 items-center text-[14px] py-1 font-[600]">
                                    <span>Black</span>
                                    <span className="flex space-x-1">
                                      <BsSuitSpadeFill className='text-black' />
                                      <BsSuitClubFill className='text-black' />
                                    </span>
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start space-x-1 px-2 items-center text-[14px] py-1 font-[600]">
                                    <span>Red</span>
                                    <span className="flex space-x-1">
                                      <BsFillSuitHeartFill className='text-[#FF0000]' />
                                      <BsSuitDiamondFill className='text-[#FF0000]' />
                                    </span>
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Odd
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    Even
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A1} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A2} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />

                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A3} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A4} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                              </div>

                              <div className=" odds-bet w-full border border-gray-300 divide-y divide-[#c7c8ca]">



                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A5} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A6} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />

                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A7} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A8} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A9} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A10} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A11} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A12} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />



                                </div>

                                <div className="grid grid-cols-3 capitalize text-[14px] darktext font-[600] divide-x divide-[#c7c8ca]">

                                  <div className="col-span-2 flex justify-start px-2 items-center text-[14px] py-1 font-[600]">
                                    <img src={A13} alt="aaaaaa" className='h-7 w-6 flex justify-center items-center' />
                                  </div>

                                  <GameCardDtl20 />


                                </div>

                              </div>

                            </>
                          ) : null}

                        </div>



                      </div>

                    </div>


                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className="text-[#ffff33] font-[600] text-[13px]">{element && element.result === '2' ? "B" : element && element.result === '1' ? <p className="text-[#FF4502] font-[600] text-[13px]">A</p> : "-"}</p>
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


export default DragonTigerLion20
