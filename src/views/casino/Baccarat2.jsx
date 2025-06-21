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
import Teenpattiondayrules from '../../component/casinoComponent/images/baccaratrules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import BetPlayerName from "../../component/casinoComponent/BetPlayerName";
import BetButtonCards from "../../component/casinoComponent/BetButtonCards";
import BetButton from "../../component/casinoComponent/BetButton";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import BaccaratButton from "../../component/casinoComponent/BaccaratButton";
import BaccaratChart from "../../component/casinoComponent/images/baccaratchart.png";
import { FaLock } from "react-icons/fa";

function Baccarat2({ eventId }) {
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
      "casinoType": state.shortName ? state.shortName : "baccarat",
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
  let Player = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Banker = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Tie = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let PlayerPair = data && data.t2 && data.t2[3] ? data.t2[3] : {};
  let BankerPair = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let PerfectPair = data && data.t2 && data.t2[5] ? data.t2[5] : {};
  let Big = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let Small = data && data.t2 && data.t2[7] ? data.t2[7] : {};
  let EitherPair = data && data.t2 && data.t2[8] ? data.t2[8] : {};

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
                    <div className="odds-bet">

                      <div className="lg:col-span-4 col-span-2">

                        <div className="grid grid-cols-4 lg:space-x-2.5 space-x-1.5 lg:px-2 px-[2px] py-2.5 ">

                          <BaccaratButton
                            data={PerfectPair}
                            handleBackOpen={handleBackOpen}
                            section1Ref={section1Ref}
                            name={name}
                          />

                          <BaccaratButton
                            data={Big}
                            handleBackOpen={handleBackOpen}
                            section1Ref={section1Ref}
                            name={name}
                          />

                          <BaccaratButton
                            data={Small}
                            handleBackOpen={handleBackOpen}
                            section1Ref={section1Ref}
                            name={name}
                          />

                          <BaccaratButton
                            data={EitherPair}
                            handleBackOpen={handleBackOpen}
                            section1Ref={section1Ref}
                            name={name}
                          />

                        </div>

                        <div className="pt-4 px-2 flex">

                          <div className='flex rounded-l-full w-1/6'>
                            {
                              PlayerPair.gstatus === "1" ?
                                <div className="bg-[#509bff] w-full rounded-l-full border-r border-white text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: PlayerPair, type: "Yes", odds: PlayerPair.b1, nat: PlayerPair.nat ? PlayerPair.nat : PlayerPair.nation, betFor: "baccarat" }, section1Ref)}>
                                  <div className="lg:text-[14px] text-[12px] font-[600] text-white leading-4">
                                    {PlayerPair && PlayerPair.nat && PlayerPair.nat ? PlayerPair.nat : PlayerPair.nation ? PlayerPair.nation : "PlayerPair"}
                                  </div>
                                  <div className="lg:text-[12px] text-[10px] font-[500] text-white leading-4"> {PlayerPair && PlayerPair.b1 && PlayerPair.b1 ? PlayerPair.b1 : "0.00"}</div>
                                </div>
                                :
                                <div className=" w-full bg-[#509bff] rounded-l-full border-r border-white text-center py-2.5 relative cursor-pointer" >
                                  <div className="lg:text-[14px] text-[12px]font-[600] text-white leading-4">
                                    {PlayerPair && PlayerPair.nat && PlayerPair.nat ? PlayerPair.nat : PlayerPair.nation ? PlayerPair.nation : "PlayerPair"}
                                  </div>
                                  <div className="lg:text-[12px] text-[10px] font-[500] text-white leading-4">
                                    {PlayerPair && PlayerPair.b1 && PlayerPair.b1 ? PlayerPair.b1 : "0.00"}</div>
                                  <div className="absolute top-0 bg-[#2E4B60]/50 flex rounded-l-full justify-center items-center w-full h-full cursor-pointer">
                                    <FaLock size={16} className="text-white" />
                                  </div>
                                </div>
                            }
                          </div>

                          <div className="grid grid-cols-3 px-1.5 w-4/6">

                            <div className='flex'>
                              {
                                Player.gstatus === "1" ?
                                  <div className="bg-[#509bff] w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Player, type: "Yes", odds: Player.b1, nat: Player.nat, betFor: "baccarat" }, section1Ref)}>
                                    <div className="text-[12px] px-2 font-[500] text-white text-left leading-4">
                                      {Player && Player.nat ? Player.nat : Player.nation ? Player.nation : "Player"}
                                      {Player && Player.b1 && Player.b1 ? Player.b1 : "0.00"}
                                    </div>
                                    <div className="flex justify-center items-start space-x-1 relative z-50">
                                      <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-8 w-6 border-[1px] border-yellow-300" />
                                      <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-8 w-6 border-[1px] border-yellow-300" />
                                    </div>
                                  </div>
                                  :
                                  <div className=" w-full bg-[#509bff] text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[12px] px-2 font-[500] text-white text-left leading-4">
                                      {Player && Player.nat ? Player.nat : Player.nation ? Player.nation : "Player"}
                                      {Player && Player.b1 && Player.b1 ? Player.b1 : "0.00"}
                                    </div>
                                    <div className="flex justify-center items-start space-x-1 relative z-50">
                                      <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-8 w-6 border-[1px] border-yellow-300" />
                                      <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-8 w-6 border-[1px] border-yellow-300" />
                                    </div>
                                    <BetLocked />
                                  </div>

                              }
                            </div>

                            <div className='flex'>
                              {
                                Tie.gstatus === "1" ?
                                  <div className="bg-[#279532] w-full text-center py-2.5 flex justify-center items-center relative cursor-pointer" onClick={() => handleBackOpen({ data: Tie, type: "Yes", odds: Tie.b1, nat: Tie.nat, betFor: "baccarat" }, section1Ref)}>
                                    <div className="text-[13px] font-[500] black-text leading-4">
                                      {Tie && Tie.nat ? Tie.nat : Tie.nation ? Tie.nation : "Tie"}
                                      {Tie && Tie.b1 && Tie.b1 ? Tie.b1 : "0.00"}
                                    </div>
                                  </div>
                                  :
                                  <div className=" w-full bg-[#279532] text-center py-2.5 flex justify-center items-center relative cursor-pointer" >
                                    <div className="text-[13px] font-[500] text-white leading-4">
                                      {Tie && Tie.nat ? Tie.nat : Tie.nation ? Tie.nation : "Tie"}
                                      {Tie && Tie.b1 && Tie.b1 ? Tie.b1 : "0.00"}
                                    </div>
                                    <BetLocked />
                                  </div>
                              }
                            </div>

                            <div className='flex'>
                              {
                                Banker.gstatus === "1" ?
                                  <div className="bg-[#d3393d] w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Banker, type: "Yes", odds: Banker.b1, nat: Banker.nat, betFor: "baccarat" }, section1Ref)}>
                                    <div className="text-[12px] px-2 font-[500] text-white text-right leading-4">
                                      {Banker && Banker.nat ? Banker.nat : Banker.nation ? Banker.nation : "Banker"}
                                      {Banker && Banker.b1 && Banker.b1 ? Banker.b1 : "0.00"}
                                    </div>
                                    <div className="flex justify-center items-center space-x-1 relative z-50">
                                      <img src={`/cards/${t1 && t1.C4 ? t1.C4 : 1}.png`} alt="card" className="h-8 w-6 border-[1px] border-yellow-300" />
                                      <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-8 w-6 border-[1px] border-yellow-300" />
                                    </div>
                                  </div>
                                  :
                                  <div className=" w-full bg-[#d3393d] text-center py-2.5 relative cursor-pointer" >
                                    <div className="text-[12px] px-2 font-[500] text-white text-right leading-4">
                                      {Banker && Banker.nat ? Banker.nat : Banker.nation ? Banker.nation : "Banker"}
                                      {Banker && Banker.b1 && Banker.b1 ? Banker.b1 : "0.00"}
                                    </div>
                                    <div className="flex justify-center items-center space-x-1 relative z-50">
                                      <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-8 w-6 border-[1px] border-yellow-300" />
                                      <img src={`/cards/${t1 && t1.C4 ? t1.C4 : 1}.png`} alt="card" className="h-8 w-6 border-[1px] border-yellow-300" />&nbsp;
                                    </div>
                                    <BetLocked />
                                  </div>
                              }
                            </div>

                          </div>

                          <div className='flex w-1/6'>
                            {
                              BankerPair.gstatus === "1" ?
                                <div className="bg-[#d3393d] w-full rounded-r-full border-l border-white text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: BankerPair, type: "Yes", odds: BankerPair.b1, nat: BankerPair.nat, betFor: "baccarat" }, section1Ref)}>
                                  <div className="text-[14px] font-[600] text-white leading-4">
                                    {BankerPair && BankerPair.nat ? BankerPair.nat : BankerPair.nation ? BankerPair.nation : "BankerPair"}
                                  </div>
                                  <div className="text-[13px] font-[500] text-white leading-4">
                                    {BankerPair && BankerPair.b1 && BankerPair.b1 ? BankerPair.b1 : "0.00"}
                                  </div>

                                </div>
                                :
                                <div className=" w-full bg-[#d3393d] rounded-r-full border-l border-white text-center py-2.5 relative cursor-pointer" >
                                  <div className="text-[14px] font-[600] text-white leading-4">
                                    {BankerPair && BankerPair.nat ? BankerPair.nat : BankerPair.nation ? BankerPair.nation : "BankerPair"}
                                  </div>
                                  <div className="text-[13px] font-[500] text-white leading-4">
                                    {BankerPair && BankerPair.b1 && BankerPair.b1 ? BankerPair.b1 : "0.00"}
                                  </div>
                                  <div className="absolute top-0 bg-[#2E4B60]/50 flex rounded-r-full justify-center items-center w-full h-full cursor-pointer">
                                    <FaLock size={16} className="text-white" />
                                  </div>
                                </div>
                            }
                          </div>


                        </div>

                      </div>
                    </div>



                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className={`w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-sm ${element?.result === "1" ? "bg-[#086cb8] text-white" : element?.result === "2" ? "text-white bg-[#ae2130]" : element?.result === "3" ? "text-white bg-[#d0012f]" : "text-[#000]"}`}>
                            <p className="font-[600] text-[12px]">
                            {element?.result === "1" ? "P" : element?.result === "2" ? "B" : element?.result === "3" ? "T" : "-"}
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
                    <div className="bg-[var(--secondary)] text-white text-[14px] px-2 py-[6px] rounded-t-[4px] ">
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


export default Baccarat2
