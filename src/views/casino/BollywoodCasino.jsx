/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import useCasinoData from "../../context/useCasinoData";
import CustomReactFlipCounter from "../../component/counter/CustomReactFlipCounter";
import RoundedTabBmx from "../../component/casinoComponent/RoundedTabBmx";
import Loader from "../../component/casinoComponent/Loader";
import ResultModelBmx from "../../component/casinoComponent/ResultModelBmx";
import CasinoBetPlaceDesktop from "../../component/casinoComponent/CasinoBetPlaceDesktop";
import BetListTableDesktop from "../../component/casinoComponent/BetListTableDesktop";
import CasinoPageheader from "../../component/casinoComponent/CasinoPageheader";
import Lucky7brules from '../../component/casinoComponent/images/poker-rules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";

import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import BetLocked from "../../component/casinoComponent/BetLocked";
import BollywoodButtonBlue from "../../component/casinoComponent/BollywoodButtonBlue";
import BollywoodButtonPink from "../../component/casinoComponent/BollywoodButtonPink";
import { BsFillSuitHeartFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill } from "react-icons/bs";
import cardJ from "../../component/casinoComponent/images/cardJ.jpg";
import cardQ from "../../component/casinoComponent/images/cardQ.jpg";
import cardK from "../../component/casinoComponent/images/cardK.jpg";
import cardA from "../../component/casinoComponent/images/A21.jpg";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";
import ButtonValuesModal from "../buttonvalues/ButtonValuesModal";

function BollywoodCasino({ eventId }) {
  const {
    casinoData,
    showLoader,
    tvUrl,
    minStake,
    maxStake,
    name,
    betList,
    posArray,
    shortName,
    oddsDifference,
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
    betFor: null
  });
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleToggleModal = () => {
    setIsModalOpen(state => !state)
  }

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
      "sid": state?.betSlipData?.sid ?? "",
      "rate": (state.count - oddsDifference) + "",
      "amount": Number(state.betSlipData.stake),
      "casinoType": state.shortName ? state.shortName : "lucky7eu",
      "eventId": eventId,
      "betFor": state.betFor + "",

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
  let { result, data } = casinoData

  let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};

  let A1 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let B1 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let C1 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let D1 = data && data.t2 && data.t2[3] ? data.t2[3] : {};
  let E1 = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let F1 = data && data.t2 && data.t2[5] ? data.t2[5] : {};

  let Odd = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let Red = data && data.t2 && data.t2[7] ? data.t2[7] : {};
  let Black = data && data.t2 && data.t2[8] ? data.t2[8] : {};

  let CardJ = data && data.t2 && data.t2[9] ? data.t2[9] : {};
  let CardQ = data && data.t2 && data.t2[10] ? data.t2[10] : {};
  let CardK = data && data.t2 && data.t2[11] ? data.t2[11] : {};
  let CardA = data && data.t2 && data.t2[12] ? data.t2[12] : {};

  let CardKQ = data && data.t2 && data.t2[13] ? data.t2[13] : {};
  let CardJA = data && data.t2 && data.t2[14] ? data.t2[14] : {};

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
                ruleImage={Lucky7brules}
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
                      ruleImage={Lucky7brules}
                      t1={t1}
                    />
                    <div className="bg-black flex justify-between w-full relative md:text-sm text-[10px] xl:h-[460px] md:h-[300px] h-[200px]">
                      <iframe src={tvUrl ? tvUrl : null} title=" " className='relative w-full  ' />
                      <div className=" flex justify-between">
                        <div className="absolute top-0 left-0">
                          <div className="px-2 pt-1 space-y-1">

                            <div className="text-white text-[14px] font-[500] ">
                              CARD
                            </div>

                            <div className="flex space-x-1">
                              <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-12 w-10 border-[1px] border-yellow-300" />
                            </div>

                          </div>
                        </div>

                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="">

                      <div className="page_bg py-2 px-1 space-y-5 lg:block hidden">

                        <div className="grid lg:grid-cols-3 grid-cols-1 lg:space-x-3 space-x-0 ">

                          <div>
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] font-semibold darktext">
                                <span>A. </span>
                                {A1 && A1.nat ? A1.nat : A1.nation ? A1.nation : (A1.nat)}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 space-x-1">

                              <BollywoodButtonBlue
                                data={A1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name}
                              />

                              <BollywoodButtonPink
                                data={A1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name} />

                            </div>
                          </div>

                          <div>
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] font-semibold darktext">
                                <span>B. </span>
                                {B1 && B1.nat ? B1.nat : B1.nation ? B1.nation : (B1.nat)}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 space-x-1">

                              <BollywoodButtonBlue
                                data={B1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name}
                              />

                              <BollywoodButtonPink
                                data={B1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name} />

                            </div>
                          </div>

                          <div>
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] font-semibold darktext">
                                <span>C. </span>
                                {C1 && C1.nat ? C1.nat : C1.nation ? C1.nation : (C1.nat)}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 space-x-1">

                              <BollywoodButtonBlue
                                data={C1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name}
                              />

                              <BollywoodButtonPink
                                data={C1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name} />

                            </div>
                          </div>

                        </div>

                        <div className="grid lg:grid-cols-3 grid-cols-1 lg:space-x-3 space-x-0 ">

                          <div>
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] font-semibold darktext">
                                <span>D. </span>
                                {D1 && D1.nat ? D1.nat : D1.nation ? D1.nation : (D1.nat)}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 space-x-1">

                              <BollywoodButtonBlue
                                data={D1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name}
                              />

                              <BollywoodButtonPink
                                data={D1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name} />

                            </div>
                          </div>

                          <div>
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] font-semibold darktext">
                                <span>E. </span>
                                {E1 && E1.nat ? E1.nat : E1.nation ? E1.nation : (E1.nat)}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 space-x-1">

                              <BollywoodButtonBlue
                                data={E1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name}
                              />

                              <BollywoodButtonPink
                                data={E1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name} />

                            </div>
                          </div>

                          <div>
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] font-semibold darktext">
                                <span>F. </span>
                                {F1 && F1.nat ? F1.nat : F1.nation ? F1.nation : (F1.nat)}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 space-x-1">

                              <BollywoodButtonBlue
                                data={F1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name}
                              />

                              <BollywoodButtonPink
                                data={F1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name} />

                            </div>
                          </div>

                        </div>

                        <div className="grid lg:grid-cols-4 grid-cols-1 lg:space-x-3 space-x-0 ">

                          <div className="border border-gray-300 white-bg py-4 px-1.5">
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] font-semibold darktext">
                                {Odd && Odd.nat ? Odd.nat : Odd.nation ? Odd.nation : (Odd.nat)}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 space-x-1">

                              <BollywoodButtonBlue
                                data={Odd}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name}
                              />

                              <BollywoodButtonPink
                                data={Odd}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name={name} />

                            </div>
                          </div>

                          <div className="grid grid-cols-2 col-span-3 gap-2 border border-gray-300 white-bg pb-3 pt-1.5 px-1.5">

                            <div className="">
                              <div className="flex justify-center items-center ">
                                <p className="text-[14px] darktext font-semibold">
                                  {CardKQ && CardKQ.b1 && CardKQ.b1 ? CardKQ.b1 : "0"}
                                </p>
                              </div>
                              <div className="flex justify-center items-center space-x-1">
                                {CardKQ.gstatus === "ACTIVE" ?
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer"
                                    onClick={() => handleBackOpen({ data: CardKQ, type: "Yes", odds: CardKQ.b1, nat: CardKQ.nat, betFor: CardKQ.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] text-white leading-4">
                                      {CardKQ && CardKQ.nat ? CardKQ.nat : CardKQ.nation ? CardKQ.nation : "CardKQ"}
                                    </div>
                                  </div>
                                  :
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer">
                                    <div className="text-[14px] font-[600] text-white leading-4">
                                      {CardKQ && CardKQ.nat ? CardKQ.nat : CardKQ.nation ? CardKQ.nation : "CardKQ"}
                                    </div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="">
                              <div className="flex justify-center items-center ">
                                <p className="text-[14px] darktext font-semibold">
                                  {CardJA && CardJA.b1 && CardJA.b1 ? CardJA.b1 : "0"}
                                </p>
                              </div>
                              <div className="flex justify-center items-center space-x-1">
                                {CardJA.gstatus === "ACTIVE" ?
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer"
                                    onClick={() => handleBackOpen({ data: CardJA, type: "Yes", odds: CardJA.b1, nat: CardJA.nat ? CardJA.nat : CardJA.nation, betFor: CardJA.nat }, section1Ref)}>
                                    <div className="text-[14px] font-[600] text-white leading-4">
                                      {CardJA && CardJA.nat ? CardJA.nat : CardJA.nation ? CardJA.nation : "CardJA"}
                                    </div>
                                  </div>
                                  :
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer">
                                    <div className="text-[14px] font-[600] text-white leading-4">
                                      {CardJA && CardJA.nat ? CardJA.nat : CardJA.nation ? CardJA.nation : "CardJA"}
                                    </div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-4 space-x-0 ">
                          <div className="grid grid-cols-2 lg:space-x-3 space-x-2 w-full border border-gray-300 py-4 px-1.5 white-bg">

                            <div className="">
                              <div className="flex justify-center items-center ">
                                <p className="text-[14px] darktext font-semibold">
                                  {Red && Red.b1 && Red.b1 ? Red.b1 : "Red"}
                                </p>
                              </div>
                              <div className="flex justify-center items-center space-x-1">
                                {Red.gstatus === "ACTIVE" ?
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer"
                                    onClick={() => handleBackOpen({ data: Red, type: "Yes", odds: Red.b1, nat: Red.nat ? Red.nat : Red.nation, betFor: Red.nat }, section1Ref)}>
                                    <div className="text-[13px] font-[500] black-text leading-4 flex justify-center items-center space-x-1.5">
                                      <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                      <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                    </div>
                                  </div>
                                  :
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer">
                                    <div className="text-[13px] font-[500] black-text leading-4 flex justify-center items-center space-x-1.5">
                                      <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                      <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                    </div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>

                            <div className="">
                              <div className="flex justify-center items-center ">
                                <p className="text-[14px] darktext font-semibold">
                                  {Black && Black.b1 && Black.b1 ? Black.b1 : "Black"}
                                </p>
                              </div>
                              <div className="flex justify-center items-center space-x-1">
                                {Black.gstatus === "ACTIVE" ?
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer"
                                    onClick={() => handleBackOpen({ data: Black, type: "Yes", odds: Black.b1, nat: Black.nat ? Black.nat : Black.nation, betFor: Black.nat }, section1Ref)}>
                                    <div className="text-[13px] font-[500] black-text leading-4 flex justify-center items-center space-x-1.5">
                                      <BsSuitSpadeFill className='text-black' size={18} />
                                      <BsSuitClubFill className='text-black' size={18} />
                                    </div>
                                  </div>
                                  :
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer">
                                    <div className="text-[13px] font-[500] black-text leading-4 flex justify-center items-center space-x-1.5">
                                      <BsSuitSpadeFill className='text-black' size={18} />
                                      <BsSuitClubFill className='text-black' size={18} />
                                    </div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>


                          </div>

                          <div className="border border-gray-300 py-4 white-bg">
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] darktext font-semibold">
                                Card
                              </p>
                            </div>
                            <div className=" flex justify-center items-center space-x-2">

                              {CardJ.gstatus === "ACTIVE" ?
                                <div className="cursor-pointer " onClick={() => handleBackOpen({ data: CardJ, type: "Yes", odds: CardJ.b1, nat: CardJ.nat ? CardJ.nat : CardJ.nation, betFor: CardJ.nat }, section1Ref)}>
                                  <img src={cardJ} alt="card" className="w-11 h-13" />
                                </div> :
                                <div className="relative flex justify-center items-center w-11 h-13">
                                  <img src={cardJ} alt="card" className="w-11 h-13" />
                                  <BetLocked />
                                </div>
                              }

                              {CardQ.gstatus === "ACTIVE" ?
                                <div className="cursor-pointer " onClick={() => handleBackOpen({ data: CardQ, type: "Yes", odds: CardQ.b1, nat: CardQ.nat ? CardQ.nat : CardQ.nation, betFor: CardQ.nat }, section1Ref)}>
                                  <img src={cardQ} alt="card" className="w-11 h-13" />
                                </div> :
                                <div className="relative flex justify-center items-center w-11 h-13">
                                  <img src={cardQ} alt="card" className="w-11 h-13" />
                                  <BetLocked />
                                </div>
                              }


                              {CardK.gstatus === "ACTIVE" ?
                                <div className="cursor-pointer " onClick={() => handleBackOpen({ data: CardK, type: "Yes", odds: CardK.b1, nat: CardK.nat ? CardK.nat : CardK.nation, betFor: CardK.nat }, section1Ref)}>
                                  <img src={cardK} alt="card" className="w-11 h-13" />
                                </div> :
                                <div className="relative flex justify-center items-center w-11 h-13">
                                  <img src={cardK} alt="card" className="w-11 h-13" />
                                  <BetLocked />
                                </div>
                              }


                              {CardA.gstatus === "ACTIVE" ?
                                <div className="cursor-pointer " onClick={() => handleBackOpen({ data: CardA, type: "Yes", odds: CardA.b1, nat: CardA.nat ? CardA.nat : CardA.nation, betFor: CardA.nat }, section1Ref)}>
                                  <img src={cardA} alt="card" className="w-11 h-13" />
                                </div> :
                                <div className="relative flex justify-center items-center w-11 h-13">
                                  <img src={cardA} alt="card" className="w-11 h-13" />
                                  <BetLocked />
                                </div>
                              }

                            </div>
                          </div>

                        </div>

                      </div>

                      <div className="page_bg px-1 py-2 space-y-5 lg:hidden block">

                        <div className="divide-y divide-[#c7c8ca] border border-gray-300">

                          <div className="grid grid-cols-5 ">

                            <div className="col-span-3 flex justify-start items-center px-2 ">
                              <p className="text-[12px] font-semibold darktext">
                                <span>A. </span>
                                {A1 && A1.nat ? A1.nat : A1.nation ? A1.nation : (A1.nat)}
                              </p>
                            </div>


                            <BollywoodButtonBlue
                              data={A1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name}
                            />

                            <BollywoodButtonPink
                              data={A1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name} />

                          </div>

                          <div className="grid grid-cols-5">
                            <div className="col-span-3 flex justify-start items-center px-2 ">
                              <p className="text-[12px] font-semibold darktext">
                                <span>B. </span>
                                {B1 && B1.nat ? B1.nat : B1.nation ? B1.nation : (B1.nat)}
                              </p>
                            </div>

                            <BollywoodButtonBlue
                              data={B1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name}
                            />

                            <BollywoodButtonPink
                              data={B1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name} />

                          </div>

                          <div className="grid grid-cols-5">
                            <div className="col-span-3 flex justify-start items-center px-2 ">
                              <p className="text-[12px] font-semibold darktext">
                                <span>C. </span>
                                {C1 && C1.nat ? C1.nat : C1.nation ? C1.nation : (C1.nat)}
                              </p>
                            </div>

                            <BollywoodButtonBlue
                              data={C1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name}
                            />

                            <BollywoodButtonPink
                              data={C1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name} />

                          </div>

                          <div className="grid grid-cols-5">
                            <div className="col-span-3 flex justify-start items-center px-2 ">
                              <p className="text-[12px] font-semibold darktext">
                                <span>D. </span>
                                {D1 && D1.nat ? D1.nat : D1.nation ? D1.nation : (D1.nat)}
                              </p>
                            </div>

                            <BollywoodButtonBlue
                              data={D1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name}
                            />

                            <BollywoodButtonPink
                              data={D1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name} />

                          </div>

                          <div className="grid grid-cols-5">
                            <div className="col-span-3 flex justify-start items-center px-2 ">
                              <p className="text-[12px] font-semibold darktext">
                                <span>E. </span>
                                {E1 && E1.nat ? E1.nat : E1.nation ? E1.nation : (E1.nat)}
                              </p>
                            </div>

                            <BollywoodButtonBlue
                              data={E1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name}
                            />

                            <BollywoodButtonPink
                              data={E1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name} />

                          </div>

                          <div className="grid grid-cols-5">
                            <div className="col-span-3 flex justify-start items-center px-2 ">
                              <p className="text-[12px] font-semibold darktext">
                                <span>F. </span>
                                {F1 && F1.nat ? F1.nat : F1.nation ? F1.nation : (F1.nat)}
                              </p>
                            </div>

                            <BollywoodButtonBlue
                              data={F1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name}
                            />

                            <BollywoodButtonPink
                              data={F1}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name} />

                          </div>

                        </div>


                        <div className="w-full p-1 border border-gray-300">
                          <div className="grid grid-cols-5">
                            <div className="col-span-3 flex justify-start items-center px-2 ">
                              <p className="text-[12px] font-semibold darktext">
                                {Odd && Odd.nat ? Odd.nat : Odd.nation ? Odd.nation : (Odd.nat)}
                              </p>
                            </div>

                            <BollywoodButtonBlue
                              data={Odd}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name}
                            />

                            <BollywoodButtonPink
                              data={Odd}
                              handleBackOpen={handleBackOpen}
                              section1Ref={section1Ref}
                              name={name} />

                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:space-x-3 space-x-2 w-full p-1 border border-gray-300 ">

                          <div className="my-2 pb-2">
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] darktext font-semibold">
                                {CardKQ && CardKQ.b1 && CardKQ.b1 ? CardKQ.b1 : "0"}
                              </p>
                            </div>
                            <div className="flex justify-center items-center space-x-1">
                              {CardKQ.gstatus === "ACTIVE" ?
                                <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer"
                                  onClick={() => handleBackOpen({ data: CardKQ, type: "Yes", odds: CardKQ.b1, nat: CardKQ.nat ? CardKQ.nat : CardKQ.nation, betFor: "btable" }, section1Ref)}>
                                  <div className="text-[13px] font-[600] text-white leading-4">
                                    {CardKQ && CardKQ.nat ? CardKQ.nat : CardKQ.nation ? CardKQ.nation : "CardKQ"}
                                  </div>
                                </div>
                                :
                                <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer">
                                  <div className="text-[13px] font-[600] text-white leading-4">
                                    {CardKQ && CardKQ.nat ? CardKQ.nat : CardKQ.nation ? CardKQ.nation : "CardKQ"}
                                  </div>
                                  <BetLocked />
                                </div>
                              }
                            </div>
                          </div>

                          <div className="my-2 pb-2">
                            <div className="flex justify-center items-center ">
                              <p className="text-[14px] darktext font-semibold">
                                {CardJA && CardJA.b1 && CardJA.b1 ? CardJA.b1 : "0.00"}
                              </p>
                            </div>
                            <div className="flex justify-center items-center space-x-1">
                              {CardJA.gstatus === "ACTIVE" ?
                                <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer"
                                  onClick={() => handleBackOpen({ data: CardJA, type: "Yes", odds: CardJA.b1, nat: CardJA.nat ? CardJA.nat : CardJA.nation, betFor: "btable" }, section1Ref)}>
                                  <div className="text-[13px] font-[600] text-white leading-4">
                                    {CardJA && CardJA.nat ? CardJA.nat : CardJA.nation ? CardJA.nation : "CardJA"}
                                  </div>
                                </div>
                                :
                                <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer">
                                  <div className="text-[13px] font-[600] text-white leading-4">
                                    {CardJA && CardJA.nat ? CardJA.nat : CardJA.nation ? CardJA.nation : "CardJA"}
                                  </div>
                                  <BetLocked />
                                </div>
                              }
                            </div>
                          </div>

                        </div>

                        <div className="w-full p-1 border border-gray-300 ">

                          <div className="grid grid-cols-2 lg:space-x-3 space-x-2 w-full">

                            <div className="">
                              <div className="flex justify-center items-center ">
                                <p className="text-[14px] darktext font-semibold">
                                  {Red && Red.b1 && Red.b1 ? Red.b1 : "Red"}
                                </p>
                              </div>
                              <div className="flex justify-center items-center space-x-1">
                                {Red.gstatus === "ACTIVE" ?
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer"
                                    onClick={() => handleBackOpen({ data: Red, type: "Yes", odds: Red.b1, nat: Red.nat ? Red.nat : Red.nation, betFor: "btable" }, section1Ref)}>
                                    <div className="text-[13px] font-[500] black-text leading-4 flex justify-center items-center space-x-1.5">
                                      <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                      <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                    </div>
                                  </div>
                                  :
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer">
                                    <div className="text-[13px] font-[500] black-text leading-4 flex justify-center items-center space-x-1.5">
                                      <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                      <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                    </div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>


                            <div className="">
                              <div className="flex justify-center items-center ">
                                <p className="text-[14px] darktext font-semibold">
                                  {Black && Black.b1 && Black.b1 ? Black.b1 : "Black"}
                                </p>
                              </div>
                              <div className="flex justify-center items-center space-x-1">
                                {Black.gstatus === "ACTIVE" ?
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer"
                                    onClick={() => handleBackOpen({ data: Black, type: "Yes", odds: Black.b1, nat: Black.nat ? Black.nat : Black.nation, betFor: "btable" }, section1Ref)}>
                                    <div className="text-[13px] font-[500] black-text leading-4 flex justify-center items-center space-x-1.5">
                                      <BsSuitSpadeFill className='text-black' size={18} />
                                      <BsSuitClubFill className='text-black' size={18} />
                                    </div>
                                  </div>
                                  :
                                  <div className="even-background w-full rounded text-center py-3 flex justify-center items-center relative cursor-pointer">
                                    <div className="text-[13px] font-[500] black-text leading-4 flex justify-center items-center space-x-1.5">
                                      <BsSuitSpadeFill className='text-black' size={18} />
                                      <BsSuitClubFill className='text-black' size={18} />
                                    </div>
                                    <BetLocked />
                                  </div>
                                }
                              </div>
                            </div>


                          </div>

                        </div>

                        <div className="my-2 space-y-1 w-full p-1 border border-gray-300">
                          <div className="flex justify-center items-center ">
                            <p className="text-[14px] darktext font-semibold">
                              Card
                            </p>
                          </div>
                          <div className=" flex justify-center items-center space-x-2">

                            {CardJ.gstatus === "ACTIVE" ?
                              <div className="cursor-pointer " onClick={() => handleBackOpen({ data: CardJ, type: "Yes", odds: CardJ.b1, nat: CardJ.nat ? CardJ.nat : CardJ.nation, betFor: "btable" }, section1Ref)}>
                                <img src={cardJ} alt="card" className="w-10 h-12" />
                              </div> :
                              <div className="relative flex justify-center items-center w-10 h-12">
                                <img src={cardJ} alt="card" className="w-10 h-12" />
                                <BetLocked />
                              </div>
                            }

                            {CardQ.gstatus === "ACTIVE" ?
                              <div className="cursor-pointer " onClick={() => handleBackOpen({ data: CardQ, type: "Yes", odds: CardQ.b1, nat: CardQ.nat ? CardQ.nat : CardQ.nation, betFor: "btable" }, section1Ref)}>
                                <img src={cardQ} alt="card" className="w-10 h-12" />
                              </div> :
                              <div className="relative flex justify-center items-center w-10 h-12">
                                <img src={cardQ} alt="card" className="w-10 h-12" />
                                <BetLocked />
                              </div>
                            }


                            {CardK.gstatus === "ACTIVE" ?
                              <div className="cursor-pointer " onClick={() => handleBackOpen({ data: CardK, type: "Yes", odds: CardK.b1, nat: CardK.nat ? CardK.nat : CardK.nation, betFor: "btable" }, section1Ref)}>
                                <img src={cardK} alt="card" className="w-10 h-12" />
                              </div> :
                              <div className="relative flex justify-center items-center w-10 h-12">
                                <img src={cardK} alt="card" className="w-10 h-12" />
                                <BetLocked />
                              </div>
                            }


                            {CardA.gstatus === "ACTIVE" ?
                              <div className="cursor-pointer " onClick={() => handleBackOpen({ data: CardA, type: "Yes", odds: CardA.b1, nat: CardA.nat ? CardA.nat : CardA.nation, betFor: "btable" }, section1Ref)}>
                                <img src={cardA} alt="card" className="w-10 h-12" />
                              </div> :
                              <div className="relative flex justify-center items-center w-10 h-12">
                                <img src={cardA} alt="card" className="w-10 h-12" />
                                <BetLocked />
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
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className="text-[#ffff33] font-[600] text-[13px]">{element && element.result === '2' ? "B" : element && element.result === '1' ? <p className="text-[#FF4502] font-[600] text-[13px]">A</p> : "-"}</p>
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


export default BollywoodCasino
