import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, useAuth } from "../contexts/auth";

interface Duser {
  nama: string;
  jabatan: string;
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
      <View style={{ flex: 2, flexDirection: "row" }}>
        <View style={{ flex: 2 }}>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>{data?.jabatan}</Text>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>{data?.nama}</Text>
            <Text style={styles.datatext}>{data?.jabatan}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 8, flexDirection: "row" }}>
        <View style={{ flex: 3, marginLeft: 20 }}>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Jatah Cuti</Text>
            <Text style={styles.subdatatext}>{data?.jatah_cuti}</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Sisa Cuti</Text>
            <Text style={styles.subdatatext}>{data?.sisa_cuti}</Text>
          </View>
        </View>
        <View style={{ flex: 3, marginRight: 20 }}>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Izin</Text>
            <Text style={styles.subdatatext}>{data?.izin}</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Sakit</Text>
            <Text style={styles.subdatatext}>{data?.sakit}</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", backgroundColor: "white" }}>
        <TouchableHighlight
          style={styles.menu}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.menutext}>Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.menus}>
          <Text style={styles.menutext}>Presensi</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlate: {
    flex: 1,
    backgroundColor: "white",
  },

  menu: {
    flex: 1,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
  },

  menus: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },

  menutext: {
    color: "#fff",
    fontSize: 15,
  },

  datatext: {
    fontWeight: "bold",
    marginTop: 5,
    marginHorizontal: 5,
    fontSize: 16,
    color: "#85868dff",
  },

  subdatatext: {
    color: "#0b0b0cff",
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 5,
    marginHorizontal: 5,
    fontSize: 17,
  },

  datacard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f5f8ff",
    marginHorizontal: 10,
    marginTop: 20,
    padding: 30,
    borderRadius: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

export default Presensi;
