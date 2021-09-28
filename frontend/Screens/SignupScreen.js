import React, { useState, useEffect } from "react";
import { Text, Button, Input } from "react-native-elements";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { authSelector, clearState, signUp } from "../redux/AuthSlice";
import * as SecureStore from "expo-secure-store";

const SignupScreen = ({ navigation }) => {
  const [userState, setState] = useState({
    userEmail: "",
    userPassword: "",
  });
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage, token } = useSelector(authSelector);

  //   if (isError) {
  //     dispatch(clearState());
  //   }
  // }, [isSuccess, isError]);
  console.log("ERRROOOOOOOR", errorMessage);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h3 h3Style={{ alignSelf: "center", marginBottom: 50 }}>
          Sign Up
        </Text>
        <Input
          leftIcon={{ type: "font-awesome", name: "envelope-square" }}
          label="Email Address"
          placeholder="email@example.com"
          value={userState.userEmail}
          onChangeText={(userEmail) => setState({ ...userState, userEmail })}
          autoCapitalize="none"
          autoCorrect={false}
          required
        />
        <Input
          leftIcon={{ type: "font-awesome", name: "lock" }}
          label="Password"
          placeholder="Password"
          value={userState.userPassword}
          onChangeText={(userPassword) =>
            setState({ ...userState, userPassword })
          }
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          required
        />
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        {reg.test(userState.userEmail) !== true ? (
          <Button disabled title="Sign Up" />
        ) : (
          <Button title="Sign Up" onPress={() => dispatch(signUp(userState))} />
        )}
        <Text>Already have an account? </Text>
        <Button title="Sign In" onPress={() => navigation.push("signIn")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
});

export default SignupScreen;
