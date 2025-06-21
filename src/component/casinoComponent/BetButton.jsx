/* eslint-disable react/prop-types */
import { FaLock } from 'react-icons/fa';

export default function BetButton(props) {
    const { data, handleBackOpen, section1Ref, name } = props;
    return (
        <div>
            <div className="flex justify-center items-center ">
                <p className="lg:text-[15px] text-[12px] font-[600] darktext" >
                    {data && data.nat ? data.nat : data.nation ? data.nation : name}
                </p>
            </div>
            {
                data.gstatus === "0" ?
                    <div className="border light-blue w-full text-center py-3.5 relative cursor-pointer" >
                        <div className="lg:text-[17px] text-[16px] font-[600] dark-text leading-4">{data && data.rate && data.rate ? data.rate : "0.00"}</div>
                        <div className="absolute top-0 bg-black/60 flex justify-center items-center w-full h-full cursor-pointer">
                            <FaLock size={16} className="text-white" />
                        </div>
                    </div>
                    :
                    <div className="border light-blue w-full text-center py-3.5 relative cursor-pointer" onClick={() => handleBackOpen({ data: data, type: "Yes", odds: data.rate, nat: name }, section1Ref)}>
                        <div className="lg:text-[17px] text-[16px] font-[600] dark-text leading-4">{data && data.rate && data.rate ? data.rate : "0.00"}</div>
                    </div>
            }
        </div>
    );
}