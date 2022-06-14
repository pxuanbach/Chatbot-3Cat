import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native';
import ChatList from './ChatList';
import InputBox from './InputBox';
import axiosInstance from '../../../AxiosInstance'
import { UserContext } from '../../../UserContext'

const Chat = ({ navigation }) => {
  const {user} = useContext(UserContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (user) {
      axiosInstance.get(`/message/${user._id}`)
      .then(response => {
        setMessages(response.data)
      }).catch(err => {

      })
    }
  }, [user])

  return (
    <View style={styles.container}>
      {user ? <ChatList messages={messages} /> : <></>}
      <InputBox user={user} setMessages={setMessages}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: '100%'
  },
})

export default Chat