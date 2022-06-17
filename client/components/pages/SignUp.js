import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradientBackground from '../reusable/LinearGradientBackground';
import axiosInstance from '../../AxiosInstance';

const SignUp = ({ navigation }) => {
  const [username, onChangeUsername] = useState('');
  const [usernameErr, onChangeUsernameErr] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordErr, onChangePasswordErr] = useState('');
  const [rePassword, onChangeRePassword] = useState('');
  const [rePasswordErr, onChangeRePasswordErr] = useState('');
  const [email, onChangeEmail] = useState('');
  const [emailErr, onChangeEmailErr] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('');
  const [phoneNumberErr, onChangePhoneNumberErr] = useState('');

  const resetStateErr = () => {
    onChangeUsernameErr('')
    onChangePasswordErr('')
    onChangeRePasswordErr('')
    onChangeEmailErr('')
    onChangePhoneNumberErr('')
  }

  const isRePasswordMatch = () => {
    if (rePassword !== password) {
      onChangeRePasswordErr("RePassword doesn't match password")
      return false;
    }
    return true;
  }

  const handleSignUp = async () => {
    resetStateErr();
    if (isRePasswordMatch()) {
      axiosInstance.post('/signup',
        JSON.stringify({
          "username": username,
          "password": password,
          "email": email,
          "phone": phoneNumber
        }), {
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        //response.data
        navigation.navigate("Log In");
      }).catch(err => {
        //err.response.data
        const errors = err.response.data.errors
        if (errors) {
          onChangeUsernameErr(errors.username)
          onChangePasswordErr(errors.password)
          onChangeEmailErr(errors.email)
          onChangePhoneNumberErr(errors.phone)
        }
      })
    }
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.78)' }}>
        <LinearGradientBackground></LinearGradientBackground>
        <View style={styles.container}>
          <Text style={styles.titleText}>Hello again!</Text>
          <Text style={styles.subtitleText}>Welcome to 3Cat. Please enter your username and password to access with your personal account</Text>
        </View>
        <View style={styles.formContainer} >
          <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={username}
            placeholder='Username'
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
            placeholder='Password'
            secureTextEntry={true}
          />
          <View style={styles.errorContainer}>
            {passwordErr ?
              <Text style={styles.errorText}>{passwordErr}</Text>
              : <></>}
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeRePassword}
            value={rePassword}
            placeholder='RePassword'
            secureTextEntry={true}
          />
          <View style={styles.errorContainer}>
            {rePasswordErr ?
              <Text style={styles.errorText}>{rePasswordErr}</Text>
              : <></>}
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder='Email'
          />
          <View style={styles.errorContainer}>
            {emailErr ?
              <Text style={styles.errorText}>{emailErr}</Text>
              : <></>}
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangePhoneNumber}
            value={phoneNumber}
            placeholder='Phone Number'
          />
          <View style={styles.errorContainer}>
            {phoneNumberErr ?
              <Text style={styles.errorText}>{phoneNumberErr}</Text>
              : <></>}
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn} onPress={handleSignUp}>
            <Text style={styles.btnContent}>Sign Up</Text>
          </Pressable>
          <View style={styles.login}>
            <Text style={{ fontSize: 16 }}>I'm already a member! </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Log In')}>
              <Text style={styles.touch}>Login</Text>
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
    marginTop: '10%'
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
  touch: {
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
  login: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 16,
    marginTop: 0
  },
  errorContainer: {
    marginBottom: 20
  },
  errorText: {
    color: 'red',
    marginTop: 2,
  }
})

export default SignUp