import React from 'react';
import { ScrollView,
         StyleSheet,
         View,
         Text,
         Button,
         TouchableOpacity,
         Modal,
         TouchableHighlight,
         Dimensions,
         Alert } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {PickupButton} from "../components/pickup_button";
import { DropoffButton } from "../components/drop-off_button";
import { PickupDateButton } from "../components/pickup_date_button";
import { PickupTimeButton } from "../components/pickup_time_button";
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GooglePlacesInput from '../components/GooglePlacesInput';

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
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,},
    pickupGeo: {},
    dropoffGeo: {},
     markers: [
      {
        coordinate: {
          latitude: 37.78825,
          longitude: -122.4324,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
      },
    ],

    pickupDetails: '',
    dropoffDetails: ''
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
    this.setState({viewPickupModal: !this.state.viewPickupModal, pickupTitle: loc, pickupGeo: geo})
  }

  viewDropoffModal() {
    this.setState({viewDropoffModal: !this.state.viewDropoffModal})
  }

  confirmDropoffLocation(loc, geo) {
    this.setState({viewDropoffModal: !this.state.viewDropoffModal, dropoffTitle: loc,  dropoffGeo: geo})
  }

  submitRide() {
    console.log("Ride Submitted");
  }

  renderMap() {
    return (
      <View>
        <MapView
          style={{height: 250, top: 0, marginHorizontal: 5}}
          // initialRegion={this.state.region}
         loadingEnabled = {true}
         loadingIndicatorColor="#666666"
         loadingBackgroundColor="#eeeeee"
         moveOnMarkerPress = {false}
         showsUserLocation={true}
         showsCompass={true}
         showsPointsOfInterest = {false}
         region={this.state.region}
         onRegionChange={() => this.onRegionChange()}
        />
        {this.state.markers.map(marker =>
          {return <Marker
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />}
        )}
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
        <PickupButton title = {this.state.pickupTitle} viewModal = {this.viewPickupModal.bind(this)} save = {this.savePickupDetails}/>
        <DropoffButton title = {this.state.dropoffTitle} viewModal = {this.viewDropoffModal.bind(this)}  save = {this.saveDropoffDetails}/>
        <PickupDateButton/>
        <PickupTimeButton/>


        <TouchableOpacity style= {{alignItems: 'center', marginTop: 20,}} onPress={this.submitRide}>
          <Text style = {{fontSize: 20, color: 'green'}}>Submit Ride</Text>
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
  }

});
