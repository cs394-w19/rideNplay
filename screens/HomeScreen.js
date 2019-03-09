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
  Dimensions,
  YellowBox
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { WebBrowser } from 'expo';
import AcceptedRides from '../components/AcceptedRides'
import RequestedRides from '../components/RequestedRides'
import { MonoText } from '../components/StyledText';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { SearchBar } from 'react-native-elements'
import AcceptedRideDetail from '../components/AcceptedRideDetail'
import RequestedRideDetail from '../components/RequestedRideDetail'
import Colors from "../constants/Colors";
import { NavigationEvents } from  'react-navigation'
import RequestRidePic  from '../constants/request.png';



let firebase = require("firebase");
// let config = {
//     apiKey: "AIzaSyDpsRarS_gg94oXh6QnracvPytegM5FV7Y",
//     authDomain: "ridenplay-50868.firebaseapp.com",
//     databaseURL: "https://ridenplay-50868.firebaseio.com",
//     projectId: "ridenplay-50868",
//     storageBucket: "",
//     messagingSenderId: "851433543145"
//   };
//   firebase.initializeApp(config);

export default class HomeScreen extends React.Component {
  state = {
    Arides: [{id: "1", title: 'test'}, {id: "2", title: 'test2'}],
    Rrides: [{id: "3", title: 'test'}, {id: "4", title: 'test2'}],
    currentRideID: '',
    currentRideName: '',
    all_rides: [{}],
    tabStuff: {
    index: 0,
    routes: [
      { key: 'myRides', title: 'My Rides' },
      { key: 'availableRides', title: 'Available Rides' },
    ],
    search: '',
    }
  };


    updateSearch = search => {
        this.setState({ search });
    };

    static navigationOptions = ({ navigation }) => {
      const {params = {}} = navigation.state;
      const title = navigation.getParam('rideName') + " details";
      if (navigation.getParam('rideID')){
      return {
        headerTitle: title,
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
          headerTitle: "Home",
        }
      }

    };

  componentWillMount() {
    if(this.state.currentRideID !== ''){
      this.props.navigation.setParams({ rideID: true, rideName: this.state.currentRideID, handle: this.clearID});
    }
    else {
      this.props.navigation.setParams({ rideID: false, handle: this.clearID});
    }

    // get rides from Firebase, load to STATE
    return firebase.database().ref('Rides/').once('value').then(snapshot => {
      const rides = snapshot.val();
      newRides = Object.values(rides);
      keys =  Object.keys(rides);
      console.log(keys);
      this.setState({all_rides: newRides});
      this.setState({rideDictionary: rides});
      this.setState({rideKeys: keys});
    })
  }

  clickRide = (id, name) => {
    this.setState({currentRideID: id});
    this.props.navigation.setParams({ rideID: true, rideName: name, handle: this.clearID });
  };

  clearID = () => {
    this.setState({currentRideID: ''});
    this.props.navigation.setParams({ rideID: false, });
    return firebase.database().ref('Rides/').once('value').then(snapshot => {
      const rides = snapshot.val();
      newRides = Object.values(rides);
      keys =  Object.keys(rides);
      this.setState({all_rides: newRides});
      this.setState({rideDictionary: rides});
      this.setState({rideKeys: keys})

    })
  }

  renderNewRideButton(){
    if(Array.isArray(this.state.all_rides) && this.state.all_rides[0] === {}){
      console.log(this.state.all_rides);
      return <TouchableOpacity onPress={() => this.props.navigation.navigate('NewRide')} style={{    justifyContent: 'center',
          alignItems: 'center'}}>
      <Image source={RequestRidePic} style={{marginBottom:"40%"}}/>
      </TouchableOpacity>}
      else{return null}
  }


  render() {

      const { search } = this.state;



      const firstRoute = () =>
        <View style = {styles.accepted}>
          <AcceptedRides rides = {this.state.all_rides}
                        keys = {this.state.rideKeys}
                       clickRide = {this.clickRide}/>
          {this.renderNewRideButton()}
        </View>;


      const secondRoute = () =>
        <View style = {styles.accepted}>
          <RequestedRides rides = {this.state.all_rides} keys = {this.state.rideKeys}
                          clickRide = {this.clickRide}/>
        </View>;


      const routes = this.state.tabStuff.routes;
      if(this.state.currentRideID === ''){

        return <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.componentWillMount()}
        />
        <SearchBar
            placeholder="Enter Drop Off Location"
            onChangeText={this.updateSearch}
            value={search}
            containerStyle={styles.topNavBarContainer}
            inputContainerStyle={styles.searchInput}
        />
        <TabView
          navigationState={this.state.tabStuff}
          renderScene={SceneMap({
          myRides: firstRoute,
          availableRides: secondRoute,
          })}
          onIndexChange={index => this.setState({ tabStuff: {index, routes} })}
          initialLayout={{ width: Dimensions.get('window').width }}
          />

        </View>
      }
      else if(this.state.rideDictionary[this.state.currentRideID].driver !== 'N/A'){
        return <View>
        <AcceptedRideDetail ride = {this.state.rideDictionary[this.state.currentRideID]}/>
        <NavigationEvents
          onWillFocus={() => this.componentWillMount()}
        />
        </View>
      }
      else {
        return <View>
        <RequestedRideDetail goBack = {this.clearID} ride = {this.state.rideDictionary[this.state.currentRideID]}/>
        <NavigationEvents
          onWillFocus={() => this.componentWillMount()}
        />
        </View>
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
      // TODO: fix padding for rides
     // paddingBottom: '20%'
    // backgroundColor:"#00BFD8",
  },
  topNavBarContainer: {
    backgroundColor:"#00BFD8",
    borderWidth: 0,
    shadowColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  searchInput: {
    backgroundColor: '#fff'
  }

});
