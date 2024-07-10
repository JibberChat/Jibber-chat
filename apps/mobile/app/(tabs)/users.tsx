import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Input placeholder="Search users..." />
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Card>
          <Image
            style={styles.image}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5lS8RvYbx4Bp8uIctHQMUCfI4pGWYjJo9zQ&s"
          />
          <View>
            <Text style={styles.name}>John Doe</Text>
            <Text>
              <View style={styles.status} /> Online
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
});
