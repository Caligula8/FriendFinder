import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HobbyButton from "./HobbyButton"; // Import the HobbyButton component

const SuggestedProfile = ({
  displayName,
  hobbies,
  onPressMessage,
  onPressNextUser,
  onPressProfile,
}) => {
  const MAX_DISPLAYED_HOBBIES = 14;
  return (
    <View style={styles.profileBox}>
      <TouchableWithoutFeedback onPress={onPressProfile}>
        <Text style={styles.displayNameText}>{displayName}</Text>
      </TouchableWithoutFeedback>

      {hobbies && hobbies.length > 0 && (
        <View style={styles.hobbiesContainer}>
          {hobbies.slice(0, MAX_DISPLAYED_HOBBIES).map((hobby, index) => (
            <HobbyButton key={index} HobbyName={hobby} />
          ))}
          {hobbies.length > MAX_DISPLAYED_HOBBIES && (
            <View style={styles.moreHobbiesTextContainer}>
              <Text style={styles.moreHobbiesText}>
                +{hobbies.length - MAX_DISPLAYED_HOBBIES} more
              </Text>
            </View>
          )}
        </View>
      )}

      {(!hobbies || hobbies.length === 0) && (
        <View style={styles.noHobbiesContainer}>
          <Text style={styles.noHobbiesText}>
            Looks Like This User Doesn't Have Any Hobbies
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.circleBottomLeft}
        onPress={onPressNextUser}
      >
        <Feather name="x" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.circleBottomRight}
        onPress={onPressMessage}
      >
        <Ionicons name="chatbubbles-outline" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileBox: {
    backgroundColor: "#707070",
    width: "87%",
    height: "90%",
    marginBottom: 16,
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  displayNameText: {
    position: "absolute",
    bottom: 56,
    left: 16,
    //marginLeft: 16,
    //marginBottom: 56,
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  hobbiesContainer: {
    height: "75%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 20,
    marginHorizontal: 4,
    // borderColor: "black",
    // borderWidth: 1,
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -25,
    left: 25,
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#e24e59",
    justifyContent: "center",
    alignItems: "center",
  },
  circleBottomRight: {
    position: "absolute",
    bottom: -25,
    right: 25,
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#74A253",
    justifyContent: "center",
    alignItems: "center",
  },
  moreHobbiesTextContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginRight: 10,
  },
  moreHobbiesText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  noHobbiesContainer: {
    width: "95%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  noHobbiesText: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});

export default SuggestedProfile;
