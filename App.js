import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./src/components/header";
import Game from "./src/components/game";

import { SDE_URL } from "./src/helpers/constants";

export default class App extends Component {
  state = {
    jogos: {},
    isReady: false
  };

  componentWillMount() {
    this.loadJogos();
  }

  async loadJogos() {
    try {
      const response = await fetch(`${SDE_URL}/jogos/2/time/Brasil`);
      const data = await response.json();
      this.setState({ jogos: data, isReady: true });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    const { jogos } = this.state;

    return (
      <View style={styles.container}>
        <Header />

        <View style={styles.container__jogos}>
          {jogos.map((item, i) => <Game item={item} key={i} />)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10
  },
  container__jogos: {
    flex: 2,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20
  }
});
