import React, { useEffect, useContext } from 'react'
import { View, SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import axiosInstance from '../../../AxiosInstance'
import { UserContext } from '../../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Personal = ({ navigation }) => {

  const [photo, setPhoto] = React.useState('https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg');

  const [errorName, setErrorname] = React.useState("");
  const [errorCareer, setErrorCareer] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState("");
  const [errorPhone, setErrorPhone] = React.useState("");
  const { user, setUser } = useContext(UserContext);

  const handleChoosePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      let newFile = {uri:result.uri, 
        type:`test/${result.uri.split(".")[3]}`, 
        name:`test.${result.uri.split(".")[2]}`}
        console.log(newFile)
      handleUpPhoto(newFile)
    }
  };

  const handleUpPhoto = (pic) => {
    const data = new FormData()
    data.append('file', pic)
    data.append("upload_preset", "_Chatbot3Cat")
    data.append("cloud_name","chatbot3cat")
    fetch("https://api.cloudinary.com/v1_1/chatbot3cat/image/upload", {
      method:'POST',
      body:data,
      headers: {
        'Accept':'application/json',
        'Content-Type':'multipart/form-data'
      }
    }).then(res => res.json())
    .then(data => {
      setPhoto(data.url)
      handleUpdateAvatar(data.url)
    }).catch(err => console.log(err))
  }

  const handleUpdateAvatar = async (data) => {
    axiosInstance.put('/updateAvatar',
      JSON.stringify({
        "username": user.username,
        "avatar": data,
        "token": await AsyncStorage.getItem('@storage_token')
      }), {
      headers: { "Content-Type": "application/json" }
    }).then(response => {
      user.avatar = response.data.avatar;
      setUser(user);
    }
    )
      .catch(error => {
        console.log("error");
      })
    }

  const getInfoUser = () => {
    axiosInstance.get(`/getuser/${user.username}`)
      .then(response => {
        setUser(response.data);
        onChangeName(response.data.name);
        onChangeCareer(response.data.career);
        onChangeEmail(response.data.email);
        onChangeNumber(response.data.phone);
        if (response.data.avatar)
          setPhoto(response.data.avatar);
        }
      )
      .catch(err => {
        console.log(err);
      })
  }

  const handleValidate = () => {
    setErrorname("");
    setErrorEmail("");
    setErrorPhone("");

    if (name.length == 0) {
      setErrorname("Name must be filled!");
      return false;
    }
    if (email.length == 0) {
      setErrorEmail("Email must be filled!");
      return false;
    }
    if (number.length == 0) {
      setErrorPhone("Number phone must be filled!");
      return false;
    }

    axiosInstance.get(`/checkEmail/${email}`)
      .then(response => {
        if (response.data.email == email && response.data.username != user.username) {
          setErrorEmail("Email already exists!");
          return false;
        }
      })
      .catch(error => {
        console.log(error);
      })

      axiosInstance.get(`/checkPhone/${number}`)
      .then(response => {
        if (response.data.phone == number && response.data.username != user.username) {
          setErrorPhone("Number phone already exists!");
          return false;
        }
      })
      .catch(error => {
        console.log(error);
      })
    return true;
  }

  const buttonClickedHandler = () => {
    if (handleValidate()) {
      user.email = email;
      user.name = name;
      user.phone = number;
      user.career = career;
      axiosInstance.put(`/updateUser`, user)
        .then(response => {
          console.log(user);
          navigation.navigate('Account');
        }
        )
        .catch(err => {
          console.log(err);
        })
    }
  }

  const [name, onChangeName] = React.useState('');
  const [career, onChangeCareer] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  useEffect(() => {
    getInfoUser();
  }, [])

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#FFFFFF', marginTop: 20 }}>

          <>
            <Avatar
              avatarStyle={{ borderWidth: 3, overflow: "hidden", borderColor: 'lightblue', borderRadius: 100 }}
              rounded
              padding='5'
              size={150}
              source={{
                uri:
                  photo,
              }}
              onPress={handleChoosePhoto}
            >
            </Avatar>
          </>
        
        <View>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Name"
            keyboardType="default"
          />
          <Text style={styles.error}>{errorName}</Text>
          <Text style={styles.title}>Career</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeCareer}
            value={career}
            placeholder="Career"
            keyboardType="default"
          />
          <Text style={styles.error}></Text>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Text style={styles.error}>{errorEmail}</Text>
          <Text style={styles.title}>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Phone number"
            keyboardType="numeric"
          />
          <Text style={styles.error}>{errorPhone}</Text>
        </View>
        <View style={[{ width: "50%", margin: 0, flex: 1, marginBottom: 10, marginTop: 10 }]}>
          <TouchableOpacity
            onPress={buttonClickedHandler}
            style={styles.roundButton}>
            <Text style={styles.titleButton}>SAVE</Text>
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
    marginVertical: 5,
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

export default Personal