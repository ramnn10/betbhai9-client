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
import { BsFillSuitHeartFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";

function DragonTigerOneday({ eventId }) {
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
            "sid": state.betSlipData.data?.sid,
            "rate": state.count + "",
            "amount": Number(state.betSlipData.stake),
            "casinoType": state.shortName ? state.shortName : "dt6",
            "eventId": eventId,
            "betFor": state.betSlipData.data.nat + "",
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
    let t2 = data && data.t1 && data.t1[1] ? data.t1[1] : {};

    let Dragon = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let Tiger = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let Pair = data && data.t2 && data.t2[2] ? data.t2[2] : {};

    let DEven = data && data.t2 && data.t2[3] ? data.t2[3] : {};
    let DOdd = data && data.t2 && data.t2[4] ? data.t2[4] : {};
    let DRed = data && data.t2 && data.t2[5] ? data.t2[5] : {};
    let DBlack = data && data.t2 && data.t2[6] ? data.t2[6] : {};
    let DSpade = data && data.t2 && data.t2[7] ? data.t2[7] : {};
    let DHeart = data && data.t2 && data.t2[8] ? data.t2[8] : {};
    let DDiamond = data && data.t2 && data.t2[9] ? data.t2[9] : {};
    let DClub = data && data.t2 && data.t2[10] ? data.t2[10] : {};

    let TEven = data && data.t2 && data.t2[11] ? data.t2[11] : {};
    let TOdd = data && data.t2 && data.t2[12] ? data.t2[12] : {};
    let TRed = data && data.t2 && data.t2[13] ? data.t2[13] : {};
    let TBlack = data && data.t2 && data.t2[14] ? data.t2[14] : {};
    let TSpade = data && data.t2 && data.t2[15] ? data.t2[15] : {};
    let THeart = data && data.t2 && data.t2[16] ? data.t2[16] : {};
    let TDiamond = data && data.t2 && data.t2[17] ? data.t2[17] : {};
    let TClub = data && data.t2 && data.t2[18] ? data.t2[18] : {};



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
                            shortName={shortName ? shortName : "dt20"}
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
                                                <div className="absolute top-0 left-0">
                                                    <div className="flex justify-start space-x-1 px-2 pt-1.5">
                                                        <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="lg:h-12 h-8 lg:w-10 w-6 border-[1px] border-yellow-300" />
                                                        <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="lg:h-12 h-8 lg:w-10 w-6 border-[1px] border-yellow-300" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.autotime} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full space-y-4 white_bg">

                                            <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-4 space-x-0">

                                                <div className="border border-gray-300 white-bg divide-y white-text mt-2">

                                                    <div className="grid grid-cols-5 text-center darktext font-[600] lg:text-[16px] text-[14px] capitalize divide-x divide-[#c7c8ca]">
                                                        <div className="col-span-3 w-full flex justify-start items-center py-1">
                                                        </div>
                                                        <div className="w-full flex justify-center items-center light-blue py-1">Back</div>
                                                        <div className="w-full flex justify-center items-center odds-khaii py-1">Lay</div>
                                                    </div>

                                                    <div className="divide-y divide-[#c7c8ca]">

                                                        <div className="w-full text-center ">
                                                            <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]">
                                                                <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 py-3 col-span-3 w-full text-left">
                                                                    <div>{Dragon && Dragon.nat ? Dragon.nat : Dragon.nation ? Dragon.nation : "Dragon"} </div>
                                                                    <div className={`${posArray[Dragon.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Dragon.sid]} </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer" onClick={() => handleBackOpen({ data: Dragon, type: "Yes", odds: Dragon.b1, nat: Dragon.nat ? Dragon.nat : Dragon.nation, type: "Yes" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{Dragon && Dragon.b1 ? (Dragon.b1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {Dragon && Dragon.gstatus === 'ACTIVE' && Dragon.b1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Dragon, type: "Yes", odds: Dragon.l1, nat: Dragon.nat ? Dragon.nat : Dragon.nation, type: "No" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{Dragon && Dragon.l1 ? (Dragon.l1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {Dragon && Dragon.gstatus === 'ACTIVE' && Dragon.l1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-full text-center ">
                                                            <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]">
                                                                <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 py-3 col-span-3 w-full text-left">
                                                                    <div>
                                                                        {Tiger && Tiger.nat ? Tiger.nat : Tiger.nation ? Tiger.nation : "Tiger"}
                                                                    </div>
                                                                    <div className={`${posArray[Tiger.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Tiger.sid]}</div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer" onClick={() => handleBackOpen({ data: Tiger, type: "Yes", odds: Tiger.b1, nat: Tiger.nat ? Tiger.nat : Tiger.nation, type: "Yes" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{Tiger && Tiger.b1 ? (Tiger.b1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {Tiger && Tiger.gstatus === 'ACTIVE' && Tiger.b1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: Tiger, type: "Yes", odds: Tiger.l1, nat: Tiger.nat ? Tiger.nat : Tiger.nation, type: "No" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{Tiger && Tiger.l1 ? (Tiger.l1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {Tiger && Tiger.gstatus === 'ACTIVE' && Tiger.l1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="flex justify-center items-center border border-gray-300 grey-color white-text mt-2">
                                                    <div className=" w-full p-2 text-center">
                                                        <span className="text-[15px] darktext font-[600]">{Pair && Pair.b1 ? (Pair.b1) : 0}</span><br />

                                                        <div className="flex justify-end items-center w-full relative">
                                                            <div className="w-full even-background rounded-sm cursor-pointer " onClick={() => handleBackOpen({ data: Pair, type: "Yes", odds: Pair.b1, nat: Pair.nat ? Pair.nat : Pair.nation, type: "Yes" }, section1Ref)}>
                                                                <div className=" text-center py-2.5" >
                                                                    <span className="text-[18px] capitalize text-white font-[600]"> {Pair && Pair.nat ? Pair.nat : Pair.nation ? Pair.nation : "Pair"}</span><br />
                                                                </div>
                                                            </div>
                                                            {Pair && Pair.gstatus === 'ACTIVE' ? null : <BetLocked />}
                                                        </div>
                                                        <div className={`${posArray[Dragon.sid] < 0 ? "text-red-500" : "text-green-800"} text-[14px] font-[600]`} > {posArray[Dragon.sid]}0.00 </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-x-4 space-x-0">

                                                <div className="border border-gray-300 white-bg divide-y white-text mt-2">

                                                    <div className="grid grid-cols-5 text-center darktext font-[600] lg:text-[16px] text-[14px] capitalize divide-x divide-[#c7c8ca]">
                                                        <div className="col-span-3 w-full flex justify-start items-center py-1">
                                                        </div>
                                                        <div className="w-full flex justify-center items-center light-blue py-1">Even</div>
                                                        <div className="w-full flex justify-center items-center light-blue py-1">Odd</div>
                                                    </div>

                                                    <div className="divide-y divide-[#c7c8ca]">

                                                        <div className="w-full text-center ">
                                                            <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]">
                                                                <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 py-3 col-span-3 w-full text-left">
                                                                    <div>
                                                                        {Dragon && Dragon.nat ? Dragon.nat : Dragon.nation ? Dragon.nation : "Dragon"}
                                                                    </div>
                                                                    <div className={`${posArray[DEven.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[DEven.sid]} </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer" onClick={() => handleBackOpen({ data: DEven, type: "Yes", odds: DEven.b1, nat: DEven.nat ? DEven.nat : DEven.nation, type: "Yes" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{DEven && DEven.b1 ? (DEven.b1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {DEven && DEven.gstatus === 'ACTIVE' && DEven.b1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: DOdd, type: "Yes", odds: DOdd.l1, nat: DOdd.nat ? DOdd.nat : DOdd.nation, type: "No" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{DOdd && DOdd.l1 ? (DOdd.l1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {DOdd && DOdd.gstatus === 'ACTIVE' && DOdd.l1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-full text-center ">
                                                            <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]">
                                                                <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 py-3 col-span-3 w-full text-left">
                                                                    <div>
                                                                        {Tiger && Tiger.nat ? Tiger.nat : Tiger.nation ? Tiger.nation : "Tiger"}
                                                                    </div>
                                                                    <div className={`${posArray[TEven.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[TEven.sid]}</div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer" onClick={() => handleBackOpen({ data: TEven, type: "Yes", odds: TEven.b1, nat: TEven.nat ? TEven.nat : TEven.nation, type: "Yes" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{TEven && TEven.b1 ? (TEven.b1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {TEven && TEven.gstatus === 'ACTIVE' && TEven.b1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: TOdd, type: "Yes", odds: TOdd.l1, nat: TOdd.nat ? TOdd.nat : TOdd.nation, type: "No" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{TOdd && TOdd.l1 ? (TOdd.l1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {TOdd && TOdd.gstatus === 'ACTIVE' && TOdd.l1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="border border-gray-300 white-bg divide-y white-text mt-2">

                                                    <div className="grid grid-cols-5 text-center darktext font-[600] lg:text-[16px] text-[14px] capitalize divide-x divide-[#c7c8ca]">
                                                        <div className="col-span-3 w-full flex justify-start items-center py-1">
                                                        </div>
                                                        <div className="w-full flex justify-center items-center light-blue py-1 space-x-1.5">
                                                            <span>Red</span>
                                                            <BsFillSuitHeartFill className='text-[#FF0000]' />
                                                            <BsSuitDiamondFill className='text-[#FF0000]' />
                                                        </div>
                                                        <div className="w-full flex justify-center items-center light-blue py-1 space-x-1.5">
                                                            <span>Black</span>
                                                            <BsSuitSpadeFill className='text-black' />
                                                            <BsSuitClubFill className='text-black' />
                                                        </div>
                                                    </div>

                                                    <div className="divide-y divide-[#c7c8ca]">

                                                        <div className="w-full text-center ">
                                                            <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]">
                                                                <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 py-3 col-span-3 w-full text-left">
                                                                    <div>
                                                                        {Dragon && Dragon.nat ? Dragon.nat : Dragon.nation ? Dragon.nation : "Dragon"}
                                                                    </div>
                                                                    <div className={`${posArray[DRed.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[DRed.sid]}</div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer" onClick={() => handleBackOpen({ data: DRed, type: "Yes", odds: DRed.b1, nat: DRed.nat ? DRed.nat : DRed.nation, type: "Yes" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{DRed && DRed.b1 ? (DRed.b1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {DRed && DRed.gstatus === 'ACTIVE' && DRed.b1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: DBlack, type: "Yes", odds: DBlack.l1, nat: DBlack.nat ? DBlack.nat : DBlack.nation, type: "No" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{DBlack && DBlack.l1 ? (DBlack.l1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {DBlack && DBlack.gstatus === 'ACTIVE' && DBlack.l1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="w-full text-center ">
                                                            <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]">
                                                                <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 py-3 col-span-3 w-full text-left">
                                                                    <div>
                                                                        {Tiger && Tiger.nat ? Tiger.nat : Tiger.nation ? Tiger.nation : "Tiger"}
                                                                    </div>
                                                                    <div className={`${posArray[TRed.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[TRed.sid]}</div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer" onClick={() => handleBackOpen({ data: TRed, type: "Yes", odds: TRed.b1, nat: TRed.nat ? TRed.nat : TRed.nation, type: "Yes" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{TRed && TRed.b1 ? (TRed.b1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {TRed && TRed.gstatus === 'ACTIVE' && TRed.b1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                                <div className="w-full">
                                                                    <div className="flex justify-end items-center w-full relative">
                                                                        <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: TBlack, type: "Yes", odds: TBlack.l1, nat: TBlack.nat ? TBlack.nat : TBlack.nation, type: "No" }, section1Ref)}>
                                                                            <div className=" text-center py-3" >
                                                                                <span className="text-[16px] darktext font-[600]">{TBlack && TBlack.l1 ? (TBlack.l1) : "-"}</span><br />
                                                                            </div>
                                                                        </div>
                                                                        {TBlack && TBlack.gstatus === 'ACTIVE' && TBlack.l1 !== "0.00" ? null : <BetLocked />}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="border border-gray-300 white-bg divide-y white-text mt-2">

                                                <div className="grid grid-cols-5 text-center darktext font-[600] text-[14px] uppercase divide-x divide-[#c7c8ca]">
                                                    <div className="col-span-1 w-full flex justify-start items-center py-1.5">
                                                    </div>
                                                    <div className="w-full flex justify-center items-center py-1.5">
                                                        <BsSuitSpadeFill className='text-black' />
                                                    </div>
                                                    <div className="w-full flex justify-center items-center py-1.5">
                                                        <BsFillSuitHeartFill className='text-[#FF0000]' />
                                                    </div>
                                                    <div className="w-full flex justify-center items-center py-1.5">
                                                        <BsSuitDiamondFill className='text-[#FF0000]' />
                                                    </div>
                                                    <div className="w-full flex justify-center items-center py-1.5">
                                                        <BsSuitClubFill className='text-black' />
                                                    </div>
                                                </div>

                                                <div className="divide-y divide-[#c7c8ca]">

                                                    <div className="w-full text-center ">
                                                        <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]">
                                                            <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 py-3 col-span-1 w-full text-left">
                                                                <div>
                                                                    {Dragon && Dragon.nat ? Dragon.nat : Dragon.nation ? Dragon.nation : "Dragon"}
                                                                </div>
                                                                <div className={`${posArray[Dragon.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Dragon.sid]} </div>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex justify-end items-center w-full relative">
                                                                    <div className="w-full light-blue cursor-pointer" onClick={() => handleBackOpen({ data: DSpade, type: "Yes", odds: DSpade.b1, nat: DSpade.nat ? DSpade.nat : DSpade.nation, type: "Yes" }, section1Ref)}>
                                                                        <div className=" text-center py-3" >
                                                                            <span className="text-[16px] darktext font-[600]">{DSpade && DSpade.b1 ? (DSpade.b1) : "-"}</span><br />
                                                                        </div>
                                                                    </div>
                                                                    {DSpade && DSpade.gstatus === 'ACTIVE' && DSpade.b1 !== "0.00" ? null : <BetLocked />}
                                                                </div>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex justify-end items-center w-full relative">
                                                                    <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: DHeart, type: "Yes", odds: DHeart.l1, nat: DHeart.nat ? DHeart.nat : DHeart.nation, type: "No" }, section1Ref)}>
                                                                        <div className=" text-center py-3" >
                                                                            <span className="text-[16px] darktext font-[600]">{DHeart && DHeart.l1 ? (DHeart.l1) : "-"}</span><br />
                                                                        </div>
                                                                    </div>
                                                                    {DHeart && DHeart.gstatus === 'ACTIVE' && DHeart.l1 !== "0.00" ? null : <BetLocked />}
                                                                </div>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex justify-end items-center w-full relative">
                                                                    <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: DDiamond, type: "Yes", odds: DDiamond.l1, nat: DDiamond.nat ? DDiamond.nat : DDiamond.nation, type: "No" }, section1Ref)}>
                                                                        <div className=" text-center py-3" >
                                                                            <span className="text-[16px] darktext font-[600]">{DDiamond && DDiamond.l1 ? (DDiamond.l1) : "-"}</span><br />
                                                                        </div>
                                                                    </div>
                                                                    {DDiamond && DDiamond.gstatus === 'ACTIVE' && DDiamond.l1 !== "0.00" ? null : <BetLocked />}
                                                                </div>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex justify-end items-center w-full relative">
                                                                    <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: DClub, type: "Yes", odds: DClub.l1, nat: DClub.nat ? DClub.nat : DClub.nation, type: "No" }, section1Ref)}>
                                                                        <div className=" text-center py-3" >
                                                                            <span className="text-[16px] darktext font-[600]">{DClub && DClub.l1 ? (DClub.l1) : "-"}</span><br />
                                                                        </div>
                                                                    </div>
                                                                    {DClub && DClub.gstatus === 'ACTIVE' && DClub.l1 !== "0.00" ? null : <BetLocked />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="w-full text-center ">
                                                        <div className="grid grid-cols-5 divide-x divide-[#c7c8ca]">
                                                            <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 py-3 col-span-1 w-full text-left">
                                                                <div>
                                                                    {Tiger && Tiger.nat ? Tiger.nat : Tiger.nation ? Tiger.nation : "Tiger"}
                                                                </div>
                                                                <div className={`${posArray[Tiger.sid] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[Tiger.sid]}</div>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex justify-end items-center w-full relative">
                                                                    <div className="w-full light-blue cursor-pointer" onClick={() => handleBackOpen({ data: TSpade, type: "Yes", odds: TSpade.b1, nat: TSpade.nat ? TSpade.nat : TSpade.nation, type: "Yes" }, section1Ref)}>
                                                                        <div className=" text-center py-3" >
                                                                            <span className="text-[16px] darktext font-[600]">{TSpade && TSpade.b1 ? (TSpade.b1) : "-"}</span><br />
                                                                        </div>
                                                                    </div>
                                                                    {TSpade && TSpade.gstatus === 'ACTIVE' && TSpade.b1 !== "0.00" ? null : <BetLocked />}
                                                                </div>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex justify-end items-center w-full relative">
                                                                    <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: THeart, type: "Yes", odds: THeart.l1, nat: THeart.nat ? THeart.nat : THeart.nation, type: "No" }, section1Ref)}>
                                                                        <div className=" text-center py-3" >
                                                                            <span className="text-[16px] darktext font-[600]">{THeart && THeart.l1 ? (THeart.l1) : "-"}</span><br />
                                                                        </div>
                                                                    </div>
                                                                    {THeart && THeart.gstatus === 'ACTIVE' && THeart.l1 !== "0.00" ? null : <BetLocked />}
                                                                </div>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex justify-end items-center w-full relative">
                                                                    <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: TDiamond, type: "Yes", odds: TDiamond.l1, nat: TDiamond.nat ? TDiamond.nat : TDiamond.nation, type: "No" }, section1Ref)}>
                                                                        <div className=" text-center py-3" >
                                                                            <span className="text-[16px] darktext font-[600]">{TDiamond && TDiamond.l1 ? (TDiamond.l1) : "-"}</span><br />
                                                                        </div>
                                                                    </div>
                                                                    {TDiamond && TDiamond.gstatus === 'ACTIVE' && TDiamond.l1 !== "0.00" ? null : <BetLocked />}
                                                                </div>
                                                            </div>
                                                            <div className="w-full">
                                                                <div className="flex justify-end items-center w-full relative">
                                                                    <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: TClub, type: "Yes", odds: TClub.l1, nat: TClub.nat ? TClub.nat : TClub.nation, type: "No" }, section1Ref)}>
                                                                        <div className=" text-center py-3" >
                                                                            <span className="text-[16px] darktext font-[600]">{TClub && TClub.l1 ? (TClub.l1) : "-"}</span><br />
                                                                        </div>
                                                                    </div>
                                                                    {TClub && TClub.gstatus === 'ACTIVE' && TClub.l1 !== "0.00" ? null : <BetLocked />}
                                                                </div>
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
                                                    <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                                                        <p className="text-[#FFF523] font-[600] text-[13px]">{element && element.result === '2' ? "T" : element && element.result === '1' ? <p className="text-[#FF4502] font-[600] text-[13px]">D</p> : "-"}</p>
                                                    </div>
                                                )) : null}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="lg:w-[30%] w-full bg-white lg:px-1.5 sticky top-0  lg:h-[calc(100vh-400px)] lg:block hidden">
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
                                        <div className="bg-[var(--secondary)] text-white text-[14px] px-2 py-[6px] rounded-[4px] ">
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


export default DragonTigerOneday
