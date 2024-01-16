import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  backButtonContainer: {
    marginLeft: 12,
    position: "absolute",
    top: 40,
  },
  titleContainer: {
    flexDirection: "column",
    marginLeft: 28,
    position: "absolute",
    top: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E24E59",
  },
  bodyContainer: {
    width: "100%",
    padding: 12,
  },
});
