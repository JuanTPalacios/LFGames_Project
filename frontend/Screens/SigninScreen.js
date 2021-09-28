import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { Text, Button, Input } from "react-native-elements";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { authSelector } from "../redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { signInUser, clearState } from "../redux/AuthSlice";

const SigninScreen = ({ navigation }) => {
  const [userState, setUserState] = useState({
    userEmail: "",
    userPassword: "",
  });

  // console.log("isLoggedIn", isLoggedIn);
  const { isSuccess, isError } = useSelector(authSelector);

  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h3 h3Style={{ alignSelf: "center", marginBottom: 50 }}>
          Sign In
        </Text>
        <Input
          leftIcon={{ type: "font-awesome", name: "envelope-square" }}
          label="Email Address"
          placeholder="email@example.com"
          value={userState.userEmail}
          onChangeText={(userEmail) =>
            setUserState({
              ...userState,
              userEmail,
            })
          }
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          leftIcon={{ type: "font-awesome", name: "lock" }}
          label="Password"
          placeholder="Password"
          value={userState.userPassword}
          onChangeText={(userPassword) =>
            setUserState({ ...userState, userPassword })
          }
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />

        <Button
          title="Sign In"
          onPress={() => dispatch(signInUser(userState))}
        />
        <Text>Already have an account? </Text>
        <Button title="Sign Up" onPress={() => navigation.navigate("signUp")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});

export default SigninScreen;
