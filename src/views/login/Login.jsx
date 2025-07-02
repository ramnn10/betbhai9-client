import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaKey, FaUserAlt, FaHandPointDown, FaSignInAlt } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { login } from "../../redux/reducers/auth.reducer";
import settings from "../../domainConfig";
import { getUserBalance } from "../../redux/reducers/user_reducer";

const Login = () => {
  const dispatch = useDispatch();
  const { login_loading } = useSelector(state => state.authUser)
  const [fieldslogin, setFieldslogin] = useState({});
  const [errorslogin, setErrorslogin] = useState({});
  const [showMe, setShowMe] = useState(false);
  const [passtype, setPasstype] = useState("password");

  // Handle input change
  const inputChange = (e) => {
    const { name, value } = e.target;
    setFieldslogin((prevFields) => ({ ...prevFields, [name]: value }));
    setErrorslogin((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle login form submission
  const loginSubmit = (e) => {
    e.preventDefault();
    if (handleValidationLogin()) {
      const data = {
        username: fieldslogin.username,
        password: fieldslogin.password,
        isClient: true,
        host: window.location.origin
      };

      dispatch(login(data))
        .then((dataa) => {
          if (!dataa.error) {
            dispatch(getUserBalance())
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 1500);


          } else {
            console.error("Login failed:", dataa.error);
          }
        })
        .catch((error) => {
          console.error("Login request failed:", error);
        });

      // dispatch(login(data));

    }
  };

  const handleDemoLogin = () => {
    const demo = settings?.demoCredentials
    dispatch(login(demo))
      .then((data) => {
        if (!data.error) {
          window.location.href = "/dashboard";
        } else {
          console.error("Demo Login failed:", data.error);
        }
      })
      .catch((error) => {
        console.error("Demo login request failed:", error);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      loginSubmit(e);
    }
  };

  // Handle form reset
  const resetForm = (e) => {
    e.preventDefault();
    setFieldslogin({});
    setErrorslogin({});
  };

  // Handle form validation
  const handleValidationLogin = () => {
    let errors = {};
    let formIsValid = true;

    if (!fieldslogin["username"]) {
      formIsValid = false;
      errors["username"] = "Required";
    }
    if (!fieldslogin["password"]) {
      formIsValid = false;
      errors["password"] = "Required";
    }

    setErrorslogin(errors);
    return formIsValid;
  };

  // Show password
  const show = () => {
    setShowMe(true);
    setPasstype("text");
  };

  // Hide password
  const hide = () => {
    setShowMe(false);
    setPasstype("password");
  };

  return (
    <div className="bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] relative h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <img src={settings.logo} alt='logo' className="lg:w-[288px] lg:h-[65px] w-[190px]" />
          </div>
          <div className="justify-between items-start w-full sm:w-[350px] mx-auto bg-[#ffffff] rounded px-4 lg:py-4 py-2">
            <div className="flex justify-center items-center text-[24px] pb-2 space-x-[3px]">
              <span className="text-[var(--primary)] font-[400]">LOGIN</span>
              <FaHandPointDown className="text-[var(--primary)]" />
            </div>
            <div className="w-full mb-3">
              <div className=" w-full flex  border-l-2  rounded-tr-sm rounded-br-sm justify-between items-center border border-[#CED4DA]  focus:outline outline-blue-600">

                <input
                  type="text"
                  name="username"
                  id="username"
                  value={fieldslogin.username || ""}
                  className="w-full text-[#495057] py-[5px] px-1 text-base bg-white placeholder:text-[#495057]/70"
                  placeholder="Username"
                  onChange={inputChange}
                  onKeyPress={handleKeyPress}
                />
                <div className="flex-1 w-full h-full px-3 py-[9px]">
                  <FaUserAlt className="text-black   " />
                </div>
              </div>
              <div className="h-[16px] flex items-start">
                <span className={`text-[#dc3545] px-1 text-[12px] w-full lg:w-3/4 ${errorslogin?.username ? "opacity-100" : "opacity-0"}`}>
                  {errorslogin?.username || "Placeholder"}
                </span>
              </div>
              {/* {errorslogin.username && (
                <div className="text-red-500  text-left text-sm">
                  {errorslogin["username"]}
                </div>
              )} */}
            </div>
            <div className="w-full mb-3">
              <div className=" w-full flex justify-between rounded-tr-sm rounded-br-sm items-center border border-[#CED4DA]  ">
                <input
                  type={passtype}
                  name="password"
                  id="password"
                  value={fieldslogin.password || ""}
                  className="w-full text-[#495057] py-[5px] px-1 text-base bg-white placeholder:text-[#495057]/70"
                  placeholder="Password"
                  onChange={inputChange}
                  onKeyPress={handleKeyPress}
                />
                <div className="flex-1  w-full h-full px-3 py-[9px]">
                  <FaKey onClick={showMe ? hide : show} className="text-black" />
                </div>
              </div>
              <div className="h-[16px] flex items-start">
                <span className={`px-1 text-[#dc3545] text-[12px] w-full lg:w-3/4 ${errorslogin?.password ? "opacity-100" : "opacity-0"}`}>
                  {errorslogin?.password || "Placeholder"}
                </span>
              </div>
              {/* {errorslogin.password && (
                <div className="text-red-500 text-left text-sm">
                  {errorslogin["password"]}
                </div>
              )} */}
            </div>
            <div>
              <button
                type="submit"
                disabled={login_loading}
                onClick={loginSubmit}
                className={`flex justify-between items-center mt-[2px] py-2 rounded-[0.25rem] ${login_loading ? "bg-[var(--primary)]" : "bg-[var(--primary)]"} hover:opacity-85 hover:text-[#212529] text-white font-normal text-base w-full px-3`}
              >
                <span className="px-3 w-full"></span>
                <span className="tracking-wide w-full"> Login</span>
                <span className="flex justify-end tracking-wide w-full">
                  {login_loading ? (
                    <span className="loginloaderbetPlace"></span>
                  ) : (
                    <FaSignInAlt />
                  )}
                </span>
              </button>
              <button
                type="button"
                disabled={login_loading}
                onClick={handleDemoLogin}
                className={` items-center mt-[8px] py-2 rounded-[0.25rem] ${login_loading ? "bg-[var(--primary)]" : "bg-[var(--primary)]"} hover:opacity-85 hover:text-[#212529] text-white font-normal  text-base w-full px-3`}
              >
                <div className="grid grid-cols-[1.5fr_auto]">
                  <div className="tracking-wide flex justify-center items-center w-full  text-center "> Login with demo ID</div>
                  <div className="flex items-center justify-end tracking-wide w-full">
                    <FaSignInAlt />
                  </div>
                </div>
              </button>
            </div>
            <div className="w-full text-[12px] text-start pt-[3px] px-1">
              This site is protected by reCAPTCHA and the Google
              <span className="text-[#007bff]"> Privacy Policy</span> and <span className="text-[#007bff]">
                Terms of Service </span> apply.
            </div>
            <p className="mt-1.5 text-center text-[#007bff] pb-1">
              <a class="mail-link" href="mailto:betbhai9.officiall@gmail.com">betbhai9.officiall@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 w-full">
        <div className="footer bg-[var(--primary)] text-[var(--primary)]-text pt-1 md:h-[75px] lg:h-[47px] h-[85px] ">
          <div className="footer-top md:flex block flex-wrap items-center justify-between">
            <div className="footer-links flex-1">
              <nav className="navbar flex ">
                <ul className="navbar-nav flex  flex-row justify-between lg:justify-start w-full  md:p-0 md:m-0 px-7 list-none text-[12px] underline lg:no-underline  lg:text-[16px]">
                  <li className="nav-item">
                    <a className="nav-link text-white block px-4 py-2  text-[var(--primary)]-text font-bold  transition-all duration-150" href='/term-conditions' target="_blank" rel="noopener noreferrer">
                      Terms and Conditions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white block px-4 py-2 text-[var(--primary)]-text font-bold  transition-all duration-150" href="/responsible-gaming" target="_blank" rel="noopener noreferrer">
                      Responsible Gaming
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="support-detail flex justify-center items-center flex-col flex-1">
              <h2 className="text-xl text-white lg:text-2xl font-semibold">24X7 Support</h2>
              <p></p>
            </div>
            <div className="social-icons-box flex flex-wrap flex-1 justify-end"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Login;