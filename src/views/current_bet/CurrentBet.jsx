import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getBetListfunc } from '../../redux/reducers/user_reducer';
import moment from 'moment/moment';

const CurrentBet = () => {
  const { betList, loading } = useSelector((state) => state.user);
  const [pageNumber, setPageNumber] = useState(1);

  const [selected, setSelected] = useState("All");
  const dispatch = useDispatch()
  const [paginationPage, setPaginationPage] = useState(1)

  let pageSize = 30;
  const totalPages = Math.ceil(betList?.length / pageSize);

  useEffect(() => {
    getBetLists();
  }, [dispatch, pageNumber, pageSize]);
  useEffect(() => {
    getBetLists();
  }, []);

  const getBetLists = async () => {
    const reqData = {
      fancyBet: true,
      oddsBet: true,
      isDeclare: false,
      diamondBet: true,
      isClientExposure: true,
      pageNo: pageNumber,
      size: +pageSize,
    }

    dispatch(getBetListfunc(reqData));
  };


  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);

  }

  return (
    <div className='shadow-md min-h-[40%]'>
      <div className='w-full bg-[var(--secondary)]  text-white p-2 text-[20px]'>
        Current Bets
      </div>
      <div className='grid md:grid-cols-3 grid-cols-1'>
        <div className='grid md:grid-cols-2 grid-cols-1 justify-center gap-2 items-center w-full p-2'>
          <select className='border py-2 bg-white  w-full'>
            <option value=''>Select Report Type</option>
            <option value='sports'>Sports</option>
            <option value='Casino'>Casino</option>
          </select>

          <button className='bg-[var(--primary)] hover:bg-[#6C2D2CB3] md:w-full  h-[40px]  text-white'>
            Submit
          </button>

        </div>

        <div></div>

      </div>

      <div className='lg:grid w-full md:text-[16px] text-[12px] lg:grid-cols-4 grid-cols-2 hidden  my-2 mx-2 pr-2'>
        <div className='w-full '>
          <div className='flex gap-2 justify-start items-center '>
            <div>Show</div>
            <select className='border py-2 bg-white w-[42%]  '>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
              <option value='40'>40</option>
            </select>
            <div>Enteries</div>
          </div>

        </div>
        <div className='flex  justify-center items-center gap-2'>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="betType"
              value="All"
              checked={selected === "All"}
              onChange={() => setSelected("All")}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full  ${selected === "All"
                ? "border-[var(--secondary)] bg-white border-4"
                : "border-gray-400 border bg-white"
                }`}
            ></div>
            <span className="text-gray-800 text-sm">All</span>
          </label>


          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="betType"
              value="Back"
              checked={selected === "Back"}
              onChange={() => setSelected("Back")}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full  ${selected === "Back"
                ? "border-[var(--secondary)] bg-white border-4"
                : "border-gray-400 border bg-white"
                }`}
            ></div>
            <span className="text-gray-800 text-sm">Back</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="betType"
              value="Lay"
              checked={selected === "Lay"}
              onChange={() => setSelected("Lay")}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full  ${selected === "Lay"
                ? "border-[var(--secondary)] bg-white border-4"
                : "border-gray-400 border bg-white"
                }`}
            ></div>
            <span className="text-gray-800 text-sm">Lay</span>
          </label>

        </div>
        <div className='flex justify-center items-center'>Total Bets : 0  &nbsp;&nbsp; Total Amount : 0</div>
        <div className='flex justify-end items-center gap-1'>
          <span>Search :</span>
          <input className='border bg-white w-[50%] p-2'
            placeholder={`${betList?.length} records...`}
          />
        </div>
      </div>

      <div className='px-2'>
        <div className='lg:hidden flex justify-between items-center w-full md:text-[16px] text-[12px] '>
          <div className='flex gap-2 justify-start items-center w-full mx-0 '>
            <div>Show</div>
            <select className='border py-2 bg-white  w-[40%]  '>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='30'>30</option>
              <option value='40'>40</option>
            </select>
            <div>Enteries</div>
          </div>
          <div className='flex  justify-end items-center gap-2'>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="betType"
                value="All"
                checked={selected === "All"}
                onChange={() => setSelected("All")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full  ${selected === "All"
                  ? "border-[var(--secondary)] bg-white border-4"
                  : "border-gray-400 border bg-white"
                  }`}
              ></div>
              <span className="text-gray-800 text-[12px]">All</span>
            </label>
            {/* <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="betType"
                value="All"
                checked={selected === "All"}
                onChange={() => setSelected("All")}
                className="sr-only"
              />
              <span>All</span>
            </label> */}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="betType"
                value="Back"
                checked={selected === "Back"}
                onChange={() => setSelected("Back")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full  ${selected === "Back"
                  ? "border-[var(--secondary)] bg-white border-4"
                  : "border-gray-400 border bg-white"
                  }`}
              ></div>
              <span className="text-gray-800 text-[12px]">Back</span>
            </label>

            {/* <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="betType"
                value="Back"
                checked={selected === "Back"}
                onChange={() => setSelected("Back")}
                className="sr-only"
              />
              <span>Back</span>
            </label> */}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="betType"
                value="Lay"
                checked={selected === "Lay"}
                onChange={() => setSelected("Lay")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full  ${selected === "Lay"
                  ? "border-[var(--secondary)] bg-white border-4"
                  : "border-gray-400 border bg-white"
                  }`}
              ></div>
              <span className="text-gray-800 text-[12px]">Lay</span>
            </label>
            {/* <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="betType"
                value="Lay"
                checked={selected === "Lay"}
                onChange={() => setSelected("Lay")}
                className="sr-only"
              />
              <span>Lay</span>
            </label> */}
          </div>



        </div>

        <div className='lg:hidden flex justify-between items-center w-full md:text-[16px] text-[12px] py-1'>

          <div className='flex justify-start items-center w-[50%]'>Total Bets : 0   Total Amount : 0</div>
          <div className='flex justify-end items-center gap-1 w-[50%]'>
            <span>Search :</span>
            <input className='border w-[60%] p-2'
              placeholder={`${betList?.length || 0} records...`}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden ">
        <div className="max-w-full overflow-auto">
          <div className="inline-block min-w-full">
            <div className="overflow-hidden w-full">
              <table className="min-w-full border-collapse border text-sm rounded text-left overflow-x-auto border-gray-400">
                <thead className="">
                  <tr className="text-left lg:text-md text-[14px] lg:bg-[#F7F7F7] text-white lg:text-black bg-[var(--secondary)] font-semibold border border-[#c7c8ca]">
                    <th className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">Event Name</th>
                    <th className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">Type</th>
                    <th className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">User Rate</th>
                    <th className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">Amount</th>
                    <th className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">Place Date</th>
                    <th className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">
                      <input
                        type="checkbox"
                        // checked={checked}
                        // onChange={handleChange}
                        className='accent-[var(--secondary)] bg-white'
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {betList && betList.length > 0 ? (
                    betList.map((data, index) => (
                      <tr
                        key={index}
                        className={`text-md text-black ${data?.type === "LAGAI" ? "bg-[var(--matchLagai)]" : data?.type === "KHAI" ? "bg-[var(--matchKhai)]"
                          : "bg-[#F2F2F2]"
                          }`}>
                        <td className="px-4 whitespace-nowrap border border-[#c7c8ca] py-3">{data?.market}</td>
                        <td className="px-4 whitespace-nowrap border border-[#c7c8ca] py-3">{data?.type}</td>
                        <td className="px-4 whitespace-nowrap border border-[#c7c8ca] py-3">{data?.rate}</td>
                        <td className="px-4 whitespace-nowrap border border-[#c7c8ca] py-3">{data?.amount}</td>
                        <td className="px-4 whitespace-nowrap border border-[#c7c8ca] py-3">
                          {moment(data?.time).format("DD-MM-YYYY")}
                        </td>
                        <td className="px-4 whitespace-nowrap py-2 border-b">
                          <input
                            type="checkbox"
                            // checked={checked}
                            // onChange={handleChange}
                            className='bg-white accent-[var(--secondary)]'
                          />
                          {/* {data?.odds} */}
                        </td>
                      </tr>
                    ))
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="lg:flex lg:flex-row flex-col  justify-center items-center my-2 gap-4">

        <div className="flex justify-center items-center ">
          <button
            onClick={() => {
              setPageNumber(1);
              setPaginationPage(1)
            }}
            className="px-3 py-1 border text-black text-sm"

          >
            First
          </button>
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            className="px-3 py-1 border text-black text-sm"
            disabled={pageNumber === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border text-black text-sm"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
          <button
            className="px-3 py-1 border text-black text-sm"
            onClick={() => { setPageNumber(totalPages); setPaginationPage(totalPages) }}
          >
            Last
          </button>

        </div>
        <div className='space-x-2 flex justify-center items-center gap-2 lg:mt-0 mt-2'>
          <span>Page {pageNumber} of {totalPages}  </span>
          <span>Go to Page</span>
          <input
            onChange={(e) => { setPaginationPage(e.target.value) }}
            value={paginationPage}
            className='border p-2 w-32'></input>
        </div>

      </div> */}
    </div>
  )
}

export default CurrentBet;


