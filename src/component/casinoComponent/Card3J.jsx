/* eslint-disable react/prop-types */
import BetLocked from "./BetLocked";

export default function Cards3J(props) {
    const { Data, num, handleBackOpen, posArray, handleCardSelect, select3Cards = [] } = props;

    // Determine if the current card is selected
    const isSelected = select3Cards.some((card) => card.num === num);

    return (
        <div className="space-y-1">
            <div className="relative text-center flex flex-col justify-center items-center">
                <img
                    src={`./images/${num}.jpg`}
                    alt="Card Image"
                    className={`lg:h-12 h-10 xl:w-10 lg:w-8 w-10 flex justify-center items-center ${isSelected ? 'border-4 border-blue-500' : 'border'}`}
                    style={{ borderRadius: '5px' }}
                />
                {Data.gstatus === "0" ?
                    (
                        <BetLocked />
                    )

                    : (
                        <div
                            onClick={() => {
                                handleCardSelect({
                                    num,  // Pass num to track the card
                                    Data,
                                    type: "Yes",
                                    rate: Data.rate,
                                    nat: Data.nat ? Data.nat : Data.nation,
                                    sid: Data.sid,
                                    marketid: Data.mid,
                                    betFor: Data.names ? Data.names : num
                                });
                                handleBackOpen({
                                    Data,
                                    type: "Yes",
                                    rate: Data.rate,
                                    nat: Data.nat ? Data.nat : Data.nation,
                                    sid: Data.sid,
                                    marketid: Data.mid,
                                    betFor: Data.names ? Data.names : num
                                });
                            }}
                            className="absolute top-0 cursor-pointer"
                        >
                            <img
                                src={`/images/${num}.jpg`}
                                alt="Card Image"
                                className="lg:h-12 h-10 xl:w-10 lg:w-8 w-10"
                            />
                        </div>
                    )}
            </div>
            <p className={`${posArray[Data.sid] < 0 ? "text-red-500" : "text-green-800"} flex justify-center items-center text-center text-[12px] font-semibold`}>
                {posArray[Data.sid] ?? 0.00}
            </p>
        </div>
    );
}
