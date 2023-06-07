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
          <Dialog.Title style={{ color: "#000", fontWeight: "bold" }}>
            About
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              The project develops a mobile-based system for automated plant
              disease diagnosis using computer vision and machine learning. Its
              goal is to provide farmers with an efficient tool for managing
              crop diseases and optimizing agricultural practices.
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <Text style={{ color: "red" }} variant="bodyMedium">
                Developed By:{" "}
              </Text>
              <Text variant="bodyMedium">Md Inzamamul Haque</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              style={{ borderRadius: 5 }}
              textColor="white"
              rounded={false}
              buttonColor="#A7F9A8"
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
