import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import useGroupCasinoList from "../../component/IntGroupCasinoList/IntGroupCasinoList";
// import Providers from "../component/Dashboard/Provider";
import { useDispatch, useSelector } from "react-redux";
import { getCasinoListByCateogeory, getCasinoListByProviderName } from "../../redux/reducers/casino.reducer";
import Loader from "../../component/casinoComponent/Loader";
import { FaSearch, FaSearchPlus } from "react-icons/fa";

function AllGames() {
    const [providerWiseCasinoList, setProviderWiseCasinoList] = useState([]);
    const [isCasinoModal, setIsCasinoModal] = useState(false)
    const [categories, setCategories] = useState([]);
    const [categoryWiseCasinoList, setCategoryWiseCasinoList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Slot games");
    const groupCasinoList = useGroupCasinoList();
    const [selectedProvider, setSelectedProvider] = useState(null);
    const { getCasinoListByProviderNameData, loading, getCasinoListByCateogeoryData } = useSelector((state) => state.casino);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     dispatch(getCasinoListByCateogeory());
    // }, [dispatch]);

    const handlProviderCasinoList = (value) => {
        const reqData = { provider: value };
        dispatch(getCasinoListByProviderName(reqData));
        setIsCasinoModal(true)
        setSelectedProvider(value);
    }

    useEffect(() => {
        // Check if the data has actually changed before setting state
        if (getCasinoListByProviderNameData && getCasinoListByProviderNameData !== providerWiseCasinoList) {
            setProviderWiseCasinoList(getCasinoListByProviderNameData);
        }
    }, [getCasinoListByProviderNameData, providerWiseCasinoList]); // Ensure correct dependencies

    useEffect(() => {
        if (getCasinoListByProviderNameData) {
            setProviderWiseCasinoList(getCasinoListByProviderNameData);
            // Extract unique categories from the fetched provider data
            const uniqueCategories = [...new Set(getCasinoListByProviderNameData?.map(item => item.category))];
            setCategories(uniqueCategories);  // Set categories for dynamic tabs
        }
    }, [getCasinoListByProviderNameData]);

    useEffect(() => {
        if (selectedCategory) {
            const reqData = { category: selectedCategory };
            dispatch(getCasinoListByCateogeory(reqData));
        }
    }, [dispatch, selectedCategory]);

    // Update category-wise list when the API data is received
    useEffect(() => {

        if (getCasinoListByCateogeoryData) {
            setCategoryWiseCasinoList(getCasinoListByCateogeoryData);
        }
    }, [getCasinoListByCateogeoryData]);

    const handleResponseCasino = (product) => {
        if (product?.gameId) {
            localStorage.getItem("token")
                ? navigate(`/iframe-casino-new/${product?.providerName}/${product?.gameId}`)
                : localStorage.setItem("unauthorized", true);
        } else {
            if (!product.shortName || !product.eventId) return;
            localStorage.getItem("token")
                ? navigate(`/${product.shortName}/${product.eventId}`)
                : localStorage.setItem("unauthorized", true);
        }
    };




    const sortedList = categoryWiseCasinoList?.filter(item => item.priority !== 0)
        .sort((a, b) => b.priority - a.priority);

    const finalList = [
        ...categoryWiseCasinoList?.filter(item => item.priority === 0),
        ...sortedList
    ];


    return (
        <div className="w-[100%]">
            <div className="md:p-2 p-1 m-[1px] bg-[var(--primary)] text-white font-[600] flex justify-between items-center ">
                <div className="flex justify-start items-center gap-1">
                    <img src='/dashbaord/casino/casino-icon.png' className="w-[20px] h-[20px]" />
                    <p>CASINO</p>
                </div>
                <div className="text-white flex font-semibold items-center text-base cursor-pointer">
                    <input
                        placeholder="Search Game..."
                        className={`md:p-1 p-[2px] transition-all text-black duration-1000 ease-in-out bg-white `}
                    />
                    <div className="bg-[#BB1919] md:p-1.5 p-[4px] px-1">
                        <FaSearch size={18} />
                    </div>
                </div>
            </div>
            <div className="my-1 border border-secondary bg-[#cccccc] ">
                {/* <div className="flex bg-secondary justify-between items-center m-2 px-3 py-1">
                    <h2 className="text-black md:text-[16px] text-[12px] font-bold uppercase">Provider</h2>
                </div> */}
                <div className="flex justify-start items-center overflow-x-auto ">
                    {groupCasinoList?.providerList?.map((item, idx) => {
                        const isSelected = selectedProvider === item;
                        return (
                            <div key={idx} className="!w-auto flex-shrink-0 cursor-pointer" onClick={() => handlProviderCasinoList(item)}>
                                <div className="text-black text-[16px] flex justify-center items-center">
                                    <div
                                        className={`px-4 py-1 flex justify-center items-center border border-r-[var(--secondary)]  ${isSelected ? 'md:bg-[var(--secondary)] bg-[var(--primary)] text-white md:font-[400] font-[500]' : 'md:bg-[#cccccc] bg-[var(--secondary)] md:text-black md:font-[400] font-[500] text-white'}`}
                                    >
                                        {item}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                {loading ? <Loader /> :
                    <>
                        <div className="">
                            <div className="flex justify-start items-center overflow-x-auto   ">
                                {categories?.map((category, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 w-fit h-10 whitespace-nowrap flex justify-center items-center text-sm  uppercase  border-[1px] 
                                            border-r-[var(--secondary)]  ${selectedCategory === category ? 'bg-[var(--secondary)]  text-white' : 'md:bg-[#cccccc] bg-white text-black'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isCasinoModal && (
                            <>
                                <div className="grid grid-cols-3 bg-white sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-10 xl:gap-6 lg:gap-5 md:gap-4 sm:gap-3 gap-2 px-3  mb-20 py-3">
                                    {finalList?.map((item, idx) => {
                                        return (
                                            <div key={idx} className="flex flex-col items-center md:gap-2">
                                                <img
                                                    onClick={() => handleResponseCasino(item)}
                                                    src={item?.urlThumb}
                                                    alt={item?.gameName}
                                                    className=" object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                                                />
                                                {/* <div className="bg-red-500 p-1">{item?.gameName}</div> */}
                                            </div>
                                        );
                                    })}
                                </div>

                            </>

                        )
                        }
                    </>
                }
            </div>
        </div>
    );
}

export default AllGames;



{/* <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6 mb-20 py-3">
{providerWiseCasinoList?.map((item, idx) => (
    <div key={idx} className="flex flex-col items-center gap-3 border-2 border-orange-600 rounded-lg">
        <img
            onClick={() => handleResponseCasino(item)}
            src={item?.urlThumb}
            alt={item?.gameName}
            className="w-32 h-32 sm:w-32 sm:h-32 md:w-44 md:h-40 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
        />
    </div>
))}
</div> */}