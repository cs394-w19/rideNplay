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
import AcceptedRideDetail from '../components/AcceptedRideDetail'

let firebase = require("firebase");
let config = {
    apiKey: "AIzaSyDpsRarS_gg94oXh6QnracvPytegM5FV7Y",
    authDomain: "ridenplay-50868.firebaseapp.com",
    databaseURL: "https://ridenplay-50868.firebaseio.com",
    projectId: "ridenplay-50868",
    storageBucket: "",
    messagingSenderId: "851433543145"
  };
  firebase.initializeApp(config);

export default class HomeScreen extends React.Component {
  state = {
    Arides: [{id: "1", title: 'test'}, {id: "2", title: 'test2'}],
    Rrides: [{id: "3", title: 'test'}, {id: "4", title: 'test2'}],
    currentRideID: '',
    all_rides: [{}],
  }


  static navigationOptions = ({ navigation }) => {
      const {params = {}} = navigation.state;
      if (navigation.getParam('rideID')){
      return {
        headerTitle: "Home",
        headerLeft: (
          <Button
            onPress={() => params.handle()}
            title="<Back"
            color="blue"
          />
        ),
      };
    }
      else {
        return {
          headerTitle: "My Rides",
        }
      }

    };

  componentWillMount() {
    if(this.state.currentRideID != ''){
      this.props.navigation.setParams({ rideID: true, handle: this.clearID});

    }
    else {
      this.props.navigation.setParams({ rideID: false, handle: this.clearID});
    }

    // get rides from Firebase, load to STATE
    return firebase.database().ref('Rides/').once('value').then(snapshot => {
      const rides = snapshot.val();
      newRides = Object.values(rides)
      this.setState({all_rides: newRides});
    })
  }

  clickRide = (id) => {
    this.setState({currentRideID: id})
    this.props.navigation.setParams({ rideID: true, handle: this.clearID });
  }

  clearID = () => {
    this.setState({currentRideID: ''})
    this.props.navigation.setParams({ rideID: false });
  }

  conditionalRender(){
    if(this.state.currentRideID == ''){
      return <View style={styles.container}>
        <View style = {styles.accepted}>
          <AcceptedRides rides = {this.state.all_rides}
                       clickRide = {this.clickRide}/>
        </View>
        <View style = {styles.accepted}>
          <RequestedRides rides = {this.state.Rrides} />
        </View>
      </View>
    }
    else {
      return <Text>Details Page</Text>
    }

  }

  render() {
      if(this.state.currentRideID == ''){
        return <View style={styles.container}>
          <View style = {styles.accepted}>
            <AcceptedRides rides = {this.state.all_rides}
                         clickRide = {this.clickRide}/>
          </View>
          <View style = {styles.accepted}>
            <RequestedRides rides = {this.state.all_rides}
                            clickRide = {this.clickRide}/>
          </View>
        </View>
      }
      else{
        return <AcceptedRideDetail />
      }
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
