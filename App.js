import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Weather_Card, Info_Card, Loading } from "./src/components";
import * as Location from "expo-location";
import Api from "./src/services/Api";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [location, setLocation] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const hours = new Date();

  async function getWeather() {
    setLoading(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status);

    if (status !== "granted") {
      console.log("Permissão negada.");
      setLoading(false);
      return;
    }
    console.log("Permissão aceita.");
    let loc = await Location.getCurrentPositionAsync();
    setLocation(loc.coords);
    console.log("Location", location);

    const response = await Api.GetWeather(location);
    console.log("response", response);
    if (!response) {
      setLoading(false);
      return alert("Erro ao fazer a requisição dos dados");
    }
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <ScrollView>
      {loading && <Loading />}
      <View style={[styles.container, darkTheme && styles.ContainerDark]}>
        <TouchableOpacity onPress={getWeather} style={styles.RefreshButton}>
          <FontAwesome
            name="refresh"
            size={24}
            color={darkTheme ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Feather
          style={{ marginTop: 50 }}
          name="sun"
          size={55}
          color="orange"
        />
        <View style={styles.TemperatureContainer}>
          <Text style={[styles.Temperature, darkTheme && styles.DarkThemeFont]}>
            {String(parseInt(data?.main?.temp))}
          </Text>
          <Text style={[styles.Temperature, darkTheme && styles.DarkThemeFont]}>
            {" "}
            ºC
          </Text>
        </View>
        <Text
          style={[
            styles.Temperature,
            { fontSize: 14 },
            darkTheme && { color: "#fff" },
          ]}
        >
          {data?.name +
            ", " +
            data?.sys?.country +
            ", " +
            hours.getHours() +
            ":" +
            hours.getMinutes()}
        </Text>
        <View style={styles.CardContainer}>
          <ScrollView horizontal>
            <Weather_Card
              darkTheme={darkTheme}
              title="Manhã"
              temperature={String(parseInt(data?.main?.temp)) + "ºC"}
              backgroundColor={darkTheme ? "#ff843d" : "#cc6e30"}
              icon={0}
            />
            <Weather_Card
              title="Tarde"
              darkTheme={darkTheme}
              temperature={String(parseInt(data?.main?.temp_max)) + "ºC"}
              backgroundColor={darkTheme ? "#d29600" : "#fcc63f"}
              icon={1}
            />
            <Weather_Card
              title="Noite"
              darkTheme={darkTheme}
              temperature={String(parseInt(data?.main?.temp_min)) + "ºC"}
              backgroundColor={darkTheme ? "#008081" : "#378388"}
              icon={2}
            />
          </ScrollView>
        </View>
        <View
          style={[
            styles.InfoContainer,
            darkTheme && { backgroundColor: "#393e34" },
          ]}
        >
          <Text style={[styles.Info, !darkTheme && { color: "#000" }]}>
            Informações adicionais
          </Text>
          <View style={styles.InfoCardViewContainer}>
            <View style={styles.InfoCardContainer}>
              <Info_Card
                darkTheme={darkTheme}
                title="Vento"
                value={String(data?.wind?.speed) + " m/s"}
              />
              <Info_Card
                darkTheme={darkTheme}
                title="Umidade"
                value={data?.main?.humidity + "%"}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "90%",
              }}
            >
              <Info_Card
                darkTheme={darkTheme}
                title={"Temp. min."}
                value={String(parseInt(data?.main?.temp_min)) + "ºC"}
              />
              <Info_Card
                darkTheme={darkTheme}
                title={"Temp. max."}
                value={String(parseInt(data?.main?.temp_max)) + "ºC"}
              />
            </View>
          </View>
        </View>
        <View style={styles.ThemeButton}>
          <TouchableOpacity
            onPress={() => setDarkTheme((prev) => !prev)}
            style={[
              styles.SquareButton,
              darkTheme && { backgroundColor: "#f2f2f2" },
            ]}
          >
            <View
              style={[
                styles.CircleButton,
                darkTheme && {
                  backgroundColor: "#232634",
                  alignSelf: "flex-end",
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  ContainerDark: {
    backgroundColor: "#232634",
  },
  TemperatureContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  Temperature: {
    color: "#000000",
    fontSize: 50,
  },
  DarkThemeFont: {
    color: "#e0e0e0",
  },
  RefreshButton: {
    margin: 30,
    position: "absolute",
    alignSelf: "flex-start",
  },
  CardContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  InfoContainer: {
    width: width * 0.9,
    backgroundColor: "#8f8f8f",
    alignItems: "center",
    borderRadius: 20,
  },
  Info: {
    color: "#fff",
    margin: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  InfoCardContainer: {
    width: "90%",
    flexDirection: "row",
  },
  InfoCardViewContainer: {
    justifyContent: "center",
  },
  ThemeButton: {
    margin: 5,
    marginLeft: 300,
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  SquareButton: {
    backgroundColor: "#8f8f8f",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 20,
    width: 60,
    height: 30,
  },
  CircleButton: {
    backgroundColor: "#f2f2f2",
    margin: 5,
    width: 25,
    height: 25,
    borderRadius: 13,
  },
});
