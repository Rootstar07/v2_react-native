import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import data from "./nodesjson.json";

var CrossRoad = data.nodesjson;
var changedHP = 0;
var changedPsy = 0;
var changedBullet = 0;
var changedstory = "";
var spacing = `
  

  `;

export default function App() {
  const [toptext, setTopText] = useState("");
  const [PressedButtonID, setPressedButtonID] = useState(0);
  const [HP, setHP] = useState(10);
  const [Psy, setPsy] = useState(10);
  const [Bullet, setBullet] = useState(0);
  const [storytext, setStoryText] = useState([]);

  const scrollViewRef = useRef();

  //var Node_ID = 0;

  const StartGame = () => {
    //setIndex(TextNodes[index].buttonindex[0]); //수정필요 -> 버튼의 인덱스를 받아 수정
    // const Node_ID = textNode.options[0].nextID; //Node_ID를 json의 next로 변경 -> 숫자로 하려면 Number(obj)
    setTopText(CrossRoad[0].title);
    setDownText(CrossRoad[0].text);
    SetButtonList2(
      CrossRoad[0].options.map((
        name //name이 TextNodes[0].options가 되는 기적!
      ) => (
        <TouchableOpacity
          style={styles.TouchableOpacityDesign}
          key={name.buttonID}
          onPress={() => NeXtNode(name.nextID, name.buttonID, name.setUI)} //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
        >
          <Text style={styles.buttonFont}>{name.text}</Text>
        </TouchableOpacity>
      ))
      //12.26 버튼이 문제가 아니라 SetPressedButtonID(여기)가 문제였다. 왜일까?
    );
  };

  const onSetPage = (a) => {
    scrollViewRef.current.scrollToEnd({ animated: true }); //스크롤 관리
    changedstory = changedstory + CrossRoad[a].text + spacing; // mission: 띄어쓰기 넣기
    setTopText(CrossRoad[a].title);
    setDownText(changedstory);

    SetButtonList2(
      CrossRoad[a].options.map((name) => (
        <TouchableOpacity
          style={styles.TouchableOpacityDesign}
          key={name.buttonID}
          onPress={() => {
            NeXtNode(name.nextID, name.buttonID, name.setUI);
          }}
        >
          <Text style={styles.buttonFont}>{name.text}</Text>
        </TouchableOpacity>
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
    onSetPage(nextID);
    onSetUI(UIdata.setHP, UIdata.setPsy, UIdata.setBullet);
  };

  const [buttonList2, SetButtonList2] = useState([
    <TouchableOpacity onPress={StartGame}>
      <View style={styles.startbutton}>
        <Text style={styles.buttonFont2}>시작하기</Text>
      </View>
    </TouchableOpacity>,
  ]);

  const [downtext, setDownText] = useState([""]);

  return (
    <SafeAreaView style={styles.master}>
      <View style={styles.safeArea}></View>
      <View style={styles.TopArea}>
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
      <View style={styles.MiddleArea}>
        <View style={styles.titlebox}>
          <Text style={styles.title}>{toptext}</Text>
        </View>
        <View style={styles.textbox}>
          <ScrollView ref={scrollViewRef}>
            <Text style={styles.text}>{downtext}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.BottomArea}>
        <View style={styles.buttonbox}>{buttonList2}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  master: {
    flex: 1,
    backgroundColor: "#efeeee",
  },
  safeArea: {
    flex: 0.7,
  },

  TopArea: {
    flexDirection: "row",
    flex: 0.7,
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

  MiddleArea: {
    flex: 7,
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
  BottomArea: {
    flex: 2.5,
  },
  TouchableOpacityDesign: {
    borderRadius: 10, //테투리 설정
    //backgroundColor: "#282825", //버튼 색깔
    margin: 1, //버튼 사이 간격
    marginHorizontal: 15, //버튼 폭
    paddingHorizontal: 20, //버튼 내부 수평
    paddingVertical: 10, //버튼 내부 수직
    borderWidth: 2,
    borderColor: "#282825",
  },
  buttonFont: {
    fontSize: 17,
    color: "black",
  },
  startbutton: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFont2: {
    fontSize: 17,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonbox: {},

  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {
    fontSize: 20,
  },
});
