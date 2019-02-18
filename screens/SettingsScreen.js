import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Page 3',
  };

  render() {
    return (
      <View style = {styles.container}>
        <Text> Test </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
