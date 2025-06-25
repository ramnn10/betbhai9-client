import settings from "../../domainConfig"


const AppFooter = () => {

    return (
        <>
            <section className="footer bg-white md:bg-[var(--primary)] text-[var(--primary)]-text lg:px-0 px-1.5 lg:pt-0 pt-1.5 lg:pb-0  pb-5 md:border-2 border-r-[var(--primary)] border-l-[var(--primary)] border-t-[var(--secondary)] border-b-white">
                {/* <div className="footer-top lg:flex block flex-wrap items-center justify-between">
                    <div className="footer-links flex-1">
                        <nav className="navbar flex ">
                            <ul className="navbar-nav flex flex-row justify-between lg:justify-start w-full  p-0 m-0 list-none text-[12px] underline lg:no-underline  lg:text-[16px]">
                                <li className="nav-item">
                                    <a className="nav-link block px-4 py-2  text-[var(--primary)]-text font-bold text-white transition-all duration-150" href="/term-conditions" target="_blank" rel="noopener noreferrer">
                                        Terms and Conditions
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link block text-white px-4 py-2 text-[var(--primary)]-text font-bold  transition-all duration-150" href="/responsible-gaming" target="_blank" rel="noopener noreferrer">
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
                </div> */}

                <div className="footer-bottom  md:flex flex-wrap justify-center  md:justify-between items-center px-2 md:py-3">
                    <div className="secure-logo flex md:flex-col justify-center items-center gap-2 text-[12px] lg:text-[16px]">
                        <div className="flex justify-start md:w-full">
                            <img className=" max-h-[50px] lg:max-h-20" src="/footer/ssl.png" alt="SSL" />
                        </div>
                        <div className="ml-2 md:text-white">
                            <p className="text-center w-full font-[600]">100% SAFE</p>
                            <div>Protected connection and encrypted data.</div>
                        </div>
                    </div>
                    <div className="d-inline-block flex justify-center items-center">
                        <button className="btn p-0 transition duration-500 ease-in-out rounded-none">
                            <img className="max-h-8 md:max-h-[50px] max-w-[50px] mr-2" src="/footer/18plus.png" alt="18+ logo" />
                        </button>
                        <a href="https://www.gamcare.org.uk/" target="_blank" rel="noopener noreferrer">
                            <img className="max-h-8 md:max-h-[50px] max-w-[50px] mr-2" src="/footer/gamecare.png" alt="Gamcare" />
                        </a>
                        <a href="https://www.gamblingtherapy.org/" target="_blank" rel="noopener noreferrer">
                            <img className="max-h-8 md:max-h-[50px] max-w-[50px] mr-2" src="/footer/gt.png" alt="Gambling Therapy" />
                        </a>
                    </div>
                </div>

                <div className=" text-[11px] md:text-white font-[500] lg:text-[16px] px-0 py-2 m-0">
                    <p></p>
                    <p className="text-center">
                        {`© Copyright 2025. All Rights Reserved. Powered by ${settings.domainName}`}
                    </p>
                </div>
            </section>
        </>
    )
}

export default AppFooter