import React, { useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native';
import Tab from './Tab';

const { width } = Dimensions.get('screen');

const Tabbar = ({ state, navigation }) => {
    const [selected, setSelected] = useState('Chat');
    const { routes } = state;
    const renderColor = currentTab => (
        currentTab === selected ? '#DADFEC' : '#f2f4f8'
    );

    const handlePress = (activeTab, index) => {
        if (state.index !== index) {
            setSelected(activeTab);
            navigation.navigate(activeTab);
        }
    };

    useEffect(() => {
        //console.log(routes)
    }, [])

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {routes.map((route, index) => (
                    <Tab
                        backgroundColor={renderColor(route.name)}
                        icon={route.params.icon}
                        key={route.key}
                        tab={route}
                        onPress={() => handlePress(route.name, index)}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E2E9ED'
    },
    container: {
        width: '100%',
        backgroundColor: '#f2f4f8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 2,
    }
})

export default Tabbar