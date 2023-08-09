import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import { useAuth } from "../contexts/auth";
import Presensi from "../screens/Presensi";

const Stack = createNativeStackNavigator();
const SubStack = createNativeStackNavigator();

const Navigation = () => {
  const { authState } = useAuth();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {authState?.authenticated ? (
            <Stack.Screen
              name="User"
              component={AppNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const AppNavigator = () => {
  const { onLogout } = useAuth();

  return (
    <SubStack.Navigator>
      <SubStack.Screen
        name="Dashboard"
        component={Profile}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "rgb(78, 219, 92)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <TouchableOpacity onPress={onLogout}>
              <Icon name="sign-out" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <SubStack.Screen
        name="Presensi"
        component={Presensi}
        options={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "rgb(78, 219, 92)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </SubStack.Navigator>
  );
};

export default Navigation;
