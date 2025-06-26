
import { apiCall } from "../../config/HTTP";

async function casinoBetPlaceFunc(data) {
  try {
    const user = await apiCall("POST", "casino/casinoBetPlace", data);

    return user
  } catch (error) {
    console.error("Casino Bet Place error:", error);
    return Promise.reject(error);
  }
}

async function intCasinoCateogeoryWiseList(data) {
  try {
    const user = await apiCall("POST", "website/getCateogeory", data);

    return user
  } catch (error) {
    console.error("Casino Bet Place error:", error);
    return Promise.reject(error);
  }
}

async function getCasinoListByCateogeory(data) {
  try {
    const casinoListByCateogeory = await apiCall("POST", "website/getCasinoListByCateogeory", data);
    if (casinoListByCateogeory) {
   
      return casinoListByCateogeory;
      
    }
  } catch (error) {
    console.error("user Update error:", error);
    return Promise.reject(error);
  }
}

async function getCasinoListByProviderName(data) {
  try {
    const cosinoGroupList = await apiCall("POST", "website/getCasinoListByProviderName", data);
    if (cosinoGroupList) {
      return cosinoGroupList;
    }
  } catch (error) {
    console.error("user Update error:", error);
    return Promise.reject(error);
  }
}

async function getInternationalGroupCasinoList(data) {
  try {
    const cosinoGroupList = await apiCall("POST", "website/getInternationalGroupCasinoList", data);
    if (cosinoGroupList) {
      localStorage.setItem("cosinoGroupList", JSON.stringify(cosinoGroupList.data));
      return cosinoGroupList;
    }
  } catch (error) {
    console.error("user Update error:", error);
    return Promise.reject(error);
  }
}

export const casinoServices = {
  casinoBetPlaceFunc,
  intCasinoCateogeoryWiseList,
  getCasinoListByCateogeory,
  getCasinoListByProviderName,
  getInternationalGroupCasinoList,
};