import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AboutModal from "../components/AboutModal";
import ChatHeader from "../navigation/ChatHeader";

const AIAvatar = require("../assets/ai.jpeg");

const ChatScreen = () => {
  const flatListRef = useRef();
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  React.useEffect(() => {
    navigation.setOptions({
      header: () => <ChatHeader showDialog={showDialog} />,
    });
  }, [navigation]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello, how can I help you?", sender: "other" },
  ]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const handleAddResponse = async (message) => {
    try {
      let responsePlaceholder = {
        id: `${Math.random()}`,
        text: "responding...",
        sender: "others",
      };
      setMessages((prev) => [...prev, { ...responsePlaceholder }]);

      const response = await axios.post(
        "https://open-ai-chatbot-server-nine.vercel.app/chat",
        {
          message,
        }
      );
      setMessages((prev) =>
        prev.map((item) => {
          // console.log({ itemId: item.id, resId: responsePlaceholder.id });
          if (item.id === responsePlaceholder.id) {
            return { ...item, text: response.data.slice(2, -1) };
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error.message);
      setMessages((prev) => [
        ...prev,
        { id: `${Math.random()}`, text: "error occurred!!", sender: "others" },
      ]);
    }
  };

  const handleSend = async () => {
    if (message) {
      setMessages((prev) => [
        ...prev,
        { id: `${Math.random()}`, text: message, sender: "me" },
      ]);
      setTimeout(() => {
        handleAddResponse(message);
      }, 1000);
      setMessage("");
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me"
          ? styles.myMessageContainer
          : styles.otherMessageContainer,
      ]}
    >
      {item.sender !== "me" && (
        <Image source={AIAvatar} style={styles.avatar} />
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender === "me"
            ? styles.myMessageBubble
            : styles.otherMessageBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === "me"
              ? styles.myMessageText
              : styles.otherMessageText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? undefined : undefined}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messages}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
        // inverted
      />
      <View
        style={{
          ...styles.inputContainer,
          marginBottom: Platform.OS === "ios" ? 35 : 0,
        }}
      >
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#A8A8A8"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <AboutModal
        showDialog={showDialog}
        hideDialog={hideDialog}
        visible={visible}
        setVisible={setVisible}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  messages: {
    // paddingHorizontal: 10,
    // paddingBottom: 20,
  },
  messageContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
    // paddingBottom: 10,
    paddingHorizontal: 10,
  },
  myMessageContainer: {
    justifyContent: "flex-end",
    marginTop: -8,
  },
  otherMessageContainer: {
    justifyContent: "flex-start",
    marginBottom: 30,
  },
  messageBubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
    elevation: 2,
  },
  myMessageBubble: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 20,
    backgroundColor: "#007AFF",
    elevation: 3,
  },
  otherMessageBubble: {
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 5,
    marginRight: 20,
    marginBottom: -8,
    // marginTop: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#000000",
  },
  myMessageText: {
    color: "#FFFFFF",
  },
  otherMessageText: {
    color: "#000000",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: -25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#A7F9A8",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#050",
    fontSize: 16,
  },
});

export default ChatScreen;
