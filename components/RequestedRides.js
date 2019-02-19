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
      <View style={styles.textView}><Text style ={{color: 'white'}}> Available Rides </Text></View>
      <ScrollView>
        {this.props.rides.map((ride, i) =>
          <TouchableOpacity key = {i} style = {styles.event} onPress = {() => this.props.clickRide(ride.id)}>
          <RequestedRide
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
