import debounce from "lodash.debounce";
import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import Collapsible from "react-native-collapsible";

import Toast from "react-native-toast-message";

import { usePomodoroSettings } from '../hooks/usePomodoroSettings';
import { useTheme } from "../hooks";


export default function Pomodoro() {
    const {assets, colors, sizes} = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const {
  focusTime,
  pauseTime,
  setFocusTime,
  setPauseTime
} = usePomodoroSettings();

  const updateSettings = async (focus: number, pause: number) => {

    // Aqui você chamaria Firebase ou API
    console.log("Salvar no backend", focus, pause);

    Toast.show({
      type: "success",
      text1: "Configuração atualizada",
      text2: `Foco: ${focus} min - Pausa: ${pause} min`
    });
  };

  const debouncedSave = useMemo(
    () =>
      debounce((focus: number, pause: number) => {
        updateSettings(focus, pause);
      }, 1000),
    []
  );

  useEffect(() => {
    debouncedSave(Number(focusTime), Number(pauseTime));
  }, [focusTime, pauseTime]);

  return (
    <ScrollView style={styles.container}>

      {/* ACCORDION */}
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.header}>
        <Text style={styles.title}>🍅 Técnica Pomodoro</Text>
        <Image
            source={assets.arrow}
            style={{marginLeft: sizes.inputPadding, tintColor: colors.icon, transform: [{rotate: '90deg'}]}}
        />
        
      </TouchableOpacity>

      <Collapsible collapsed={!isOpen}>
        <View style={styles.accordionContent}>

          <Text style={styles.paragraph}>
            A <Text style={styles.highlight}>Técnica Pomodoro</Text> é um método de
            gerenciamento de tempo desenvolvido por{" "}
            <Text style={styles.highlight}>Francesco Cirillo</Text>.
          </Text>

          <Text style={styles.paragraph}>
            A técnica consiste em dividir o trabalho em períodos de{" "}
            <Text style={styles.highlight}>25 minutos</Text>, chamados de
            pomodoros.
          </Text>

          <View style={styles.highlight}>
            <Text>
              Pausas frequentes ajudam a manter a mente mais focada,
              produtiva e ágil.
            </Text>
          </View>

          <Text style={styles.footer}>Fonte: Técnica Pomodoro</Text>

        </View>
      </Collapsible>

      {/* INPUTS */}

      <View style={styles.footer}>

        <View style={styles.inputGroup}>
          <Text>Pausa em minutos</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(pauseTime)}
            onChangeText={(value) => setPauseTime(+value)}
            onFocus={() => setIsOpen(false)}
          />

          <Text style={styles.helper}>
            Defina as pausas entre as tarefas
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text>Tempo de foco</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(focusTime)}
            onChangeText={(value) => setFocusTime(+value)}
            onFocus={() => setIsOpen(false)}
          />

          <Text style={styles.helper}>
            Defina o tempo máximo de foco
          </Text>
        </View>

      </View>

      <Toast />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    width: "100%",
    alignSelf: "center",
    //backgroundColor: '',
    padding: 24,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8
  },

  accordionContent: {
    backgroundColor: '#FEFEFE',
    marginTop: 16,
    borderRadius: 8
  },

  title: {
    color: "#d64545",
    marginTop: 0,
    fontSize: 26,
    fontWeight: "bold",
  },

  paragraph: {
    color: "#333",
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },

  highlight: {
    backgroundColor: "#fff3f3",
    borderLeftWidth: 4,
    borderLeftColor: "#d64545",
    padding: 15,
    marginTop: 20,
    borderRadius: 6,
    marginVertical: 16,
    marginLeft: 8,
    marginRight: 8
  },

  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "#777",
    margin: 16
  },

  inputGroup: {
    flex: 1
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },

  helper: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    marginBottom: 8
  }

});