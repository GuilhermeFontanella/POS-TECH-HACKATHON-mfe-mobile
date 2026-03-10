import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { usePomodoroTimer } from "../../context/PomodoroTimerContext";


const PomodoroDisplay = () => {
  const {
    focusRemaining,
    pauseRemaining,
    startFocusTime,
    startPauseTime,
    resetFocusTime,
    resetPauseTime,
    format
  } = usePomodoroTimer();


  const [isFocusDisabled, setFocusDisabled] = useState(false);
  const [isPauseDisabled, setPauseDisabled] = useState(false);

  const handleStartFocus = () => {
    setFocusDisabled(true);
    setPauseDisabled(false);
    startFocusTime();
  };

  const handleStartPause = () => {
    setPauseDisabled(true);
    setFocusDisabled(false);
    startPauseTime();
  };

  const handleResetFocus = () => {
    setFocusDisabled(false);
    setPauseDisabled(false);
    resetFocusTime();
  };

  const handleResetPause = () => {
    setFocusDisabled(false);
    setPauseDisabled(false);
    resetPauseTime();
  };

  return (
    <View style={styles.container}>

      {/* FOCUS */}

      <Text style={styles.label}>Tempo de foco:</Text>

      <View style={[styles.timerBox, styles.focusBox]}>

        <TouchableOpacity
          disabled={isFocusDisabled}
          style={styles.button}
          onPress={handleStartFocus}
        >
          <Text style={styles.buttonText}>▶</Text>
        </TouchableOpacity>

        <Text style={styles.time}>
          {format(focusRemaining) || "00:00"}
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleResetFocus}
        >
          <Text style={styles.buttonText}>↺</Text>
        </TouchableOpacity>

      </View>

      {/* BREAK */}

      <Text style={[styles.label, { marginTop: 20 }]}>
        Tempo de pausa:
      </Text>

      <View style={[styles.timerBox, styles.pauseBox]}>

        <TouchableOpacity
          disabled={isPauseDisabled}
          style={styles.button}
          onPress={handleStartPause}
        >
          <Text style={styles.buttonText}>▶</Text>
        </TouchableOpacity>

        <Text style={styles.time}>
          {format(pauseRemaining) || "00:00"}
        </Text>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleResetPause}
        >
          <Text style={styles.buttonText}>↺</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20
  },

  label: {
    fontWeight: "bold",
    fontSize: 16
  },

  timerBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    padding: 12,
    borderRadius: 8
  },

  focusBox: {
    backgroundColor: "#c7d2fe"
  },

  pauseBox: {
    backgroundColor: "#e5e7eb"
  },

  time: {
    fontSize: 22,
    fontWeight: "bold"
  },

  button: {
    backgroundColor: "#6366f1",
    padding: 10,
    borderRadius: 6
  },

  resetButton: {
    backgroundColor: "#ef4444"
  },

  buttonText: {
    color: "white",
    fontSize: 18
  }

});

export default PomodoroDisplay;