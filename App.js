import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import startgame from "./startgame.js";

export default function App() {
  const [node, setNode] = useState(0);

  const onSetNode = () => {
    setNode(node + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>제목</Text>
      </View>
      <View style={styles.textbox}>
        <ScrollView>
          <Text style={styles.text}>
            내용 PUBLIC Stack Overflow Tags Users FIND A JOB Jobs Companies
            TEAMS What’s this? Free 30 Day Trial React native scroll Text
            horizontal Asked 3 years, 11 months ago Active 3 years, 11 months
            ago Viewed 2k times 0 How to create a text scrolling bar in react
            native? Like that of news scroll. Is it possible without using
            Animation library? android react-native share improve this question
            follow asked Jan 22 '17 at 13:00 Ujjwal Nepal 52944 silver
            badges1111 bronze badges add a comment 1 Answer 2 If you want a
            user-controlled scroll you have a component for this - ScrollView
            Here's a link to the official documentation -
            https://facebook.github.io/react-native/docs/scrollview.html If you
            want it to scroll automatically you need you use ScrollView with the
            Animated library or use ScrollView's scrollTo function. share
            improve this answer follow edited Jan 22 '17 at 14:51 PUBLIC Stack
            Overflow Tags Users FIND A JOB Jobs Companies TEAMS What’s this?
            Free 30 Day Trial React native scroll Text horizontal Asked 3 years,
            11 months ago Active 3 years, 11 months ago Viewed 2k times 0 How to
            create a text scrolling bar in react native? Like that of news
            scroll. Is it possible without using Animation library? android
            react-native share improve this question follow asked Jan 22 '17 at
            13:00 Ujjwal Nepal 52944 silver badges1111 bronze badges add a
            comment 1 Answer 2 If you want a user-controlled scroll you have a
            component for this - ScrollView Here's a link to the official
            documentation -
            https://facebook.github.io/react-native/docs/scrollview.html If you
            want it to scroll automatically you need you use ScrollView with the
            Animated library or use ScrollView's scrollTo function. share
            improve this answer follow edited Jan 22 '17 at 14:51
          </Text>
        </ScrollView>
      </View>
      <View style={styles.buttonbox}>
        <Text>{node}</Text>
        <Button title="button1" onPress={onSetNode}></Button>
        <Button title="button2"></Button>
        <Button title="button3"></Button>
      </View>
      {startgame()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titlebox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textbox: {
    flex: 5,
    marginHorizontal: 20,
  },
  buttonbox: {
    flex: 1.2,
  },

  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {
    fontSize: 20,
  },
});
