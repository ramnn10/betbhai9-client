import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../component/casinoComponent/Loader";
import { apiCall } from "../../../config/HTTP";

const IframeCasino = (props) => {
    const [casinoData, setCasinoData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorType, setErrorType] = useState(0);
    const [resMessage, setResMessage] = useState("");

    let { gameId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getCasinoData('Casino');

        if (showAlert) {
            const timeout = setTimeout(() => {
                setShowAlert(false);

            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, []);


    const handleIframeLoad = () => {
        setLoading(false);
    };

    const getCasinoData = async () => {

        try {
            let casinoLogin = {
                "gameId": gameId,
                "platformId": "mobile",
                "redirectUrl": `${window.location.origin}/dashboard`,
                "theme": "bmx",
            };


            let casinoLoginResponse = await apiCall("POST", 'user/casinoLoginUrl', casinoLogin);

            if (casinoLoginResponse) {
                setLoading(true);
                setCasinoData(casinoLoginResponse && casinoLoginResponse.data ? casinoLoginResponse.data : {});
                setLoading(false);
            } else {
                // setShowAlert(true);
                // setErrorType(1);
                // setResMessage("Something went wrong");
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            }

        } catch (error) {
            // console.error("Error fetching casino data:", error);
            // setShowAlert(true);
            // setErrorType(1);
            // setResMessage("Something went wrong");
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        }

    };

    return (
        <div className='iframeCasinoMain mb-[150px]'>
            {/* {showAlert && <div className={`absolute top-[2%] right-[2%] px-5 py-3 z-30 ${errorType === 1 ? "bg-red-600" : "bg-green-600"}  rounded`}><span className='white-text font-bold'>{resMessage}</span></div>} */}
            {loading === true ?
                <Loader />
                : null}

            {casinoData ? (
                <>
                    {loading === true ?
                        <Loader />
                        : null}
                    <div className="afterFooter">
                        <iframe src={casinoData.url} title=" " loading='lazy' className=" mx-auto w-[100%] h-screen   " onLoad={handleIframeLoad} name="flll" allowfullscreen="true" />
                    </div>
                </>

            ) : <Loader />
            }

        </div>
    );
};

export default IframeCasino;
