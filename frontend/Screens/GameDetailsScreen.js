import { CLIENT_ID, API_TOKEN, LOCAL_URL } from "@env";

import React, { useEffect, useState } from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
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
} from "react-native";
import ParallaxScroll from "../Components/ParallaxScroll";
import Spacer from "../Components/Spacer";
import { getGameInfo, getGameDetails } from '../Services/FetchCalls.js/GameApi.js/GameFetch'
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
      <Text style={styles.fixedHeader}>{value.name}</Text>
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
        return <Text style={styles.content}>{item.name}</Text>;
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
        return <Text style={styles.content}>{item.name}</Text>;
      }}
    />
  </>
);
const Screenshots = (item) => (
  <>
    <FlatList
      // horizontal
      numColumns={3}
      data={item.screenshots}
      listKey={(game, index) => game.url}
      renderItem={({ item, index }) => {
        return (
          <Image
            style={{ width: 125, height: 125, margin: 5 }}
            source={{ uri: `http:${item.url}` }}
          />
        );
      }}
    />
  </>
);

const headerSize = 50;
const windowWidth = Dimensions.get("window").width;

const setDetailsParams = (id) => {
  return `fields id, name, summary, genres.name, rating,  total_rating, screenshots.url, first_release_date, cover.url, game_modes.name, cover.image_id, genres.name, platforms.name; where id = ${id};`
}

const GameDetailScreen = ({ route }) => {
  const [gameDetails, setGameDetails] = useState([]);
  const [expanded, setExpanded] = useState(true);

  const { id } = route.params;
  const detailsParams = setDetailsParams(id);

  useEffect(() => {
    gameDetailsHandler()

  }, []);

  async function gameDetailsHandler () {
    const res = await getGameDetails(detailsParams);
    if (res) {
      setGameDetails(res)
    }
  }



  return (
    <>
     {console.log(gameDetails[0])}
      <FlatList
        horizontal
        data={gameDetails}
        keyExtractor={(game, index) => game.id.toString()}
        renderItem={({ item }) => {
          return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#555c63" }}>
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
                    height: 600,
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: windowWidth,
                  }}
                >
                  <Spacer />
                  <Collapse
                    isExpanded={true}
                    onToggle={() => setExpanded(!expanded)}
                  >
                    <CollapseHeader>
                      <Text style={styles.headerText}>Summary</Text>
                    </CollapseHeader>
                    <CollapseBody>
                      <Text style={styles.summary}>{item.summary}</Text>
                    </CollapseBody>
                  </Collapse>
                  <Spacer />

                  <Collapse
                    isExpanded={true}
                    onToggle={() => setExpanded(!expanded)}
                  >
                    <CollapseHeader>
                      <Text style={styles.headerText}>
                        Release Date & Rating
                      </Text>
                    </CollapseHeader>
                    <CollapseBody style={{ flexDirection: "column" }}>
                      <Text style={styles.content}>
                        {`Released ${new Date(
                          item.first_release_date * 1000
                        ).toDateString("en-US")}`}{" "}
                      </Text>
                      <Text style={styles.content}>
                        rating: {Math.floor(item.rating)} / 100
                      </Text>
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
                  <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                    {Screenshots(item)}
                  </View>
                </View>
              </ParallaxScroll>
            </SafeAreaView>
          );
        }}
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
    color: "white",
  },
  content: {
    alignSelf: "center",
    color: "white",
    color: "#e8f1fa",
  },
  summary: {
    alignSelf: "center",
    color: "white",
    padding: 20,
    color: "#e8f1fa",
  },
  fixedHeader: {
    color: "white",
    fontSize: 20,
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
    fontWeight: "bold",
    color: "#1a2d7d",
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
