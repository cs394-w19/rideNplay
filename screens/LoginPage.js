import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../components/LoginScreen"


const AppStackNavigator = createStackNavigator({
  LoginScreen: {screen: LoginScreen}
})

const App = createAppContainer(AppStackNavigator);
/*
class App extends React.Component {
  render(){
    return (
      <AppStackNavigator />
    );
  }
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;