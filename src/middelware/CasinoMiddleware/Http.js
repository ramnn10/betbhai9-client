import axios from "axios";
import { authHeader } from "./Auth";

// import { message } from "antd";
import { baseUrl } from "../Http";
import { toast } from "react-toastify";

const httpGet = async (url, params, isNotify) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      // 'Access-Control-Allow-Origin': '*',
      Authorization: authHeader().Authorization,
    };

    const result = await axios({
      method: "GET",
      url: baseUrl.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    invalidToken(result);

    return result;
  } catch (err) {
    console.error(err);
    if (err.request.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPost = async (url, params, isNotify) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: authHeader().Authorization,
    };
    const result = await axios({
      method: "POST",
      url: baseUrl.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    // await invalidToken(result);

    if (result.data) {
      if (result.data.error && isNotify) {
        // error(result.message)
        //alert(result.data.message)
      } else if (isNotify && !result.data.error) {
        // toast.success(result.data.message)
        // alert(result.data.message)
      }
      return result.data;
    } else {
      return false;
    }
  } catch (err) {
    // message.error(err?.response?.data?.message)
    const toastId = toast.error(err?.response?.data?.message);
    setTimeout(() => toast.dismiss(toastId), 1000);
    if (err?.request?.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPostFormData = async (url, data, isNotify) => {
  try {
    const result = await axios({
      method: "POST",
      url: baseUrl.BACKEND_URL + url,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // await invalidToken(result);

    if (result.data) {
      if (result.data.error && isNotify) {
        // error(result.message)
        //alert(result.data.message)
      } else if (isNotify && !result.data.error) {
        // success(result.message)
        alert(result.data.message);
      }
      return result.data;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    // toast.error(err.response.data.message);
    if (err.request.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const httpPatch = async (url, params, isNotify) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: authHeader().Authorization,
    };
    const result = await axios({
      method: "PATCH",
      url: baseUrl.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    // invalidToken(result);
    if (result.data) {
      if (result.data.error && isNotify) {
        // error(result.message)
        //alert(result.data.message)
      } else if (isNotify && !result.data.error) {
        // success(result.message)
        //alert(result.data.message)
      }
    } else {
      return false;
    }

    return result.data;
  } catch (err) {
    console.error(err);
    if (err.request.status) {
      invalidHeadres(err.request.status);
      // toast.error(err.response.data.message);
    }
  }
};

const httpPostBet = async (url, params) => {
  // let header = new Headers({
  //     'Content-Type': 'application/json',
  //     "Authorization": authHeader().Authorization
  // });
  // const requestOptions = {
  //     method: "POST",
  //     headers: header,
  //     body: JSON.stringify(params)
  // }
  // return fetch(CONST.BACKEND_URL + url, requestOptions)
  //     // .then(handleResponse)
  //     .then(data => {
  //         return data;
  //     });

  try {
    let headers = {
      "Content-Type": "application/json",
      Authorization: authHeader().Authorization,
    };
    const result = await axios({
      method: "POST",
      url: baseUrl.BACKEND_URL + url,
      data: { ...params },
      headers: headers,
    });

    // await invalidToken(result);

    if (result.data) {
      if (result.data.error) {
        // error(result.message)
        //alert(result.data.message)
      } else if (!result.data.error) {
        // toast.success(result.data.message)
        // alert(result.data.message)
      }
      return result.data;
    } else {
      return false;
    }
  } catch (err) {
    // message.error(err?.response?.data?.message)
    const toastId = toast.error(err?.response?.data?.message);
    setTimeout(() => toast.dismiss(toastId), 1000);
    if (err.request.status) {
      invalidHeadres(err.request.status);
    }
  }
};

const invalidToken = async (result) => {
  if (result.data.code === 3) {
    localStorage.clear();
    window.location.href = "/";
  }
};

const invalidHeadres = async (status = "") => {
  if (status === 401) {
    localStorage.clear();
    window.location.href = "/";
  }
};

export { httpGet, httpPost, httpPatch, httpPostFormData, httpPostBet };
