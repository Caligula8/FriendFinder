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
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firestoreDB, firebaseAuth } from "../../config/firebase.config";

const Register3 = () => {
  const navigation = useNavigation();
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const isSelectionValid =
    selectedHobbies.length >= 5 && selectedHobbies.length <= 20;
  const [isValidColor, setIsValidColor] = useState("#8D8D8D");

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
      setIsValidColor("#e24e59");
      setTimeout(() => {
        setIsValidColor("#8D8D8D");
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>I Am Interested In...</Text>
          <Text style={styles.stepText}>Step 3/3</Text>
        </View>
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
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <ContinueButton onPress={handleContinue} buttonText="Continue" />
        </View>
        <View style={styles.selectionInfo}>
          <Text style={{ color: isValidColor }}>
            {isSelectionValid
              ? `${selectedHobbies.length} Hobbies Selected`
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
