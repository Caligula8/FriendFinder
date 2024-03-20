import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThreeDotsMenu from "../../components/ThreeDotsMenu";
import NavBar from "../../components/Navbar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import SelectPrimaryHobbiesMenu from "../../components/SelectPrimaryHobbiesMenu";

const TestScreen3 = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isHobbiesMenuOpen, setHobbiesMenuOpen] = useState(false);
  const [iconLayout, setIconLayout] = useState(null);
  const iconRef = useRef(null);

  const onOptionSelect = (value) => {
    // Handle option select logic here
    console.log("Selected option:", value);
    setMenuOpen(false);
  };

  const onTriggerPress = () => {
    if (iconRef.current) {
      iconRef.current.measure((x, y, width, height, pageX, pageY) => {
        setIconLayout({ x: pageX, y: pageY, width, height });
      });
    }
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openHobbiesMenu = () => {
    setHobbiesMenuOpen(true);
  };

  const closeHobbiesMenu = () => {
    setHobbiesMenuOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.pageContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
          <ThreeDotsMenu
            isVisible={isMenuOpen}
            onOptionSelect={onOptionSelect}
            iconLayout={iconLayout}
          />
          <TouchableOpacity
            ref={iconRef}
            onPress={onTriggerPress}
            style={styles.centerIcon}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={32}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text>TestScreen3 Content Goes Here</Text>
          {/* Button to open Hobbies Menu */}
          <TouchableOpacity onPress={openHobbiesMenu}>
            <Text style={styles.buttonText}>Open Hobbies Menu</Text>
          </TouchableOpacity>
          {/* Hobbies Menu */}
          <SelectPrimaryHobbiesMenu
            isVisible={isHobbiesMenuOpen}
            onClose={closeHobbiesMenu}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <NavBar />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 110,
    backgroundColor: "#fff",
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  centerIcon: {
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  footer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    elevation: 3,
  },
  buttonText: {
    color: "blue",
    marginTop: 20,
  },
});

export default TestScreen3;
