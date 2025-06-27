/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { BsFillSuitHeartFill, BsSuitClubFill, BsSuitDiamondFill, BsSuitSpadeFill, BsTrophyFill } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import { FaTimes } from 'react-icons/fa';

import Winner from './images/winner.png';
import ResultCard from './ResultCard';


const ResultModelBmx = (props) => {
    const { handleClose, name, result } = props;
    const [lowCard, setLowCard] = useState([]);
    const [highCard, setHighCard] = useState([]);


    const handleCloseModal = () => {
        handleClose()
    }

    // useEffect(() => {
//     document.addEventListener('click', handleCloseModal);
    //     return () => {
    //         document.removeEventListener('click', handleCloseModal);
    //     };
    // }, []);


    const [resultDetails, setResultDetails] = useState('')
    const [resultCard, setResultCard] = useState('')
    const [resultDesc, setResultDesc] = useState('')
    const [groupedCards, setGroupedCards] = useState({});
    // const cardType = {
    //     'H': 'H', 'D': 'D', 'S': 'S', 'C': 'C', // A can be considered as 1 or 14 depending on the game
    // };

    const getResultByApi = () => {
        let config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: `https://oddsapi.winx777.com/v2/api/allCasinoResult?roundId=${result.mid}`,
            headers: { 'Content-Type': 'application/json' },
        };
        axios.request(config).then((response) => {
            setResultDetails(response.data.data.data[0])
            handleResponseCasino(response.data.data.data)
        }).catch((error) => {
        });
    };
    useEffect(() => {
        if (result && result.mid) {
            getResultByApi();
        }
    }, [result]);


    const handleResponseCasino = (data) => {
        if (data && data[0] && data[0].gtype === "teen20") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "3cardj") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "queen") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "Teen") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "race20") {
            const groupedCards = { 'H': [], 'D': [], 'C': [], 'S': [] };

            let spliceData = data && data[0] && data[0].cards ? data[0].cards.split(",") : [];
           

            spliceData.map((data) => {
                const cardType1 = { 'H': 'H', 'D': 'D', 'S': 'S', 'C': 'C' };
                const value = data.slice(1, 2);
                const cardType = cardType1[value];
                if (cardType === "H") {
                    groupedCards['H'].push(data);
                } else if (cardType === "C") {
                    groupedCards['C'].push(data);
                } else if (cardType === "D") {
                    groupedCards['D'].push(data);
                } else if (cardType === "S") {
                    groupedCards['S'].push(data);
                } return groupedCards;
            });
            setGroupedCards(groupedCards);
            let resultDesc = data && data[0] && data[0].desc && data[0].desc.split('|') ? data[0].desc.split('|') : []
            setResultDesc(resultDesc);
        } else if (data && data[0] && data[0].gtype === "abj") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "ab20") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "worli2") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "worli") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "superover") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "teen8") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "teen9") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "card32eu") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "card32") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "aaa") {
            let resultDesc = data && data[0] && data[0].desc && data[0].desc.split('|') ? data[0].desc.split('|') : []
            setResultDesc(resultDesc);
        } else if (data && data[0] && data[0].gtype === "dt20") {
            let resultDesc = data && data[0] && data[0].desc ? data[0].desc.split('*') : []
            setResultDesc(resultDesc);
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "dt202") {
            let resultDesc = data && data[0] && data[0].desc ? data[0].desc.split('*') : []
            setResultDesc(resultDesc);
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "dt6") {
            let resultDesc = data && data[0] && data[0].desc ? data[0].desc.split('*') : []
            setResultDesc(resultDesc);
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "poker20") {
            let resultDesc = data && data[0] && data[0].desc ? data[0].desc.split('##') : []
            setResultDesc(resultDesc);
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "poker") {
            let resultDesc = data && data[0] && data[0].desc ? data[0].desc.split('##') : []
            setResultDesc(resultDesc);
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "War") {
            let resultDesc = data && data[0] && data[0].sid !== "" ? data[0].sid.split(',') : []
            setResultDesc(resultDesc);
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "baccarat") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "baccarat2") {
            let resultCard = data && data[0] && data[0].cards !== "" ? data[0].cards.split(',') : []
            setResultCard(resultCard);
        } else if (data && data[0] && data[0].gtype === "cmeter") {
            let lowCard = [];
            let highCard = [];
            let spliceData = data && data[0] && data[0].cards ? data[0].cards.split(",") : [];
          

            spliceData.forEach((card) => {
                let number = {
                    '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
                    '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
                    'J': '11', 'Q': '12', 'K': '13', 'A': '1'
                };
                let value = card.slice(0, -2);
                let numericValue = parseInt(number[value], 10);

                if (numericValue >= 1 && numericValue <= 9) {
                    lowCard.push(card);
                } else if (numericValue >= 10 && numericValue <= 13) {
                    highCard.push(card);
                }
            });
            setLowCard(lowCard);
            setHighCard(highCard);
        }
        else if (data && data[0] && data[0].gtype === "btable") {
            let resultDesc = data && data[0] && data[0].desc && data[0].desc.split('|') ? data[0].desc.split('|') : []
            setResultDesc(resultDesc);
        }
    }

    var settings2 = {
        dots: false,
        infinite: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 1,
    };
    var settings3 = {
        dots: false,
        infinite: true,
        speed: 20,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    // React.useEffect(() => {
    //     AOS.init();
    //     AOS.refresh();
    // }, []);

    return (

        <div className={`w-full z-50 fixed px-2 h-screen bg-black/30 top-0 right-0 overflow-y-auto`} onClick={() => handleCloseModal()}>
            {/* <div className="lg:w-[43%] md:w-3/5 w-11/12 bg-white z-50 mx-auto top-4"> */}
            <div className="w-full lg:w-[43%] bg-white z-50 mx-auto mt-2" data-aos="fade-down" onClick={(e) => e.stopPropagation()}>
                <div className="w-full h-full flex justify-between  bg-[var(--primary)] px-2 py-[10px] items-center">
                    <h2 className="text-white text-[16px] font-medium">
                        {name} Result
                    </h2>
                    <div className='text-center pl-2' onClick={() => handleClose()}>
                        <FaTimes className='text-white cursor-pointer' size={18} />
                    </div>
                </div>
                <div className=''>
                    <div className='flex justify-end items-center text-[14px] p-2.5'>
                        <span className='font-bold'>Round Id:</span> {result.mid}
                    </div>
                    {resultDetails.gtype === "teen20" ?
                        <div className='py-2'>
                            <div className='flex justify-center items-start divide-x divide-[#ff9601]'>
                                <div className='px-4'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='text-[18px] font-[500]'>Player A</p>
                                        <div className='flex space-x-1.5 py-1'>
                                            <ResultCard num={resultCard[0]} />
                                            <ResultCard num={resultCard[2]} />
                                            <ResultCard num={resultCard[4]} />
                                        </div>
                                    </div>
                                    {resultDetails.win === "1" ?
                                        <div className='flex justify-center items-center py-2 '>
                                            <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div> : null
                                    }
                                </div>
                                <div className='px-4'>
                                    <div className='flex flex-col justify-center items-center'>
                                        <p className='text-[18px] font-[500]'>Player B</p>
                                        <div className='flex space-x-1.5 py-1'>
                                            <ResultCard num={resultCard[1]} />
                                            <ResultCard num={resultCard[3]} />
                                            <ResultCard num={resultCard[5]} />
                                        </div>
                                    </div>
                                    {resultDetails.win === "3" ?
                                        <div className='flex justify-center items-center py-2 '>
                                            <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                        </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        resultDetails.gtype === "Teen" ?
                            <div className='py-2'>
                                <div className='flex justify-center items-start divide-x divide-[#ff9601] '>
                                    <div className='px-4'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='text-[18px] font-[500]'>Player A</p>
                                            <div className='flex space-x-2 py-2'>
                                                <ResultCard num={resultCard[0]} />
                                                <ResultCard num={resultCard[2]} />
                                                <ResultCard num={resultCard[4]} />
                                            </div>
                                        </div>
                                        {resultDetails.win === "1" ?
                                            <div className='flex justify-center items-center py-2 '>
                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                        }
                                    </div>
                                    <div className='px-4'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='text-[18px] font-[500]'>Player B</p>
                                            <div className='flex space-x-2 py-2'>
                                                <ResultCard num={resultCard[1]} />
                                                <ResultCard num={resultCard[3]} />
                                                <ResultCard num={resultCard[5]} />
                                            </div>
                                        </div>
                                        {resultDetails.win === "2" ?
                                            <div className='flex justify-center items-center py-2 '>
                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            resultDetails.gtype === "teen9" ?
                                <div className='pb-1.5 flex justify-center items-start divide-x divide-[#ff9601]'>
                                    <div className='flex justify-center items-center space-x-2 px-4'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='text-[16px] font-[500]'>Tiger</p>
                                            <div className='flex space-x-2 py-1'>
                                                <ResultCard num={resultCard[0]} />
                                                <ResultCard num={resultCard[3]} />
                                                <ResultCard num={resultCard[6]} />
                                            </div>
                                        </div>
                                        {resultDetails.win === "11" ?
                                            <div className='flex justify-center items-center pt-2 '>
                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                        }
                                    </div>
                                    <div className='flex justify-center items-center space-x-2 px-4'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='text-[16px] font-[500]'>Lion</p>
                                            <div className='flex space-x-2 py-1'>
                                                <ResultCard num={resultCard[1]} />
                                                <ResultCard num={resultCard[4]} />
                                                <ResultCard num={resultCard[7]} />
                                            </div>
                                        </div>
                                        {resultDetails.win === "21" ?
                                            <div className='flex justify-center items-center pt-2 '>
                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                        }
                                    </div>
                                    <div className='flex justify-center items-center space-x-2 px-4'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <p className='text-[16px] font-[500]'>Dragon</p>
                                            <div className='flex space-x-2 py-1'>
                                                <ResultCard num={resultCard[2]} />
                                                <ResultCard num={resultCard[5]} />
                                                <ResultCard num={resultCard[8]} />
                                            </div>
                                        </div>
                                        {resultDetails.win === "31" ?
                                            <div className='flex justify-center items-center pt-2 '>
                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                            </div> : null
                                        }
                                    </div>
                                </div>
                                : resultDetails.gtype === "queen" ?
                                    <div className='w-full'>
                                        <div className='grid grid-cols-4 py-2.5'>
                                            <div className='flex justify-center items-center space-y-1.5'>
                                                <div className='space-y-2'>
                                                    <p className='text-[22px] font-[500]'>Total 0</p>
                                                    <div className='flex space-x-2'>
                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                        {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                                    </div>
                                                </div>
                                                {resultDetails.win === "1" ?
                                                    <div className='flex justify-center items-center pt-4 '>
                                                        <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                    </div> : null
                                                }
                                            </div>
                                            <div className='flex justify-center items-center space-y-1.5'>
                                                <div className='space-y-2'>
                                                    <p className='text-[22px] font-[500]'>Total 1</p>
                                                    <div className='flex space-x-2'>
                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                        {resultCard[6] === "1" ? null : <ResultCard num={resultCard[6]} />}
                                                    </div>
                                                </div>
                                                {resultDetails.win === "2" ?
                                                    <div className='flex justify-center items-center pt-4 '>
                                                        <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                    </div> : null
                                                }
                                            </div>
                                            <div className='flex justify-center items-center space-y-1.5'>
                                                <div className='space-y-2'>
                                                    <p className='text-[22px] font-[500]'>Total 2</p>
                                                    <div className='flex space-x-2'>
                                                        {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                        {resultCard[7] === "1" ? null : <ResultCard num={resultCard[7]} />}
                                                    </div>
                                                </div>
                                                {resultDetails.win === "3" ?
                                                    <div className='flex justify-center items-center pt-4 '>
                                                        <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                    </div> : null
                                                }
                                            </div>
                                            <div className='flex justify-center items-center space-y-1.5'>
                                                <div className='space-y-2'>
                                                    <p className='text-[22px] font-[500]'>Total 3</p>
                                                    <div className='flex space-x-2'>
                                                        {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                                        {resultCard[8] === "1" ? null : <ResultCard num={resultCard[8]} />}
                                                    </div>
                                                </div>
                                                {resultDetails.win === "4" ?
                                                    <div className='flex justify-center items-center pt-4 '>
                                                        <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                    </div> : null
                                                }
                                            </div>
                                        </div>
                                        <div className='py-2 px-20'>
                                            <div className="w-full text-[#000000] font-[600] text-[14px] flex justify-center items-center p-2 border-[1px] border-gray-300">
                                                {resultDetails && (
                                                    resultDetails.win === "1" ? "Winner : Player 0" :
                                                        resultDetails.win === "2" ? "Winner : Player 1" :
                                                            resultDetails.win === "3" ? "Winner : Player 2" :
                                                                resultDetails.win === "4" ? "Winner : Player 3" :
                                                                    "-"
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    : resultDetails.gtype === "race20" ?
                                        <div>
                                            <div className='flex items-center lg:space-x-5 space-x-3 px-2'>
                                                <div className='flex flex-col space-y-3 px-3'>
                                                    <div className='flex items-center space-x-2'>
                                                        <BsSuitSpadeFill className='text-black' size={18} />
                                                        {/* <img src="/images/spade-race.png" alt="spade-race" className='w-10' /> */}
                                                        {groupedCards['H'].map((card, index) => (
                                                            <ResultCard num={card} />
                                                        ))}
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        <BsFillSuitHeartFill className='text-[#FF0000]' size={18} />
                                                        {/* \ <img src="/images/heart-race.png" alt="spade-race" className='w-10' /> */}
                                                        {groupedCards['D'].map((card, index) => (
                                                            <ResultCard num={card} />
                                                        ))}
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        <BsSuitClubFill className='text-black' size={18} />
                                                        {/* <img src="/images/club-race.png" alt="spade-race" className='w-10' /> */}
                                                        {groupedCards['C'].map((card, index) => (
                                                            <ResultCard num={card} />
                                                        ))}
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        <BsSuitDiamondFill className='text-[#FF0000]' size={18} />
                                                        {/* <img src="/images/diamond-race.png" alt="spade-race" className='w-10' /> */}
                                                        {groupedCards['S'].map((card, index) => (
                                                            <ResultCard num={card} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='flex lg:space-x-2 space-x-1'>
                                                    <div className=' bg-[#EFEDED] border border-[#FFFF00] px-3 py-1 text-center text-2xl'>
                                                        <p>W</p>
                                                        <p>I</p>
                                                        <p>N</p>
                                                        <p>N</p>
                                                        <p>E</p>
                                                        <p>R</p>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        {resultDetails.win === "1" ?
                                                            <div className='flex justify-center items-center space-x-2'>
                                                                <img src="/cards/KHH.png" alt="" className="h-14 w-11" />
                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                            </div> :
                                                            <div className='flex justify-center items-center h-full'>
                                                                <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                                                            </div>
                                                        }
                                                        {resultDetails.win === "2" ?
                                                            <div className='flex justify-center items-center space-x-2'>
                                                                <img src="/cards/KDD.png" alt="" className="h-14 w-11" />
                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                            </div> :
                                                            <div className='flex justify-center items-center h-full'>
                                                                <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                                                            </div>
                                                        }
                                                        {resultDetails.win === "3" ?
                                                            <div className='flex justify-center items-center space-x-2'>
                                                                <img src="/cards/KCC.png" alt="" className="h-14 w-11" />
                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                            </div> :
                                                            <div className='flex justify-center items-center h-full'>
                                                                <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                                                            </div>
                                                        }
                                                        {resultDetails.win === "4" ?
                                                            <div className='flex justify-center items-center space-x-2'>
                                                                <img src="/cards/KSS.png" alt="" className="h-14 w-11" />
                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                            </div> :
                                                            <div className='flex justify-center items-center h-full'>
                                                                <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='py-2 px-20'>
                                                <div className='border-[1px] border-gray-300 py-2 text-base text-center'>
                                                    <p className='text-black'>Winner : {resultDesc[0]}</p>
                                                    <p className='text-black'>{resultDesc[1]}</p>
                                                    <p className='text-black'>{resultDesc[2]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        : resultDetails.gtype === "btable" ?
                                            <div className='w-full'>
                                                <div className='flex justify-center items-center text-base space-x-1'>
                                                    <img src={`/cards/${resultDetails && resultDetails.cards ? resultDetails.cards : null}.png`} alt="card" className="h-14 w-11" />
                                                </div>
                                                <div className='py-2 px-20'>
                                                    <div className='border-[1px] border-gray-300 pt-2 text-base'>
                                                        <p className='flex justify-center items-center font-medium text-green-400'>Winner: <span className='text-black'>{resultDesc[0]}</span> </p>
                                                        <p className='flex justify-center items-center font-medium text-green-400'>Odd: <span className='text-black'>{resultDesc[1]}</span> </p>
                                                        <p className='flex justify-center items-center  font-medium text-green-400'>Color: <span className='text-black'>{resultDesc[2]}</span> </p>
                                                        <p className='flex justify-center items-center  font-medium text-green-400'>Dulha Dulhan/Barati: <span className='text-black'>{resultDesc[3]}</span> </p>
                                                        <p className='flex justify-center items-center  font-medium text-green-400'>Card: <span className='text-black'>{resultDesc[4]}</span> </p>
                                                    </div>
                                                </div>
                                            </div> : resultDetails.gtype === "abj" ?
                                                <div className="space-y-2">
                                                    <div className="">
                                                        <div className=" flex justify-center items-center font-bold text-[16px] w-full" >
                                                            Andar
                                                        </div>
                                                        <div className=" flex justify-center items-center py-4">
                                                            <Slider {...settings2} className="w-[350px] ">
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[0] === "1" ? null : <><ResultCard num={resultCard[0]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[2] === "1" ? null : <><ResultCard num={resultCard[2]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[4] === "1" ? null : <><ResultCard num={resultCard[4]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[6] === "1" ? null : <><ResultCard num={resultCard[6]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[8] === "1" ? null : <><ResultCard num={resultCard[8]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[10] === "1" ? null : <><ResultCard num={resultCard[10]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[12] === "1" ? null : <><ResultCard num={resultCard[12]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[14] === "1" ? null : <><ResultCard num={resultCard[14]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[16] === "1" ? null : <><ResultCard num={resultCard[16]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[18] === "1" ? null : <><ResultCard num={resultCard[18]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[20] === "1" ? null : <><ResultCard num={resultCard[20]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[22] === "1" ? null : <><ResultCard num={resultCard[22]} /><p>0</p></>}
                                                                </div>
                                                            </Slider>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="flex justify-center items-center font-bold text-[16px] " >
                                                            Bahar
                                                        </div>
                                                        <div className=" flex justify-center items-center py-4">
                                                            <Slider {...settings3} className="w-[350px] ">
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[1] === "1" ? null : <><ResultCard num={resultCard[1]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[3] === "1" ? null : <><ResultCard num={resultCard[3]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[5] === "1" ? null : <><ResultCard num={resultCard[5]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[7] === "1" ? null : <><ResultCard num={resultCard[7]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[9] === "1" ? null : <><ResultCard num={resultCard[9]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[11] === "1" ? null : <><ResultCard num={resultCard[11]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[13] === "1" ? null : <><ResultCard num={resultCard[13]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[15] === "1" ? null : <><ResultCard num={resultCard[15]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[17] === "1" ? null : <><ResultCard num={resultCard[17]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[19] === "1" ? null : <><ResultCard num={resultCard[19]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[21] === "1" ? null : <><ResultCard num={resultCard[21]} /><p>0</p></>}
                                                                </div>
                                                                <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                    {resultCard[23] === "1" ? null : <><ResultCard num={resultCard[23]} /><p>0</p></>}
                                                                </div>
                                                            </Slider>
                                                        </div>
                                                    </div>

                                                </div> : resultDetails.gtype === "ab20" ?
                                                    <div className="space-y-2">
                                                        <div className="">
                                                            <div className=" flex justify-center items-center font-bold text-[16px] w-full" >
                                                                Andar
                                                            </div>
                                                            <div className=" flex justify-center items-center py-4">
                                                                <Slider {...settings2} className="w-[350px] ">
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[0] === "1" ? null : <><ResultCard num={resultCard[0]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[2] === "1" ? null : <><ResultCard num={resultCard[2]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[4] === "1" ? null : <><ResultCard num={resultCard[4]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[6] === "1" ? null : <><ResultCard num={resultCard[6]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[8] === "1" ? null : <><ResultCard num={resultCard[8]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[10] === "1" ? null : <><ResultCard num={resultCard[10]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[12] === "1" ? null : <><ResultCard num={resultCard[12]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[14] === "1" ? null : <><ResultCard num={resultCard[14]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[16] === "1" ? null : <><ResultCard num={resultCard[16]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[18] === "1" ? null : <><ResultCard num={resultCard[18]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[20] === "1" ? null : <><ResultCard num={resultCard[20]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[22] === "1" ? null : <><ResultCard num={resultCard[22]} /><p>0</p></>}
                                                                    </div>
                                                                </Slider>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className="flex justify-center items-center font-bold text-[16px] " >
                                                                Bahar
                                                            </div>
                                                            <div className=" flex justify-center items-center py-4">
                                                                <Slider {...settings3} className="w-[350px] ">
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[1] === "1" ? null : <><ResultCard num={resultCard[1]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[3] === "1" ? null : <><ResultCard num={resultCard[3]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[5] === "1" ? null : <><ResultCard num={resultCard[5]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[7] === "1" ? null : <><ResultCard num={resultCard[7]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[9] === "1" ? null : <><ResultCard num={resultCard[9]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[11] === "1" ? null : <><ResultCard num={resultCard[11]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[13] === "1" ? null : <><ResultCard num={resultCard[13]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[15] === "1" ? null : <><ResultCard num={resultCard[15]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[17] === "1" ? null : <><ResultCard num={resultCard[17]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[19] === "1" ? null : <><ResultCard num={resultCard[19]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[21] === "1" ? null : <><ResultCard num={resultCard[21]} /><p>0</p></>}
                                                                    </div>
                                                                    <div className="w-full justify-center flex-col flex items-center px-1 text-center">
                                                                        {resultCard[23] === "1" ? null : <><ResultCard num={resultCard[23]} /><p>0</p></>}
                                                                    </div>
                                                                </Slider>
                                                            </div>
                                                        </div>

                                                    </div> : resultDetails.gtype === "3cardj" ?
                                                        <div>
                                                            <div className='flex justify-center items-center space-x-2'>
                                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                            </div>
                                                            <div className='flex justify-center items-center text-base py-2'>
                                                                <span className='bg-[#3cardj] text-black border border-[#C5C5C5] px-6'>Result - {resultDetails.sid}</span>
                                                            </div>
                                                        </div> : resultDetails.gtype === "worli2" ?
                                                            <div>
                                                                <div className='flex justify-center items-center space-x-2'>
                                                                    {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                    {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                    {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                </div>
                                                                <div className='flex justify-center items-center text-base py-2'>
                                                                    <span className='border-[1px] border-gray-300 text-black px-6'>Pana : {resultDetails.sid}<br />
                                                                        Ocada : {resultDetails.win}</span>
                                                                </div>
                                                            </div> : resultDetails.gtype === "worli" ?
                                                                <div>
                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                    </div>
                                                                    <div className='flex justify-center items-center text-base py-2'>
                                                                        <span className='border-[1px] border-gray-300 text-black px-6'>Pana : {resultDetails.sid}<br />
                                                                            Ocada : {resultDetails.win}</span>
                                                                    </div>
                                                                </div> : resultDetails.gtype === "superover" ?
                                                                    <div className='flex justify-center items-center text-base'>
                                                                        <h1 className='text-center'>Result not available</h1>
                                                                    </div> : resultDetails.gtype === "teen8" ?
                                                                        <div className=''>
                                                                            <div className='flex flex-col justify-center items-center'>
                                                                                <p className='text-[24px] font-[500]'>Dealer</p>
                                                                                <div className='flex justify-center items-center w-full space-x-1'>
                                                                                    {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                    {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                    {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                </div>
                                                                            </div>
                                                                            <div className='py-6 flex '>
                                                                                <div className="text-center flex flex-col items-center">
                                                                                    <p className='text-[24px] font-[500]'>Player 1</p>
                                                                                    <div className='flex justify-center items-center w-full space-x-1'>
                                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                    </div>
                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                </div>
                                                                                <div className="text-center flex flex-col items-center">
                                                                                    <p className='text-[24px] font-[500]'>Player 2</p>
                                                                                    <div className='flex justify-center items-center w-full space-x-1'>
                                                                                        {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                                                        {resultCard[4] === "4" ? null : <ResultCard num={resultCard[1]} />}
                                                                                        {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                                                                    </div>
                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                </div>
                                                                                <div className="text-center flex flex-col items-center">
                                                                                    <p className='text-[24px] font-[500]'>Player 3</p>
                                                                                    <div className='flex justify-center items-center w-full space-x-1'>
                                                                                        {resultCard[6] === "1" ? null : <ResultCard num={resultCard[6]} />}
                                                                                        {resultCard[7] === "7" ? null : <ResultCard num={resultCard[7]} />}
                                                                                        {resultCard[8] === "1" ? null : <ResultCard num={resultCard[8]} />}
                                                                                    </div>
                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                </div>
                                                                                <div className="text-center flex flex-col items-center">
                                                                                    <p className='text-[24px] font-[500]'>Player 4</p>
                                                                                    <div className='flex justify-center items-center w-full space-x-1'>
                                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                    </div>
                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                </div>
                                                                                <div className="text-center flex flex-col items-center">
                                                                                    <p className='text-[24px] font-[500]'>Player 5</p>
                                                                                    <div className='flex justify-center items-center w-full space-x-1'>
                                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                    </div>
                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                </div>
                                                                                <div className="text-center flex flex-col items-center">
                                                                                    <p className='text-[24px] font-[500]'>Player 6</p>
                                                                                    <div className='flex justify-center items-center w-full space-x-1'>
                                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                    </div>
                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                </div>
                                                                                <div className="text-center flex flex-col items-center">
                                                                                    <p className='text-[24px] font-[500]'>Player 7</p>
                                                                                    <div className='flex justify-center items-center w-full space-x-1'>
                                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                    </div>
                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                </div>
                                                                                <div className="text-center flex flex-col items-center">
                                                                                    <p className='text-[24px] font-[500]'>Player 8</p>
                                                                                    <div className='flex justify-center items-center w-full space-x-1'>
                                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                    </div>
                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                </div>
                                                                            </div>
                                                                        </div> : resultDetails.gtype === "card32eu" ?
                                                                            <div className='py-2 w-full'>

                                                                                <div className='w-full lg:grid grid-cols-4 lg:space-y-0 space-y-4 py-2'>
                                                                                    <div className='grid grid-cols-3 border-b-2 border-gray-100 py-3'>
                                                                                        <div className=''>
                                                                                        </div>
                                                                                        <div className='flex flex-col justify-center items-center'>
                                                                                            <p className='text-[16px] font-[500]'>Player 8</p>
                                                                                            {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                        </div>
                                                                                        {resultDetails.win === "1" ?
                                                                                            <div className='flex justify-center items-center'>
                                                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                            </div> : null
                                                                                        }
                                                                                    </div>
                                                                                    <div className='grid grid-cols-3 border-b-2 border-gray-100 py-3'>
                                                                                        <div className=''>
                                                                                        </div>
                                                                                        <div className='flex flex-col justify-center items-center'>
                                                                                            <p className='text-[16px] font-[500]'>Player 9</p>
                                                                                            {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                        </div>
                                                                                        {resultDetails.win === "2" ?
                                                                                            <div className='flex justify-center items-center'>
                                                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                            </div> : null
                                                                                        }
                                                                                    </div>
                                                                                    <div className='grid grid-cols-3 border-b-2 border-gray-100 py-3'>
                                                                                        <div className=''>
                                                                                        </div>
                                                                                        <div className='flex flex-col justify-center items-center'>
                                                                                            <p className='text-[16px] font-[500]'>Player 10</p>
                                                                                            {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                        </div>
                                                                                        {resultDetails.win === "3" ?
                                                                                            <div className='flex justify-center items-center'>
                                                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                            </div> : null
                                                                                        }
                                                                                    </div>
                                                                                    <div className='grid grid-cols-3 border-b-2 border-gray-100 py-3'>
                                                                                        <div className=''>
                                                                                        </div>
                                                                                        <div className='flex flex-col justify-center items-center'>
                                                                                            <p className='text-[16px] font-[500]'>Player 11</p>
                                                                                            {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                                                        </div>
                                                                                        {resultDetails.win === "4" ?
                                                                                            <div className='flex justify-center items-center'>
                                                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                            </div> : null
                                                                                        }
                                                                                    </div>
                                                                                </div>

                                                                                <div className="w-full text-[#000000] font-[700] text-[14px] flex justify-center items-center">
                                                                                    {resultDetails && (
                                                                                        resultDetails.win === "1" ? "Winner : Player 8" :
                                                                                            resultDetails.win === "2" ? "Winner : Player 9" :
                                                                                                resultDetails.win === "3" ? "Winner : Player 10" :
                                                                                                    resultDetails.win === "4" ? "Winner : Player 11" :
                                                                                                        "B"
                                                                                    )}
                                                                                </div>


                                                                            </div> : resultDetails.gtype === "card32" ?
                                                                                <div className='py-2 w-full'>

                                                                                    <div className='w-full lg:grid grid-cols-4 lg:space-y-0 space-y-4 py-2'>
                                                                                        <div className='grid grid-cols-3 border-b-2 border-gray-100 py-3'>
                                                                                            <div className=''>
                                                                                            </div>
                                                                                            <div className='flex flex-col justify-center items-center'>
                                                                                                <p className='text-[16px] font-[500]'>Player 8</p>
                                                                                                {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                            </div>
                                                                                            {resultDetails.win === "1" ?
                                                                                                <div className='flex justify-center items-center pt-2 '>
                                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                </div> : null
                                                                                            }
                                                                                        </div>
                                                                                        <div className='grid grid-cols-3 border-b-2 border-gray-100 py-3'>
                                                                                            <div className=''>
                                                                                            </div>
                                                                                            <div className='flex flex-col justify-center items-center'>
                                                                                                <p className='text-[16px] font-[500]'>Player 9</p>
                                                                                                {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                            </div>
                                                                                            {resultDetails.win === "2" ?
                                                                                                <div className='flex justify-center items-center pt-2 '>
                                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                </div> : null
                                                                                            }
                                                                                        </div>
                                                                                        <div className='grid grid-cols-3 border-b-2 border-gray-100 py-3'>
                                                                                            <div className=''>
                                                                                            </div>
                                                                                            <div className='flex flex-col justify-center items-center'>
                                                                                                <p className='text-[16px] font-[500]'>Player 10</p>
                                                                                                {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                            </div>
                                                                                            {resultDetails.win === "3" ?
                                                                                                <div className='flex justify-center items-center pt-2 '>
                                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                </div> : null
                                                                                            }
                                                                                        </div>
                                                                                        <div className='grid grid-cols-3 border-b-2 border-gray-100 py-3'>
                                                                                            <div className=''>
                                                                                            </div>
                                                                                            <div className='flex flex-col justify-center items-center'>
                                                                                                <p className='text-[16px] font-[500]'>Player 11</p>
                                                                                                {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                                                            </div>
                                                                                            {resultDetails.win === "4" ?
                                                                                                <div className='flex justify-center items-center pt-2 '>
                                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                </div> : null
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="w-full text-[#000000] font-[700] text-[14px] flex justify-center items-center">
                                                                                        {resultDetails && (
                                                                                            resultDetails.win === "1" ? "Winner : Player 8" :
                                                                                                resultDetails.win === "2" ? "Winner : Player 9" :
                                                                                                    resultDetails.win === "3" ? "Winner : Player 10" :
                                                                                                        resultDetails.win === "4" ? "Winner : Player 11" :
                                                                                                            "B"
                                                                                        )}
                                                                                    </div>
                                                                                </div> : resultDetails.gtype === "aaa" ?
                                                                                    <div>
                                                                                        <div className='flex justify-center items-center text-base space-x-1'>
                                                                                            {resultDetails.cards === "1" ? null : <ResultCard num={resultDetails.cards} />}
                                                                                        </div>
                                                                                        <div className='flex justify-center items-center pt-2 text-base'>
                                                                                            <p className='font-medium text-green-400'>Result: <span className='text-black'>{resultDesc[0]}</span> </p>
                                                                                        </div>
                                                                                        <div className='flex justify-center items-center py-1 pb-2 text-[14px]'>
                                                                                            <span className='text-black font-[500]'>{resultDesc[1]} || {resultDesc[2]} || {resultDesc[3]} || {resultDesc[4]}</span>
                                                                                        </div>
                                                                                    </div> : resultDetails.gtype === "lucky7" ?
                                                                                        <div>
                                                                                            <div className='flex justify-center items-center text-base space-x-1'>
                                                                                                {resultDetails.cards === "1" ? null : <ResultCard num={resultDetails.cards} />}
                                                                                            </div>
                                                                                            <div className='flex justify-center items-center pt-2 text-base'>
                                                                                                <p className='font-medium text-green-400'>Result: <span className='text-black'>{resultDetails.desc}</span> </p>
                                                                                            </div>
                                                                                            <div className='flex justify-center items-center py-1 pb-2 '>
                                                                                            </div>
                                                                                        </div> : resultDetails.gtype === "lucky7eu" ?
                                                                                            <div>
                                                                                                <div className='flex justify-center items-center text-base space-x-1'>
                                                                                                    {resultDetails.cards === "1" ? null : <ResultCard num={resultDetails.cards} />}
                                                                                                </div>
                                                                                                <div className='flex justify-center items-center pt-2 text-base'>
                                                                                                    <p className='font-medium text-green-400'>Result: <span className='text-black'>{resultDetails.desc}</span> </p>
                                                                                                </div>
                                                                                                <div className='flex justify-center items-center py-1 pb-2 '>

                                                                                                </div>
                                                                                            </div> : resultDetails.gtype === "dt20" ?
                                                                                                <div className=''>
                                                                                                    <div className='flex flex-col justify-center items-center space-y-2'>
                                                                                                        <div className="grid grid-cols-2 items-center space-x-2">
                                                                                                            <div className='flex justify-center items-center space-x-2'>
                                                                                                                <div>
                                                                                                                    {resultDetails.win === "1" ?
                                                                                                                        <div className='flex justify-center items-center pt-4 '>
                                                                                                                            <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                        </div> : null
                                                                                                                    }
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                    <p className='text-[16px] font-[500]'>Dragon</p>
                                                                                                                    {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className='flex justify-center items-center space-x-2'>
                                                                                                                <div>
                                                                                                                    <p className='text-[16px] font-[500]'>Tiger</p>
                                                                                                                    {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                                                </div>
                                                                                                                <div>
                                                                                                                    {resultDetails.win === "2" ?
                                                                                                                        <div className='flex justify-center items-center pt-4 '>
                                                                                                                            <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                        </div> : null
                                                                                                                    }
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className='flex flex-col justify-center items-center pt-2 '>
                                                                                                            <p className='text-base font-medium text-green-500'>Result: <span className='text-black'>{resultDesc[0]}</span></p>
                                                                                                            <p className='text-base font-medium text-green-500'>Dragon: <span className='text-black'>{resultDesc[1]}</span></p>
                                                                                                            <p className='text-base font-medium text-green-500'>Tiger: <span className='text-black'>{resultDesc[2]}</span></p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div> : resultDetails.gtype === "dt6" ?
                                                                                                    <div className=''>
                                                                                                        <div className='flex flex-col justify-center items-center space-y-2'>
                                                                                                            <div className="grid grid-cols-2 items-center space-x-2">
                                                                                                                <div className='flex justify-center items-center space-x-2'>
                                                                                                                    <div>
                                                                                                                        {resultDetails.win === "1" ?
                                                                                                                            <div className='flex justify-center items-center pt-4 '>
                                                                                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                            </div> : null
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                    <div>
                                                                                                                        <p className='text-[16px] font-[500]'>Dragon</p>
                                                                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className='flex justify-center items-center space-x-2'>
                                                                                                                    <div>
                                                                                                                        <p className='text-[16px] font-[500]'>Tiger</p>
                                                                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                                                    </div>
                                                                                                                    <div>
                                                                                                                        {resultDetails.win === "2" ?
                                                                                                                            <div className='flex justify-center items-center pt-4 '>
                                                                                                                                <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                            </div> : null
                                                                                                                        }
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className='flex flex-col justify-center items-center pt-2 '>
                                                                                                                <p className='text-base font-medium text-green-500'>Result: <span className='text-black'>{resultDesc[0]}</span></p>
                                                                                                                <p className='text-base font-medium text-green-500'>Dragon: <span className='text-black'>{resultDesc[1]}</span></p>
                                                                                                                <p className='text-base font-medium text-green-500'>Tiger: <span className='text-black'>{resultDesc[2]}</span></p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div> : resultDetails.gtype === "dt202" ?
                                                                                                        <div className=''>
                                                                                                            <div className='flex flex-col justify-center items-center space-y-2'>
                                                                                                                <div className="grid grid-cols-2 items-center space-x-2">
                                                                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                                                                        <div>
                                                                                                                            {resultDetails.win === "1" ?
                                                                                                                                <div className='flex justify-center items-center pt-4 '>
                                                                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                                </div> : null
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                        <div>
                                                                                                                            <p className='text-[16px] font-[500]'>Dragon</p>
                                                                                                                            {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                                                                        <div>
                                                                                                                            <p className='text-[16px] font-[500]'>Tiger</p>
                                                                                                                            {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                                                        </div>
                                                                                                                        <div>
                                                                                                                            {resultDetails.win === "2" ?
                                                                                                                                <div className='flex justify-center items-center pt-4 '>
                                                                                                                                    <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                                </div> : null
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className='flex flex-col justify-center items-center pt-2 '>
                                                                                                                    <p className='text-base font-medium text-green-500'>Result: <span className='text-black'>{resultDesc[0]}</span></p>
                                                                                                                    <p className='text-base font-medium text-green-500'>Dragon: <span className='text-black'>{resultDesc[1]}</span></p>
                                                                                                                    <p className='text-base font-medium text-green-500'>Tiger: <span className='text-black'>{resultDesc[2]}</span></p>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        : resultDetails.gtype === "poker20" ?
                                                                                                            <div className=''>
                                                                                                                <div className='grid grid-cols-2'>

                                                                                                                    <div className='text-center'>
                                                                                                                        <p className='text-[18px] font-[500]'>Player A</p>
                                                                                                                        <div className='flex justify-center items-center space-x-2'>
                                                                                                                            {resultDetails.win === "11" ? <span className='text-[#169733] rounded-full'>
                                                                                                                                <img src={Winner} alt="Trophy" className='h-11 w-12' /></span> :
                                                                                                                                // <span className='text-white rounded-full'>
                                                                                                                                //     <BsTrophyFill size={30} /> 
                                                                                                                                // </span>
                                                                                                                                null}
                                                                                                                            <div className='flex space-x-2 py-2'>
                                                                                                                                <ResultCard num={resultCard[0]} />
                                                                                                                                <ResultCard num={resultCard[1]} />
                                                                                                                            </div>

                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div className='text-center'>
                                                                                                                        <p className='text-[18px] font-[500]'>Player B</p>
                                                                                                                        <div className='flex justify-center items-center space-x-2'>
                                                                                                                            {resultDetails.win === "21" ? <span className='text-[#169733] rounded-full'>
                                                                                                                                <img src={Winner} alt="Trophy" className='h-11 w-12' /></span> :
                                                                                                                                // <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                                null}                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                <ResultCard num={resultCard[2]} />
                                                                                                                                <ResultCard num={resultCard[3]} />
                                                                                                                            </div>

                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>


                                                                                                                <div className='col-span-2 flex flex-col justify-center items-center px-4'>
                                                                                                                    <p className='text-[18px] font-[500]'>Board</p>
                                                                                                                    <div className='flex space-x-2 py-2'>
                                                                                                                        <ResultCard num={resultCard[4]} />
                                                                                                                        <ResultCard num={resultCard[5]} />
                                                                                                                        <ResultCard num={resultCard[6]} />
                                                                                                                        <ResultCard num={resultCard[7]} />
                                                                                                                        <ResultCard num={resultCard[8]} />
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                                <div className='col-span-2 flex justify-start items-center'>
                                                                                                                    <div className='h-9 w-full space-y-1 p-2 bg-[#23292e]'>
                                                                                                                        <p className='text-[14px] font-[500] text-[#aaafb5]'>
                                                                                                                            Winner : <span className='text-white'>{resultDesc[0]}</span></p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div> : resultDetails.gtype === "poker" ?
                                                                                                                <div className=''>
                                                                                                                    <div className=' w-full'>
                                                                                                                        <div className='grid grid-cols-2'>
                                                                                                                            <div className='text-center'>
                                                                                                                                <p className='text-[18px] font-[500]'>Player A</p>
                                                                                                                                <div className='flex justify-center items-center space-x-2'>
                                                                                                                                    {resultDetails.win === "11" ? <span className='text-[#169733] rounded-full'>
                                                                                                                                        <img src={Winner} alt="Trophy" className='h-11 w-12' /></span> :
                                                                                                                                        // <span className='text-white rounded-full'>
                                                                                                                                        //     <BsTrophyFill size={30} /> 
                                                                                                                                        // </span>
                                                                                                                                        null}
                                                                                                                                    <div className='flex space-x-2 py-2'>
                                                                                                                                        <ResultCard num={resultCard[0]} />
                                                                                                                                        <ResultCard num={resultCard[1]} />
                                                                                                                                    </div>

                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div className='text-center'>
                                                                                                                                <p className='text-[18px] font-[500]'>Player B</p>
                                                                                                                                <div className='flex justify-center items-center space-x-2'>
                                                                                                                                    {resultDetails.win === "21" ? <span className='text-[#169733] rounded-full'>
                                                                                                                                        <img src={Winner} alt="Trophy" className='h-11 w-12' /></span> :
                                                                                                                                        // <span className='text-white rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                                        null}                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                        <ResultCard num={resultCard[2]} />
                                                                                                                                        <ResultCard num={resultCard[3]} />
                                                                                                                                    </div>

                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>

                                                                                                                        <div className='col-span-2 flex flex-col justify-center items-center px-4'>
                                                                                                                            <p className='text-[18px] font-[500]'>Board</p>
                                                                                                                            <div className='flex space-x-2 py-2'>
                                                                                                                                <ResultCard num={resultCard[4]} />
                                                                                                                                <ResultCard num={resultCard[5]} />
                                                                                                                                <ResultCard num={resultCard[6]} />
                                                                                                                                <ResultCard num={resultCard[7]} />
                                                                                                                                <ResultCard num={resultCard[8]} />
                                                                                                                            </div>
                                                                                                                        </div>

                                                                                                                        <div className='col-span-2 flex justify-start items-center px-10 py-4'>
                                                                                                                            <div className='h-9 w-full space-y-1 p-2 border-[1px] border-gray-300 text-center'>
                                                                                                                                <p className='text-[14px] font-[500] text-[#aaafb5]'>
                                                                                                                                    Winner : <span className='text-black'>{resultDesc[0]}</span></p>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div> : resultDetails.gtype === "War" ?
                                                                                                                    <div>
                                                                                                                        <div className='lg:block hidden'>
                                                                                                                            <div className='flex flex-col justify-center items-center'>
                                                                                                                                <p className='text-lg font-medium'>Dealer</p>
                                                                                                                                <ResultCard num={resultCard[6]} />
                                                                                                                            </div>
                                                                                                                            <div className='grid grid-cols-6 gap-10 py-6'>
                                                                                                                                <div className="text-center flex flex-col items-center space-y-1">
                                                                                                                                    <p className='text-lg font-medium'>1</p>
                                                                                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                                                                                        <ResultCard num={resultCard[0]} />
                                                                                                                                        {resultDesc.includes("1") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div className="text-center flex flex-col items-center space-y-1">
                                                                                                                                    <p className='text-lg font-medium'>2</p>
                                                                                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                                                                                        <ResultCard num={resultCard[1]} />
                                                                                                                                        {resultDesc.includes("2") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div className="text-center flex flex-col items-center space-y-1">
                                                                                                                                    <p className='text-lg font-medium'>3</p>
                                                                                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                                                                                        <ResultCard num={resultCard[2]} />
                                                                                                                                        {resultDesc.includes("3") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div className="text-center flex flex-col items-center space-y-1">
                                                                                                                                    <p className='text-lg font-medium'>4</p>
                                                                                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                                                                                        <ResultCard num={resultCard[3]} />
                                                                                                                                        {resultDesc.includes("4") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div className="text-center flex flex-col items-center space-y-1">
                                                                                                                                    <p className='text-lg font-medium'>5</p>
                                                                                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                                                                                        <ResultCard num={resultCard[4]} />
                                                                                                                                        {resultDesc.includes("5") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div className="text-center flex flex-col items-center space-y-1">
                                                                                                                                    <p className='text-lg font-medium'>6</p>
                                                                                                                                    <div className='flex justify-center items-center space-x-2'>
                                                                                                                                        <ResultCard num={resultCard[5]} />
                                                                                                                                        {resultDesc.includes("6") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div className='py-2 px-20'>
                                                                                                                                <div className='border-[1px] border-gray-300 pt-2 text-base'>
                                                                                                                                    <p className='flex justify-center items-center font-medium text-green-400'>Winner: <span className='text-black'>{resultDesc}</span> </p>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className='lg:hidden block p-2 space-y-1'>
                                                                                                                            <div className='flex justify-center items-center p-2'>
                                                                                                                                <div className='flex flex-col justify-center items-center'>
                                                                                                                                    <p>Dealer</p>
                                                                                                                                    <ResultCard num={resultCard[6]} />
                                                                                                                                </div>
                                                                                                                                <div>
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div className='flex flex-col justify-center items-center p-2'>
                                                                                                                                <p>1</p>
                                                                                                                                <div className='flex items-center justify-center space-x-2'>
                                                                                                                                    <ResultCard num={resultCard[0]} />
                                                                                                                                    {resultDesc.includes("1") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div className='flex flex-col justify-center items-center p-2'>
                                                                                                                                <p>2</p>
                                                                                                                                <div className='flex items-center justify-center space-x-2'>
                                                                                                                                    <ResultCard num={resultCard[1]} />
                                                                                                                                    {resultDesc.includes("2") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div className='flex flex-col justify-center items-center p-2'>
                                                                                                                                <p>3</p>
                                                                                                                                <div className='flex items-center justify-center space-x-2'>
                                                                                                                                    <ResultCard num={resultCard[2]} />
                                                                                                                                    {resultDesc.includes("3") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                </div>
                                                                                                                            </div>


                                                                                                                            <div className='flex flex-col justify-center items-center p-2'>
                                                                                                                                <p>4</p>
                                                                                                                                <div className='flex items-center justify-center space-x-2'>
                                                                                                                                    <ResultCard num={resultCard[3]} />
                                                                                                                                    {resultDesc.includes("4") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div className='flex flex-col justify-center items-center p-2'>
                                                                                                                                <p>5</p>
                                                                                                                                <div className='flex items-center justify-center space-x-2'>
                                                                                                                                    <ResultCard num={resultCard[4]} />
                                                                                                                                    {resultDesc.includes("5") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div className='flex flex-col justify-center items-center p-2'>
                                                                                                                                <p>6</p>
                                                                                                                                <div className='flex items-center justify-center space-x-2'>
                                                                                                                                    <ResultCard num={resultCard[5]} />
                                                                                                                                    {resultDesc.includes("6") ? <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div className='py-2 px-20'>
                                                                                                                                <div className='border-[1px] border-gray-300 pt-2 text-base'>
                                                                                                                                    <p className='flex justify-center items-center font-medium text-green-400'>Winner: <span className='text-black'>{resultDesc}</span> </p>
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                        </div>
                                                                                                                    </div> : resultDetails.gtype === "cmeter" ?
                                                                                                                        <div>
                                                                                                                            <div className='flex justify-center items-center'>
                                                                                                                                <div className='space-y-3'>
                                                                                                                                    {/* Low Cards Section */}
                                                                                                                                    <div className='flex items-center space-x-6'>
                                                                                                                                        <div>
                                                                                                                                            <p className='text-[18px] font-[500]'>Low Cards</p>
                                                                                                                                        </div>
                                                                                                                                        <div className='flex space-x-1'>
                                                                                                                                            {lowCard.map((card, index) => (
                                                                                                                                                <ResultCard key={index} num={card} />
                                                                                                                                            ))}
                                                                                                                                        </div>
                                                                                                                                    </div>

                                                                                                                                    {/* High Cards Section */}
                                                                                                                                    <div className='flex items-center space-x-6'>
                                                                                                                                        <div>
                                                                                                                                            <p className='text-[18px] font-[500]'>High Cards</p>
                                                                                                                                        </div>
                                                                                                                                        <div className='flex space-x-1'>
                                                                                                                                            {highCard.map((card, index) => (
                                                                                                                                                <ResultCard key={index} num={card} />
                                                                                                                                            ))}
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                            <div className='py-2 px-20'>
                                                                                                                                <div className="w-full text-[#000000] font-[600] text-[14px] flex justify-center items-center p-2 border-[1px] border-gray-300">
                                                                                                                                    {resultDetails && (
                                                                                                                                        resultDetails.win === "1" ? "Winner : Low" :
                                                                                                                                            resultDetails.win === "2" ? "Winner : High" :
                                                                                                                                                "-"
                                                                                                                                    )}
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        : resultDetails.gtype === "cmatch20" ?
                                                                                                                            <div className='w-full'>
                                                                                                                                <div className='flex justify-center items-center text-base space-x-1 py-2'>
                                                                                                                                    <ResultCard num={resultDetails.cards} />
                                                                                                                                </div>
                                                                                                                                <div className='py-2 px-20'>
                                                                                                                                    <div className="w-full text-[#000000] font-[600] text-[14px] flex justify-center items-center p-2 border-[1px] border-gray-300">
                                                                                                                                        {resultDetails && (
                                                                                                                                            resultDetails.win === "1" ? "Run : 1" :
                                                                                                                                                resultDetails.win === "2" ? "Run : 2" :
                                                                                                                                                    resultDetails.win === "3" ? "Run : 3" :
                                                                                                                                                        resultDetails.win === "4" ? "Run : 4" :
                                                                                                                                                            resultDetails.win === "5" ? "Run : 5" :
                                                                                                                                                                resultDetails.win === "6" ? "Run : 6" :
                                                                                                                                                                    resultDetails.win === "7" ? "Run : 7" :
                                                                                                                                                                        resultDetails.win === "8" ? "Run : 8" :
                                                                                                                                                                            resultDetails.win === "9" ? "Run : 9" :
                                                                                                                                                                                resultDetails.win === "10" ? "Run : 10" :
                                                                                                                                                                                    "-"
                                                                                                                                        )}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            : resultDetails.gtype === "baccarat" ?
                                                                                                                                <div className='w-full'>
                                                                                                                                    <div className='grid grid-cols-2 w-full divide-x py-2'>
                                                                                                                                        <div className='flex justify-center items-center space-x-2'>
                                                                                                                                            {resultDetails.win === "1" ? <span className='text-[#169733] rounded-full pt-5'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                            <div>
                                                                                                                                                <div className='text-2xl font-medium text-center'>Player</div>
                                                                                                                                                <div className='flex justify-center items-center text-base space-x-1.5'>
                                                                                                                                                    <span className='-rotate-90'>
                                                                                                                                                        {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                                                                                                                                    </span>
                                                                                                                                                    {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                                                                                    {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div className='flex justify-center items-center space-x-2'>
                                                                                                                                            {resultDetails.win === "2" ? <span className='text-[#169733] rounded-full pt-5'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                            <div>
                                                                                                                                                <div className='text-2xl font-medium text-center'>Banker</div>
                                                                                                                                                <div className='flex justify-center items-center text-base space-x-1.5'>
                                                                                                                                                    {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                                                                                    {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                                                                                                                    <span className='rotate-90'>
                                                                                                                                                        {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                                                                                                                                    </span>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='py-2 px-20'>
                                                                                                                                        <div className="w-full text-[#000000] font-[600] text-[14px] flex justify-center items-center p-2 border-[1px] border-gray-300">
                                                                                                                                            {resultDetails && (
                                                                                                                                                resultDetails.win === "1" ? "Winner : Player" :
                                                                                                                                                    resultDetails.win === "2" ? "Winner : Banker" :
                                                                                                                                                        "Tie"
                                                                                                                                            )}
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                : resultDetails.gtype === "baccarat2" ?
                                                                                                                                    <div className=''>
                                                                                                                                        <div className='grid grid-cols-2 w-full divide-x py-2'>
                                                                                                                                            <div className='flex justify-center items-center space-x-2'>
                                                                                                                                                {resultDetails.win === "1" ? <span className='text-[#169733] rounded-full pt-5'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                                <div>
                                                                                                                                                    <div className='text-2xl font-medium text-center'>Player</div>
                                                                                                                                                    <div className='flex justify-center items-center text-base space-x-1.5'>
                                                                                                                                                        <span className='-rotate-90'>
                                                                                                                                                            {resultCard[4] === "1" ? null : <ResultCard num={resultCard[4]} />}
                                                                                                                                                        </span>
                                                                                                                                                        {resultCard[2] === "1" ? null : <ResultCard num={resultCard[2]} />}
                                                                                                                                                        {resultCard[0] === "1" ? null : <ResultCard num={resultCard[0]} />}
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                            <div className='flex justify-center items-center space-x-2'>
                                                                                                                                                {resultDetails.win === "2" ? <span className='text-[#169733] rounded-full pt-5'><BsTrophyFill size={30} /> </span> : null}
                                                                                                                                                <div>
                                                                                                                                                    <div className='text-2xl font-medium text-center'>Banker</div>
                                                                                                                                                    <div className='flex justify-center items-center text-base space-x-1.5'>
                                                                                                                                                        {resultCard[1] === "1" ? null : <ResultCard num={resultCard[1]} />}
                                                                                                                                                        {resultCard[3] === "1" ? null : <ResultCard num={resultCard[3]} />}
                                                                                                                                                        <span className='rotate-90'>
                                                                                                                                                            {resultCard[5] === "1" ? null : <ResultCard num={resultCard[5]} />}
                                                                                                                                                        </span>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                        <div className='py-2 px-20'>
                                                                                                                                            <div className="w-full text-[#000000] font-[600] text-[14px] flex justify-center items-center p-2 border-[1px] border-gray-300">
                                                                                                                                                <div>  {resultDetails && (
                                                                                                                                                    resultDetails.win === "1" ? "Winner : Player" :
                                                                                                                                                        resultDetails.win === "2" ? "Winner : Banker" :
                                                                                                                                                            "Tie"
                                                                                                                                                )}
                                                                                                                                                </div>
                                                                                                                                                {/* <p className='text-base font-medium text-green-500'>Winner Pair: <span className='text-black'>{resultDetails.desc}</span></p> */}
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    : <>
                                                                                                                                        {/* 3card jugement page model  */}
                                                                                                                                        {/* <div className='flex justify-center items-center space-x-2'>
                                                                                                                                    <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                    <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                    <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                </div> */}
                                                                                                                                        {/*3card jugement page model  */}
                                                                                                                                        {/* oneday teenpatti page model  */}
                                                                                                                                        {/* <div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Player A</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex justify-center items-center pt-2 '>
                                                                                                                                        <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Player B</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>

                                                                                                                                </div> */}
                                                                                                                                        {/* oneday teenpatti page model  */}
                                                                                                                                        {/* test teenpatti page model  */}
                                                                                                                                        {/* <div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Tiger</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex justify-center items-center pt-2 '>
                                                                                                                                        <span className='text-[#169733] rounded-full'><BsTrophyFill size={30} /> </span>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Lion</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>
                                                                                                                                        <p className='text-[24px] font-[500]'>Dragon</p>
                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>

                                                                                                                                </div> */}
                                                                                                                                        {/* test teenpatti page model  */}
                                                                                                                                        {/* dragon tiger page model  */}
                                                                                                                                        {/* <div>
                                                                                                                                    <div className='flex flex-col justify-center items-center'>

                                                                                                                                        <div className='flex space-x-2 py-2'>
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                            <img src="/images/2DD.png" alt="" className="h-14 w-11" />
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                    <div className='flex flex-col justify-center items-center pt-2 '>
                                                                                                                                        <p className='font-medium text-green-400'>Result: <span className='text-black'>Dragon|No Pair</span> </p>
                                                                                                                                        <p className='font-medium text-green-400'>Dragon: <span className='text-black'>Black|Even|Card4</span> </p>
                                                                                                                                        <p className='font-medium text-green-400'>Tiger: <span className='text-black'>Black|Even|Card2</span> </p>
                                                                                                                                    </div>
                                                                                                                                </div> */}
                                                                                                                                        {/* dragon tiger page model  */}
                                                                                                                                    </>}
                </div>
            </div >
        </div >
    );
}

export default ResultModelBmx;