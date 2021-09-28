import React, { useEffect, useState } from "react";
import { CLIENT_ID, API_TOKEN } from "@env";
import { Provider as PaperProvider } from "react-native-paper";
import { List } from "react-native-paper";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";

import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
  Text,
  Button,
} from "react-native";
import ParallaxScroll from "../Components/ParallaxScroll";
import Spacer from "../Components/Spacer";

import { signOutUser, clearState } from "../redux/UserSlice";
import { useDispatch } from "react-redux";
const renderParallaxHeader = (item) => {
  return (
    <Image
      source={{ uri: item.cover.url }}
      style={styles.imageStyle}
      resizeMode="cover"
    />
  );
};
const renderFixedHeader = (value) => {
  return (
    <View style={styles.fixedHeader}>
      <Text style={{ color: "white", fontSize: 20 }}>{value.name}</Text>
    </View>
  );
};
const renderStickyHeader = (value) => {
  const opacity = value.interpolate({
    inputRange: [0, 150, 200],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  return (
    <View style={styles.stickyHeader}>
      <Animated.View style={[styles.stickyHeaderBackground, { opacity }]} />
    </View>
  );
};

const Platforms = (item) => (
  <>
    <FlatList
      // horizontal
      data={item.platforms}
      listKey={(game, index) => "C" + index.toString()}
      renderItem={({ item }) => {
        return (
          <Text style={{ flexDirection: "column", flexBasis: 100 }}>
            {item.name}
          </Text>
        );
      }}
    />
  </>
);

const Genres = (item) => (
  <>
    <FlatList
      // horizontal
      data={item.genres}
      listKey={(game, index) => game.name}
      renderItem={({ item }) => {
        return (
          <Text style={{ flexDirection: "column", flexBasis: 100 }}>
            {item.name}
          </Text>
        );
      }}
    />
  </>
);

const headerSize = 50;
const windowWidth = Dimensions.get("window").width;

const GameDetailScreen = ({ route }) => {
  const [gameDetails, setGameDetails] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(true);
  const [secondExanded, setSecondExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const handlePress2 = () => setOpen(!open);
  const handlePress3 = () => setSecondExpanded(!SecondExpanded);

  const { id } = route.params;
  useEffect(() => {
    getGameDetails(
      `fields id, name, summary, genres.name, total_rating, first_release_date, cover.url, game_modes.name, cover.image_id, genres.name, platforms.name; where id = ${id};`
    );
    console.log("called");
  }, []);

  const getGameDetails = async (Mbody) => {
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
        }
      });
      setGameDetails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const dispatch = useDispatch();
  return (
    <>
      <FlatList
        horizontal
        data={gameDetails}
        keyExtractor={(game, index) => game.id.toString()}
        renderItem={({ item }) => {
          return (
            <SafeAreaView style={{ flex: 1 }}>
              <ParallaxScroll
                style={{ flex: 1 }}
                parallaxHeaderHeight={500}
                stickyHeaderHeight={500}
                parallaxHeader={() => renderParallaxHeader(item)}
                fixedHeader={() => renderFixedHeader(item)}
                stickyHeader={(item) => renderStickyHeader(item)}
              >
                <Spacer />

                <View
                  style={{
                    height: 1000,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: windowWidth,
                  }}
                >
                  <Collapse
                    isExpanded={true}
                    onToggle={() => setExpanded(!expanded)}
                  >
                    <CollapseHeader>
                      <Text style={styles.headerText}>Summary</Text>
                    </CollapseHeader>
                    <CollapseBody>
                      <Text>{item.summary}</Text>
                    </CollapseBody>
                  </Collapse>
                  <Spacer />

                  <Collapse
                    isExpanded={true}
                    onToggle={() => setExpanded(!expanded)}
                  >
                    <CollapseHeader>
                      <Text style={styles.headerText}>Release Date</Text>
                    </CollapseHeader>
                    <CollapseBody>
                      <Text style={styles.content}>{`Released ${new Date(
                        item.first_release_date * 1000
                      ).toDateString("en-US")}`}</Text>
                    </CollapseBody>
                  </Collapse>
                  <Spacer />

                  <Collapse
                    isExpanded={true}
                    onToggle={() => setExpanded(!expanded)}
                  >
                    <CollapseHeader>
                      <Text style={styles.headerText}>Platforms</Text>
                    </CollapseHeader>
                    <CollapseBody>
                      <Text style={styles.content}>{Platforms(item)} </Text>
                    </CollapseBody>
                  </Collapse>
                  <Spacer />

                  <Collapse
                    isExpanded={true}
                    onToggle={() => setExpanded(!expanded)}
                  >
                    <CollapseHeader>
                      <Text style={styles.headerText}>Genres</Text>
                    </CollapseHeader>
                    <CollapseBody>
                      <Text style={styles.content}>{Genres(item)} </Text>
                    </CollapseBody>
                  </Collapse>
                  <Spacer />
                </View>
              </ParallaxScroll>
            </SafeAreaView>
          );
        }}
      />
      <Button
        style={{
          position: "absolute",
          bottom: 50,
          right: 0,
          left: 0,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
        title="logout"
        /// TODO LOGOUT a USER
        onPress={() => dispatch(signOutUser())}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: "100%",
    width: windowWidth,
    borderWidth: 1,
    borderColor: "red",
    marginTop: 0,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  content: {
    alignSelf: "center",
    fontSize: 18,
  },
  date: {
    fontSize: 18,
    alignSelf: "center",
  },
  rating: {
    alignSelf: "center",
  },
  fixedHeader: {
    zIndex: 1,
    width: windowWidth,
    padding: 10,
    fontSize: 20,
    alignItems: "center",
  },
  stickyHeader: {
    height: headerSize,
    width: windowWidth,
    backgroundColor: "rgba(0,0,0,0.4)",
    marginTop: 0,
  },
  stickyHeaderBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "purple",
  },
});

export default GameDetailScreen;
