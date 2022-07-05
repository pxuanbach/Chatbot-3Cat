import * as React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "./chat-component/Chat";
import AccountStack from "./setting-nav/AccountStack";
import Tabbar from "../reusable/Tabbar";
import { UserContext } from "../../UserContext";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
      <UserContext.Consumer>
        {({user, setUser}) => (
          <Tab.Navigator tabBar={(props) => <Tabbar {...props} />}>
          <Tab.Screen
              name="Chat"
              initialParams={{ icon: "chatbubbles-outline" }}
              options={{ headerShown: false }}
            >
              {props => <Chat {...props} user={user}/>}
            </Tab.Screen>
            <Tab.Screen
              name="Account Stack"
              component={AccountStack}
              options={{ headerShown: false }}
              initialParams={{ icon: "options" }}
            />
            </Tab.Navigator>
        )}
      </UserContext.Consumer>
  );
};

export default Home;
