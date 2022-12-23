import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: width / 2,
    alignItems: "center",
    margin: 10,
  },
  Title: {
    color: "#e8e8e8",
    margin: 10,
    marginLeft: 15,
    fontSize: 18,
  },
});

export default styles;
