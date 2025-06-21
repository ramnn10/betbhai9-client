/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { AllSportsArray } from "../../views/dashboard/Dashboard"
import { useRef } from "react";
import { getSportMatchList } from "../../redux/reducers/sport_reducer";

function AllSports({ activeAllSporttab, setactiveAllSporttab }) {

    const tabRefs = useRef([]);
    const dispatch = useDispatch();
    const handleTabClick = (element, index) => {
        dispatch(getSportMatchList({ _id: element?.sportId }))
        localStorage.setItem('dashboardActiveTabKey', element?.sportId)
        setactiveAllSporttab(element?.sportId);
        tabRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    };

    return (
        <>
            <div className="hidden xl:flex divide-x bg-sidebar-menu-link-border divide-[var(--secondary)] overflow-auto">
                {AllSportsArray?.map((element, index) => (
                    <div
                        key={index}
                        onClick={() => handleTabClick(element, index)}
                        className={`cursor-pointer uppercase ${activeAllSporttab == element?.sportId ? "bg-[var(--secondary)] text-white" : "bg-[#CCCCCC]"} px-4 py-1 mb-1 text-nowrap`}
                        ref={(el) => (tabRefs.current[index] = el)} // Assign ref to the tab
                    >
                        {element.sportName}
                    </div>
                ))}
            </div>
            <div className="xl:hidden flex text-sm font-bold bg-[var(--secondary)] overflow-auto">
                {AllSportsArray?.map((element, index) => (
                    <div
                        key={index}
                        onClick={() => handleTabClick(element, index)}
                        className={`${activeAllSporttab == element?.sportId ? "bg-[var(--primary)] " : ""} text-white flex flex-col py-2 justify-center items-center px-5 text-nowrap`}
                        ref={(el) => (tabRefs.current[index] = el)}
                    >
                        {element.icons ? (
                            <div className="text-[20px]">{element.icons}</div>
                        ) : (
                            <img src={element.image} alt="sport" className="w-[18px] h-[18px]" />
                        )}
                        {element.sportName}
                    </div>
                ))}
            </div>
            <div className="py-1 md:px-4 px-1.5 bg-white">
                <div className="flex md:justify-end justify-between items-center gap-3 text-[var(--primary)] text-[13px]">
                    <div className="flex justify-center items-center gap-2">
                        <div className="rounded-xl md:px-5 px-2.5 py-0 border border-[var(--primary)] ">- LIVE</div>
                        <div className="rounded-xl md:px-5 px-2.5 py-0 border border-[var(--primary)] ">- VIRTUAL</div>
                    </div>
                    <div className="flex justify-center items-center md:gap-2 gap-1">
                        <div className="text-[12px] text-black font-[500]">
                            View By:
                        </div>
                        <select
                            className="px-1 py-[2px] text-[13px] bg-[var(--primary)] rounded-[2px] border-[1px] border-[var(--secondary)] focus:outline-none text-[#ffffff] placeholder-text-gray-500">
                            <option value="time">TIME</option>
                            <option value="competitions">COMPETITIONS</option>
                        </select>
                    </div>
                </div>
            </div>
        </>

    );
}

export default AllSports;
