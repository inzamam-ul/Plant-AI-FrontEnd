import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import AboutModal from "./AboutModal";
import ImageViewer from "./ImageViewer";
import HomeHeader from "../navigation/HomeHeader";

const PlaceholderImage = require("../assets/plant.gif");

const HomeScreenComponent = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  React.useEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader showDialog={showDialog} />,
    });
  }, [navigation]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    } else {
      alert("You did not select any image.");
    }
  };

  const predictImage = async () => {
    const data = new FormData();
    data.append("file", {
      uri:
        Platform.OS === "ios"
          ? selectedImage.uri.replace("file://", "")
          : selectedImage.uri,
      name: "UploadedImage",
      type: "image/jpg",
    });
    // console.log(data);
    const res = await fetch("http://172.18.64.74:5000/predict", {
      method: "POST",
      body: data,
      // body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const prediction = await res.text();
    setPrediction(prediction);
  };
  const clearPrediction = () => {
    setPrediction(null);
    setSelectedImage(null);
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            marginBottom: 20,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "#A7F9A8",
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            Revolutionizing Plant Care
          </Text>
          <Text>
            To make prediction more precise please upload a clear, bright photo
            of the affected leaf or branch.
          </Text>
        </View>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage?.uri}
          predicting={true}
        />
      </View>
      <View
        style={{
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {!prediction && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: selectedImage ? "center" : "space-between",
              alignItems: "center",
              width: "100%",
              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            {selectedImage ? (
              <Button
                style={{
                  marginTop: 20,
                  borderRadius: 8,
                  padding: 6,
                  backgroundColor: "#A7F9A8",
                }}
                mode="contained"
                onPress={predictImage}
              >
                <Text style={{ fontSize: 18 }}>PREDICT DISEASE</Text>
              </Button>
            ) : (
              <>
                <Button
                  style={{
                    marginTop: 20,
                    borderRadius: 8,
                    padding: 6,
                    backgroundColor: "#A7F9A8",
                  }}
                  mode="contained"
                  onPress={pickImageAsync}
                >
                  <Text style={{ fontSize: 18 }}>Gallery</Text>
                </Button>
                <Button
                  style={{
                    marginTop: 20,
                    borderRadius: 8,
                    padding: 6,
                    backgroundColor: "#A7F9A8",
                  }}
                  mode="contained"
                  onPress={pickImageAsync}
                >
                  <Text style={{ fontSize: 18 }}>SCAN IMAGE</Text>
                </Button>
              </>
            )}
          </View>
        )}
        {prediction && (
          <Button
            style={{
              marginTop: 20,
              borderRadius: 8,
              padding: 6,
              backgroundColor: "#A7F9A8",
            }}
            mode="contained"
            onPress={clearPrediction}
          >
            <Text style={{ fontSize: 18, textTransform: "uppercase" }}>
              Clear Prediction
            </Text>
          </Button>
        )}
      </View>
      {prediction && (
        <View style={{ position: "relative", marginTop: 30, marginBottom: 30 }}>
          <Text
            style={{
              position: "absolute",
              top: -18,
              left: 12,
              backgroundColor: "#A7F9A8",
              zIndex: 1,
              padding: 6,
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 17,
              borderRadius: 20,
              color: "white",
              fontWeight: 600,
            }}
          >
            Prediction:
          </Text>
          <Text
            selectable
            style={{
              borderColor: "#A7F9A8",
              borderWidth: 4,
              padding: 15,
              paddingTop: 30,
              borderRadius: 10,
              fontSize: 15,
            }}
          >
            {prediction}
          </Text>
        </View>
      )}
      <AboutModal
        showDialog={showDialog}
        hideDialog={hideDialog}
        visible={visible}
        setVisible={setVisible}
      />
    </ScrollView>
  );
};

export default HomeScreenComponent;
