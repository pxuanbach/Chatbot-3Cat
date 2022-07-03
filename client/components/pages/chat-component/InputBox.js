import React, { useState } from 'react'
import {
  View, StyleSheet, KeyboardAvoidingView,
  Platform, TouchableOpacity, TextInput
} from 'react-native';
import { Audio } from 'expo-av'
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import axiosInstance from '../../../AxiosInstance';

const InputBox = ({ user, setMessages }) => {
  const [message, setMessage] = useState('');
  const [recording, setRecording] = useState();

  const handleSpeechToText = () => {

  }

  const handleSendMessage = () => {
    if (message) {
      axiosInstance.post('/message',
        JSON.stringify({
          "content": message,
          "userId": user._id
        }), {
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        if (response.data.message) {
          setMessages(preMessages => [...preMessages, response.data.message])
          setMessage('')
        }
        setTimeout(() => {
          if (response.data.botMessage) {
            setMessages(preMessages => [...preMessages, response.data.botMessage])
          }
        }, 500)

      }).catch(err => {
        console.log("Send message err", err.response.data.error)
      })
    }
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: '100%', }}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
            <View style={styles.buttonContainer}>
              {recording ? <SimpleLineIcons name="control-pause" size={24} color="#7046E7" /> 
              : <SimpleLineIcons name="microphone" size={24} color="#7046E7" />}
            </View>
          </TouchableOpacity>
          <TextInput
            placeholder={"Type a message"}
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <View style={styles.buttonContainer}>
              <Octicons name="paper-airplane" size={24} color="#7046E7" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    margin: 10,
    marginTop: 5
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 25,
    marginHorizontal: 10,
    padding: 5,
    flex: 1,
    alignItems: 'center',
    borderColor: '#E2DBDB',
    borderWidth: 1
  },
  buttonContainer: {
    backgroundColor: '#DADFEC',
    borderRadius: 25,
    padding: 10,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
    maxHeight: 86
  },
})

export default InputBox