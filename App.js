import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [node, setNode] = useState(0);
  const [toptext, setTopText] = useState("제목");
  const [downtext, setDownText] = useState("내용");
  const [index, setIndex] = useState(0);
  const [testnum, settestnum] = useState(0);

  //var Node_ID = 0;

  const onSetPage = () => {
    //setIndex(TextNodes[index].buttonindex[0]); //수정필요 -> 버튼의 인덱스를 받아 수정
    // const Node_ID = textNode.options[0].nextID; //Node_ID를 json의 next로 변경 -> 숫자로 하려면 Number(obj)

    setNode(index); //현재는 초기값 : 0
    setTopText(TextNodes[index].title);
    setDownText(TextNodes[index].text);

    SetButtonList2(
      TextNodes[index].options.map((
        name //name이 TextNodes[0].options가 되는 기적!
      ) => (
        <View>
          <Button
            color="grey"
            key={name.buttonID}
            title={name.text}
            onPress={() => settestnum(name.buttonID)} //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
          ></Button>
        </View>
      ))
      //12.26 버튼이 문제가 아니라 settestnum(여기)가 문제였다. 왜일까?
      //목표: 클릭한 버튼 ID값 찾아내기!
    );
  };

  const [buttonList2, SetButtonList2] = useState([
    <Button title="hope" color="black" onPress={onSetPage}></Button>,
  ]);

  //버튼 생성기 ver.map
  //const names = ["kendrick", "christopher", "theo", "dave"];
  //const buttonList = names.map((name2) => (
  //<Button title={name2} key={names.id} onPress={onSetNode}></Button>
  //)); //리스트를 받아 버튼 생성

  //const buttonList = TextNodes[index].options.map((
  //name //name이 TextNodes[0].options가 되는 기적!
  //) => (
  //<Button
  //title={name.text} //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
  //key 지정
  //onPress={onSetNode}
  //></Button>
  //));

  // const buttonindexList = TextNodes[index].buttonindex.map((buttonindex) => (
  // <Text>{buttonindex}</Text>
  //));

  return (
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>{toptext}</Text>
      </View>
      <Text>현재 인덱스 : {index}</Text>
      <Text>누른 버튼 ID : {testnum}</Text>
      <View style={styles.textbox}>
        <ScrollView>
          <Text>{downtext}</Text>
        </ScrollView>
      </View>
      <View style={styles.buttonbox}>{buttonList2}</View>
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
    flex: 2,
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
        buttonID: 1,
        text: "다가간다.",
        setState: { blueGoo: true },
        nextID: 1,
      },
      {
        buttonID: 2,
        text: "무기를 꺼낸다.",
        setState: { blueGoo: false },
        nextID: 1,
      },
      {
        buttonID: 3,
        text: "상황을 지켜본다.",
        setState: { blueGoo: false },
        nextID: 1,
      },
      {
        buttonID: 4,
        text: "상황을 지켜본다.",
        setState: { blueGoo: false },
        nextID: 1,
      },
    ],
  },
  {
    title: "Cien años de soledad",
    id: 1,
    text:
      "몇 년이 지나 총살을 당하게 된 순간, 아우렐리아노 부엔디아 대령은 오래전 어느 오후 아버지에게 이끌려 얼음 구경을 하러 간 일을 떠올렸다",
    options: [
      {
        text: "111111",
        setState: { blueGoo: true },
        nextID: 0,
      },
      {
        text: "222222",
        setState: { blueGoo: false },
        nextID: 0,
      },
      {
        text: "3333333",
        setState: { blueGoo: false },
        nextID: 0,
      },
    ],
  },
];
