import React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "./account/Account";
import Settings from "./Settings";
import ChangePassword from "./ChangePassword";
import Personal from "./Personal";
import { SettingContext } from "../../../SettingContext";
import { UserContext } from "../../../UserContext";

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <SettingContext.Consumer>
      {({ setting, setSetting }) => (
        <UserContext.Consumer>
          {({ user, setUser }) => (
            <Stack.Navigator>
              <Stack.Screen name="Account" options={{ headerShown: false }}>
                {(props) => (
                  <Account {...props} user={user} setUser={setUser} setSetting={setSetting} />
                )}
              </Stack.Screen>

              <Stack.Screen name="Personal" component={Personal} />
              <Stack.Screen name="Change Password" component={ChangePassword} />
              <Stack.Screen name="Settings">
                {(props) => (
                  <Settings
                    {...props}
                    setting={setting}
                    setSetting={setSetting}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </UserContext.Consumer>
      )}
    </SettingContext.Consumer>
  );
};

export default SettingStack;
