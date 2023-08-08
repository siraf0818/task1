import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Moment from "moment";
import axios from "axios";
import { API_URL, useAuth, getValPres } from "../contexts/auth";

interface Duser {
  nama: string;
  username: string;
  jabatan: string;
  jatah_cuti: string;
  sisa_cuti: string;
  izin: string;
  sakit: string;
}

const Presensi = ({ navigation }) => {
  const authState = useAuth();
  const [data, setData] = useState<Duser | null>(null);
  const [currentDate, setCurrentDate] = useState("");

  const [hadir, setHadir] = useState("");
  const [wfh, setWfh] = useState("");
  const getPres = async () => {
    const hadir = await getValPres("HADIR");
    const wfh = await getValPres("WFH");
    setHadir(String(hadir));
    setWfh(String(wfh));
  };
  getPres();
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
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(year + "-" + month + "-" + date);
  }, []);

  return (
    <View style={styles.containerFlate}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 17,
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <View
          style={{
            flex: 5,
          }}
        >
          <View
            style={{
              padding: 10,
              alignItems: "flex-start",
            }}
          >
            <Text style={styles.greetext}>Hello, {data?.username} :D</Text>
          </View>
          <Text style={styles.datetext}>
            {Moment(currentDate).format("D MMM YYYY")}
          </Text>
        </View>
      </View>
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
            <Text style={styles.subdatatext}>{data?.jatah_cuti} hari</Text>
            <Text style={styles.datatext}>Jatah Cuti</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.subdatatext}>{data?.sisa_cuti} hari</Text>
            <Text style={styles.datatext}>Sisa Cuti</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.subdatatext}>{wfh} hari</Text>
            <Text style={styles.datatext}>WFH</Text>
          </View>
        </View>
        <View style={{ flex: 3, marginRight: 10 }}>
          <View style={styles.datacard}>
            <Text style={styles.subdatatext}>{data?.izin} hari</Text>
            <Text style={styles.datatext}>Izin</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.subdatatext}>{data?.sakit} hari</Text>
            <Text style={styles.datatext}>Sakit</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.subdatatext}>{hadir} hari</Text>
            <Text style={styles.datatext}>Hadir</Text>
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
    marginHorizontal: 5,
    fontSize: 14,
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
  greetext: {
    color: "white",
    justifyContent: "center",
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 30,
    fontSize: 25,
  },
  datetext: {
    justifyContent: "center",
    fontWeight: "bold",
    marginHorizontal: 20,
    fontSize: 14,
    color: "white",
    opacity: 0.6,
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
    alignItems: "center",
    backgroundColor: "#fbfcfeff",
    padding: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  datacard: {
    justifyContent: "center",
    alignItems: "flex-start",
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
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

export default Presensi;
