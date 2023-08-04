import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, useAuth } from "../contexts/auth";

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
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <View style={{ flex: 3 }}>
          <View style={styles.imagecard}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
              resizeMode={"contain"}
            />
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <View style={styles.titlecard}>
            <Text style={styles.datatext}>{data?.nama}</Text>
            <Text style={styles.subdatatext}>{data?.jabatan}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <TouchableHighlight style={styles.menu}>
          <Text style={styles.menutext}>Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menus}
          onPress={() => navigation.navigate("Presensi")}
        >
          <Text style={styles.menustext}>Presensi</Text>
        </TouchableHighlight>
      </View>
      <View
        style={{
          flex: 6,
          backgroundColor: "#4caf50",
          justifyContent: "center",
        }}
      >
        <View style={styles.datacard}>
          <Text style={styles.datatext}>Email</Text>
          <Text style={styles.subdatatext}>{data?.email}</Text>
        </View>
        <View style={styles.datacard}>
          <Text style={styles.datatext}>Tanggal Lahir</Text>
          <Text style={styles.subdatatext}>{data?.tanggal_lahir}</Text>
        </View>
        <View style={styles.datacard}>
          <Text style={styles.datatext}>Telpon</Text>
          <Text style={styles.subdatatext}>{data?.telp}</Text>
        </View>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  menus: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menutext: {
    color: "#fff",
    fontSize: 19,
  },
  menustext: {
    color: "#4caf50",
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
    backgroundColor: "#f3f5f8ff",
    marginHorizontal: 30,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  titlecard: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  imagecard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f5f8ff",
    marginTop: 10,
    padding: 10,
    borderRadius: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default Profile;
