/* eslint-disable react/prop-types */

import BetLocked from "./BetLocked";


export default function GameCard(props) {
    const { Data, Name, handleBackOpen, section1Ref, posArray, oddsDifference } = props;

    return (
        <div className="w-full">
            <div className="flex justify-center items-center ">
                <p className="uppercase text-[16px] px-2 gray-text font-semibold">
                    {Data && Data.rate ? (Data.rate - oddsDifference).toFixed(2) : "0.00"}
                </p>
            </div>
            <div className="relative">
                <div className="even-background w-full text-center text-[16px] py-3 font-semibold rounded-[4px] leading-4 text-white uppercase cursor-pointer flex justify-center items-center">
                    {Name}
                </div>
                {Data.gstatus === "1" ?
                    <div onClick={() => handleBackOpen(Data, section1Ref)} className="absolute top-0 even-background rounded-[4px] w-full text-center text-[16px] py-3 font-semibold leading-4 text-white uppercase shadow shadow-gray-400 cursor-pointer flex justify-center items-center">
                        {Name}
                    </div>
                    :
                    <BetLocked />
                }
            </div>
            <div className={`${posArray[Data.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-bold pt-1`}>
                {posArray[Data.sid] ?? 0}
            </div>
        </div>
    );
}
