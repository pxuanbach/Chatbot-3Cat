import React from 'react'
import { View, Text, Button } from 'react-native';

const Chat = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Chat Screen</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.popToTop()}
      ></Button>
    </View>

  )
}

export default Chat