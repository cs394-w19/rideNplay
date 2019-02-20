import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { PickupButton } from "./pickup_button";
import { DropoffButton } from "./drop-off_button";
import { PickupDateButton } from "./pickup_date_button";
import { PickupTimeButton } from "./pickup_time_button";

export default class NewRide extends React.Component {
  static navigationOptions = {
    title: 'New Ride',
  };

  render() {
    return (
      <View style={styles.container}>
        <PickupButton />
        <DropoffButton />
        <PickupDateButton />
        <PickupTimeButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0
  }

});
