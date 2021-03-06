import React, { useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { auth } from "../firebase";

const Regiter = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: " ",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: name,
        });
        alert("Registration Successfull");
        navigation.replace("Home");
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  };

  return (
    <View behavior="padding">
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: "https://www.citypng.com/public/uploads/preview/-416010601995c3rkhawxn.png",
          }}
          style={{ height: 100, width: 100, borderRadius: 15 }}
        />
        <View style={styles.inputGroup}>
          <Input
            placeholder="Enter Name"
            style={styles.inputField}
            value={name}
            onChangeText={(text) => setName(text)}
            keyboardType="default"
          />
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
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            disabled={
              password.length === 0 || email.length === 0 || name.length === 0
            }
            onPress={register}
            buttonStyle={styles.buttonSolid}
            title="Register"
          />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default Regiter;

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
