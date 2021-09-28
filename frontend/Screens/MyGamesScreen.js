import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { gameSelector, gameSlice, getGameInfo } from "../redux/GameSlice";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import GameShow from "../Components/GameShow";
import { authSelector } from "../redux/AuthSlice";
import { useNavigation } from "@react-navigation/native";
import { addGame } from "../redux/GameSlice";
import { AntDesign } from "react-native-vector-icons";

const MyGamesScreen = () => {
  const { games } = useSelector(gameSelector);
  const { token } = useSelector(authSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [myGames, setMyGames] = useState([]);
  console.log("gggg", games);
  console.log();
  const addGameToList = (game, token) => {
    console.log("GAMELIST", token);
    dispatch(addGame(game, token));
  };

  return (
    <SafeAreaView style={styles.container}>
      {games.length < 1 ? (
        <View style={styles.center}>
          <Text style={styles.title}> No Games Yet</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#f6f6f6",
              padding: 20,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text> Go To Games</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <Image
                  style={styles.imageStyle}
                  source={{
                    uri: item.cover.url,
                  }}
                ></Image>
                <View style={styles.center}>
                  {item.name.length > 25 ? (
                    <Text style={styles.title}>
                      {item.name.slice(0, 26).concat("...")}
                    </Text>
                  ) : (
                    <Text style={styles.title}> {item.name} </Text>
                  )}

                  <Text style={styles.text}>
                    Released:
                    {new Date(item.first_release_date * 1000).toDateString(
                      "en-US"
                    )}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 1,
                  }}
                ></View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "#555c63",
  },
  imageStyle: {
    height: 100,
    width: 75,
    marginLeft: 10,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,

    color: "white",
  },
  platform: {
    color: "peru",
    zIndex: 1,
    marginLeft: 10,
    position: "absolute",
    marginTop: 10,
    fontWeight: "bold",
    width: 200,
  },
  move: {
    width: 20,
    marginLeft: 50,
    backgroundColor: "#555c63",
    marginTop: 30,

    height: 50,
  },
  btn_style: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: 50,
  },
  center: {
    justifyContent: "center",
  },
  text: {
    marginLeft: 10,
  },
});

export default MyGamesScreen;
