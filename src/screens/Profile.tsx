import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "moment";
import { API_URL, useAuth } from "../contexts/auth";

interface Duser {
  id: string;
  nip: string;
  username: string;
  nama: string;
  telp: string;
  jabatan: string;
  email: string;
  tanggal_lahir: string;
}

const Profile = ({ navigation }) => {
  const authState = useAuth();
  const [data, setData] = useState<Duser | null>(null);
  const [currentDate, setCurrentDate] = useState("");

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
          alignItems: "flex-start",
          borderRadius: 17,
          marginBottom: 30,
        }}
      >
        <View>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text style={styles.greetext}>Hello, {data?.username} :D</Text>
          </View>
          <Text style={styles.datetext}>
            {Moment(currentDate).format("D MMM YYYY")}
          </Text>
        </View>
        <View></View>
      </View>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          borderRadius: 25,
        }}
      >
        <View style={{ flex: 4 }}>
          <View style={styles.titlecard}>
            <Text style={styles.titletext}>{data?.nama}</Text>
            <Text style={styles.subtitletext}>{data?.jabatan}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            alignItems: "center",
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
        <TouchableOpacity style={styles.menu}>
          <Text style={styles.menutext}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menus}
          onPress={() => navigation.navigate("Presensi")}
        >
          <Text style={styles.menustext}>Presensi</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 6,
          backgroundColor: "white",
          justifyContent: "space-evenly",
          marginHorizontal: 20,
          marginBottom: 20,
          borderTopRightRadius: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <View style={styles.datacard}>
          <Text style={styles.datatext}>Email</Text>
          <Text style={styles.subdatatext}>{data?.email}</Text>
        </View>
        <View style={styles.datacard}>
          <Text style={styles.datatext}>Tanggal Lahir</Text>
          <Text style={styles.subdatatext}>
            {Moment(data?.tanggal_lahir).format("D MMM YYYY")}
          </Text>
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
    marginTop: 6,
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
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  datacard: {
    backgroundColor: "#fbfcfeff",
    marginHorizontal: 30,
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
    borderRadius: 20,
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

export default Profile;
