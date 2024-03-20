import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import NavBar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const TestScreen2 = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndHobbies = async () => {
      try {
        const categoriesCollectionRef = collection(firestoreDB, "categories");
        const querySnapshot = await getDocs(categoriesCollectionRef);

        const categoriesList = querySnapshot.docs.map((doc) => ({
          name: doc.id,
          hobbies: doc.data().hobbies.map((hobby) => ({ name: hobby })),
        }));

        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching categories and hobbies:", error);
      }
    };

    fetchCategoriesAndHobbies();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          {categories.map((category) => (
            <View key={category.name} style={styles.categoryContainer}>
              <Text style={styles.categoryName}>{category.name}</Text>
              {category.hobbies && category.hobbies.length > 0 && (
                <View style={styles.hobbiesContainer}>
                  {category.hobbies.map((hobby, index) => (
                    <Text
                      key={`${category.name}-${index}`}
                      style={styles.hobbyName}
                    >
                      {hobby.name}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  hobbiesContainer: {
    marginLeft: 20,
  },
  hobbyName: {
    fontSize: 16,
    color: "#555",
  },
  footer: {
    width: "100%",
  },
});

export default TestScreen2;
