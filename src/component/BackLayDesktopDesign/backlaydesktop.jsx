export default function BackLayDesktop() {
    return (
        <>
            <div className="text-center md:flex hidden justify-end items-center uppercase">
                <div className="md:w-20 w-16 font-semibold text-[13px] text-transparent bg-transparent py-1">Lay</div>
                <div className="md:w-20 w-16 font-semibold text-[13px] text-transparent bg-transparent py-1">Lay</div>
                <div className="md:w-20 w-16 font-semibold md:text-sm py-1.5 text-[12px] text-gray-800 bg-[var(--matchLagai)]  border border-border-dark">Back</div>
                <div className="md:w-20 w-16 font-semibold md:text-sm py-1.5 text-[12px] text-gray-800 bg-[var(--matchKhai)]  border border-border-dark">Lay</div>
                <div className="md:w-20 w-16 font-semibold text-[13px] text-transparent bg-transparent py-1">Lay</div>
                <div className="md:w-20 w-16 font-semibold text-[13px] text-transparent bg-transparent py-1">Lay</div>
            </div>
            <div className='md:hidden flex' >
                <div className="text-center flex justify-end items-center font-medium text-[13px] text-black uppercase">
                    <div className="md:w-24 w-16 font-bold text-[12px] text-black bg-[var(--matchLagai)] py-1  border border-gray-400">Back</div>
                    <div className="md:w-24 w-16 font-bold text-[12px] text-black bg-[var(--matchKhai)] py-1 border border-gray-400">Lay</div>
                </div>
            </div>
        </>
    );
}

