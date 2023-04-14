import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};


export const apiURL = 'https://dementomat.zavalabs.com/api/';
export const apiURLNEW = 'https://dementomat.zavalabs.com/myapi/';
export const wenURL = apiURL.replace("api/", "");

export const MYAPP = 'SI DEMEN TOMAT DAN TERASI';