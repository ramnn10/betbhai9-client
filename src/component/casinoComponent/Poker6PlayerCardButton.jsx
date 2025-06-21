/* eslint-disable react/prop-types */

import BetLocked from "./BetLocked";


export default function Poker6PlayerCardButton(props) {
    const { data, handleBackOpen, section1Ref, name } = props;


    return (
        <div>
            {
                data.gstatus === "0" ?
                    <div className="border flex justify-between items-center light-blue w-full px-2 py-2.5 relative cursor-pointer text-[14px] font-[600] darktext leading-4" >
                        {data && data.nat ? data.nat : data.nation ? data.nation : name}
                        <div className=''>0</div>
                        <BetLocked />
                    </div>
                    :
                    <div className="border flex justify-between items-center light-blue w-full px-2 py-2.5 relative cursor-pointer text-[14px] font-[600] darktext leading-4" onClick={() => handleBackOpen({ data: data, type: "Yes", odds: data.nat, nat: data.nat, betFor: name }, section1Ref)}>
                        {data && data.nat ? data.nat : data.nation ? data.nation : name}
                        <div className=''>0</div>
                    </div>
            }
        </div>
    );
}