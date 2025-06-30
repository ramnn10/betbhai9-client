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
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";

function Poker({ eventId }) {
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
            "casinoType": state.shortName ? state.shortName : "poker",
            "eventId": eventId,
            "betFor": state.betSlipData.nat + "",
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
    let PlayerA = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let PlayerB = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let ACard2Bonus = data && data.t3 && data.t3[0] ? data.t3[0] : {};
    let ACard7Bonus = data && data.t3 && data.t3[1] ? data.t3[1] : {};
    let BCard2Bonus = data && data.t3 && data.t3[2] ? data.t3[2] : {};
    let BCard7Bonus = data && data.t3 && data.t3[3] ? data.t3[3] : {};
    let Winner1 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let Winner2 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let Twopair1 = data && data.t2 && data.t2[4] ? data.t2[4] : {};
    let Twopair2 = data && data.t2 && data.t2[5] ? data.t2[5] : {};


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
                                                    <div className="px-1.5 pt-1 space-y-[2px]">
                                                        <div className="flex justify-start items-center gap-6">
                                                            <div className="">
                                                                <div className="flex justify-start items-center text-white lg:text-[14px] text-[12px] font-[600]">Player A</div>
                                                                <div className="flex space-x-1 justify-start items-center">
                                                                    <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5" />
                                                                    <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5" />
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <div className="flex justify-start items-center text-white lg:text-[14px] text-[12px] font-[600]">Player B</div>
                                                                <div className="flex space-x-1 justify-start items-center">
                                                                    <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5" />
                                                                    <img src={`/cards/${t1 && t1.C4 ? t1.C4 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="text-white lg:text-[14px] text-[12px] font-[600] ">
                                                                BOARD
                                                            </div>
                                                            <div className="flex justify-start items-center space-x-1">
                                                                <img src={`/cards/${t1 && t1.C5 ? t1.C5 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5 border-[1px] border-yellow-300" />
                                                                <img src={`/cards/${t1 && t1.C6 ? t1.C6 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5 border-[1px] border-yellow-300" />
                                                                <img src={`/cards/${t1 && t1.C7 ? t1.C7 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5 border-[1px] border-yellow-300" />
                                                                <img src={`/cards/${t1 && t1.C8 ? t1.C8 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5 border-[1px] border-yellow-300" />
                                                                <img src={`/cards/${t1 && t1.C9 ? t1.C9 : 1}.png`} alt="card" className="lg:h-9 h-6 lg:w-8 w-5 border-[1px] border-yellow-300" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.autotime} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" space-y-2.5">

                                            <div className="grey-bg pt-1 lg:px-0 px-1 grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-0">

                                                <div className="grid grid-cols-4 gap-2 white-bg border-[1px] border-[#c7c8ca]">

                                                    <div className="col-span-2 flex justify-start items-center">
                                                        <BetPlayerName
                                                            data={PlayerA}
                                                            name="Player A"
                                                            shortName="poker"
                                                        />
                                                    </div>

                                                    <div className="col-span-2 flex justify-center items-center divide-x">

                                                        <div className="flex justify-end items-center w-full">
                                                            {PlayerA && PlayerA.gstatus === 'ACTIVE' && PlayerA.b1 !== "0.00" ?
                                                                <div className="w-full light-blue cursor-pointer " onClick={() => {
                                                                    if (PlayerA && PlayerA.b1 != 0) {
                                                                        handleBackOpen({ data: PlayerA, type: "Yes", odds: PlayerA.b1, nat: PlayerA.nat ? PlayerA.nat : PlayerA.nation },
                                                                            section1Ref);
                                                                    }
                                                                }}>
                                                                    <div className=" text-center py-2" >
                                                                        <span className="text-[14px] dark-text font-semibold">{PlayerA && PlayerA.b1 ? (PlayerA.b1) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full light-blue cursor-pointer " >
                                                                    <div className=" text-center py-2 relative lagai-background dark-text">
                                                                        {/* <span className='bg-white/50 px-1.5 py-2 border-[1px] border-black uppercase'>suspended</span> */}
                                                                        <span className="text-[14px] font-semibold">{PlayerA && PlayerA.b1 ? (PlayerA.b1) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>

                                                        <div className="flex justify-end items-center w-full">
                                                            {PlayerA && PlayerA.gstatus === 'ACTIVE' && PlayerA.l1 !== "0.00" ?
                                                                <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                                                    if (PlayerA && PlayerA.l1 != 0) {
                                                                        handleBackOpen({ data: PlayerA, type: "No", odds: PlayerA.l1, nat: PlayerA.nat ? PlayerA.nat : PlayerA.nation },
                                                                            section1Ref);
                                                                    }
                                                                }}>
                                                                    <div className=" text-center py-2" >
                                                                        <span className="text-[14px] dark-text font-semibold">{PlayerA && PlayerA.l1 ? (PlayerA.l1) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full odds-khaii cursor-pointer " >
                                                                    <div className=" text-center py-2 relative khai-background dark-text">
                                                                        {/* <span className='bg-white/50 px-1.5 py-2 border-[1px] border-black uppercase'>suspended</span> */}
                                                                        <span className="text-[14px] font-semibold">{PlayerA && PlayerA.l1 ? (PlayerA.l1) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="grid grid-cols-4 gap-2 white-bg border-[1px] border-[#c7c8ca] ">

                                                    <div className="col-span-2 flex justify-start items-center">
                                                        <BetPlayerName
                                                            data={PlayerB}
                                                            name="Player B"
                                                            shortName="poker"
                                                        />
                                                    </div>

                                                    <div className="col-span-2 flex justify-center items-center divide-x">

                                                        <div className="flex justify-end items-center w-full">
                                                            {PlayerB && PlayerB.gstatus === 'ACTIVE' && PlayerB.b1 !== "0.00" ?
                                                                <div className="w-full light-blue cursor-pointer " onClick={() => {
                                                                    if (PlayerB && PlayerB.b1 != 0) {
                                                                        handleBackOpen({ data: PlayerB, type: "Yes", odds: PlayerB.b1, nat: PlayerB.nat ? PlayerB.nat : PlayerB.nation },
                                                                            section1Ref);
                                                                    }
                                                                }}>
                                                                    <div className=" text-center py-2" >
                                                                        <span className="text-[14px] dark-text font-semibold">{PlayerB && PlayerB.b1 ? (PlayerB.b1) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full light-blue cursor-pointer " >
                                                                    <div className=" text-center py-2 relative lagai-background dark-text">
                                                                        {/* <span className='bg-white/50 px-1.5 py-2 border-[1px] border-black uppercase'>suspended</span> */}
                                                                        <span className="text-[14px] font-semibold">{PlayerB && PlayerB.b1 ? (PlayerB.b1) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>

                                                        <div className="flex justify-end items-center w-full">
                                                            {PlayerB && PlayerB.gstatus === 'ACTIVE' && PlayerB.l1 !== "0.00" ?
                                                                <div className="w-full odds-khaii cursor-pointer " onClick={() => {
                                                                    if (PlayerB && PlayerB.l1 != 0) {
                                                                        handleBackOpen({ data: PlayerB, type: "No", odds: PlayerB.l1, nat: PlayerB.nat ? PlayerB.nat : PlayerB.nation },
                                                                            section1Ref);
                                                                    }
                                                                }}>
                                                                    <div className=" text-center py-2" >
                                                                        <span className="text-[14px] dark-text font-semibold">{PlayerB && PlayerB.l1 ? (PlayerB.l1) : "-"}</span><br />
                                                                    </div>
                                                                </div> :
                                                                <div className="w-full odds-khaii cursor-pointer " >
                                                                    <div className=" text-center py-2 relative khai-background dark-text">
                                                                        {/* <span className='bg-white/50 px-1.5 py-[2px] border-[1px] border-black uppercase'>suspended</span> */}
                                                                        <span className="text-[14px] font-semibold">{PlayerB && PlayerB.l1 ? (PlayerB.l1) : "-"}</span><br />
                                                                        <BetLocked />
                                                                    </div>
                                                                </div>}
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-0 px-1 lg:space-x-0 space-x-0 lg:gap-4 gap-0 lg:space-y-0 space-y-1.5 ">
                                                <div className="text-[14px] px-1 dark-text font-[600] lg:hidden block">Player A</div>
                                                <div className="grid grid-cols-2 gap-2">

                                                    <BetButtonCards
                                                        data={ACard2Bonus}
                                                        name="2 Card Bonus"
                                                        shortName="poker"
                                                    />

                                                    <BetButtonCards
                                                        data={ACard7Bonus}
                                                        name="7 Card Bonus"
                                                        shortName="poker"
                                                    />
                                                </div>

                                                <div className="text-[14px] px-1 dark-text font-[600] lg:hidden block">Player B</div>
                                                <div className="grid grid-cols-2 gap-2">

                                                    <BetButtonCards
                                                        data={BCard2Bonus}
                                                        name="2 Card Bonus"
                                                        shortName="poker"
                                                    />

                                                    <BetButtonCards
                                                        data={BCard7Bonus}
                                                        name="7 Card Bonus"
                                                        shortName="poker"
                                                    />
                                                </div>

                                            </div>

                                            <marquee className="text-[#097c93] font-bold text-[12px]">
                                                Play & Win.
                                            </marquee>


                                        </div>


                                        <div className=" pb-20 bg-black/5 mt-0.5">
                                            <RoundedTabBmx />
                                            <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                                                {result && result.length > 0 ? result.map((element, index) => (
                                                    <div key={index} onClick={() => handleResultModel(element)} className={`bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700 ${element?.result === "0" ? "bg-[#d0012f] text-white" : element?.result === "11" ? "text-[#F75500] bg-[#355e3b]" : element?.result === "21" ? "text-[#FFF523] bg-[#355e3b]" : "text-[#000]"}`} >
                                                        <p className="font-[600] text-[13px]">
                                                            {element?.result === "0" ? "T" : element?.result === "21" ? "B" : element?.result === "11" ? "A" : "-"}
                                                        </p>
                                                    </div>
                                                )) : null}
                                            </div>
                                        </div>
                                        <div className='w-full lg:hidden block pb-5'>
                                            <div className="even-background text-white text-[14px] px-2 py-[6px] font-medium tracking-wide mt-3">
                                                Rules
                                            </div>
                                            <div className='overflow-x-auto w-full'>
                                                <table className="table w-full bg-[#f7f7f7] darktext text-[14px] border border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                                                    <thead>
                                                        <tr className='bg-white'>
                                                            <th colSpan="3" className="text-center font-[600]">Bonus 1 (2 Cards Bonus)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='divide-y divide-[#c7c8ca]'>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Pair (2-10)	</span></td>
                                                            <td className="text-left">1 TO 3 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">A/Q or A/J Off Suited		</span></td>
                                                            <td className="text-left">1 TO 5 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Pair (JQK)		</span></td>
                                                            <td className="text-left">1 TO 10 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">A/K Off Suited		</span></td>
                                                            <td className="text-left">1 TO 15 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">A/Q or A/J Suited		</span></td>
                                                            <td className="text-left">1 TO 20 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">A/K Suited		</span></td>
                                                            <td className="text-left">1 TO 25 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">A/A		</span></td>
                                                            <td className="text-left">1 TO 30 </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                <table className="table w-full bg-[#f7f7f7] darktext text-[14px] border-r border-l border-b border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                                                    <thead>
                                                        <tr className='bg-white'>
                                                            <th colSpan="3" className="text-center font-[600]">Bonus 2 (7 Cards Bonus) </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='divide-y divide-[#c7c8ca]'>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Three of a Kind		</span></td>
                                                            <td className="text-left">1 TO 3 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Three of a Kind		</span></td>
                                                            <td className="text-left">1 TO 4 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Flush	</span></td>
                                                            <td className="text-left">1 TO 6 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Full House		</span></td>
                                                            <td className="text-left">1 TO 8 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Four of a Kind		</span></td>
                                                            <td className="text-left">1 TO 30 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Straight Flush		</span></td>
                                                            <td className="text-left">1 TO 50 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Royal Flush			</span></td>
                                                            <td className="text-left">1 TO 100 </td>
                                                        </tr>

                                                    </tbody>
                                                </table>
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
                                                <BetListTableDesktop betList={betList} eventId={eventId} />
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


export default Poker
