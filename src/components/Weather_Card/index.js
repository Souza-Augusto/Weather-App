import React from "react";
import { View, Text } from "react-native";
import { Feather, Fontisto } from "@expo/vector-icons";
import styles from "./styles";

export default function Weather_Card({
  darkTheme,
  title,
  backgroundColor,
  temperature,
  icon,
}) {
  function chooseIcon() {
    switch (icon) {
      case 0:
        return (
          <Feather name="sun" size={55} color={darkTheme ? "#fff" : "#000"} />
        );
      case 1:
        return (
          <Fontisto
            name="day-cloudy"
            size={50}
            color={darkTheme ? "#fff" : "#000"}
          />
        );
      case 2:
        return (
          <Feather
            name="cloud-rain"
            size={55}
            color={darkTheme ? "#fff" : "#000"}
          />
        );

      default:
        break;
    }
  }

  return (
    <View style={[styles.Container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.Title, !darkTheme && { color: "#000" }]}>
        {title}
      </Text>
      {chooseIcon()}
      <Text style={[styles.Title, !darkTheme && { color: "#000" }]}>
        {temperature}
      </Text>
    </View>
  );
}
