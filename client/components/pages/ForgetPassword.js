import React from 'react'
import { View, Text, Button } from 'react-native';

const ForgetPassword = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Forget Password Screen</Text>
      <Button
        title="Log In"
        onPress={() => navigation.navigate('Log In')}
      ></Button>
    </View>

  )
}

export default ForgetPassword