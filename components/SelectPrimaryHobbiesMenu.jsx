import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import HobbySelect from "../components/HobbySelect";
import { updateDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";
import { Ionicons } from "@expo/vector-icons";

const SelectPrimaryHobbiesMenu = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userHobbies = user.hobbies || [];

  const [selectedHobbies, setSelectedHobbies] = useState([]);

  useEffect(() => {
    // Initialize menu with user's primaryHobbies
    setSelectedHobbies(user.primaryHobbies || []);
  }, [user.primaryHobbies]);

  if (!isVisible) {
    return null;
  }

  const handleHobbySelect = (hobby, isSelected) => {
    if (isSelected) {
      //check if the limit is reached
      if (selectedHobbies.length < 3) {
        setSelectedHobbies((prevHobbies) => [...prevHobbies, hobby]);
      }
    } else {
      // If deselecting hobby, remove from the list
      setSelectedHobbies((prevHobbies) =>
        prevHobbies.filter((h) => h !== hobby)
      );
    }
  };

  const handleClose = () => {
    // Update primaryHobbies in Firebase
    const userRef = doc(firestoreDB, "users", user._id);
    updateDoc(userRef, { primaryHobbies: selectedHobbies });

    // Dispatch the action to update Redux store
    dispatch(SET_USER({ ...user, primaryHobbies: selectedHobbies }));

    onClose();
  };

  return (
    <View style={ggg.menuContainer}>
      <ScrollView>
        {/* Header */}
        <View style={ggg.header}>
          <Text style={ggg.menuTitle}>Select Your Primary Hobbies</Text>
          <Text style={ggg.menuSubTitle}>Select Up To 3</Text>
        </View>

        {/* Close button */}
        <TouchableOpacity onPress={handleClose} style={ggg.closeButton}>
          <Ionicons name="close" size={32} color="black" />
        </TouchableOpacity>

        {/* Content*/}
        <View style={ggg.hobbiesContainer}>
          {userHobbies.map((hobby, index) => (
            <HobbySelect
              key={index}
              HobbyName={hobby}
              onSelect={(isSelected) => handleHobbySelect(hobby, isSelected)}
              isSelected={selectedHobbies.includes(hobby)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const ggg = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "black",
    zIndex: 2,
    width: "90%",
    alignSelf: "center",
    height: "88%",
  },
  header: {
    width: "80%",
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E24E59",
  },
  menuSubTitle: {
    fontSize: 18,
    //fontWeight: "bold",
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
    marginTop: 10,
  },
});

export default SelectPrimaryHobbiesMenu;
