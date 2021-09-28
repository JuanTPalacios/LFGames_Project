import React, { useEffect, useState } from "react";
import { CLIENT_ID, API_TOKEN } from "@env";
import { View, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { getGameInfo } from "../redux/FetchCalls.js/GameApi.js/GameFetch";
// import { gamepad } from "react-native-vector-icons/FontAwesome";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import GameList from "../Components/GameList";
import * as SecureStore from "expo-secure-store";
import { authSelector, clearState, signUp } from "../redux/AuthSlice";

// import { fetchUserByToken } from "../redux/UserSlice";
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);
  const { isSuccess, isError, errorMessage, token } = useSelector(authSelector);

  console.log(isSuccess);
  useEffect(() => {
    (async () => {
      if (isSuccess) {
        // clearState();ß
      }
    })();
  }, [isSuccess]);

  // useEffect(() => {
  //   getGameInfo();
  //   console.log("called useeffecr");
  // }, []);

  // const getGameInfo = async () => {
  //   const res = getGameInfo();
  //   console.log("RES", res);
  // };

  useEffect(() => {
    getInfo(
      "fields name, summary, genres.name, total_rating, first_release_date, game_modes.name, storyline, platforms.name, cover.url, cover.image_id; where release_dates.platform = (6, 48, 55, 167, 169, 49); limit 50;"
    );
    console.log("HOME CALLED FETCH");
  }, []);

  const getInfo = async (Mbody) => {
    const res = await getGameInfo(Mbody);
    setGames(res);
  };

  //GET games for platforms
  const getGamesForPlatform = async (Mbody) => {
    try {
      const response = await fetch("https://api.igdb.com/v4/" + "games", {
        method: "POST",
        headers: {
          "Client-ID": `${CLIENT_ID}`,
          Authorization: `Bearer ${API_TOKEN}`,
          "content-type": "text/plain",
        },
        body: Mbody,
      });
      const data = await response.json();
      data.map((game) => {
        if (game.cover) {
          game.cover.url = `http://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
        } else {
          game.cover = {
            url: "hi",
          };
        }
      });
      setGames(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Sets up buton on right side of header
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Menu>
            <MenuTrigger>
              <MaterialCommunityIcons
                name="controller-classic"
                size={26}
                style={styles.icon}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() =>
                  getGamesForPlatform(
                    "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 6; limit 50;"
                  )
                }
                text="PC"
              />
              <MenuOption
                onSelect={() =>
                  getGamesForPlatform(
                    "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 49; limit 50;"
                  )
                }
                text="Xbox"
              />
              <MenuOption
                onSelect={() =>
                  getGamesForPlatform(
                    "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 48; limit 50;"
                  )
                }
                text="Ps4"
              />
              <MenuOption
                onSelect={() =>
                  getGamesForPlatform(
                    "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 167; limit 50;"
                  )
                }
                text="Ps5"
              />
              <MenuOption
                onSelect={() =>
                  getGamesForPlatform(
                    "fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 169; limit 50;"
                  )
                }
                text="Xbox X"
              />
              <MenuOption
                onSelect={() =>
                  getGamesForPlatform(
                    "fields name, summary, id, platforms.name, cover.url, cover.image_id; where release_dates.platform = 55; limit 50;"
                  )
                }
                text="Mobile"
              />
            </MenuOptions>
          </Menu>
        ),
      });
    }, [navigation]),
    (
      <View style={{ flex: 1, backgroundColor: "#555c63" }}>
        <Input placeholder="Search..." leftIcon={"hi"}></Input>
        <GameList navigation={navigation} games={games} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 20,
  },
});

export default HomeScreen;
