import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const SDE_URL = "https://sde.cidadeverde.com.br";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jogos: {},
      isReady: false
    };
  }
  componentWillMount() {
    this.loadJogos();
  }

  async loadJogos() {
    const response = await fetch(`${SDE_URL}/jogos/2/time/Brasil`)
      .then(response => response.json())
      .then(data => {
        this.setState({ jogos: data, isReady: true });
      })
      .catch(error => {
        console.error(error);
      });
  }

  parseData(data) {
    const data_jogo = new Date(data);
    return (
      data_jogo
        .getUTCDate()
        .toString()
        .padStart(2, "0") +
      "/" +
      (data_jogo.getUTCMonth() + 1).toString().padStart(2, "0")
    );
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    const { jogos } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.container__header}>
          <Text style={styles.text}>Brasil 🇧🇷</Text>
          <Text style={styles.content}>
            Campanha da Seleção Brasileira na copa da Rússia 2018
          </Text>
        </View>

        <View style={styles.container__jogos}>
          {jogos.map((item, i) => {
            const mandante_escudo = `${SDE_URL}${item.mandante.escudo}`;
            const visitante_escudo = `${SDE_URL}${item.visitante.escudo}`;

            const info_jogo = item.rodada ? item.rodada : item.fase;

            return (
              <View key={i} style={styles.container__jogo}>
                <View style={styles.container__jogos__fase}>
                  <Text style={styles.container__jogos__fase__text}>
                    {info_jogo}
                  </Text>
                </View>
                <Text style={styles.container__jogos__placar}>
                  <Image
                    style={styles.container__jogos__escudo}
                    source={{ uri: mandante_escudo }}
                  />
                  <View style={styles.container__jogos__text}>
                    <Text style={styles.container__jogos__text__placar}>
                      {item.mandante.sigla} {item.placar_mandante} x{" "}
                      {item.placar_visitante} {item.visitante.sigla}
                    </Text>
                  </View>
                  <Image
                    style={styles.container__jogos__escudo}
                    source={{ uri: visitante_escudo }}
                  />
                </Text>
                <Text style={styles.container__jogos__info}>
                  {this.parseData(item.data)} - {item.hora} | {item.estadio}
                </Text>
              </View>
            );
          })}
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
  container__header: {
    height: 120
  },
  container__jogos: {
    flex: 2,
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20
  },
  container__jogo: {
    marginBottom: 30
  },
  container__jogos__fase: {
    width: 80,
    padding: 4,
    backgroundColor: "#f6f6f6",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 10
  },
  container__jogos__fase__text: {
    color: "#444",
    textAlign: "center",
    fontSize: 12,
    letterSpacing: -0.5
  },
  container__jogos__text: {
    marginLeft: 5,
    marginRight: 5,
    alignSelf: "center",
    justifyContent: "center"
  },
  container__jogos__text__placar: {
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: "center",
    letterSpacing: -0.3
  },
  container__jogos__escudo: {
    alignSelf: "center",
    justifyContent: "center",
    width: 30,
    height: 30
  },
  container__jogos__info: {
    alignSelf: "center",
    marginTop: 5,
    fontSize: 12,
    color: "#666",
    letterSpacing: -0.2
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: -0.5,
    marginBottom: 8
  },
  content: {
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.5,
    color: "#666"
  }
});
