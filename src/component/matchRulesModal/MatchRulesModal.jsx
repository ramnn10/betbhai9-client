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

  const { setModalFalse } = props;

  return (

    <div className="fixed inset-0 top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 max-h-full overflow-auto flex justify-center items-start">
      <div className="md:w-[90%]  w-full p-4 mt-4">
        <div className=" w-full h-full bg-[var(--primary)] flex justify-between colour_sky px-2 py-3.5 items-center">
          <h2 className="text-white font-semibold text-[20px]">
            Bookmaker Rules
          </h2>
          <span onClick={() => setModalFalse()}>
            <FaTimes size={24} className='text-white cursor-pointer' />
          </span>
        </div>
        <div className="overflow-auto bg-white py-3 px-1">
          <div className='md:px-5 px-0 py-2'>
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
          </div>
        </div>
      </div>
    </div>
  );
}