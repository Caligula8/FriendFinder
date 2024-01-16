import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import HobbySelect from "./HobbySelect";
import { FontAwesome } from "@expo/vector-icons";

const Accordion = ({ title, hobbies }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
        <Text style={styles.title}>{title}</Text>
        {/*Chevron Icon*/}
        <FontAwesome
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.buttonList}>
          {hobbies.map((hobby, index) => (
            <HobbySelect key={index} HobbyName={hobby} />
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
    backgroundColor: "#fff",
    borderWidth: 1,
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
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
});

export default Accordion;
