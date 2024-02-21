import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import NavBar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const TestScreen2 = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const hobbiesCollection = collection(firestoreDB, "hobbies");
        const hobbiesSnapshot = await getDocs(hobbiesCollection);

        // Organize hobbies by category
        const categoriesData = {};

        hobbiesSnapshot.forEach((hobbyDoc) => {
          const hobbyData = hobbyDoc.data();
          const categoryName = hobbyData.category;

          if (!categoriesData[categoryName]) {
            categoriesData[categoryName] = {
              name: categoryName,
              hobbies: [],
            };
          }

          categoriesData[categoryName].hobbies.push({
            id: hobbyDoc.id,
            name: hobbyDoc.id,
          });
        });

        // Define desired category order
        const desiredOrder = [
          "Sports and Fitness",
          "Technology and Gaming",
          "Nature and Science",
          "Music and Performance",
          "Crafting Hobbies",
          "Collecting Hobbies",
          "Culinary Hobbies",
          "General Hobbies",
        ];

        // Sort categories based on the defined order
        const sortedCategories = desiredOrder.map(
          (categoryName) => categoriesData[categoryName]
        );

        // Convert object to array
        const categoriesArray = sortedCategories.filter(Boolean);

        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    };

    // Call the function
    fetchHobbies();
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
                  {category.hobbies.map((hobby) => (
                    <Text key={hobby.id} style={styles.hobbyName}>
                      {hobby.name}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer & Navbar */}
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
