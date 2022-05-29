import React from 'react'
import { View, Text, Button } from 'react-native';

const Account = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Account Screen</Text>
      <Button
        title="Personal"
        onPress={() => navigation.navigate('Personal')}
      ></Button>
      <Button
        title="Forget Password"
        onPress={() => navigation.navigate('Forget Password')}
      ></Button>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      ></Button>
      <Button
        title="Change Password"
        onPress={() => navigation.navigate('Change Password')}
      ></Button>
    </View>
  )
}

export default Account