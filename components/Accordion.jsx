import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import HobbySelect from "./HobbySelect";
import { FontAwesome } from "@expo/vector-icons";

const MemoizedHobbySelect = React.memo(HobbySelect);

const Accordion = ({
  title,
  hobbies,
  isOpen,
  onPress,
  selectedHobbies,
  onHobbySelect,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        {/*Chevron Icon*/}
        <FontAwesome
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.buttonList}>
          {hobbies.map((hobby, index) => (
            <MemoizedHobbySelect
              key={index}
              HobbyName={hobby.name}
              isSelected={selectedHobbies.includes(hobby.name)}
              onSelect={(isSelected) => onHobbySelect(hobby.name, isSelected)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ccc",
    overflow: "hidden",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  buttonList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
});

export default Accordion;
