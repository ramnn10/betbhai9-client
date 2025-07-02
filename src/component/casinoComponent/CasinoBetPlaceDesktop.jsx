/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import { betChipsData } from "../betPlaceDesktop/BetPlaceDesktop";

function CasinoBetPlaceDesktop(props) {
    const {
        betSlipData,
        updateStackOnclick,
        placeBet,
        LoadingBet,
        handleClose,
        updateStake,
        clearStake,
        handleButtonValues,
    } = props;

    const handleToggle = () => {
        document.body.classList.toggle("StakeModalOpen");
    };


    let betChipsDatas = JSON.parse(localStorage.getItem('betChipsData'));
    const myArray = betChipsDatas && betChipsDatas.length > 0 ? Object.keys(betChipsDatas) : Object.keys(betChipsData);
    // const formatNumber = (num) => {
    //     if (num >= 1000) {
    //         return (num / 1000).toFixed(0) + 'K';
    //     }
    //     return num;
    // };
    return (
        <div className='relative'>
            {LoadingBet && (
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10 flex justify-center items-center">
                    <span className="casinoLoader"></span>
                </div>
            )}
            <div className={`relative ${LoadingBet ? 'opacity-50' : ''}`}>
                <div className='bg-gray-200'>
                    <div className="lg:bg-[var(--casinoHeader)] bg-[var(--casinoBlue)] text-white text-[14px] px-2 py-[6px] lg:rounded-t-[4px] flex justify-between items-center">
                        <span className="font-medium tracking-wide">
                            Place Bet
                        </span>
                        <span className="text-white text-[14px] lg:block hidden">Range: 100 to 300K</span>
                        <FaTimes className='text-white lg:hidden block cursor-pointer' size={18} onClick={() => handleClose()} />

                    </div>
                    <div className="black-text text-[13px] hidden lg:grid grid-cols-4 py-2 gap-2 font-[800]">
                        <div className=''></div>
                        <div className=''>(Bet for)</div>
                        <div className=''>Odds</div>
                        <div className=''>Stake</div>

                    </div>
                    <div className={`${betSlipData.type === "No" ? "bg-[var(--matchKhai)]" : "bg-[var(--matchLagai)]"}`}>
                        <span className='flex justify-start items-center lg:hidden lg:px-0 px-3 pt-2 p w-full black-text text-[14px] font-medium capitalize'>
                            {betSlipData.nat ? betSlipData.nat : betSlipData?.nation}
                        </span>
                        <div className="lg:grid lg:grid-cols-4 px-2 gap-2 py-1.5 lg:border-t-[1px] lg:border-b-[1px] border-white hidden">
                            <span className='flex justify-start items-center w-full black-text text-[18px] px-2'>
                                <FaTimes className='text-red-700  cursor-pointer' size={18} onClick={() => handleClose()} />
                            </span>
                            <span className='flex justify-start items-center  w-full black-text text-[14px] font-medium capitalize'>
                                {betSlipData.nat ? betSlipData.nat : betSlipData?.nation}
                            </span>
                            <input
                                type="number"
                                className="px-1 flex justify-start items-start w-[85%]  border-[2px] border-white rounded-sm py-[2px] bg-white black-text"
                                placeholder="0"
                                readOnly
                                value={betSlipData && betSlipData.odds ? betSlipData.odds : betSlipData.rate ? betSlipData.rate : "0"}
                            />
                            <input
                                type="text"
                                className="px-1 flex justify-start items-start w-[85%]   border-[2px] border-white rounded-sm py-[2px] bg-white black-text"
                                placeholder="0"
                                value={betSlipData.stake}
                                onChange={updateStake}
                            />
                        </div>

                        <div className="lg:hidden px-2 bg-[#ffffff45] flex justify-center items-center gap-2 mx-2 py-2">
                            <div className="flex flex-col">
                                <span className="text-center pb-1">Odds</span>
                                <input
                                    type="number"
                                    className="px-1 flex justify-start items-start w-full border-[2px] border-white rounded-sm py-[2px] bg-white black-text"
                                    placeholder="0"
                                    readOnly
                                    value={betSlipData && betSlipData.odds ? betSlipData.odds : betSlipData.rate ? betSlipData.rate : "0"}
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-center pb-1">Amount</span>
                                <input
                                    type="text"
                                    className="px-1 flex justify-start items-start w-full border-[2px] border-white rounded-sm py-[2px] bg-white black-text"
                                    placeholder="0"
                                    value={betSlipData.stake}
                                    onChange={updateStake}
                                />
                            </div>
                        </div>

                        <div className='grid xl:grid-cols-4 grid-cols-3 lg:pt-1 pt-2 gap-1 px-2'>
                            {myArray && myArray.length > 0 ? myArray.map((element, index) => (
                                <div key={index} className="px-0 cursor-pointer">
                                    <div className='lg:bg-[#cccccc] bg-[#2c3e50] lg:text-black text-white font-[800] flex justify-center items-center text-center h-[28px]' onClick={() => updateStackOnclick(Number(element))}>
                                        {/* {formatNumber(element)} */}
                                        {element}
                                    </div>
                                </div>
                            )) : null}
                        </div>
                        <div onClick={() => clearStake()} className="hidden lg:flex cursor-pointer justify-end items-center underline px-4 py-1">
                            clear
                        </div>

                        <div className='hidden lg:flex justify-between items-center py-1.5 px-4'>

                            <button className="bg-[#097c93] hover:bg-[#097c93]/90 rounded-[0.375rem] flex justify-center items-center text-white text-[14px] px-2 py-1.5 h-[35px] w-[16%]"
                                onClick={() => handleButtonValues()}
                            >
                                Edit
                            </button>

                            <div className=" flex justify-end items-center space-x-2 w-full">
                                <button className="bg-[#dc3545] hover:opacity-85 rounded-[0.375rem] flex justify-center items-center text-white text-[14px] px-2 py-1.5 h-[35px] w-[16%]" onClick={() => handleClose()}>
                                    Reset
                                </button>
                                <button className="bg-[#0b7d36] hover:bg-[#0b7d36]/90 rounded-[0.375rem] flex justify-center items-center text-white text-[14px] px-2 py-1.5 h-[35px] w-[16%]" onClick={() => placeBet()}>
                                    Submit
                                </button>
                            </div>
                        </div>

                        <div className="lg:hidden block px-4 pt-4 pb-2">
                            <div className="grid grid-cols-4">
                                <div onClick={() => clearStake()} className="lg:hidden flex text-[#0d6efd] font-[700] cursor-pointer justify-start items-center underline px-4 py-1">
                                    Clear
                                </div>
                                <button className="bg-[#097c93] hover:bg-[#097c93]/90 font-[700] flex justify-center items-center text-white text-[14px] px-4 py-1.5 h-[35px] "
                                    onClick={() => handleButtonValues()}
                                >
                                    Edit
                                </button>

                                <button className="bg-[#bd1828] hover:bg-[#FC4242]/90 font-[700] flex justify-center items-center text-white text-[14px] px-2 py-1.5 h-[35px] " onClick={() => handleClose()}>
                                    Reset
                                </button>
                                <button className="bg-[#086f3f] hover:bg-[#0b7d36]/90 font-[700] flex justify-center items-center text-white text-[14px] px-2 py-1.5 h-[35px] " onClick={() => placeBet()}>
                                    Place Bet
                                </button>
                            </div>

                            <div className="text-black text-[12px] pt-2">Range: 100 to 3L</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CasinoBetPlaceDesktop;