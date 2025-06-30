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
import CasinoBetPlaceDesktop from "../../component/casinoComponent/CasinoBetPlaceDesktop";
import BetListTableDesktop from "../../component/casinoComponent/BetListTableDesktop";
import CasinoPageheader from "../../component/casinoComponent/CasinoPageheader";
import Teenpattiondayrules from '../../component/casinoComponent/images/aaa-rules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import { AiFillHeart } from "react-icons/ai";
import { ImDiamonds } from "react-icons/im";
import { BsSuitClubFill, BsSuitSpadeFill } from "react-icons/bs";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import { useDispatch } from "react-redux";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";

function AmarAkbarAnthony({ eventId }) {
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
            "sid": state.betSlipData?.data?.sid,
            "rate": state.count + "",
            "amount": Number(state.betSlipData.stake),
            "casinoType": state.shortName ? state.shortName : "aaa",
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
                <div className={`w-full relative  page_bg  text-sm flex`}>
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
                                                <div className="absolute top-0 left-0">
                                                    <div className="flex justify-start space-x-1 p-2">
                                                        <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-10 w-8 border-[1px] border-yellow-300" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.autotime} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="page_bg">

                                            <div className="odds-bet lg:block hidden mt-2">

                                                {/* <div className="py-2 px-4 relative">
    <div className="text-black flex justify-end items-center cursor-pointer " onClick={handleToggleModal}>
      <FaInfoCircle className="hover:text-[#007bff] " size={16} />
    </div>

    {isModalOpen && (
      <div className="modal bg-black/60 xl:w-[15%] lg:w-[30%] absolute z-50 right-4">
        <div className="modal-content">
          <div className="flex justify-center items-center font-normal lg:text-[15px] text-[14px] py-1.5 text-white px-4 whitespace-nowrap">
            <span className="font-[500]">MIN</span>:{minStake} <span className="font-[500]">&nbsp; MAX</span>:{maxStake}
          </div>
        </div>
      </div>
    )}
  </div> */}

                                                <div className="grid grid-cols-3 space-x-4 px-4 pb-4 pt-1 mt-1">

                                                    <div className="">
                                                        <div className="flex justify-center items-center ">
                                                            <p className="text-[16px] font-semibold gray-text " >
                                                                A. {Amar && Amar.nat ? Amar.nat : Amar.nation ? Amar.nation : "Amar"}</p>
                                                        </div>

                                                        <div className="flex justify-center items-center space-x-1.5">
                                                            <div className="w-full cursor-pointer relative">
                                                                <div className="bg-[var(--matchLagai)] w-full text-center py-3.5 relative" onClick={() => handleBackOpen({ data: Amar, type: "Yes", odds: Amar.b1, nat: Amar.nat ? Amar.nat : Amar.nation, betFor: "aaa" }, section1Ref)}>
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Amar && Amar.b1 ? Amar.b1 : "0.00"}</div>
                                                                </div>
                                                                {Amar.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                            </div>
                                                            <div className="w-full cursor-pointer relative">
                                                                <div onClick={() => handleBackOpen({ data: Amar, type: "No", odds: Amar.l1, nat: Amar.nat ? Amar.nat : Amar.nation, betFor: "aaa" }, section1Ref)} className="bg-[var(--matchKhai)] w-full text-center py-3.5 cursor-pointer relative">
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Amar && Amar.l1 ? Amar.l1 : "0.00"}</div>
                                                                </div>
                                                                {Amar.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                            </div>
                                                        </div>
                                                        <div className={`${posArray[Amar.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[500] pt-1 `} > {posArray[Amar.sid] ?? 0.00}</div>
                                                    </div>

                                                    <div className="">
                                                        <div className="flex justify-center items-center ">
                                                            <p className="text-[16px] font-semibold gray-text">
                                                                B. {Akbar && Akbar.nat ? Akbar.nat : Akbar.nation ? Akbar.nation : "Akbar"}</p>
                                                        </div>
                                                        <div className="flex justify-center items-center space-x-1.5">
                                                            {Akbar.gstatus === "ACTIVE" ?
                                                                <div className=" bg-[var(--matchLagai)] w-full text-center py-3.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Akbar, type: "Yes", odds: Akbar.b1, nat: Akbar.nat ? Akbar.nat : Akbar.nation, betFor: "aaa" }, section1Ref)}>
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Akbar && Akbar.b1 ? Akbar.b1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className="bg-[var(--matchLagai)] w-full text-center py-3.5 relative cursor-pointer">
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Akbar && Akbar.b1 ? Akbar.b1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                            {Akbar.gstatus === "ACTIVE" ?
                                                                <div onClick={() => handleBackOpen({ data: Akbar, type: "No", odds: Akbar.l1, nat: Akbar.nat ? Akbar.nat : Akbar.nation, betFor: "aaa" }, section1Ref)} className="bg-[var(--matchKhai)] w-full text-center py-3.5 cursor-pointer relative">
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Akbar && Akbar.l1 ? Akbar.l1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className="bg-[var(--matchKhai)] w-full text-center py-3.5 cursor-pointer relative">
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Akbar && Akbar.l1 ? Akbar.l1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className={`${posArray[Akbar.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[500] pt-1`} > {posArray[Akbar.sid] ?? 0.00}</div>
                                                    </div>

                                                    <div className="">
                                                        <div className="flex justify-center items-center ">
                                                            <p className="text-[16px] font-semibold gray-text">
                                                                C. {Anthony && Anthony.nat ? Anthony.nat : Anthony.nation ? Anthony.nation : "Anthony"}</p>
                                                        </div>
                                                        <div className="flex justify-center items-center space-x-1.5">
                                                            {Anthony.gstatus === "ACTIVE" ?
                                                                <div className=" bg-[var(--matchLagai)] w-full text-center py-3.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Anthony, type: "Yes", odds: Anthony.b1, nat: Anthony.nat ? Anthony.nat : Anthony.nation, betFor: "aaa" }, section1Ref)}>
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Anthony && Anthony.b1 ? Anthony.b1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className=" bg-[var(--matchLagai)] w-full text-center py-3.5 relative cursor-pointer">
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Anthony && Anthony.b1 ? Anthony.b1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                            {Anthony.gstatus === "ACTIVE" ?
                                                                <div onClick={() => handleBackOpen({ data: Anthony, type: "No", odds: Anthony.l1, nat: Anthony.nat ? Anthony.nat : Anthony.nation, betFor: "aaa" }, section1Ref)} className=" bg-[var(--matchKhai)] w-full text-center py-3.5 cursor-pointer relative">
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Anthony && Anthony.l1 ? Anthony.l1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className=" bg-[var(--matchKhai)] w-full text-center py-3.5 cursor-pointer relative">
                                                                    <div className="text-[16px] font-[600] gray-text leading-4">{Anthony && Anthony.l1 ? Anthony.l1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                        </div>
                                                        <div className={`${posArray[Anthony.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-[500] pt-1`} > {posArray[Anthony.sid] ?? 0.00}</div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="lg:space-y-3 space-y-5">

                                                <div className="page_bg lg:hidden block pt-1.5 divide-y divide-[#c7c8ca] border-[1px] border-[#c7c8ca]">

                                                    {/* <div className="text-left text-[14px] font-[600] px-2 lg:hidden block">
      <span className="font-[500]">MIN</span>:{minStake} <span className="font-[500]">&nbsp; MAX</span>:{maxStake}
    </div> */}

                                                    <div className="w-full text-center">
                                                        <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">

                                                            <div className="h-full capitalize text-gray-800 font-medium py-2 px-2 col-span-2 w-full text-left">
                                                                <p className="text-[14px] font-semibold" >
                                                                    <span>A.</span> {Amar && Amar.nat ? Amar.nat : Amar.nation ? Amar.nation : "Amar"}</p>
                                                                {/* <div className={`${posArray[PlayerA.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[PlayerA.sid]}</div> */}
                                                            </div>

                                                            {Amar.gstatus === "ACTIVE" ?
                                                                <div className=" bg-[var(--matchLagai)] w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Amar, type: "Yes", odds: Amar.b1, nat: Amar.nat ? Amar.nat : Amar.nation, betFor: "aaa" }, section1Ref)}>
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Amar && Amar.b1 ? Amar.b1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className=" bg-[var(--matchLagai)] w-full text-center py-2.5 relative cursor-pointer">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Amar && Amar.b1 ? Amar.b1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                            {Amar.gstatus === "ACTIVE" ?
                                                                <div onClick={() => handleBackOpen({ data: Amar, type: "No", odds: Amar.l1, nat: Amar.nat ? Amar.nat : Amar.nation, betFor: "aaa" }, section1Ref)} className=" bg-[var(--matchKhai)] w-full text-center py-2.5 cursor-pointer relative">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Amar && Amar.l1 ? Amar.l1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className=" bg-[var(--matchKhai)] w-full text-center py-2.5 cursor-pointer relative">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Anthony && Anthony.l1 ? Anthony.l1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>

                                                    <div className="w-full text-center">
                                                        <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">

                                                            <div className="h-full capitalize text-gray-800 font-medium py-2 px-2 col-span-2 w-full text-left">
                                                                <p className="text-[14px] font-semibold">
                                                                    <span>B.</span> {Akbar && Akbar.nat ? Akbar.nat : Akbar.nation ? Akbar.nation : "Akbar"}</p>
                                                                {/* <div className={`${posArray[PlayerA.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[PlayerA.sid]}</div> */}
                                                            </div>

                                                            {Akbar.gstatus === "ACTIVE" ?
                                                                <div className="bg-[var(--matchLagai)] w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Akbar, type: "Yes", odds: Akbar.b1, nat: Akbar.nat ? Akbar.nat : Akbar.nation, betFor: "aaa" }, section1Ref)}>
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Akbar && Akbar.b1 ? Akbar.b1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className="bg-[var(--matchLagai)] w-full text-center py-2.5 relative cursor-pointer">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Akbar && Akbar.b1 ? Akbar.b1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                            {Akbar.gstatus === "ACTIVE" ?
                                                                <div onClick={() => handleBackOpen({ data: Akbar, type: "No", odds: Akbar.l1, nat: Akbar.nat ? Akbar.nat : Akbar.nation, betFor: "aaa" }, section1Ref)} className="bg-[var(--matchKhai)] w-full text-center py-2.5 cursor-pointer relative">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Akbar && Akbar.l1 ? Akbar.l1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className="bg-[var(--matchKhai)] w-full text-center py-2.5 cursor-pointer relative">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Akbar && Akbar.l1 ? Akbar.l1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>

                                                    <div className="w-full text-center">
                                                        <div className="grid grid-cols-4 divide-x divide-[#c7c8ca]">

                                                            <div className="h-full text-[14px] capitalize text-gray-800 font-medium py-2 px-2 col-span-2 w-full text-left">
                                                                <p className="text-[14px] font-semibold">
                                                                    <span>C.</span> {Anthony && Anthony.nat ? Anthony.nat : Anthony.nation ? Anthony.nation : "Anthony"}</p>
                                                                {/* <div className={`${posArray[PlayerA.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[PlayerA.sid]}</div> */}
                                                            </div>

                                                            {Anthony.gstatus === "ACTIVE" ?
                                                                <div className="bg-[var(--matchLagai)] w-full text-center py-2.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: Anthony, type: "Yes", odds: Anthony.b1, nat: Anthony.nat ? Anthony.nat : Anthony.nation, betFor: "aaa" }, section1Ref)}>
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Anthony && Anthony.b1 ? Anthony.b1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className="bg-[var(--matchLagai)] w-full text-center py-2.5 relative cursor-pointer">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Anthony && Anthony.b1 ? Anthony.b1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                            {Anthony.gstatus === "ACTIVE" ?
                                                                <div onClick={() => handleBackOpen({ data: Anthony, type: "No", odds: Anthony.l1, nat: Anthony.nat ? Anthony.nat : Anthony.nation, betFor: "aaa" }, section1Ref)} className="bg-[var(--matchKhai)] w-full text-center py-2.5 cursor-pointer relative">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Anthony && Anthony.l1 ? Anthony.l1 : "0.00"}</div>
                                                                </div>
                                                                :
                                                                <div className="bg-[var(--matchKhai)] w-full text-center py-2.5 cursor-pointer relative">
                                                                    <div className="text-[14px] font-[600] gray-text leading-4">{Anthony && Anthony.l1 ? Anthony.l1 : "0.00"}</div>
                                                                    <BetLocked />
                                                                </div>
                                                            }

                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="grid grid-cols-3 lg:gap-3.5 gap-2 page_bg">

                                                    <div className=" py-2.5 lg:px-2.5 px-1.5 odds-bet space-y-3 border border-gray-300">

                                                        {/* <div className="px-2 relative">
        <div className="lg:text-black text-[#52796f] flex justify-end items-center cursor-pointer " onClick={handleToggleModal2}>
          <FaInfoCircle className="hover:text-[#007bff] " size={16} />
        </div>

        {isModalOpen2 && (
          <div className="modal bg-black/60 absolute z-50 right-4">
            <div className="modal-content">
              <div className="md:w-44 w-24 text-center font-normal lg:text-[15px] text-[12px] py-1.5 text-white px-4 ">
                <span className="font-[500]">MIN</span>:{minStake} <span className="font-[500]">&nbsp; MAX</span>:{maxStake}
              </div>
            </div>
          </div>
        )}
      </div> */}

                                                        <div className="space-y-[2px]">
                                                            <div className="flex justify-center items-center ">
                                                                <p className="lg:text-[16px] text-[14px] font-semibold gray-text ">{Even && Even.b1 ? Even.b1 : "0.00"}</p>
                                                            </div>
                                                            <div className="relative">
                                                                <div className="even-background w-full text-center cursor-pointer py-3 rounded" onClick={() => handleBackOpen({ data: Even, type: "Yes", odds: Even.b1, nat: Even.nat ? Even.nat : Even.nation, betFor: "oddEven" }, section1Ref)}>
                                                                    <div className="lg:text-[16px] text-[14px] font-bold leading-4 text-white capitalize">{Even && Even.nat ? Even.nat : Even.nation ? Even.nation : "Even"}</div>
                                                                </div>
                                                                {Even && Even.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[Even.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-semibold`} > {posArray[Even.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="space-y-[2px]">
                                                            <div className="flex justify-center items-center ">
                                                                <p className="lg:text-[16px] text-[14px] font-semibold gray-text ">{Odd && Odd.b1 ? Odd.b1 : "0.00"}</p>
                                                            </div>
                                                            <div className="relative">
                                                                <div className="even-background w-full text-center cursor-pointer py-3 rounded"
                                                                    onClick={() => handleBackOpen({ data: Odd, type: "Yes", odds: Odd.b1, nat: Odd.nat ? Odd.nat : Odd.nation, betFor: "oddEven" }, section1Ref)}>
                                                                    <div className="lg:text-[16px] text-[14px] font-bold leading-4 text-white capitalize">{Odd && Odd.nat ? Odd.nat : Odd.nation ? Odd.nation : "Odd"}</div>
                                                                </div>
                                                                {Odd && Odd.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[Odd.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-semibold`} > {posArray[Odd.sid] ?? 0.00}</div>
                                                        </div>

                                                    </div>

                                                    <div className=" py-2.5 lg:px-2.5 px-1.5 odds-bet space-y-3 border border-gray-300">

                                                        {/* <div className="px-2 relative">
        <div className="lg:text-black text-[#52796f] flex justify-end items-center cursor-pointer " onClick={handleToggleModal3}>
          <FaInfoCircle className="hover:text-[#007bff]" size={16} />
        </div>

        {isModalOpen3 && (
          <div className="modal bg-black/60 absolute z-50 right-4">
            <div className="modal-content">
              <div className="md:w-44 w-24 text-center font-normal lg:text-[15px] text-[12px] py-1.5 text-white px-4 ">
                <span className="font-[500]">MIN</span>:{minStake} <span className="font-[500]">&nbsp; MAX</span>:{maxStake}
              </div>
            </div>
          </div>
        )}
      </div> */}

                                                        <div className="space-y-[2px]">
                                                            <div className="flex justify-center items-center ">
                                                                <p className="lg:text-[16px] text-[14px] font-semibold gray-text ">{Red && Red.b1 ? Red.b1 : "0.00"}</p>
                                                            </div>
                                                            <div className="relative">
                                                                <div className=" even-background py-3 rounded flex justify-center items-center cursor-pointer space-x-0.5"
                                                                    onClick={() => handleBackOpen({ data: Red, type: "Yes", odds: Red.b1, nat: Red.nat ? Red.nat : Red.nation, betFor: "color" }, section1Ref)}>
                                                                    <span className="text-[#FE0000]">
                                                                        <AiFillHeart size={18} />
                                                                    </span>
                                                                    <span className="text-[#FE0000]">
                                                                        <ImDiamonds size={18} />
                                                                    </span>
                                                                </div>
                                                                {Red && Red.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[Red.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-semibold`} > {posArray[Red.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="space-y-[2px]">
                                                            <div className="flex justify-center items-center ">
                                                                <p className="lg:text-[16px] text-[14px] font-semibold gray-text ">{Black && Black.b1 ? Black.b1 : "0.00"}</p>
                                                            </div>
                                                            <div className="relative">
                                                                <div className=" even-background py-3 rounded flex justify-center items-center cursor-pointer space-x-0.5"
                                                                    onClick={() => handleBackOpen({ data: Black, type: "Yes", odds: Black.b1, nat: Black.nat ? Black.nat : Black.nation, betFor: "color" }, section1Ref)}>
                                                                    <span className="text-[#000000]">
                                                                        <BsSuitSpadeFill size={18} />
                                                                    </span>
                                                                    <span className="text-[#000000]">
                                                                        <BsSuitClubFill size={18} />
                                                                    </span>
                                                                </div>
                                                                {Black && Black.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[Black.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-semibold`} > {posArray[Black.sid] ?? 0.00}</div>
                                                        </div>

                                                    </div>

                                                    <div className=" py-2.5 lg:px-2.5 px-1.5 odds-bet space-y-3 border border-gray-300">

                                                        {/* <div className="px-2 relative">
        <div className="lg:text-black text-[#52796f] flex justify-end items-center cursor-pointer " onClick={handleToggleModal4}>
          <FaInfoCircle className="hover:text-[#007bff] " size={16} />
        </div>

        {isModalOpen4 && (
          <div className="modal bg-black/60 absolute z-50 right-4">
            <div className="modal-content">
              <div className="md:w-44 w-24 text-center font-normal lg:text-[15px] text-[12px] py-1.5 text-white px-4 ">
                <span className="font-[500]">MIN</span>:{minStake} <span className="font-[500]">&nbsp; MAX</span>:{maxStake}
              </div>
            </div>
          </div>
        )}
      </div> */}

                                                        <div className="space-y-[2px]">
                                                            <div className="flex justify-center items-center ">
                                                                <p className="lg:text-[16px] text-[14px]  font-semibold gray-text ">{Under7 && Under7.b1 ? Under7.b1 : "0.00"}</p>
                                                            </div>
                                                            <div className="relative">
                                                                <div className=" even-background py-3 rounded flex justify-center items-center cursor-pointer space-x-0.5"
                                                                    onClick={() => handleBackOpen({ data: Under7, type: "Yes", odds: Under7.b1, nat: Under7.nat ? Under7.nat : Under7.nation, betFor: "color" }, section1Ref)}>
                                                                    <div className="lg:text-[16px] text-[14px] font-bold leading-4 text-white capitalize">{Under7 && Under7.nat ? Under7.nat : Under7.nation ? Under7.nation : "Under 7"}</div>
                                                                </div>
                                                                {Under7 && Under7.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[Under7.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-semibold`} > {posArray[Under7.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="space-y-[2px]">
                                                            <div className="flex justify-center items-center ">
                                                                <p className="lg:text-[16px] text-[14px] font-semibold gray-text ">{Over7 && Over7.b1 ? Over7.b1 : "0.00"}</p>
                                                            </div>
                                                            <div className="relative">
                                                                <div className=" even-background py-3 rounded flex justify-center items-center cursor-pointer space-x-0.5"
                                                                    onClick={() => handleBackOpen({ data: Over7, type: "Yes", odds: Over7.b1, nat: Over7.nat ? Over7.nat : Over7.nation, betFor: "color" }, section1Ref)}>
                                                                    <div className="lg:text-[16px] text-[14px] font-bold leading-4 text-white capitalize">{Over7 && Over7.nat ? Over7.nat : Over7.nation ? Over7.nation : "Over 7"}</div>
                                                                </div>
                                                                {Over7 && Over7.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[Over7.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-semibold`} > {posArray[Over7.sid] ?? 0.00}</div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="p-2 odds-bet mt-2">

                                                {/* <div className="px-2 relative lg:block hidden">
    <div className="text-black flex justify-end items-center cursor-pointer " onClick={handleToggleModal5}>
      <FaInfoCircle className="hover:text-[#007bff] " size={18} />
    </div>

    {isModalOpen5 && (
      <div className="modal bg-black/60 xl:w-[15%] lg:w-[30%] absolute z-50 right-4">
        <div className="modal-content">
          <div className="flex justify-center items-center font-normal lg:text-[15px] text-[14px] py-1.5 text-white px-4 whitespace-nowrap">
            <span className="font-[500]">MIN</span>:{minStake} <span className="font-[500]">&nbsp; MAX</span>:{maxStake}
          </div>
        </div>
      </div>
    )}
  </div> */}

                                                {/* <div className="lg:hidden flex justify-end items-center font-normal text-[12px] py-1.5 black-text px-2 whitespace-nowrap">
    <span className="font-[500]">MIN</span>:{minStake} <span className="font-[500]">&nbsp; MAX</span>:{maxStake}
  </div> */}

                                                <p className="flex justify-center items-center gray-text text-[16px] py-2 font-bold">12</p>
                                                <div className="w-11/12 py-1 mx-auto grid grid-cols-7 lg:flex justify-center items-center md:space-x-1 space-x-0 gap-2.5 text-center ">
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: CardA, type: "Yes", odds: CardA.b1, nat: CardA.nat ? CardA.nat : CardA.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/1.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {CardA.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[CardA.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[CardA.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center"
                                                                onClick={() => handleBackOpen({ data: Card2, type: "Yes", odds: Card2.b1, nat: Card2.nat ? Card2.nat : Card2.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/2.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card2.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card2.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card2.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: Card3, type: "Yes", odds: Card3.b1, nat: Card3.nat ? Card3.nat : Card3.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/3.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card3.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card3.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card3.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: Card4, type: "Yes", odds: Card4.b1, nat: Card4.nat ? Card4.nat : Card4.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/3.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card4.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card4.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card4.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: Card5, type: "Yes", odds: Card5.b1, nat: Card5.nat ? Card5.nat : Card5.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/5.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card5.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card5.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card5.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: Card6, type: "Yes", odds: Card6.b1, nat: Card6.nat ? Card6.nat : Card6.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/6.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card6.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card6.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card6.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: Card7, type: "Yes", odds: Card7.b1, nat: Card7.nat ? Card7.nat : Card7.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/7.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card7.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card7.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card7.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: Card8, type: "Yes", odds: Card8.b1, nat: Card8.nat ? Card8.nat : Card8.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/8.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card8.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card8.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card8.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: Card9, type: "Yes", odds: Card9.b1, nat: Card9.nat ? Card9.nat : Card9.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/9.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card9.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card9.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card9.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: Card10, type: "Yes", odds: Card10.b1, nat: Card10.nat ? Card10.nat : Card10.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/10.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {Card10.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[Card10.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[Card10.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: CardJ, type: "Yes", odds: CardJ.b1, nat: CardJ.nat ? CardJ.nat : CardJ.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/11.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {CardJ.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[CardJ.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[CardJ.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: CardQ, type: "Yes", odds: CardQ.b1, nat: CardQ.nat ? CardQ.nat : CardQ.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/12.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {CardQ.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[CardQ.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[CardQ.sid] ?? 0.00}</p>
                                                    </span>
                                                    <span className="">
                                                        <div className="relative">
                                                            <div className="justify-center flex-col flex items-center" onClick={() => handleBackOpen(
                                                                { data: CardK, type: "Yes", odds: CardK.b1, nat: CardK.nat ? CardK.nat : CardK.nation, betFor: "cards" }, section1Ref)}>
                                                                <img src="/images/13.jpg" alt="" className="w-10 h-12" />
                                                            </div>
                                                            {CardK.gstatus === "ACTIVE" ? null : <BetLocked />}
                                                        </div>
                                                        <p className={`${posArray[CardK.sid] < 0 ? "text-red-500" : "text-green-800"} font-semibold`} > {posArray[CardK.sid] ?? 0.00}</p>
                                                    </span>
                                                </div>
                                            </div>

                                        </div>


                                        <div className=" pb-20 bg-black/5 mt-0.5">
                                            <RoundedTabBmx />
                                            <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                                                {result && result.length > 0 ? result.map((element, index) => (
                                                    <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                                                        <p className={`${element && element.result && element.result === "1" ? "text-[#F75500]" : element && element.result && element.result === "2" ? "text-[#FFF523]" : "text-[#33c6ff]"} font-[700] text-[14px]`}>{element && element.result && element.result === "1" ? "A" : element && element.result && element.result === "2" ? "B" : element && element.result && element.result === "3" ? "C" : "-"}</p>
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


export default AmarAkbarAnthony
