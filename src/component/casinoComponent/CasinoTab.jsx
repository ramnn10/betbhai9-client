/* eslint-disable react/prop-types */
import { useState} from 'react';
import RulesModelCasino from './RulesModelCasino';



export default function CasinoTab(props) {
    const { activeTab, handleTabClick, PageTitle, t1, ruleImage, totalBet } = props;
    const [rulesModal, setRulesModal] = useState(false);
    const handleOpenRules = () => {
        setRulesModal(true)
    };

    return (
        <div className="bg-[var(--casinoBlue)]">
            {rulesModal ?
                <RulesModelCasino ruleImage={ruleImage} PageTitle={PageTitle} setRulesModal={setRulesModal} />
                : null}
            <div className="flex justify-between items-center whitespace-wrap md:space-x-0 space-x-1 w-full cursor-pointer text-[12px] tracking-wide uppercase font-semibold h-[40px]">
                <div className='flex divide-x divide-white'>
                    <div className={`${activeTab === 1 ? "cricket-game green-button text-white lg:ml-0 ml-0 border-t-2 border-white" : "soccer-game dark-green-button text-white "} flex justify-center items-center px-1.5 py-[10px]`} onClick={() => handleTabClick(1)}>
                        <span className="flex justify-center items-center ">
                            Game
                        </span>
                    </div>
                    <div className={`${activeTab === 2 ? "cricket-game green-button text-white lg:ml-0 ml-0 border-t-2 border-white" : "soccer-game dark-green-button text-white"} flex justify-center items-center px-1.5 py-[10px]`} onClick={() => handleTabClick(2)}>
                        <span className="flex justify-center items-center">
                            Placed Bets ({totalBet})
                        </span>
                    </div>
                </div>
                <div className='text-right px-2 py-1 font-[500] uppercase text-[11px] text-white '>
                    <span onClick={() => handleOpenRules()} className=' cursor-pointer underline'>
                        Rules
                    </span><br />
                    <span className=''>
                        Round ID : { t1.mid ? t1.mid : null}
                    </span>
                </div>

            </div>
        </div>
    );
}
