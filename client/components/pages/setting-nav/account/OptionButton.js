import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OptionButton = ({ icon, rgb, title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}
            style={[styles.container, { backgroundColor: `rgba(${rgb}, 0.2)` }]}>
            <Ionicons
                name={icon}
                size={24}
                color={`rgba(${rgb}, 1)`}
            />
            <Text
                numberOfLines={1}
                style={[styles.title, { color: `rgba(${rgb}, 1)` }]}>
                {title}
            </Text>
            <Ionicons 
                name="caret-forward-sharp"
                size={24}
                color={`rgba(${rgb}, 1)`}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        minWidth: 308,
        marginVertical: 10
    },
    title: {
        marginLeft: 20,
        marginRight: 10,
        minWidth: 200,
        maxWidth: 200,
        fontSize: 20,
        fontWeight: '600'
    }
})

export default OptionButton