/* eslint-disable react/prop-types */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import useCasinoData from "../../context/useCasinoData";
import CustomReactFlipCounter from "../../component/counter/CustomReactFlipCounter";
import BetLocked from "../../component/casinoComponent/BetLocked";
import RoundedTabBmx from "../../component/casinoComponent/RoundedTabBmx";
import Loader from "../../component/casinoComponent/Loader";
import ResultModelBmx from "../../component/casinoComponent/ResultModelBmx";
import CasinoBetPlaceDesktop from "../../component/casinoComponent/CasinoBetPlaceDesktop";
import BetListTableDesktop from "../../component/casinoComponent/BetListTableDesktop";
import CasinoPageheader from "../../component/casinoComponent/CasinoPageheader";
import Teenpattiondayrules from '../../component/casinoComponent/images/war.jpg';
import CasinoTab from "../../component/casinoComponent/CasinoTab";
import MobileBetList from "../../component/casinoComponent/MobileBetList";
import { useDispatch } from "react-redux";
import { casinoBetPlaceFunc } from "../../redux/reducers/casino.reducer";
import { BsFillSuitHeartFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill } from "react-icons/bs";
import BetWarButtonMobile from "../../component/casinoComponent/BetWarButtonMobile";
import BetWarButton from "../../component/casinoComponent/BetWarButton";
import MyBetHeader from "../../component/casinoComponent/MyBetHeader";

function CasinoWar({ eventId }) {
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
  const [activeTab4, setActiveTab4] = useState(1)
  const handleWarTabClick = (tab) => {
    setActiveTab4(tab)
  }


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




  const { ResultModel, time, count, backBetModal, LoadingBet, clicked, activeTab } = state;
  const { data, result } = casinoData ? casinoData : {};
  let t1 = data && data.t1 && data.t1[0] ? data.t1[0] : {};

  let Winner1 = data && data.t2 && data.t2[0] ? data.t2[0] : {};
  let Black1 = data && data.t2 && data.t2[1] ? data.t2[1] : {};
  let Red1 = data && data.t2 && data.t2[2] ? data.t2[2] : {};
  let Odd1 = data && data.t2 && data.t2[3] ? data.t2[3] : {};
  let Even1 = data && data.t2 && data.t2[4] ? data.t2[4] : {};
  let Spade1 = data && data.t2 && data.t2[5] ? data.t2[5] : {};
  let Club1 = data && data.t2 && data.t2[6] ? data.t2[6] : {};
  let Heart1 = data && data.t2 && data.t2[7] ? data.t2[7] : {};
  let Diamond1 = data && data.t2 && data.t2[8] ? data.t2[8] : {};

  let Winner2 = data && data.t2 && data.t2[9] ? data.t2[9] : {};
  let Black2 = data && data.t2 && data.t2[10] ? data.t2[10] : {};
  let Red2 = data && data.t2 && data.t2[11] ? data.t2[11] : {};
  let Odd2 = data && data.t2 && data.t2[12] ? data.t2[12] : {};
  let Even2 = data && data.t2 && data.t2[13] ? data.t2[13] : {};
  let Spade2 = data && data.t2 && data.t2[14] ? data.t2[14] : {};
  let Club2 = data && data.t2 && data.t2[15] ? data.t2[15] : {};
  let Heart2 = data && data.t2 && data.t2[16] ? data.t2[16] : {};
  let Diamond2 = data && data.t2 && data.t2[17] ? data.t2[17] : {};

  let Winner3 = data && data.t2 && data.t2[18] ? data.t2[18] : {};
  let Black3 = data && data.t2 && data.t2[19] ? data.t2[19] : {};
  let Red3 = data && data.t2 && data.t2[20] ? data.t2[20] : {};
  let Odd3 = data && data.t2 && data.t2[21] ? data.t2[21] : {};
  let Even3 = data && data.t2 && data.t2[22] ? data.t2[22] : {};
  let Spade3 = data && data.t2 && data.t2[23] ? data.t2[23] : {};
  let Club3 = data && data.t2 && data.t2[24] ? data.t2[24] : {};
  let Heart3 = data && data.t2 && data.t2[25] ? data.t2[25] : {};
  let Diamond3 = data && data.t2 && data.t2[26] ? data.t2[26] : {};

  let Winner4 = data && data.t2 && data.t2[27] ? data.t2[27] : {};
  let Black4 = data && data.t2 && data.t2[28] ? data.t2[28] : {};
  let Red4 = data && data.t2 && data.t2[29] ? data.t2[29] : {};
  let Odd4 = data && data.t2 && data.t2[30] ? data.t2[30] : {};
  let Even4 = data && data.t2 && data.t2[31] ? data.t2[31] : {};
  let Spade4 = data && data.t2 && data.t2[32] ? data.t2[32] : {};
  let Club4 = data && data.t2 && data.t2[33] ? data.t2[33] : {};
  let Heart4 = data && data.t2 && data.t2[34] ? data.t2[34] : {};
  let Diamond4 = data && data.t2 && data.t2[35] ? data.t2[35] : {};

  let Winner5 = data && data.t2 && data.t2[36] ? data.t2[36] : {};
  let Black5 = data && data.t2 && data.t2[37] ? data.t2[37] : {};
  let Red5 = data && data.t2 && data.t2[38] ? data.t2[38] : {};
  let Odd5 = data && data.t2 && data.t2[39] ? data.t2[39] : {};
  let Even5 = data && data.t2 && data.t2[40] ? data.t2[40] : {};
  let Spade5 = data && data.t2 && data.t2[41] ? data.t2[41] : {};
  let Club5 = data && data.t2 && data.t2[42] ? data.t2[42] : {};
  let Heart5 = data && data.t2 && data.t2[43] ? data.t2[43] : {};
  let Diamond5 = data && data.t2 && data.t2[44] ? data.t2[44] : {};

  let Winner6 = data && data.t2 && data.t2[45] ? data.t2[45] : {};
  let Black6 = data && data.t2 && data.t2[46] ? data.t2[46] : {};
  let Red6 = data && data.t2 && data.t2[47] ? data.t2[47] : {};
  let Odd6 = data && data.t2 && data.t2[48] ? data.t2[48] : {};
  let Even6 = data && data.t2 && data.t2[49] ? data.t2[49] : {};
  let Spade6 = data && data.t2 && data.t2[50] ? data.t2[50] : {};
  let Club6 = data && data.t2 && data.t2[51] ? data.t2[51] : {};
  let Heart6 = data && data.t2 && data.t2[52] ? data.t2[52] : {};
  let Diamond6 = data && data.t2 && data.t2[53] ? data.t2[53] : {};


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
                          <div className="p-2 space-y-1">

                            <div className="flex space-x-1">
                              <img src={`/cards/${t1 && t1.C7 ? t1.C7 : 1}.png`} alt="card" className="lg:h-10 h-8 lg:w-8 w-6 border-[1px] border-yellow-300" />
                            </div>

                          </div>
                        </div>
                        <div className="flex justify-end items-end absolute bottom-2 right-1">
                          <CustomReactFlipCounter count={+t1?.autotime} />
                        </div>
                      </div>
                    </div>


                    <div className="">

                      <div className="white-bg lg:block hidden pt-1">

                        <div className="grid grid-cols-10 text-[14px] font-medium light-text divide-x divide-[#c7c8ca]">
                          <div className="col-span-4"></div>
                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-10 w-8" />
                          </div>
                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-10 w-8" />
                          </div>
                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-10 w-8" />
                          </div>
                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C4 ? t1.C4 : 1}.png`} alt="card" className="h-10 w-8" />
                          </div>
                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C5 ? t1.C5 : 1}.png`} alt="card" className="h-10 w-8" />
                          </div>
                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C6 ? t1.C6 : 1}.png`} alt="card" className="h-10 w-8" />
                          </div>
                        </div>

                        <div className="border border-gray-300 divide-y divide-[#c7c8ca]">

                          <div className="grid grid-cols-10 text-[14px] font-[600] darktext divide-x divide-[#c7c8ca]">
                            <div className="col-span-4"></div>
                            <div className="flex justify-center items-center">1</div>
                            <div className="flex justify-center items-center">2</div>
                            <div className="flex justify-center items-center">3</div>
                            <div className="flex justify-center items-center">4</div>
                            <div className="flex justify-center items-center">5</div>
                            <div className="flex justify-center items-center">6</div>
                          </div>

                          <div className="grid grid-cols-10 divide-x divide-y divide-[#c7c8ca]">

                            <div className="col-span-4 divide-y divide-[#c7c8ca]">

                              <div className="h-9 flex justify-start items-center p-2 darktext text-[13px] font-[600]" >
                                Winner
                              </div>

                              <div className="h-9 flex justify-start items-center p-2 space-x-1" >
                                <span className="darktext text-[13px] font-[600]">Black</span>
                                <BsSuitSpadeFill className='text-black' size={19} />
                                <BsSuitClubFill className='text-black' size={19} />

                              </div>

                              <div className="h-9 flex justify-start items-center p-2 space-x-1" >
                                <span className="darktext text-[13px] font-[600]">Red</span>
                                <BsFillSuitHeartFill className='text-[#FF0000]' size={19} />
                                <BsSuitDiamondFill className='text-[#FF0000]' size={19} />

                              </div>

                              <div className="h-9 flex justify-start items-center p-2 darktext text-[13px] font-[600]" >
                                Odd
                              </div>

                              <div className="h-9 flex justify-start items-center p-2 darktext text-[13px] font-[600]" >
                                Even
                              </div>

                              <div className="h-9 flex justify-start items-center p-2" >
                                <BsSuitSpadeFill className='text-black' size={19} />
                              </div>

                              <div className="h-9 flex justify-start items-center p-2" >
                                <BsSuitClubFill className='text-black' size={19} />
                              </div>

                              <div className="h-9 flex justify-start items-center p-2" >
                                <BsFillSuitHeartFill className='text-[#FF0000]' size={19} />
                              </div>

                              <div className="h-9 flex justify-start items-center p-2" >
                                <BsSuitDiamondFill className='text-[#FF0000]' size={19} />
                              </div>

                            </div>

                            <div className="divide-y divide-[#c7c8ca]">
                              <BetWarButton
                                data={Winner1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Winner" />

                              <BetWarButton
                                data={Black1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Black" />

                              <BetWarButton
                                data={Red1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Red"
                              />
                              <BetWarButton
                                data={Odd1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Odd"
                              />
                              <BetWarButton
                                data={Even1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Even"
                              />
                              <BetWarButton
                                data={Spade1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Spade"
                              />
                              <BetWarButton
                                data={Club1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Club"
                              />
                              <BetWarButton
                                data={Heart1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Heart"
                              />
                              <BetWarButton
                                data={Diamond1}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Diamond"
                              />
                            </div>

                            <div className="divide-y divide-[#c7c8ca]">
                              <BetWarButton
                                data={Winner2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Winner" />

                              <BetWarButton
                                data={Black2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Black" />

                              <BetWarButton
                                data={Red2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Red"
                              />
                              <BetWarButton
                                data={Odd2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Odd"
                              />
                              <BetWarButton
                                data={Even2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Even"
                              />
                              <BetWarButton
                                data={Spade2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Spade"
                              />
                              <BetWarButton
                                data={Club2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Club"
                              />
                              <BetWarButton
                                data={Heart2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Heart"
                              />
                              <BetWarButton
                                data={Diamond2}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Diamond"
                              />
                            </div>

                            <div className="divide-y divide-[#c7c8ca]">
                              <BetWarButton
                                data={Winner3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Winner" />

                              <BetWarButton
                                data={Black3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Black" />

                              <BetWarButton
                                data={Red3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Red"
                              />
                              <BetWarButton
                                data={Odd3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Odd"
                              />
                              <BetWarButton
                                data={Even3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Even"
                              />
                              <BetWarButton
                                data={Spade3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Spade"
                              />
                              <BetWarButton
                                data={Club3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Club"
                              />
                              <BetWarButton
                                data={Heart3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Heart"
                              />
                              <BetWarButton
                                data={Diamond3}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Diamond"
                              />
                            </div>

                            <div className="divide-y divide-[#c7c8ca]">
                              <BetWarButton
                                data={Winner4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Winner" />

                              <BetWarButton
                                data={Black4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Black" />

                              <BetWarButton
                                data={Red4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Red"
                              />
                              <BetWarButton
                                data={Odd4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Odd"
                              />
                              <BetWarButton
                                data={Even4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Even"
                              />
                              <BetWarButton
                                data={Spade4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Spade"
                              />
                              <BetWarButton
                                data={Club4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Club"
                              />
                              <BetWarButton
                                data={Heart4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Heart"
                              />
                              <BetWarButton
                                data={Diamond4}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Diamond"
                              />
                            </div>

                            <div className="divide-y divide-[#c7c8ca]">
                              <BetWarButton
                                data={Winner5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Winner" />

                              <BetWarButton
                                data={Black5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Black" />

                              <BetWarButton
                                data={Red5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Red"
                              />
                              <BetWarButton
                                data={Odd5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Odd"
                              />
                              <BetWarButton
                                data={Even5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Even"
                              />
                              <BetWarButton
                                data={Spade5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Spade"
                              />
                              <BetWarButton
                                data={Club5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Club"
                              />
                              <BetWarButton
                                data={Heart5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Heart"
                              />
                              <BetWarButton
                                data={Diamond5}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Diamond"
                              />
                            </div>

                            <div className="divide-y divide-[#c7c8ca]">
                              <BetWarButton
                                data={Winner6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Winner" />

                              <BetWarButton
                                data={Black6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Black" />

                              <BetWarButton
                                data={Red6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Red"
                              />
                              <BetWarButton
                                data={Odd6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Odd"
                              />
                              <BetWarButton
                                data={Even6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Even"
                              />
                              <BetWarButton
                                data={Spade6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Spade"
                              />
                              <BetWarButton
                                data={Club6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Club"
                              />
                              <BetWarButton
                                data={Heart6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Heart"
                              />
                              <BetWarButton
                                data={Diamond6}
                                handleBackOpen={handleBackOpen}
                                section1Ref={section1Ref}
                                name="Diamond"
                              />
                            </div>

                          </div>

                        </div>
                      </div>

                      <div className="white-bg py-1.5 lg:hidden block">

                        <div className="grid grid-cols-6 text-[14px] font-medium light-text divide-x divide-[#c7c8ca]">

                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C1 ? t1.C1 : 1}.png`} alt="card" className="h-7 w-5" />
                          </div>

                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C2 ? t1.C2 : 1}.png`} alt="card" className="h-7 w-5" />
                          </div>

                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C3 ? t1.C3 : 1}.png`} alt="card" className="h-7 w-5" />
                          </div>

                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C4 ? t1.C4 : 1}.png`} alt="card" className="h-7 w-5" />
                          </div>


                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C5 ? t1.C5 : 1}.png`} alt="card" className="h-7 w-5" />
                          </div>

                          <div className="flex justify-center items-center py-1">
                            <img src={`/cards/${t1 && t1.C6 ? t1.C6 : 1}.png`} alt="card" className="h-7 w-5" />
                          </div>

                        </div>

                        <div className="lg:hidden block">
                          <div className="rules-header w-full">
                            <div className="flex justify-between divide-x divide-[#c7c8ca] items-center text-white overflow-y-auto w-full cursor-pointer text-[12px] tracking-wide uppercase font-bold">

                              <div className={`${activeTab4 === 1 ? "" : ""} flex justify-center items-center px-2.5 py-1.5 w-full whitespace-nowrap`} onClick={() => handleWarTabClick(1)}>
                                <span className="flex justify-center items-center ">
                                  1
                                </span>
                              </div>

                              <div className={`${activeTab4 === 2 ? " " : " "} flex justify-center items-center px-2.5 py-1.5 w-full whitespace-nowrap`} onClick={() => handleWarTabClick(2)}>
                                <span className="flex justify-center items-center">
                                  2
                                </span>
                              </div>

                              <div className={`${activeTab4 === 3 ? " " : " "} flex justify-center items-center px-2.5 py-1.5 w-full whitespace-nowrap`} onClick={() => handleWarTabClick(3)}>
                                <span className="flex justify-center items-center ">
                                  3
                                </span>
                              </div>

                              <div className={`${activeTab4 === 4 ? " " : " "} flex justify-center items-center px-2.5 py-1.5 w-full whitespace-nowrap`} onClick={() => handleWarTabClick(4)}>
                                <span className="flex justify-center items-center ">
                                  4
                                </span>
                              </div>

                              <div className={`${activeTab4 === 5 ? " " : " "} flex justify-center items-center px-2.5 py-1.5 w-full whitespace-nowrap`} onClick={() => handleWarTabClick(5)}>
                                <span className="flex justify-center items-center ">
                                  5
                                </span>
                              </div>

                              <div className={`${activeTab4 === 6 ? " " : " "} flex justify-center items-center px-2.5 py-1.5 w-full whitespace-nowrap`} onClick={() => handleWarTabClick(6)}>
                                <span className="flex justify-center items-center ">
                                  6
                                </span>
                              </div>

                            </div>
                          </div>
                        </div>


                        {activeTab4 === 1 ? (

                          <div className="grid grid-cols-2 space-x-1 border border-gray-300">

                            <div className="grid grid-cols-3 ">

                              <div className="col-span-2 divide-y divide-[#c7c8ca] ">
                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Winner1
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Black</span>
                                  <BsSuitSpadeFill className='text-black' size={16} />
                                  <BsSuitClubFill className='text-black' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Red</span>
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={16} />
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Odd1
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Even1
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Winner1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Winner1" />

                                <BetWarButtonMobile
                                  data={Black1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Black1" />

                                <BetWarButtonMobile
                                  data={Red1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Red1"
                                />
                                <BetWarButtonMobile
                                  data={Odd1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Odd1"
                                />
                                <BetWarButtonMobile
                                  data={Even1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Even1"
                                />

                              </div>

                            </div>

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitSpadeFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitClubFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Spade1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Spade1"
                                />
                                <BetWarButtonMobile
                                  data={Club1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Club1"
                                />
                                <BetWarButtonMobile
                                  data={Heart1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Heart1"
                                />
                                <BetWarButtonMobile
                                  data={Diamond1}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Diamond1"
                                />
                              </div>

                            </div>

                          </div>

                        ) : null}


                        {activeTab4 === 2 ? (

                          <div className="grid grid-cols-2 space-x-1 border border-gray-300">

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Winner2
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Black</span>
                                  <BsSuitSpadeFill className='text-black' size={16} />
                                  <BsSuitClubFill className='text-black' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Red</span>
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={16} />
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Odd2
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Even2
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Winner2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Winner2" />

                                <BetWarButtonMobile
                                  data={Black2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Black2" />

                                <BetWarButtonMobile
                                  data={Red2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Red2"
                                />
                                <BetWarButtonMobile
                                  data={Odd2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Odd2"
                                />
                                <BetWarButtonMobile
                                  data={Even2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Even2"
                                />

                              </div>

                            </div>

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitSpadeFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitClubFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Spade2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Spade2"
                                />
                                <BetWarButtonMobile
                                  data={Club2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Club2"
                                />
                                <BetWarButtonMobile
                                  data={Heart2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Heart2"
                                />
                                <BetWarButtonMobile
                                  data={Diamond2}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Diamond2"
                                />
                              </div>

                            </div>

                          </div>

                        ) : null}


                        {activeTab4 === 3 ? (

                          <div className="grid grid-cols-2 space-x-1 border border-gray-300">

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Winner3
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Black</span>
                                  <BsSuitSpadeFill className='text-black' size={16} />
                                  <BsSuitClubFill className='text-black' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Red</span>
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={16} />
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Odd3
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Even3
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Winner3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Winner3" />

                                <BetWarButtonMobile
                                  data={Black3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Black3" />

                                <BetWarButtonMobile
                                  data={Red3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Red3"
                                />
                                <BetWarButtonMobile
                                  data={Odd3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Odd3"
                                />
                                <BetWarButtonMobile
                                  data={Even3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Even3"
                                />

                              </div>

                            </div>

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitSpadeFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitClubFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Spade3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Spade3"
                                />
                                <BetWarButtonMobile
                                  data={Club3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Club3"
                                />
                                <BetWarButtonMobile
                                  data={Heart3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Heart3"
                                />
                                <BetWarButtonMobile
                                  data={Diamond3}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Diamond3"
                                />
                              </div>

                            </div>

                          </div>

                        ) : null}


                        {activeTab4 === 4 ? (

                          <div className="grid grid-cols-2 space-x-1 border border-gray-300">

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Winner4
                                </div>
                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Black</span>
                                  <BsSuitSpadeFill className='text-black' size={16} />
                                  <BsSuitClubFill className='text-black' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Red</span>
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={16} />
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Odd4
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Even4
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Winner4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Winner4" />

                                <BetWarButtonMobile
                                  data={Black4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Black4" />

                                <BetWarButtonMobile
                                  data={Red4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Red4"
                                />
                                <BetWarButtonMobile
                                  data={Odd4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Odd4"
                                />
                                <BetWarButtonMobile
                                  data={Even4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Even4"
                                />

                              </div>

                            </div>

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitSpadeFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitClubFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Spade4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Spade4"
                                />
                                <BetWarButtonMobile
                                  data={Club4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Club4"
                                />
                                <BetWarButtonMobile
                                  data={Heart4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Heart4"
                                />
                                <BetWarButtonMobile
                                  data={Diamond4}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Diamond4"
                                />
                              </div>

                            </div>

                          </div>

                        ) : null}


                        {activeTab4 === 5 ? (

                          <div className="grid grid-cols-2 space-x-1 border border-gray-300">

                            <div className="grid grid-cols-3">
                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Winner5
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Black</span>
                                  <BsSuitSpadeFill className='text-black' size={16} />
                                  <BsSuitClubFill className='text-black' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Red</span>
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={16} />
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Odd5
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Even5
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Winner5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Winner5" />

                                <BetWarButtonMobile
                                  data={Black5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Black5" />

                                <BetWarButtonMobile
                                  data={Red5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Red5"
                                />
                                <BetWarButtonMobile
                                  data={Odd5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Odd5"
                                />
                                <BetWarButtonMobile
                                  data={Even5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Even5"
                                />

                              </div>

                            </div>

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitSpadeFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitClubFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Spade5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Spade5"
                                />
                                <BetWarButtonMobile
                                  data={Club5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Club5"
                                />
                                <BetWarButtonMobile
                                  data={Heart5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Heart5"
                                />
                                <BetWarButtonMobile
                                  data={Diamond5}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Diamond5"
                                />
                              </div>

                            </div>

                          </div>

                        ) : null}


                        {activeTab4 === 6 ? (

                          <div className="grid grid-cols-2 space-x-1 border border-gray-300">

                            <div className="grid grid-cols-3">
                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Winner6
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Black</span>
                                  <BsSuitSpadeFill className='text-black' size={16} />
                                  <BsSuitClubFill className='text-black' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 space-x-1 " >
                                  <span className="text-[13px] font-[600] darktext tracking-wide">Red</span>
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={16} />
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={16} />

                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Odd6
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 darktext tracking-wide text-[13px] font-[600]" >
                                  Even6
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Winner6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Winner6" />

                                <BetWarButtonMobile
                                  data={Black6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Black6" />

                                <BetWarButtonMobile
                                  data={Red6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Red6"
                                />
                                <BetWarButtonMobile
                                  data={Odd6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Odd6"
                                />
                                <BetWarButtonMobile
                                  data={Even6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Even6"
                                />

                              </div>

                            </div>

                            <div className="grid grid-cols-3">

                              <div className="col-span-2 divide-y divide-[#c7c8ca]">
                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitSpadeFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitClubFill className='text-black' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                </div>

                                <div className="h-10 flex justify-start items-center p-2 " >
                                  <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                </div>

                              </div>

                              <div className="divide-y divide-[#c7c8ca]">

                                <BetWarButtonMobile
                                  data={Spade6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Spade6"
                                />
                                <BetWarButtonMobile
                                  data={Club6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Club6"
                                />
                                <BetWarButtonMobile
                                  data={Heart6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Heart6"
                                />
                                <BetWarButtonMobile
                                  data={Diamond6}
                                  handleBackOpen={handleBackOpen}
                                  section1Ref={section1Ref}
                                  name="Diamond6"
                                />
                              </div>

                            </div>

                          </div>

                        ) : null}


                      </div>

                    </div>

                    <div className=" pb-20 bg-black/5 mt-0.5">
                      <RoundedTabBmx />
                      <div className="flex space-x-2 justify-end items-center py-1.5 px-2">
                        {result && result.length > 0 ? result.map((element, index) => (
                          <div key={index} onClick={() => handleResultModel(element)} className={`bg-[var(--result-color)] w-7 h-7 cursor-pointer flex justify-center items-center rounded-full shadow-md border border-gray-700 ${element?.result === "0" ? "bg-[#355e3b] text-[#FFF523]" : element?.result === "11" ? "text-[#F75500] bg-[#355e3b]" : element?.result === "21" ? "text-[#FFF523] bg-[#355e3b]" : "text-[#000]"}`}>
                            <p className="text-[#FFF523] font-[700] text-[13px]">R</p>

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


export default CasinoWar;