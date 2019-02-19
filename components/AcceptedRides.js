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

  press = (id) => {
    this.props.clickRide(id)
    console.log(id)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}><Text style ={{color: 'white'}}> My Rides </Text></View>
        <ScrollView>
        {this.props.rides.map((ride, i) =>
          <TouchableOpacity key = {i} style = {styles.event} onPress = {() => this.props.clickRide(ride.id)} >
          <Ride
            id = {ride.id}
            rideTitle = {ride.title}
          />
          </TouchableOpacity>
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
