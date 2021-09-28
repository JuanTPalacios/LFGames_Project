import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GameShow from "./GameShow";
import { addGame } from "../redux/GameSlice";
import { authSelector } from "../redux/AuthSlice";
import { fetchUserByToken } from "../redux/UserSlice";
import * as SecureStore from "expo-secure-store";

const GameList = ({ games, title, navigation }) => {
  const dispatch = useDispatch();
  // const { isSuccess, isError, errorMessage, token } = useSelector(authSelector);

  const addGameToList = (game, token) => {
    console.log('GAMELIST', token)
    dispatch(addGame(game, token));
  };
  const [token, setToken] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const token1 = dispatch(
        fetchUserByToken({ token: await SecureStore.getItemAsync("token") })
      );
      if (token1) {
        console.log("token", token);
        setToken(token1.arg.token);
        // AsyncStorage.clear();
      }
    } catch (err) {
      console.log("errror token app", err.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={games}
        keyExtractor={(game, index) => "A" + index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { id: item.id })}
            >
              <GameShow
                navigation={navigation}
                game={item}
                addGameToList={addGameToList}
                token={token}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default GameList;
