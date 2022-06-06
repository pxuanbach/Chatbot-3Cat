import React from 'react'
import { View, StyleSheet } from 'react-native';
import ChatList from './ChatList';
import InputBox from './InputBox';

const data = [
  {
    content: 'Xin chào',
    sender: 'bot',
    createdAt: '2022-05-20T16:39:06.170+00:00'
  },
  {
    content: 'Định lí Pytago',
    sender: 'ấudiansdnasdnasd',
    createdAt: '2022-05-20T17:00:34.183+00:00'
  },
  // {
  //   content: 'Tổng cạnh huyền bằng tổng bình phương 2 cạnh góc vuông',
  //   isMine: true,
  //   createdAt: '2022-05-20T17:00:53.144+00:00'
  // },
  // {
  //   content: 'Xin chào',
  //   isMine: false,
  //   createdAt: '2022-05-20T17:01:00.879+00:00'
  // },
  // {
  //   content: 'Xin chào',
  //   isMine: true,
  //   createdAt: '2022-05-22T04:28:27.618+00:00'
  // },
  // {
  //   content: 'Xin chào',
  //   isMine: false,
  //   createdAt: '2022-05-24T11:16:57.380+00:00'
  // },
  // {
  //   content: 'Xin chào',
  //   isMine: false,
  //   createdAt: '2022-05-24T11:16:57.380+00:00'
  // },
  // {
  //   content: 'Xin chào',
  //   isMine: false,
  //   createdAt: '2022-05-24T11:16:57.380+00:00'
  // },
  // {
  //   content: 'Xin chào',
  //   isMine: false,
  //   createdAt: '2022-05-24T11:16:57.380+00:00'
  // },
  // {
  //   content: 'Xin chào',
  //   isMine: false,
  //   createdAt: '2022-05-24T11:16:57.380+00:00'
  // },
  // {
  //   content: 'Định lí Pytago',
  //   isMine: false,
  //   createdAt: '2022-05-20T17:00:34.183+00:00'
  // },
  // {
  //   content: 'Tổng cạnh huyền bằng tổng bình phương 2 cạnh góc vuông',
  //   isMine: true,
  //   createdAt: '2022-05-20T17:00:53.144+00:00'
  // },
  // {
  //   content: 'Tổng cạnh huyền bằng tổng bình phương 2 cạnh góc vuông',
  //   isMine: true,
  //   createdAt: '2022-05-20T17:00:53.144+00:00'
  // },
]

const Chat = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <ChatList messages={data}/>
        <InputBox/>
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