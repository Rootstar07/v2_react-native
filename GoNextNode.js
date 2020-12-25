import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function GoNextNode() {
  return (
    <View>
      <Text>{TextNodes[0].text}</Text>
    </View>
  );
}

const TextNodes = [
  {
    id: 1,
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
    ],
  },
];
