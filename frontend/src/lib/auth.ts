import axios from 'axios';
import { API_URL } from './apollo';

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  return await axios
    .post(`${API_URL}/api/auth/local/register`, {
      username,
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const signinUser = async (email: string, password: string) => {
  return await axios
    .post(`${API_URL}/api/auth/local`, {
      identifier: email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
