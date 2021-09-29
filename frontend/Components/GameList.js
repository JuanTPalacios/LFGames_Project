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
import { addGame, gameSelector, getMyGameInfo } from "../redux/GameSlice";
import { authSelector } from "../redux/AuthSlice";
import { fetchUserByToken } from "../redux/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GameList = ({ games, title, navigation, token }) => {
  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage } = useSelector(authSelector);
  const { isMessage } = useSelector(gameSelector);

  // useEffect(() => {
  //   fetchUserInfo()
  // })
  // const fetchUserInfo = async () => {

  // };

  const addGameToList = async (game) => {
    try {
      const userToken = dispatch(
        fetchUserByToken({ token: await AsyncStorage.getItem("token") })
      );
      if (userToken) {
        const token = userToken.arg.token;
        const data = dispatch(addGame({ game, token }));
        if (data) {
          dispatch(getMyGameInfo(token));
        }
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
      <Text style={styles.error}>{isMessage}</Text>
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
  error: {
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default GameList;
