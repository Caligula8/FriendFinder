import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HobbySelect from "./HobbySelect";
import { useSelector, useDispatch } from "react-redux";
import { SET_SELECTED_HOBBY } from "../context/actions/userActions";

const ProfileFilter = ({ isVisible, onClose, userHobbies }) => {
  if (!isVisible) {
    return null;
  }

  const dispatch = useDispatch();
  const selectedHobby = useSelector((state) => state.user.selectedHobby);

  const handleHobbySelect = (hobby) => {
    dispatch(SET_SELECTED_HOBBY(selectedHobby === hobby ? "" : hobby));
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Filter by Hobby</Text>
              <Text style={styles.subTitle}>Only Suggest People Who Like</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={32} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.hobbiesContainer}
              contentContainerStyle={styles.hobbiesContentContainer}
            >
              {userHobbies.map((hobby, index) => (
                <HobbySelect
                  key={index}
                  HobbyName={hobby}
                  onSelect={() => handleHobbySelect(hobby)}
                  isSelected={selectedHobby === hobby}
                />
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    width: "90%",
    maxHeight: "88%",
    zIndex: 2,
  },
  header: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E24E59",
  },
  subTitle: {
    fontSize: 18,
    color: "#8D8D8D",
  },
  closeButton: {
    position: "absolute",
    right: 2,
    top: 0,
  },
  hobbiesContainer: {
    marginVertical: 10,
  },
  hobbiesContentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});

export default ProfileFilter;
