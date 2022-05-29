import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './Chat'
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
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F2F4F8',
          },
          headerTitle: (props) => (
            <View {...props} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>3Cat </Text>
              <Image source={require('../../assets/Cat.png')}></Image>
            </View>)
        }}
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