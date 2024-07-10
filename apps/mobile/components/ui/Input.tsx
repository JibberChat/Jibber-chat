import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function Input(props: Readonly<TextInputProps>) {
  return <TextInput {...props} style={styles.input} />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
});
