// import { useNavigate } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// function LiveCasino({ name, data }) {
//     const navigate = useNavigate();

//     const handleResponseCasino = (product) => {
//         if (product?.iframeID) {
//             localStorage.getItem("token")
//                 ? navigate(`/iframe-casino-new/${product?.provider}/${product?.iframeID}`)
//                 : localStorage.setItem("unauthorized", true);

//         } else {
//             if (!product.shortName || !product.eventId) return;
//             localStorage.getItem("token")
//                 ? navigate(`/${product.shortName}/${product.eventId}`)
//                 : localStorage.setItem("unauthorized", true);
//         }
//     };

//     return (
//         <div>
//             <div className="rounded-md my-4 pb-2 border border-secondary">
//                 <div className="flex bg-secondary justify-between items-center mb-2 px-3 py-1">
//                     <h2 className="text-white md:text-[14px] text-[12px] font-bold">{name}</h2>
//                 </div>

//                 <Swiper
//                     spaceBetween={10}
//                     slidesPerView="auto"
//                     loop={true}
//                     grabCursor={true}
//                     className="px-2 "
//                 >
//                     {data?.map((item, idx) => {
//                         return (
//                             <SwiperSlide key={idx} className="!w-auto">
//                                 <img
//                                     onClick={() => handleResponseCasino(item.gameId)}
//                                     src={item?.urlThumb}
//                                     alt={item.gameName}
//                                     className="md:w-32 w-24 md:h-32 h-24 object-cover rounded-lg"
//                                 />
//                             </SwiperSlide>

//                         )
//                     })}
//                 </Swiper>
//             </div>
//         </div>
//     );
// }

// export default LiveCasino;



import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCasinoListByCateogeory } from "../../../redux/reducers/casino.reducer";
// Live casino
function LiveCasino({ name, data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [categoryWiseCasinoList, setCategoryWiseCasinoList] = useState([]);
    const { getCasinoListByCateogeoryData, loading } = useSelector((state) => state.user);
    const handleResponseCasino = (product) => {
        console.log(product, "productproductproduct");

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



    useEffect(() => {
        const reqData = { category: "Live casino" };
        dispatch(getCasinoListByCateogeory(reqData));
    }, [dispatch]);


    useEffect(() => {
        if (getCasinoListByCateogeoryData) {
            setCategoryWiseCasinoList(getCasinoListByCateogeoryData);
        }
    }, [getCasinoListByCateogeoryData]);

    //     const sortedList = data?.filter(item => item.priority !== 0)
    //     .sort((a, b) => b.priority - a.priority);

    // const finalList = [
    //     ...data?.filter(item => item.priority === 0),
    //     ...sortedList
    // ];


    return (
        <section>
            <div className="pt-1">
                <div className='text-white text-[14px] font-bold p-2 uppercase bg-[var(--secondary)]'>
                    <h2 className="animate-pulse tracking-wide ">{name}</h2>
                </div>

                <Swiper
                    spaceBetween={10}
                    slidesPerView="auto"
                    loop={true}
                    grabCursor={true}
                    className="px-2 my-2 "
                >
                    {data?.map((item, idx) => {
                        return (
                            // <SwiperSlide key={idx} className="!w-auto">
                            //     <img
                            //         onClick={() => handleResponseCasino(item)}
                            //         src={item?.urlThumb}
                            //         alt={item.gameName}
                            //         className="md:w-32 w-24 md:h-32 h-24 object-cover"
                            //     />
                            // </SwiperSlide>

                            <SwiperSlide key={idx} className="!w-auto relative">
                                <div
                                    onClick={() => handleResponseCasino(item)}
                                    className="relative md:w-40 md:h-40 w-24 h-24 cursor-pointer"
                                >
                                    <img
                                        src={item?.urlThumb}
                                        alt={item?.gameName}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="px-2 py-2 absolute -bottom-1 w-full shadow-lg bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]">                                            
                                        <p className="text-white text-[10px] md:text-xs font-semibold truncate text-center uppercase">
                                            {item?.gameName}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>


                        )
                    })}
                </Swiper>
            </div>
        </section>
    );
}

export default LiveCasino;