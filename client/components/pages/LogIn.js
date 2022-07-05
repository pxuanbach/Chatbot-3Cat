import React, { useState, useContext } from 'react'
import {
  StyleSheet, View, Text, Pressable,
  TextInput, TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradientBackground from '../reusable/LinearGradientBackground';
import axiosInstance from '../../AxiosInstance';
import { UserContext } from '../../UserContext';
import * as Speech from "expo-speech";

const LogIn = ({ navigation, setSetting }) => {
  const { user, setUser } = useContext(UserContext);
  const [username, onChangeUsername] = useState('');
  const [usernameErr, onChangeUsernameErr] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordErr, onChangePasswordErr] = useState('');

  const resetStateErr = () => {
    onChangeUsernameErr('')
    onChangePasswordErr('')
  }

  const listAllVoiceOptions = async () => {
    try {
      const settingStorage = await AsyncStorage.getItem("@storage_setting");
      if (settingStorage) {
        const settingValue = JSON.parse(settingStorage);
        setSetting(settingValue);
        console.log(settingValue);
      } else {
        const voices = await Speech.getAvailableVoicesAsync();
        console.log(voices.length);
        let curSetting = {
          isCheck: true,
          rate: 70,
          voice: null,
        };
        if (voices.length > 0) {
          const viVoice = voices.find((voice) => voice.language === "vi-VN");
          curSetting = {
            isCheck: true,
            rate: 70,
            voice: viVoice ? viVoice : voices[0],
          };
        }
        await AsyncStorage.setItem(
          "@storage_setting",
          JSON.stringify(curSetting)
        );
        setSetting(curSetting);
        console.log(curSetting);
      }
    } catch (err) {
      console.log("error voice", err.message);
    }
  };

  const handleLogin = async () => {
    resetStateErr();
    axiosInstance.post('/login',
      JSON.stringify({
        "username": username,
        "password": password
      }), {
      headers: { "Content-Type": "application/json" }
    }).then(async (response) => {
      //response.data
      setUser(response.data.user);
      await AsyncStorage.setItem('@storage_token', response.data.token)
      await listAllVoiceOptions();
    }).catch(err => {
      //err.response.data
      const errors = err.response.data.errors
      if (errors) {
        onChangeUsernameErr(errors.username)
        onChangePasswordErr(errors.password)
      }
    })
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
        <LinearGradientBackground></LinearGradientBackground>
        <View style={styles.container}>
          <Text style={styles.titleText}>Hello again!</Text>
          <Text>{"\n"}</Text>
          <Text style={styles.subtitleText}>
            Welcome to 3Cat. Please enter your username and
            password to access with your personal account
          </Text>
        </View>
        <View style={styles.formContainer} >
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={username}
            placeholder='Enter username'
          />
          <View style={styles.errorContainer}>
            {usernameErr ?
              <Text style={styles.errorText}>{usernameErr}</Text>
              : <></>}
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder='Enter password'
            secureTextEntry={true} />
          <View style={styles.errorContainer}>
            {passwordErr ?
              <Text style={styles.errorText}>{passwordErr}</Text>
              : <></>}
          </View>
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Forget Password')}>
              <Text style={styles.forgot}>Forget password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnContent}>LOGIN</Text>
          </Pressable>
          <View style={styles.register}>
            <Text style={{ fontSize: 16 }}>Not a member? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sign Up')}>
              <Text style={styles.forgot}>Register now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
  },
  formContainer: {
    flex: 3,
    alignItems: 'center',
    marginTop: '10%'
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2A2C5B',
    fontFamily: 'Roboto',
    marginTop: '20%'
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#80818B',
    width: 300,
    textAlign: 'center',
  },
  input: {
    fontSize: 15,
    width: 320,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6384DA',
    padding: 15,
    backgroundColor: '#fff'
  },
  forgotPassword: {
    width: 320,
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 16,
    color: '#2A2C5B',
    fontWeight: '500'
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    height: 60,
    backgroundColor: '#6384DA',
    borderRadius: 15,
    marginBottom: '5%'
  },
  btnContent: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '500',
    color: '#fff'
  },
  register: {
    width: '100%',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 16
  },
  errorContainer: {
    marginBottom: 20
  },
  errorText: {
    color: 'red',
    marginTop: 2,
  }
})

export default LogIn