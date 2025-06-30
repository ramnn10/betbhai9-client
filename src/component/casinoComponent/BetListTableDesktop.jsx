/* eslint-disable react/prop-types */
import moment from 'moment';
import cardA from "./images/Acard.png";
import card2 from "./images/2card.png";
import card3 from "./images/card3.png";
import card4 from "./images/card4.png";
import card6 from "./images/card6.png";
import card10 from "./images/card10.png";
import cardK from "./images/cardK.png";

import ball1 from "./images/1ball.png";
import ball2 from "./images/2ball.png";
import ball3 from "./images/3ball.png";
import ball4 from "./images/4ball.png";
import ball6 from "./images/6ball.png";
import ball0 from "./images/0ball.png";
import wicket from "./images/wicket.png";

export default function BetListTableDesktop({betList ,eventId}) {

    return (
<>
        <div className="overflow-x-auto w-full pb-2 border-color">
            <table className="min-w-full capitalize border-color">
                <tr className="w-full table-header black-text text-[13px] font-semibold text-center rounded-b">
                    <th colSpan={4} className="px-3 py-1 border-color whitespace-nowrap text-center">Team</th>
                    {/* <th className="px-3 py-1 whitespace-nowrap">Odds</th> */}
                    <th className="px-3 py-1 border-color whitespace-nowrap">Mode</th>
                    <th className="px-3 py-1 border-color whitespace-nowrap">Rate</th>
                    <th className="px-3 py-1 border-color whitespace-nowrap">Amount</th>
                    <th className="px-3 py-1 border-color whitespace-nowrap">Result</th>
                    <th className="px-3 py-1 border-color whitespace-nowrap">Date & Time</th>
                </tr>
                {betList && betList.length > 0 ? betList.map((tempData,index) => (
                    <tr key={index} className={`w-full text-black ${tempData.betType === "L" ? "bg-[var(--matchLagai)]" : "bg-[var(--matchKhai)]"} text-[13px] font-semibold text-center rounded-b `}>
                        <td colSpan={4} className="px-1.5 py-1 border-color whitespace-nowrap text-center">{tempData.playerName} <br />({tempData.roundId})</td>
                        {/* <td className="px-3 py-1 whitespace-nowrap">{tempData.amount}</td> */}
                        <td className="px-3 py-1 whitespace-nowrap border-color">{tempData.betType === "L" ? "Back" : "Lay"}</td>
                        <td className="px-3 py-1 whitespace-nowrap border-color">{tempData.odds}</td>
                        <td className="px-3 py-1 whitespace-nowrap border-color">
                            {Number.parseFloat(Math.abs(tempData.amount)).toFixed(2).replace(/\.?0+$/, "")}
                        </td>
                        <td className={`px-3 py-1 whitespace-nowrap border-color ${tempData.profitLoss < 0 ? "text-red-500" : tempData.profitLoss > 0 ? "text-green-800" : "text-black"}`}>{tempData.profitLoss}
                            <br />
                            {tempData.isDeclare === 1 ?
                                <small>({tempData.showResult})</small> : null
                            }
                        </td>
                        {/* <td className={`px-3 py-1 whitespace-nowrap border-color`}>
                            {tempData.isDeclare === 1 ?
                                <>{tempData.showResult}</> :
                                "Not Declare"
                            }
                        </td> */}
                        <td className="px-3 py-1 whitespace-nowrap border-color"> {tempData && tempData.createdAt ? moment(tempData.createdAt).utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss") : ''}</td>
                    </tr>)) :
                    (
                        <tr className="w-full text-[#212529] bg-[#F2F2F2] text-[13px] font-[400] text-center rounded-b">
                            <td colSpan={9} className="px-3 py-1 w-full text-center border-color"> No placed bet found !</td>
                        </tr>)
                }
            </table>
        </div>
        {eventId == 3060 ?
            <div className='w-full'>
                <div className="bg-[var(--casinoHeader)] text-white text-[14px] px-2 py-[6px] font-medium tracking-wide mt-3">
                    ENGLAND vs RSA Inning&apos;s Card Rules
                </div>
                <div className='overflow-x-auto w-full'>
                    <table className="table w-full bg-[#f7f7f7] black-text border border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                        <thead>
                            <tr className=''>
                                <th className="text-left">Cards</th>
                                <th className="text-center">Count</th>
                                <th className="text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-[#c7c8ca] '>
                            <tr>
                                <td className='flex justify-start items-center'><img src={cardA} className='h-[40px]' /><span className="ms-2">X</span></td>
                                <td className="text-center">5</td>
                                <td className="flex justify-end items-center"><img src={ball1} className='h-[40px]' /></td>
                            </tr>
                            <tr>
                                <td className='flex justify-start items-center'><img src={card2} className='h-[40px]' /><span className="ms-2">X</span></td>
                                <td className="text-center">5</td>
                                <td className="flex justify-end items-center"><img src={ball2} className='h-[40px]' /></td>
                            </tr>
                            <tr>
                                <td className='flex justify-start items-center'><img src={card3} className='h-[40px]' /><span className="ms-2">X</span></td>
                                <td className="text-center">5</td>
                                <td className="flex justify-end items-center"><img src={ball3} className='h-[40px]' /></td>
                            </tr>
                            <tr>
                                <td className='flex justify-start items-center'><img src={card4} className='h-[40px]' /><span className="ms-2">X</span></td>
                                <td className="text-center">5</td>
                                <td className="flex justify-end items-center"><img src={ball4} className='h-[40px]' /></td>
                            </tr>
                            <tr>
                                <td className='flex justify-start items-center'><img src={card6} className='h-[40px]' /><span className="ms-2">X</span></td>
                                <td className="text-center">5</td>
                                <td className="flex justify-end items-center"><img src={ball6} className='h-[40px]' /></td>
                            </tr>
                            <tr>
                                <td className='flex justify-start items-center'><img src={card10} className='h-[40px]' /><span className="ms-2">X</span></td>
                                <td className="text-center">5</td>
                                <td className="flex justify-end items-center"><img src={ball0} className='h-[40px]' /></td>
                            </tr>
                            <tr>
                                <td className='flex justify-start items-center'><img src={cardK} className='h-[40px]' /><span className="ms-2">X</span></td>
                                <td className="text-center">5</td>
                                <td className="text-end flex justify-end items-center">
                                    <span>Wicket</span>
                                    <img src={wicket} className='h-[40px]' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            :
            eventId == 3051 ?
                <div className='w-full'>
                    <div className="bg-[var(--casinoHeader)] text-white text-[14px] px-2 py-[6px] font-medium tracking-wide mt-3">
                        Rules
                    </div>
                    <div className='overflow-x-auto w-full'>
                        <table className="table w-full bg-[#f7f7f7] darktext text-[14px] border border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                            <thead>
                                <tr className='bg-white'>
                                    <th colSpan="3" className="text-center font-[600]">Bonus 1 (2 Cards Bonus)</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-[#c7c8ca]'>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Pair (2-10)	</span></td>
                                    <td className="text-left">1 To 3 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">A/Q or A/J Off Suited		</span></td>
                                    <td className="text-left">1 To 5 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Pair (JQK)		</span></td>
                                    <td className="text-left">1 To 10 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">A/K Off Suited		</span></td>
                                    <td className="text-left">1 To 15 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">A/Q or A/J Suited		</span></td>
                                    <td className="text-left">1 To 20 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">A/K Suited		</span></td>
                                    <td className="text-left">1 To 25 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">A/A		</span></td>
                                    <td className="text-left">1 To 30 </td>
                                </tr>

                            </tbody>
                        </table>
                        <table className="table w-full bg-[#f7f7f7] darktext text-[14px] border-r border-l border-b border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                            <thead>
                                <tr className='bg-white'>
                                    <th colSpan="3" className="text-center font-[600]">Bonus 2 (7 Cards Bonus) </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-[#c7c8ca]'>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Three of a Kind		</span></td>
                                    <td className="text-left">1 To 3 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Three of a Kind		</span></td>
                                    <td className="text-left">1 To 4 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Flush	</span></td>
                                    <td className="text-left">1 To 6 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Full House		</span></td>
                                    <td className="text-left">1 To 8 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Four of a Kind		</span></td>
                                    <td className="text-left">1 To 30 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Straight Flush		</span></td>
                                    <td className="text-left">1 To 50 </td>
                                </tr>
                                <tr className='divide-x divide-[#c7c8ca] '>
                                    <td className='text-left'><span className="ms-2">Royal Flush			</span></td>
                                    <td className="text-left">1 To 100 </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                :
                eventId == 3030 ?
                    <div className='w-full'>
                        <div className="bg-[var(--casinoHeader)] text-white text-[14px] px-2 py-[6px] font-medium tracking-wide mt-3">
                            Rules
                        </div>
                        <div className='overflow-x-auto w-full'>
                            <table className="table w-full bg-[#f7f7f7] darktext text-[14px] border border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                                <thead>
                                    <tr className='bg-white'>
                                        <th colSpan="3" className="text-center font-[600]">Pair Plus </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-[#c7c8ca]'>
                                    <tr className='divide-x divide-[#c7c8ca] '>
                                        <td className='text-left'><span className="ms-2">Pair</span></td>
                                        <td className="text-left">1 To 1 </td>
                                    </tr>
                                    <tr className='divide-x divide-[#c7c8ca] '>
                                        <td className='text-left'><span className="ms-2">Flush	</span></td>
                                        <td className="text-left">1 To 4 </td>
                                    </tr>
                                    <tr className='divide-x divide-[#c7c8ca] '>
                                        <td className='text-left'><span className="ms-2">Straight</span></td>
                                        <td className="text-left">1 To 6 </td>
                                    </tr>
                                    <tr className='divide-x divide-[#c7c8ca] '>
                                        <td className='text-left'><span className="ms-2">Trio	</span></td>
                                        <td className="text-left">1 To 30 </td>
                                    </tr>
                                    <tr className='divide-x divide-[#c7c8ca] '>
                                        <td className='text-left'><span className="ms-2">Straight Flush			</span></td>
                                        <td className="text-left">1 To 40 </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    eventId == 3049 ?
                        <div className='w-full'>
                            <div className="bg-[var(--casinoHeader)] text-white text-[14px] px-2 py-[6px] font-medium tracking-wide mt-3">
                                Rules
                            </div>
                            <div className='overflow-x-auto w-full'>
                                <table className="table w-full bg-[#f7f7f7] darktext text-[14px] border border-[#c7c8ca] divide-y divide-[#c7c8ca]">
                                    <thead>
                                        <tr className='bg-white'>
                                            <th colSpan="3" className="text-center font-[600]">Pair Plus </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-[#c7c8ca]'>
                                        <tr className='divide-x divide-[#c7c8ca] '>
                                            <td className='text-left'><span className="ms-2">Pair</span></td>
                                            <td className="text-left">1 To 1 </td>
                                        </tr>
                                        <tr className='divide-x divide-[#c7c8ca] '>
                                            <td className='text-left'><span className="ms-2">Flush	</span></td>
                                            <td className="text-left">1 To 4 </td>
                                        </tr>
                                        <tr className='divide-x divide-[#c7c8ca] '>
                                            <td className='text-left'><span className="ms-2">Straight</span></td>
                                            <td className="text-left">1 To 6 </td>
                                        </tr>
                                        <tr className='divide-x divide-[#c7c8ca] '>
                                            <td className='text-left'><span className="ms-2">Trio	</span></td>
                                            <td className="text-left">1 To 30 </td>
                                        </tr>
                                        <tr className='divide-x divide-[#c7c8ca] '>
                                            <td className='text-left'><span className="ms-2">Straight Flush			</span></td>
                                            <td className="text-left">1 To 40 </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        null

        }
        </>

    );
}