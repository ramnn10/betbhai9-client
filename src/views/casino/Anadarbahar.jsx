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

function Anadarbahar({ eventId }) {
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
            count: data?.rate,

        }));

    };
    const betForSet = (nat) => {
        let value = nat.split(' ')[0];
        if (value === "HIGH") {
            this.setState({ betFor: "lowHigh" })
        } else if (value === "LOW") {
            this.setState({ betFor: "lowHigh" })
        } else if (value === "Card") {
            this.setState({ betFor: "cards" })
        } else if (value === "Red") {
            this.setState({ betFor: "color" })
        } else if (value === "Black") {
            this.setState({ betFor: "color" })
        } else if (value === "Odd" || value === "Even") {
            this.setState({ betFor: "oddEven" })
        }
    }

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
        let t1 = data && data?.t1 && data?.t1[0] ? data?.t1[0] : {};
        let betObject = {
            "roundId": t1.mid,
            "sid": state.betSlipdata?.sid,
            "rate": (state.count - oddsDifference) + "",
            "amount": Number(state.betSlipdata?.stake),
            "casinoType": state.shortName ? state.shortName : "ab20",
            "betFor": state.betFor + "",
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
    const updateStackOnClick = (element) => setState({ ...state, betSlipData: { ...state.betSlipData, stake: Number(state.betSlipdata?.stake) + element } })




    const { ResultModel, time, count, backBetModal, LoadingBet, clicked, activeTab } = state;
    let { data, result } = casinoData ? casinoData : {};

    let Andar = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[0] ? casinoData?.data?.t2[0] : {};
    let Bahar = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[1] ? casinoData?.data?.t2[1] : {};
    let AndarA = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[0] ? casinoData?.data?.t2[0] : {};
    let Andar2 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[1] ? casinoData?.data?.t2[1] : {};
    let Andar3 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[2] ? casinoData?.data?.t2[2] : {};
    let Andar4 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[3] ? casinoData?.data?.t2[3] : {};
    let Andar5 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[4] ? casinoData?.data?.t2[4] : {};
    let Andar6 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[5] ? casinoData?.data?.t2[5] : {};
    let Andar7 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[6] ? casinoData?.data?.t2[6] : {};
    let Andar8 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[7] ? casinoData?.data?.t2[7] : {};
    let Andar9 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[8] ? casinoData?.data?.t2[8] : {};
    let Andar10 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[9] ? casinoData?.data?.t2[9] : {};
    let AndarJ = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[10] ? casinoData?.data?.t2[10] : {};
    let AndarQ = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[11] ? casinoData?.data?.t2[11] : {};
    let AndarK = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[12] ? casinoData?.data?.t2[12] : {};
    let BaharA = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[13] ? casinoData?.data?.t2[13] : {};
    let Bahar2 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[14] ? casinoData?.data?.t2[14] : {};
    let Bahar3 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[15] ? casinoData?.data?.t2[15] : {};
    let Bahar4 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[16] ? casinoData?.data?.t2[16] : {};
    let Bahar5 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[17] ? casinoData?.data?.t2[17] : {};
    let Bahar6 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[18] ? casinoData?.data?.t2[18] : {};
    let Bahar7 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[19] ? casinoData?.data?.t2[19] : {};
    let Bahar8 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[20] ? casinoData?.data?.t2[20] : {};
    let Bahar9 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[21] ? casinoData?.data?.t2[21] : {};
    let Bahar10 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[22] ? casinoData?.data?.t2[22] : {};
    let BaharJ = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[23] ? casinoData?.data?.t2[23] : {};
    let BaharQ = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[24] ? casinoData?.data?.t2[24] : {};
    let BaharK = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t2 && casinoData?.data?.t2[25] ? casinoData?.data?.t2[25] : {};
    let t1 = casinoData && casinoData?.data && casinoData?.data && casinoData?.data?.t1 && casinoData?.data?.t1[0] ? casinoData?.data?.t1[0] : {};


    return (
        <>

            {showLoader ?
                <Loader active={showLoader === true} />

                :
                <div className={`w-full relative  page_bg text-sm flex`}>
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
                                                <div className="absolute top-0 left-0">
                                                    <div className="p-1.5">
                                                        <div className="text-white text-[14px] font-[500] ">CARD</div>
                                                        <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-10 w-8 border-[1px] border-yellow-300" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.autotime} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-2 px-1">

                                            <div className="lg:space-y-2 space-y-0">
                                                <div className=" Andar-bg lg:flex lg:divide-x divide-black border-[1px] border-black">

                                                    <div className="lg:w-[10%] w-full text-[14px] lg:border-none border-b-[1px] border-black font-medium black-text flex justify-center items-center">
                                                        {Andar.nat ? Andar.nat : Andar.nation ? Andar.nation : "ANDAR"}
                                                    </div>

                                                    <div className="lg:w-[90%] w-11/12 py-2 mx-auto lg:flex justify-center items-center grid md:grid-cols-7 grid-cols-5 md:space-x-2 space-x-0 gap-2 px-2 text-center ">
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={AndarA}
                                                            num={"1"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar2}
                                                            num={"2"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar3}
                                                            num={"3"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar4}
                                                            num={"4"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar5}
                                                            num={"5"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar6}
                                                            num={"6"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar7}
                                                            num={"7"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar8}
                                                            num={"8"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar9}
                                                            num={"9"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Andar10}
                                                            num={"10"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={AndarJ}
                                                            num={"11"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={AndarQ}
                                                            num={"12"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={AndarK}
                                                            num={"13"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="Bahar-bg lg:flex lg:divide-x divide-black border-[1px] border-black">

                                                    <div className="lg:w-[10%] w-full text-[14px] lg:border-none border-b-[1px] border-black font-medium black-text flex justify-center items-center">
                                                        {Bahar.nat ? Bahar.nat : Bahar.nation ? Bahar.nation : "BAHAR"}
                                                    </div>

                                                    <div className="lg:w-[90%] w-11/12 py-2 mx-auto lg:flex justify-center items-center grid md:grid-cols-7 grid-cols-5 md:space-x-2 space-x-0 gap-2 px-2 text-center ">
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={BaharA}
                                                            num={"1"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar2}
                                                            num={"2"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar3}
                                                            num={"3"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar4}
                                                            num={"4"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar5}
                                                            num={"5"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar6}
                                                            num={"6"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar7}
                                                            num={"7"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar8}
                                                            num={"8"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar9}
                                                            num={"9"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Bahar10}
                                                            num={"10"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={BaharJ}
                                                            num={"11"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={BaharQ}
                                                            num={"12"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                        <Card
                                                            handleBackOpen={handleBackOpen}
                                                            Data={BaharK}
                                                            num={"13"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="text-[12px] text-right font-[600] text-[#17a2b8]">
                                                Payout : Bahar 1st Card 25% and All Other Andar-Bahar Cards 100%.
                                            </div>

                                        </div>


                                        <div className=" pb-20 bg-black/5 mt-0.5">
                                            <RoundedTabBmx />
                                            <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                                                {casinoData && casinoData?.result && casinoData?.result ? casinoData?.result.map((element, index) => (
                                                    <div key={index} onClick={() =>
                                                        handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                                                        <p className={`font-[600] text-[13px] ${element && element.result && element.result === "0" ? "text-[#FFFF2E]" : element && element.result && element.result === "1" ? "text-[#ff4500]" : element && element.result && element.result === "2" ? "text-[#FFFF2E]" : "text-[#FFFF2E]"}`}>
                                                            {element && element.result && element.result === "0" ? "R" : element && element.result && element.result === "1" ? "L" : element && element.result && element.result === "2" ? "H" : "-"}
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


export default Anadarbahar
