import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { Button, Image } from "react-native-elements";
import { auth, db } from "../firebase";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const addChats = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const addChat = async () => {
    setLoading(true);
    db.collection("rooms")
      .add({
        title,
        creator: auth.currentUser.displayName,
        image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch((error) => alert(error.message));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: " ",
    });
  }, []);

  const uploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });

    if (!result.cancelled) {
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });
      setImage(base64);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Image
        source={{
          uri:
            image.length > 0
              ? `data:image/jpeg;base64,${image}`
              : "https://www.citypng.com/public/uploads/preview/-416010601995c3rkhawxn.png",
        }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 15,
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Chatroom name"
        autoFocus
        value={title}
        onSubmitEditing={addChat}
        onChangeText={(text) => setTitle(text)}
      />
      <Button
        buttonStyle={{ backgroundColor: "#00ccff" }}
        onPress={uploadPhoto}
        style={styles.uploadButton}
        title="Upload Room thumbnail"
      />
      <Button
        disabled={image && title.length > 0 ? false : true}
        onPress={addChat}
        style={styles.button}
        title="Create room"
      />
      {loading && <Text style={styles.loading}>Room is being created...</Text>}
      <View style={{ height: 100 }} />
    </View>
  );
};

export default addChats;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  input: {
    width: 250,
    marginTop: 25,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
  },
  button: {
    fontSize: 14,
    paddingHorizontal: 45,
    marginTop: 15,
    width: 350,
  },
  uploadButton: {
    marginTop: 10,
    width: 250,
  },
  loading: {
    marginVertical: 50,
    textAlign: "center",
    fontSize: 16,
  },
});
