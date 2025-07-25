/* eslint-disable react/prop-types */
import BetLocked from "./BetLocked";


export default function BetWarButtonMobile(props) {
    const { data, handleBackOpen, section1Ref, name } = props;
    return (
        <div className='flex'>
            {
                data.gstatus === "0" ?
                    <div className=" bg-[#72BBEF]/80 w-full text-center py-3 relative cursor-pointer" >
                        <div className="text-[14px] font-[600] darktext leading-4">{data && data.b1 && data.b1 ? data.b1 : "0.00"}</div>
                        <BetLocked />
                    </div>
                    :
                    <div className="light-blue w-full text-center py-3 relative cursor-pointer" onClick={() => handleBackOpen({ data: data, type: "Yes", odds: data.b1, nat: data.nat, betFor: name }, section1Ref)}>
                        <div className="text-[14px] font-[600] darktext leading-4">{data && data.b1 && data.b1 ? data.b1 : "0.00"}</div>
                    </div>
            }
        </div>
    );
}