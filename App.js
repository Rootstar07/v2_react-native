import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [node, setNode] = useState(0);
  const [toptext, setTopText] = useState("제목");
  const [downtext, setDownText] = useState("내용");
  const [index, setIndex] = useState(0);
  const [buttonindex, SetButtonIndex] = useState(0); //실시간으로 바뀌는 것들은 모두 useState 사용
  const [buttonList2, setButtonList2] = useState([]);

  //var Node_ID = 0;

  const onSetNode = () => {};

  const onSetButtonList = () => {
    setIndex(TextNodes[index].buttonindex[0]); //수정필요 -> 버튼의 인덱스를 받아 수정
    // const Node_ID = textNode.options[0].nextID; //Node_ID를 json의 next로 변경 -> 숫자로 하려면 Number(obj)

    setNode(index);
    setTopText(TextNodes[index].title);
    setDownText(TextNodes[index].text);

    setButtonList2(
      TextNodes[index].options.map((
        name //name이 TextNodes[0].options가 되는 기적!
      ) => (
        <Button
          title={name.text} //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
          //key 지정
          onPress={onSetNode}
        ></Button>
      ))
    );
  };

  //버튼 생성기 ver.map
  //const names = ["kendrick", "christopher", "theo", "dave"];
  //const buttonList = names.map((name2) => (
  //<Button title={name2} key={names.id} onPress={onSetNode}></Button>
  //)); //리스트를 받아 버튼 생성

  const buttonList = TextNodes[index].options.map((
    name //name이 TextNodes[0].options가 되는 기적!
  ) => (
    <Button
      title={name.text} //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
      //key 지정
      onPress={onSetNode}
    ></Button>
  ));

  const buttonindexList = TextNodes[index].buttonindex.map((buttonindex) => (
    <Text>{buttonindex}</Text>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>
          {toptext} : {node}
        </Text>
      </View>
      <View style={styles.textbox}>
        <ScrollView>
          <Text>{downtext}</Text>
        </ScrollView>
      </View>
      <View style={styles.buttonbox}>
        <Button title="시작" onPress={onSetButtonList}></Button>
        <View>{buttonList2}</View>
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
    flex: 1.5,
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
        text: "다가간다.",
        setState: { blueGoo: true },
        nextID: 1,
      },
      {
        text: "무기를 꺼낸다.",
        setState: { blueGoo: false },
        nextID: 3,
      },
      {
        text: "상황을 지켜본다.",
        setState: { blueGoo: false },
        nextID: 3,
      },
    ],
    button: ["다가간다", "공격한다", "상황을 지켜본다", "도망친다"],
    buttonindex: [0, 1, 2, 3],
  },
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
    button: ["다가간다", "공격한다", "상황을 지켜본다", "도망친다"],
  },
];
