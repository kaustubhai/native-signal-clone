import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, ListItem } from "react-native-elements";

const ChatHead = ({ title, image, id, enterChat, createdBy }) => {
  return (
    <ListItem onPress={() => enterChat(id, title)} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: `data:image/jpeg;base64,${image}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>{title}</ListItem.Title>
        <ListItem.Subtitle
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 14 }}
        >
          Created By: {createdBy}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default ChatHead;

const styles = StyleSheet.create({});
