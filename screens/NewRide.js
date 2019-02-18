import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class NewRide extends React.Component {
  static navigationOptions = {
    title: 'New Ride',
  };

  render() {
    return (
      <View style={styles.container}>
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
