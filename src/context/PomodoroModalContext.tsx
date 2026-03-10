import React, {createContext, useContext, useState} from "react";

const PomodoroModalContext = createContext<any>(null);

export const PomodoroModalProvider = ({children}: any) => {

  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return (
    <PomodoroModalContext.Provider value={{visible, open, close}}>
      {children}
    </PomodoroModalContext.Provider>
  );
};

export const usePomodoroModal = () => useContext(PomodoroModalContext);