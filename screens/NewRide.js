import React from 'react';
import { ScrollView,
         StyleSheet,
         View,
         Text,
         TextInput,
         Button,
         TouchableOpacity,
         Modal,
         TouchableHighlight,
         Dimensions,
         Alert,
         DatePickerIOS } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {PickupButton} from "../components/pickup_button";
import { DropoffButton } from "../components/drop-off_button";
import { PickupDateButton } from "../components/pickup_date_button";
import { PickupTimeButton } from "../components/pickup_time_button";
import { RideDetails } from "../components/RideDetails";
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GooglePlacesInput from '../components/GooglePlacesInput';

let firebase = require("firebase");

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class NewRide extends React.Component {
  static navigationOptions = {
    title: 'New Ride',
  };

  state = {
    viewPickupModal: false,
    viewDropoffModal: false,
    pickupTitle: 'Pickup Location',
    dropoffTitle: 'Dropoff Location',
    region: {
      latitude: 42.045273,
      longitude: -87.686790,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0221,},
    pickupGeo: {},
    dropoffGeo: {},
    pickupMarker: null,
    dropoffMarker: null,

    pickupDetails: '',
    dropoffDetails: '',
    chosenDate: new Date(),
    rideName:"",
    childName:"",
    selectedDate: null,
    selectedTime: null

  }

  setSelectedTime = (time) => {
    this.setState({selectedTime: time})
    console.log(time)
  }

  setSelectedDate = (date) => {
    this.setState({selectedDate: date})
    console.log(date)
  }


  savePickupDetails(det) {
    // this.setState({pickupDetails: det})
    console.log(det)
  }

  saveDropoffDetails = (det) => {
    this.setState({dropoffDetails: det})
  }


  onRegionChange(region) {
    this.setState({ region });
  }

  viewPickupModal() {
    this.setState({viewPickupModal: !this.state.viewPickupModal})
  }

  confirmPickupLocation(loc, geo) {
    lat = geo["lat"]
    long = geo["lng"]
    newMarker = {
      key: '1',
      coordinate: {latitude: lat, longitude: long},
      title: "Pickup Location",
      description: loc,
    }
    this.setState({viewPickupModal: !this.state.viewPickupModal, pickupTitle: loc, pickupMarker: newMarker ,pickupGeo: geo})
  }

  viewDropoffModal() {
    this.setState({viewDropoffModal: !this.state.viewDropoffModal})
  }

  setChildName(child) {
    this.setState({childName: child});
  }

  confirmDropoffLocation(loc, geo) {
    lat = geo["lat"]
    long = geo["lng"]
    newMarker = {
      key: '2',
      coordinate: {latitude: lat, longitude: long},
      title: "Dropoff Location",
      description: loc,
    },
    this.setState({viewDropoffModal: !this.state.viewDropoffModal, dropoffMarker: newMarker, dropoffTitle: loc,  dropoffGeo: geo})
  }

  // submitRide(ride_name, ride_desc, submitter_id, child_user_id, pickup_loc, dropoff_loc, pickup_time,driver,rating) {
  submitRide(rideName) {
    if (rideName=="") {
      console.log("Ride incomplete; trigger alert");
      //   Alert.alert(
      //   'Invalid Ride Entry',
      //   'Please submit all fields',
      //   [
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel',
      //     },
      //     {text: 'OK', onPress: () => console.log('OK Pressed')},
      //   ],
      //   {cancelable: false},
      // );

    }
    else {
      console.log("Ride Submitted");
      firebase.database().ref('Rides/').push({
        ride_id:"new_ride",
        ride_desc: ride_desc,
        ride_name:ride_name,
        submitter_id:submitter_id,
        child_id:child_user_id,
        pickup_loc:pickup_loc,
        dropoff_loc:dropoff_loc,
        pickup_time:pickup_time,
        driver:"--",
        rating:"N/A"
      }).then((data) => {
        //success callback
          if (data) {
              console.log(data);
          }
      }).catch((error) => {
        //error callback
        console.log('error ', error);
      })
    }
  }

  renderMarkers(){
    if(this.state.pickupMarker && this.state.dropoffMarker){
      return <View><Marker
        key={this.state.pickupMarker.key}
        coordinate={this.state.pickupMarker.coordinate}
        title={this.state.pickupMarker.title}
        description={this.state.pickupMarker.description}
      />
      <Marker
        key={this.state.dropoffMarker.key}
        coordinate={this.state.dropoffMarker.coordinate}
        title={this.state.dropoffMarker.title}
        description={this.state.dropoffMarker.description}
      /></View>
    }
    else if(this.state.pickupMarker) {
      return <Marker
        key={this.state.pickupMarker.key}
        coordinate={this.state.pickupMarker.coordinate}
        title={this.state.pickupMarker.title}
        description={this.state.pickupMarker.description}
      />
    }
    else if (this.state.dropoffMarker){
      return <Marker
        key={this.state.dropoffMarker.key}
        coordinate={this.state.dropoffMarker.coordinate}
        title={this.state.dropoffMarker.title}
        description={this.state.dropoffMarker.description}
      />
    }
    else return
  }



  renderMap() {
    return (
      <View>
        <MapView
          style={{height: 220, top: 0, marginHorizontal: 5}}
          // initialRegion={this.state.region}
         loadingEnabled = {true}
         loadingIndicatorColor="#666666"
         loadingBackgroundColor="#eeeeee"
         moveOnMarkerPress = {false}
         showsUserLocation={true}
         showsCompass={true}
         showsPointsOfInterest = {false}
         region={this.state.region}
         onRegionChange={() => this.onRegionChange()}>
         {this.renderMarkers()}
        </MapView>
        </View>

      );
  }


  render() {
    return (
      <View style={styles.container}>
        <Modal
           animationType="slide"
           transparent={false}
           visible={this.state.viewPickupModal}>
           <View style={{marginTop: 22}}>
             <View>
               <GooglePlacesInput locationSet = {this.confirmPickupLocation.bind(this)}/>
               <View style = {{alignItems: 'center',  marginTop: '160%'}}>
                <TouchableOpacity onPress = {() => this.confirmPickupLocation()}style = {{position: 'absolute'}}>
                <Text style = {{fontSize: 20, color: 'blue'}}>
                  Confirm
                </Text>
                </TouchableOpacity>
                </View>
             </View>
           </View>
         </Modal>

         <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.viewDropoffModal}>
            <View style={{marginTop: 22}}>
              <View>
                <GooglePlacesInput locationSet = {this.confirmDropoffLocation.bind(this)}/>
                <View style = {{alignItems: 'center',  marginTop: '160%'}}>
                 <TouchableOpacity onPress = {() => this.confirmDropoffLocation()}style = {{position: 'absolute'}}>
                 <Text style = {{fontSize: 20, color: 'blue'}}>
                   Confirm
                 </Text>
                 </TouchableOpacity>
                 </View>
              </View>
            </View>
          </Modal>

        {this.renderMap()}
        <RideDetails />
        <PickupButton title = {this.state.pickupTitle} viewModal = {this.viewPickupModal.bind(this)} save = {this.savePickupDetails}/>
        <DropoffButton title = {this.state.dropoffTitle} viewModal = {this.viewDropoffModal.bind(this)}  save = {this.saveDropoffDetails}/>
        <PickupDateButton name="Choose Date" setDate = {this.setSelectedDate}/>
        <PickupTimeButton name="Choose Time" setTime = {this.setSelectedTime}/>


        <TouchableOpacity onPress={this.submitRide(this.state.rideName)} onPress={() => {}} style={styles.submitButton}>
            <View style={styles.centerCol}>
                    <Text style = {{fontSize: 20}}>Submit Ride</Text>
            </View>
        </TouchableOpacity>


      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    shadowColor: "#000000",
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  submitButton:{
      flexDirection: 'row',
      marginHorizontal: 20,
      marginTop: 10,
      width: (WIDTH-40),
      height: 35,
      borderRadius: 2,
      backgroundColor: '#77dd77',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000000",
      elevation: 7,
      shadowRadius: 5,
      shadowOpacity: 1.0
  },

});
