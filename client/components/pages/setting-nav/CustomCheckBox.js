import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CheckBox = (props) => {
	const iconName = props.isChecked ?
		"checkbox-marked" : "checkbox-blank-outline";

	return (
		<View style={styles.container}>
			<Pressable onPress={props.onPress}>
				<MaterialCommunityIcons
					name={iconName} size={24} color="lightblue"/>
			</Pressable>
			<Text style={styles.title}>{props.title}</Text>
		</View>
	);
};

export default CheckBox;

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		width: 300,
		marginHorizontal: 0,
		marginVertical: 15,
	},
	title: {
		fontSize: 18,
		color: "#19377A",
		marginLeft: 5,
		fontWeight: "400",
	},
	
});
