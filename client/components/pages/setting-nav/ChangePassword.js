import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ChangePassword = () => {

  const [oldPass, onChangeOld] = React.useState(null);
  const [newPass, onChangeNew] = React.useState(null);
  const [rePass, onChangeRepass] = React.useState(null);

  const buttonClickedHandler = () => {
    //do something
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
        <SafeAreaView>
          <Text style={styles.title}>Old password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeOld}
            value={oldPass}
            placeholder="********"
            keyboardType="default"
          />
          <Text style={styles.title}>New password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNew}
            value={newPass}
            placeholder="********"
            keyboardType="default"
          />
          <Text style={styles.title}>Repassword</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeRepass}
            value={rePass}
            placeholder="********"
            keyboardType="default"
          />
        </SafeAreaView>
      </View>
      <View style={[{ flex: 1, justifyContent: 'space-evenly' }, { width: "50%", margin: 0 }]}>
        <TouchableOpacity
          onPress={buttonClickedHandler}
          style={styles.roundButton}>
          <Text style={styles.titleButton}>CHANGE</Text>
        </TouchableOpacity>

      </View>
    </View>

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