
import AppSidebar from '../component/layout/AppSidebar'
import AppHeader from '../component/layout/AppHeader'
import AppContent from '../component/layout/AppContent'
import AppFooter from '../component/layout/AppFooter'
import SubHeader from '../component/header/SubHeader'
import { useEffect, useState } from 'react'
import ButtonValues from '../views/buttonvalues/ButtonValues'


const Layout = () => {

    const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);

    const handleToggle = () => {
        document.body.classList.toggle("StakeModalOpen");
    };
    useEffect(() => {
        const checkSidebarStatus = () => {
            setIsStakeModalOpen(document.body.classList.contains("StakeModalOpen"));
        };
        checkSidebarStatus();
        const observer = new MutationObserver(checkSidebarStatus);
        observer.observe(document.body, { attributes: true });
        return () => observer.disconnect();
    }, []);


    return (
        <div>
            <div className='h-[82px] sm:h-[80px] xl:h-[73px] bg-[var(--primary)]'>
                <AppHeader />
            </div>
            <SubHeader />
            <div className="wrapper flex xl:my-1">
                <div className="app-sidebar ">
                    <AppSidebar />
                </div>
                <div className="app-content xl:mx-1 mx-0" >
                    <AppContent />
                </div>
            </div>
            <div className='m-auto'>
                <AppFooter />
            </div>
        </div>
    )
}

export default Layout
