import React from 'react'
import { View, Text, Button } from 'react-native';

const SignUp = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign Up Screen</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Log In')}
      ></Button>
    </View>

  )
}

export default SignUp