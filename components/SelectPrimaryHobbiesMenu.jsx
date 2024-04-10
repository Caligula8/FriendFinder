import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import HobbySelect from "./HobbySelect";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";
import { Ionicons } from "@expo/vector-icons";
import { updateDoc, doc } from "firebase/firestore"; // If you're updating Firestore
import { firestoreDB } from "../config/firebase.config"; // If you're updating Firestore

const SelectPrimaryHobbiesMenu = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userHobbies = user.hobbies || [];
  const [selectedHobbies, setSelectedHobbies] = useState(
    user.primaryHobbies || []
  );

  useEffect(() => {
    setSelectedHobbies(user.primaryHobbies || []);
  }, [user.primaryHobbies]);

  const handleHobbySelect = (hobby, isSelected) => {
    if (isSelected) {
      if (selectedHobbies.length < 3) {
        setSelectedHobbies([...selectedHobbies, hobby]);
      }
    } else {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    }
  };

  const handleClose = async () => {
    // Optionally, update primaryHobbies in Firebase
    const userRef = doc(firestoreDB, "users", user._id);
    await updateDoc(userRef, { primaryHobbies: selectedHobbies });

    // Dispatch the action to update Redux store
    dispatch(SET_USER({ ...user, primaryHobbies: selectedHobbies }));

    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={32} color="black" />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.menuTitle}>Select Your Primary Hobbies</Text>
              <Text style={styles.menuSubTitle}>Select Up To 3</Text>
            </View>
            <View style={styles.hobbiesContainer}>
              {userHobbies.map((hobby, index) => (
                <HobbySelect
                  key={index}
                  HobbyName={hobby}
                  onSelect={(isSelected) =>
                    handleHobbySelect(hobby, isSelected)
                  }
                  isSelected={selectedHobbies.includes(hobby)}
                />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    width: "90%",
    maxHeight: "80%",
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "90%",
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E24E59",
  },
  menuSubTitle: {
    fontSize: 18,
    color: "#8D8D8D",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  hobbiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
});

export default SelectPrimaryHobbiesMenu;
