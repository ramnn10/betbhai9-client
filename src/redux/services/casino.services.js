
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



export const casinoServices = {
  casinoBetPlaceFunc,
  intCasinoCateogeoryWiseList

};