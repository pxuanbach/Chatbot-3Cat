import React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "./account/Account";
import Settings from "./Settings";
import ChangePassword from "./ChangePassword";
import Personal from "./Personal";
import { SettingContext } from "../../../SettingContext";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <SettingContext.Consumer>
      {({ setting, setSetting }) => (
        <Stack.Navigator>
          <Stack.Screen name="Account" options={{ headerShown: false }}>
            {(props) => <Account {...props} setSetting={setSetting} />}
          </Stack.Screen>
          <Stack.Screen name="Personal" component={Personal} />
          <Stack.Screen name="Change Password" component={ChangePassword} />
          <Stack.Screen name="Settings">
            {(props) => (
              <Settings {...props} setting={setting} setSetting={setSetting} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </SettingContext.Consumer>
  );
};

export default SettingStack;
