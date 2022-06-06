import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const LinearGradientBackground = () => {
  return (
    //179.86deg, rgba(187, 226, 248, 0.87) 0.01%, rgba(255, 255, 255, 0.78) 35.2%
    <SafeAreaView>
      <LinearGradient 
      colors={['rgba(187, 226, 248, 0.87)', 'rgba(255, 255, 255, 0.78)']}
      style={styles.background}>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 480,
  },
});

export default LinearGradientBackground