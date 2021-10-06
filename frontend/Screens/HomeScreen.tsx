import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { getMyGameInfo, gameSelector } from '../redux/GameSlice';
import { getGameInfo } from '../Services/FetchCalls.js/GameApi.js/GameFetch';

import GameList from '../Components/GameList';
import { authSelector } from '../redux/AuthSlice';
import { fetchUserByToken } from '../redux/UserSlice';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const { isFetching, isAuthenticated, isSuccess } = useSelector(authSelector);
  const { userGames } = useSelector(gameSelector);

  const fetchUser = async () => {
    console.log('ping from fetchUser @HomeScreen');
    try {
      const token = dispatch(
        fetchUserByToken(),
      );
      if (token) {
        await AsyncStorage.setItem('token', token.arg.token);
      }
      dispatch(getMyGameInfo()); 
    } catch (err) {
      //console.log('errror token app', err.message);
    }
  };

  const getInfo = async (Mbody) => {
    const res = await getGameInfo(Mbody);
    setGames(res);
  };

  useEffect(() => {
    getInfo(
      'fields name, summary, genres.name, rating, first_release_date, game_modes.name, storyline, platforms.name, cover.url, cover.image_id; where release_dates.platform = (6, 48, 55, 167, 169, 49); limit 200;',
    );
  }, []);

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated, isSuccess]);

  const handleSearch = async () => {
    if (searchValue) {
      const re = new RegExp(searchValue, 'i');
      const filteredGames = games.filter((game) => re.test(game.name));
      setGames(filteredGames);
      setSearchValue('');
    }
  };

  const icon = <AntDesign name="search1" size={24} />;

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
              onSelect={() => getInfo(
                'fields name, summary, genres.name, rating, first_release_date, game_modes.name, storyline, platforms.name, cover.url, cover.image_id; where release_dates.platform = (6, 48, 55, 167, 169, 49); limit 200;',
              )}
              text='all'
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 6; limit 200;',
              )}
              text="PC"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 49; limit 200;',
              )}
              text="Xbox"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 48; limit 200;',
              )}
              text="Ps4"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 167; limit 200;',
              )}
              text="Ps5"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields *, platforms.name, cover.url, cover.image_id; where release_dates.platform = 169; limit 200;',
              )}
              text="Xbox X"
            />
            <MenuOption
              onSelect={() => getInfo(
                'fields name, summary, id, platforms.name, cover.url, cover.image_id; where release_dates.platform = 55; limit 200;',
              )}
              text="Mobile"
            />
          </MenuOptions>
        </Menu>
      ),
    });
  }, [navigation]);

  if (isFetching) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#555c63' }}>
        <Input
          placeholder="search"
          leftIcon={icon}
          onChangeText={(text) => setSearchValue(text)}
          onSubmitEditing={() => handleSearch()}
          value={searchValue}
        />

        <GameList navigation={navigation} games={games} userGames={userGames} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: 20,
  },
});

export default HomeScreen;
