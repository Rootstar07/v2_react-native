import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from "react-native";
import data from "./nodesjson.json";
import Switch from "expo-dark-mode-switch";
import { AlwaysOpen } from "./AlwaysOpen.js";
import Toast from "react-native-fast-toast";

//아이콘
import { MaterialCommunityIcons } from "@expo/vector-icons";

//노랑 경고창 무시
import { LogBox } from "react-native";
import { color } from "react-native-reanimated";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

var CrossRoad = data.nodesjson;
var ModalList = data.list;

var changedHP = 0;
var changedPsy = 0;
var changedBullet = 0;
var changedstory = "";
var newModalList = [];

var spacing = `

  `;
var taleSpacing = `

















`;
var i = 0;
var feedback = "";
var reflist = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const rellist = [
  {
    id: 0,
    value: 0,
  },
  {
    id: 0,
    value: 0,
  },
  {
    id: 0,
    value: 0,
  },
  {
    id: 0,
    value: 0,
  },
  {
    id: 0,
    value: 0,
  },
  {
    id: 0,
    value: 0,
  },
  {
    id: 0,
    value: 0,
  },
  {
    id: 0,
    value: 0,
  },
];

export default function App() {
  const [toptext, setTopText] = useState(CrossRoad[0].title);
  const [PressedButtonID, setPressedButtonID] = useState(0);
  const [HP, setHP] = useState(10);
  const [Psy, setPsy] = useState(10);
  const [Bullet, setBullet] = useState(0);
  const [id, setID] = useState();

  //다크모드 버튼
  const [value, setValue] = React.useState(true);
  //다크모드관리
  const [daynightMaster, setDayNightMaster] = useState("#121212");
  const [daynighttext, setDayNightText] = useState("#efeeee");
  //모달 다크모드
  const [daynightmodalmaster, setdaynightmodalmaster] = useState("#282825");
  const [daynightmodaltext, setDayNightModalText] = useState("#bbb");

  const scrollViewRef = useRef();

  let UID123_object = {
    name: 'Chris2',
    age: 30,
    traits: { hair: 'brown', eyes: 'brown' },
  };

  const save = async () => {
    try {
      await AsyncStorage.setItem("CurrnetID:key", "123"); //string 말고 다른 값을 저장해야한다.
    } catch (error) {
      // Error saving data
    }
  };

  const load = async () => {
    try {
      const value = await AsyncStorage.getItem("UID123");
      if (value !== null) {
        alert(value)
      };
    } catch (error) {
      // Error retrieving data
    }
  };

  const StartGame = () => {
    //배열을 저장
    AsyncStorage.setItem('UID123', JSON.stringify(UID123_object))

    SetButtonList2(
      CrossRoad[0].options.map((
        name //name이 TextNodes[0].options가 되는 기적!
      ) => (
        <TouchableOpacity
          style={styles.ButFate}
          key={name.buttonID}
          onPress={() =>
            NeXtNode(name.nextID, name.buttonID, name.setUI, name.isFate)
          } //배열 안의 오브젝트라도 손쉽게 다룰수있게 되었다.
        >
          <Text style={styles.fateButFont}>{name.text}</Text>
        </TouchableOpacity>
      ))
      //12.26 버튼이 문제가 아니라 SetPressedButtonID(여기)가 문제였다. 왜일까?
    );
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  const manageModalrel = (isrel) => {
    if (isrel[0] === true) {
      makeNewModalList(isrel[1], isrel[2]);

      if (isrel[2] > 0) {
        toast.show(ModalList[isrel[1]].name + "과의 친밀도가 늘었어요.");
      } else if (isrel[2] < 0) {
        toast.show(ModalList[isrel[1]].name + "과 친밀도가 줄었어요.");
      } else {
        toast.show(ModalList[isrel[1]].name + "가 관계도에 추가되었어요.");
      }
    }
  };

  const makeNewModalList = (ID, value) => {
    newModalList = [
      ...newModalList,
      { name: ModalList[ID].name, value: value, key: ID },
    ];

    if (reflist[ID] < ModalList[ID].maxStep) {
      reflist[ID] = reflist[ID] + value;
      rellist[ID].value = reflist[ID];
    }

    // 1. 오브젝트 중복제거
    let uniqueList = Array.from(
      newModalList.reduce((m, t) => m.set(t.key, t), new Map()).values()
    );

    setModalRelList(
      uniqueList.map((list) => (
        <View>
          <Text
            style={{
              color: "#bbb",
              fontSize: 20,
              padding: 30,
              backgroundColor: "#121212",
              borderRadius: 10,
              margin: 7,
            }}
          >
            {list.name}: {reflist[list.key]}
          </Text>
        </View>
      ))
    );
  };

  const onSetPage = (a, isfate, chosenText) => {

    if (isfate == 1) {
      feedback = `당신은 ${i}의 피해를 입었습니다...`;
    } else if (isfate == 0) {
      feedback = "";
      i = "";
    }
    changedstory =
      changedstory +
      spacing +
      "-> " +
      chosenText +
      spacing +
      CrossRoad[a].text +
      spacing +
      feedback +
      spacing +
      spacing;
    setTopText(CrossRoad[a].title);
    setDownText(changedstory);
    manageModalrel(CrossRoad[a].rel);

    scrollViewRef.current.scrollToEnd({ animated: true }); //스크롤 관리
    //버튼생성

    SetButtonList2(
      CrossRoad[a].options.map((name) => (
        <TouchableOpacity
          style={[
            name.RelBut[0] == true
              ? rellist[name.RelBut[1]].value > name.RelBut[2]
                ? styles.ButRelT
                : styles.ButRelF //세부 판정: 가능할때 불가능할때 색 변화
              : name.isFate == true
                ? styles.ButFate
                : styles.ButBasic,
          ]}
          key={name.buttonID}
          onPress={() => {
            if (name.RelBut[0] === true) {
              if (rellist[name.RelBut[1]].value > name.RelBut[2]) {
                NeXtNode(
                  name.nextID,
                  name.buttonID,
                  name.setUI,
                  name.isFate,
                  name.leaveToFate,
                  name.text
                ),
                  toast.show("선택지가 열렸어요", {
                    style: { backgroundColor: "#61Bfad" },
                  });
              } else {
                toast.show("친밀도가 부족해요", {
                  style: { backgroundColor: "#e54b4b" },
                });
              }
            } else {
              if (name.isFate == true) {
                i = getRandomInt(name.range[0], name.range[1]);
              }
              NeXtNode(
                name.nextID,
                name.buttonID,
                name.setUI,
                name.isFate,
                name.leaveToFate,
                name.text
              );
            }
          }}
        >
          <Text
            style={[
              name.RelBut[0] === true
                ? rellist[name.RelBut[1]].value > name.RelBut[2]
                  ? styles.relButFontT
                  : styles.relButFontF
                : name.isFate == 1
                  ? styles.fateButFont
                  : styles.basicButFont,
            ]}
          >
            <MaterialCommunityIcons
              name={[
                name.RelBut[0] === true
                  ? rellist[name.RelBut[1]].value > name.RelBut[2]
                    ? "lock-open-variant"
                    : "lock"
                  : name.isFate == 1
                    ? "dice-multiple-outline"
                    : "arrow-right",
              ]}
              size={22}
              color="snow"
            />
            {`  `}
            {name.text}
          </Text>
        </TouchableOpacity>
      ))
    );
  };

  const NeXtNode = (nextID, nowID, UIdata, isfate, leaveToFate, chosenText) => {
    if (isfate == 0) {
      setPressedButtonID(nowID);
      onSetPage(nextID, isfate, chosenText);
      onSetUI(UIdata.setHP, UIdata.setPsy, UIdata.setBullet);
    } else if (isfate == 1) {
      setPressedButtonID(nowID);
      onSetPage(nextID, isfate, chosenText);
      if (leaveToFate == 1) {
        onSetUI(i, 0, 0);
      } else if (leaveToFate == 2) {
        onSetUI(0, i, 0);
      } else if (leaveToFate == 3) {
        onSetUI(0, 0, i);
      }
    }
  };

  const onSetUI = (hp, psy, bullet) => {
    changedHP = changedHP + hp;
    changedPsy = changedPsy + psy;
    changedBullet = changedBullet + bullet;
    var nowHp = setHP(HP + changedHP);
    var nowPsy = setPsy(Psy + changedPsy);
    var nowBullet = setBullet(Bullet + changedBullet);
  };

  const [buttonList2, SetButtonList2] = useState([
    <TouchableOpacity onPress={StartGame}>
      <View style={styles.startbutton}>
        <Text style={styles.basicButFont}>시작하기</Text>
      </View>
    </TouchableOpacity>,
  ]);

  const [modalrellist, setModalRelList] = useState([]);

  const [downtext, setDownText] = useState([CrossRoad[0].text]);

  const adminDayNight = (value) => {
    setValue(value);
    if (value == true) {
      //darkmode 켬
      setDayNightMaster("#121212"); // 기본 배경
      setDayNightText("#bbb"); // 기본 텍스트
      setdaynightmodalmaster("#282825"); // 모달 배경
      setDayNightModalText("#bbb"); // 모달 텍스트
    } else {
      //darkmode 끔
      setDayNightMaster("snow"); // 기본 배경
      setDayNightText("#121212"); // 기본 텍스트
      setdaynightmodalmaster("#bbb"); // 모달 배경
      setDayNightModalText("#121212"); //모달 텍스트
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: daynightMaster }}>
      <View style={styles.safeArea}></View>
      <View style={styles.TopArea}>
        <View style={styles.uiContainer}>
          <Switch value={value} onChange={(value) => adminDayNight(value)} />
        </View>
      </View>
      <View style={styles.MiddleArea}>
        <View style={styles.titlebox}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: daynighttext,
              margin: 30,
            }}
          >
            {toptext}
            {id}
          </Text>
        </View>
        <View style={styles.textbox}>
          <ScrollView ref={scrollViewRef}>
            <Text
              style={{
                fontSize: 20,
                color: daynighttext,
              }}
            >
              {downtext}
            </Text>

            <Button title={"저장"} onPress={save}></Button>
            <Button title={"불러오기"} onPress={load}></Button>
            <Text>{taleSpacing}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.BottomArea}>
        <View style={styles.buttonbox}>{buttonList2}</View>
      </View>
      <AlwaysOpen
        ui_1={HP}
        ui_2={Psy}
        ui_3={Bullet}
        modalbackground={daynightmodalmaster}
        modaltext={daynightmodaltext}
        modallist={modalrellist}
      />
      <Toast ref={(ref) => (global["toast"] = ref)} placement="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 0.7,
  },

  TopArea: {
    flexDirection: "row",
    flex: 0.7,
  },
  uiContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  MiddleArea: {
    flex: 7,
    alignItems: "flex-end",
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
    flex: 4.5,
  },

  ButRelT: {
    //관계 선택지 활성화
    borderRadius: 10, //테투리 설정
    margin: 2, //버튼 사이 간격
    marginHorizontal: 15, //버튼 폭
    paddingHorizontal: 15, //버튼 내부 수평
    paddingVertical: 12, //버튼 내부 수직
    borderWidth: 3,
    borderColor: "rgba(97, 191, 173, 1)",
    backgroundColor: "rgba(97, 191, 173, 1)",
  },

  ButRelF: {
    //관계 선택지 비활성화
    borderRadius: 10, //테투리 설정
    margin: 2, //버튼 사이 간격
    marginHorizontal: 15, //버튼 폭
    paddingHorizontal: 15, //버튼 내부 수평
    paddingVertical: 12, //버튼 내부 수직
    borderWidth: 3,
    borderColor: "#e54b4b",
    backgroundColor: "#e54b4b",
    color: "snow",
  },

  ButFate: {
    //주사위 버튼
    borderRadius: 10, //테투리 설정
    margin: 2, //버튼 사이 간격
    marginHorizontal: 15, //버튼 폭
    paddingHorizontal: 15, //버튼 내부 수평
    paddingVertical: 12, //버튼 내부 수직
    borderWidth: 3,
    borderColor: "#585CDE",
    backgroundColor: "#585CDE",
  },

  ButBasic: {
    //일반 버튼
    borderRadius: 10, //테투리 설정
    margin: 2, //버튼 사이 간격
    marginHorizontal: 15, //버튼 폭
    paddingHorizontal: 15, //버튼 내부 수평
    paddingVertical: 12, //버튼 내부 수직
    borderWidth: 3,
    borderColor: "rgba(40,40,37,1)",
    backgroundColor: "rgba(40,40,37,1)",
  },
  startbutton: {
    alignItems: "center",
    justifyContent: "center",
  },

  relButFontT: {
    //관계 버튼 활성화
    fontSize: 17,
    color: "snow",
  },

  relButFontF: {
    //관계 버튼 비활성화
    fontSize: 17,
    color: "snow",
  },

  fateButFont: {
    //주사위 버튼 폰트
    fontSize: 17,
    color: "snow",
  },

  basicButFont: {
    //일반 버튼 폰트
    fontSize: 17,
    color: "#bbb",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
