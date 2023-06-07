import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Appbar } from "react-native-paper";
import { Text } from "react-native-paper";
const ChatHeader = ({ showDialog }) => {
  const navigation = useNavigation();
  return (
    <>
      <Appbar.Header type="small">
        <Appbar.Action
          icon="chevron-left"
          color="#A7F9A8"
          size={40}
          marginLeft={-20}
          onPress={() => navigation.navigate("Home")}
        />

        <Text
          style={{
            fontWeight: 800,
            fontSize: 30,
            color: "#A7F9A8",
            marginLeft: -30,
          }}
        >
          Consult with AI
        </Text>
        <Appbar.Content />

        <Appbar.Action
          color="#A7F9A8"
          size={40}
          icon="dots-vertical"
          onPress={showDialog}
        />
      </Appbar.Header>
    </>
  );
};

export default ChatHeader;
