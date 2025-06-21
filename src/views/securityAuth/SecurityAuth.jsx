import React, { useState } from "react";
import { IoLogoAndroid } from "react-icons/io";


const SecurityAuth = (props) => {
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);

  const handleButton1Click = () => {
    setShowContent1(true);
    setShowContent2(false);
  };

  const handleButton2Click = () => {
    setShowContent1(false);
    setShowContent2(true);
  };

  return (
    <div className=" w-full flex">
      <div className="border rounded-lg shadow-lg bg-white  border-gray-200 w-full">
        <div className="bg-[var(--secondary)] flex justify-between px-3">
          <h2 className="text-[16px] lg:text-[20px] text-white">
            Secure Auth Verification
          </h2>
        </div>

        <div className="w-full  my-2 ">
          <div className="flex items-center justify-center">
            <div className="flex justify-center items-center flex-col bg-white px-8 pt-4 pb-2 rounded-lg lg:w-[800px] w-full text-center text-black">
              <div className="flex justify-center items-center">
                <h2 className="lg:text-[16px] text-[14px] ml-0 px-4 ">
                  Secure Auth Verification Status:
                </h2>
                <h3 className="text-sm font-bold text-white bg-red-700 ml-0 px-3 py-1.5">
                  DISABLED
                </h3>
              </div>
              <p className="mb-2 lg:text-[16px] text-[14px]">
                Please enter below auth code in your 'Secure Auth Verification App'.
              </p>
              <div className="flex w-full justify-center items-center">
                <button
                  className={`h-full py-2 lg:px-8 px-1 lg:text-lg font-bold text-[12px] border border-solid ${showContent1
                    ? "border-[#28a745] text-white bg-[#28a745]"
                    : "border-[#28a745] text-[#28a745]"
                    } hover:border-[#28a745] `}
                  onClick={handleButton1Click}
                >
                  Enable using mobile App
                </button>

                <button
                  className={`h-full py-2 lg:px-8 px-1 lg:text-lg font-bold text-[12px] border border-solid ${showContent2
                    ? "border-[#28a745] text-white bg-[#28a745]"
                    : "border-[#28a745] text-[#28a745]"
                    } hover:border-[#28a745] `}
                  onClick={handleButton2Click}
                >
                  Enable using Telegram
                </button>
              </div>

              <div>
                {showContent1 && (
                  <div>
                    <p className="py-2 lg:text-[16px] text-[14px]">
                      Please enter below auth code in your 'Secure Auth Verification App.
                    </p>
                    <p className="text-[35px] w-full py-[10px] px-[6px]">
                      <span className="bg-slate-300 p-2">475716</span>
                    </p>
                    <p className="text-[16px] font-bold">
                      If you haven't downloaded,
                      <br />
                      please download 'Secure Auth Verification App' from below link.
                    </p>
                    <p>
                      Using this app you will receive auth code during login
                      authentication.
                    </p>
                    <div className="text-gray-700 p-4 flex justify-center items-center">
                      <button className="bg-[#086F3F] hover:bg-[#086F3F]/80 text-white font-bold py-2 px-4 space-x-1 flex justify-center items-center">
                        <IoLogoAndroid size={24} />
                        <div>Download
                          <br />
                          On the Android
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {showContent2 && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="max-w-md w-full bg-white px-8 py-4 rounded-lg">
                      <p className="text-lg mb-3">
                        Please enter your login password to continue
                      </p>
                      <div className="sm:flex items-center justify-center sm:space-y-0 space-y-2">
                        <input
                          type="password"
                          className="flex-1 border border-gray-300 px-3 py-1.5 mr-2 focus:outline-none bg-white focus:border-[#086F3F]"
                          placeholder="Enter Your Login Password"
                        />
                        <button className="bg-[#086F3F] text-white px-4 py-1.5 whitespace-nowrap focus:outline-none hover:bg-[#086F3F]/70">
                          Get Connection ID
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SecurityAuth;
