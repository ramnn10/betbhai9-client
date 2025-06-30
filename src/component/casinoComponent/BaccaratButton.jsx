/* eslint-disable react/prop-types */
import BetLocked from "./BetLocked";


export default function BaccaratButton(props) {
    const { data, handleBackOpen, section1Ref, name } = props;
    return (
        <div className='flex'>
            {
                data.gstatus === "1" ?
                    <div className="bg-[var(--casinoHeader)] w-full rounded text-center py-2.5 relative cursor-pointer font-[500] text-white" onClick={() => handleBackOpen({ data: data, type: "Yes", odds: data.b1, nat: data.nat, betFor: name }, section1Ref)}>
                        <div className="text-[14px] leading-4">
                            {data && data.nat ? data.nat : data.nation ? data.nation : data.nation}
                        </div>
                        <div className="text-[12px] leading-4">{data && data.b1 && data.b1 ? data.b1 : "0.00"}</div>
                    </div>
                    :
                    <div className=" bg-[var(--casinoHeader)] w-full rounded text-center py-2.5 relative cursor-pointer font-[500] text-white" >
                        <div className="text-[14px] leading-4">
                            {data && data.nat ? data.nat : data.nation ? data.nation : data.nation}
                        </div>
                        <div className="text-[12px] leading-4">{data && data.b1 && data.b1 ? data.b1 : "0.00"}</div>
                        <BetLocked />
                    </div>
            }
        </div>
    );
}