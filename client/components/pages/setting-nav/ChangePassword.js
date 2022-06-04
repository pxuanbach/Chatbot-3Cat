import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axiosInstance from '../../../AxiosInstance';
import bcrypt from 'bcryptjs';

const ChangePassword = () => {

  const [oldPass, onChangeOld] = React.useState('');
  const [newPass, onChangeNew] = React.useState('');
  const [rePass, onChangeRepass] = React.useState('');
  const [username, setUsername] = React.useState("vutan");
  const [user, setUser] = React.useState(null);

  const [errorOld, setErrorOld] = React.useState("");
  const [errorNew, setErrorNew] = React.useState("");
  const [errorRe, setErrorRe] = React.useState("");

  const getInfoUser = () => {
    axiosInstance.get(`/getuser/${username}`)
      .then(response => {
        setUser(response.data);
      }
      )
      .catch(err => {
        console.log(err);
      })
  }

  const handleValidate = () => {
    setErrorOld("");
    setErrorNew("");
    setErrorRe("");
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
      if (oldPass == user.password) {
        return true;
      } else {
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
      user.password = newPass;
      axiosInstance.put(`/updatePassword`, user)
        .then(response => {
          console.log(user);
          Alert.alert("", "Change password is complete!", [{
            text: "OK",
            style: "default"
          }])
        }
        )
        .catch(err => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    getInfoUser();
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