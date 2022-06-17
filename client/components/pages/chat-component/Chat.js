import React, { useState, useEffect, useContext } from 'react'
import {
  View, StyleSheet, Text, Image,
  TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import ChatList from './ChatList';
import InputBox from './InputBox';
import axiosInstance from '../../../AxiosInstance'
import { UserContext } from '../../../UserContext'

const Chat = ({ navigation }) => {
  const { user } = useContext(UserContext)
  const [messages, setMessages] = useState([])

  const handleClearAllMessage = () => {
    axiosInstance.delete(`/message/${user._id}`)
      .then(response => {
        if (response.data.success) {
          setMessages([])
        }
      }).catch(err => {
        console.log(err.response.data.error)
      })
  }

  useEffect(() => {
    if (user) {
      axiosInstance.get(`/message/${user._id}`)
        .then(response => {
          setMessages(response.data)
        }).catch(err => {
          console.log(err.response.data)
        })
    }
  }, [user])

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.flexRow}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>3Cat </Text>
            <Image source={require('../../../assets/Cat.png')}></Image>
          </View>
          <TouchableOpacity onPress={handleClearAllMessage}>
            <Text style={{ fontSize: 16, color: "#7046E7" }}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        {user ? <ChatList messages={messages} /> : <></>}
        <InputBox user={user} setMessages={setMessages} />
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
  flexRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#F2F4F8',
    elevation: 0,
    shadowOpacity: 0,
    height: "12%",
    width: '100%',
    padding: '4%'
  }
})

export default Chat