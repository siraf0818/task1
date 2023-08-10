import {
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  TextInput,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, isLoading } = useAuth();

  const login = async () => {
    const result = await onLogin!(username, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/logow.png")}
            resizeMode={"contain"}
          />
          <TextInput
            placeholder={"Username"}
            style={styles.input}
            value={username}
            onChangeText={(text: string) => setUsername(text)}
          />
          <TextInput
            placeholder={"Password"}
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
          <Pressable style={styles.lgnbutton} onPress={login}>
            <Text style={styles.lgntext}>{"Login"}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(50, 191, 74)",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    borderRadius: 10,
    fontSize: 17,
    height: 45,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    backgroundColor: "white",
    color: "rgb(50, 191, 74)",
    borderColor: "white",
    marginBottom: 15,
  },
  lgnbutton: {
    width: "50%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "white",
  },
  lgntext: {
    color: "rgb(50, 191, 74)",
    fontWeight: "bold",
    fontSize: 21,
  },
  logo: {
    width: 250,
    height: 230,
  },
});
