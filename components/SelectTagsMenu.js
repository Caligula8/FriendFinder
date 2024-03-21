import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HobbySelect from "./HobbySelect";

const SelectTagsMenu = ({
  isVisible,
  onClose,
  onTagsSelected,
  userHobbies,
  initialSelectedTags,
  categoryName,
}) => {
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags || []);

  useEffect(() => {
    if (!initialSelectedTags.includes(categoryName)) {
      setSelectedTags([categoryName, ...initialSelectedTags]);
    } else {
      setSelectedTags(initialSelectedTags);
    }
  }, [userHobbies, initialSelectedTags, categoryName]);

  const handleHobbySelect = (hobby, isSelected) => {
    if (hobby === categoryName) return; // Prevents deselecting the category name

    if (isSelected) {
      if (selectedTags.length < 3) {
        setSelectedTags((prevTags) => [...prevTags, hobby]);
      }
    } else {
      setSelectedTags((prevTags) => prevTags.filter((h) => h !== hobby));
    }
  };

  const handleClose = () => {
    onTagsSelected(selectedTags);
    onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.menuContainer}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.menuTitle}>Select Tags</Text>
          <Text style={styles.menuSubTitle}>Select Up To 3 Hobbies</Text>
        </View>

        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={32} color="black" />
        </TouchableOpacity>

        <View style={styles.hobbiesContainer}>
          {userHobbies.map((hobby, index) => (
            <HobbySelect
              key={index}
              HobbyName={hobby}
              onSelect={(isSelected) => handleHobbySelect(hobby, isSelected)}
              isSelected={selectedTags.includes(hobby)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: "60%",
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

export default SelectTagsMenu;
