import { View, Text, StyleSheet } from "react-native";
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

const Presensi = () => {
  const authState = useAuth();
  const [data, setData] = useState<Duser | null>(null);
  const [currentDate, setCurrentDate] = useState("");

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
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(year + "-" + month + "-" + date);
  }, []);

  return (
    <View style={styles.containerFlate}>
      <View
        style={{
          flex: 3,
          alignItems: "flex-start",
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        <Text style={styles.greetext}>
          {Moment(currentDate).format("dddd")}
        </Text>
        <Text style={styles.greetexts}>
          {Moment(currentDate).format("DD MMM YY")}
        </Text>
      </View>
      <View style={{ marginVertical: 20, marginHorizontal: 20 }}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Presensi Keseluruhan
        </Text>
      </View>
      <View
        style={{
          flex: 5,
          backgroundColor: "white",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <View style={{ flex: 3, marginLeft: 20 }}>
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
            <Text style={styles.datatext}>Total WFH</Text>
          </View>
        </View>
        <View style={{ flex: 3, marginRight: 20 }}>
          <View style={styles.datacard}>
            <Text style={styles.subdatatext}>{data?.izin} hari</Text>
            <Text style={styles.datatext}>Total Izin</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.subdatatext}>{data?.sakit} hari</Text>
            <Text style={styles.datatext}>Total Sakit</Text>
          </View>
          <View style={styles.datacard}>
            <Text style={styles.subdatatext}>{hadir} hari</Text>
            <Text style={styles.datatext}>Total Hadir</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlate: {
    flex: 1,
    backgroundColor: "rgb(78, 219, 92)",
  },
  menu: {
    height: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  greetexts: {
    color: "white",
    justifyContent: "center",
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 30,
    fontSize: 70,
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
    borderRadius: 20,
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
