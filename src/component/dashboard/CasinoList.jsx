// import { useEffect, useState } from 'react';
// import { casinoListJson } from '../../config/global';
// import { useNavigate } from 'react-router-dom';

// const CasinoList = () => {
//     const [casinoList, setCasinoList] = useState([]);
//     const navigate = useNavigate();
//     const handleResponseCasino = (product) => {
//         navigate(`/casino/${product.shortName}/${product.eventId}`)
//     }

//     useEffect(() => {
//         setCasinoList(casinoListJson);
//     }, []);

//     return (
//         <section className='py-0'>
//             <div className="w-[100%] grid grid-cols-3 2xl:grid-cols-10 lg:grid-cols-6 p-1 md:grid-cols-4 2xl:gap-y-1.5 2xl:gap-x-[2px] lg:gap-y-2 lg:gap-x-1 gap-y-2 gap-x-1 py-1">
//                 {casinoList?.map((product, index) => (
//                     <div key={index} onClick={() => handleResponseCasino(product)} className="shadow-lg relative shadow-white duration-500 sm:w-full sm:h-[150px] lg:w-full lg:h-[160px] w-full h-[100px] " style={{ backgroundImage: `url(${product.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                         <span className="block w-full h-full cursor-pointer">
//                             <div className="px-2 py-1 rounded-sm  absolute -bottom-1 w-full shadow-lg bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]" >
//                                 <p className="md:text-xs text-[8px] font-[600] text-white truncate flex items-center justify-center uppercase">{product.title}</p>
//                             </div>
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default CasinoList;

import { useEffect, useState } from 'react';
import { casinoListJson } from '../../config/global';
import { useNavigate } from 'react-router-dom';

const CasinoList = () => {
    const [casinoList, setCasinoList] = useState([]);
    const navigate = useNavigate();

    const handleResponseCasino = (product) => {
        navigate(`/casino/${product.shortName}/${product.eventId}`);
    };

    useEffect(() => {
        setCasinoList(casinoListJson);
    }, []);

    const diamondCasinos = casinoList?.filter(casino => casino.diamondCasino);
    const intCasinos = casinoList?.filter(casino => casino.intCasino);

    return (
        <section className=''>

            {diamondCasinos.length > 0 && (
                <>
                    <div className=''>
                        <div className='text-white text-[14px] font-bold p-2 uppercase bg-[var(--secondary)]'>
                            <h2 className="animate-pulse tracking-wide ">Diamond Casino</h2>
                        </div>
                        <div className="w-[100%] grid grid-cols-3 2xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-4 2xl:gap-y-1.5 2xl:gap-x-[2px] lg:gap-y-2 lg:gap-x-1 gap-y-2 gap-x-1 p-1">
                            {diamondCasinos.map((product, index) => (
                                <div
                                    key={`diamond-${index}`}
                                    onClick={() => handleResponseCasino(product)}
                                    className="shadow-lg relative duration-500 w-full h-[160px] sm:h-[170px] lg:h-[170px]"
                                    style={{
                                        backgroundImage: `url(${product.img})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <span className="block w-full h-full cursor-pointer">
                                        <div className="px-2 py-2 absolute -bottom-1 w-full shadow-lg rounded-sm bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]">
                                            <p className="text-white text-[8px] md:text-xs font-semibold truncate text-center uppercase">
                                                {product.title}
                                            </p>
                                        </div>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {intCasinos.length > 0 && (
                <>
                    <div className='mt-2'>
                        <div className='text-white text-[14px] font-bold p-2 uppercase bg-[var(--secondary)]'>
                            <h2 className="animate-pulse tracking-wide ">International Casino</h2>
                        </div>
                        <div className="w-[100%] grid grid-cols-3 2xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-4 2xl:gap-y-1.5 2xl:gap-x-[2px] lg:gap-y-2 lg:gap-x-1 gap-y-2 gap-x-1 p-1">
                            {intCasinos.map((product, index) => (
                                <div
                                    key={`intl-${index}`}
                                    onClick={() => handleResponseCasino(product)}
                                    className="shadow-lg relative duration-500 w-full h-[100px] sm:h-[150px] lg:h-[160px]"
                                    style={{
                                        backgroundImage: `url(${product.img})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <span className="block w-full h-full cursor-pointer">
                                        <div className="px-2 py-1 absolute -bottom-1 w-full shadow-lg rounded-sm bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)]">
                                            <p className="text-white text-[8px] md:text-xs font-semibold truncate text-center uppercase">
                                                {product.title}
                                            </p>
                                        </div>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </>
            )}
        </section>
    );
};

export default CasinoList;