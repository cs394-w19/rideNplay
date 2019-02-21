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
        longitudeDelta: 0.0421,},

       markers: [
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Best Place",
          description: "This is the best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
          },
          title: "Second Best Place",
          description: "This is the second best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.5230786,
            longitude: -122.6701034,
          },
          title: "Third Best Place",
          description: "This is the third best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
          },
          title: "Fourth Best Place",
          description: "This is the fourth best place in Portland",
        },
      ],
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
          // initialRegion={this.state.region}
         loadingEnabled = {true}
         loadingIndicatorColor="#666666"
         loadingBackgroundColor="#eeeeee"
         moveOnMarkerPress = {false}
         showsUserLocation={true}
         showsCompass={true}
         showsPointsOfInterest = {false}
          region={this.state.region}
          onRegionChange={() => this.onRegionChange()}
        />
        {this.state.markers.map(marker =>
          {return <Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />}
        )}
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
