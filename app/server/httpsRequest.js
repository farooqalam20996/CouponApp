import { Alert } from "react-native";
import { ServerUri } from "./BaseURI";

const sendHttpRequest = async (url, method = 'GET', body = null, AuthToken = '') => {
  try {
    const response = await fetch(`${url}`, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(AuthToken && { Authorization: `Bearer ${AuthToken}` }),
      },
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);

    } catch {
      throw new Error(text); // 👈 THIS SAVES YOU
    }

    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Login failed');
    }

    return data;
  } catch (err) {
    console.log('HTTP ERROR:', err);
    throw err;
  }
};


const sendHttpRequest_Get = async (url, method, AuthToken ='') => {

  var requestOptions = {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': AuthToken == ''?'':'Bearer '+ AuthToken
    }),
    redirect: 'follow'
  };

  const response = await fetch(url, requestOptions);

    if (response.status === 502) {
      const error = new Error(
        `Bad Gateway server error, Please check your network connection also make sure '${ServerUri}' is accessible`,
      );
      error.code = response.status;
      throw error;
    }

    const responseData = await response.json();
    return responseData;
};

export { sendHttpRequest, sendHttpRequest_Get };