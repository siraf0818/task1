import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

export const TOKEN_KEY = "tokken";
export const Uname = "uname";
export const Pass = "pass";
export const API_URL = "https://optest.noretest.com/api";
const AuthContext = createContext<AuthProps>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const [isLoading, setLoading] = useState<{
    loading: boolean | null;
  }>({
    loading: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      if (result.data.status == "Success") {
        setAuthState({
          token: result.data.data.token,
          authenticated: true,
        });
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${result.data.data.token}`;
        await SecureStore.setItemAsync(TOKEN_KEY, result.data.data.token);
        const Uname = username;
        await SecureStore.setItemAsync(Uname, username);
        await SecureStore.setItemAsync(Pass, password);
        return result;
      } else {
        alert("Wrong Username or Password");
      }
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    } finally {
      setLoading({
        loading: false,
      });
    }
  };

  const logout = async () => {
    axios.get(`${API_URL}/logout`).then((response) => {
      console.log(response.data.message);
    });
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(Uname);
    await SecureStore.deleteItemAsync(Pass);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
