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
import { AiFillHeart } from "react-icons/ai";
import { ImDiamonds } from "react-icons/im";
import { BsSuitClubFill, BsSuitSpadeFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";
import ButtonValuesModal from "../buttonvalues/ButtonValuesModal";

function WorliMatka({ eventId }) {
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
            "sid": `${state.betSlipData?.sid}`,
            "rate": (state.count - oddsDifference) + "",
            "amount": Number(state.betSlipData.stake),
            "casinoType": state.shortName ? state.shortName : "worli2",
            "eventId": eventId,
            "betFor": state.betSlipData.nat.split(' ')[0],
            "isLay": state.betSlipData.nat.split(' ')[0]

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
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let ENG = data && data.t2 && data.t2[0] ? data.t2[0] : {};


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
                                                <div className=" absolute top-0 left-0">
                                                    <div className="flex justify-start space-x-1 p-2">
                                                        <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6" />
                                                        <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6" />
                                                        <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="lg:h-10 h-7 lg:w-8 w-6" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.autotime} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-2">
                                            <div className="flex justify-between items-center text-center py-1">
                                                <p></p>
                                                <p className="text-[14px] font-[600] darktext">{9.5 - oddsDifference}</p>
                                                <p></p>
                                            </div>

                                            <div className="w-full grid grid-cols-5 divide-x divide-y">

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '1 Single', sid: 1 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">1</p>
                                                    </div>
                                                    <div className={`${posArray[1] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[1] ?? 0.00}</div>
                                                </div>

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '2 Single', sid: 2 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">2</p>
                                                    </div>
                                                    <div className={`${posArray[2] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[2] ?? 0.00}</div>
                                                </div>

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '3 Single', sid: 3 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">3</p>
                                                    </div>
                                                    <div className={`${posArray[3] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[3] ?? 0.00}</div>
                                                </div>

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '4 Single', sid: 4 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">4</p>
                                                    </div>
                                                    <div className={`${posArray[4] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[4] ?? 0.00}</div>
                                                </div>

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '5 Single', sid: 5 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">5</p>
                                                    </div>
                                                    <div className={`${posArray[5] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[5] ?? 0.00}</div>
                                                </div>

                                            </div>

                                            <div className="w-full grid grid-cols-5 divide-x divide-y">

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '6 Single', sid: 6 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">6</p>
                                                    </div>
                                                    <div className={`${posArray[6] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[6] ?? 0.00}</div>
                                                </div>

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '7 Single', sid: 7 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">7</p>
                                                    </div>
                                                    <div className={`${posArray[7] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[7] ?? 0.00}</div>
                                                </div>

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '8 Single', sid: 8 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">8</p>
                                                    </div>
                                                    <div className={`${posArray[8] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[8] ?? 0.00}</div>
                                                </div>

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '9 Single', sid: 9 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">9</p>
                                                    </div>
                                                    <div className={`${posArray[9] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[9] ?? 0.00}</div>
                                                </div>

                                                <div>
                                                    <div onClick={() => handleBackOpen({ data: ENG, type: "Yes", odds: 9.5, nat: '0 Single', sid: 0 })} className=" bg-[#72BBEF] flex justify-center items-center cursor-pointer p-4">
                                                        <p className="text-[40px] font-semibold">0</p>
                                                    </div>
                                                    <div className={`${posArray[0] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[16px] font-[500]`} > {posArray[0] ?? 0.00}</div>
                                                </div>

                                            </div>

                                            {ENG && ENG.gstatus === '1' ? null : <BetLocked />}
                                        </div>


                                        <div className=" pb-20 bg-black/5 mt-0.5">
                                            <RoundedTabBmx />
                                            <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                                                {result && result.length > 0 ? result.map((element, index) => (
                                                    <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                                                        <p className={`font-[600] text-[13px] text-[#FFF523]`}>{element && element.result && element.result === "1" ? "R" : element && element.result && element.result === "0" ? "R" : element && element.result && element.result === "2" ? "R" : "R"}</p>
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


export default WorliMatka
