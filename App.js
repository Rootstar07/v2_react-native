import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [node, setNode] = useState(0);

  const textNode = TextNodes[0]; //textNode는 TextNodes에서 배열 위치를 가져왔어요
  var title = textNode.title;
  var text = textNode.text;

  const onSetNode = () => {
    setNode(node + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>
          {title} : {node}
        </Text>
      </View>
      <View style={styles.textbox}>
        <ScrollView>
          <Text>{text}</Text>
        </ScrollView>
      </View>
      <View style={styles.buttonbox}>
        <Button title={textNode.options[0].text}></Button>
        <Button title={textNode.options[1].text}></Button>
        <Button title={textNode.options[2].text}></Button>
      </View>
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

const TextNodes = [
  {
    title: "Cien años de soledad",
    id: 0,
    text:
      "몇 년이 지나 총살을 당하게 된 순간, 아우렐리아노 부엔디아 대령은 오래전 어느 오후 아버지에게 이끌려 얼음 구경을 하러 간 일을 떠올렸다",
    options: [
      {
        text: "111111",
        setState: { blueGoo: true },
        nextID: 2,
      },
      {
        text: "222222",
        setState: { blueGoo: false },
        nextID: 3,
      },
      {
        text: "3333333",
        setState: { blueGoo: false },
        nextID: 3,
      },
    ],
  },
];
