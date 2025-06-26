/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react'
import { FaAngleDown, FaAngleUp, FaCircle } from 'react-icons/fa';



export const betChipsData = {
  "1000": 1000,
  "2000": 2000,
  "5000": 5000,
  "10000": 10000,
  "20000": 20000,
  "50000": 50000,
  "100000": 100000,
  "250000": 250000,
};


export function BetPlaceDesktop(props) {
  let { openBets, matchName, betSlipData, placeBet, count, betLoading, increaseCount, decreaseCount, errorMessage, successMessage, handleButtonValues } = props;




  const betchipdata = localStorage.getItem("clientbetChipsData") ? Object.values(JSON.parse(localStorage.getItem("clientbetChipsData"))) : "";



  const myArray = Object.values(betChipsData);
  const modalRef = useRef();
  const [positions, setPositionData] = useState(0);


  useEffect(() => {
    if (betSlipData && betSlipData.position && betSlipData.position.length > 0) {
      betSlipData && betSlipData.position.forEach((eles) => {
        if (betSlipData.selectionId == eles._id) {
          setPositionData(eles.position);
        }
      });
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // handleClose(); // Close modal when clicking outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [betSlipData]);


  const [stake, setStack] = useState(0);
  let [placeButton, setPlaceButton] = useState(false)

  const updateInputValue = (event) => {
    const newValue = parseFloat(event.target.value);
    setStack(() => {
      const newStack = !isNaN(newValue) ? (newValue >= 0 ? newValue : 0) : 0;
      betSlipData.stake = newStack;
      if (betSlipData.stake > 0) {
        setPlaceButton(true);
      }
      if (betSlipData.stake <= 0) {
        setPlaceButton(false);
      }
      updateOddsPostModal()
      return newStack;
    });
  };

  // prevStack +
  const updateFinalBalance = (amount) => setStack(prevStack => {
    const newStack = Number(amount)
    betSlipData.stake = newStack;
    if (betSlipData.stake > 0) {
      setPlaceButton(true);
    }
    if (betSlipData.stake <= 0) {
      setPlaceButton(false);
    }
    return newStack
  });


  if (betSlipData.oddsType == "fancy") {
    // filterdata = runCount.session.filter(session => session.Selection_id == betSlipData.data.Selection_id);
  }

  if (betSlipData.oddsType == "bookmaker") {
    // filterdata = runCount.team_data.filter(session => session.selectionid == betSlipData.data.selectionid);

  }


  const arrayData = (element, isPlus = false) => {
    if (element > 0) {
      if (isPlus) {
        updateFinalBalance(betSlipData.stake + element);
      } else {
        updateFinalBalance(element);
      }
      updateOddsPostModal();
    }
  };


  // const arrayData = (element) => {
  //   if (element > 0) {
  //     updateFinalBalance(element);
  //     updateOddsPostModal()
  //   }
  // };

  const updateOddsPostModal = async () => {

    let oddsType = betSlipData?.oddsType
    let positionArray = {}
    let positionArrayNew = {}



    if (oddsType == "Match Odds" || oddsType == "Tied Match") {
      betSlipData?.nameOther?.map((oddsData) => {

        if (oddsData.selectionId == betSlipData.selectionId && betSlipData.betType == "L") {
          positionArray[oddsData.selectionId] = betSlipData.stake * (betSlipData.odds - 1)
        }
        if (oddsData.selectionId == betSlipData.selectionId && betSlipData.betType == "K") {
          positionArray[oddsData.selectionId] = -1 * betSlipData.stake * (betSlipData.odds - 1)
        }
        if (oddsData.selectionId != betSlipData.selectionId && betSlipData.betType == "L") {
          positionArray[oddsData.selectionId] = -1 * betSlipData.stake
        }
        if (oddsData.selectionId != betSlipData.selectionId && betSlipData.betType == "K") {
          positionArray[oddsData.selectionId] = betSlipData.stake
        }

        let currentPos = betSlipData.position[oddsData.selectionId] ? betSlipData.position[oddsData.selectionId] : 0
        let calculatePos = positionArray[oddsData.selectionId]




        positionArray[oddsData.selectionId] = Number(calculatePos) + Number(currentPos)
        positionArrayNew[oddsData.selectionId] = Number(calculatePos)

      })
    }

    if (oddsType == "toss" || oddsType == "bookmaker") {
      betSlipData?.nameOther.map((oddsData) => {

        if (oddsData.selectionid == betSlipData.selectionId && betSlipData.betType == "L") {
          positionArray[oddsData.selectionid] = betSlipData.stake * (betSlipData.odds)
        }
        if (oddsData.selectionid == betSlipData.selectionId && betSlipData.betType == "K") {
          positionArray[oddsData.selectionid] = -1 * betSlipData.stake * (betSlipData.odds)
        }
        if (oddsData.selectionid != betSlipData.selectionId && betSlipData.betType == "L") {
          positionArray[oddsData.selectionid] = -1 * betSlipData.stake
        }
        if (oddsData.selectionid != betSlipData.selectionId && betSlipData.betType == "K") {
          positionArray[oddsData.selectionid] = betSlipData.stake
        }

        let currentPos = betSlipData.position[oddsData.selectionid] ? betSlipData.position[oddsData.selectionid] : 0
        let calculatePos = positionArray[oddsData.selectionid]



        positionArray[oddsData.selectionid] = Number(calculatePos) + Number(currentPos)
        positionArrayNew[oddsData.selectionid] = Number(calculatePos)

      })
    }


    betSlipData.oldPos = betSlipData.position
    betSlipData.position = positionArray

  }

  const handleClear = () => {
    setStack(0);
    betSlipData.stake = 0;
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K'; // Convert to '1K', '2.5K' etc.
    }
    return num; // Return the number as is if it's less than 1000
  };

  return (
    <div ref={modalRef} className={`md:block hidden relative w-100 overflow-x-auto overflow-y-auto  `}>
      {/* <strong className="flex justify-between  px-1 text-white py-1"> <span>Bet Slip</span> <a target="_blank" href="/admin/profile" class="button hover:text-white hover:underline" >Edit Bet Sizes</a></strong> */}
      <table className="table-auto bg-gray-300  text-sm w-full table">
        <thead>
          <tr className='text-sm font-[800] py-1'>
            <th className='text-left px-1 py-1'>(Bet for)</th>
            <th width='10%'>Odds</th>
            <th>Stake</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody className={`${betSlipData.betType === "Y" || betSlipData.betType === "L" ? "!bg-[var(--matchLagai)]" : "bg-[var(--matchKhai)]"} my-2`}>
          <tr className={`border-b border-[#c7c8ca]`}>
            <td className='text-left px-1 py-2 font-[700]'>{betSlipData.name}</td>
            <td width="10%" >
              <div className="relative flex items-center">
                <input
                  type="text"
                  readOnly
                  className="w-16 pr-6 text-center bg-white border border-gray-300 rounded-sm h-[25px] focus:outline-none"
                  id="exampleFormControlInput1"
                  value={
                    betSlipData.oddsType === "fancy" ||
                      betSlipData.oddsType === "bookmaker" ||
                      betSlipData.oddsType === "toss"
                      ? (count * 100).toFixed(2).replace(/\.00$/, '')
                      : count
                  }
                />

                <div className="absolute px-[3px] right-0 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center -space-y-[3px] h-[25px] bg-[#CCCCCC]">
                  <div onClick={increaseCount} className="cursor-pointer leading-none">
                    <FaAngleUp size={14} />
                  </div>
                  <div onClick={decreaseCount} className="cursor-pointer leading-none">
                    <FaAngleDown size={14} />
                  </div>
                </div>
              </div>
            </td>
            <td width="10%">
              <div className="stake">
                <input type="text" className='w-16 py-[2px] text-center bg-white text-black'
                  id="exampleFormControlInput1"
                  value={betSlipData.stake ? betSlipData.stake : ""}
                  onChange={updateInputValue} />
              </div></td>
            <td className='text-right '>
              {Array.isArray(betSlipData?.nameOther) && betSlipData.nameOther.length <= 3 ? betSlipData.nameOther.map((other, index) => (
                <React.Fragment key={index}>
                  <div className="text-sm font-bold pr-2">
                    {betSlipData.oddsType == "Match Odds" || betSlipData.oddsType == "Tied Match" ?
                      <span className={`${!isNaN(betSlipData.position[other.selectionId]) && parseFloat(betSlipData.position[other.selectionId]).toFixed(2).replace(/\.?0+$/, "") < 0 ? "text-red-500" : "text-green-700"} font-bold col-12 text-center`}>
                        {(!isNaN(betSlipData.position[other.selectionId]) ? parseFloat(betSlipData.position[other.selectionId]).toFixed(2).replace(/\.?0+$/, "") : "")}
                      </span>
                      : betSlipData.oddsType == "fancy" ? (
                        null
                      ) :
                        <span className={`${!isNaN(betSlipData.position[other.selectionid]) && parseFloat(betSlipData.position[other.selectionid]).toFixed(2).replace(/\.?0+$/, "") < 0 ? "text-red-500" : "text-green-700"} font-bold col-12 text-center`}>
                          {(!isNaN(betSlipData.position[other.selectionid]) ? parseFloat(betSlipData.position[other.selectionid]).toFixed(2).replace(/\.?0+$/, "") : "")}
                        </span>
                    }
                  </div>
                </React.Fragment>
              )) :
                null
              }</td>
          </tr>
          <tr className="">
            <td colSpan={4}>
              <table className="table-auto text-sm w-full !border-0">
                <tbody>
                  {/* <tr className='grid grid-cols-4 gap-1 py-1 items-center !border-0'>
                    {betChipsLocalStorage?.stakeList?.map((item, index) => {
                      const key = Object.keys(item)[0];
                      const value = item[key];
                      return (
                        <td key={index} className="flex py-2 justify-center items-center bg-[#CCCCCC] !border-0 " onClick={() => arrayData(value)}>
                          <span className='text-gray-700 text-md font-light'>{value}</span>
                        </td>
                      )
                    })}
                    {myArray && myArray.map((element, index) => (
                      <td key={index} className="flex justify-center items-center bg-[#CCCCCC] border rounded" onClick={() => arrayData(element)}>
                        <span className='text-gray-700 text-md font-light'>{formatNumber(element)}</span>
                      </td>
                    ))}
                  </tr> */}

                  <tr className='grid grid-cols-4 gap-[3px] py-1 items-center !border-0 px-1'>
                    {betchipdata?.map((item, index) => {
                      return (
                        <td key={index} className="flex py-1 justify-center items-center bg-[#CCC] rounded-[0.25rem] !border-0 " onClick={() => arrayData(item, true)}>
                          <span className='text-[#273a47] text-md font-[500]'>{formatNumber(item)}</span>
                        </td>
                      )
                    })}
                  </tr>
                  {/* <tr className='!border-0 px-1'>
                    <td className='!border-0'>
                      <div className="py-1 text-red-600 text-xs font-semibold text-right px-8">
                        {errorMessage ? errorMessage : ""}
                      </div>
                      <div className="py-1 text-green-600 text-xs font-semibold text-right px-8">
                        {successMessage ? successMessage : ""}
                      </div>
                    </td>
                  </tr> */}
                  <tr className='grid grid-cols-4 gap-[3px] items-center !border-0 px-1 text-white text-[12px] font-[500]'>
                    <div className='flex justify-center items-center pb-1 px-2  py-1 rounded-[0.25rem] text-[#273a47] bg-[#ffbc00]'>
                      <button type="button" className="align-center"
                      // onClick={handleClear}
                      >MIN STAKE</button>
                    </div>
                    <div className='flex justify-center items-center pb-1 px-2  py-1 rounded-[0.25rem]  bg-[#334579]'>
                      <button type="button" className="align-center"
                      // onClick={handleClear}
                      >MAX STAKE</button>
                    </div>
                    <div className='flex justify-center items-center pb-1 px-2  py-1 rounded-[0.25rem]  bg-[#008000]'>
                      <button type="reset" className="align-center"
                      // onClick={handleClear}
                      >EDIT STAKE</button>
                    </div>
                    <div className='flex justify-center items-center pb-1 px-2  py-1 rounded-[0.25rem]  bg-[#ff0000]'>
                      <button type="reset" className="align-center" onClick={handleClear}><b>CLEAR</b></button>
                    </div>
                  </tr>
                  <tr>
                    <div className='flex items-center justify-between p-1'>
                      <div className={` px-4 py-1.5 rounded-[0.25rem] font-[500] btn bg-[#bd1828] hover:opacity-90 border-[1px] border-[#bd1828] hover:border-[#FC4242]/90 text-white ld-over cursor-pointer `}
                        onClick={() => openBets()}>Reset
                        <div className="ld ld-ball ld-flip">
                        </div>
                      </div>
                      {/* <button className="bg-[#097c93] hover:bg-[#097c93]/90 flex justify-center items-center text-white text-[14px] px-3 py-2 h-[35px] w-[16%] cursor-pointer"
                        onClick={() => {
                          handleButtonValues();
                        }}
                      >
                        Edit
                      </button> */}


                      <div className='flex gap-1'>
                        {/* <div className={` px-4 py-2 font-[500] btn bg-[#bd1828] hover:bg-[#FC4242]/90 border-[1px] border-[#bd1828] hover:border-[#FC4242]/90 text-white ld-over cursor-pointer `}
                          onClick={() => openBets()}>Reset
                          <div className="ld ld-ball ld-flip">
                          </div>
                        </div> */}
                        <div className={` px-4 py-1.5 rounded-[0.25rem] font-[500] btn bg-[#0b7d36] hover:bg-[#0b7d36]/90 border-[1px] border-[#0b7d36] hover:border-[#0b7d36]/90 text-white ld-over cursor-pointer ${betLoading ? "opacity-50 border-2 border-green-900" : ""}`}
                          onClick={() => { placeBet() }}>
                          <b className='flex justify-center items-center'>
                            Submit

                          </b>
                          <div className="ld ld-ball ld-flip">
                          </div>
                        </div>

                      </div>
                    </div>
                  </tr>
                  <tr className=' '>
                    {/* <td className='!border-0'>
                      <button type="reset" className="align-left btn btn-warning" onClick={handleClear}><b>Clear</b></button>
                    </td> */}
                    <td className='!border-0'>
                      {/* <div onClick={() => openBets()} className=' relative flex justify-center items-center'>
                                <FaCircle size={12} className='text-white absolute left-5 top-1 bottom-0 animate-ping' />
                                <span className='text-white/40'>Reset</span>
                              </div> */}

                    </td>

                    <td className='!border-0'>

                    </td>
                  </tr>


                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      {betLoading && <div className='absolute top-0 left-0 h-full w-full flex justify-center items-center bg-white/20 '>
        <span className="loaderbetPlace"></span>
      </div>
      }
    </div>
  )
}