import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

const AboutModal = ({ showDialog, hideDialog, visible, setVisible }) => {
  return (
    <View>
      {/* <Button onPress={showDialog}>Show Dialog</Button> */}
      <Portal>
        <Dialog
          style={{ borderRadius: 5 }}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title style={{ color: "#B7F4D8", fontWeight: "bold" }}>
            About
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">This is simple dialog</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={{ borderRadius: 5 }}
              textColor="white"
              rounded={false}
              buttonColor="#B7F4D8"
              onPress={hideDialog}
            >
              Close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default AboutModal;
