import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { Button } from "react-native-paper";
import AboutModal from "../components/AboutModal";
import ImageViewer from "../components/ImageViewer";
import HomeHeader from "../navigation/HomeHeader";
import { BottomNavigation } from "react-native-paper";
import HomeScreenComponent from "../components/HomeScreenComponent";
import NewsPage from "../components/NewsPage";
import ProductsPage from "../components/ProductsPage";

const PlaceholderImage = require("../assets/plant.gif");

const HomeRoute = () => <HomeScreenComponent />;

const AlbumsRoute = () => <NewsPage />;

const RecentsRoute = () => <ProductsPage />;

const NotificationsRoute = () => <Text>Coming soon......</Text>;

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Predict",
      focusedIcon: "tree",
      unfocusedIcon: "tree-outline",
    },
    {
      key: "news",
      title: "News",
      focusedIcon: "newspaper-check",
      unfocusedIcon: "newspaper",
    },
    {
      key: "shop",
      title: "Shop",
      focusedIcon: "storefront",
      unfocusedIcon: "storefront-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account-box",
      unfocusedIcon: "account-box-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    news: AlbumsRoute,
    shop: RecentsRoute,
    profile: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      variant="primary"
      barStyle={{ backgroundColor: "#A7F9A8" }}
    />
  );
};

export default HomeScreen;
