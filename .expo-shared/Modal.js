import Modal from "react-native-modal";
import React from "react";
import { View } from "react-native";

const Modal = ({ show, onClose, children }) => {
  <Modal isVisible={show} onBackdropPress={onClose}>
    <View style={this.style.modal_container}>{children}</View>
  </Modal>;
};

export default Modal;
