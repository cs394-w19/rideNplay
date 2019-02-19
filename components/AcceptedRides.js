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
        <View style={styles.textView}><Text style ={{fontSize: 30, fontWeight: 'bold', color: 'black'}}> my rides </Text></View>
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
    justifyContent: 'center',
    backgroundColor: '#fcf3b8',
  },
  textView: {
    backgroundColor: '#fcf3b8',
    width: '100%',
    left: 0,
    height: 35
  }

});
