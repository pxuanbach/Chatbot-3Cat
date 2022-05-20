import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/pages/Home'
import LogIn from './components/pages/LogIn'
import SignUp from './components/pages/SignUp'
import ForgetPassword from './components/pages/ForgetPassword'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Log In" component={LogIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Forget Password" component={ForgetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}