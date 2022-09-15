import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from 'lib/apollo';
import { registerUser, signinUser } from 'lib/auth';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

type AuthContextType = {
  token?: string;
  signup: (username: string, email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  token: undefined,
  signup: async () => Promise.resolve(),
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve(),
});

export const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setToken] = useState<string | undefined>('not loaded');
  const router = useRouter();

  const handleSignup = async (
    username: string,
    email: string,
    password: string
  ) => {
    const res = await registerUser(username, email, password);
    await setToken(res.jwt);
    router.push('/');
  };

  const handleSignin = async (email: string, password: string) => {
    const res = await signinUser(email, password);
    await setToken(res.jwt);
    router.push('/');
  };

  const handleSignout = async () => {
    await setToken(undefined);
    router.push('/');
  };

  useEffect(() => {
    (async function () {
      const currentToken = await Cookies.get('token');
      setToken(currentToken);

      if (currentToken) {
        const res = await axios.get(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${currentToken}` },
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (token === 'not loaded') return;
    if (token) Cookies.set('token', token, { expires: 7 });
    else Cookies.set('token', '');
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token: token,
        signup: handleSignup,
        signin: handleSignin,
        signout: handleSignout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
