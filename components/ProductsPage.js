import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
const ProductsPage = () => {
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
  const products = [
    {
      id: 1,
      title: "Product 1",
      imageSource:
        "https://perenual.com/storage/species_image/434_acalypha_wilkesiana/og/24945289366_5035e5d0a9_b.jpg",
      price: "$9.99",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Product 2",
      imageSource:
        "https://perenual.com/storage/species_image/434_acalypha_wilkesiana/og/24945289366_5035e5d0a9_b.jpg",
      price: "$14.99",
      rating: 3.8,
    },
    {
      id: 3,
      title: "Product 3",
      imageSource:
        "https://perenual.com/storage/species_image/434_acalypha_wilkesiana/og/24945289366_5035e5d0a9_b.jpg",
      price: "$19.99",
      rating: 4.2,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {articles.map((product) => (
        <View style={styles.card} key={product.id}>
          <Image
            source={{ uri: product.default_image.original_url }}
            style={styles.image}
          />
          <Text style={styles.title}>{product.scientific_name}</Text>
          <Text style={styles.price}>$19.99</Text>
          <Text style={styles.rating}>5 Stars</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: "gold",
    marginTop: 5,
  },
});

export default ProductsPage;
