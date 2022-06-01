import React from 'react'
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from './account/Account';
import Settings from './Settings';
import ChangePassword from './ChangePassword';
import Personal from './Personal'

const Stack = createNativeStackNavigator();

const SettingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Account"
                component={Account}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Personal" component={Personal} />
            <Stack.Screen name="Change Password" component={ChangePassword} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    )
}

export default SettingStack