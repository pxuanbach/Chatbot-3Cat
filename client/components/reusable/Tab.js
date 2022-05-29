import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const Tab = ({ backgroundColor, tab, onPress, icon }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
        },
        icon: {
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 15,
            backgroundColor
        }
    })
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon && <Ionicons
                style={styles.icon}
                name={icon}
                size={26}
                color={'#6384DA'}
            />}
        </TouchableOpacity>
    )
}



export default Tab