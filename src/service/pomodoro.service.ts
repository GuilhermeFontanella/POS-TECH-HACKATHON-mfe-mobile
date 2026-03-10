import { doc, getDoc, updateDoc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
const db = getFirestore(app);

const SETTINGS_DOC = "pomodoro";

export interface PomodoroSettings {
  focusTime: number;
  pauseTime: number;
}

export const getPomodoroSettings = async (): Promise<PomodoroSettings> => {
  const ref = doc(db, "settings", SETTINGS_DOC);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const defaultSettings = { focusTime: 25, pauseTime: 5 };
    await setDoc(ref, defaultSettings);
    return defaultSettings;
  }

  return snap.data() as PomodoroSettings;
};

export const updatePomodoroSettings = async (
  focusTime: number,
  pauseTime: number
) => {
  const ref = doc(db, "settings", SETTINGS_DOC);

  await updateDoc(ref, {
    focusTime,
    pauseTime
  });
};