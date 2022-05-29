import React from 'react'
import { View, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker'

const Personal = () => {

  const [photo, setPhoto] = React.useState('https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg');

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {

      if (response) {
        setPhoto(response);
      }
    });
  };

  const buttonClickedHandler = () => {
    //do something
  }

  const [name, onChangeName] = React.useState(null);
  const [career, onChangeCareer] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#FFFFFF' }}>
      {photo && (
        <>
          <Avatar
            avatarStyle={{ borderWidth: 3, overflow: "hidden", borderColor: 'lightblue', borderRadius: 100 }}
            rounded
            padding = '5'
            size={150}
            source={{
              uri:
                photo.uri,
            }}
            onPress={handleChoosePhoto}
          >
          </Avatar>
        </>
      )
      }
      <View>
        <SafeAreaView>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Name"
            keyboardType="default"
          />
          <Text style={styles.title}>Career</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeCareer}
            value={career}
            placeholder="Career"
            keyboardType="default"
          />
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Phone number"
            keyboardType="numeric"
          />
        </SafeAreaView>
      </View>
      <View style={[{ width: "50%", margin: 0 }]}>
        <TouchableOpacity
          onPress={buttonClickedHandler}
          style={styles.roundButton}>
          <Text style={styles.titleButton}>SAVE</Text>
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
    alignItems: 'center'
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

export default Personal