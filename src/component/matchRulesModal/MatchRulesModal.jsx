import React from 'react';
import { RiCloseFill } from 'react-icons/ri'
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function MatchRulesModal(props) {
  const [showRules, setShowRules] = useState(1);
  const [activeItem, setActiveItem] = useState(1);


  const viewRulesSection = (data) => {
    setShowRules(data)
    setActiveItem(data);
  }

  const { setModalFalse, oddsType } = props;

  const isBookmaker = oddsType === 'bookmaker';
  const isMatchOdds = oddsType === 'matchOdds';
  const isMatchtoss = oddsType === 'toss';
  const isMatchtied = oddsType === 'tiedMatch';
  const isFancy = oddsType === 'fancy';


  return (

    <div className="fixed inset-0 top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 max-h-full overflow-auto flex justify-center items-start">
      <div className="md:w-[90%]  w-full p-4 mt-4">
        <div className=" w-full h-full bg-[var(--primary)] flex justify-between colour_sky px-2 py-3.5 items-center">
          <h2 className="text-white font-semibold text-[20px]">
            {isBookmaker ? 'Bookmaker Rules' : isMatchOdds ? 'Match Odds Rules' : isMatchtoss ? 'Toss Rules' : isMatchtied ? 'Tied Rules' : isFancy ? 'Fancy Rules' : 'Rules'}
          </h2>
          <span onClick={() => setModalFalse()}>
            <FaTimes size={24} className='text-white cursor-pointer' />
          </span>
        </div>
        <div className="overflow-auto bg-white py-3 px-1">
          <div className='md:px-5 px-0 py-2'>
            {isBookmaker && (
              <>
                <div className='border-[1px] border-gray-300 divide-y-[1px] divide-gray-300'>
                  <div className='text-red-500 p-2'>
                    Due to any reason any team will be getting advantage or disadvantage we are not concerned.
                  </div>
                  <div className='text-red-500 p-2'>
                    Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example incase of vpn/robot-use/multiple entry from same IP/ multiple bets at the same time (Punching) and others. Note : only winning bets will be voided.
                  </div>
                  <div className='text-red-500 p-2'>
                    We will simply compare both teams 25 overs score higher score team will be declared winner in ODI (25 over comparison)
                  </div>
                  <div className='text-red-500 p-2'>
                    We will simply compare both teams 10 overs higher score team will be declared winner in T20 matches (10 over comparison)
                  </div>
                  <div className='text-red-500 p-2'>
                    Any query about the result or rates should be contacted within 7 days of the specific event, the same will not be considered valid post 7 days from the event.
                  </div>
                  <div className='text-red-500 p-2'>
                    If two team ends up with equal points, then result will be given based on the official point table
                  </div>
                  <div className='text-red-500 p-2'>
                    Tennis:- Advance fancy market
                  </div>
                  <div className='text-black p-2 leading-none'>
                    If the second set is not completed all bets regarding this market will be voided
                  </div>
                  <div className='text-black p-2 leading-none'>
                    If a player retires after completion of second set, then the market will be settled as three sets
                  </div>
                  <div className='text-red-500 p-2'>
                    Virtual Cricket
                  </div>
                  <div className='text-black p-2 leading-none'>
                    At any situation if the video gets interrupted/stopped then the same cannot be continued due to any technical issues bookmaker market will be voided
                  </div>
                </div>
              </>
            )}

            {isMatchOdds && (
              <>
                <div className='border-[1px] border-gray-300 divide-y-[1px] divide-gray-300'>
                  <div className='text-black p-2 leading-none'>
                    CRICKET Match Odds :- In the event of match not being completed or tied all bets will be void.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    TENNIS Match Odds :- If 1st set has been not completed at the time of the retirement or disqualification, then all bets relating to that individual match will be void.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    FOOTBALL Match Odds :- All bets apply to the relevant full 'regular time' period including stoppage time. Any extra-time and/or penalty shoot-out is not included. For the cancellation of a goal, due to VAR, bets matched between the time of the goal being scored and the time at which the video assistant referee finishes the review will be voided. For the cancellation of a red card, due to VAR, bets matched after the time at which the video assistant referee commences the review will be voided.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    FOOTBALL Under_Over Goals :- In the event of a match starting but not being completed, all bets will be void, unless the specific market outcome is already determined,
                  </div>
                </div>
              </>
            )}

            {isMatchtoss && (
              <>
                <div className='border-[1px] border-gray-300 divide-y-[1px] divide-gray-300'>
                  <div className='text-red-500 p-2'>
                    Due to any reason any team will be getting advantage or disadvantage we are not concerned.
                  </div>
                  <div className='text-red-500 p-2'>
                    Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example incase of vpn/robot-use/multiple entry from same IP/ multiple bets at the same time (Punching) and others. Note : only winning bets will be voided.
                  </div>
                  <div className='text-red-500 p-2'>
                    We will simply compare both teams 25 overs score higher score team will be declared winner in ODI (25 over comparison)
                  </div>
                  <div className='text-red-500 p-2'>
                    We will simply compare both teams 10 overs higher score team will be declared winner in T20 matches (10 over comparison)
                  </div>
                  <div className='text-red-500 p-2'>
                    Any query about the result or rates should be contacted within 7 days of the specific event, the same will not be considered valid post 7 days from the event.
                  </div>
                  <div className='text-red-500 p-2'>
                    If two team ends up with equal points, then result will be given based on the official point table
                  </div>
                  <div className='text-red-500 p-2'>
                    Tennis:- Advance fancy market
                  </div>
                  <div className='text-black p-2 leading-none'>
                    If the second set is not completed all bets regarding this market will be voided
                  </div>
                  <div className='text-black p-2 leading-none'>
                    If a player retires after completion of second set, then the market will be settled as three sets
                  </div>
                  <div className='text-red-500 p-2'>
                    Virtual Cricket
                  </div>
                  <div className='text-black p-2 leading-none'>
                    At any situation if the video gets interrupted/stopped then the same cannot be continued due to any technical issues bookmaker market will be voided
                  </div>
                </div>
              </>
            )}

            {isMatchtied && (
              <>
                <div className='border-[1px] border-gray-300 divide-y-[1px] divide-gray-300'>
                  <div className='text-black p-2 leading-none'>
                    CRICKET Match Odds :- In the event of match not being completed or tied all bets will be void.
                  </div>

                </div>
              </>
            )}

            {isFancy && (
              <>
                <div className='border-[1px] border-gray-300 divide-y-[1px] divide-gray-300'>
                  <div className='text-black p-2 leading-none'>
                    1. All fancy bets will be validated when match has been tied.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    2. All advance fancy will be suspended before toss or weather condition.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    3. In case technical error or any circumstances any fancy is suspended and does not resume result will be given all previous bets will be valid (based on haar/jeet).
                  </div>
                  <div className='text-black p-2 leading-none'>
                    4. If any case wrong rate has been given in fancy that particular bets will be cancelled.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    5. In any circumstances management decision will be final related to all exchange items. Our scorecard will be considered as valid if there is any mismatch in online portal.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    6. In case customer make bets in wrong fancy we are not liable to delete, no changes will be made and bets will be consider as confirm bet.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    7. Due to any technical error market is open and result has came all bets after result will be deleted.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    8. Manual bets are not accepted in our exchange.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    9. Our exchange will provide 5 second delay in our tv.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    10. Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example incase of vpn/robot-use/multiple entry from same IP/ multiple bets at same time (Punching) and others. Note : only winning bets will be voided. For example: If we find such entries (above mentioned) from any id and their bets are (200000 lay in a 6 over session for the rate 40 and 200000 back for the rate of 48) and the actual score is 38, bets of 40 lay will be voided and the bets for 48 back will be considered valid.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    11. Company reserves the right to void any bets (only winning bets) of any event at any point of the match if the company believes there is any cheating/wrong doing in that particular event by the players (either batsman/bowler).
                  </div>
                  <div className='text-black p-2 leading-none'>
                    12. Once our exchange give username and password it is your responsibility to change a password.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    13. Penalty runs will be counted in all fancy. (This rule applicable from 20th March 2024).
                  </div>
                  <div className='text-red-500 p-2 leading-none'>
                    14. Warning: Live scores and other data on this site is sourced from third party feeds and may be subject to time delays and/or be inaccurate. If you rely on this data to place bets, you do so at your own risk. Our exchange does not accept responsibility for loss suffered as a result of reliance on this data.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    15. Traders will be block the user ID if find any misinterpret activities, No queries accept regarding.
                  </div>
                  <div className='text-black p-2 leading-none'>
                    16. Our exchange is not responsible for misuse of client id.
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}