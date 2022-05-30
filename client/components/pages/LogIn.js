import React from 'react'
import { StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import LinearGradientBackground from '../reusable/LinearGradientBackground';

const LogIn = ({ navigation }) => {

  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.78)'}}>
      <LinearGradientBackground></LinearGradientBackground>
      <View style={styles.container}>
        <Text style={styles.titleText}>Hello again!</Text>
        <Text>{"\n"}</Text>
        <Text style={styles.subtitleText}>Welcome to 3Cat. Please enter your username and password to access with your personal account</Text>
      </View>
      <View style={styles.formContainer} >
        <TextInput style={styles.input} onChangeText={onChangeUsername} value={username} placeholder='Enter username'/>
        <TextInput style={styles.input} onChangeText={onChangePassword} value={password} placeholder='Enter password' secureTextEntry={true}/>
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Forget Password')}>
            <Text style={styles.forgot}>Forget password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.btnContent}>LOGIN</Text>
        </Pressable>
        <Text style={styles.subtitleText}>Or countinue with</Text>
        <View style={styles.register}>
          <Text style={{fontSize: 16}}>Not a member? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.forgot}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
  },
  btnContainer: {
    flex: 2,
    alignItems: 'center',
    marginTop: 80
  },
  titleText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2A2C5B',
    fontFamily: 'Roboto',
    marginTop: 85
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
    marginBottom: 20,
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
    marginBottom: 40
  },
  btnContent: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '500',
    color: '#fff'
  },
  register: {
    width: '100%',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 16
  }
})

export default LogIn