/* eslint-disable react/prop-types */

import BetLocked from "./BetLocked";



export default function Poker6PlayerBetButton(props) {
    const { data,  name } = props;
    return (
        <div>
            {
                data.gstatus === "0" ?
                    <div className="border flex justify-between items-center light-blue w-full px-2 py-2.5 relative cursor-pointer text-[14px] font-[600] darktext leading-4" >
                        <div className="">{data && data.nat && data.nat ? data.nat : name}</div>
                        <div>0</div>
                        <BetLocked />
                    </div>
                    :
                    <div className="border flex justify-between items-center light-blue w-full px-2 py-2.5 relative cursor-pointer text-[14px] font-[600] darktext leading-4" >
                        <div className="">{data && data.nat && data.nat ? data.nat : name}</div>
                        <div>0</div>
                    </div>
            }
        </div>
    );
}