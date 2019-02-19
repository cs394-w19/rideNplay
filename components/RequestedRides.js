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
      <View style={styles.textView}><Text style ={{fontSize: 30, fontWeight: 'bold', color: 'black'}}> available rides </Text></View>
      <ScrollView>
        {this.props.rides.map((ride, i) =>

          {
          if(ride.driver == "N/A")
          return <TouchableOpacity key = {i} style = {styles.event} onPress = {() => this.props.clickRide(ride.ride_id)}>
          <RequestedRide
            pickupLoc = {ride.pickupLoc}
            dropoffLoc = {ride.dropoffLoc}
            rideTitle = {ride.ride_id}
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
    marginHorizontal: 12,
    marginTop: 12
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
