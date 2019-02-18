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
import Ride from './Ride.js'

export default class AcceptedRides extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}><Text style ={{color: 'white'}}> My Rides </Text></View>
        <ScrollView>
        {this.props.rides.map((ride, i) =>
          <Ride
            key = {i}
            rideTitle = {ride[0]}
          />
        )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  textView: {
    backgroundColor: 'black',
    justifyContent: 'center',
    height: 30,
    alignItems: 'center'
  }

});
