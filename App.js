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
import data from "./nodesjson.json";

var CrossRoad = data.nodesjson;
var changedHP = 0;
var changedPsy = 0;
var changedBullet = 0;

export default function App() {
  const [node, setNode] = useState(0);
  const [toptext, setTopText] = useState("제목");
  const [downtext, setDownText] = useState("내용");
  const [index, setIndex] = useState(0);
  const [PressedButtonID, setPressedButtonID] = useState(0);
  const [nextButtonID, setNextButtonID] = useState(0);
  const [HP, setHP] = useState(10);
  const [Psy, setPsy] = useState(10);
  const [Bullet, setBullet] = useState(0);

  //var Node_ID = 0;

  const onSetPage = () => {
    //setIndex(TextNodes[index].buttonindex[0]); //수정필요 -> 버튼의 인덱스를 받아 수정
    // const Node_ID = textNode.options[0].nextID; //Node_ID를 json의 next로 변경 -> 숫자로 하려면 Number(obj)

    setNode(index); //현재는 초기값 : 0
    setTopText(CrossRoad[index].title);
    setDownText(CrossRoad[index].text);

    SetButtonList2(
      CrossRoad[index].options.map((
        name //name이 TextNodes[0].options가 되는 기적!
      ) => (
        <View>
          <Button
            color="grey"
            key={name.buttonID}
            title={name.text}
            onPress={() => NeXtNode(name.nextID, name.buttonID, name.setUI)} //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
          ></Button>
        </View>
      ))
      //12.26 버튼이 문제가 아니라 SetPressedButtonID(여기)가 문제였다. 왜일까?
      //목표: 클릭한 버튼 ID값 찾아내기!
    );
  };

  const onSetPage2 = (a) => {
    setNode(a); //현재는 초기값 : 0
    setTopText(CrossRoad[a].title);
    setDownText(CrossRoad[a].text);

    SetButtonList2(
      CrossRoad[a].options.map((name) => (
        <View>
          <Button
            color="grey"
            key={name.buttonID}
            title={name.text}
            onPress={() => NeXtNode(name.nextID, name.buttonID, name.setUI)}
          ></Button>
        </View>
      ))
    );
  };

  const onSetUI = (hp, psy, bullet) => {
    changedHP = changedHP + hp;
    changedPsy = changedPsy + psy;
    changedBullet = changedBullet + bullet;
    var nowHp = setHP(HP + changedHP);
    var nowPsy = setPsy(Psy + changedPsy);
    var nowBullet = setBullet(Bullet + changedBullet);
  };

  const NeXtNode = (nextID, nowID, UIdata) => {
    setPressedButtonID(nowID);
    setNextButtonID(nextID);
    setIndex(nextID);
    onSetPage2(nextID);
    onSetUI(UIdata.setHP, UIdata.setPsy, UIdata.setBullet);
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
          <Text style={styles.uiNum}>{HP}</Text>
        </View>
        <View style={styles.uiPsyContainer}>
          <Text style={styles.uiText}>정신</Text>
          <Text style={styles.uiNum}>{Psy}</Text>
        </View>
        <View style={styles.uiBulletContainer}>
          <Text style={styles.uiText}>총알</Text>
          <Text style={styles.uiNum}>{Bullet}</Text>
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
    backgroundColor: "snow",
  },

  uiContainer: {
    flexDirection: "row",
    flex: 1,
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
