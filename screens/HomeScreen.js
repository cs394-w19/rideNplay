import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import AcceptedRides from '../components/AcceptedRides'
import RequestedRides from '../components/RequestedRides'
import { MonoText } from '../components/StyledText';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Icon } from 'react-native-elements'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "My Rides",
    headerRight: (
      <TouchableOpacity><Icon name="add-box"
            type="material"
            color="blue"
            size={30}
            style = {{marginRight: 5}}/>
      </TouchableOpacity>
    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.accepted}><AcceptedRides /></View>
        <View style = {styles.accepted}><RequestedRides /></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  accepted: {
    flex: 1,
  }

});
