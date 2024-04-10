import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Accordion from "../components/Accordion";
import ContinueButton from "../components/ContinueButton";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firestoreDB, firebaseAuth } from "../config/firebase.config";
import { useSelector, useDispatch } from "react-redux";

const ReSelectHobbiesScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [initialHobbies, setInitialHobbies] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const isSelectionValid =
    selectedHobbies.length >= 5 && selectedHobbies.length <= 20;
  const [isValidColor, setIsValidColor] = useState("#8D8D8D");

  useEffect(() => {
    const fetchUserDataAndCategories = async () => {
      try {
        const userUID = firebaseAuth.currentUser.uid;
        const userRef = doc(firestoreDB, "users", userUID);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setInitialHobbies(userData.hobbies || []);
          setSelectedHobbies(userData.hobbies || []);
        }
        const categoriesCollectionRef = collection(firestoreDB, "categories");
        const querySnapshot = await getDocs(categoriesCollectionRef);
        const categoriesList = querySnapshot.docs.map((doc) => ({
          name: doc.id,
          hobbies: doc.data().hobbies.map((hobby) => ({ name: hobby })),
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching user data and categories:", error);
      }
    };
    fetchUserDataAndCategories();
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
      setSubmitting(true);
      try {
        const userUID = firebaseAuth.currentUser.uid;
        const userRef = doc(firestoreDB, "users", userUID);

        // Update user's hobbies in their document
        await updateDoc(userRef, { hobbies: selectedHobbies });

        // Update hobbies lists in the 'discover' collection
        for (const hobby of initialHobbies) {
          if (!selectedHobbies.includes(hobby)) {
            // User removed this hobby, so remove them from the list in 'discover'
            const hobbyRef = doc(firestoreDB, "discover", hobby);
            await updateDoc(hobbyRef, {
              users: arrayRemove(userUID),
            });
          }
        }
        for (const hobby of selectedHobbies) {
          if (!initialHobbies.includes(hobby)) {
            // User added this hobby, so add them to the list in 'discover'
            const hobbyRef = doc(firestoreDB, "discover", hobby);
            await updateDoc(hobbyRef, {
              users: arrayUnion(userUID),
            });
          }
        }

        // Update user in the Redux store
        const updatedUser = { ...user, hobbies: selectedHobbies };
        dispatch({ type: "SET_USER", user: updatedUser });

        setSubmitting(false);
        navigation.goBack();
      } catch (error) {
        console.error(
          "Error updating user document (ReSelectHobbiesScreen): ",
          error
        );
        setSubmitting(false);
      }
      setSubmitting(false);
    } else {
      setIsValidColor("#e24e59");
      setTimeout(() => {
        setIsValidColor("#8D8D8D");
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Modify My Hobbies</Text>
      </View>
      {submitting ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#E24E59" />
        </View>
      ) : (
        <ScrollView style={styles.accordionScrollView}>
          <View style={styles.accordionContainer}>
            {categories.map((data, index) => (
              <Accordion
                key={index}
                title={data.name}
                hobbies={data.hobbies}
                isOpen={index === openAccordionIndex}
                onPress={() => handleAccordionPress(index)}
                selectedHobbies={selectedHobbies}
                onHobbySelect={handleHobbySelect}
              />
            ))}
          </View>
        </ScrollView>
      )}
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <ContinueButton onPress={handleContinue} buttonText="Submit" />
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
  scrollViewContent: {
    flex: 1,
    justifyContent: "center",
  },
  accordionScrollView: {
    flex: 1,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 108,
  },
});

export default ReSelectHobbiesScreen;
