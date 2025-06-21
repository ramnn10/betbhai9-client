/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { FaTimes } from 'react-icons/fa';



export default function CasinoPageheader(props) {
    const { PageTitle, t1, ruleImage, minStake, maxStake } = props;
    const [rulesModal, setRulesModal] = useState(false);
    const handleCloseModal = () => {
        setRulesModal(false)
    }
    const handleOpenRules = () => {
        setRulesModal(true)
    };

    // const handleClose = () =>{
    //     setRulesModal(false)
    // }

    return (
        <div className='w-full '>
            {rulesModal ?
                 <div className={`w-full z-50 fixed px-2 h-screen bg-black/50 top-0 left-0 overflow-y-auto `} onClick={() => handleCloseModal()}>
                 <div className="w-full lg:w-1/4 bg-white z-50 mx-auto mt-6" data-aos="fade-down" onClick={(e) => e.stopPropagation()}>
                     <div className="w-full h-full flex justify-between bg-[var(--secondary)] px-2 py-[14px] items-center">
                         <h2 className="text-white text-[16px] font-[600]">
                             {PageTitle} Rules
                         </h2>
                         <div className='text-center' onClick={() => setRulesModal()}>
                             <FaTimes className='text-white cursor-pointer' size={18} />
                         </div>
                     </div>
                     <div className='w-full bg-white p-1'>
                         <img src={ruleImage} alt={PageTitle} className='' />
                     </div>
     
                 </div>
             </div>
                : null}
            <div className="bg-[var(--secondary)] lg:flex justify-between items-center p-[6px] hidden">
                <span className="flex space-x-2 text-white w-full whitespace-nowrap">
                    <span className="uppercase font-bold text-center text-xs lg:text-base">
                        {PageTitle}
                    </span>
                    <span onClick={() => handleOpenRules()} className='font-medium uppercase text-[12px] cursor-pointer underline mt-[2px]'>Rules</span>
                </span>
                <span className="text-white text-sm lg:text-[16px] whitespace-nowrap flex font-medium justify-end items-center space-x-1">
                    <span>
                        Round ID : { t1.mid ? t1.mid : null}
                        {minStake && maxStake && (
                            <span className="font-[500] text-white text-[14px]">
                                <span> |&nbsp;MIN</span>:{minStake} |<span>&nbsp; MAX</span>:{maxStake}
                            </span>
                        )}
                    </span>
                </span>
            </div>

            <div className="red-header lg:hidden flex justify-between items-center py-2 px-1.5">
                <span className="space-x-2 text-white w-full whitespace-nowrap">
                    <span className="uppercase font-bold text-center text-[14px]">
                        {PageTitle}
                    </span>
                    <span onClick={() => handleOpenRules()} className='font-medium lg:block hidden capitalize text-[12px] cursor-pointer underline'>Rules</span>
                </span>
                <span className="text-white text-sm lg:text-[16px] whitespace-nowrap lg:flex hidden font-medium justify-end items-center space-x-1">
                    <span>
                        Round ID : { t1.mid ? t1.mid : null}
                    </span>
                </span>
                <div>                {minStake && maxStake && (
                    <span className='font-[500] whitespace-nowrap text-white text-[14px]'>
                        <span>MIN:{minStake} | MAX</span>:{maxStake}
                    </span>
                )}
                </div>
            </div>

        </div>
    );
}