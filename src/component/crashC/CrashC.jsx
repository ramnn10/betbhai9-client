// cateogeoryId
// : 
// "67e1ad50ba22d539e4d2c378"
// cateogeoryType
// : 
// "sub"

import { useNavigate } from "react-router-dom"


const CrashC = () => {

    const navigate = useNavigate()
    return (
        <div className=" w-full text-center px-[4px] flex justify-center cursor-pointer items-center blinking-text" onClick={() => navigate("aviator-list")}><img src="/plane-0.svg" className="" /></div>
    )
}

export default CrashC