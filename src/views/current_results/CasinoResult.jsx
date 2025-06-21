import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendar } from "react-icons/fa6";

const CasinoResult = () => {

  const [paginationPage, setPaginationPage] = useState(1)
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const totalPages = Math.ceil(2 / pageSize);

  //const totalPages = Math.ceil(betList?.length / pageSize);
  //  useEffect(() => {
  //      getBetLists();
  //    }, [dispatch, pageNumber, pageSize]);
  const casinoNameList = [
    {
      name: "All Casino",
      payload: "All_Casino",

      url: "",
      //   games: ["All Casino"],
    },
    {
      name: "Roulette",
      payload: "Roulette",

      url: "",
      //   games: ["All Casino ,Roulette"],
    },
    {
      name: "TeenPatti",
      payload: "TeenPatti",

      url: "",
      //   game: ["All Casino ,TeenPatti"],
    },
    {
      name: "Poker",
      payload: "Poker",

      url: "",
      //   game: ["All Casino ,Poker"],
    },
    {
      name: "Baccarat",
      payload: "Baccarat",

      url: "",
      //   game: ["All Casino ,Baccarat"],
    },
    {
      name: "Dragon Tiger",
      payload: "Dragon_Tiger",

      url: "",
      //   game: ["All Casino ,Dragon Tiger"],
    },
    {
      name: "Card 32",
      payload: "Card_32",

      url: "",
      //   game: ["All Casino ,Card 32"],
    },
    {
      name: "Andar Bahar",
      payload: "Andar_Bahar",

      url: "",
      //   game: ["All Casino ,Andar Bahar"],
    },
    {
      name: "Lucky_7",
      payload: "Lucky_7",

      url: "",
      //   game: ["All Casino ,Lucky 7"],
    },
    {
      name: "3 Card Judgement",
      payload: "3_Card_Judgement",
      url: "",

      //   game: ["All Casino ,3 Card Judgement"],
    },
    {
      name: "Casino War",
      payload: "Casino_War",

      url: "",
      //   game: ["All Casino ,Casino War"],
    },
    {
      name: "worli",
      payload: "worli",
      url: "",

      //   game: ["All Casino ,worli"],
    },
    {
      name: "Sports",
      payload: "Sports",
      url: "",

      //   game: ["All Casino ,Sports"],
    },
    {
      name: "Bollywood",
      payload: "Bollywood",
      url: "",

      //   game: ["All Casino ,Bollywood"],
    },
    {
      name: "Lottery",
      payload: "Lottery",
      url: "",

      //   game: ["All Casino ,Lottery"],
    },
    {
      name: "Queen",
      payload: "Queen",
      url: "",

      //   game: ["All Casino ,Queen"],
    },
    {
      name: "Race",
      payload: "Race",
      url: "",

      //   game: ["All Casino ,Race"],
    },
    {
      name: "other",
      payload: "other",
      url: "",

      //   game: ["All Casino ,other"],
    },
  ];

  const calendarIcon = (
    <FaRegCalendar className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
  );

  return (
    <>
      <div className='border shadow-lg min-h-[46%]'>
        <div className="bg-[var(--secondary)] flex justify-between px-3 py-1.5">
          <h2 className="text-[16px] lg:text-[20px] text-white font-[400]">Casino Results</h2>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 px-2'>
          <div className='grid md:grid-cols-3 grid-cols-2 justify-center gap-2 items-center w-full py-2'>
            {/* <input type='date' className='border p-1.5 2xl:mr-20 bg-white' >
          </input> */}
            <div className="relative">
              <DatePicker
                // selected={payloadData?.toDate}
                // onChange={(date) => setPayloadData({ ...payloadData, toDate: date })}
                dateFormat="dd/MM/yyyy"
                className="!px-2 !py-[5px] text-sm border border-gray-400 w-full focus:outline-none text-black"
                required
                showIcon
                icon={calendarIcon}
              />
            </div>
            <select className='border py-2 bg-white  w-full'>
              <option value=''>Select Report Type</option>
              {
                casinoNameList?.map((element, index) => {
                  return (<option key={index}>{element?.name}</option>)
                })
              }
            </select>
            <button className='bg-[var(--primary)] hover:bg-[#6C2D2CB3] w-full md:block hidden h-[40px]  text-white'>
              Submit
            </button>
          </div>
          <button className='bg-[var(--primary)] hover:bg-[#6C2D2CB3] w-full  h-[40px] md:hidden block text-white'>
            Submit
          </button>
          <div></div>
        </div>
        <div className="w-full flex justify-between items-center gap-2 px-1 py-1.5">
          <div className="flex items-center input-group relative space-x-1">
            <span className="mr-2 lg:text-[14px] text-[12px]">Show</span>
            <select className="md:w-[150px] sm:w-1/2 bg-white border py-1 px-2">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
            <span className="lg:text-[14px] text-[12px]">Entries</span>
          </div>
          <div className="flex justify-end items-center gap-2 input-group relative ">
            <span className="lg:text-[14px] text-[12px]">Search:</span>
            <input
              type="search"
              className="px-3 py-1.5 text-[1rem] bg-transparent border border-gray-500/30 lg:w-full w-[80%] focus:outline-none text-[#495057] placeholder:text-gray-500"
              // placeholder={`${betList?.length || 0} records...`}
              placeholder="0 records..."
              value=""
            />
          </div>
        </div>
        <div className='w-full overflow-x-auto p-1'>
          <table className="min-w-full text-sm text-left border border-gray-200 rounded overflow-hidden">
            <thead className="bg-gray-100   text-gray-700">
              <tr className="text-left lg:text-md text-[14px] lg:bg-[#F7F7F7] text-white lg:text-black bg-[var(--secondary)] font-semibold border border-[#c7c8ca]">
                <th className="px-4 w-[10%] border border-[#c7c8ca] whitespace-nowrap py-2 ">Round ID</th>
                <th className="px-4 border border-[#c7c8ca] whitespace-nowrap py-2 ">Winner</th>
              </tr>
            </thead>
            <tbody>
              {/* {betList?.map((data, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">{data?.market}</td>
              <td className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">{data?.type}</td>
              <td className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">{data?.rate}</td>
              <td className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">{data?.amount}</td>
              <td className="px-4 whitespace-nowrap py-3 border border-[#c7c8ca]">
                {moment(data?.time).format("DD-MM-YYYY")}
              </td>
              <td className="px-4 whitespace-nowrap py-2 border border-[#c7c8ca]">{data?.odds}</td>
            </tr>
          ))} */}
            </tbody>
          </table>

        </div>
      </div>
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

      </div>
    </>
  )
}

export default CasinoResult