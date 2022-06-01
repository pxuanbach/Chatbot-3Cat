import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList, Dimensions, SafeAreaView } from 'react-native';
import ChatItem from './ChatItem';

const { width } = Dimensions.get('screen');

const ChatList = ({ messages }) => {
    let messagesEndRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            messagesEndRef.scrollToEnd({ animated: true })
        }, messages.length * 30)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={messages}
                renderItem={({ item }) => <ChatItem message={item} />}
                ref={(ref) => {
                    messagesEndRef = ref;
                }}
            />
            <View></View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
    },
})

export default ChatList