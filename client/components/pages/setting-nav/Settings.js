import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
import { Slider } from 'react-native-elements';
import CustomCheckBox from './CustomCheckBox';

const Settings = () => {
  const [checkPronounce, setPronounce] = React.useState(false);
  const [checkRecord, setRecord] = React.useState(false);
  const [checkNoti, setNoti] = React.useState(false);
  const [sliderValue, setSliderValue] = React.useState(70);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FFFFFF' }}>
      <SafeAreaView style={{ flex: 1, alignItems: 'flex-start', justifyContent: "flex-start" }}>
        <Text style={styles.title}>Music</Text>
        <View style={styles.checkboxContainer}>
          <CustomCheckBox
            onPress={() => setPronounce(!checkPronounce)}
            title="Always pronounce feedback"
            isChecked={checkPronounce}
          />
          <CustomCheckBox
            onPress={() => setRecord(!checkRecord)}
            title="Allow voice recording"
            isChecked={checkRecord}
          />
          <CustomCheckBox
            onPress={() => setNoti(!checkNoti)}
            title="Get notifications"
            isChecked={checkNoti}
          />
        </View>
      </SafeAreaView>
      <View style={{ flex: 1, alignItems: "flex-start", justifyContent: "flex-start" }}>
        <Text style={styles.title}>Speaking Speed</Text>
        <Slider
          style={{ width: 300, height: 20 }}
          minimumValue={0}
          maximumValue={100}
          maximumTrackTintColor="#D0CECF"
          minimumTrackTintColor="#32B3FC"
          value={sliderValue}
          onValueChange={(sliderValue => setSliderValue(sliderValue))}
          thumbTintColor='white'
          thumbStyle={styles.thumb} />
        <Text
          style={styles.content}
        >
         {sliderValue.toFixed()}
        </Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    justifyContent: "flex-start",
    color: '#19377A',
    fontWeight: '500',
    fontSize: 20,
    marginVertical: 20,
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: 'lightgray',
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
  }
});

export default Settings