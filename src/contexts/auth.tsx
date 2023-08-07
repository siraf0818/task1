import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  isLoading?: boolean | null;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

interface Duser {
  id: string;
  WFH: string;
  hadir: string;
  nip: string;
  nama: string;
  telp: string;
  jabatan: string;
  email: string;
  tanggal_lahir: string;
}

const TOKEN_KEY = "tokken";
const AHADIR = "HADIR";
const AWFH = "WFH";
export const API_URL = "https://optest.noretest.com/api";
const AuthContext = createContext<AuthProps>({});

export function useAuth() {
  return useContext(AuthContext);
}

export async function getValPres(Pres: string) {
  const result = await SecureStore.getItemAsync(Pres);
  return result;
}

export const AuthProvider = ({ children }: any) => {
  const [data, setData] = useState<Duser | null>(null);
  const [isLoading, setLoading] = useState(false);

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
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
    setLoading(true);
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
        setData(result.data.data.user);
        console.log(data);
        const hadirs: string = String(data?.hadir);
        const wfhs: string = String(data?.WFH);
        await SecureStore.setItemAsync(AHADIR, hadirs);
        await SecureStore.setItemAsync(AWFH, wfhs);
        return result;
      } else {
        alert("Wrong Username or Password");
      }
    } catch (e) {
      setLoading(false);
      return { error: true, msg: (e as any).response.data.msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      axios.get(`${API_URL}/logout`).then((response) => {
        console.log(response.data.message);
      });
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(AHADIR);
      await SecureStore.deleteItemAsync(AWFH);
      axios.defaults.headers.common["Authorization"] = "";
      setAuthState({
        token: null,
        authenticated: false,
      });
    } catch (e) {
      setLoading(false);
      return { error: true, msg: (e as any).response.data.msg };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
