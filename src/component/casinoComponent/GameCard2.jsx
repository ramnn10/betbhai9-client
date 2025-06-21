/* eslint-disable react/prop-types */

import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill, BsFillSuitHeartFill } from "react-icons/bs";
import BetLocked from "./BetLocked";


export default function GameCard2(props) {
    const { Data, select, handleBackOpen, section1Ref, posArray, oddsDifference } = props;

    return (
        <div className="w-full">
            <div className="flex justify-center items-center ">
                <p className="uppercase text-[13px] px-2 font-semibold">{Data && Data.rate ? (Data.rate - oddsDifference) : 0}</p>
            </div>

            <div className="relative">

                <div className={`even-background flex justify-center items-center w-full rounded-[4px] text-center py-3 space-x-1 text-sm font-medium leading-4 ${select === "Red" ? "text-red-500" : "text-black"} cursor-pointer`}>
                    {select === "Red" ? <>
                        <BsSuitDiamondFill className='text-[#FF0000]' />
                        <BsFillSuitHeartFill className='text-[#FF0000]' />
                    </> : <>
                        <BsSuitClubFill />
                        <BsSuitSpadeFill />
                    </>}
                </div>

                {Data.gstatus === "1" ?
                    <div onClick={() => handleBackOpen(Data, section1Ref)} className={`absolute top-0 even-background rounded-[4px] flex justify-center items-center w-full py-3 space-x-1 ${select === "Red" ? "text-red-500" : "text-black"} cursor-pointer`}>
                        {select === "Red" ? <>
                            <BsSuitDiamondFill className='text-[#FF0000]' />
                            <BsFillSuitHeartFill className='text-[#FF0000]' />
                        </> : <>
                            <BsSuitClubFill />
                            <BsSuitSpadeFill />
                        </>}
                    </div>
                    : <BetLocked />
                }

            </div>

            <div className={`${posArray[Data.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[12px] font-bold pt-1`}>
                {posArray[Data.sid] ?? 0}
            </div>
        </div>
    );
}