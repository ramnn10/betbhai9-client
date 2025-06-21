/* eslint-disable react/prop-types */
import BetLocked from "./BetLocked";


export default function BollywoodButtonBlue(props) {
    const { data, handleBackOpen, section1Ref, name } = props;
    return (
        <div className='flex'>
            {
                data.gstatus === "ACTIVE" ?
                    <div className="light-blue w-full text-center py-3.5 flex justify-center items-center relative cursor-pointer" onClick={() => handleBackOpen({ data: data, type: "Yes", odds: data.b1, nat: data.nat ? data.nat: data.nation, betFor: name }, section1Ref)}>
                        <div className="text-[14px] font-[600] darktext leading-4">{data && data.b1 && data.b1 ? data.b1 : "0.00"}</div>
                    </div>
                    :
                    <div className="light-blue w-full text-center py-3.5 flex justify-center items-center relative cursor-pointer" >
                        <div className="text-[14px] font-[600] darktext leading-4">{data && data.b1 && data.b1 ? data.b1 : "0.00"}</div>
                        <BetLocked />
                    </div>
            }
        </div>
    );
}