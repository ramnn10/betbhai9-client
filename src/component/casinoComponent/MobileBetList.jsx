/* eslint-disable react/prop-types */
import BetListTableDesktop from './BetListTableDesktop';

export default function MobileBetList(props) {
    const { betList } = props;

    return (
        <div className=" w-full bg-white lg:px-3 overflow-y-auto">

            <div className="bg-[var(--secondary)] text-white text-[14px] px-2 py-[6px] rounded-t-[4px] mt-3 lg:block hidden">
                <span className="font-medium tracking-wide">
                    My Bet
                </span>
            </div>

            <div className="pb-20">
                <div className="space-y-[1px] bg-gray-200 pb-1 rounded">
                    <BetListTableDesktop betList={betList} />
                </div>
            </div>

        </div>
    );
}