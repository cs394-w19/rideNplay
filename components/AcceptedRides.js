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
        <ScrollView>
        {this.props.rides.map((ride, i) =>
          {
          let component = <TouchableOpacity key = {i} style = {styles.event} onPress = {() => this.props.clickRide(this.props.keys[i],Object(ride).ride_name)} >
                            <Ride
                              rideAge = {ride.pickup_date}
                              id = {ride.ride_id}
                              rideTitle = {Object(ride).ride_name}
                              rideDesc = {ride.ride_desc}
                              driver = {ride.driver}
                            />
                          </TouchableOpacity>
          if(ride.driver != 'N/A')
            return component
        }, this
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
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: "100%"
  },
  textView: {
    backgroundColor: 'white',
    width: '100%',
    left: 0,
    height: 35
  }

});
