import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Moment from "moment";
import { API_URL, useAuth } from "../contexts/auth";

interface Duser {
  id: string;
  username: string;
  nama: string;
  telp: string;
  jabatan: string;
  email: string;
  tanggal_lahir: string;
}
LogBox.ignoreAllLogs();
const Profile = ({ navigation }) => {
  const authState = useAuth();
  const [data, setData] = useState<Duser | null>(null);
  const [currentDate, setCurrentDate] = useState("");
  var idLocale = require("moment/locale/id");
  Moment.locale("id", idLocale);
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
          backgroundColor: "rgb(51, 191, 74)",
          borderBottomLeftRadius: 30,
          paddingHorizontal: 20,
          paddingTop: 23,
          paddingBottom: 40,
        }}
      >
        <View>
          <View style={styles.imagecard}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
              resizeMode={"contain"}
            />
          </View>
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.datetext}>
              {Moment(currentDate).format("D MMMM YYYY")}
            </Text>
          </View>
          <View>
            <Text style={styles.greetext}>Hello, {data?.nama}</Text>
            <Text style={styles.subtitletext}>{data?.jabatan}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: "space-evenly",
          marginHorizontal: 10,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <View style={styles.datacard}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(219, 78, 78)",
              borderRadius: 10,
              margin: 7,
            }}
          >
            <Icon name="user" size={29} color="white" />
          </View>
          <View
            style={{
              flex: 4,
              marginHorizontal: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={styles.datatext}>Username</Text>
            <Text style={styles.subdatatext}>{data?.username}</Text>
          </View>
        </View>
        <View style={styles.datacard}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(219, 78, 207)",
              borderRadius: 10,
              margin: 7,
            }}
          >
            <Icon name="envelope" size={27} color="white" />
          </View>
          <View
            style={{
              flex: 4,
              marginHorizontal: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={styles.datatext}>Email</Text>
            <Text style={styles.subdatatext}>{data?.email}</Text>
          </View>
        </View>
        <View style={styles.datacard}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(250, 227, 90)",
              borderRadius: 10,
              margin: 7,
            }}
          >
            <Icon name="calendar" size={27} color="white" />
          </View>
          <View
            style={{
              flex: 4,
              marginHorizontal: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={styles.datatext}>Tanggal Lahir</Text>
            <Text style={styles.subdatatext}>
              {Moment(data?.tanggal_lahir).format("D MMM YYYY")}
            </Text>
          </View>
        </View>
        <View style={styles.datacard}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgb(78, 219, 203)",
              borderRadius: 10,
              margin: 7,
            }}
          >
            <Icon name="phone" size={33} color="white" />
          </View>
          <View
            style={{
              flex: 4,
              marginHorizontal: 5,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text style={styles.datatext}>Telpon</Text>
            <Text style={styles.subdatatext}>{data?.telp}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.menus}
        onPress={() => navigation.navigate("Presensi Keseluruhan")}
      >
        <Text style={styles.menustext}>Check Presensi Keseluruhan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerFlate: {
    flex: 1,
    backgroundColor: "white",
  },
  menus: {
    marginHorizontal: 50,
    marginBottom: 20,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: "rgb(50, 191, 74)",
    justifyContent: "center",
    alignItems: "center",
  },
  menustext: {
    fontWeight: "bold",
    color: "white",
    fontSize: 17,
  },
  datatext: {
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 5,
    fontSize: 15,
    color: "#85868dff",
  },
  subdatatext: {
    color: "#3a455dff",
    fontWeight: "bold",
    marginBottom: 10,
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
    opacity: 0.7,
  },
  subtitletext: {
    color: "#3a455dff",
    fontWeight: "bold",
    marginBottom: 6,
    marginHorizontal: 10,
    fontSize: 20,
    opacity: 0.7,
  },
  datacard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "rgb(245, 245, 245)",
    marginHorizontal: 15,
    borderRadius: 10,
  },
  imagecard: {
    alignItems: "center",
    width: 100,
    height: 100,
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
