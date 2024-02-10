// ThreeDotsMenu.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const ThreeDotsMenu = ({ isVisible, onOptionSelect, iconLayout }) => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const onSelect = (value) => {
    onOptionSelect(value);
  };

  useEffect(() => {
    if (isVisible && iconLayout) {
      const menuTop = iconLayout.y + iconLayout.height - 20;
      const menuLeft = iconLayout.x + iconLayout.width - 150;

      setMenuPosition({ top: menuTop, left: menuLeft });
    }
  }, [isVisible, iconLayout]);

  return (
    isVisible && (
      <View
        style={[
          styles.menuContainer,
          { top: menuPosition.top, left: menuPosition.left },
        ]}
      >
        <TouchableOpacity
          onPress={() => onSelect(1)}
          style={styles.menuOption2}
        >
          <Entypo name="block" size={22} color="black" />
          <Text style={styles.menuText2}>Block User</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelect(2)} style={styles.menuOption}>
          <MaterialIcons name="report-gmailerrorred" size={28} color="black" />
          <Text style={styles.menuText}>Report User</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelect(3)} style={styles.menuOption}>
          <MaterialIcons name="person-outline" size={28} color="black" />
          <Text style={styles.menuText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelect(4)} style={styles.menuOption}>
          <Ionicons name="trash-outline" size={26} color="black" />
          <Text style={styles.menuText}>Delete Post</Text>
        </TouchableOpacity>
      </View>
    )
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
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuOption2: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginLeft: 3,
  },
  menuText: {
    marginLeft: 10,
  },
  menuText2: {
    marginLeft: 11,
  },
});

export default ThreeDotsMenu;
