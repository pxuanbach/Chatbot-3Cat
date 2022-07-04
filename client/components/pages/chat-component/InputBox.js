import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Speech from "expo-speech";
import { SettingContext } from "../../../SettingContext";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import axiosInstance from "../../../AxiosInstance";

const InputBox = ({ user, setMessages }) => {
  const { setting } = useContext(SettingContext);
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState();

  const speak = (text) => {
    const options = {
      voice: setting?.voice.identifier,
      pitch: 1.0,
      rate: (Number.parseFloat(setting.rate) / 100).toFixed(2),
    };
    if (setting.isCheck === "true") {
      Speech.speak(text, options);
    }
  };

  const handleSendMessage = () => {
    if (message !== "") {
      axiosInstance
        .post(
          "/message",
          JSON.stringify({
            content: message,
            userId: user._id,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          if (response.data.message) {
            setMessages((preMessages) => [
              ...preMessages,
              response.data.message,
            ]);
            setMessage("");
          }
          setTimeout(() => {
            const botMess = response.data.botMessage;
            if (botMess) {
              //console.log(botMess)
              setMessages((preMessages) => [...preMessages, botMess]);
              speak(botMess.content);
            }
          }, 500);
        })
        .catch((err) => {
          console.log("Send message err", err.response.data.error);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ width: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => speak("Hello")}>
            <View style={styles.buttonContainer}>
              {recording ? (
                <SimpleLineIcons
                  name="control-pause"
                  size={24}
                  color="#7046E7"
                />
              ) : (
                <SimpleLineIcons name="microphone" size={24} color="#7046E7" />
              )}
            </View>
          </TouchableOpacity>
          <TextInput
            placeholder={"Type a message"}
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <View style={styles.buttonContainer}>
              <Octicons name="paper-airplane" size={24} color="#7046E7" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    margin: 10,
    marginTop: 5,
  },
  mainContainer: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    marginHorizontal: 10,
    padding: 5,
    flex: 1,
    alignItems: "center",
    borderColor: "#E2DBDB",
    borderWidth: 1,
  },
  buttonContainer: {
    backgroundColor: "#DADFEC",
    borderRadius: 25,
    padding: 10,
    fontSize: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 10,
    maxHeight: 86,
  },
});

export default InputBox;
