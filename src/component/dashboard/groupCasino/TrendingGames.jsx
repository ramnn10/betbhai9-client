import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function TrendingGames({ name, data }) {
    const navigate = useNavigate();

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

    // const sortedList = data?.filter(item => item.priority !== 0)
    //     .sort((a, b) => b.priority - a.priority);

    // const finalList = [
    //     ...data?.filter(item => item.priority === 0),
    //     ...sortedList
    // ];

    return (
        <section>
            <div className="pt-4">
                <div className='text-white text-[16px] font-bold p-2 uppercase bg-[var(--secondary)]'>
                    <h2 className="animate-pulse tracking-wide ">
                        {/* {name} */}
                        NEW LAUNCH
                        </h2>
                </div>

                <Swiper
                    spaceBetween={10}
                    slidesPerView="auto"
                    loop={true}
                    grabCursor={true}
                    className="px-2 my-2"
                >
                    {data?.map((item, idx) => {
                        return (
                            <SwiperSlide key={idx} className="!w-auto relative">
                                <div
                                    onClick={() => handleResponseCasino(item)}
                                    className="relative md:w-40 md:h-40 w-24 h-24 cursor-pointer"
                                >
                                    <img
                                        src={item?.urlThumb}
                                        alt={item?.gameName}
                                        className="w-full h-full object-cover rounded"
                                    />
                                    <div className="px-2 py-2 absolute -bottom-1 w-full shadow-lg rounded-sm bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]">
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

export default TrendingGames;