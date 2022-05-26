import React from 'react'
import { View, Text, Button } from 'react-native';
import LinearGradientBackground from '../reusable/LinearGradientBackground';

const LogIn = ({ navigation }) => {
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.78)'}}>
      <LinearGradientBackground></LinearGradientBackground>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Log In Screen</Text>
        <Button
          title="Log In"
          onPress={() => navigation.navigate('Home')}
        ></Button>
      </View>
    </View>

  )
}

export default LogIn