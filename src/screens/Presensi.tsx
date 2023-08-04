import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, useAuth } from "../contexts/auth";

interface Duser {
  jatah_cuti: string;
  sisa_cuti: string;
  izin: string;
  sakit: string;
}

const Presensi = ({ navigation }) => {
  const authState = useAuth();
  const [data, setData] = useState<Duser | null>(null);
  useEffect(() => {
    const getDuser = async () => {
      if (authState?.authState) {
        const token = authState.authState.token;
        axios
          .get(`${API_URL}/check-token?token=${token}`)
          .then((response) => {
            setData(response.data.data.user);
          })
          .catch((response) => console.log(response.data.data.user))
          .catch((error) => console.error(error));
      }
    };
    getDuser();
  }, []);

  return (
    <View style={styles.containerFlate}>
      <TouchableHighlight onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </TouchableHighlight>
      <View style={{ flex: 4, backgroundColor: "white" }}>
        <Text style={styles.datatext}>Jatah Cuti: {data?.jatah_cuti}</Text>
        <Text style={styles.datatext}>Sisa Cuti: {data?.sisa_cuti}</Text>
        <Text style={styles.datatext}>Izin: {data?.izin}</Text>
        <Text style={styles.datatext}>Sakit: {data?.sakit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlate: {
    flex: 1,
    backgroundColor: "#4caf50",
  },

  innerContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  niptext: {
    color: "#fff",
    fontSize: 37,
  },

  datatext: {
    color: "#4caf50",
    fontSize: 17,
    marginHorizontal: 5,
    marginTop: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#4caf50",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

export default Presensi;
