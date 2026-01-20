import AsyncStorage from '@react-native-async-storage/async-storage';
// import UserAuth from '../../server/UserAuth';
import { EmailVerificationCode, login, SignUp } from '../../server/UserAuth';
import { STORAGE_KEYS } from '../../Utils/storageKeys';

export const loginAction = async ({ email, password }) => {
  try {
    // const response = await UserAuth(email, password);login
    const response = await login(email, password);
    const authData = {
      accessToken: response.access,
      refreshToken: response.refresh,
      user: response.user,
    };

    // Save to AsyncStorage
    await AsyncStorage.setItem(
      STORAGE_KEYS.AUTH,
      JSON.stringify(authData)
    );

    return authData; // IMPORTANT
  } catch (error) {
    console.log("error:  ", error)
    throw error;
  }
};


export const SignUpAction = async ( name, email, phone, password ) => {
  try {
    const userInfo = await SignUp(name, email, phone, password );
    return userInfo;
  } catch (error) {
    Alert.alert('Error!', error.message, [{ text: 'OK', onPress: () => { } }]);
  }
};


export const EmailVerificationCodeAction = async ( email, otp ) => {
  try {
    const userInfo = await EmailVerificationCode(email, otp );
    return userInfo;
  } catch (error) {
    Alert.alert('Error!', error.message, [{ text: 'OK', onPress: () => { } }]);
  }
};