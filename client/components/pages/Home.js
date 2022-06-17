import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './chat-component/Chat'
import AccountStack from './setting-nav/AccountStack';
import Tabbar from '../reusable/Tabbar'

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator tabBar={props => <Tabbar {...props}/>}>
      <Tab.Screen
        name="Chat"
        component={Chat}
        initialParams={{ icon: 'chatbubbles-outline' }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account Stack"
        component={AccountStack}
        options={{ headerShown: false }}
        initialParams={{ icon: 'options' }}
      />
    </Tab.Navigator>
  )
}

export default Home