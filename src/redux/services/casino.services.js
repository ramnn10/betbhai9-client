
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
    const casinoGroupList = await apiCall("POST", "website/getCasinoListByProviderName", data);
    if (casinoGroupList) {
      return casinoGroupList;
    }
  } catch (error) {
    console.error("user Update error:", error);
    return Promise.reject(error);
  }
}

async function getInternationalGroupCasinoList(data) {
  try {
    const casinoGroupList = await apiCall("POST", "website/getInternationalGroupCasinoList", data);
    if (casinoGroupList) {
      localStorage.setItem("casinoGroupList", JSON.stringify(casinoGroupList.data));
      return casinoGroupList;
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