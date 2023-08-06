import { createContext, useState, useContext, useEffect } from "react";
import * as React from "react";


type AuthProviderProps = {
  directus: any,
  children?: React.ReactNode
}

type AuthCredentials = {
  email: string;
  password: string;
  otp?: string | undefined;
}



export type MyUserItem = {
  id: string;
  avatar: string;
  first_name: string;
  description: string;
  email: string;
  password?: string;
}

type AuthContextProps = {
  isAuthenticated: Boolean,
  user: MyUserItem | null;
  login: (credentials: AuthCredentials) => Promise<MyUserItem | undefined>,
  register: (credentials: AuthCredentials, userName: string) => Promise<MyUserItem | undefined>,
  loading: Boolean,
  logout: () => void,
  updateUser: (user: MyUserItem) => any,
  token: String | null
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => Promise.reject(),
  register: () => Promise.reject(),
  loading: false,
  logout: () => { },
  updateUser: () => Promise.reject(),
  token: ""
});

export const AuthProviderDirectus = ({ directus, children }: AuthProviderProps) => {
  const [user, setUser] = useState<MyUserItem | null>(null);
  const [token, setToken] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const isAuthenticated = !!user;

  useEffect(() => {

    setLoading(true);
    loadUserFromDirectus();
    setLoading(false)
  }, []);

  async function loadUserFromDirectus(): Promise<MyUserItem | undefined> {
    try {
      const token = await directus.auth.token
      if (token) {
        const me = await directus.users.me.read();
        setUser(me as MyUserItem);
        setToken(token);
        setLoading(false);
        return me as MyUserItem;
      }
      else return undefined;
    } catch (error) {
      setLoading(false)
      return undefined;
    }
  }

  const login = async (credentials: AuthCredentials): Promise<MyUserItem | undefined> => {
    setLoading(true);
    try {
      const res = await directus.auth.login(credentials);
      return (await loadUserFromDirectus());
    } catch (error: any) {
      setLoading(false);
      console.log(error.response.data.error[0]);

      return error.response.data.error[0];
    };
  }

  const register = async (credentials: AuthCredentials, userName): Promise<MyUserItem | undefined> => {
    setLoading(true);
    try {
      const res = await directus.users.createOne({email: credentials.email, password: credentials.password, first_name: userName});
      return (await login(credentials));
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      return error.response.data.error[0];
    };
  }


  const logout = async () => {
    await directus.auth.logout();
    setUser(null);
  };

  const updateUser = async (user: MyUserItem) => {
    setLoading(true);
    const { id, ...userRest } = user;

    try {
      const res = await directus.users.updateOne(user.id!, userRest)
      setUser(res as any);
      setLoading(false);
      return res as any;

    } catch (error: any) {
      setLoading(false);
      console.log(error.response.data.error[0]);

      return error.response.data.error[0];
    }

  }


  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, loading, logout, updateUser, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthDirectus = () => useContext(AuthContext);