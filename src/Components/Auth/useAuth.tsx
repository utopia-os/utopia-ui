import { createContext, useState, useContext, useEffect } from "react";
import * as React from "react";
import { UserApi, UserItem } from "../../types";


type AuthProviderProps = {
  userApi: UserApi,
  children?: React.ReactNode
}

type AuthCredentials = {
  email: string;
  password: string;
  otp?: string | undefined;
}



type AuthContextProps = {
  isAuthenticated: boolean,
  user: UserItem | null;
  login: (credentials: AuthCredentials) => Promise<UserItem | undefined>,
  register: (credentials: AuthCredentials, userName: string) => Promise<UserItem | undefined>,
  loading: Boolean,
  logout: () => Promise<any>,
  updateUser: (user: UserItem) => any,
  token: String | null,
  requestPasswordReset: (email:string, reset_url: string) => Promise<any>,
  passwordReset: (token:string, new_password:string) => Promise<any>
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => Promise.reject(),
  register: () => Promise.reject(),
  loading: false,
  logout: () => Promise.reject(),
  updateUser: () => Promise.reject(),
  token: "",
  requestPasswordReset: () => Promise.reject(),
  passwordReset: () => Promise.reject()
});

export const AuthProvider = ({ userApi, children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserItem | null>(null);
  const [token, setToken] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    setLoading(true);
    loadUser();
    setLoading(false)
  }, []);

  async function loadUser(): Promise<UserItem | undefined> {
    try {
        const token = await userApi.getToken();      
        setToken(token);
        if(token){
          const me = await userApi.getUser();
          setUser(me as UserItem);
          setLoading(false);
          return me as UserItem;
        }
        else return undefined;

    } catch (error) {
      setLoading(false)
      return undefined;
    }
  }
  

  const login = async (credentials: AuthCredentials): Promise<UserItem | undefined> => {
    setLoading(true);
    try {
      const res = await userApi.login(credentials.email, credentials.password);
      setToken(res.access_token);
      return (await loadUser());
    } catch (error: any) {
      setLoading(false);
      throw error;
    };
  }

  const register = async (credentials: AuthCredentials, userName): Promise<UserItem | undefined> => {
    setLoading(true);
    try {
      const res = await userApi.register(credentials.email, credentials.password, userName)
      return (await login(credentials));
    } catch (error: any) {
      setLoading(false);
      throw error;
    };
  }


  const logout = async () => {
    try {
      await userApi.logout();
      setUser(null);
    } catch (error: any) {
      setLoading(false);
      throw error;
    };
  }

  const updateUser = async (user: UserItem) => {
    setLoading(true);
    const { id, ...userRest } = user;

    try {
      const res = await userApi.updateUser(userRest);
      setUser(res as any);
      loadUser();
      setLoading(false);
      return res as any;
    } catch (error: any) {
      setLoading(false);
      throw error;
    };
  }

  const requestPasswordReset = async (email: string, reset_url?: string): Promise<any> => {
    setLoading(true);
    try {
      await userApi.requestPasswordReset(email, reset_url);
      return setLoading(false);
    } catch (error: any) {
      setLoading(false);
      throw error;
    };
  }


  const passwordReset = async (token: string, new_password:string): Promise<any> => {
    setLoading(true);
    try {
      await userApi.passwordReset(token, new_password);
      return setLoading(false);
    } catch (error: any) {
      setLoading(false);
      throw error;
    };
  }



  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, loading, logout, updateUser, token, requestPasswordReset, passwordReset }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);