import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList, Dimensions, SafeAreaView } from 'react-native';
import ChatItem from './ChatItem';

const { width } = Dimensions.get('screen');

const ChatList = ({ messages }) => {
    let messagesEndRef = useRef(null)

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={(item, index) => index}
                data={messages}
                renderItem={({ item }) => <ChatItem message={item}/>}
                ref={messagesEndRef}
                onContentSizeChange={() => {
                    messagesEndRef.current.scrollToEnd({ animated: true })
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