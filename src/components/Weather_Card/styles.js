import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: 10,
    width: width / 3.5,
    height: width / 2,
  },

  RefreshButton: {
    margin: 30,
    position: "absolute",
    alignSelf: "flex-start",
  },
  Title: {
    color: "#fff",
    margin: 15,
    fontSize: 20,
  },
});

export default styles;
