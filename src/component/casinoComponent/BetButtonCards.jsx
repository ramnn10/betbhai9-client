/* eslint-disable react/prop-types */

import { FaLock } from 'react-icons/fa';

export default function BetButtonCards(props) {
    const { data, handleBackOpen, section1Ref, name } = props;
    return (
        <div className='flex'>
            {
                data.gstatus === "Active" ?
                    <div className="border bg-[var(--matchLagai)] w-full text-center py-3 relative cursor-pointer" onClick={() => handleBackOpen({ data: data, type: "Yes", odds: data.nat, nat: data.nat ? data.nat : data.nation, betFor: name }, section1Ref)}>
                        <div className="text-[13px] font-[500] black-text leading-4">
                            {data && data.nat ? data.nat : data.nation ? data.nation : name}
                        </div>
                    </div>
                    :
                    <div className="border bg-[var(--matchLagai)] w-full text-center py-3 relative cursor-pointer" >
                        <div className="text-[13px] font-[500] black-text leading-4">
                            {data && data.nat ? data.nat : data.nation ? data.nation : name}
                        </div>
                        <div className="absolute top-0 bg-black/60 flex justify-center items-center w-full h-full cursor-pointer">
                            <FaLock size={16} className="text-white" />
                        </div>
                    </div>
            }
        </div>
    );
}