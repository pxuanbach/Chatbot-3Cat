import React from 'react'
import { View, Text, Button } from 'react-native';

const LogIn = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Log In Screen</Text>
      <Button
        title="Log In"
        onPress={() => navigation.navigate('Home')}
      ></Button>
    </View>

  )
}

export default LogIn