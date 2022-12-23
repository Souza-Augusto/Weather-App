import React from "react";
import { ActivityIndicator } from "react-native";
import styles from "./styles";

export default function Loading() {
  return <ActivityIndicator size="large" animating style={styles.Container} />;
}
