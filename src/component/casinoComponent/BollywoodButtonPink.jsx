/* eslint-disable react/prop-types */
import BetLocked from "./BetLocked";


export default function BollywoodButtonPink(props) {
    const { data, handleBackOpen, section1Ref, name } = props;
    return (
        <div className='flex'>
            {
                data.gstatus === "ACTIVE" ?
                    <div className="odds-khaii w-full text-center py-3.5 flex justify-center items-center relative cursor-pointer" onClick={() => handleBackOpen({ data: data, type: "No", odds: data.l1, nat: data.nat ? data.nat : data.nation, betFor: name }, section1Ref)}>
                        <div className="text-[14px] font-[600] darktext leading-4">{data && data.l1 && data.l1 ? data.l1 : "0.00"}</div>
                    </div>
                    :
                    <div className="odds-khaii w-full text-center py-3.5 flex justify-center items-center relative cursor-pointer" >
                        <div className="text-[14px] font-[600] darktext leading-4">{data && data.l1 && data.l1 ? data.l1 : "0.00"}</div>
                        <BetLocked />
                    </div>
            }
        </div>
    );
}