import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, useAuth, Uname, Pass } from "../contexts/auth";

interface Duser {
  id: string;
  nip: string;
  nama: string;
  telp: string;
  jabatan: string;
  email: string;
  tanggal_lahir: string;
}

const Profile = ({ navigation }) => {
  const authState = useAuth();
  const [data, setData] = useState<Duser | null>(null);

  useEffect(() => {
    console.log(`${Uname}`);
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
      <TouchableHighlight onPress={() => navigation.navigate("Presensi")}>
        <Text>Presensi</Text>
      </TouchableHighlight>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.niptext}>{data?.nip}</Text>
      </View>
      <View style={{ flex: 4, backgroundColor: "white" }}>
        <Text style={styles.datatext}>Nama: {data?.nama}</Text>
        <Text style={styles.datatext}>DoB: {data?.tanggal_lahir}</Text>
        <Text style={styles.datatext}>Email: {data?.email}</Text>
        <Text style={styles.datatext}>Telpon: {data?.telp}</Text>
        <Text style={styles.datatext}>Jabatan: {data?.jabatan}</Text>
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

export default Profile;
