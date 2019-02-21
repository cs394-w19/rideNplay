import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { PickupButton } from "../components/pickup_button";
import { DropoffButton } from "../components/drop-off_button";
import { PickupDateButton } from "../components/pickup_date_button";
import { PickupTimeButton } from "../components/pickup_time_button";
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

export default class NewRide extends React.Component {
  static navigationOptions = {
    title: 'New Ride',
  };
  constructor(props) {
    // Required step: always call the parent class' constructor
    super(props);

    // Set the state directly. Use props if necessary.
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,}
    }
  }


  onRegionChange(region) {
    this.setState({ region });
}

  render() {
    return (
      <View style={styles.container}>
          <MapView
          style={{height:"50%", top: 0}}
          region={this.state.region}
          onRegionChange={() => this.onRegionChange()}
        />
        <PickupButton style = {{marginTop: 40}}/>
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
