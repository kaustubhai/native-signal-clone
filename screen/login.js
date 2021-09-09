import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigation.replace("Home");
    });
  }, []);

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.replace("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png",
          }}
          style={{ height: 100, width: 100, borderRadius: 15 }}
        />
        <View style={styles.inputGroup}>
          <Input
            placeholder="Enter Email"
            style={styles.inputField}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="default"
            autoCapitalize="none"
          />
          <Input
            placeholder="Enter Password"
            style={styles.inputField}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            onSubmitEditing={login}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            onPress={login}
            buttonStyle={styles.buttonSolid}
            title="Login"
          />
          <Button
            onPress={() => navigation.navigate("Register")}
            buttonStyle={styles.buttonOutline}
            title="Signup"
            type="outline"
          />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  inputGroup: {
    marginTop: 50,
    width: 300,
  },
  inputField: {
    fontSize: 16,
    margin: 0,
    padding: 0,
  },
  buttonGroup: {
    margin: 10,
    width: 300,
  },
  buttonSolid: {
    backgroundColor: "#3977f0",
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: "#3977f0",
  },
});
