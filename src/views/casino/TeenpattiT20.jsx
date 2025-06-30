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

function TeenpattiT20({ eventId }) {
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
            "sid": state.betSlipData.data.sid,
            "rate": state.count + "",
            "amount": Number(state.betSlipData.stake),
            "casinoType": state.shortName ? state.shortName : "teen20",
            "eventId": eventId,
            "betFor": state.betSlipData.nat + "",
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
    let PlayerA = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let PairPlusA = data && data.t2 && data.t2[1] ? data.t2[1] : {};
    let PlayerB = data && data.t2 && data.t2[2] ? data.t2[2] : {};
    let PairPlusB = data && data.t2 && data.t2[3] ? data.t2[3] : {};


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
                                                    <div className="w-full p-1">
                                                        <div className="text-white font-semibold text-[12px]">
                                                            PLAYER A
                                                        </div>
                                                        <div className="flex space-x-1 justify-start">
                                                            <img
                                                                src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`}
                                                                alt="card"
                                                                className="h-9 w-7 border-[1px] border-yellow-300"
                                                            />
                                                            <img
                                                                src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`}
                                                                alt="card"
                                                                className="h-9 w-7 border-[1px] border-yellow-300"
                                                            />
                                                            <img
                                                                src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`}
                                                                alt="card"
                                                                className="h-9 w-7 border-[1px] border-yellow-300"
                                                            />
                                                        </div>
                                                        <div className="text-white font-semibold text-[12px]">
                                                            PLAYER B
                                                        </div>
                                                        <div className="flex space-x-1 justify-start">
                                                            <img
                                                                src={`/cards/${t1 && t1.C4 ? t1.C4 : 1}.png`}
                                                                alt="card"
                                                                className="h-9 w-7 border-[1px] border-yellow-300"
                                                            />
                                                            <img
                                                                src={`/cards/${t1 && t1.C5 ? t1.C5 : 1}.png`}
                                                                alt="card"
                                                                className="h-9 w-7 border-[1px] border-yellow-300"
                                                            />
                                                            <img
                                                                src={`/cards/${t1 && t1.C6 ? t1.C6 : 1}.png`}
                                                                alt="card"
                                                                className="h-9 w-7 border-[1px] border-yellow-300"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.autotime} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-gray-300 white-text divide-y divide-white mt-1.5">
                                            <div className="grid grid-cols-6 text-center divide-x black-text">
                                                <div className="col-span-3 w-full font-semibold text-[12px] bg-white flex justify-start items-center p-1">
                                                    <span className="lg:hidden block">
                                                        <span className="font-[500] ">MIN</span>:
                                                        {minStake}{" "}
                                                        <span className="font-[500]">&nbsp; MAX</span>:
                                                        {maxStake}
                                                    </span>
                                                </div>
                                                <div className="w-full font-semibold text-[14px] lg:col-span-1 col-span-3 lg:flex justify-center items-center py-1 darktext bg-[var(--matchLagai)]">
                                                    Back
                                                </div>
                                                <div className="col-span-2 hidden w-full font-semibold text-[14px] lg:flex justify-center items-center py-1 uppercase bg-[var(--matchLagai)]"></div>
                                            </div>

                                            <div className="w-full  grid grid-cols-6 divide-x">
                                                <div className="col-span-3 bg-[var(--primary)] h-full text-[14px] player-bg capitalize text-white  font-semibold py-[2px] px-2 w-full flex justify-between items-center">
                                                    <div>
                                                        {PlayerA && PlayerA.nat
                                                            ? PlayerA.nat
                                                            : PlayerA.nation
                                                                ? PlayerA.nation
                                                                : "Player A"}
                                                    </div>
                                                    <div
                                                        className={`${posArray[PlayerA.sid] < 0
                                                            ? "text-red-500"
                                                            : "text-green-800"
                                                            } text-[12px]`}
                                                    >
                                                        {posArray[PlayerA.sid]}
                                                    </div>
                                                </div>
                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer relative ">
                                                    <div
                                                        className=" text-center py-[2px]"
                                                        onClick={() =>
                                                            handleBackOpen(
                                                                {
                                                                    data: PlayerA,
                                                                    type: "Yes",
                                                                    odds: PlayerA.rate - oddsDifference,
                                                                    nat: PlayerA.nat
                                                                        ? PlayerA.nat
                                                                        : PlayerA.nation,
                                                                },
                                                                section1Ref
                                                            )
                                                        }
                                                    >
                                                        <span className="text-[14px] font-[600] gray-text">
                                                            {PlayerA && PlayerA.rate
                                                                ? PlayerA.rate - oddsDifference
                                                                : "0"}
                                                        </span>
                                                        <br />
                                                        <div
                                                            className={`${posArray[PlayerA.sid] < 0
                                                                ? "text-red-500"
                                                                : "text-green-800"
                                                                } text-[12px] font-[600]`}
                                                        >
                                                            {posArray[PlayerA.sid]}
                                                        </div>
                                                    </div>
                                                    {PlayerA && PlayerA.gstatus === "1" ? null : (
                                                        <BetLocked />
                                                    )}
                                                </div>
                                                <div className="col-span-2 w-full bg-[var(--matchLagai)] cursor-pointer relative">
                                                    <div
                                                        className=" text-center py-[2px]"
                                                        onClick={() =>
                                                            handleBackOpen(
                                                                {
                                                                    data: PairPlusA,
                                                                    type: "Yes",
                                                                    odds: PairPlusA.rate - oddsDifference,
                                                                    nat: PairPlusA.nat
                                                                        ? PairPlusA.nat
                                                                        : PairPlusA.nation,
                                                                },
                                                                section1Ref
                                                            )
                                                        }
                                                    >
                                                        <span className="text-[14px] font-[600] gray-text">
                                                            {PairPlusA && PairPlusA.nat
                                                                ? PairPlusA.nat
                                                                : PairPlusA.nation
                                                                    ? PairPlusA.nation
                                                                    : "A"}
                                                        </span>
                                                        <br />
                                                        <span className="text-[13px] font-[600] gray-text">
                                                            {PairPlusA && PairPlusA.rate
                                                                ? PairPlusA.rate - oddsDifference
                                                                : "-"}
                                                        </span>
                                                        <br />
                                                    </div>
                                                    {PairPlusA && PairPlusA.gstatus === "1" ? null : (
                                                        <BetLocked />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="w-full colour_back_odds grid grid-cols-6 divide-x">
                                                <div className="col-span-3 h-full text-[14px] bg-[var(--primary)] capitalize text-white font-semibold py-[2px] px-2 w-full flex justify-between items-center">
                                                    <div>
                                                        {PlayerB && PlayerB.nat
                                                            ? PlayerB.nat
                                                            : PlayerB.nation
                                                                ? PlayerB.nation
                                                                : "Player B"}
                                                    </div>
                                                    <div
                                                        className={`${posArray[PlayerB.sid] < 0
                                                            ? "text-red-500"
                                                            : "text-green-800"
                                                            } text-[12px]`}
                                                    >
                                                        {" "}
                                                        {posArray[PlayerB.sid]}
                                                    </div>
                                                </div>
                                                <div className="w-full bg-[var(--matchLagai)] cursor-pointer relative ">
                                                    <div
                                                        className=" text-center py-[2px]"
                                                        onClick={() =>
                                                            handleBackOpen(
                                                                {
                                                                    data: PlayerB,
                                                                    type: "Yes",
                                                                    odds: PlayerB.rate - oddsDifference,
                                                                    nat: PlayerB.nat
                                                                        ? PlayerB.nat
                                                                        : PlayerB.nation,
                                                                },
                                                                section1Ref
                                                            )
                                                        }
                                                    >
                                                        <span className="text-[14px] font-[600] gray-text">
                                                            {PlayerB && PlayerB.rate
                                                                ? PlayerB.rate - oddsDifference
                                                                : "0"}
                                                        </span>
                                                        <br />
                                                        <div
                                                            className={`${posArray[PlayerB.sid] < 0
                                                                ? "text-red-500"
                                                                : "text-green-800"
                                                                } text-[12px] font-[600]`}
                                                        >
                                                            {posArray[PlayerB.sid]}
                                                        </div>
                                                    </div>
                                                    {PlayerB && PlayerB.gstatus === "1" ? null : (
                                                        <BetLocked />
                                                    )}
                                                </div>
                                                <div className="col-span-2 w-full bg-[var(--matchLagai)] relative">
                                                    <div
                                                        className=" text-center py-[2px] cursor-pointer"
                                                        onClick={() =>
                                                            handleBackOpen(
                                                                {
                                                                    data: PairPlusB,
                                                                    type: "Yes",
                                                                    odds: PairPlusB.rate - oddsDifference,
                                                                    nat: PairPlusB.nat,
                                                                },
                                                                section1Ref
                                                            )
                                                        }
                                                    >
                                                        <span className="text-[14px] font-[600] gray-text">
                                                            {PairPlusB && PairPlusB.nat
                                                                ? PairPlusB.nat
                                                                : PairPlusB.nation
                                                                    ? PairPlusB.nation
                                                                    : "B"}
                                                        </span>
                                                        <br />
                                                        <span className="text-[13px] font-[600] gray-text">
                                                            {PairPlusB && PairPlusB.rate
                                                                ? PairPlusB.rate - oddsDifference
                                                                : "-"}
                                                        </span>
                                                        <br />
                                                    </div>
                                                    {PairPlusB && PairPlusB.gstatus === "1" ? null : (
                                                        <BetLocked />
                                                    )}
                                                </div>
                                            </div>
                                        </div>


                                        <div className=" pb-20  bg-black/5 mt-0.5">
                                            <RoundedTabBmx />
                                            <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                                                {result && result.length > 0 ? result.map((element, index) => (
                                                    <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                                                        <p
                                                            className={`font-[700] ${element && element.result === '3' ? "text-[#FFFF33] text-[14px]" : element && element.result === '1' ? "text-[#ff4500] text-[13px]" : "text-[#33c6ff]"}`}
                                                        >
                                                            {element && element.result === '3' ? "B" : element && element.result === '1' ? "A" : "T"}
                                                        </p>
                                                    </div>
                                                )) : null}
                                            </div>
                                        </div>

                                        <div className='w-full lg:hidden block pb-5'>
                                            <div className="bg-[var(--casinoHeader)] text-white text-[14px] px-2 py-[6px] font-medium tracking-wide mt-3">
                                                Rules
                                            </div>
                                            <div className='overflow-x-auto w-full'>
                                                <table className="table w-full bg-[#f7f7f7] darktext text-[14px] border border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                                                    <thead>
                                                        <tr className='bg-white'>
                                                            <th colspan="3" class="text-center font-[600]">Pair Plus </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='divide-y divide-[#c7c8ca]'>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Pair</span></td>
                                                            <td className="text-left">1 To 1 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Flush	</span></td>
                                                            <td className="text-left">1 To 4 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Straight</span></td>
                                                            <td className="text-left">1 To 6 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Trio	</span></td>
                                                            <td className="text-left">1 To 30 </td>
                                                        </tr>
                                                        <tr className='divide-x divide-[#c7c8ca] '>
                                                            <td className='text-left'><span className="ms-2">Straight Flush			</span></td>
                                                            <td className="text-left">1 To 40 </td>
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


export default TeenpattiT20
