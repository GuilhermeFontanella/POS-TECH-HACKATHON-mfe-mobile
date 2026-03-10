import { useEffect, useRef, useState } from "react";
import { usePomodoroSettings } from "./usePomodoroSettings";
import { Alert } from "react-native";

export const usePomodoroTimer = () => {

  const { focusTime, pauseTime, loading } = usePomodoroSettings();

  const [focusRemaining, setFocusRemaining] = useState(0);
  const [pauseRemaining, setPauseRemaining] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // quando carregar do firebase
  useEffect(() => {
    if (!loading) {
      setFocusRemaining(focusTime * 60);
      setPauseRemaining(pauseTime * 60);
    }
  }, [focusTime, pauseTime, loading]);

  const startFocusTime = () => {
    clearTimer();

    intervalRef.current = setInterval(() => {
      setFocusRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();

          Alert.alert(
            "Pomodoro concluído 🍅",
            "Hora de fazer uma pausa!",
            [
              {
                text: "Iniciar pausa",
                onPress: startPauseTime
              },
              {
                text: "Depois",
                style: "cancel"
              }
            ]
          );

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startPauseTime = () => {
    clearTimer();

    intervalRef.current = setInterval(() => {
      setPauseRemaining((prev) => {
        if (prev <= 1) {

          Alert.alert(
            "Pomodoro concluído 🍅",
            "A moleza acabou!!!",
            [
              {
                text: "Iniciar próximo período de foco",
                onPress: startFocusTime
              },
              {
                text: "Depois",
                style: "cancel"
              }
            ]
          );

          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetFocusTime = () => {
    clearTimer();
    setFocusRemaining(focusTime * 60);
  };

  const resetPauseTime = () => {
    clearTimer();
    setPauseRemaining(pauseTime * 60);
  };

  const format = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return {
    focusRemaining,
    pauseRemaining,
    startFocusTime,
    startPauseTime,
    resetFocusTime,
    resetPauseTime,
    format,
    loading
  };
};