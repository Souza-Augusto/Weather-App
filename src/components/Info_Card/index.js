import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function Info_Card({ title, value, darkTheme }) {
  return (
    <View style={styles.Container}>
      <Text style={[styles.Title, !darkTheme && { color: "#000" }]}>
        {title}
      </Text>
      <Text
        style={[
          styles.Title,
          darkTheme ? { color: "#d3d3d3" } : { color: "#404143" },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}
