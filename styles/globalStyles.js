import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    height: 110,
  },
  backButtonContainer: {
    marginLeft: 16,
    position: "absolute",
    top: 35,
  },
  titleContainer: {
    flexDirection: "column",
    marginLeft: 24,
    position: "absolute",
    top: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E24E59",
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8D8D8D",
  },
  contentContainer: {
    flex: 1,
  },
  subContentContainer: {
    flex: 1,
    marginHorizontal: 24,
    marginTop: 12,
    justifyContent: "flex-start",
  },
  suggestedProfileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
  },
});
