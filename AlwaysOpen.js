import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";

export const AlwaysOpen = (props) => {
  const modalizeRef = useRef(null);

  const handleClose = (dest) => {
    if (modalizeRef.current) {
      modalizeRef.current.close(dest);
    }
  };

  const renderContent = () => (
    <View style={s.content}>
      <View style={s.contnet_UI}>
        <View style={s.uiBox}>
          <Text style={s.Num}>{props.ui_1}</Text>
          <Text style={s.Text}>체력</Text>
        </View>
        <View style={s.uiBox}>
          <Text style={s.Num}>{props.ui_2}</Text>
          <Text style={s.Text}>정신</Text>
        </View>
        <View style={s.uiBox}>
          <Text style={s.Num}>{props.ui_3}</Text>
          <Text style={s.Text}>총알</Text>
        </View>
      </View>

      <Text style={s.content__description}>UI2</Text>
    </View>
  );

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={s.content__modal}
      alwaysOpen={85}
      handlePosition="inside"
    >
      {renderContent()}
    </Modalize>
  );
};

const s = StyleSheet.create({
  content: {
    padding: 20,
  },
  contnet_UI: {
    flexDirection: "row",
  },
  uiBox: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
  },
  Num: { fontSize: 35, fontWeight: "bold" },

  content__modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
  },

  content__heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },
});
