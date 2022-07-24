import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [guessRoundNumber, setGuessRoundNumber] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickNumberHandler(chosenNumber) {
    setUserNumber(chosenNumber);
    setIsGameOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setIsGameOver(true);
    setGuessRoundNumber(numberOfRounds);
  }

  let screen = <StartGameScreen onPickNumber={pickNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        gameOver={gameOverHandler}
        roundsNumber={guessRoundNumber}
      />
    );
  }
  function onStartNewGameHandler() {
    setUserNumber(null);
    setGuessRoundNumber(0);
  }

  if (isGameOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRoundNumber}
        userNumber={userNumber}
        onStartNewGame={onStartNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backGroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: { flex: 1 },
  backGroundImage: { opacity: 0.15 },
});
