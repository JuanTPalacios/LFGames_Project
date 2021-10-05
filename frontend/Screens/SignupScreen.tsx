import React, { useState } from 'react';
import { Text, Button, Input } from 'react-native-elements';
import {
  View, SafeAreaView, StyleSheet, Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { authSelector, signUp } from '../redux/AuthSlice';
import { useSignUpUserMutation } from '../Services/UserService';

const SignupScreen = ({ navigation }) => {
  const [userState, setState] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
  });
  const [serverRes, setServerRes] = useState('');
  const [
    signUpUser,
    {error, data, status}
  ] = useSignUpUserMutation();

  const { errorMessage } = useSelector(authSelector);
  
  const submitForm = async () => {
    const res = await signUpUser(userState);
    console.log(res);
    if (res.data) console.log('hello');
    // sign up user
    // check for error or success
    // do something
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../assets/Logo.jpeg")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 30,
            alignSelf: 'center',
          }}
        />
        <Text h3 h3Style={styles.headerTitle}>
          Create New Account
        </Text>
        <Text>{serverRes}</Text>
        <Input
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          label="Username"
          placeholder="John Doe"
          value={userState.userName}
          onChangeText={(userName) => setState({ ...userState, userName })}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          leftIcon={{ type: 'font-awesome', name: 'envelope-square' }}
          label="Email Address"
          placeholder="email@example.com"
          value={userState.userEmail}
          onChangeText={(userEmail) => setState({ ...userState, userEmail })}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          label="Password"
          placeholder="Password"
          value={userState.userPassword}
          onChangeText={(userPassword) => setState({ ...userState, userPassword })}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {userState.userName && userState.userEmail && userState.userPassword 
        ? <Button title="Sign Up" onPress={submitForm} />
        : <Button title="Sign Up" disabled />
        }
        <TouchableOpacity onPress={() => navigation.push('signIn')}>
          <Text style={styles.link}>
            {' '}
            Already have an account? Go to the Sign In page!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#dbeaff',
    flex: 1,
  },
  link: {
    color: '#2e7eff',

    width: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    alignSelf: 'center',
    marginBottom: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default SignupScreen;
