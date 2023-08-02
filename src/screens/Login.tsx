import {
  StyleSheet,
  Text,
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
  const { onLogin } = useAuth();

  const login = async () => {
    const result = await onLogin!(username, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo.png")}
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
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "75%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    color: "#4caf50",
    borderColor: "#4caf50",
    marginBottom: 15,
  },
  lgnbutton: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "#4caf50",
  },
  lgntext: {
    color: "#fff",
    fontSize: 17,
  },
  logo: {
    width: 230,
    height: 230,
  },
});
