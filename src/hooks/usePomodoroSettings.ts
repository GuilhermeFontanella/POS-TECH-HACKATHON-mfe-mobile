import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { getPomodoroSettings, updatePomodoroSettings } from "../service/pomodoro.service";


export const usePomodoroSettings = () => {

  const [focusTime, setFocusTime] = useState(25);
  const [pauseTime, setPauseTime] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getPomodoroSettings();

      setFocusTime(settings.focusTime);
      setPauseTime(settings.pauseTime);

    } catch (err) {
      console.log("Erro ao carregar settings", err);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSave = useMemo(
    () =>
      debounce(async (focus: number, pause: number) => {
        await updatePomodoroSettings(focus, pause);
      }, 1000),
    []
  );

  useEffect(() => {
    if (!loading) {
      debouncedSave(focusTime, pauseTime);
    }
  }, [focusTime, pauseTime]);

  return {
    focusTime,
    pauseTime,
    setFocusTime,
    setPauseTime,
    loading
  };
};