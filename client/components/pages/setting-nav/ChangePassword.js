import React, { useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axiosInstance from '../../../AxiosInstance';
import { UserContext } from '../../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({navigation}) => {
  const { user, setUser } = useContext(UserContext);
  const [oldPass, onChangeOld] = React.useState('');
  const [newPass, onChangeNew] = React.useState('');
  const [rePass, onChangeRepass] = React.useState('');

  const [errorOld, setErrorOld] = React.useState("");
  const [errorNew, setErrorNew] = React.useState("");
  const [errorRe, setErrorRe] = React.useState("");
  const [flag, setFlag] = React.useState(false);

  const clearError = () => {
    setErrorOld("");
    setErrorNew("");
    setErrorRe("");
  }

  const clearInput = () => {
    onChangeOld("");
    onChangeNew("");
    onChangeRepass("");
  }
  const handleChangePassword = async () => {
    axiosInstance.put('/updatePassword',
      JSON.stringify({
        "username": user.username,
        "password": newPass,
        "token": await AsyncStorage.getItem('@storage_token')
      }), {
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      Alert.alert("", "Change password is complete!", [{
        text: "OK",
        style: "default"
      }]);
      user.password = response.data.password;
      navigation.navigate('Account');
    }
    )
      .catch(error => {
        console.log("error");
      })
  }

  const handleValidate = () => {
    clearError();
    if (oldPass.length == 0) {
      setErrorOld("Old password must be filled!");
      return false;
    }
    if (newPass.length == 0) {
      setErrorNew("New password must be filled!");
      return false;
    }
    if (rePass.length == 0) {
      setErrorRe("Repassword must be filled!");
      return false;
    }
    if (newPass.length < 6) {
      setErrorNew("New password must be at least 6 characters!");
      return false;
    }
    if (newPass == rePass) {
      axiosInstance.put('checkPass',
        JSON.stringify({
          "check": oldPass,
          "userPass": user.password
        }), {
        headers: { "Content-Type": "application/json" }
      }).then(response => {
        setFlag(response.data);
      })
      if (flag) {
        return true;
      }
      else {
        setErrorOld("Current password is wrong!");
        return false;
      }
    } else {
      setErrorRe("Repassword don't match with new password!");
      return false;
    }
  }

  const buttonClickedHandler = () => {
    if (handleValidate() == true) {
      handleChangePassword();
    }
  }

  useEffect(() => {

  }, [])

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#FFFFFF', marginVertical: 20 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 20 }}>
          <SafeAreaView>
            <Text style={styles.title}>Old password</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeOld}
              value={oldPass}
              placeholder="********"
              keyboardType="default"
            />
            <Text style={styles.error}>{errorOld}</Text>
            <Text style={styles.title}>New password</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNew}
              value={newPass}
              placeholder="********"
              keyboardType="default"
            />
            <Text style={styles.error}>{errorNew}</Text>
            <Text style={styles.title}>Repassword</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeRepass}
              value={rePass}
              placeholder="********"
              keyboardType="default"
            />
            <Text style={styles.error}>{errorRe}</Text>
          </SafeAreaView>
        </View>
        <View style={[{ flex: 1, justifyContent: 'space-evenly' }, { width: "50%", margin: 20 }]}>
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton}>
            <Text style={styles.titleButton}>CHANGE</Text>
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    borderColor: '#6384DA',
    borderRadius: 10,
  },
  title: {
    color: '#80818B'
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginVertical: 2,
    marginLeft: 10
  },
  titleButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  roundButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 15,
    backgroundColor: '#6384DA',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default ChangePassword