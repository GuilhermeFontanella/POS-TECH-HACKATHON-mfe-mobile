import React from "react";
import {Modal, View, StyleSheet, TouchableWithoutFeedback} from "react-native";

import {usePomodoroModal} from "../context/PomodoroModalContext";
import PomodoroDisplay from "./pomodoroDisplay/PomodoroDisplay";

export default function PomodoroModal() {
  const {visible, close} = usePomodoroModal();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={close}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.overlay}>

          {/* evita fechar ao clicar dentro */}
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <PomodoroDisplay />
            </View>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
});