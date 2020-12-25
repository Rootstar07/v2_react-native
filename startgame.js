import React from "react";
import { StyleSheet, Text, View } from "react-native";
import GoNextNode from "./GoNextNode.js";

export default function startgame() {
  return (
    <View>
      <Text>{GoNextNode()}</Text>
    </View>
  );
}

//다음 이야기 노드 -> json 연동은 나중에
const textNodes = [
  {
    id: 1,
    text: "당신은 알 수 없는 곳에서 눈을 떴습니다.",
    options: [
      {
        text: "주변을 둘러본다.",
        setState: { search: false },
        nextText: 2,
        text: "주머니를 뒤져본다.",
        setState: { search: true },
        nextText: 3,
      },
    ],
  },
];
