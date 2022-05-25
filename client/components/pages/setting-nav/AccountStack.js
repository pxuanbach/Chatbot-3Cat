import React from 'react'
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from './Account';
import Settings from './Settings';
import ForgetPassword from './ForgetPassword';
import Personal from './Personal'

const Stack = createNativeStackNavigator();

const SettingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Personal" component={Personal} />
            <Stack.Screen name="Forget Password" component={ForgetPassword} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    )
}

export default SettingStack