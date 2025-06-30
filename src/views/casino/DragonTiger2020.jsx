/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import useCasinoData from "../../context/useCasinoData";
import CustomReactFlipCounter from "../../component/counter/CustomReactFlipCounter";
import BetLocked from "../../component/casinoComponent/BetLocked";
import RoundedTabBmx from "../../component/casinoComponent/RoundedTabBmx";
import Loader from "../../component/casinoComponent/Loader";
import ResultModelBmx from "../../component/casinoComponent/ResultModelBmx";
import CasinoBetPlaceDesktop from "../../component/casinoComponent/CasinoBetPlaceDesktop";
import BetListTableDesktop from "../../component/casinoComponent/BetListTableDesktop";
import CasinoPageheader from "../../component/casinoComponent/CasinoPageheader";
import Teenpattiondayrules from '../../component/casinoComponent/images/tponeday-rules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import useCasinoSatetFunc from "../../context/useCasinoSatetFunc";
import CasinoGameCard from "../../component/casinoComponent/CasinoGameCard";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";

function DragonTiger2020({ eventId }) {
    const { casinoDetails, casinoData, showLoader, socketURL, tvUrl, cacheURL, betStatus, cashinoStatus, minStake, maxStake, name, betList, totalProfitLoss, posArray, currentRoundId, shortName, setting, oddsDifference, } = useCasinoData(eventId)
    const section1Ref = useRef(null);
    const { state, handleTvScreen, increaseCount, decreaseCount, handleBackOpen, handleResultModel, updateStake, placeBet, inputChange, handleClose, handleCloseResult, handleTabClick, updateStackOnClick, setState, } = useCasinoSatetFunc(casinoData, eventId);

    const { ResultModel, time, count, backBetModal, LoadingBet, clicked, activeTab } = state;
    let { data, result } = casinoData ? casinoData : {};
    let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};
    let Dragon = data && data.t2 && data.t2[0] ? data.t2[0] : {};
    let Tiger = data && data.t2 && data.t2[2] ? data.t2[1] : {};
    let Tie = data && data.t2 && data.t2[2] ? data.t2[2] : {};

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
                                            {/* <div className=" flex justify-between">
                                                <div className="absolute top-0 left-0 w-full">
                                                    <div className="w-full p-1 space-y-1">
                                                        <div className="text-white font-semibold px-1 tracking-wide uppercase text-[14px]">Player A</div>
                                                        <div>
                                                            <div className="flex space-x-1 justify-start">
                                                                <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                                                <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                                                <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="text-white font-semibold px-1 tracking-wide uppercase text-[14px]">Player B</div>
                                                            <div className="flex space-x-1 justify-start">
                                                                <img src={`/cards/${t2 && t2.C1 ? t2.C1 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                                                <img src={`/cards/${t2 && t2.C2 ? t2.C2 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                                                <img src={`/cards/${t2 && t2.C3 ? t2.C3 : 1}.png`} alt="card" className="h-8 w-7 border-[1px] border-yellow-300" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-end absolute bottom-2 right-1">
                                                    <CustomReactFlipCounter count={+t1?.lasttime} />
                                                </div>
                                            </div> */}
                                            <div className="absolute top-0 left-0">

                                                <div className="flex space-x-1 p-1.5">
                                                    <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="lg:h-12 h-8 lg:w-10 w-6 border-[1px] border-yellow-300" />
                                                    <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="lg:h-12 h-8 lg:w-10 w-6 border-[1px] border-yellow-300" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="border border-gray-300 grey-color white-text divide-y ">
                                            <div className="grid lg:grid-cols-6 grid-cols-4 text-center darktext font-[600] lg:text-[16px] text-[14px] capitalize divide-x">
                                                <div className="lg:col-span-4 col-span-2 w-full flex justify-start white-text items-center px-[6px] py-1"></div>
                                                <div className="w-full flex justify-center items-center light-blue py-1">Back</div>
                                                <div className="w-full flex justify-center items-center odds-khaii py-1">Lay</div>
                                            </div>
                                            <div className="w-full text-center grey-color">
                                                <div className="grid lg:grid-cols-6 grid-cols-4 divide-x">
                                                    <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 lg:col-span-4 col-span-2 w-full text-left">
                                                        <div>{PlayerA && PlayerA.nat ? PlayerA.nat : PlayerA.nation ? PlayerA.nation : "Player A"}</div>
                                                        <div className={`${posArray[PlayerA.sectionId] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[PlayerA.sectionId]}</div>
                                                    </div>
                                                    <div className="flex justify-end items-center divide-x w-full">
                                                        {PlayerA && PlayerA.gstatus === 'ACTIVE' && PlayerA.b1 != 0 ?
                                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PlayerA, type: "Yes", odds: PlayerA.b1, nat: PlayerA.nat ? PlayerA.nat : PlayerA.nation, type: "Yes" }, section1Ref)}>
                                                                <div className="bg-matchLagai text-center py-2" >
                                                                    <span className="lg:text-[16px] text-[14px] darktext font-[600]">
                                                                        {(parseFloat(PlayerA && PlayerA.b1 ? (PlayerA.b1) / 100 + 1 : "0")).toFixed(2).replace(/\.?0+$/, "")}
                                                                    </span><br />
                                                                </div>
                                                            </div> :
                                                            <div className="w-full light-blue cursor-pointer " >
                                                                <div className=" text-center py-2 relative bg-matchLagai dark-text">
                                                                    <span className="lg:text-[16px] text-[14px] darktext font-[600]">
                                                                        {(parseFloat(PlayerA && PlayerA.b1 ? (PlayerA.b1) / 100 + 1 : "0")).toFixed(2).replace(/\.?0+$/, "")}
                                                                    </span><br />
                                                                    <BetLocked />
                                                                </div>
                                                            </div>}
                                                    </div>
                                                    <div className="flex justify-end items-center divide-x w-full">
                                                        {PlayerA && PlayerA.gstatus === 'ACTIVE' && PlayerA.l1 != 0 ?
                                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: PlayerA, type: "Yes", odds: PlayerA.l1, nat: PlayerA.nat ? PlayerA.nat : PlayerA.nation, type: "No" }, section1Ref)}>
                                                                <div className=" bg-matchKhai text-center py-2" >
                                                                    <span className="lg:text-[16px] text-[14px] darktext font-[600]">
                                                                        {(parseFloat(PlayerA && PlayerA.l1 ? (PlayerA.l1) / 100 + 1 : "0")).toFixed(2).replace(/\.?0+$/, "")}
                                                                    </span><br />
                                                                </div>
                                                            </div> :
                                                            <div className="w-full odds-khaii cursor-pointer " >
                                                                <div className=" text-center py-2 relative bg-matchKhai dark-text">
                                                                    <span className="lg:text-[16px] text-[14px] darktext font-[600]">
                                                                        {(parseFloat(PlayerA && PlayerA.l1 ? (PlayerA.l1) / 100 + 1 : "0")).toFixed(2).replace(/\.?0+$/, "")}
                                                                    </span><br />
                                                                    <BetLocked />
                                                                </div>
                                                            </div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full text-center grey-color">
                                                <div className="grid lg:grid-cols-6 grid-cols-4 divide-x">
                                                    <div className="h-full lg:text-[16px] text-[14px] capitalize darktext font-[600] px-2 lg:col-span-4 col-span-2 w-full text-left">
                                                        <div>{PlayerB && PlayerB.nat ? PlayerB.nat : PlayerB.nation ? PlayerB.nation : "Player B"} </div>
                                                        <div className={`${posArray[PlayerB.sectionId] < 0 ? "text-red-500" : "text-green-800"}`} > {posArray[PlayerB.sectionId]}</div>
                                                    </div>
                                                    <div className="flex justify-end items-center w-full">
                                                        {PlayerB && PlayerB.gstatus === 'ACTIVE' && PlayerB.b1 !== "0.00" ?
                                                            <div className="w-full light-blue cursor-pointer " onClick={() => handleBackOpen({ data: PlayerB, type: "Yes", odds: PlayerB.b1, nat: PlayerB.nat ? PlayerB.nat : PlayerB.nation, type: "Yes" }, section1Ref)}>
                                                                <div className=" bg-matchLagai text-center py-2" >
                                                                    <span className="lg:text-[16px] text-[14px] darktext font-[600]">
                                                                        {(parseFloat(PlayerB && PlayerB.b1 ? (PlayerB.b1) / 100 + 1 : "0")).toFixed(2).replace(/\.?0+$/, "")}
                                                                    </span><br />
                                                                </div>
                                                            </div> :
                                                            <div className="w-full light-blue cursor-pointer " >
                                                                <div className=" text-center py-2 relative bg-matchLagai dark-text">
                                                                    <span className="lg:text-[16px] text-[14px] darktext font-[600]">
                                                                        {(parseFloat(PlayerB && PlayerB.b1 ? (PlayerB.b1) / 100 + 1 : "0")).toFixed(2).replace(/\.?0+$/, "")}
                                                                    </span><br />
                                                                    <BetLocked />
                                                                </div>
                                                            </div>}
                                                    </div>
                                                    <div className="flex justify-end items-center w-full">
                                                        {PlayerB && PlayerB.gstatus === 'ACTIVE' && PlayerB.l1 !== "0.00" ?
                                                            <div className="w-full odds-khaii cursor-pointer " onClick={() => handleBackOpen({ data: PlayerB, type: "Yes", odds: PlayerB.l1, nat: PlayerB.nat ? PlayerB.nat : PlayerB.nation, type: "No" }, section1Ref)}>
                                                                <div className=" text-center bg-matchKhai py-2" >
                                                                    <span className="lg:text-[16px] text-[14px] darktext font-[600]">
                                                                        {(parseFloat(PlayerB && PlayerB.l1 ? (PlayerB.l1) / 100 + 1 : "0")).toFixed(2).replace(/\.?0+$/, "")}
                                                                    </span><br />
                                                                </div>
                                                            </div> :
                                                            <div className="w-full odds-khaii cursor-pointer " >
                                                                <div className=" text-center py-2 relative bg-matchKhai dark-text">
                                                                    <span className="lg:text-[16px] text-[14px] darktext font-[600]">
                                                                        {(parseFloat(PlayerB && PlayerB.l1 ? (PlayerB.l1) / 100 + 1 : "0")).toFixed(2).replace(/\.?0+$/, "")}
                                                                    </span><br />
                                                                    <BetLocked />
                                                                </div>
                                                            </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="odds-bet w-full p-2 my-2.5">
                                            <div className="flex space-x-4">
                                                <CasinoGameCard
                                                    handleBackOpen={handleBackOpen}
                                                    Data={Dragon}
                                                    Name={Dragon.nat ? Dragon.nat : Dragon.nation ? Dragon.nation : "Dragon"}
                                                    section1Ref={section1Ref}
                                                    posArray={posArray}
                                                    oddsDifference={oddsDifference}
                                                />
                                                <CasinoGameCard
                                                    handleBackOpen={handleBackOpen}
                                                    Data={Tie}
                                                    Name={Tie.nat ? Tie.nat : Tie.nation ? Tie.nation : "Tie"}
                                                    section1Ref={section1Ref}
                                                    posArray={posArray}
                                                    oddsDifference={oddsDifference}
                                                />
                                                <CasinoGameCard
                                                    handleBackOpen={handleBackOpen}
                                                    Data={Tiger}
                                                    Name={Tiger.nat ? Tiger.nat : Tiger.nation ? Tiger.nation : "Tiger"}
                                                    section1Ref={section1Ref}
                                                    posArray={posArray}
                                                    oddsDifference={oddsDifference}
                                                />
                                            </div>
                                            {/* <div className="flex justify-end items-center font-normal lg:text-[14px] text-[10px] black-text px-2.5">
                          <span className="font-[500]">MIN</span>:{minStake} <span className="font-[500]">&nbsp; MAX</span>:{maxStake}
                        </div> */}
                                        </div>


                                        <div className=" pb-20 bg-black/5 mt-0.5">
                                            <RoundedTabBmx />
                                            <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                                                {result && result.length > 0 ? result.map((element, index) => (
                                                    <div key={index} onClick={() => handleResultModel(element)} className="bg-result-color w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
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


export default DragonTiger2020
