import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import moment from 'moment'

const ChatItem = ({ message }) => {

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      alignItems: message.isMine ? 'flex-end' : 'flex-start',
    },
    chatBox: {
      backgroundColor: message.isMine ? '#F8BBF2' : '#BBE2F8',
      borderRadius: 10,
      padding: 10,
      maxWidth: 300,
      minWidth: 150
    },
    text: {
      fontSize: 18,
      fontWeight: '400',
      color: '#19377A',
    },
    time: {
      color: '#AFAFAF',
    }
  })


  return (
    <View style={styles.container}>
      <View style={styles.chatBox}>
        <Text style={styles.text}>{message.content}</Text>
      </View>
      <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
    </View>
  )
}

export default ChatItem