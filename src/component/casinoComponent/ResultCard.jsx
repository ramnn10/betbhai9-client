/* eslint-disable react/prop-types */


export default function ResultCard(props) {
    const { num } = props;
    return (
        <img src={`/cards/${num}.png`} alt="card" className="h-12 w-10" />
    );
}
