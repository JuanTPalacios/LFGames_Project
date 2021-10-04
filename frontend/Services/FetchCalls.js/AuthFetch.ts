import { LOCAL_URL } from '@env';

const URL = LOCAL_URL;
console.log(URL);
export const signUpUser = async (api, body) => {
  const response = await fetch(`${URL}user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

// Sign In

export const signInOldUser = async (api, body) => {
  const response = await fetch(`${URL}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};
