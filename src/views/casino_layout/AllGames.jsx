import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import useGroupCasinoList from "../../component/IntGroupCasinoList/IntGroupCasinoList";
// import Providers from "../component/Dashboard/Provider";
import { useDispatch, useSelector } from "react-redux";
import { getCasinoListByCateogeory, getCasinoListByProviderName } from "../../redux/reducers/casino.reducer";
import Loader from "../../component/casinoComponent/Loader";
import { FaSearchPlus } from "react-icons/fa";

function AllGames() {
    const [providerWiseCasinoList, setProviderWiseCasinoList] = useState([]);
    const [isCasinoModal, setIsCasinoModal] = useState(false)
    const [categories, setCategories] = useState([]);
    const [categoryWiseCasinoList, setCategoryWiseCasinoList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Slot games");
    const groupCasinoList = useGroupCasinoList();

    const { getCasinoListByProviderNameData, loading, getCasinoListByCateogeoryData } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // useEffect(() => {
    //     dispatch(getCasinoListByCateogeory());
    // }, [dispatch]);

    const handlProviderCasinoList = (value) => {
        // alert("222")
        const reqData = { provider: value };
        dispatch(getCasinoListByProviderName(reqData));
        setIsCasinoModal(true)
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
            <div className="p-2 bg-[var(--primary)] text-white font-[600] flex justify-between items-center ">
                <div className="flex justify-start items-center gap-1">
                    <img src='/dashbaord/casino/casino-icon.png' className="w-[20px] h-[20px]" />
                    <p>CASINO</p>
                </div>

                <div className="text-white flex font-semibold gap-1 items-center text-base cursor-pointer">
                    <input
                        placeholder="Search here"
                        className={`py-1.5 transition-all text-black duration-1000 ease-in-out bg-white `}
                    // ${searchIcon ? "w-[200px] px-[10px]" : "w-0 px-0"}
                    />
                    <FaSearchPlus
                        className="font-bold"
                        size={25}
                    // onClick={handleSearchIcon}
                    />
                </div>
            </div>
            <div className="rounded-md my-4 pb-2 border border-secondary bg-black ">
                <div className="flex bg-secondary justify-between items-center mb-2 px-3 py-1">
                    <h2 className="text-white md:text-[14px] text-[12px] font-bold">Provider</h2>
                </div>
                <div className="flex overflow-x-auto space-x-3 px-2 py-2">
                    {/* {console.log(groupCasinoList?.providerList, "groupCasinoList")} */}
                    {groupCasinoList?.providerList?.map((item, idx) => {
                        return (
                            <div key={idx} className="!w-auto flex-shrink-0" onClick={() => handlProviderCasinoList(item)}>
                                <div className="text-gray-300 font-bold md:text-lg text-xs flex justify-center items-center">
                                    <div className="md:h-32 px-2 py-2 md:w-32 md:rounded-full rounded bg-conic flex justify-center items-center">{item}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                {loading ? <Loader /> :
                    <>
                        <div className="rounded-md my-4 pb-2 px-2  ">
                            <div className="grid grid-cols-3 sm:grid-cols-3 bg-black md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 py-4">
                                {categories?.map((category, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 h-16 text-sm font-bold capitalize rounded-lg ${selectedCategory === category ? 'bg-orange-600 text-white' : 'bg-gray-800'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isCasinoModal && (
                            <>
                                <div className="grid grid-cols-3 bg-black sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-10 xl:gap-6 lg:gap-5 md:gap-4 sm:gap-3 gap-2 px-3  mb-20 py-3">
                                    {finalList?.map((item, idx) => {
                                        return (
                                            <div key={idx} className="flex flex-col items-center md:gap-2 border-2 border-orange-500  rounded-lg">
                                                <img
                                                    onClick={() => handleResponseCasino(item)}
                                                    src={item?.urlThumb}
                                                    alt={item?.gameName}
                                                    className="w-36 h-32 md:w-44 md:h-40 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                                                />
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