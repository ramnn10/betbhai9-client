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

function TeenpattiTest({ eventId }) {
    const {
        casinoData,
        showLoader,
        tvUrl,
        name,
        betList,
        posArray,
        shortName,
        oddsDifference,
        betListHandler
    } = useCasinoData(eventId)

    const section1Ref = useRef(null);
    const scrollTimeout = useRef(null);
    const dispatch = useDispatch()

    const [buttonValue, setbuttonValue] = useState(false);

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
            "sid": state.betSlipData.sid,
            "rate": state.count + "",
            "amount": Number(state.betSlipData.stake),
            "casinoType": state.shortName ? state.shortName : "teen9",
            "eventId": 3031,
            "betFor": state.betSlipData.betFor + "",
            "nat": state.betSlipData.nat + "",
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
    let Winner = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let Pair = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let Flush = data && data.t2 && data.t2[2] ? data.t2[2] : {};
    let Straight = data && data.t2 && data.t2[3] ? data.t2[3] : {};
    let Trio = data && data.t2 && data.t2[4] ? data.t2[4] : {};
    let StraightFlush = data && data.t2 && data.t2[5] ? data.t2[5] : {};


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
                                                    <div className="w-full p-1">
                                                        <div className="text-white text-[11px] font-semibold">TIGER</div>
                                                        <div className="flex space-x-1 justify-start">
                                                            <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                            <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                            <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                        </div>
                                                        <div className="text-white text-[11px] font-semibold">LION</div>
                                                        <div className="flex space-x-1 justify-start">
                                                            <img src={`/cards/${t1 && t1.C4 ? t1.C4 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                            <img src={`/cards/${t1 && t1.C5 ? t1.C5 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                            <img src={`/cards/${t1 && t1.C6 ? t1.C6 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                        </div>
                                                        <div className="text-white text-[11px] font-semibold">DRAGON</div>
                                                        <div className="flex space-x-1 justify-start">
                                                            <img src={`/cards/${t1 && t1.C7 ? t1.C7 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                            <img src={`/cards/${t1 && t1.C8 ? t1.C8 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                            <img src={`/cards/${t1 && t1.C9 ? t1.C9 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6 border-[1px] border-yellow-300" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.autotime} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-gray-300 white-text divide-y divide-[#c7c8ca] mt-1">

                                            {/* <div className="grid lg:grid-cols-7 grid-cols-6 text-center divide-x divide-[#c7c8ca]  font-semibold text-[12px] gray-text">
  <div className="lg:col-span-4 col-span-2 w-full flex justify-center items-center py-[2px]"></div>
  <div className="lg:col-span-3 col-span-4 w-full flex justify-center items-center py-[2px] betdetail-header">Back</div>
</div> */}

                                            <div className="grid grid-cols-5 text-center divide-x divide-[#c7c8ca]  gray-text font-semibold lg:text-[16px] text-[14px]">
                                                <div className="col-span-2 w-full flex justify-center items-center py-[3px]"></div>
                                                <div className="grid grid-cols-3 col-span-3 divide-x divide-[#c7c8ca]" >
                                                    <div className="w-full flex justify-center items-center py-[3px] bg-[var(--matchLagai)]">Tiger</div>
                                                    <div className="w-full flex justify-center items-center py-[3px] bg-[var(--matchLagai)]">Lion</div>
                                                    <div className="w-full flex justify-center items-center py-[3px] bg-[var(--matchLagai)]">Dragon</div>
                                                </div>
                                            </div>


                                            <div className="w-full text-center colour_back_odds ">
                                                <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]" >
                                                    <div className="col-span-2 h-full lg:text-[16px] text-[14px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-between items-center">
                                                        <div>{Winner && Winner.nat ? Winner.nat : Winner.nation ? Winner.nation : "Winner "}</div>
                                                        {/* <div className={`${posArray[Winner.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Winner.sid]}</div> */}
                                                    </div>
                                                    <div className="grid grid-cols-3 col-span-3 divide-x divide-[#c7c8ca]" >
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Winner && Winner.tstatus == "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Winner, type: "Yes", odds: Winner.trate - oddsDifference, nat: Winner.nat ? Winner.nat : Winner.nation, sid: Winner.tsection, betFor: "tiger" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Winner && Winner.trate ? (Winner.trate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Winner && Winner.trate ? (Winner.trate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Winner && Winner.lstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Winner, type: "Yes", odds: Winner.lrate - oddsDifference, nat: Winner.nat ? Winner.nat : Winner.nation, sid: Winner.lsection, betFor: "lion" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Winner && Winner.lrate ? (Winner.lrate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Winner && Winner.lrate ? (Winner.lrate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Winner && Winner.dstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Winner, type: "Yes", odds: Winner.drate - oddsDifference, nat: Winner.nat ? Winner.nat : Winner.nation, sid: Winner.dsectionid, betFor: "dragon" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Winner && Winner.drate ? (Winner.drate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Winner && Winner.drate ? (Winner.drate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full text-center colour_back_odds ">
                                                <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]" >
                                                    <div className="col-span-2 h-full lg:text-[16px] text-[14px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-between items-center">
                                                        <div>{Pair && Pair.nat ? Pair.nat : Pair.nation ? Pair.nation : "Pair "}</div>
                                                        {/* <div className={`${posArray[Pair.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Pair.sid]}</div> */}
                                                    </div>
                                                    <div className="grid grid-cols-3 col-span-3 divide-x divide-[#c7c8ca]" >
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Pair && Pair.tstatus == "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Pair, type: "Yes", odds: Pair.trate - oddsDifference, nat: Pair.nat ? Pair.nat : Pair.nation, sid: Pair.tsection, betFor: "tiger" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Pair && Pair.trate ? (Pair.trate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Pair && Pair.trate ? (Pair.trate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Pair && Pair.lstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Pair, type: "Yes", odds: Pair.lrate - oddsDifference, nat: Pair.nat ? Pair.nat : Pair.nation, sid: Pair.lsection, betFor: "lion" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Pair && Pair.lrate ? (Pair.lrate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Pair && Pair.lrate ? (Pair.lrate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Pair && Pair.dstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Pair, type: "Yes", odds: Pair.drate - oddsDifference, nat: Pair.nat ? Pair.nat : Pair.nation, sid: Pair.dsectionid, betFor: "dragon" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Pair && Pair.drate ? (Pair.drate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Pair && Pair.drate ? (Pair.drate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full text-center colour_back_odds ">
                                                <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]" >
                                                    <div className="col-span-2 h-full lg:text-[16px] text-[14px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-between items-center">
                                                        <div>{Flush && Flush.nat ? Flush.nat : Flush.nation ? Flush.nation : "Flush "}</div>
                                                        {/* <div className={`${posArray[Flush.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Flush.sid]}</div> */}
                                                    </div>
                                                    <div className="grid grid-cols-3 col-span-3 divide-x divide-[#c7c8ca]" >
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Flush && Flush.tstatus == "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Flush, type: "Yes", odds: Flush.trate - oddsDifference, nat: Flush.nat ? Flush.nat : Flush.nation, sid: Flush.tsection, betFor: "tiger", betFor: "lion" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Flush && Flush.trate ? (Flush.trate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Flush && Flush.trate ? (Flush.trate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Flush && Flush.lstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Flush, type: "Yes", odds: Flush.lrate - oddsDifference, nat: Flush.nat ? Flush.nat : Flush.nation, sid: Flush.lsection, betFor: "lion" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Flush && Flush.lrate ? (Flush.lrate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Flush && Flush.lrate ? (Flush.lrate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Flush && Flush.dstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Flush, type: "Yes", odds: Flush.drate - oddsDifference, nat: Flush.nat ? Flush.nat : Flush.nation, sid: Flush.dsectionid, betFor: "dragon" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Flush && Flush.drate ? (Flush.drate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Flush && Flush.drate ? (Flush.drate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full text-center colour_back_odds ">
                                                <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]" >
                                                    <div className="col-span-2 h-full lg:text-[16px] text-[14px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-between items-center">
                                                        <div>{Straight && Straight.nat ? Straight.nat : Straight.nation ? Straight.nation : "Straight "}</div>
                                                        {/* <div className={`${posArray[Straight.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Straight.sid]}</div> */}
                                                    </div>
                                                    <div className="grid grid-cols-3 col-span-3 divide-x divide-[#c7c8ca]" >
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Straight && Straight.tstatus == "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Straight, type: "Yes", odds: Straight.trate - oddsDifference, nat: Straight.nat ? Straight.nat : Straight.nation, sid: Straight.tsection, betFor: "tiger" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Straight && Straight.trate ? (Straight.trate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Straight && Straight.trate ? (Straight.trate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Straight && Straight.lstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Straight, type: "Yes", odds: Straight.lrate - oddsDifference, nat: Straight.nat ? Straight.nat : Straight.nation, sid: Straight.lsection, betFor: "lion" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Straight && Straight.lrate ? (Straight.lrate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Straight && Straight.lrate ? (Straight.lrate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Straight && Straight.dstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Straight, type: "Yes", odds: Straight.drate - oddsDifference, nat: Straight.nat ? Straight.nat : Straight.nation, sid: Straight.dsectionid, betFor: "dragon" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Straight && Straight.drate ? (Straight.drate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Straight && Straight.drate ? (Straight.drate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full text-center colour_back_odds ">
                                                <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]" >
                                                    <div className="col-span-2 h-full lg:text-[16px] text-[14px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-between items-center">
                                                        <div>{Trio && Trio.nat ? Trio.nat : Trio.nation ? Trio.nation : "Trio "}</div>
                                                        {/* <div className={`${posArray[Trio.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Trio.sid]}</div> */}
                                                    </div>
                                                    <div className="grid grid-cols-3 col-span-3 divide-x divide-[#c7c8ca]" >
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Trio && Trio.tstatus == "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Trio, type: "Yes", odds: Trio.trate - oddsDifference, nat: Trio.nat ? Trio.nat : Trio.nation, sid: Trio.tsection, betFor: "tiger" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Trio && Trio.trate ? (Trio.trate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Trio && Trio.trate ? (Trio.trate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Trio && Trio.lstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Trio, type: "Yes", odds: Trio.lrate - oddsDifference, nat: Trio.nat ? Trio.nat : Trio.nation, sid: Trio.lsection, betFor: "lion" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Trio && Trio.lrate ? (Trio.lrate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Trio && Trio.lrate ? (Trio.lrate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {Trio && Trio.dstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: Trio, type: "Yes", odds: Trio.drate - oddsDifference, nat: Trio.nat ? Trio.nat : Trio.nation, sid: Trio.dsectionid, betFor: "dragon" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{Trio && Trio.drate ? (Trio.drate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{Trio && Trio.drate ? (Trio.drate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full text-center colour_back_odds ">
                                                <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]" >
                                                    <div className="col-span-2 h-full lg:text-[16px] text-[14px] white-bg capitalize text-gray-800 font-semibold py-2.5 px-2 w-full flex justify-between items-center">
                                                        <div>{StraightFlush && StraightFlush.nat ? StraightFlush.nat : StraightFlush.nation ? StraightFlush.nation : "StraightFlush "}</div>
                                                        {/* <div className={`${posArray[StraightFlush.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[StraightFlush.sid]}</div> */}
                                                    </div>
                                                    <div className="grid grid-cols-3 col-span-3 divide-x divide-[#c7c8ca]" >
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {StraightFlush && StraightFlush.tstatus == "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: StraightFlush, type: "Yes", odds: StraightFlush.trate - oddsDifference, nat: StraightFlush.nat ? StraightFlush.nat : StraightFlush.nation, sid: StraightFlush.tsection, betFor: "tiger" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{StraightFlush && StraightFlush.trate ? (StraightFlush.trate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{StraightFlush && StraightFlush.trate ? (StraightFlush.trate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {StraightFlush && StraightFlush.lstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: StraightFlush, type: "Yes", odds: StraightFlush.lrate - oddsDifference, nat: StraightFlush.nat ? StraightFlush.nat : StraightFlush.nation, sid: StraightFlush.lsection, betFor: "lion" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{StraightFlush && StraightFlush.lrate ? (StraightFlush.lrate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{StraightFlush && StraightFlush.lrate ? (StraightFlush.lrate - oddsDifference) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>
                                                        <div className="flex justify-end items-center divide-x divide-[#c7c8ca]  w-full">
                                                            {StraightFlush && StraightFlush.dstatus === "True" ?
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " onClick={() => handleBackOpen({ data: StraightFlush, type: "Yes", odds: StraightFlush.drate - oddsDifference, nat: StraightFlush.nat ? StraightFlush.nat : StraightFlush.nation, sid: StraightFlush.dsectionid, betFor: "dragon" }, section1Ref)}>
                                                                    <div className=" text-center py-2.5" >
                                                                        <span className="text-[14px] font-[600] gray-text">{StraightFlush && StraightFlush.drate ? (StraightFlush.drate - oddsDifference) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer " >
                                                                    <div className=" text-center py-2.5 relative">
                                                                        <span className="text-[14px] font-[600] gray-text">{StraightFlush && StraightFlush.drate ? (StraightFlush.drate - oddsDifference) : "-"}</span><br />
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
                                                        <p className={`font-[700] text-[13px] ${element?.result === "31" ? "text-[#33c6ff]" : element?.result === "11" ? "text-[#F75500] " : element?.result === "21" ? "text-[#FFF523] " : "text-white"}`}>
                                                            {element && element.result === '11' ? "T" : element && element.result === '21' ? "L" : element && element.result === '31' ? "D" : "-"}
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


export default TeenpattiTest
