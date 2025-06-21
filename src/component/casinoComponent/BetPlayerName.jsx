/* eslint-disable react/prop-types */


export default function BetPlayerName(props) {
    const { data, name } = props;
    return (

        <div className="flex justify-start px-2 items-center ">
            <p className="text-[14px] dark-text font-[600]" >
                {data && data.nat ? data.nat : data.nation ? data.nation : name}
            </p>
        </div>
    );
}