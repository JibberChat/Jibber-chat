import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface CardProps {
  children: React.ReactNode;
  cardProps?: ViewProps;
}

export default function Card({ children, cardProps }: Readonly<CardProps>) {
  return (
    <View style={styles.card} {...cardProps}>
      {children}
    </View>
  );
}

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    flexDirection: "row",
    alignItems: "center",
  },
});
