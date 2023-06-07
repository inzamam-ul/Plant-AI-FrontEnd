import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Card, Title, Text, Paragraph, Button } from "react-native-paper";
import axios from "axios";

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);
  const apiKey = "sk-GvAQ647e056462bd11160";
  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "https://perenual.com/api/species-list?key=sk-GvAQ647e056462bd11160&indoor=1"
      );
      setArticles(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderArticleItem = ({ item }) => (
    <Card style={{ marginBottom: 15 }}>
      <Card.Cover source={{ uri: item.default_image.original_url }} />
      <Card.Content style={{ marginTop: 10 }}>
        <Text variant="titleLarge">{item.scientific_name}</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Actions>
        <Button>Save</Button>
        <Button>Details</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {selectedArticle ? (
        renderWebView()
      ) : (
        <FlatList
          data={articles}
          renderItem={renderArticleItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 200,
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default NewsPage;
