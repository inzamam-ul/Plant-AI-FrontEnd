import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Appbar } from "react-native-paper";
import { Text } from "react-native-paper";

const HomeHeader = ({ showDialog }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={{ backgroundColor: "white" }} type="small">
      <Appbar.Action size={0} onPress={() => navigation.navigate("Home")} />
      <Text style={{ fontWeight: 800, fontSize: 30, color: "#A7F9A8" }}>
        Plant AI
      </Text>
      <Appbar.Content></Appbar.Content>
      <Appbar.Action
        icon="chat"
        color="#A7F9A8"
        size={40}
        onPress={() => navigation.navigate("Chat")}
      />
      <Appbar.Action
        color="#A7F9A8"
        icon="dots-vertical"
        size={40}
        onPress={showDialog}
      />
    </Appbar.Header>
  );
};

export default HomeHeader;
