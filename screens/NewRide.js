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
         TouchableWithoutFeedback,
         Keyboard,
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
import moment from 'moment'
import { Avatar, ListItem } from 'react-native-elements';

let firebase = require("firebase");

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class NewRide extends React.Component {
  static navigationOptions = {
    title: 'New Ride',
  };

  state = {
    user: "nickmiller5", // user name
    viewPickupModal: false,  // obvious
    viewDropoffModal: false, // obvious
    detailsModal: false, // obvious
    chooseChild: false,

    pickupTitle: 'Pickup Location', // Title for pickup button
    dropoffTitle: 'Dropoff Location', // Title for dropoff button

    region: { // Map button
      latitude: 42.045273,
      longitude: -87.686790,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0221,},

    pickupGeo: {}, // lat/long for pickup marker
    dropoffGeo: {}, // lat/long for dropoff marker

    pickupMarker: null,
    dropoffMarker: null,

    pickupDetails: '',
    dropoffDetails: '',

    chosenDate: new Date(),

    childName:"Who Needs a Ride?",

    selectedDate: null,
    selectedTime: null,


    childPicker: false,
    description: "",
    rideName: "Ride Description",

    initialDateName: "Choose Date",
    initialTimeName: "Choose Time"

  };

  setSelectedTime = (time) => {
    this.setState({selectedTime: time});
  };

  setSelectedDate = (date) => {
    this.setState({selectedDate: date});
  };


  savePickupDetails(det) {
    // this.setState({pickupDetails: det})
  }

  saveDropoffDetails = (det) => {
    this.setState({dropoffDetails: det})
  };


  onRegionChange(region) {
    this.setState({ region });
  }

  viewPickupModal() {
    this.setState({viewPickupModal: !this.state.viewPickupModal})
  }

  showChooseChild() {
    this.setState({chooseChild: !this.state.chooseChild})
  }

  confirmPickupLocation(loc, geo) {
    if(geo){
    lat = geo["lat"];
    long = geo["lng"];
    newMarker = {
      key: '1',
      coordinate: {latitude: lat, longitude: long},
      title: "Pickup Location",
      description: loc,
    };
    this.setState({viewPickupModal: !this.state.viewPickupModal, pickupTitle: loc, pickupMarker: newMarker ,pickupGeo: geo})
  }
  else {
    Alert.alert(
    'Alert',
    "Please select a pickup location",
    [
      {text: 'OK', onPress: () => {return}},
    ],
    {cancelable: false},
  );
  }
  }

  viewDropoffModal() {
    this.setState({viewDropoffModal: !this.state.viewDropoffModal})
  }

  setChildName(child) {
    this.setState({childName: child});
  }

  confirmDropoffLocation(loc, geo) {
    if (geo){
      lat = geo["lat"];
      long = geo["lng"];
      newMarker = {
        key: '2',
        coordinate: {latitude: lat, longitude: long},
        title: "Dropoff Location",
        description: loc,
      },
      this.setState({viewDropoffModal: !this.state.viewDropoffModal, dropoffMarker: newMarker, dropoffTitle: loc,  dropoffGeo: geo})
    }
    else {
      Alert.alert(
      'Alert',
      "Please select a dropoff location",
      [
        {text: 'OK', onPress: () => {return}},
      ],
      {cancelable: false},
    );
    }
  }

  submitRide() {

    if (!this.state.rideName ||
        !this.state.pickupGeo ||
        !this.state.dropoffGeo ||
        !this.state.selectedDate ||
        !this.state.selectedTime) {
        Alert.alert(
        'Invalid Ride Entry',
        'Please submit all fields',
        [
          {text: 'OK', onPress: () => {return}},
        ],
        {cancelable: false},
      );
    }
    else {
        // send text upon successful ride creation
        fetch('http://localhost:3002/api/new_ride', {
            method: 'POST',
            body: JSON.stringify({
                to: '7576606447',
                message: `Created ride request for ${this.state.rideName}, for ${this.state.childName}. Looking for a driver!`
            }),
            headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
            console.log(response.json());
        })
        .catch(error => console.log(error));

      firebase.database().ref('Rides/').push({
        ride_id: this.state.rideName,
        ride_desc: this.state.description || '',
        ride_name:this.state.rideName,
        submitter_id:this.state.user,
        child_id:this.state.childName,
        pickup_loc:JSON.stringify(this.state.pickupGeo),
        dropoff_loc:JSON.stringify(this.state.dropoffGeo),
        pickup_title: this.state.pickupTitle,
        dropoff_title: this.state.dropoffTitle,
        pickup_date: moment(this.state.selectedDate).format('MM/DD/YYYY'),
        pickup_time: moment(this.state.selectedTime).format('hh:mm A'),
        driver: '',
        rating:"N/A"
      }).then((data) => {
        //   Alert.alert(
        //   'Ride Submitted',
        //   "Alert Message",
        //   [
        //     {text: 'OK', onPress: () => {return}},
        //   ],
        //   {cancelable: false},
        // );


        this.setState({
          user: "nickmiller5", // user name
          viewPickupModal: false,  // obvious
          viewDropoffModal: false, // obvious
          detailsModal: false, // obvious
          chooseChild: false,

          pickupTitle: 'Pickup Location', // Title for pickup button
          dropoffTitle: 'Dropoff Location', // Title for dropoff button

          region: { // Map button
            latitude: 42.045273,
            longitude: -87.686790,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,},

          pickupGeo: {}, // lat/long for pickup marker
          dropoffGeo: {}, // lat/long for dropoff marker

          pickupMarker: null,
          dropoffMarker: null,

          pickupDetails: '',
          dropoffDetails: '',

          chosenDate: new Date(),

          childName:"Who needs a ride?",

          selectedDate: null,
          selectedTime: null,

          childPicker: false,
          description: "",
          rideName: "Ride Description",

          initialDateName: "Choose Date",
          initialTimeName: "Choose Time"
        });
          // if (data) {
          //     console.log(data);
          // }
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
  }

  showDetailsModal = () => {
    this.setState({detailsModal: !this.state.detailsModal})
  };

  showChildPicker = () => {
    this.setState({childPicker: !this.state.childPicker})
  };

  renderMap() {
    return (
      <View>
        <MapView
          style={{height: (HEIGHT / 3), top: 0, marginHorizontal: 5, borderRadius: 5}}
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
      <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <Modal
           animationType="slide"
           transparent={false}
           visible={this.state.viewPickupModal}>
           <View style={{marginTop: 40}}>
             <View>
               <GooglePlacesInput locationSet = {this.confirmPickupLocation.bind(this)}/>

               <View style = {{alignItems: 'center'}}>
                <TouchableOpacity onPress = {() => this.confirmPickupLocation()} style = {{position: 'absolute', top: HEIGHT - 220}}>
                <Text style = {{fontSize: 20, color: 'blue'}}>
                  Confirm
                </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => this.setState({viewPickupModal: !this.state.viewPickupModal})} style = {{position: 'absolute', top: HEIGHT - 160}}>
                <Text style = {{fontSize: 20, color: 'red'}}>
                  Cancel
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
            <View style={{marginTop: 40}}>
              <View>
                <GooglePlacesInput locationSet = {this.confirmDropoffLocation.bind(this)}/>
                <View style = {{alignItems: 'center'}}>
                 <TouchableOpacity onPress = {() => this.confirmDropoffLocation()} style = {{position: 'absolute', top: HEIGHT - 220}}>
                 <Text style = {{fontSize: 20, color: 'blue'}}>
                   Confirm
                 </Text>
                 </TouchableOpacity>

                 <TouchableOpacity onPress = {() => this.setState({viewDropoffModal: !this.state.viewDropoffModal})} style = {{position: 'absolute', top: HEIGHT - 160}}>
                 <Text style = {{fontSize: 20, color: 'red'}}>
                   Cancel
                 </Text>
                 </TouchableOpacity>
                 </View>
              </View>
            </View>
          </Modal>

          <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.detailsModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <View style={{
                      backgroundColor: 'white',
                      borderRadius: 10,
                      height: '100%',
                      marginTop: 30,
                      width: WIDTH, // This is the important style you need to set
                      alignItems: 'center',
                      justifyContent: 'flex-start',}}>
            <View>
              <TextInput
                style = {styles.rideName}
                placeholder = "Enter Ride Name"
                multiline = {false}
                editable = {true}
                onChangeText={(rideName) => this.setState({rideName})}
                value={this.state.rideName}
                maxLength = {30}
              />
              <TextInput
                style = {styles.detailsModal}
                placeholder = "Enter Ride Details"
                multiline = {true}
                numberOfLines = {4}
                editable = {true}
                blurOnSubmit = {true}
                onChangeText={(description) => this.setState({description})}
                value={this.state.description}
                maxLength = {200}
              />

              <View style ={{left: WIDTH/2-10, position: 'absolute', alignItems: 'center'}}>
              <TouchableOpacity
                style = {{position: 'absolute', top: HEIGHT - 220}}
                onPress={() => this.showDetailsModal()}>
                <Text style = {{fontSize: 20}}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress = {() => this.setState({detailsModal: !this.state.detailsModal})}
                                style = {{position: 'absolute', top: HEIGHT - 160}}>
              <Text style = {{fontSize: 20, color: 'red'}}>
                Cancel
              </Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>


          <Modal
            transparent={true}
            animationType="slide"
            visible={this.state.chooseChild}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        height: '100%',
                        marginTop: 2 * HEIGHT/3,
                        width: WIDTH, // This is the important style you need to set
                        alignItems: 'center',
                        justifyContent: 'flex-start',}}>
                <View style = {{marginTop: 20, flexDirection: 'row'}}>
                  <View style = {{margin: 20, alignItems: 'center'}}>
                    <TouchableOpacity onPress = {() => this.setState({childName: "Emma", chooseChild: !this.state.chooseChild})}>
                    <Avatar
                      rounded
                      size="large"
                      source={{
                        uri: "https://image.shutterstock.com/image-photo/young-african-black-child-making-260nw-505302700.jpg",
                      }}
                    />
                    </TouchableOpacity>
                    <Text> Emma </Text>
                  </View>

                  <View style = {{margin: 20, alignItems: 'center'}}>
                    <TouchableOpacity onPress = {() => this.setState({childName: "Guneet", chooseChild: !this.state.chooseChild})}>
                    <Avatar
                      rounded
                      size="large"
                      source={{
                        uri: "https://media.licdn.com/dms/image/C5603AQHwmCadcgL5TA/profile-displayphoto-shrink_800_800/0?e=1557964800&v=beta&t=CN0W9lB6z_ce1e1GmzX1NOxHScX-oXLThwYZaKbghdo",
                      }}
                    />
                    </TouchableOpacity>
                    <Text> Guneet </Text>
                  </View>
                </View>

                <View style ={{left: WIDTH/2-10, position: 'absolute', alignItems: 'center'}}>
                  <TouchableOpacity
                    style = {{position: 'absolute', top: HEIGHT - 130}}
                    onPress={() => this.showChooseChild()}>
                    <Text style = {{fontSize: 20}}>Confirm</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress = {() => this.setState({chooseChild: !this.state.chooseChild})}
                                    style = {{position: 'absolute', top: HEIGHT - 70}}>
                  <Text style = {{fontSize: 20, color: 'red'}}>
                    Cancel
                  </Text>
                  </TouchableOpacity>
                </View>
          </View>
        </Modal>

          {this.renderMap()}


        <RideDetails child={this.state.childName} title={this.state.rideName} openDetails={this.showDetailsModal} chooseChild = {this.showChooseChild.bind(this)}/>
        <PickupButton title = {this.state.pickupTitle} viewModal = {this.viewPickupModal.bind(this)} save = {this.savePickupDetails}/>
        <DropoffButton title = {this.state.dropoffTitle} viewModal = {this.viewDropoffModal.bind(this)}  save = {this.saveDropoffDetails}/>
        <PickupDateButton name={this.state.initialDateName} setDate = {this.setSelectedDate}/>
        <PickupTimeButton name={this.state.initialTimeName} setTime = {this.setSelectedTime}/>


        <TouchableOpacity onPress={() => this.submitRide()} style={styles.submitButton}>
            <View style={styles.centerCol}>
                    <Text style = {{fontSize: 20}}>Submit Ride</Text>
            </View>
        </TouchableOpacity>


      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  detailsModal: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginHorizontal: 5,
    borderRadius: 3,
    fontSize: 20,
    width: WIDTH - 40,
    height: 225},
  rideName: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 3,
    fontSize: 20,
    width: WIDTH - 40,
    height: 50},
  submitButton:{
      flexDirection: 'row',
      fontWeight: 'bold',
      marginHorizontal: 20,
      marginTop: 10,
      width: (WIDTH-40),
      height: 40,
      borderRadius: 10,
      backgroundColor: '#77dd77',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "#000000",
      elevation: 7,
      shadowRadius: 5,
      shadowOpacity: 1.0
  },

});
