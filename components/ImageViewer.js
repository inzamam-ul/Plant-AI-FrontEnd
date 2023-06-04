import { Image, StyleSheet, View } from "react-native";

export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  predicting,
}) {
  const imageSource =
    selectedImage !== undefined
      ? { uri: selectedImage }
      : placeholderImageSource;

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 380,
    // borderRadius: 18,
    borderWidth: 5,
    borderColor: "#B7F4D8",
    boxSizing: "border-box",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
