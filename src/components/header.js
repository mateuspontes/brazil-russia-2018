import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Header = props => (
  <View style={styles.container__header}>
    <Text style={styles.container__header__text}>Brasil 🇧🇷</Text>
    <Text style={styles.container__header__content}>
      Campanha da Seleção Brasileira na copa da Rússia 2018
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container__header: {
    height: 120
  },
  container__header__text: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: -0.5,
    marginBottom: 8
  },
  container__header__content: {
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.5,
    color: "#666"
  }
});

export default Header;
