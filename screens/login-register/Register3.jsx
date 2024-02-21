import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Accordion from "../../components/Accordion";
import ContinueButton from "../../components/ContinueButton";
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";
import { firestoreDB, firebaseAuth } from "../../config/firebase.config";

const Register3 = () => {
  const navigation = useNavigation();
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const isSelectionValid =
    selectedHobbies.length >= 5 && selectedHobbies.length <= 20;
  const [isValidColor, setIsValidColor] = useState("#8D8D8D");

  const handleAccordionPress = (index) => {
    setOpenAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleHobbySelect = (hobby, isSelected) => {
    setSelectedHobbies((prevHobbies) => {
      if (isSelected) {
        return [...prevHobbies, hobby];
      } else {
        return prevHobbies.filter((h) => h !== hobby);
      }
    });
  };

  const handleContinue = async () => {
    if (isSelectionValid) {
      try {
        const userUID = firebaseAuth.currentUser.uid;
        const userRef = doc(firestoreDB, "users", userUID);

        const data = {
          hobbies: selectedHobbies,
        };

        await updateDoc(userRef, data);
        navigation.replace("Home");
      } catch (error) {
        console.error("Error updating user document (Register3): ", error);
      }
    } else {
      // Change the instructions color to red for 3 seconds
      setIsValidColor("#e24e59");
      setTimeout(() => {
        setIsValidColor("#8D8D8D");
      }, 3000);
    }
  };

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

        console.log("Completed List:", categoriesData);
        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    };

    fetchHobbies();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register2")}>
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
        {/* Header */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>I Am Interested In...</Text>
          <Text style={styles.stepText}>Step 3/3</Text>
        </View>
        {/* Accordions */}
        <View style={styles.accordionContainer}>
          {categories.map((data, index) => (
            <Accordion
              key={index}
              title={data.name}
              hobbies={data.hobbies}
              isOpen={index === openAccordionIndex}
              onPress={() => handleAccordionPress(index)}
              selectedHobbies={selectedHobbies}
              onHobbySelect={(hobby, isSelected) =>
                handleHobbySelect(hobby, isSelected)
              }
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer & Continue Button */}
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <ContinueButton onPress={handleContinue} buttonText="Continue" />
        </View>
        {/* Selection Counter and Message */}
        <View style={styles.selectionInfo}>
          <Text style={{ color: isValidColor }}>
            {isSelectionValid
              ? `Selected ${selectedHobbies.length} out of 20`
              : "Please select between 5 and 20 hobbies"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  accordionContainer: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 80,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    marginLeft: 16,
    marginTop: 4,
  },
  stepText: {
    color: "#e24e59",
    fontSize: 13,
    marginRight: 16,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 108,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 60,
  },
  selectionInfo: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
  },
});

export default Register3;
