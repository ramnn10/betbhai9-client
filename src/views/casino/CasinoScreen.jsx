import { useParams } from "react-router-dom";
import TeenpattiOneDay from "./TeenpattiOneDay";
import Lucky7B from "./Lucky7B";
import TeenpattiT20 from "./TeenpattiT20";
import DragonTiger20 from "./DragonTiger20";
import AmarAkbarAnthony from "./AmarAkbarAnthony";
import WorliMatka from "./WorliMatka";
import DragonTiger20_2 from "./DragonTiger20_2";
import Anadarbahar_2 from "./Anadarbahar_2";
import TeenpattiTest from "./TeenpattiTest";
import Poker from "./Poker";
import Poker_20 from "./Poker_20";
import Poker_6_player from "./Poker_6_player";
import DragonTigerOneday from "./DragonTigerOneday";
import Lucky7A from "./Lucky7A";
import DragonTigerLion20 from "./DragonTigerLion20";
import CasinoWar from "./CasinoWar";
import Baccarat from "./Baccarat";
import Baccarat2 from "./Baccarat2";
import Anadarbahar from "./Anadarbahar";
import Cards32_A from "./Cards32_A";
import Cards32_B from "./Cards32_B";
import Card3Judgement from "./Card3Judgement";
import CasinoQueen from "./CasinoQueen";
import BollywoodCasino from "./BollywoodCasino";
import CasinoMeter from "./CasinoMeter";
import Race20_20 from "./Race20_20";
import SuperOver from "./SuperOver";
import CricketMatch20_20 from "./CricketMatch20_20";
import InstantWorli from "./InstantWorli";
import TeenPattiOpen from "./TeenPattiOpen";

function CasinoScreen() {
    const {eventId} = useParams();
    return (
        <div>
            {eventId == 3030 && <TeenpattiT20 eventId={eventId} />}
            {eventId == 3031 && <TeenpattiOneDay eventId={eventId} />}
            {eventId == 3032 && <Lucky7B eventId={eventId} />}
            {eventId == 3033 && <Baccarat2 eventId={eventId} />}
            {eventId == 3034 && <Cards32_B eventId={eventId} />}
            {eventId == 3035 && <DragonTiger20 eventId={eventId} />}
            {eventId == 3036 && <Race20_20 eventId={eventId} />}
            {eventId == 3037 && <CasinoQueen eventId={eventId} />}
            {eventId == 3038 && <CasinoWar eventId={eventId} />}
            {eventId == 3039 && <Card3Judgement eventId={eventId} />}
            {eventId == 3040 && <InstantWorli eventId={eventId} />}
            {eventId == 3041 && <BollywoodCasino eventId={eventId} />}
            {eventId == 3043 && <Anadarbahar_2 eventId={eventId} />}
            {eventId == 3044 && <Baccarat eventId={eventId} />}
            {eventId == 3045 && <CricketMatch20_20 eventId={eventId} />}
            {eventId == 3046 && <CasinoMeter eventId={eventId} />}
            {eventId == 3047 && <DragonTigerLion20 eventId={eventId} />}
            {eventId == 3048 && <TeenpattiTest eventId={eventId} />}
            {eventId == 3049 && <TeenPattiOpen eventId={eventId} />}
            {eventId == 3050 && <Poker_6_player eventId={eventId} />}
            {eventId == 3051 && <Poker eventId={eventId} />}
            {eventId == 3052 && <Poker_20 eventId={eventId} />}
            {eventId == 3053 && <Anadarbahar eventId={eventId} />}
            {eventId == 3054 && <WorliMatka eventId={eventId} />}
            {eventId == 3055 && <Cards32_A eventId={eventId} />}
            {eventId == 3056 && <AmarAkbarAnthony eventId={eventId} />}
            {eventId == 3057 && <DragonTigerOneday eventId={eventId} />}
            {eventId == 3058 && <Lucky7A eventId={eventId} />}
            {eventId == 3059 && <DragonTiger20_2 eventId={eventId} />}
            {eventId == 3060 && <SuperOver eventId={eventId} />}
        </div>
    )
}

export default CasinoScreen
