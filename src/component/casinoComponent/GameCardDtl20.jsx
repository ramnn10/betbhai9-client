/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


export default function GameCardDtl20(props) {
    const { Data, Name, handleBackOpen, section1Ref, posArray, oddsDifference } = props;

    return (
        <div className="w-full">
            <div className="flex justify-center items-center ">
                {/* <p className="uppercase text-[16px] px-2 font-semibold">{Data && Data.rate ? (Data.rate - oddsDifference) : 0}</p> */}
            </div>
            <div className="relative">
              
            <div className="light-blue w-full text-center text-base py-3 font-[600] leading-4 darktext cursor-pointer flex justify-center items-center">
            2.44
        </div>
                {/* ele={Name} data={Data} */}
                {/* {Data.gstatus === "1" ?
                    <CardThemeDtl20 ele={Name}
                        handleBackOpen={handleBackOpen}
                        data={Data}
                        section1Ref={section1Ref}
                    /> :
                    <BetLockedRoundedBmx />
                } */}
            </div>
            {/* <div className={`flex justify-center items-center font-bold`}>
                00.00
            </div> */}
            {/* <div className={`${posArray[Data.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center font-bold pt-1`}>
                {posArray[Data.sid] ?? 0}
            </div> */}
        </div>
    );
}