import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RequestedRide from './RequestedRide'

export default class RequestedRides extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        {this.props.rides.map((ride, i) =>

          {
          if(ride.driver === "N/A")
          return <TouchableOpacity key = {i} style = {styles.event} onPress = {() => this.props.clickRide(ride.ride_id,ride.ride_name)}>
          <RequestedRide
            pickupLoc = {ride.pickupLoc}
            dropoffLoc = {ride.dropoffLoc}
            rideTitle = {ride.ride_name}
            rideDesc = {ride.ride_desc}
            parent = {ride.submitter_id}
          />
          </TouchableOpacity>
          }
        )}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  event: {
    marginTop: 6,
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textView: {
    backgroundColor: 'white',
    width: '100%',
    left: 0,
    height: 35
  }

});
