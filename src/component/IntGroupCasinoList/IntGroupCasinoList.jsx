import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getInternationalGroupCasinoList } from "../../redux/_reducers/_user_reducers";
import { json } from "react-router-dom";

export const useGroupCasinoList = () => {
    const [groupCasinoList, setGroupCasinoList] = useState({});

    const dispatch = useDispatch();
    const { getInternationalGroupCasinoListData } = useSelector(state => state.user);

    const cosinoGroupList = JSON.parse(localStorage.getItem('cosinoGroupList'))

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
        if (cosinoGroupList) {
            setGroupCasinoList(cosinoGroupList);
        }
    }, [getInternationalGroupCasinoListData]);

    console.log("groupCasinoList", groupCasinoList);
    return groupCasinoList;

};

export default useGroupCasinoList;