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
  state = {
    Arides: [["test"]],
    Rrides: [["test"], ["test2"]]
  }

  static navigationOptions = {
    headerTitle: "My Rides",
  };

  componentWillMount() {
    // get from firebase, load to STATE
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.accepted}><AcceptedRides rides = {this.state.Arides} /></View>
        <View style = {styles.accepted}><RequestedRides rides = {this.state.Rrides} /></View>
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
