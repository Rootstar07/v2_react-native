import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import nodesjson from "./nodesjson.json";

var newNode = nodesjson;

export default function App() {
  const [node, setNode] = useState(0);
  const [toptext, setTopText] = useState("제목");
  const [downtext, setDownText] = useState("내용");
  const [index, setIndex] = useState(0);
  const [PressedButtonID, setPressedButtonID] = useState(0);
  const [nextButtonID, setNextButtonID] = useState(0);

  //var Node_ID = 0;

  const onSetPage = (nextID) => {
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
            onPress={() => NeXtNode(name.nextID, name.buttonID)} //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
          ></Button>
        </View>
      ))
      //12.26 버튼이 문제가 아니라 SetPressedButtonID(여기)가 문제였다. 왜일까?
      //목표: 클릭한 버튼 ID값 찾아내기!
    );
  };

  const onSetPage2 = (a) => {
    setNode(a); //현재는 초기값 : 0
    setTopText(TextNodes[a].title);
    setDownText(TextNodes[a].text);

    SetButtonList2(
      TextNodes[a].options.map((name) => (
        <View>
          <Button
            color="grey"
            key={name.buttonID}
            title={name.text}
            onPress={() => NeXtNode(name.nextID, name.buttonID)}
          ></Button>
        </View>
      ))
    );
  };

  const NeXtNode = (nextID, nowID) => {
    setPressedButtonID(nowID);
    setNextButtonID(nextID);
    setIndex(nextID);
    onSetPage2(nextID);
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
    <SafeAreaView style={styles.master}>
      <View style={styles.uiContainer}>
        <View style={styles.uiHamburger}></View>
        <View style={styles.uiHPContainer}>
          <Text style={styles.uiText}>체력</Text>
          <Text style={styles.uiNum}>10</Text>
        </View>
        <View style={styles.uiPsyContainer}>
          <Text style={styles.uiText}>정신</Text>
          <Text style={styles.uiNum}>10</Text>
        </View>
        <View style={styles.uiBulletContainer}>
          <Text style={styles.uiText}>총알</Text>
          <Text style={styles.uiNum}>10</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>{toptext}</Text>
        </View>
        <Text>현재 인덱스 : {index}</Text>
        <Text>누른 버튼 ID : {PressedButtonID}</Text>
        <Text>다음 버튼 ID : {nextButtonID}</Text>
        <View style={styles.textbox}>
          <ScrollView>
            <Text style={styles.text}>{downtext}</Text>
          </ScrollView>
        </View>
        <View style={styles.buttonbox}>{buttonList2}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  master: {
    flex: 1,
  },

  uiContainer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "lightgrey",
  },
  uiText: {
    fontSize: 15,
  },
  uiNum: {
    fontSize: 30,
    fontWeight: "bold",
  },
  uiHPContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uiPsyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uiBulletContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  uiHamburger: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 7,
    backgroundColor: "snow",
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
    marginHorizontal: 25,
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
        nextID: 2,
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
      "조물주가 창조한 모든 것은 선하나, 인간의 손 안에서 모든 것은 타락한다.",
    options: [
      {
        buttonID: 1,
        text: "111111",
        setState: { blueGoo: true },
        nextID: 0,
      },
      {
        buttonID: 2,
        text: "222222",
        setState: { blueGoo: false },
        nextID: 0,
      },
      {
        buttonID: 3,
        text: "3333333",
        setState: { blueGoo: false },
        nextID: 0,
      },
    ],
  },
  {
    title: "Cien años de soledad",
    id: 2,
    text:
      "나라말이 중국과 달라 한문·한자와 서로 통하지 아니하므로 이런 까닭으로 어리석은 백성들이 말하고자 하는 바가 있어도 끝내 제 뜻을 펴지 못하는 사람이 많다. 내가 이를 불쌍히 여겨 새로 스물 여덟 글자를 만드니 사람마다 하여금 쉽게 익혀 날마다 씀에 편하게 하고자 할 따름이다.",
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
