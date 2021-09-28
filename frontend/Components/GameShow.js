import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "react-native-vector-icons";

import { Text, Image, Button } from "react-native-elements";

const GameShow = ({ game, addGameToList, title, token }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: game.cover.url,
        }}
      ></Image>
      <View style={styles.center}>
        {game.name.length > 25 ? (
          <Text style={styles.title}>
            {game.name.slice(0, 26).concat("...")}
          </Text>
        ) : (
          <Text style={styles.title}> {game.name} </Text>
        )}

        {game.platforms[0].name ? (
          <Text style={styles.text}>{game.platforms[0].name}</Text>
        ) : (
          <Text style={styles.text}>hey</Text>
        )}
        <Text style={styles.text}>
          {" "}
          Released:
          {new Date(game.first_release_date * 1000).toDateString("en-US")}
        </Text>
      </View>
      {title !== "My Games" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <Button
            buttonStyle={styles.move}
            icon={<AntDesign name="plus" size={22} style={styles.btn_style} />}
            onPress={() => addGameToList({ ...game, token })}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
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

export default GameShow;
