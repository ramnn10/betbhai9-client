/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";
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
import Teenpattiondayrules from '../../component/casinoComponent/images/lucky7b-rules.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import BetPlayerName from "../../component/casinoComponent/BetPlayerName";
import BetButtonCards from "../../component/casinoComponent/BetButtonCards";
import BetButton from "../../component/casinoComponent/BetButton";
import Poker6PlayerCardButton from "../../component/casinoComponent/Poker6PlayerCardButton";
import Poker6PlayerBetButton from "../../component/casinoComponent/Poker6PlayerBetButton";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import Cards3J from "../../component/casinoComponent/Card3J";

function Card3Judgement({ eventId }) {
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


  const [select3Cards, setSelect3Cards] = useState([]);



  const handleCardSelect = useCallback((card) => {
    setSelect3Cards((prevSelect3Cards) => {
      const updatedSelect3Cards = [...prevSelect3Cards];
      const cardIndex = updatedSelect3Cards.findIndex((selectedCard) => selectedCard.num === card.num);
      if (cardIndex === -1 && updatedSelect3Cards.length < 3) {
        updatedSelect3Cards.push(card);
      }
      if (updatedSelect3Cards.length === 3) {
        handleBackOpen(updatedSelect3Cards);
      }
      return updatedSelect3Cards;
    });
  }, []);

  const handleBackOpen = (selectedCards) => {
    if (selectedCards.length !== 3) {
      return;
    }
    const betSlipDataArray = selectedCards.map((card) => ({
      nat: [card.nat, ...card.betFor],
      stake: '0',
      rate: card.rate,
      betFor: card.betFor,
      Data: card.Data,
      sid: card.sid,
      type: card.type,
    }));
    if (betSlipDataArray) {
      setState((prevState) => ({
        ...prevState,
        backBetModal: true,
        betSlipData: betSlipDataArray[0],
        count: betSlipDataArray[0].rate,
        select3Cards: [],
      }));
    }
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
      "casinoType": state.shortName ? state.shortName : "card32eu",
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
  const { data, result } = casinoData ? casinoData : {};
  let t1 = casinoData && casinoData.data && casinoData.data && casinoData.data.t1 && casinoData.data.t1[0] ? casinoData.data.t1[0] : {};
  let LOWCard = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[0] ? casinoData.data.t2[0] : {};
  let HIGHCard = casinoData && casinoData.data && casinoData.data && casinoData.data.t2 && casinoData.data.t2[1] ? casinoData.data.t2[1] : {};
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
                          <div className="p-1.5 flex justify-start items-center space-x-1">
                            <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-10 w-8 border-[1px] border-yellow-300" />
                            <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-10 w-8 border-[1px] border-yellow-300" />
                            <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-10 w-8 border-[1px] border-yellow-300" />
                            {/* <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-10 w-8 border-[1px] border-yellow-300" />
                              <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-10 w-8 border-[1px] border-yellow-300" /> */}

                          </div>
                        </div>


                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="mt-1.5 border-[1px] border-black">

                      <div className="light-blue lg:flex lg:divide-x divide-black border-b-[1px] border-black">

                        <div className="lg:w-[10%] w-full text-[14px] lg:border-none border-b-[1px] border-black font-[600] darktext flex justify-center items-center">
                          {/* {LOWCard.nat ? LOWCard.nat : "LOWCard"} */}
                          Yes
                        </div>

                        <div className="lg:w-[90%] w-full py-2 mx-auto lg:flex justify-center items-center grid md:grid-cols-7 grid-cols-5 md:space-x-2 space-x-0 gap-2 px-2 text-center ">

                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"1"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"2"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"3"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"4"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"5"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"6"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"7"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"8"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"9"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"10"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"11"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"12"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={LOWCard}
                            num={"13"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                        </div>
                        {LOWCard && LOWCard.gstatus === '0' ? <BetLocked /> : null}

                      </div>

                      <div className="odds-khaii lg:flex lg:divide-x divide-black border-t-[1px] border-b-[1px] border-black">

                        <div className="lg:w-[10%] w-full text-[14px] lg:border-none border-b-[1px] border-black font-[600] darktext flex justify-center items-center">
                          {/* {HIGHCard.nat ? HIGHCard.nat : "HIGHCard"} */}
                          No
                        </div>

                        <div className="lg:w-[90%] w-11/12 py-2 mx-auto lg:flex justify-center items-center grid md:grid-cols-7 grid-cols-5 md:space-x-2 space-x-0 gap-2 px-2 text-center ">
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"1"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"2"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"3"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"4"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"5"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"6"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"7"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"8"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"9"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"10"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"11"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"12"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                          <Cards3J
                            handleBackOpen={handleBackOpen}
                            handleCardSelect={handleCardSelect}
                            Data={HIGHCard}
                            num={"13"}
                            section1Ref={section1Ref}
                            posArray={posArray}
                          />
                        </div>

                        {HIGHCard && HIGHCard.gstatus === '0' ? <BetLocked /> : null}

                        {/* {Data && Data.gstatus === "0" ? null : <BetLockedRounded />} */}
                      </div>

                    </div>

                    <marquee className="text-[#097c93] font-bold text-[12px] py-1">
                      Select any 3 card and you will win if you will get at least 1 card from the 3 cards you have selected. | Select any 3 card and you will win If you do not get any card from the 3 cards you have selected.
                    </marquee>



                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className="bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700" >
                            <p className={`font-[600] text-[13px] ${element && element.result && element.result === "0" ? "text-[#FFFF2E]" : element && element.result && element.result === "1" ? "text-[#FFFF2E]" : element && element.result && element.result === "2" ? "text-[#FFFF2E]" : "text-[#FFFF2E]"}`}>
                              {element && element.result && element.result === "0" ? "R" : element && element.result && element.result === "1" ? "R" : element && element.result && element.result === "2" ? "R" : "-"}
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
                    <div className="bg-[var(--secondary)] text-white text-[14px] px-2 py-[6px] rounded-t-[4px] ">
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


export default Card3Judgement
