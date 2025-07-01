import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getInternationalGroupCasinoList } from "../../redux/_reducers/_user_reducers";
import { json } from "react-router-dom";

export const useGroupCasinoList = () => {
    const [groupCasinoList, setGroupCasinoList] = useState({});

    const dispatch = useDispatch();
    const { getInternationalGroupCasinoListData } = useSelector(state => state.user);

    const casinoGroupList = JSON.parse(localStorage.getItem('casinoGroupList'))

    // useEffect(() => {
    //     const ReqData = {
    //         "categoriesList": true,
    //         "providerList": true,
    //         "lobbygames": true,
    //         "trendingGames": true,
    //         "popularGames": true,
    //         "liveGames": true
    //     };
    //     dispatch(getInternationalGroupCasinoList(ReqData));
    // }, [dispatch]);

    useEffect(() => {
        if (casinoGroupList) {
            setGroupCasinoList(casinoGroupList);
        }
    }, [getInternationalGroupCasinoListData]);

    return groupCasinoList;

};

export default useGroupCasinoList;