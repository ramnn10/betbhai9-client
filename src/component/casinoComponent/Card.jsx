/* eslint-disable react/prop-types */
import BetLocked from "./BetLocked";


export default function Card(props) {
    const { Data, num, handleBackOpen, posArray } = props;
    return (
        <div className="space-y-1">
            <div className="relative text-center flex flex-col justify-center items-center">
                <img src={`/images/${num}.jpg`} alt="aaaaaa" className='lg:h-12 h-10 lg:w-11 w-10 flex justify-center items-center' />
                {Data.gstatus === "0" ? <BetLocked /> :
                    <div onClick={() => handleBackOpen({ Data, type: "Yes", rate: Data.rate, nat: Data.nat ? Data.nat : Data.nation, sid: Data.sid, marketid: Data.mid, betFor: Data.names })} className="absolute top-0 cursor-pointer">
                        <img src={`/images/${num}.jpg`} alt="aaaaaa" className="lg:h-12 h-10 lg:w-11 w-10" />
                    </div>
                }
            </div>
            <p className={`${posArray[Data.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-center text-[12px] font-semibold`} >
                {posArray[Data.sid] ?? 0.00}
            </p>
        </div>
    );
}