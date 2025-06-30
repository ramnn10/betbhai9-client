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
import Teenpattiondayrules from '../../component/casinoComponent/images/ab2-rules.webp';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import GameCard from "../../component/casinoComponent/GameCard";
import Card from "../../component/casinoComponent/Card";
import { BsFillSuitHeartFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";

function Anadarbahar_2({ eventId }) {
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
        betForSet(data?.nat)
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
    const betForSet = (nat) => {
        let value = nat;
        let betFor = "";
      
        if (["SA", "1st Bet", "2nd Bet", "SB"].includes(value)) {
          betFor = "andarBahar";
        } else if (["Joker A", "Joker 2", "Joker 3", "Joker 4", "Joker 5", "Joker 6", "Joker 7", "Joker 8", "Joker 9", "Joker 10", "Joker J", "Joker Q", "Joker K"].includes(value)) {
          betFor = "cards";
        } else if (["Joker Diamond", "Joker Heart", "Joker Club", "Joker Spade"].includes(value)) {
          betFor = "color";
        } else if (["Joker Odd", "Joker Even"].includes(value)) {
          betFor = "oddEven";
        }
      
        if (betFor) {
          setState(state => ({ ...state, betFor }));
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
            "casinoType": state.shortName ? state.shortName : "dt20",
            "betFor": state.betFor + "",
            "nat": state.betSlipData.nat,
            "eventId": eventId,
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
    // let t2 = data && data.t2 ? data.t2 : {};
    let image = t1 && t1.cards ? t1.cards.split(',') : [];
    let SA = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let SAFBet = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let SASBet = data && data.t2 && data.t2[2] ? data.t2[2] : {};
    let SB = data && data.t2 && data.t2[3] ? data.t2[3] : {};
    let SBFBet = data && data.t2 && data.t2[4] ? data.t2[4] : {};
    let SBSBet = data && data.t2 && data.t2[5] ? data.t2[5] : {};
    let CardA = data && data.t2 && data.t2[6] ? data.t2[6] : {};
    let Card2 = data && data.t2 && data.t2[7] ? data.t2[7] : {};
    let Card3 = data && data.t2 && data.t2[8] ? data.t2[8] : {};
    let Card4 = data && data.t2 && data.t2[9] ? data.t2[9] : {};
    let Card5 = data && data.t2 && data.t2[10] ? data.t2[10] : {};
    let Card6 = data && data.t2 && data.t2[11] ? data.t2[11] : {};
    let Card7 = data && data.t2 && data.t2[12] ? data.t2[12] : {};
    let Card8 = data && data.t2 && data.t2[13] ? data.t2[13] : {};
    let Card9 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
    let Card10 = data && data.t2 && data.t2[15] ? data.t2[15] : {};
    let CardJ = data && data.t2 && data.t2[16] ? data.t2[16] : {};
    let CardQ = data && data.t2 && data.t2[17] ? data.t2[17] : {};
    let CardK = data && data.t2 && data.t2[18] ? data.t2[18] : {};
    let Spade = data && data.t2 && data.t2[19] ? data.t2[19] : {};
    let Club = data && data.t2 && data.t2[20] ? data.t2[20] : {};
    let Heart = data && data.t2 && data.t2[21] ? data.t2[21] : {};
    let Diamond = data && data.t2 && data.t2[22] ? data.t2[22] : {};
    let Odd = data && data.t2 && data.t2[23] ? data.t2[23] : {};
    let Even = data && data.t2 && data.t2[24] ? data.t2[24] : {};


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
                                                    <div className="h-full p-2 flex justify-between space-x-2">

                                                        <div className="flex justify-between items-center space-x-2 ">
                                                            <div className="text-white font-medium uppercase text-xs space-y-4">
                                                                <p>Andar</p>
                                                                <p>Bahar</p>
                                                            </div>
                                                            <div className="flex justify-center items-center">
                                                                <img src={`/cards/${t1 && t1.C1 ? t1.C1 : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />
                                                            </div>
                                                            <div className="space-y-2 lg:pl-2 pl-1">
                                                                <img src={`/cards/${image && image[2] ? image[0] : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />
                                                                <img src={`/cards/${image && image[1] ? image[1] : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-center space-x-1">
                                                            <div className="space-y-2">
                                                                {image[4] === "1" ? null :
                                                                    <img src={`/cards/${image && image[4] ? image[4] : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />}
                                                                {image[3] === "1" ? null :
                                                                    <img src={`/cards/${image && image[3] ? image[3] : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />}
                                                            </div>
                                                            <div className="space-y-2">
                                                                {image[6] === "1" ? null :
                                                                    <img src={`/cards/${image && image[6] ? image[6] : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />}
                                                                {image[5] === "1" ? null :
                                                                    <img src={`/cards/${image && image[5] ? image[5] : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />}
                                                            </div>
                                                            <div className="space-y-2">
                                                                {image[8] === "1" ? null :
                                                                    <img src={`/cards/${image && image[8] ? image[8] : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />}
                                                                {image[7] === "1" ? null :
                                                                    <img src={`/cards/${image && image[7] ? image[7] : "1"}.png`} alt="card" className="lg:h-9 h-7 lg:w-7 w-5" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.autotime} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="page-bg space-y-1.5">

                                            <div className=" odds-bet">
                                                <div className="grid lg:grid-cols-2 grid-cols-1 text-center py-2 w-full border border-gray-300">

                                                    <div className="grid grid-cols-8 gap-4">
                                                        <div className="py-4">
                                                            <p className="text-md font-bold">A</p>
                                                        </div>

                                                        <div className="w-full col-span-2">
                                                            <div className="relative border-[2px] border-[#FFFF00]">
                                                                <div onClick={() => handleBackOpen({ data: SA, type: "Yes", odds: SA.b1, nat: SA.nat ? SA.nat : SA.nation, sid: SA.sid }, section1Ref)}
                                                                    className="black-text font-bold text-[13px] py-1 cursor-pointer border-[2px] border-[#FFFF00]">
                                                                    <p>{SA && SA.nat ? SA.nat : "2nd Bet"}</p>
                                                                    <p>{SA && SA.b1 ? SA.b1 : "2.00"}</p>
                                                                </div>
                                                                {SA && SA.gstatus === "1" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[SA.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SA.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="w-full col-span-2">
                                                            <div className="relative border-[2px] border-[#FFFF00]">
                                                                <div onClick={() => handleBackOpen({ data: SAFBet, type: "Yes", odds: SAFBet.b1, nat: SAFBet.nat ? SAFBet.nat : SAFBet.nation, sid: SAFBet.sid }, section1Ref)}
                                                                    className="blue-bg white-text font-bold text-[13px] py-1  cursor-pointer border-[2px] border-[#FFFF00]">
                                                                    <p>{SAFBet && SAFBet.nat ? SAFBet.nat : "2nd Bet"}</p>
                                                                    <p>{SAFBet && SAFBet.b1 ? SAFBet.b1 : "2.00"}</p>
                                                                </div>
                                                                {SAFBet && SAFBet.gstatus === "1" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[SAFBet.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SAFBet.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="w-full col-span-2">
                                                            <div className="relative border-[2px] border-[#FFFF00]">
                                                                <div onClick={() => handleBackOpen({ data: SASBet, type: "Yes", odds: SASBet.b1, nat: SASBet.nat ? SASBet.nat : SASBet.nation, sid: SASBet.sid }, section1Ref)}
                                                                    className="blue-bg white-text font-bold text-[13px] py-1  cursor-pointer border-[2px] border-[#FFFF00]">
                                                                    <p>{SASBet && SASBet.nat ? SASBet.nat : "2nd Bet"}</p>
                                                                    <p>{SASBet && SASBet.b1 ? SASBet.b1 : "2.00"}</p>
                                                                </div>
                                                                {SASBet && SASBet.gstatus === "1" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[SASBet.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SASBet.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="py-4">
                                                            <p className="text-md font-bold">A</p>
                                                        </div>

                                                    </div>

                                                    <div className="grid grid-cols-8 gap-4">
                                                        <div className="py-4">
                                                            <p className="text-md font-bold">B</p>
                                                        </div>

                                                        <div className="w-full col-span-2">
                                                            <div className="relative border-[2px] border-[#FFFF00]">
                                                                <div onClick={() => handleBackOpen({ data: SB, type: "Yes", odds: SB.b1, nat: SB.nat ? SB.nat : SB.nation, sid: SB.sid }, section1Ref)}
                                                                    className="black-text font-bold text-sm py-1  cursor-pointer border-[2px] border-[#FFFF00] ">
                                                                    <p>{SB && SB.nat ? SB.nat : "1st Bet"}</p>
                                                                    <p>{SB && SB.b1 ? SB.b1 : "2.00"}</p>
                                                                </div>
                                                                {SB && SB.gstatus === "1" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[SB.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SB.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="w-full col-span-2">
                                                            <div className="relative border-[2px] border-[#FFFF00]">
                                                                <div onClick={() => handleBackOpen({ data: SBFBet, type: "Yes", odds: SBFBet.b1, nat: SBFBet.nat ? SBFBet.nat : SBFBet.nation, sid: SBFBet.sid }, section1Ref)}
                                                                    className="blue-bg white-text font-bold text-sm py-1  cursor-pointer  border-[2px] border-[#FFFF00]">
                                                                    <p>{SBFBet && SBFBet.nat ? SBFBet.nat : "1st Bet"}</p>
                                                                    <p>{SBFBet && SBFBet.b1 ? SBFBet.b1 : "2.00"}</p>
                                                                </div>
                                                                {SBFBet && SBFBet.gstatus === "1" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[SBFBet.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SBFBet.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="w-full col-span-2">
                                                            <div className="relative border-[2px] border-[#FFFF00]">
                                                                <div onClick={() => handleBackOpen({ data: SBSBet, type: "Yes", odds: SBSBet.b1, nat: SBSBet.nat ? SBSBet.nat : SBSBet.nation, sid: SBSBet.sid }, section1Ref)}
                                                                    className="blue-bg white-text font-bold text-sm py-1  cursor-pointer border-[2px] border-[#FFFF00] ">
                                                                    <p>{SBSBet && SBSBet.nat ? SBSBet.nat : "1st Bet"}</p>
                                                                    <p>{SBSBet && SBSBet.b1 ? SBSBet.b1 : "2.00"}</p>
                                                                </div>
                                                                {SBSBet && SBSBet.gstatus === "1" ? null : <BetLocked />}
                                                            </div>
                                                            <div className={`${posArray[SBSBet.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[SBSBet.sid] ?? 0.00}</div>
                                                        </div>

                                                        <div className="py-4">
                                                            <p className="text-md font-bold">B</p>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-4 lg:space-y-0 space-y-2 space-x-0 text-center py-2 w-full">

                                                <div className="odds-bet grid grid-cols-2 lg:gap-4 gap-2 w-full py-2 lg:px-4 px-2 border border-gray-300">

                                                    <div className="w-full">
                                                        <p className="text-[16px] darktext font-[600]">{Odd && Odd.nat ? Odd.nat : Odd.nation ? Odd.nation : "ODD"}</p>

                                                        <div className="relative">
                                                            <div onClick={() => handleBackOpen({ data: Odd, type: "Yes", odds: Odd.b1, nat: Odd.nat ? Odd.nat : Odd.nation, sid: Odd.sid }, section1Ref)}
                                                                className="light-blue black-text font-bold text-[13px] py-3  cursor-pointer uppercase ">

                                                                <p className="text-[14px] font-[600]">{Odd && Odd.b1 ? Odd.b1 : "2.00"}</p>
                                                            </div>
                                                            {Odd && Odd.gstatus === "1" ? null : <BetLocked />}
                                                        </div>
                                                        <div className={`${posArray[Odd.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Odd.sid] ?? 0.00}</div>
                                                    </div>

                                                    <div className="w-full">
                                                        <p className="text-[16px] darktext font-[600]">{Even && Even.nat ? Even.nat : Even.nation ? Even.nation : "Even"}</p>
                                                        <div className="relative">
                                                            <div onClick={() => handleBackOpen({ data: Even, type: "Yes", odds: Even.b1, nat: Even.nat ? Even.nat : Even.nation, sid: Even.sid }, section1Ref)}
                                                                className="light-blue black-text font-bold text-[13px] py-3  cursor-pointer uppercase ">
                                                                <p className="text-[14px] font-[600]">{Even && Even.b1 ? Even.b1 : "2.00"}</p>
                                                            </div>
                                                            {Even && Even.gstatus === "1" ? null : <BetLocked />}
                                                        </div>
                                                        <div className={`${posArray[Odd.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Odd.sid] ?? 0.00}</div>
                                                    </div>

                                                </div>


                                                <div className="px-2 odds-bet flex justify-between items-center border border-gray-300 lg:gap-4 gap-2 py-2">
                                                    <div className="w-full space-y-1">
                                                        <div className="flex justify-center items-center">
                                                            <p className="text-black"> <BsSuitSpadeFill size={17} /></p>
                                                        </div>
                                                        <div className="relative">
                                                            <div onClick={() => handleBackOpen({ data: Spade, type: "Yes", odds: Spade.b1, nat: Spade.nat ? Spade.nat : Spade.nation, sid: Spade.sid }, section1Ref)}
                                                                className="light-blue font-bold text-sm py-3  cursor-pointer uppercase flex justify-center items-center">
                                                                <p className="text-[14px] font-[600]">{Spade && Spade.b1 ? Spade.b1 : "2.00"}</p>
                                                            </div>
                                                            {Spade && Spade.gstatus === "1" ? null : <BetLocked />}
                                                        </div>
                                                        <div className={`${posArray[Spade.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Spade.sid] ?? 0.00}</div>
                                                    </div>

                                                    <div className="w-full space-y-1">
                                                        <div className="flex justify-center items-center">
                                                            <p className="text-black"> <BsSuitClubFill size={17} /></p>
                                                        </div>
                                                        <div className="relative">
                                                            <div onClick={() => handleBackOpen({ data: Club, type: "Yes", odds: Club.b1, nat: Club.nat ? Club.nat : Club.nation, sid: Club.sid }, section1Ref)}
                                                                className="light-blue font-bold text-sm py-3  cursor-pointer uppercase flex justify-center items-center ">

                                                                <p className="text-[14px] font-[600]">{Club && Club.b1 ? Club.b1 : "2.00"}</p>

                                                            </div>
                                                            {Club && Club.gstatus === "1" ? null : <BetLocked />}
                                                        </div>
                                                        <div className={`${posArray[Club.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Club.sid] ?? 0.00}</div>
                                                    </div>

                                                    <div className="w-full space-y-1">
                                                        <div className="flex justify-center items-center">
                                                            <p className="text-red-color"> <BsFillSuitHeartFill size={17} /></p>
                                                        </div>
                                                        <div className="relative">
                                                            <div onClick={() => handleBackOpen({ data: Heart, type: "Yes", odds: Heart.b1, nat: Heart.nat ? Heart.nat : Heart.nation, sid: Heart.sid }, section1Ref)}
                                                                className="light-blue font-bold text-sm py-3  cursor-pointer uppercase flex justify-center items-center ">
                                                                <p className="text-[14px] font-[600]">{Heart && Heart.b1 ? Heart.b1 : "2.00"}</p>
                                                            </div>
                                                            {Heart && Heart.gstatus === "1" ? null : <BetLocked />}
                                                        </div>
                                                        <div className={`${posArray[Heart.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Heart.sid] ?? 0.00}</div>
                                                    </div>

                                                    <div className="w-full space-y-1">
                                                        <div className="flex justify-center items-center">
                                                            <p className="text-red-color"> <BsSuitDiamondFill size={17} /></p>
                                                        </div>
                                                        <div className="relative">
                                                            <div onClick={() => handleBackOpen({ data: Diamond, type: "Yes", odds: Diamond.b1, nat: Diamond.nat ? Diamond.nat : Diamond.nation, sid: Diamond.sid }, section1Ref)}
                                                                className="light-blue font-bold text-sm py-3  cursor-pointer uppercase flex justify-center items-center ">
                                                                <p className="text-[14px] font-[600]">{Diamond && Diamond.b1 ? Diamond.b1 : "2.00"}</p>

                                                            </div>
                                                            {Diamond && Diamond.gstatus === "1" ? null : <BetLocked />}
                                                        </div>
                                                        <div className={`${posArray[Diamond.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-[600]`} > {posArray[Diamond.sid] ?? 0.00}</div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="odds-bet">
                                                <p className="flex justify-center items-center text-black text-[14px] font-bold py-1">
                                                    {CardA?.b1 ? CardA.b1 - oddsDifference : 0}
                                                </p>
                                                <div className="w-11/12 py-1 mx-auto lg:flex justify-center items-center grid grid-cols-7 md:space-x-2 space-x-0 gap-2 px-2 text-center ">
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={CardA}
                                                        num={"1"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card2}
                                                        num={"2"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card3}
                                                        num={"3"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card4}
                                                        num={"4"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card5}
                                                        num={"5"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card6}
                                                        num={"6"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card7}
                                                        num={"7"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card8}
                                                        num={"8"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card9}
                                                        num={"9"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={Card10}
                                                        num={"10"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={CardJ}
                                                        num={"11"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={CardQ}
                                                        num={"12"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
                                                    <Card
                                                        handleBackOpen={handleBackOpen}
                                                        Data={CardK}
                                                        num={"13"}
                                                        section1Ref={section1Ref}
                                                        posArray={posArray}
                                                    />
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


export default Anadarbahar_2
