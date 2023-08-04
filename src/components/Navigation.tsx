import React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import { useAuth } from "../contexts/auth";
import Presensi from "../screens/Presensi";

const Stack = createNativeStackNavigator();
const SubStack = createNativeStackNavigator();

const Navigation = () => {
  const { authState, onLogout } = useAuth();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {authState?.authenticated ? (
            <Stack.Screen
              name="User"
              component={AppNavigator}
              options={{
                title: "Dashboard",
                headerShadowVisible: false,
                headerRight: () => (
                  <Button color="#4caf50" onPress={onLogout} title="Logout" />
                ),
              }}
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
  return (
    <SubStack.Navigator screenOptions={{ headerShown: false }}>
      <SubStack.Screen name="Profile" component={Profile} />
      <SubStack.Screen name="Presensi" component={Presensi} />
    </SubStack.Navigator>
  );
};

export default Navigation;
