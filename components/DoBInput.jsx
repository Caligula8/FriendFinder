import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const DoBInput = ({ setStatValue }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleTextChanged = (text, setValueFunction) => {
    setValueFunction(text);
    setStatValue(`${day}/${month}/${year}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="DD"
          keyboardType="numeric"
          maxLength={2}
          value={day}
          onChangeText={(text) => handleTextChanged(text, setDay)}
        />
        <Text style={styles.separator}>/</Text>
        <TextInput
          style={styles.input}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
          value={month}
          onChangeText={(text) => handleTextChanged(text, setMonth)}
        />
        <Text style={styles.separator}>/</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY"
          keyboardType="numeric"
          maxLength={4}
          value={year}
          onChangeText={(text) => handleTextChanged(text, setYear)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    paddingLeft: 10,
  },
  separator: {
    alignSelf: "center",
    fontSize: 20,
    marginHorizontal: 5,
  },
});

export default DoBInput;
