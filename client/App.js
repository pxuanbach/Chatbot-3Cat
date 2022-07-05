import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./components/pages/Home";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import ForgetPassword from "./components/pages/ForgetPassword";
import { UserContext } from "./UserContext";
import { SettingContext } from "./SettingContext";
import axiosInstance from "./AxiosInstance";

const Stack = createNativeStackNavigator();

export default function App() {
  const [setting, setSetting] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listAllVoiceOptions = async () => {
      try {
        const settingStorage = await AsyncStorage.getItem("@storage_setting");
        if (settingStorage) {
          const settingValue = JSON.parse(settingStorage);
          setSetting(settingValue);
          console.log(settingValue);
        } else {
          const voices = await Speech.getAvailableVoicesAsync();
          console.log(voices.length);
          let curSetting = {
            isCheck: true,
            rate: 70,
            voice: null,
          };
          if (voices.length > 0) {
            const viVoice = voices.find((voice) => voice.language === "vi-VN");
            curSetting = {
              isCheck: true,
              rate: 70,
              voice: viVoice ? viVoice : voices[0],
            };
          }
          await AsyncStorage.setItem(
            "@storage_setting",
            JSON.stringify(curSetting)
          );
          setSetting(curSetting);
          console.log(curSetting);
        }
      } catch (err) {
        console.log("error voice", err.message);
      }
    };

    const verifyUser = async () => {
      try {
        const token = await AsyncStorage.getItem("@storage_token");
        if (token) {
          axiosInstance
            .get(`/verifyuser/${token}`)
            .then((response) => {
              //response.data
              console.log("data", response.data);
              setUser(response.data);
            })
            .catch((err) => {
              //err.response.data
              console.log("error verify", err.response.data);
            });
        }
      } catch (error) {
        console.log("verify err", error.message);
      }
    };

    verifyUser();
    listAllVoiceOptions();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SettingContext.Provider value={{ setting, setSetting }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Log In">
            {user ? (
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen name="Log In" options={{ headerShown: false }}>
                  {(props) => <LogIn {...props} setSetting={setSetting} />}
                </Stack.Screen>
                <Stack.Screen
                  name="Sign Up"
                  component={SignUp}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Forget Password"
                  component={ForgetPassword}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SettingContext.Provider>
    </UserContext.Provider>
  );
}
