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
    Arides: [{id: "1", title: 'test'}, {id: "2", title: 'test2'}],
    Rrides: [{id: "1", title: 'test'}, {id: "2", title: 'test2'}],
    currentRideID: ''
  }


  static navigationOptions = ({ navigation }) => {
      console.log("the id is: " + navigation.getParam('rideID'))
      const {params = {}} = navigation.state;
      if (navigation.getParam('rideID')){
      return {
        headerTitle: "My Rides",
        headerLeft: (
          <Button
            onPress={() => params.handle()}
            title="Back"
            color="black"
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

    // get from firebase, load to STATE
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
          <AcceptedRides rides = {this.state.Arides}
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
            <AcceptedRides rides = {this.state.Arides}
                         clickRide = {this.clickRide}/>
          </View>
          <View style = {styles.accepted}>
            <RequestedRides rides = {this.state.Rrides} />
          </View>
        </View>
      }
      else{
        return <Text>Details Page</Text>
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
