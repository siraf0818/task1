import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, useAuth, getValPres } from "../contexts/auth";

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
  const [hadir, setHadir] = useState("");
  const [wfh, setWfh] = useState("");
  useEffect(() => {
    const getDuser = async () => {
      if (authState?.authState) {
        const token = authState.authState.token;
        await axios
          .get(`${API_URL}/check-token?token=${token}`)
          .then((response) => {
            setData(response.data.data.user);
          })
          .catch((response) => console.log(response.data.data.user))
          .catch((error) => console.error(error));
      }
    };
    getDuser();
    const getPres = async () => {
      const hadir = await getValPres("HADIR");
      const wfh = await getValPres("WFH");
      setHadir(String(hadir));
      setWfh(String(wfh));
    };
    getPres();
  }, []);

  return (
    <View style={styles.containerFlate}>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          marginTop: 10,
          borderRadius: 25,
        }}
      >
        <View
          style={{
            flex: 2,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <View style={styles.imagecard}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
              resizeMode={"contain"}
            />
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <View style={styles.titlecard}>
            <Text style={styles.titletext}>{data?.nama}</Text>
            <Text style={styles.subtitletext}>{data?.jabatan}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "flex-end",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.menus}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.menustext}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menutext}>Presensi</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 6,
          backgroundColor: "white",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: 20,
          marginBottom: 20,
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <View style={{ flex: 3, marginLeft: 10 }}>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Jatah Cuti</Text>
            <Text style={styles.subdatatext}>{data?.jatah_cuti}</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Sisa Cuti</Text>
            <Text style={styles.subdatatext}>{data?.sisa_cuti}</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>WFH</Text>
            <Text style={styles.subdatatext}>{wfh}</Text>
          </View>
        </View>
        <View style={{ flex: 3, marginRight: 10 }}>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Izin</Text>
            <Text style={styles.subdatatext}>{data?.izin}</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Sakit</Text>
            <Text style={styles.subdatatext}>{data?.sakit}</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.datatext}>Hadir</Text>
            <Text style={styles.subdatatext}>{hadir}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlate: {
    flex: 1,
    backgroundColor: "#4caf50",
  },
  menu: {
    width: "50%",
    height: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  menus: {
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  menutext: {
    color: "#0f1e3dff",
    fontWeight: "bold",
    fontSize: 17,
  },
  menustext: {
    fontWeight: "bold",
    color: "#fbfcfeff",
    fontSize: 17,
  },
  datatext: {
    fontWeight: "bold",
    marginTop: 5,
    marginHorizontal: 5,
    fontSize: 16,
    color: "#85868dff",
  },
  subdatatext: {
    color: "#3a455dff",
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 5,
    marginHorizontal: 5,
    fontSize: 17,
  },
  titletext: {
    fontWeight: "bold",
    marginTop: 6,
    marginHorizontal: 10,
    fontSize: 26,
    color: "#3a455dff",
  },
  subtitletext: {
    color: "#3a455dff",
    fontWeight: "bold",
    marginBottom: 6,
    marginHorizontal: 10,
    fontSize: 20,
    opacity: 0.8,
  },
  titlecard: {
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fbfcfeff",
    padding: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  datacard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbfcfeff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 1,
  },
  imagecard: {
    alignItems: "center",
    width: 125,
    height: 125,
    backgroundColor: "white",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#fbfcfeff",
  },
  logo: {
    width: "80%",
    height: "80%",
    borderRadius: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

export default Presensi;
