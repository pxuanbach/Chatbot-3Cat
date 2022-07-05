import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradientBackground from '../../../reusable/LinearGradientBackground';
import OptionButton from './OptionButton';

const { width } = Dimensions.get('screen');
const imageSize = width / 3

const Account = ({ navigation, setSetting, user, setUser}) => {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@storage_token');
      await AsyncStorage.removeItem('@storage_setting');
      setUser(null)
      setSetting(null)
    } catch(error) {
      console.log("logout", error)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
      <LinearGradientBackground></LinearGradientBackground>
      <View style={styles.container}>
        <View>
          <Image style={styles.image}
            source={{
                uri: user.avatar ? user.avatar 
                : 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg'
            }}
          />
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.roleText}>{user.username}</Text>
        </View>
        <View style={styles.groupButton}>
          <OptionButton
            icon="person"
            rgb="248, 115, 40"
            title="Personal"
            onPress={() => navigation.navigate('Personal')}
          />
          <OptionButton
            icon="key"
            rgb="50, 179, 252"
            title="Change Password"
            onPress={() => navigation.navigate('Change Password')}
          />
          <OptionButton
            icon="settings-sharp"
            rgb="156, 81, 252"
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
          <OptionButton
            icon="exit"
            rgb="234, 80, 117"
            title="Logout"
            onPress={handleLogout}
          />
        </View>
        <View></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  image: {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize / 2,
    marginVertical: 10,
  },
  nameText: {
    fontWeight: "600",
    fontSize: 30,
    lineHeight: 38,
    color: "#2A2C5B",
    textAlign: 'center',
  },
  roleText: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 23,
    textAlign: 'center',
    color: "#19377A"
  },
  groupButton: {
    marginTop: 20
  },
})

export default Account