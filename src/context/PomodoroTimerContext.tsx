import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {Alert} from "react-native";
import {usePomodoroSettings} from "../hooks/usePomodoroSettings";

const PomodoroTimerContext = createContext<any>(null);

export const PomodoroTimerProvider = ({children}: any) => {
    const {focusTime, pauseTime, loading} = usePomodoroSettings();
    const [focusRemaining, setFocusRemaining] = useState(0);
    const [pauseRemaining, setPauseRemaining] = useState(0);
    const intervalRef = useRef<any>(null);
    const initialized = useRef(false);
    const timerActive = useRef(false);

  useEffect(() => {
        if (loading) return;

        if (!initialized.current) {
            setFocusRemaining(focusTime * 60);
            setPauseRemaining(pauseTime * 60);
            initialized.current = true;
            return;
        }

        if (!timerActive.current) {
            setFocusRemaining(focusTime * 60);
            setPauseRemaining(pauseTime * 60);
        }
    }, [focusTime, pauseTime, loading]);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    timerActive.current = false;
  };

  const startFocusTime = () => {
    clearTimer();
    timerActive.current = true;

    intervalRef.current = setInterval(() => {
      setFocusRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          Alert.alert("Pomodoro concluído 🍅", "Hora de fazer uma pausa!", [{text: "OK"}]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startPauseTime = () => {
    clearTimer();
    timerActive.current = true; // ✅ marca como ativo

    intervalRef.current = setInterval(() => {
      setPauseRemaining((prev) => {
        if (prev <= 1) {
          clearTimer();
          Alert.alert("Pausa finalizada ☕", "Hora de voltar ao foco!", [{text: "OK"}]);
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

  return (
    <PomodoroTimerContext.Provider
      value={{
        focusRemaining,
        pauseRemaining,
        startFocusTime,
        startPauseTime,
        resetFocusTime,
        resetPauseTime,
        format,
      }}
    >
      {children}
    </PomodoroTimerContext.Provider>
  );
};

export const usePomodoroTimer = () => useContext(PomodoroTimerContext);