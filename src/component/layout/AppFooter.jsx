import settings from "../../domainConfig"


const AppFooter = () => {

    return (
        <>
            <section className="footer bg-[var(--primary)] text-[var(--primary)]-text lg:px-0 px-1.5 lg:pt-0 pt-1.5 lg:pb-0  pb-5">
                <div className="footer-top lg:flex block flex-wrap items-center justify-between">
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
                </div>
            </section>
            <div className="footer-bottom  flex flex-wrap justify-center  lg:justify-between items-center px-1">
                <div className="secure-logo flex justify-center lg:justify-start items-center text-[12px] lg:text-[16px]">
                    <div>
                        <img className=" max-h-10 lg:max-h-12" src="/footer/ssl.png" alt="SSL" />
                    </div>
                    <div className="ml-2">
                        <b>100% SAFE</b>
                        <div>Protected connection and encrypted data.</div>
                    </div>
                </div>
                <div className="d-inline-block flex items-center">
                    <button className="btn p-0 transition duration-500 ease-in-out rounded-none">
                        <img className="max-h-7 max-w-[100px] mr-2" src="/footer/18plus.png" alt="18+ logo" />
                    </button>
                    <a href="https://www.gamcare.org.uk/" target="_blank" rel="noopener noreferrer">
                        <img className="max-h-7 max-w-[100px] mr-2" src="/footer/gamecare.png" alt="Gamcare" />
                    </a>
                    <a href="https://www.gamblingtherapy.org/" target="_blank" rel="noopener noreferrer">
                        <img className="max-h-7 max-w-[100px] mr-2" src="/footer/gt.png" alt="Gambling Therapy" />
                    </a>
                </div>
            </div>

            <div className=" text-[11px] lg:text-[16px] px-0 py-2 m-0">
                <p></p>
                <p className="text-center">
                    {`© Copyright 2025. All Rights Reserved. Powered by ${settings.domainName}`}
                </p>
            </div>

        </>
    )
}

export default AppFooter