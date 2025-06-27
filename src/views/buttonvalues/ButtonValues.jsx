import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { userUpdate } from '../../redux/reducers/user_reducer';
import { RxCross1 } from "react-icons/rx";
import { domainName } from '../../config/Auth';

const ButtonValues = () => {
  const [formattedButtonValues, setFormattedButtonValues] = useState([]);
  const [formattedCasinoValue, setFormattedCasinoValue] = useState([])
  const dispatch = useDispatch();
  const Id = JSON.parse(localStorage.getItem(`user_info_${domainName}`))?.data?.userId;
  const [gamesButton, setGamesButton] = useState(true)
  const [casinoButtons, setCasinoButtons] = useState(false)

  const handleToggle = () => {
    document.body.classList.toggle("StakeModalOpen");
  };


  useEffect(() => {
    let betChipsDataItems = JSON.parse(localStorage.getItem('clientbetChipsData'));
    let betChips = betChipsDataItems || {};

    const keyValues1 = Object.entries(betChips).map(([key, value]) => ({
      key,
      value: parseInt(value),
    }));
    setFormattedButtonValues(keyValues1);
  }, []);

  const handleKeyChange = (index, newKey) => {

    const updatedValues = [...formattedButtonValues];
    updatedValues[index].key = newKey;
    setFormattedButtonValues(updatedValues);
  };


  const handleValueChange = (index, newValue) => {
    if (/^\d*$/.test(newValue) && (newValue === '' || newValue.length <= 10)) {
      const updatedValues = [...formattedButtonValues];
      updatedValues[index].value = newValue === '' ? '' : Number(newValue);
      setFormattedButtonValues(updatedValues);
    } else {
      console.error('Please enter a valid integer value with up to 10 digits.');
    }
  };

  const handleSubmit = () => {
    const data = {};
    formattedButtonValues.forEach((item) => {
      data[item.key] = item.value;
    });

    let reqData = {
      userId: Id,
      betChipsData: data,
    };

    dispatch(userUpdate(reqData)).then((response) => {
    });
    localStorage.setItem('clientbetChipsData', JSON.stringify(data));
  };


  if (!localStorage.getItem('casinoBet')) {
    localStorage.setItem('casinoBet', JSON.stringify({
      25: 25,
      50: 50,
      100: 100,
      200: 200,
      500: 500,
      1000: 1000
    }));
  }

  const handleCasinoKeyChange = (index, newKey) => {
    const updatedValues = [...formattedCasinoValue];
    updatedValues[index].key = newKey;
    setFormattedCasinoValue(updatedValues);
  };

  const handleCasinoValueChange = (index, newValue) => {
    if (/^\d*$/.test(newValue) && newValue.length <= 10) {
      const updatedValues = [...formattedCasinoValue];
      updatedValues[index].value = newValue;
      setFormattedCasinoValue(updatedValues);
    } else {
    }
  };
  useEffect(() => {
    if (!localStorage.getItem('casinoBet')) {
      localStorage.setItem('casinoBet', JSON.stringify({
        25: 25,
        50: 50,
        100: 100,
        200: 200,
        500: 500,
        1000: 1000
      }));
    }

    const betChipsDataItems = localStorage.getItem('casinoBet');
    const betChips = betChipsDataItems ? JSON.parse(betChipsDataItems) : {};

    const keyValues1 = Object.entries(betChips).map(([key, value]) => ({
      key,
      value: value.toString()
    }));

    setFormattedCasinoValue(keyValues1);
  }, []);

  const handleCasinoSubmit = () => {
    const data = {};

    formattedCasinoValue.forEach((item) => {
      // Ensure key is valid and value is a number
      const key = item.key;
      const value = parseInt(item.value, 10);

      if (!isNaN(value) && key !== '') {
        data[key] = value;
      }
    });

    localStorage.setItem('casinoBet', JSON.stringify(data));
  };

  const handleGames = (data) => {
    if (data == 'casino') {
      setCasinoButtons(true)
      setGamesButton(false)
    }
    if (data == 'games') {
      setCasinoButtons(false)
      setGamesButton(true)
    }
  }



  return (
    <div className='w-full bg-white'>

      <div className='border rounded-none bg-white  border-gray-300'>
        <div className='flex justify-between  rounded-t  bg-[var(--secondary)]  text-black p-1.5 pl-5'>
          <h2 className='text-[16px] lg:text-[20px] text-white'>Change Button Values</h2>
        </div>
        {/* <div className={`w-full text-[18px] items-center flex justify-between text-white bg-[var(--primary)] p-3 font-bold `}>
          <span>Set Button Value</span>
          <RxCross1 onClick={(e) => {
            handleToggle()
            e.preventDefault()
          }} className='' />
        </div> */}
        <div className='flex pt-2 pb-1 px-2'>
          <button onClick={() => { handleGames('games') }} className={`px-2 py-1 border ${gamesButton ? 'bg-[var(--secondary)] text-white' : 'bg-[#CCCCCC]'}`}>
            Games Buttons
          </button>
          <button onClick={() => { handleGames('casino') }} className={`px-2 py-1 border ${gamesButton ? 'bg-[#CCCCCC]' : 'bg-[var(--secondary)] text-white'}`}>
            Casino Buttons
          </button>

        </div>

        <div className='w-full lg:w-[810px] rounded-[4px] mt-1'>
          {gamesButton &&
            <div className='px-3'>
              <table className="w-full text-sm text-left px-4">
                <thead className="text-[12px] text-[#243a48]  ">
                  <tr className="">
                    <th scope="col" className="px-[2px] md:text-[16px] text-[13px] text-black w-[16.5%] py-0.5  ">
                      Price Label :
                    </th>
                    <th scope="col" className="px-[2px] md:text-[16px] text-[13px] text-black w-[16.5%] py-0.5  ">
                      Price Value :
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formattedButtonValues.map((item, index) => (
                    <tr key={index} className=''>

                      <td className='py-1 pr-1'>
                        <input
                          type="text"
                          value={item.key}
                          className="w-full border-2 rounded-[1px] py-1.5 px-2 bg-white"
                          onChange={(e) => {
                            handleKeyChange(index, e.target.value)
                            e.stopPropagation()
                          }}
                        />
                      </td>
                      <td className='py-1 pl-1'>
                        <input
                          type="number"
                          value={item.value}
                          className="w-full border-2 rounded-[1px] py-1.5 px-2 bg-white"
                          onChange={(e) => {
                            handleValueChange(index, e.target.value)
                            e.stopPropagation()
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className=''>
                    <td colSpan={2}>
                      <button
                        type='button'
                        className="hover:opacity-85 md:bg-[var(--bluebtn)] md:border-[var(--bluebtn)] border md:rounded-[0.25rem] bg-[var(--primary)] 
                        md:w-1/6 w-full my-4 min-h-[40px]"
                        onClick={handleSubmit}
                      >
                        <span className="text-white w-full text-[17px] px-[19px] py-[20px]">
                          Update
                        </span>
                      </button>
                    </td>

                  </tr>
                </tbody>

              </table>
            </div>}

          {casinoButtons &&
            <div className='px-3'>
              <table className="w-full text-sm text-left   px-4">
                <thead className="text-[12px] text-[#243a48]  ">
                  <tr className="">
                    <th scope="col" className="px-[2px] md:text-[16px] text-[13px] text-black w-[16.5%] py-1  ">
                      Price Label :
                    </th>
                    <th scope="col" className="px-[2px]  md:text-[16px] text-[13px] text-black w-[16.5%] py-1  ">
                      Price Value :
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formattedCasinoValue.map((item, index) => (
                    <tr key={index} className='w-full'>
                      <td className='py-2 pr-2'>
                        <input
                          type="text"
                          value={item.key}
                          className="w-full border-2 rounded-[1px] py-1.5 px-2 bg-white"
                          onChange={(e) => {
                            handleCasinoKeyChange(index, e.target.value)
                            e.stopPropagation()
                          }}
                        />
                      </td>
                      <td className='py-2 pl-2'>
                        <input
                          type="number"
                          value={item.value}
                          className="w-full border-2 rounded-[1px] py-1.5 px-2 bg-white"
                          onChange={(e) => {
                            handleCasinoValueChange(index, e.target.value)
                            e.stopPropagation()
                          }}
                        />
                      </td>

                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>
                      <button
                        type='button'
                        className="hover:opacity-85 md:bg-[var(--bluebtn)] md:border-[var(--bluebtn)] border md:rounded-[0.25rem] bg-[var(--primary)] 
                        md:w-1/4 w-full my-4 min-h-[40px]"
                        onClick={() => handleCasinoSubmit()}
                      >
                        <span className="text-white w-full text-[17px] px-[19px] py-[20px]">
                          Update
                        </span>
                      </button>
                    </td>

                  </tr>
                </tbody>

              </table>

            </div>}
        </div>

      </div>

    </div>
  )
}

export default ButtonValues