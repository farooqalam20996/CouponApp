// import { sendHttpRequest } from './BaseUrl';

import { ServerUri } from "./BaseURI";
import { sendHttpRequest } from "./httpsRequest";

export const login = async (email, password) => {
  try {
    const postData = JSON.stringify({ email, password });
    const uri = `${ServerUri}/auth/login/`;
    const response =  await sendHttpRequest(uri, 'POST', postData);
    return response;
  } catch (error) {
    throw error;
  }
};


export const SignUp = async ( name, email, phone, password ) => {

  try {
    const postData = JSON.stringify({ name, email, phone, password });
    const uri = `${ServerUri}/auth/signup/`;
    const response = await sendHttpRequest(uri, 'POST', postData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const EmailVerificationCode = async (email, otp) => {

  try {
    const postData = JSON.stringify({email, otp});
    const uri = `${ServerUri}/auth/verify-otp/`;
    const response = await sendHttpRequest(uri, 'POST', postData);
    return response;
  } catch (error) {
    throw error;
  }
};