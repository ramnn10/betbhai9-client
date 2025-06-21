/* eslint-disable react/prop-types */
import { FaLock } from 'react-icons/fa6';

export default function CasinoGameCard(props) {
    const { Data, Name, handleBackOpen, section1Ref, posArray, oddsDifference } = props;

    return (
        <div className="w-full">
            <div className="flex justify-center items-center ">
                <p className="uppercase text-[16px] px-2 gray-text font-semibold">{Data && Data.rate ? (Data.rate - oddsDifference) : 0}</p>
            </div>
            <div className="relative">
                <div className="bg-gradient-to-r from-[var(--primary)]  to-[var(--secondary)] w-full text-center text-[16px] py-3 font-semibold rounded-[4px] leading-4 text-white uppercase cursor-pointer flex justify-center items-center">
                    {Name}
                </div>
                {Data.gstatus === "1"
                    ?
                    <div onClick={() => handleBackOpen(Data, section1Ref)} className="absolute top-0 bg-gradient-to-r from-[var(--primary)]  to-[var(--secondary)] rounded-[4px] w-full text-center text-[16px] py-3 font-semibold leading-4 text-white uppercase shadow shadow-gray-400 cursor-pointer flex justify-center items-center"> {Name} </div>
                    :
                    <div className="absolute top-0 bg-black/70 flex justify-center items-center w-full h-full cursor-pointer"> <FaLock size={16} className="text-white" /> </div>}
            </div>
            <div className={`${posArray[Data.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-[14px] font-bold pt-1`}>
                {posArray[Data.sid] ?? 0}
            </div>
        </div>
    );
}