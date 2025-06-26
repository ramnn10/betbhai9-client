import { useEffect, useRef, useState } from "react";
import { BiChevronDown, BiZoomIn } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import RuleModel from "../ruleModal/RuleModal";
import { FaHome, FaSearch, FaSearchPlus, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import settings from "../../domainConfig";
import ButtonValues from "../../views/buttonvalues/ButtonValues";
import { MdCheckBox } from "react-icons/md";
import { getClientExposure, getUserBalance } from "../../redux/reducers/user_reducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { domainName } from "../../config/Auth";
import { getSportMatchList } from "../../redux/reducers/sport_reducer";

const AppHeader = () => {
  const dispatch = useDispatch()
  const [balance, setBalance] = useState({
    coins: "",
    exposure: "",
  });
  const user = JSON.parse(localStorage.getItem(`user_info_${domainName}`));
  const navigate = useNavigate();


  useEffect(() => {
    const sportInterval = setInterval(() => {
      dispatch(getSportMatchList());
    }, 10000);

    return () => { clearInterval(sportInterval); }
  }, [dispatch])


  const matchlistLocal = localStorage.getItem("matchList")
    ? JSON.parse(localStorage.getItem("matchList"))
    : null;
  const [clickedOutside, setClickedOutside] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  const [searchIcon, setSearchIcon] = useState(false);
  const [buttonValue, setbuttonValue] = useState(false);
  const [isExposureChecked, setIsExposureChecked] = useState(true)
  const [isPast, setisPast] = useState(false);
  const { exposureData, loading, userBalance } = useSelector((state) => state.user);


  useEffect(() => {
    getExposureFunc();
  }, []);

  useEffect(() => {
    const intervalBalance = setInterval(() => {
      dispatch(getUserBalance());
    }, 3000);

    return () => { clearInterval(intervalBalance); }
  }, [dispatch])

  const getExposureFunc = async () => {
    const reqData = {
      fancyBet: true,
      oddsBet: true,
      isDeclare: false,
      diamondBet: true,
      isClientExposure: true,
    };
    dispatch(getClientExposure(reqData));
  };


  useEffect(() => {
    setTimeout(() => {
      let Balance = JSON.parse(localStorage.getItem("clientBalance"));
      let clientExposure = JSON.parse(localStorage.getItem("clientExposure"));
      setBalance({
        coins: Balance,
        exposure: clientExposure,
      });
    }, 1000);
  }, [balance]);

  const myRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (myRef.current && !myRef.current.contains(event.target)) {
        setClickedOutside(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const setModalTrue = () => {
    setRulesModalOpen(true);
  };

  const setModalFalse = () => {
    setRulesModalOpen(false);
  };

  const handleClickInside = () => setClickedOutside(true);

  const handleSearchIcon = () => {
    setSearchIcon((state) => !state);
  };

  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

  // const handleToggle = () => {
  //   document.body.classList.toggle("StakeModalOpen");
  // };
  useEffect(() => {
    const checkSidebarStatus = () => {
      setIsStakeModalOpen(document.body.classList.contains("StakeModalOpen"));
    };
    checkSidebarStatus();
    const observer = new MutationObserver(checkSidebarStatus);
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const [balanceChecked, setBalanceChecked] = useState(true)

  const handleCheckboxChange = (data) => {
    if (data == 'exposure') {
      setIsExposureChecked(prev => !prev)
    }
    if (data == 'balance') {
      setBalanceChecked(prev => !prev)
    }


  }
  const [exposureModal, setExposureModal] = useState();

  const setExpModal = () => {
    setExposureModal(prev => !prev)
    getExposureFunc();
  }


  return (
    <>
      {rulesModalOpen ? <RuleModel setModalFalse={setModalFalse} /> : null}
      {/* {exposureModalOpen ? (
          <Exposure
            setExpModalFalse={setExpModalFalse}
            exposerData={exposerData}
          />
        ) : null} */}

      <div className="">
        <div className=" flex justify-between top-0 z-30 px-1">
          <div className="flex items-center md:space-x-2 gap-1.5 w-1/2 pl-1 md:py-0 py-2">
            <span
              onClick={() => {
                navigate("/dashboard");
              }}
              className="xl:hidden block"
            >
              <FaHome className="text-[22px] text-white  " />
            </span>
            <div
              onClick={() => {
                navigate("/dashboard");
              }}
              className=" flex justify-start items-center xl:pt-1  "
            >
              <img
                src={settings?.logo}
                alt="logo"
                className="w-[130px] h-[30px] xl:w-[288px] xl:h-[65px]"
              // width={178}
              // height={25}
              />
            </div>
          </div>

          <div className="w-1/2">
            <div className="flex items-center  justify-end gap-1 xl:gap-4 xl:px-1 px-2">
              <div className="text-white xl:flex hidden font-semibold xl:pt-4 gap-1 items-center text-base cursor-pointer">
                <input
                  placeholder="Search here"
                  className={`py-1.5 transition-all text-black duration-1000 ease-in-out bg-white ${searchIcon ? "w-[200px] px-[10px]" : "w-0 px-0"
                    }`}
                />

                <FaSearchPlus
                  className="font-bold"
                  size={25}
                  onClick={handleSearchIcon}
                />
              </div>

              <div className="text-white hidden xl:block font-bold  text-base cursor-pointer  pt-4  items-center ">
                <div
                  // onClick={() => setModalTrue()}
                  onClick={() => {
                    navigate("/rules-page");
                  }}
                  className="text-white font-bold text-base pr-2 cursor-pointer"
                >
                  Rules
                </div>
              </div>
              <div className="text-white hidden xl:block md:-space-y-2 pt-2">
                <div className="">
                  Balance:{" "}
                  <span className="font-bold">
                    {balance && balance.coins
                      ? Number(balance.coins).toFixed(2)
                      : "0"}
                  </span>
                </div>

                <div
                  className="underline hidden xl:block cursor-pointer"
                  onClick={() => setExpModal()}
                >
                  Exposure:{" "}
                  <span className="font-bold">
                    {balance && balance.exposure ? Number(balance.exposure).toFixed(2) : "0"}
                  </span>
                </div>
              </div>
              <div className="text-white  gap-1 mt-1  flex flex-col  text-[13px]  ">
                <div className={` flex xl:hidden justify-end ${balanceChecked ? '' : 'hidden'}`}>
                  <div className="px-1 flex gap-1 justify-center items-center font-bold">
                    {/* <span>Balance</span> */}
                    <img src='/dashbaord/casino/landmark-icon.webp' className="h-[14px]" />
                    {`: ${balance && balance.coins ? Number(balance.coins).toFixed(2) : "0"}`}
                  </div>
                </div>
                <div className="flex justify-between  xl:bg-transparent  px-1 gap-1 items-center">
                  {/* {isExposureChecked && ( */}
                  <div
                    className={`underline text-[13px]  xl:hidden block ${isExposureChecked ? '' : 'hidden'}  cursor-pointer`}
                  // onClick={() => setExpModalTrue()}
                  >
                    {`Exp: ${balance && balance.exposure ? Number(balance.exposure).toFixed(2) : "0"
                      }`}
                  </div>

                  <div className="text-white  md:relative">
                    <div
                      ref={myRef}
                      onClick={() => {
                        handleClickInside();
                        setClickedOutside(!clickedOutside);
                      }}
                    >
                      <div className="flex items-center justify-end   cursor-pointer ">
                        <span className="select-none text-sm xl:text-lg pl-1 ">
                          {user && user?.data && user?.data?.username}
                        </span>
                        <BiChevronDown size={20} />
                      </div>
                      {clickedOutside ? (
                        <div className="animate__animated animate__fadeIn animate__faster absolute right-0 shadow-2xl divide-y  bg-[#f1f5f8] w-[185px] md:mx-0 mr-[2%] ml-[2%] text-[16px] text-[#212529] transition duration-2000 border z-40">
                          <div className="">
                            <div className=" cursor-pointer space-y-0.5 px-1 py-2 pb-2">
                              <div
                                onClick={() => navigate("/dashboard")}
                                className="  xl:hidden px-1.5  w-full flex text-black font-normal hover:underline"
                              >
                                Home{" "}
                              </div>
                              <div
                                onClick={() => navigate("/account-statement")}
                                className=" px-1.5  w-full flex text-black font-normal hover:underline"
                              >
                                Account Statement{" "}
                              </div>
                              <div
                                onClick={() => navigate("/profitloss-report")}
                                className=" px-1.5  w-full flex text-black font-normal hover:underline"
                              >
                                Profit Loss Report{" "}
                              </div>
                              <div
                                onClick={() => navigate("/bet-history")}
                                className=" px-1.5  w-full flex text-black font-normal hover:underline"
                              >
                                Bet History{" "}
                              </div>
                              <div
                                onClick={() => navigate("/unsettled-bets")}
                                className=" px-1.5  w-full flex text-black font-normal hover:underline"
                              >
                                Unsettled Bets{" "}
                              </div>
                              <div
                                onClick={() => navigate("/current-bet")}
                                className=" px-1.5  w-full flex text-black font-normal hover:underline"
                              >
                                Current Bet
                              </div>
                              <div onClick={() => navigate("/active-logs")} className=" px-1.5  w-full flex text-black font-normal hover:underline">
                                Activity Logs{" "}
                              </div>
                              <div
                                onClick={() => navigate("/casino-results")}
                                className=" px-1.5  w-full flex text-black font-normal hover:underline"
                              >
                                Casino Results{" "}
                              </div>

                              <div
                                className=" px-1.5  w-full flex text-black font-normal hover:underline"
                                // onClick={() => {
                                //   handleToggle();
                                // }}
                                onClick={() => navigate("/button-values")}
                              >
                                Set Button Values
                              </div>

                              {/* <div onClick={() => navigate("/security-auth")} className=" px-1.5  w-full flex text-black font-normal hover:underline whitespace-nowrap">
                                Security Auth Verification{" "}
                              </div> */}

                              <div onClick={() => navigate("/change-password")} className=" px-1.5  w-full flex text-black font-normal hover:underline">
                                Change Password{" "}
                              </div>
                              <div
                                className=" px-1.5  w-full flex text-black font-normal hover:underline xl:hidden"
                                // onClick={() => setModalTrue()}
                                onClick={() => {
                                  navigate("/rules-page");
                                }}
                              >
                                Rules
                              </div>
                              {/* <div className="px-1.5 w-full flex justify-between items-center text-black font-normal hover:underline xl:hidden">
                                <span>Balance</span>
                                <input
                                  type="checkbox"
                                  className="mr-2 h-[14px] w-[14px] text-blue-600 rounded focus:ring-blue-500 accent-[var(--secondary)]"
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    handleCheckboxChange('balance');
                                    setClickedOutside(clickedOutside);
                                  }}
                                  checked={balanceChecked}
                                />
                              </div> */}
                              {/* <div className="px-1.5 w-full flex justify-between items-center text-black font-normal hover:underline xl:hidden">
                                <span>Exposure</span>
                                <input
                                  type="checkbox"
                                  className="mr-2 h-[14px] w-[14px] text-blue-600 rounded focus:ring-blue-500 accent-[var(--secondary)]"
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    handleCheckboxChange('exposure');
                                    setClickedOutside(clickedOutside);
                                  }}
                                  checked={isExposureChecked}
                                />
                              </div> */}
                            </div>
                          </div>
                          <div
                            onClick={() => {
                              navigate("/login");
                              localStorage.clear();
                            }}
                            className="px-2 pt-3 pb-2 w-full lg:block hidden text-black hover:underline text-[16px] cursor-pointer font-[400]">
                            Signout
                          </div>
                          <div
                            onClick={() => {
                              navigate("/login");
                              localStorage.clear();
                            }}
                            className="px-2 pt-3 pb-2 w-full lg:hidden block text-[#b71e2d] text-[16px] cursor-pointer font-[700]">
                            Logout
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="sm:block hidden text-header_bg-white text-sm">
              <Marquee gradient={false} speed={50}>
                {wallet_balanceItems && wallet_balanceItems.site_message
                  ? wallet_balanceItems.site_message
                  : " https://march24.olddata.info/login for view old account between Septerber23 to March24"}
              </Marquee>
            </div> */}
          </div>
        </div>
        <div className="text-white flex xl:hidden font-bold xl:pt-4 px-2 justify-center  items-center text-base cursor-pointer">
          {/* <input
            placeholder="Search here"
            className={`text-[14px]  transition-all duration-1000 ease-in-out bg-white ${searchIcon ? "w-[140px] ml-[5px] px-[5px]" : "w-0 px-0"
              }`}
          />

          <div className="bg-white rounded-full flex justify-center items-center p-[6px]">
            <FaSearch
              className="font-semibold text-black"
              size={17}
              onClick={handleSearchIcon}
            />
          </div> */}
          <div className="flex items-center gap-1 relative">
            <input
              placeholder=""
              className={`text-[14px] transition-all duration-500 ease-in-out bg-white border rounded-full flex justify-center items-center h-[30px] px-[15px] ${searchIcon ? "w-[190px] px-[10px]" : "w-0 px-0 overflow-hidden"
                }`}
            />
            {!searchIcon && (
              <div
                className="bg-white rounded-full absolute z-50 flex justify-center items-center p-[7px] cursor-pointer right-0"
                onClick={handleSearchIcon}
              >
                <FaSearch className="text-black" size={16} />
              </div>
            )}
            {searchIcon && (
              <div
                className="absolute right-2 z-50 text-black cursor-pointer"
                onClick={handleSearchIcon}
              >
                <FaTimes size={16} />
              </div>
            )}
          </div>


          <div className=" w-full overflow-hidden">
            <div className=" px-1 font-[700] animate-[marquee_20s_linear_infinite]  text-white text-[12px] whitespace-nowrap uppercase tracking-wider">
              🏏 OUR EXCLUSIVE PREMIUM MARKET FOR (SRL) IS NOW STARTED IN OUR EXCHANGE  🏏, DREAM BIG WIN BIG
              {/* 𝐎𝐔𝐑 𝐄𝐗𝐂𝐋𝐔𝐒𝐈𝐕𝐄 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐌𝐀𝐑𝐊𝐄𝐓 𝐅𝐎𝐑 (𝐒𝐑𝐋) 𝐈𝐒 𝐍𝐎𝐖 𝐒𝐓𝐀𝐑𝐓𝐄𝐃 𝐈𝐍 𝐎𝐔𝐑 𝐄𝐗𝐂𝐇𝐀𝐍𝐆𝐄 🏏, 𝐃𝐑𝐄𝐀𝐌 𝐁𝐈𝐆 𝐖𝐈𝐍 𝐁𝐈𝐆 */}
            </div>
            <style>
              {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
            </style>
          </div>
        </div>
        {isStakeModalOpen && (
          <div
            onClick={(e) => {
              handleToggle();
              e.stopPropagation();
            }}
            className="fixed top-0  bg-black bg-opacity-55 left-0 w-full h-full flex items-start justify-center z-[99999]"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="lg:w-[520px] sm:w-[70%] md:w-[65%] w-full lg:p-2   "
            >
              <ButtonValues
                handleToggle={handleToggle}
              />
            </div>
          </div>
        )}
        {
          exposureModal && (
            <div className="fixed inset-0 top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 max-h-full overflow-auto flex justify-center items-start">
              <div className="md:w-[100%] bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] w-full p-4">
                <div className="flex justify-between items-center pb-4">
                  <span className="text-white font-bold text-[20px] ">My Market</span>
                  <FaTimes onClick={setExpModal} className="text-white cursor-pointer hover:opacity-80" />
                </div>
                <div className="overflow-auto bg-white p-5 mx-4">
                  <table className="min-w-full border-collapse border text-sm rounded text-left overflow-x-auto bg-white border-gray-400">
                    <thead>
                      <tr className="text-left text-md lg:bg-transparent text-black font-semibold border border-gray-200">
                        <th className="px-4 py-3 border border-gray-200">Event Type</th>
                        <th className="px-4 py-3 border border-gray-200">Event Name</th>
                        <th className="px-4 py-3 border border-gray-200">Odds</th>
                        <th className="px-4 py-3 border border-gray-200">Type</th>
                        <th className="px-4 py-3 border border-gray-200">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exposureData?.map((element, index) => (
                        <tr key={index}>
                          {/* <td className="px-4 py-3 border border-gray-200">Cricket</td> */}
                          <td className="px-4 py-3 border border-gray-200">{element?.marketType}</td>
                          <td className="px-4 py-3 text-blue-700 border border-gray-200">
                            {/* <a
                              href={`/sport-view/${element?.marketId}/${element?.eventId}/${element?.sportId}`}> */}
                            {element?.market}
                            {/* </a> */}
                          </td>
                          <td className="px-4 py-3 border border-gray-200">{element?.odds}</td>
                          <td className="px-4 py-3 border border-gray-200">{element?.type}</td>
                          <td className="px-4 py-3 border border-gray-200">{moment(element?.time).format("DD-MM-YYYY HH:mm")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        }

      </div >
    </>
  );
};

export default AppHeader;