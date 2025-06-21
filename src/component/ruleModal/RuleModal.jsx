import React from 'react';
import { RiCloseFill } from 'react-icons/ri'
import { useState } from 'react';

export default function RuleModel(props) {
    const [showRules, setShowRules] = useState(1);
    const [activeItem, setActiveItem] = useState(1);


    const viewRulesSection = (data) => {
        setShowRules(data)
        setActiveItem(data);
    }

    const { setModalFalse } = props;

    return (

        <div className="fixed h-full w-full inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50">
            <div className='w-full  fixed top-2 flex items-center justify-center'>
                <div class="xl:w-[60%] lg:w-[80%] w-full bg-white text-black absolute top-0">
                    <div className=" w-full h-full bg-[var(--primary)] flex justify-between colour_sky px-2 py-3.5 items-center">
                        <h2 className="text-white font-semibold text-[20px]">
                            Rules
                        </h2>
                        <span onClick={() => setModalFalse()}>
                            <RiCloseFill size={24} className='text-white cursor-pointer' />
                        </span>
                    </div>
                    <div className=' md:flex px-[10px] py-[9px]  overflow-y-auto rules-main'>
                        <div className='md:w-[239px]    w-full overflow-auto flex md:flex-col flex-row colour_sky text-black capitalize font-normal text-base bg-[var(--rule-bg)]'>
                            <div onClick={() => viewRulesSection(1)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 1 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>horse racing</span>
                            </div>
                            <div onClick={() => viewRulesSection(2)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 2 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Handball</span>
                            </div>
                            <div onClick={() => viewRulesSection(3)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 3 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Table tennis</span>
                            </div>
                            <div onClick={() => viewRulesSection(4)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 4 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Basketball</span>
                            </div>
                            <div onClick={() => viewRulesSection(5)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 5 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Vollyball</span>
                            </div>
                            <div onClick={() => viewRulesSection(6)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 6 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Ice hockey</span>
                            </div>
                            <div onClick={() => viewRulesSection(7)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 7 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Football</span>
                            </div>
                            <div onClick={() => viewRulesSection(8)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 8 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>tennis</span>
                            </div>
                            <div onClick={() => viewRulesSection(9)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 9 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Snooker</span>
                            </div>
                            <div onClick={() => viewRulesSection(10)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 10 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>E-Games</span>
                            </div>
                            <div onClick={() => viewRulesSection(11)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 11 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Futsal</span>
                            </div>
                            <div onClick={() => viewRulesSection(12)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 12 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Big Bash League</span>
                            </div>
                            <div onClick={() => viewRulesSection(13)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 13 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Lunch Favourite</span>
                            </div>
                            <div onClick={() => viewRulesSection(14)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 14 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Politics
                                </span>
                            </div>
                            <div onClick={() => viewRulesSection(15)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 15 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Bookmaker</span>
                            </div>
                            <div onClick={() => viewRulesSection(16)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 16 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Teenpatti</span>
                            </div>
                            <div onClick={() => viewRulesSection(17)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 17 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>CricketCasino</span>
                            </div>
                            <div onClick={() => viewRulesSection(18)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 18 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Fancy Market 1</span>
                            </div>
                            <div onClick={() => viewRulesSection(19)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 19 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Football Fancy</span>
                            </div>
                            <div onClick={() => viewRulesSection(20)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 20 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>IPL</span>
                            </div>
                            <div onClick={() => viewRulesSection(21)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 21 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Kabaddi</span>
                            </div>
                            <div onClick={() => viewRulesSection(22)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 22 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>World Cup</span>
                            </div>
                            <div onClick={() => viewRulesSection(23)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 23 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Khado</span>
                            </div>
                            <div onClick={() => viewRulesSection(24)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 24 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Election</span>
                            </div>
                            <div onClick={() => viewRulesSection(25)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 25 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Fancy</span>
                            </div>
                            <div onClick={() => viewRulesSection(26)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 26 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Match</span>
                            </div>
                            <div onClick={() => viewRulesSection(27)} className={`px-2.5 py-1 border-b border-black whitespace-nowrap text-center text-[16px] cursor-pointer ${activeItem === 27 ? 'bg-[var(--primary)] text-white font-semibold' : 'bg-[var(--rule-bg)]'}`}>
                                <span>Binary</span>
                            </div>
                        </div>
                        <div className='md:w-[85%] w-full rules-scrolldata font-normal text-black '>
                            {showRules === 1 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Horse Racing
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300 text-[17px]'>
                                            <div className='text-red-500 p-3'>
                                                Genral
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                All individual race markets will be determined according to the official result at the time of the 'weigh-in' announcement (or equivalent). Subsequent disqualifications, appeals or amendments to the result will be disregarded.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                If the scheduled venue is changed after the market has been loaded by us, all bets will be void.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Where a race does not take part on its scheduled day, all bets will be void.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                If a scheduled surface type is changed (e.g., turf to dirt) all bets will stand.
                                            </div>
                                            <div className='text-red-500 p-3'>
                                                Non-Runner Rule
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Our's non-runner rule relates to the adjustment of odds-on bets already matched when a horse in a race is declared a non-runner. Toadjust We apply a reduction factor to the remaining runners. The reduction factor allocated to a non-runner is a calculation (the details of which are described below) of that horse's chances of winning (or being placed, etc as appropriate) and is applied to bets already matched on the other runners in the relevant market or markets.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Any horse listed when the relevant market is loaded which does not subsequently come under the starter's orders is deemed to be a non-runner.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                When the market is loaded each horse is given a 'reduction factor, based on a forecast price, which is expressed as a percentage. These reduction factors may be updated periodically at the discretion of the Us based on trading in the market, but after approximately 15 minutes (approximately 5 minutes for Australian and US markets) from the scheduled 'off' time of a given race, they will be updated only in exceptional circumstances. The current reduction factor percentage for each horse can be viewed on the 'info' page on Our website or by asking the Helpdesk.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Accurate reduction factors will only be applied to selections in the event of a non-runner. Once a non-runner is declared each selection in the market will be given an appropriate reduction factor. Reduction factors can be amended at Our’s discretion at any time throughout the market life cycle (including post-race).
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                For Australian racing, reduction factors may be updated periodically at the discretion of the Us based on trading in the market, but after approximately five minutes from the scheduled off time of a given race, they will be updated only in exceptional circumstances.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Reductions will be made to both win and place markets but applied differently (as described below), and horses will have a different reduction factor for each market.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                As soon as We become aware that a horse is an official non-runner or a highly likely non-runner, following a statement to the press from connections, the following will happen:
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                All matched bets on that horse will be void and the horse will be removed from the market.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                In the win market: if the reduction factor of the non-runner is 2.5% or greater, the traded price of all the matched bets on the remaining horses will be reduced by an amount equal to the non-runner final reduction factor and all the unmatched offers to lay will be cancelled. If the non-runners reduction factor is less than 2.5%, reductions will not be applied and unmatched bets will not be cancelled.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                In the place market, the reduction factor of all non-runners will be applied (even if less than 2.5%) and the potential winnings aboutmatched bets on the remaining horses will be reduced by an amount equal to the non-runners final reduction factor. Only if the non-runners reduction factor is 4.0% or greater will all the unmatched offers to lay be cancelled.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                All the reduction factors on the remaining horses will be adjusted to reflect their improved chance of winning.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Reduction factors are not applied to bets which are struck in play. However, if a market is turned in-play prematurely by error (or, for example, there is a false start), all bets matched during this time will be subject to any later reduction factor, provided the market is turned out of play before the race commences. In the event of a late withdrawal, wereserve the right to remove the runner after the completion of the race. In this case, only those bets matched before the off will be affected by a reduction factor.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                In the event of a non-runner being removed from a race in error or following incorrect information regarding a runner’s participation, we will reinstate both the runner and all previously matched bets associated with that runner. All bets made between the time of withdrawal and reinstatement will be void in both the place market and the win market. The reduction factor applied to matched bets at the time of withdrawal will be reversed and the original prices will become valid.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Any non-runners will be removed from the relevant markets in the order in which they are brought to our attention. If We become aware of more than one non-runner at the same time, it will remove the non-runners from the relevant markets in race card order.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                If a runner is not included in a market because of an error or because of incorrect information regarding a runner’s participation, we reserve the right to introduce the missing runner into the market at any time before settlement (even after the race has been run), provided that We are determined that the missing runner is not a material runner (i.e., a selection with a reduction factor of approx. 2.5% or less in the win market). In such circumstances, all pre-play unmatched and matched bets will stand, however, if the runner is not introduced before the start of the race, all in-play bets will be void. However, if the missing runner is deemed to be a material runner, then the malformed market will be void and a new market will be loaded where possible.
                                            </div>
                                            <div className='text-red-500 p-3'>
                                                How the Reductions are applied to Exchange markets
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                In the win market, reductions will be made on the traded price. For example: if the non-runners final reduction factor is 25% the traded price on all previously matched bets on other horses will be reduced by 25% - the traded price of 8.0 would become 6.0 etc. And these might be further reduced if another horse is subsequently declared a non-runner.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                In the EW Market, reductions will be made on the traded win price. The advertised place terms will then apply to the revised win prices. For example: if the non-runners final reduction factor is 25% the traded price on all previously matched bets on other horses will be reduced by 25% - - the traded price of 8.0 would become 6.0. If each Way terms were 1/5th odds for 3 places, the corresponding price for the Place portion of the bet would reduce from 2.4 to 2.0.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                In the place market, reductions will be made to the potential winnings on the bet only, and not the traded price. For example: if the non-runners final reduction factor is 25% the potential winnings on all previously matched bets on the other horses will be reduced by 25% - a traded price of 8.0 would become 6.25. For example, a £10 bet on a horse to be placed at a traded price of 8.0 would provide winnings of £70. If there is a non-runner with a reduction factor of 25% in the race, that factor will be applied to the £70 of potential winnings leaving potential winnings of £52.50. Therefore, the revised traded price will be 6.25.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                The traded price may be further reduced if any other horse(s) is subsequently declared a non-runner, however, odds cannot be reduced below 1.01.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                For the avoidance of doubt, any reduction factor applicable to a non-runner replaced by a reserve will be applied to all bets struck on the relevant markets, before the removal from those markets of such non-runner by Us. Likewise, should a reserve runner become a confirmed runner but subsequently become a non-runner, any reduction factor applicable to such non-runner will be applied to all bets struck on the relevant markets, before the removal from those markets of such non-runner by Us.
                                            </div>
                                            <div className='text-red-500 p-3'>
                                                Additional rules
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Card numbers are posted as a guide only: bets are placed on a named horse.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Horses will not be coupled.
                                            </div>
                                            <div className='text-black p-3 leading-none'>
                                                Where any horse(s) runs for purse money only it is deemed a non-runner for betting purposes. Should this result in the number of possible winners stated in the relevant Market Information being equal to or greater than the number of runners in the relevant Betfair market, all bets in the market will be void.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}

                            {showRules === 2 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Handball
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Next Goal: - Predict which team will score the X-th goal.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half: - Predict which half will have the most goals scored (1st, 2nd, or Draw). Bet will be settled on regulation time only and exclude overtime if played:
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Halftime/Fulltime: - Predict the result of a match at halftime and at the end of regular time. If a game is abandoned, bets will be void. Example: If you choose 1/X, you bet on the home team to lead in the first half and the match to end in a draw. Extra time doesn’t count.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 3 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Table Tennis
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: -Predict which player will win the match. In the event of any of the named players in a match changing before the match starts then all bets are void. In the event of a match starting but not being completed, all bets will be void.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - The specified set must be completed for bets to stand unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Under / Over Points: -For example, a game is abandoned at 9-7: bets on Over/Under 16.5 Game - Total Points are settled as winners/losers respectively, since any natural conclusion to the game would have yielded at least 18 points.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 4 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Basketball
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds :- Predict which team will be the winner. There must be 5 minutes or less of scheduled game time left for bets to have action.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Quarter Winner :- The quarter must be completed for bets to have action, unless settlement of bets is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                1st Half Winner / 2nd Half Winner :- The first half must be completed for first half bets to stand. If a game is postponed or cancelled after the start, for game and second half bets there must be 5 minutes or less remaining for bets to have action, unless settlement of bets is already determined. (Including Overtime if played.)
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half :- Predict in which half most points will be scored. OT is not included in 2nd Half.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 5 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Vollyball
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - In the event of the set not being completed bets will be void. Exceptions are made for bets on sets that are already over, in this case, the bets will be settled.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 6 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Ice Hockey
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Period Winner: - Predict the winner of the relevant period. The relevant period must be completed for bets to have action unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Period: - If 2 or more periods have the same score Tie will be settled as the winner. (Exclude overtime/shootouts for settlement purposes)
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 7 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Football
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Next Goal: - Predict which team will score the X-th goal.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half: - Predict which half will have the most goals scored (1st, 2nd, or Draw). Bet will be settled on regulation time only and exclude overtime if played:
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Halftime/Fulltime: - Predict the result of a match at halftime and at the end of regular time. If a game is abandoned, bets will be void. Example: If you choose 1/X, you bet on the home team to lead in the first half and the match to end in a draw. Extra time doesn’t count.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 8 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Tennis
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: -Predict which player will win the match. In the event of any of the named players in a match changing before the match starts then all bets are void. In the event of a match starting but not being completed, all bets will be void.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - The specified set must be completed for bets to stand unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Under / Over Points: -For example, a game is abandoned at 9-7: bets on Over/Under 16.5 Game - Total Points are settled as winners/losers respectively, since any natural conclusion to the game would have yielded at least 18 points.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 9 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Snooker
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds :- Predict which team will be the winner. There must be 5 minutes or less of scheduled game time left for bets to have action.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Quarter Winner :- The quarter must be completed for bets to have action, unless settlement of bets is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                1st Half Winner / 2nd Half Winner :- The first half must be completed for first half bets to stand. If a game is postponed or cancelled after the start, for game and second half bets there must be 5 minutes or less remaining for bets to have action, unless settlement of bets is already determined. (Including Overtime if played.)
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half :- Predict in which half most points will be scored. OT is not included in 2nd Half.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 10 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        E-Games
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - In the event of the set not being completed bets will be void. Exceptions are made for bets on sets that are already over, in this case, the bets will be settled.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 11 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Fustal
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Period Winner: - Predict the winner of the relevant period. The relevant period must be completed for bets to have action unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Period: - If 2 or more periods have the same score Tie will be settled as the winner. (Exclude overtime/shootouts for settlement purposes)
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 12 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Big Bash League
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Next Goal: - Predict which team will score the X-th goal.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half: - Predict which half will have the most goals scored (1st, 2nd, or Draw). Bet will be settled on regulation time only and exclude overtime if played:
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Halftime/Fulltime: - Predict the result of a match at halftime and at the end of regular time. If a game is abandoned, bets will be void. Example: If you choose 1/X, you bet on the home team to lead in the first half and the match to end in a draw. Extra time doesn’t count.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 13 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Lunch Favourite
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: -Predict which player will win the match. In the event of any of the named players in a match changing before the match starts then all bets are void. In the event of a match starting but not being completed, all bets will be void.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - The specified set must be completed for bets to stand unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Under / Over Points: -For example, a game is abandoned at 9-7: bets on Over/Under 16.5 Game - Total Points are settled as winners/losers respectively, since any natural conclusion to the game would have yielded at least 18 points.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 14 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Politics
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds :- Predict which team will be the winner. There must be 5 minutes or less of scheduled game time left for bets to have action.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Quarter Winner :- The quarter must be completed for bets to have action, unless settlement of bets is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                1st Half Winner / 2nd Half Winner :- The first half must be completed for first half bets to stand. If a game is postponed or cancelled after the start, for game and second half bets there must be 5 minutes or less remaining for bets to have action, unless settlement of bets is already determined. (Including Overtime if played.)
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half :- Predict in which half most points will be scored. OT is not included in 2nd Half.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 15 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Bookmaker
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - In the event of the set not being completed bets will be void. Exceptions are made for bets on sets that are already over, in this case, the bets will be settled.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 16 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Teenpatti
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Period Winner: - Predict the winner of the relevant period. The relevant period must be completed for bets to have action unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Period: - If 2 or more periods have the same score Tie will be settled as the winner. (Exclude overtime/shootouts for settlement purposes)
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 17 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        CricketCasino
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Next Goal: - Predict which team will score the X-th goal.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half: - Predict which half will have the most goals scored (1st, 2nd, or Draw). Bet will be settled on regulation time only and exclude overtime if played:
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Halftime/Fulltime: - Predict the result of a match at halftime and at the end of regular time. If a game is abandoned, bets will be void. Example: If you choose 1/X, you bet on the home team to lead in the first half and the match to end in a draw. Extra time doesn’t count.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 18 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Fancy Market 1
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: -Predict which player will win the match. In the event of any of the named players in a match changing before the match starts then all bets are void. In the event of a match starting but not being completed, all bets will be void.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - The specified set must be completed for bets to stand unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Under / Over Points: -For example, a game is abandoned at 9-7: bets on Over/Under 16.5 Game - Total Points are settled as winners/losers respectively, since any natural conclusion to the game would have yielded at least 18 points.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 19 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Football Fancy
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds :- Predict which team will be the winner. There must be 5 minutes or less of scheduled game time left for bets to have action.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Quarter Winner :- The quarter must be completed for bets to have action, unless settlement of bets is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                1st Half Winner / 2nd Half Winner :- The first half must be completed for first half bets to stand. If a game is postponed or cancelled after the start, for game and second half bets there must be 5 minutes or less remaining for bets to have action, unless settlement of bets is already determined. (Including Overtime if played.)
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half :- Predict in which half most points will be scored. OT is not included in 2nd Half.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 20 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        IPL
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - In the event of the set not being completed bets will be void. Exceptions are made for bets on sets that are already over, in this case, the bets will be settled.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 21 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Kabaddi
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Period Winner: - Predict the winner of the relevant period. The relevant period must be completed for bets to have action unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Period: - If 2 or more periods have the same score Tie will be settled as the winner. (Exclude overtime/shootouts for settlement purposes)
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 22 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        World Cup
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Period Winner: - Predict the winner of the relevant period. The relevant period must be completed for bets to have action unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Period: - If 2 or more periods have the same score Tie will be settled as the winner. (Exclude overtime/shootouts for settlement purposes)
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 23 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Khado
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Next Goal: - Predict which team will score the X-th goal.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half: - Predict which half will have the most goals scored (1st, 2nd, or Draw). Bet will be settled on regulation time only and exclude overtime if played:
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Halftime/Fulltime: - Predict the result of a match at halftime and at the end of regular time. If a game is abandoned, bets will be void. Example: If you choose 1/X, you bet on the home team to lead in the first half and the match to end in a draw. Extra time doesn’t count.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 24 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Election
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: -Predict which player will win the match. In the event of any of the named players in a match changing before the match starts then all bets are void. In the event of a match starting but not being completed, all bets will be void.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - The specified set must be completed for bets to stand unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Under / Over Points: -For example, a game is abandoned at 9-7: bets on Over/Under 16.5 Game - Total Points are settled as winners/losers respectively, since any natural conclusion to the game would have yielded at least 18 points.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 25 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Fancy
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-black p-2 leading-none'>
                                                Match Odds :- Predict which team will be the winner. There must be 5 minutes or less of scheduled game time left for bets to have action.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Quarter Winner :- The quarter must be completed for bets to have action, unless settlement of bets is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                1st Half Winner / 2nd Half Winner :- The first half must be completed for first half bets to stand. If a game is postponed or cancelled after the start, for game and second half bets there must be 5 minutes or less remaining for bets to have action, unless settlement of bets is already determined. (Including Overtime if played.)
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Half :- Predict in which half most points will be scored. OT is not included in 2nd Half.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 26 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Match
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Set Winner: - In the event of the set not being completed bets will be void. Exceptions are made for bets on sets that are already over, in this case, the bets will be settled.
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                            {showRules === 27 ?
                                <>
                                    <h2 className="text-white bg-[var(--secondary)] m-2 text-xl colour_sky px-2 py-1">
                                        Binary
                                    </h2>
                                    <div className='md:px-5 px-0 py-1'>
                                        <div className='border-2 border-gray-300 divide-y-2 divide-gray-300'>
                                            <div className='text-red-500 p-2'>
                                                Match
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Match odds: - Predict which team will be the winner. Bets will be void if the match is not completed.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Period Winner: - Predict the winner of the relevant period. The relevant period must be completed for bets to have action unless the specific market outcome is already determined.
                                            </div>
                                            <div className='text-black p-2 leading-none'>
                                                Highest Scoring Period: - If 2 or more periods have the same score Tie will be settled as the winner. (Exclude overtime/shootouts for settlement purposes)
                                            </div>
                                        </div>
                                    </div>
                                </>
                                : null}
                        </div>
                    </div>
                    <div className='flex justify-end p-6  items-center'>
                        <span className='bg-[#BD1828] text-white text-[14px] py-2 px-4' onClick={() => setModalFalse()}>
                            CLOSE
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}