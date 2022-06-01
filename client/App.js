import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/pages/Home'
import LogIn from './components/pages/LogIn'
import SignUp from './components/pages/SignUp'
import ForgetPassword from './components/pages/ForgetPassword';
import { UserContext } from './UserContext'
import axiosInstance from './AxiosInstance'

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  const verifyUser = async () => {
    try {
      const res = await axiosInstance.get('/verifyuser', { withCredentials: true });
      const data = res.data;
      console.log(data)
      setUser(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Log In">
          <Stack.Screen name="Log In" component={LogIn} options={{ headerShown: false }} />
          <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Forget Password" component={ForgetPassword} options={{ headerShown: false }} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}