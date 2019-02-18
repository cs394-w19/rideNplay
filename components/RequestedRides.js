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
          <RequestedRide
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
