import React, { useState } from 'react';
import { updatePassword } from '../../redux/reducers/auth.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

const ChangePassword = () => {
    const [fieldslogin, setFieldsLogin] = useState({});
    const [errorslogin, setErrorsLogin] = useState({});
    const dispatch = useDispatch();
    const inputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFieldsLogin((prevState) => ({ ...prevState, [name]: value }));
        setErrorsLogin((prevState) => ({ ...prevState, [name]: '' }));
    };

    const { updatePassword_loading } = useSelector((state) => state.authUser);

    const changePassword = (e) => {
        if (handleValidationLogin()) {
            const data = {
                oldPassword: fieldslogin.oldPassword,
                password: fieldslogin.password,
                confirmPassword: fieldslogin.confirmPassword
                // transactionPassword: fieldslogin.oldPassword,
            };

            dispatch(updatePassword(data)).then(((req) => {
                if (req.meta.requestStatus == "fulfilled") {
                    message.success(req?.payload?.message);
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1000);
                } else {
                    // message.error(req?.payload || "Password update failed.");
                }
            }));

        }
    };

    const handleValidationLogin = () => {
        let errorslogin = {};
        let formIsValid = true;

        if (!fieldslogin.oldPassword || fieldslogin.oldPassword === '') {
            formIsValid = false;
            errorslogin.oldPassword = 'The Old Password field is required';
        }

        if (!fieldslogin.password || fieldslogin.password === '') {
            formIsValid = false;
            errorslogin.password = 'The New Password field is required';
        }
        if (!fieldslogin["confirmPassword"] || fieldslogin["confirmPassword"] === "") {
            formIsValid = false;
            errorslogin["confirmPassword"] = "The Confirm Password field is required";
        } else if (fieldslogin["password"] !== fieldslogin["confirmPassword"]) {
            formIsValid = false;
            errorslogin["confirmPassword"] = "Passwords and Confirm Password do not match";
        } else {
            errorslogin["confirmPassword"] = "";
        }

        setErrorsLogin(errorslogin);
        return formIsValid;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            changePassword(e);
        }
    };


    return (
        <>

            <div className=' w-full mb-4 flex '>
                <div className=' w-full'>
                    <div className='border rounded-none bg-white  border-gray-300'>
                        <div className='flex justify-between  rounded-t  bg-[var(--secondary)]  text-black p-1.5 pl-5'>
                            <h2 className='text-[16px] lg:text-[20px] text-white'>Change Password</h2>
                        </div>
                        <div className='w-full lg:w-[800px] rounded-[4px]'>
                            <div className='p-2 my-4'>
                                <div className='space-y-0'>
                                    <div className="form-group">
                                        <div className="text-black font-normal text-md !mb-2" htmlFor="oldPassword">Current Password</div>
                                        <input
                                            id="oldPassword"
                                            className='w-full border border-gray-400 bg-white p-2 focus:outline-none text-xs md:text-sm font-[400] text-gray-500 rounded'
                                            type="password"
                                            name="oldPassword"
                                            placeholder='Enter Current Password'
                                            value={fieldslogin.oldPassword}
                                            onChange={inputChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <div className="h-[16px] mb-1 flex items-start">
                                            <span className={`text-[#FF0000] text-[13px] w-full lg:w-3/4 ${errorslogin?.oldPassword ? "opacity-100" : "opacity-0"}`}>
                                                {errorslogin?.oldPassword || "Placeholder"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="text-black font-normal text-md !mb-2" htmlFor="password">New Password</div>
                                        <input
                                            className='w-full border border-gray-400 p-2 bg-white focus:outline-none md:text-sm text-xs font-[400] text-gray-500 rounded'
                                            type="password"
                                            name="password"
                                            placeholder='Enter New Password'
                                            id="password"
                                            value={fieldslogin.password}
                                            onChange={inputChange}
                                            onKeyPress={handleKeyPress}
                                        />

                                        <div className="h-[16px] mb-1 flex items-start">
                                            <span className={`text-[#FF0000] text-[13px] w-full lg:w-3/4 ${errorslogin?.password ? "opacity-100" : "opacity-0"}`}>
                                                {errorslogin?.password || "Placeholder"}
                                            </span>
                                        </div>


                                        {/* {errorslogin && errorslogin["password"] &&
                                            <div className="flex justify-start">
                                                <div className="text-[#FF0000] text-[13px] w-full lg:w-3/4">
                                                    {errorslogin["password"]}
                                                </div>
                                            </div>
                                        } */}
                                    </div>

                                    <div className="form-group ">
                                        <div className="text-black font-normal text-md !mb-2" htmlFor="transactionPassword">Confirm New Password</div>
                                        <input
                                            className='w-full border border-gray-400 bg-white p-2 focus:outline-none md:text-sm text-xs font-[400] text-gray-500 rounded'
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder='Confirm New Password'
                                            value={fieldslogin.confirmPassword}
                                            onChange={inputChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                        {/* {errorslogin && errorslogin["confirmPassword"] &&
                                            <div className="flex justify-start">
                                                <div className="text-[#FF0000] text-[13px] w-full lg:w-3/4">
                                                    {errorslogin["confirmPassword"]}
                                                </div>
                                            </div>
                                        } */}

                                        <div className="h-[16px] mb-1 flex items-start">
                                            <span className={`text-[#FF0000] text-[13px] w-full lg:w-3/4 ${errorslogin?.confirmPassword ? "opacity-100" : "opacity-0"}`}>
                                                {errorslogin?.confirmPassword || "Placeholder"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-start items-center">
                                        <button
                                            type="button"
                                            className="py-1 px-4 hover:opacity-85 md:bg-[var(--bluebtn)] md:border-[var(--bluebtn)] border md:rounded-[0.25rem] bg-[var(--primary)] text-white text-md md:w-1/5 w-full mt-1 flex items-center justify-center gap-2"
                                            onClick={() => changePassword()}
                                        >
                                            {/* <div className='bg-fuchsia-800 rounded-full'>
                                                <svg
                                                    viewBox="0 0 100 100"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                >
                                                    <g>
                                                        <g className="animate-spin origin-center">
                                                            <g transform="translate(12, 6)" fill="#BCBCBC">
                                                                <path d="M2.04,19.93C3.08,18.03,14.07,0.34,38.46,0.17C64.05,-0.01,75.35,20.25,75.73,21.12C77.42,25,76.7,29.99,73.13,31.77C69.04,33.81,64.77,32.59,62.48,29.36C57.77,22.74,57.25,14.39,45.13,9.44C18.87,-1.3,0.97,21.86,2.02,19.93Z M75.19,68.33C74.17,70.22,63.17,87.92,38.78,88.08C13.19,88.25,1.88,68.01,1.5,67.11C-0.21,63.25,0.52,58.27,4.07,56.49C8.17,54.45,12.45,55.68,14.73,58.9C19.45,65.54,19.96,73.87,32.08,78.82C58.36,89.54,76.27,66.41,75.19,68.33Z" />
                                                            </g>
                                                        </g>

                                                        <g transform="translate(56, 50.1) scale(0.8) translate(-25, -25)">
                                                            <path fill="#dfb355" d="M23.41,0c.22,3.5-1.33,6.1-4.13,8.03-1.05.73-2.28.93-3.65.83.05-.64.02-1.3.15-1.92.69-3.52,3.44-6.21,6.97-6.87.07-.01.14-.05.21-.07.15,0,.3,0,.45,0Z" />
                                                            <path fill="#dfb355" d="M31.48,28.3c-.24.61-.44,1.2-.69,1.77-1,2.32-2.37,4.41-4,6.34-.85,1.01-1.86,1.8-3.21,2.02-1.12.18-2.19-.07-3.24-.45-.74-.27-1.48-.56-2.23-.78-1.41-.4-2.8-.24-4.17.24-.96.33-1.91.67-2.88.96-1.2.36-2.34.09-3.3-.66-.78-.6-1.53-1.27-2.15-2.03C2.74,32.24.92,28.27.25,23.8c-.37-2.48-.39-4.95.43-7.36,1.11-3.26,3.16-5.63,6.52-6.7,1.63-.52,3.26-.45,4.87.1.95.32,1.88.69,2.82,1.03.77.29,1.51.18,2.27-.08,1.38-.48,2.75-1.1,4.18-1.31,3.58-.53,6.67.45,8.93,3.46.04.06.08.12.14.22-2.9,1.83-4.36,4.4-4.11,7.88.25,3.46,2.09,5.78,5.17,7.26Z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div> */}
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default ChangePassword;