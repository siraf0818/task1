import React from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Profile from "../screens/Profile";
import { useAuth } from "../contexts/auth";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
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
  );
};

export default Navigation;
