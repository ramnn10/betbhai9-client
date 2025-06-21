import moment from 'moment-timezone';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendar } from "react-icons/fa6";

function ActiveLog() {

    const [payloadData, setPayloadData] = useState({
        fromDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        statementFor: "",
    });

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalPages = 10;

    const [paginationPage, setPaginationPage] = useState(1)


    const calendarIcon = (
        <FaRegCalendar className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
    );

    return (
        <div className="w-full min-h-screen flex">
            <div className="w-full">
                <div className="bg-[var(--secondary)] flex justify-between px-3 py-1.5">
                    <h2 className="text-[16px] lg:text-[20px] text-white font-[400]">Activity Log</h2>
                </div>
                <div className="p-1 border-1 border-gray-400 shadow-lg space-y-2">
                    {/* desktop view */}
                    <div className="justify-start hidden lg:flex items-center p-1 space-x-2">
                        <div className="flex w-[50%] justify-between lg:space-x-10 space-x-4">
                            <div className="flex gap-12">
                                <div className="relative w-48">
                                    <DatePicker
                                        selected={payloadData?.fromDate}
                                        // onChange={(date) => setPayloadData({ ...payloadData, fromDate: date })}
                                        dateFormat="dd/MM/yyyy"
                                        className="!px-2 !py-[5px] text-sm border border-gray-400 w-full focus:outline-none text-black bg-white"
                                        required
                                        showIcon
                                        icon={calendarIcon}
                                    />
                                </div>
                                <div className="relative w-48">
                                    <DatePicker
                                        selected={payloadData?.toDate}
                                        // onChange={(date) => setPayloadData({ ...payloadData, toDate: date })}
                                        dateFormat="dd/MM/yyyy"
                                        className="!px-2 !py-[5px] text-sm border border-gray-400 w-full focus:outline-none text-black bg-white"
                                        required
                                        showIcon
                                        icon={calendarIcon}
                                    />
                                </div>
                            </div>

                            <select
                                className="px-3 py-1.5 text-md bg-transparent border  border-gray-500/30 w-[36%] focus:outline-none text-[#495057] placeholder-text-gray-500"
                            // onChange={handleSelectChange}
                            // value={setPayloadData?.statementFor}
                            >
                                <option value="">Select Log Type</option>
                                <option value="login">Login</option>
                                <option value="change_password">Change Password</option>
                            </select>
                        </div>
                        <button
                            // onClick={handleSubmit}
                            className="py-1.5 px-20 ml-2 bg-[var(--primary)] hover:bg-[#6C2D2CB3] text-white text-md w-full lg:w-auto"
                        >
                            Submit
                        </button>
                    </div>
                    {/* mobile view */}
                    <div className="flex flex-col lg:hidden items-center space-y-2 lg:space-y-0 space-x-0 lg:space-x-6">
                        <div className="flex w-full gap-2 justify-around">
                            <div className="relative w-48">
                                <DatePicker
                                    selected={payloadData?.fromDate}
                                    // onChange={(date) => setPayloadData({ ...payloadData, fromDate: date })}
                                    dateFormat="dd/MM/yyyy"
                                    className="!px-2 !py-[5px] text-sm border border-gray-400 w-full focus:outline-none text-black bg-white"
                                    required
                                    showIcon
                                    icon={calendarIcon}
                                />
                            </div>
                            <div className="relative w-48">
                                <DatePicker
                                    selected={payloadData?.toDate}
                                    // onChange={(date) => setPayloadData({ ...payloadData, toDate: date })}
                                    dateFormat="dd/MM/yyyy"
                                    className="!px-2 !py-[5px] text-sm border border-gray-400 w-full focus:outline-none text-black bg-white"
                                    required
                                    showIcon
                                    icon={calendarIcon}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <select
                                // onChange={handleSelectChange}
                                // value={setPayloadData?.statementFor}
                                className="px-3 py-1.5 text-[0.8125rem] bg-transparent border w-full text-black border-gray-500/30"
                            >
                                <option value="">Select Log Type</option>
                                <option value="login">Login</option>
                                <option value="change_password">Change Password</option>
                            </select>
                            <button
                                // onClick={handleSubmit}
                                className="py-2 px-3 bg-[var(--primary)] hover:bg-[#6C2D2CB3] text-white text-[16px] w-full lg:w-auto"
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="w-full flex justify-between items-center gap-2 p-1">
                        <div className="flex items-center input-group relative space-x-1">
                            <span className="mr-2 lg:text-[14px] text-[13px]">Show</span>
                            <select
                                // value={pageSize} 
                                // onChange={(e) => {setPageSize(e.target.value)}}
                                className="sm:w-[150px] w-[100px] bg-white border py-1.5 px-2">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                            <span className="lg:text-[14px] text-black text-[13px]">Entries</span>
                        </div>
                        <div className="flex justify-end items-center gap-2 input-group relative ">
                            <span className="lg:text-[14px] text-black text-[12px]">Search:</span>
                            <input
                                type="search"
                                className="px-3 py-1 text-[1rem] bg-transparent border border-gray-500/30 lg:w-full w-[60%] focus:outline-none text-[#495057] placeholder:text-gray-500"
                                // placeholder={`${data?.length || 0} records...`}
                                value=""
                            />
                        </div>
                    </div>
                    <div className="overflow-hidden min-h-[300px]">
                        <div className="max-w-full overflow-auto">
                            <div className="inline-block min-w-full">
                                <div className="overflow-hidden w-full">
                                    <table className="min-w-full border-collapse border overflow-x-auto border-gray-400">
                                        <thead className="lg:bg-[#F7F7F7] bg-[var(--secondary)]">
                                            <tr className="text-left text-md lg:bg-transparent text-white lg:text-black bg-sub_header_bg-yellow font-semibold border border-gray-200">
                                                <th className="px-3 py-2 w-1/3 border border-gray-200 ">
                                                    UserName
                                                </th>
                                                <th className="px-3 py-2 w-1/3 border whitespace-nowrap border-gray-200 ">
                                                    Date
                                                </th>
                                                <th className="px-3 py-2 w-1/3 border border-gray-200 ">
                                                    Ip Address
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* <td colSpan={3} className="py-2 border border-[#c7c8ca] text-center">
                                                    No records found.
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <div className="lg:flex lg:flex-row flex-col  justify-center items-center my-2 gap-4">

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


            </div>
        </div>
    );
}

export default ActiveLog;