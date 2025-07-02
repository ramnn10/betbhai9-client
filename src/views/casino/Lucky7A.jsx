/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import useCasinoData from "../../context/useCasinoData";
import CustomReactFlipCounter from "../../component/counter/CustomReactFlipCounter";
import RoundedTabBmx from "../../component/casinoComponent/RoundedTabBmx";
import Loader from "../../component/casinoComponent/Loader";
import ResultModelBmx from "../../component/casinoComponent/ResultModelBmx";
import { apiCall } from "../../config/HTTP";
import CasinoBetPlaceDesktop from "../../component/casinoComponent/CasinoBetPlaceDesktop";
import BetListTableDesktop from "../../component/casinoComponent/BetListTableDesktop";
import CasinoPageheader from "../../component/casinoComponent/CasinoPageheader";
import Lucky7brules from '../../component/casinoComponent/images/lucky7b-rules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import { FaInfoCircle } from "react-icons/fa";
import GameCard from "../../component/casinoComponent/GameCard";
import GameCard2 from "../../component/casinoComponent/GameCard2";
import Card from "../../component/casinoComponent/Card";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";
import ButtonValuesModal from "../buttonvalues/ButtonValuesModal";

function Lucky7A({ eventId }) {
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
        betForSet(data.nation)
        if (scrollTimeout.current) {
            clearInterval(scrollTimeout.current);
        }
        setState(prevState => ({
            ...prevState,
            backBetModal: true,
            betSlipData: { ...data, stake: "0" },
            count: data.rate,

        }));

    };
    const betForSet = (nation) => {
        let value = nation.split(' ')[0];
        if (value === "HIGH") {
            setState(prevState => ({ ...prevState, betFor: "lowHigh" }))
        } else if (value === "LOW") {
            setState(prevState => ({ ...prevState, betFor: "lowHigh" }))
        } else if (value === "Card") {
            setState(prevState => ({ ...prevState, betFor: "cards" }))
        } else if (value === "Red") {
            setState(prevState => ({ ...prevState, betFor: "color" }))
        } else if (value === "Black") {
            setState(prevState => ({ ...prevState, betFor: "color" }))
        } else if (value === "Odd" || value === "Even") {
            setState(prevState => ({ ...prevState, betFor: "oddEven" }))
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
        let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
        let betObject = {
            "roundId": t1.mid,
            "sid": state?.betSlipData?.sid ?? "",
            "rate": (state.count - oddsDifference) + "",
            "amount": Number(state.betSlipData.stake),
            "casinoType": state.shortName ? state.shortName : "lucky7",
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
    let { result } = casinoData
    let LOWCard = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[0] ? casinoData.data.t2[0] : {};
    let HIGHCard = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[1] ? casinoData.data.t2[1] : {};
    let Even = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[2] ? casinoData.data.t2[2] : {};
    let Odd = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[3] ? casinoData.data.t2[3] : {};
    let Red = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[4] ? casinoData.data.t2[4] : {};
    let Black = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[5] ? casinoData.data.t2[5] : {};
    let CardA = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[6] ? casinoData.data.t2[6] : {};
    let Card2 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[7] ? casinoData.data.t2[7] : {};
    let Card3 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[8] ? casinoData.data.t2[8] : {};
    let Card4 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[9] ? casinoData.data.t2[9] : {};
    let Card5 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[10] ? casinoData.data.t2[10] : {};
    let Card6 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[11] ? casinoData.data.t2[11] : {};
    let Card7 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[12] ? casinoData.data.t2[12] : {};
    let Card8 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[13] ? casinoData.data.t2[13] : {};
    let Card9 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[14] ? casinoData.data.t2[14] : {};
    let Card10 = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[15] ? casinoData.data.t2[15] : {};
    let CardJ = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[16] ? casinoData.data.t2[16] : {};
    let CardQ = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[17] ? casinoData.data.t2[17] : {};
    let CardK = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[18] ? casinoData.data.t2[18] : {};
    let t1 = casinoData && casinoData.data && casinoData.data && casinoData.data.t1 && casinoData.data.t1[0] ? casinoData.data.t1[0] : {};

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
                                                    <div className="p-1.5">
                                                        <div className="text-white text-[10px] font-[500] ">CARD</div>
                                                        <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                                    </div>
                                                </div>

                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1.autotime} />
                                                </div>
                                            </div>
                                        </div>


                                        <div className="space-y-1.5">

                                            <div className="py-1 mt-1.5">
                                                <div className="odds-bet py-1 w-full ">
                                                    <div className=" grid grid-cols-5 md:gap-6 text-center lg:px-2.5 px-1.5 w-full">
                                                        <div className="md:col-span-2 col-span-2 w-full">
                                                            <GameCard
                                                                handleBackOpen={handleBackOpen}
                                                                Data={LOWCard}
                                                                Name={LOWCard.nat ? LOWCard.nat : LOWCard.nation ? LOWCard.nation : "LOWCard"}
                                                                section1Ref={section1Ref}
                                                                posArray={posArray}
                                                                oddsDifference={oddsDifference}
                                                            />
                                                        </div>
                                                        <div className="flex justify-center items-center w-full">
                                                            <div className=" flex justify-center items-center p-1 rounded-sm">
                                                                <img src="/images/7.jpg" alt="aaaaaa" className="lg:h-12 lg:w-10 h-13 w-11" />
                                                            </div>
                                                        </div>
                                                        <div className="md:col-span-2 col-span-2 w-full">
                                                            <GameCard
                                                                handleBackOpen={handleBackOpen}
                                                                Data={HIGHCard}
                                                                Name={HIGHCard.nat ? HIGHCard.nat : HIGHCard.nation ? HIGHCard.nation : "HIGHCard"}
                                                                section1Ref={section1Ref}
                                                                posArray={posArray}
                                                                oddsDifference={oddsDifference}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="lg:flex grid grid-cols-2 gap-3">

                                                <div className="w-full odds-bet">
                                                    <div className="w-full grid grid-cols-2 lg:gap-6 gap-2 h-[84px] py-2 text-center lg:px-2.5 px-1.5">
                                                        <GameCard
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Even}
                                                            Name={Even.nat ? Even.nat : Even.nation ? Even.nation : "Even"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                            oddsDifference={oddsDifference}
                                                        />
                                                        <GameCard
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Odd}
                                                            Name={Odd.nat ? Odd.nat : Odd.nation ? Odd.nation : "Odd"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                            oddsDifference={oddsDifference}
                                                        />
                                                    </div>

                                                </div>

                                                <div className=" w-full odds-bet">
                                                    <div className="w-full grid grid-cols-2 lg:gap-6 gap-2 h-[84px] py-2 text-center lg:px-2.5 px-1.5">
                                                        <GameCard2
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Red}
                                                            select={"Red"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                            oddsDifference={oddsDifference}
                                                        />
                                                        <GameCard2
                                                            handleBackOpen={handleBackOpen}
                                                            Data={Black}
                                                            select={"Black"}
                                                            section1Ref={section1Ref}
                                                            posArray={posArray}
                                                            oddsDifference={oddsDifference}
                                                        />

                                                    </div>

                                                </div>

                                            </div>


                                            <div className="odds-bet mt-1">

                                                <div className="p-2 relative lg:hidden flex justify-between items-center">
                                                    <div className="flex justify-center items-center w-full">
                                                        <p className="text-black text-[14px] font-bold py-1">{CardA?.rate ? CardA.rate - oddsDifference : 0}</p>
                                                    </div>

                                                </div>

                                                <div className="w-full page_bg py-10">

                                                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">

                                                        <div className="odds-bet grid grid-cols-3 space-x-2 p-4">
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
                                                        </div>

                                                        <div className="odds-bet grid grid-cols-3 space-x-2 p-4">
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
                                                        </div>

                                                        <div className="odds-bet grid grid-cols-3 space-x-2 p-4">

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
                                                        </div>

                                                        <div className="odds-bet grid grid-cols-3 space-x-2 p-4">

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

                                            </div>

                                            <div className="odds-bet mt-1">

                                                <div className="p-2 relative lg:hidden flex justify-between items-center">
                                                    <div className="flex justify-center items-center w-full">
                                                        <p className="text-black text-[14px] font-bold py-1">{CardA?.rate ? CardA.rate - oddsDifference : 0}</p>
                                                    </div>
                                                </div>

                                                <p className="text-black text-center lg:block hidden text-[14px] font-bold py-1.5">{CardA?.rate ? CardA.rate - oddsDifference : 0}</p>
                                                <div className="w-11/12 py-1 mx-auto grid grid-cols-7 lg:flex justify-center items-center md:space-x-2 space-x-0 gap-2 px-2 text-center ">
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
                                                    <div key={index} onClick={() => handleResultModel(element)} className={`bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700 ${element && element.result && element.result === "0" ? "text-[#08c] bg-[#355e3b]" : element && element.result && element.result === "1" ? "bg-[#355e3b] text-[#ff4500]" : element && element.result && element.result === "2" ? "text-[#FFFF2E] bg-[#355e3b]" : "text-[#FFFF2E] bg-[#355e3b]"}`} >
                                                        <p className="font-[600] text-[13px]">
                                                            {element && element.result && element.result === "0" ? "T" : element && element.result && element.result === "1" ? "L" : element && element.result && element.result === "2" ? "H" : "-"}
                                                        </p>
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


export default Lucky7A
