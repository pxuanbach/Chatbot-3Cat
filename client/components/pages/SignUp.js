import React from 'react'
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradientBackground from '../reusable/LinearGradientBackground';

const SignUp = ({navigation}) => {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [rePassword, onChangeRePassword] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [phoneNumber, onChangePhoneNumber] = React.useState('');

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFFFFF'}}>

    <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.78)'}}>
      <LinearGradientBackground></LinearGradientBackground>
      <View style={styles.container}>
        <Text style={styles.titleText}>Hello again!</Text>
        <Text>{"\n"}</Text>
        <Text style={styles.subtitleText}>Welcome to 3Cat. Please enter your username and password to access with your personal account</Text>
      </View>
      <View style={styles.formContainer} >
        <TextInput style={styles.input} onChangeText={onChangeUsername} value={username} placeholder='Username'/>
        <TextInput style={styles.input} onChangeText={onChangePassword} value={password} placeholder='Password' secureTextEntry={true}/>
        <TextInput style={styles.input} onChangeText={onChangeRePassword} value={rePassword} placeholder='RePassword' secureTextEntry={true}/>
        <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} placeholder='Email'/>
        <TextInput style={styles.input} onChangeText={onChangePhoneNumber} value={phoneNumber} placeholder='Phone Number'/>
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Log In')}>
          <Text style={styles.btnContent}>Sign Up</Text>
        </Pressable>
        <View style={styles.login}>
          <Text style={{fontSize: 16}}>I'm already a member! </Text>
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
    width: 320,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6384DA',
    padding: 20,
    marginBottom: '5%',
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
  }
})

export default SignUp