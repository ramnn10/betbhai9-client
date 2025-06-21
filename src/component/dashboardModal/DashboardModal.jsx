import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";




function DashboardModal() {
    const [modalOpen, setModalOpen] = useState(localStorage.getItem("dashboardModalOpen"));

    const closeModal = () => {
        setModalOpen(false);
        localStorage.removeItem("dashboardModalOpen");
    };

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {

            document.body.classList.remove("overflow-hidden");
        };

    }, [modalOpen])





    return (
        <>
            {modalOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex justify-center items-start pt-[9px] z-50 px-2"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999999 }}>
                    <div className="bg-[var(--primary)] md:!h-auto !h-[288px] animate-slideInFromTop transition-transform duration-700 linear">
                        <div className="border-b flex justify-end items-center w-full border-gray-300 px-2 py-2">
                            <button
                                className=" top-0 right-0 text-white"
                                onClick={closeModal}
                            >
                                <FaTimes size={18} />
                            </button>
                        </div>


                        <div className="relative md:w-[800px] w-[350px] bg-white flex justify-center items-center shadow-lg">
                            <img
                                className=" object-cover h-full"
                                src='/wel-1744131265345.png'
                            />

                        </div>

                        {/* <div className="border-t flex justify-end items-center w-full pt-2 border-gray-300 bg-white">
                            <button className=" top-0 right-0 mr-4 px-2 py-1.5 text-sm rounded text-white bg-[#6C757D]" onClick={closeModal}>
                                Close
                            </button>
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
}

export default DashboardModal;