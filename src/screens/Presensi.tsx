import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
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
  var idLocale = require("moment/locale/id");
  Moment.locale("id", idLocale);
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
          flex: 1,
          alignItems: "flex-start",
          marginLeft: 10,
          marginTop: 10,
          paddingBottom: 50,
        }}
      >
        <Text style={styles.greetext}>
          {Moment(currentDate).format("dddd")}
        </Text>
        <Text style={styles.greetexts}>
          {Moment(currentDate).format("DD MMM YY")}
        </Text>
      </View>
      <View
        style={{
          flex: 4,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 3,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0fdf4",
        }}
      >
        <View
          style={{
            flex: 5,
            margin: 10,
            flexDirection: "row",
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 3,
              marginVertical: 10,
              marginLeft: 5,
            }}
          >
            <View style={styles.datacard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 3, justifyContent: "flex-end" }}>
                  <Text style={styles.subdatatext}>{hadir} hari</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    padding: 9,
                    borderRadius: 10,
                    backgroundColor: "rgb(50, 191, 74)",
                  }}
                >
                  <Icon name="briefcase" size={27} color="#f0fdf4" />
                </View>
              </View>
              <Text style={styles.datatext}>Total Hadir</Text>
            </View>
            <View style={styles.datacard}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 3, justifyContent: "flex-end" }}>
                  <Text style={styles.subdatatext}>{data?.izin} hari</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: "rgb(231, 209, 82)",
                  }}
                >
                  <Icon name="info" size={33} color="#f0fdf4" />
                </View>
              </View>
              <Text style={styles.datatext}>Total Izin</Text>
            </View>
            <View style={styles.datacard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 3, justifyContent: "flex-end" }}>
                  <Text style={styles.subdatatext}>
                    {data?.jatah_cuti} hari
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: 9,
                    borderRadius: 10,
                    backgroundColor: "rgb(206, 73, 195)",
                  }}
                >
                  <Icon name="calendar-o" size={27} color="#f0fdf4" />
                </View>
              </View>
              <Text style={styles.datatext}>Jatah Cuti</Text>
            </View>
          </View>
          <View style={{ flex: 3, marginVertical: 10, marginRight: 5 }}>
            <View style={styles.datacard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 3, justifyContent: "flex-end" }}>
                  <Text style={styles.subdatatext}>{wfh} hari</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: 7,
                    borderRadius: 10,
                    backgroundColor: "rgb(74, 209, 194)",
                  }}
                >
                  <Icon name="home" size={30} color="#f0fdf4" />
                </View>
              </View>
              <Text style={styles.datatext}>Total WFH</Text>
            </View>
            <View style={styles.datacard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 3, justifyContent: "flex-end" }}>
                  <Text style={styles.subdatatext}>{data?.sakit} hari</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: 7,
                    borderRadius: 10,
                    backgroundColor: "rgb(207, 73, 73)",
                  }}
                >
                  <Icon name="plus-square" size={30} color="#f0fdf4" />
                </View>
              </View>
              <Text style={styles.datatext}>Total Sakit</Text>
            </View>
            <View style={styles.datacard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 3, justifyContent: "flex-end" }}>
                  <Text style={styles.subdatatext}>{data?.sisa_cuti} hari</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: 9,
                    borderRadius: 10,
                    backgroundColor: "rgb(130, 78, 219)",
                  }}
                >
                  <Icon name="calendar" size={27} color="#f0fdf4" />
                </View>
              </View>
              <Text style={styles.datatext}>Sisa Cuti</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlate: {
    flex: 1,
    backgroundColor: "rgb(50, 191, 74)",
  },
  greetext: {
    color: "#f0fdf4",
    justifyContent: "center",
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 30,
    fontSize: 30,
  },
  greetexts: {
    color: "#f0fdf4",
    justifyContent: "center",
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 30,
    fontSize: 65,
  },
  datacard: {
    margin: 10,
    padding: 15,
    backgroundColor: "#f0fdf4",
    borderWidth: 1.5,
    borderColor: "rgb(245, 245, 245)",
    borderRadius: 20,
  },
  datatext: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 17,
    color: "#85868dff",
  },
  subdatatext: {
    marginBottom: 5,
    color: "#3a455dff",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default Presensi;
