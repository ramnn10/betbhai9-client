/* eslint-disable react/prop-types */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaTimes } from 'react-icons/fa';



const RulesModelCasino = (props) => {
    const { setRulesModal, PageTitle, ruleImage } = props;
    const handleCloseModal = () => {
        setRulesModal(false)
    }

    return (

        <div className={`w-full z-50 fixed px-2 h-screen bg-black/50 top-0 left-0 overflow-y-auto `} onClick={() => handleCloseModal()}>
            <div className=" bg-white z-50 mx-auto mt-6" data-aos="fade-down" onClick={(e) => e.stopPropagation()}>
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
    );
}

export default RulesModelCasino;