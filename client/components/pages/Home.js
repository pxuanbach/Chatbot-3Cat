import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './Chat'
import AccountStack from './setting-nav/AccountStack'

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen
        name="Account Stack"
        component={AccountStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default Home