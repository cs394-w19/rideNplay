import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "./Screens/LoginScreen"


const AppStackNavigator = createStackNavigator({
  LoginScreen: {screen: LoginScreen}
})

const Application = createAppContainer(AppStackNavigator);

class App extends React.Component {
  render(){
    return (
      <Application />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;