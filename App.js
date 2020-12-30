import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from "react-native";
import data from "./nodesjson.json";

var CrossRoad = data.nodesjson;
var changedHP = 0;
var changedPsy = 0;
var changedBullet = 0;
var changedstory = "";
var spacing = `



  `;
var taleSpacing = `

















`;

export default function App() {
  const [toptext, setTopText] = useState("");
  const [PressedButtonID, setPressedButtonID] = useState(0);
  const [HP, setHP] = useState(10);
  const [Psy, setPsy] = useState(10);
  const [Bullet, setBullet] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef();
  //const [modaltest, setModalTest] = useState("false");

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
          onPress={() =>
            NeXtNode(name.nextID, name.buttonID, name.setUI, name.isFate)
          } //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
        >
          <Text style={styles.buttonFont}>{name.text}</Text>
        </TouchableOpacity>
      ))
      //12.26 버튼이 문제가 아니라 SetPressedButtonID(여기)가 문제였다. 왜일까?
    );
  };

  const onSetPage = (a) => {
    changedstory = changedstory + CrossRoad[a].text + spacing; // mission: 띄어쓰기 넣기
    setTopText(CrossRoad[a].title);
    setDownText(changedstory);
    scrollViewRef.current.scrollToEnd({ animated: true }); //스크롤 관리
    //버튼생성

    SetButtonList2(
      CrossRoad[a].options.map((name) => (
        <TouchableOpacity
          style={[
            name.isFate == 1
              ? styles.TouchableOpacityDesign
              : styles.TouchableOpacityDesign2,
          ]}
          key={name.buttonID}
          onPress={() => {
            if (name.isFate == 1) {
              setDice(name.nextID, name.buttonID, name.setUI, name.isFate);
            } else {
              NeXtNode(name.nextID, name.buttonID, name.setUI, name.isFate);
            }
          }}
        >
          <Text
            style={[name.isFate == 1 ? styles.buttonFont : styles.buttonFont2]}
          >
            {name.text}
          </Text>
        </TouchableOpacity>
      ))
    );
  };

  const setDice = (a, b, c, d) => {
    //모달창 열때
    setModalVisible(true);
    NeXtNode(a, b, c, d); //창을 열고 다음 노드로 넘김 -> 닫는 버튼을 눌러야 가게 하고싶다.
  };

  const setDice2 = () => {
    //모달 닫는 버튼 누를때
    setModalVisible(!modalVisible);
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

            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                backdropColor="snow"
                backdropOpacity={1}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "black",
                    position: "absolute",
                    justifyContent: "center",
                    opacity: 0.77,
                    borderRadius: 20,
                  }}
                ></View>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>나온 숫자는</Text>
                    <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        backgroundColor: "#2196F3",
                      }}
                      onPress={() => {
                        setDice2();
                      }}
                    >
                      <Text style={styles.textStyle}>계속</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
            </View>
            <Text>{taleSpacing}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.BottomArea}>
        <View style={styles.buttonbox}>{buttonList2}</View>
      </View>
    </SafeAreaView>
  );
}
// 아이보리색 : #efeeee
const styles = StyleSheet.create({
  master: {
    flex: 1,
    backgroundColor: "#121212",
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
    color: "snow",
  },
  uiNum: {
    fontSize: 30,
    fontWeight: "bold",
    color: "snow",
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
    flex: 3,
  },
  TouchableOpacityDesign: {
    borderRadius: 10, //테투리 설정
    //backgroundColor: "#282825", #BB86F//버튼 색깔, 보라색
    margin: 2, //버튼 사이 간격
    marginHorizontal: 15, //버튼 폭
    paddingHorizontal: 30, //버튼 내부 수평
    paddingVertical: 12, //버튼 내부 수직
    borderWidth: 3,
    borderColor: "#F194FF",
    backgroundColor: "#F194FF",
  },
  TouchableOpacityDesign2: {
    borderRadius: 10, //테투리 설정
    //backgroundColor: "#282825", #BB86F//버튼 색깔, 보라색
    margin: 2, //버튼 사이 간격
    marginHorizontal: 15, //버튼 폭
    paddingHorizontal: 30, //버튼 내부 수평
    paddingVertical: 12, //버튼 내부 수직
    borderWidth: 3,
    borderColor: "#282825",
    backgroundColor: "#282825",
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
    color: "snow",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "snow",
  },
  text: {
    fontSize: 20,
    color: "snow",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 0,
    backgroundColor: "snow", //모달 배경색
    borderRadius: 20,
    padding: 120,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
