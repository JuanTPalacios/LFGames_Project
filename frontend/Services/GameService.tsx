// @ts-ignore
import { LOCAL_URL } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';

const addGameToList = async (game) => {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(`${LOCAL_URL}games`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(game),
  });
  const data = await res.json();
  return data;
};

export default addGameToList;