import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Slider } from "react-native-elements";
import CustomCheckBox from "./CustomCheckBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingContext } from "../../../SettingContext";

const Settings = () => {
  const { setting, setSetting } = useContext(SettingContext);
  const [checkPronounce, setPronounce] = useState(false);
  const [sliderValue, setSliderValue] = useState(10);

  const handleCheckPronounce = async () => {
    const value = !checkPronounce
    setPronounce(value)
    const curSetting = {
      "isCheck": value,
      "rate": sliderValue,
      "voice": setting.voice
    }
    await AsyncStorage.setItem('@storage_setting', JSON.stringify(curSetting))
    setSetting(curSetting) 
  }

  const handleSliderComplete = async (value) => {
    setSliderValue(value)
    const curSetting = {
      "isCheck": checkPronounce,
      "rate": value,
      "voice": setting.voice
    }
    await AsyncStorage.setItem('@storage_setting', JSON.stringify(curSetting))
    setSetting(curSetting) 
  }

  useEffect(() => {
    if (setting) {
      console.log(typeof setting.isCheck)
      setPronounce(setting.isCheck === "true")
      setSliderValue(parseInt(setting.rate))
    }
  }, [setting]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#FFFFFF",
      }}
    >
      <SafeAreaView
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Text style={styles.title}>Music</Text>
        <View style={styles.checkboxContainer}>
          <CustomCheckBox
            onPress={handleCheckPronounce}
            title="Always pronounce feedback"
            isChecked={checkPronounce}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Text style={styles.title}>Speaking Speed</Text>
        <Slider
          style={{ width: 300, height: 20 }}
          minimumValue={0}
          maximumValue={200}
          maximumTrackTintColor="#D0CECF"
          minimumTrackTintColor="#32B3FC"
          value={sliderValue}
          onSlidingComplete={async (value) => handleSliderComplete(value)}
          thumbTintColor="white"
          thumbStyle={styles.thumb}
        />
        <Text style={styles.content}>{sliderValue.toFixed()}</Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    justifyContent: "flex-start",
    color: "#19377A",
    fontWeight: "500",
    fontSize: 20,
    marginVertical: 20,
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: "lightgray",
    borderWidth: 2,
  },
  roundButton: {
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  checkboxContainer: {
    width: 300,
  },
  content: {
    fontSize: 18,
    color: "#19377A",
    marginTop: 10,
    fontWeight: "400",
  },
  shadow: {
    shadowColor: "lightblue",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

export default Settings;
