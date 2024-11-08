/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, useEffect } from 'react'

import { UserApi, UserItem } from '#src/types'

interface AuthProviderProps {
  userApi: UserApi
  children?: React.ReactNode
}

interface AuthCredentials {
  email: string
  password: string
  otp?: string | undefined
}

interface AuthContextProps {
  isAuthenticated: boolean
  user: UserItem | null
  login: (credentials: AuthCredentials) => Promise<UserItem | undefined>
  register: (credentials: AuthCredentials, userName: string) => Promise<UserItem | undefined>
  loading: boolean
  logout: () => Promise<any>
  updateUser: (user: UserItem) => any
  token: string | null
  requestPasswordReset: (email: string, reset_url: string) => Promise<any>
  passwordReset: (token: string, new_password: string) => Promise<any>
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => Promise.reject(Error('Unimplemented')),
  register: () => Promise.reject(Error('Unimplemented')),
  loading: false,
  logout: () => Promise.reject(Error('Unimplemented')),
  updateUser: () => Promise.reject(Error('Unimplemented')),
  token: '',
  requestPasswordReset: () => Promise.reject(Error('Unimplemented')),
  passwordReset: () => Promise.reject(Error('Unimplemented')),
})

export const AuthProvider = ({ userApi, children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserItem | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const isAuthenticated = !!user

  useEffect(() => {
    setLoading(true)
    loadUser()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadUser(): Promise<UserItem | undefined> {
    try {
      const token = await userApi.getToken()
      setToken(token)
      if (token) {
        const me = await userApi.getUser()
        setUser(me)
        setLoading(false)
        return me
      } else return undefined
    } catch (error) {
      setLoading(false)
      return undefined
    }
  }

  const login = async (credentials: AuthCredentials): Promise<UserItem | undefined> => {
    setLoading(true)
    try {
      const res = await userApi.login(credentials.email, credentials.password)
      setToken(res.access_token)
      return await loadUser()
    } catch (error: any) {
      setLoading(false)
      throw error
    }
  }

  const register = async (
    credentials: AuthCredentials,
    userName,
  ): Promise<UserItem | undefined> => {
    setLoading(true)
    try {
      /* const res = */ await userApi.register(credentials.email, credentials.password, userName)
      return await login(credentials)
    } catch (error: any) {
      setLoading(false)
      throw error
    }
  }

  const logout = async () => {
    try {
      await userApi.logout()
      setUser(null)
    } catch (error: any) {
      setLoading(false)
      throw error
    }
  }

  const updateUser = async (user: UserItem) => {
    setLoading(true)
    const { id, ...userRest } = user

    try {
      const res = await userApi.updateUser(userRest)
      setUser(res as any)
      loadUser()
      setLoading(false)
      return res as any
    } catch (error: any) {
      setLoading(false)
      throw error
    }
  }

  const requestPasswordReset = async (email: string, resetUrl?: string): Promise<any> => {
    setLoading(true)
    try {
      await userApi.requestPasswordReset(email, resetUrl)
      return setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw error
    }
  }

  const passwordReset = async (token: string, newPassword: string): Promise<any> => {
    setLoading(true)
    try {
      await userApi.passwordReset(token, newPassword)
      return setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        loading,
        logout,
        updateUser,
        token,
        requestPasswordReset,
        passwordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)
