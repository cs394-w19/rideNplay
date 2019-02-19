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
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}><Text style ={{fontSize: 30, fontWeight: 'bold', color: 'black'}}> my rides </Text></View>
        <ScrollView>
        {this.props.rides.map((ride, i) =>
          {
          let component = <TouchableOpacity key = {i} style = {styles.event} onPress = {() => this.props.clickRide(ride.ride_id)} >
                            <Ride
                              id = {ride.ride_id}
                              rideTitle = {Object(ride).ride_id}
                            />
                          </TouchableOpacity>
          if(ride.driver != 'N/A')
            return component
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
    backgroundColor: '#fcf3b8',
  },
  textView: {
    backgroundColor: '#fcf3b8',
    width: '100%',
    left: 0,
    height: 35
  }

});
