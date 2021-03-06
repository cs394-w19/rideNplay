import React from 'react'
import { View,
         Text,
         StyleSheet,
         Image,
         ScrollView,
         TouchableOpacity,
         PanResponder,
         Animated,
         Dimensions,
         Alert,
         LayoutAnimation,
       } from 'react-native'
import Moment from 'moment';
import { Header } from 'react-native-elements'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MapViewDirections from 'react-native-maps-directions';
import InfoText from '../components/InfoText';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import moment from 'moment'
import Communications from 'react-native-communications';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

class AcceptedRideDetail extends React.Component {

  mapView = null;

  state = {
    region: { // Map button
      latitude: 42.045273,
      longitude: -87.686790,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0221,},
      inMap: false,
      tempOrig: {},
      tempDest: {},
      routeRendered: false,
      rideDuration: 0
  };


  // the ride object is passed in, just style it with components and such nicely
  // springin = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.create(250, 'easeIn', 'scaleY'))
  // }
  inMap = () => {
    this.setState({inMap: !this.state.inMap})
  };

  sendText = (type) => {
      let message;
      console.log(type);
      if (type == 'end') {
          message = `Ended ride for ${this.props.ride.ride_name}, for ${this.props.ride.child_id}.`;

          // send text upon successful ride creation
          fetch('http://localhost:3002/api/end_ride', {
              method: 'POST',
              body: JSON.stringify({
                  to: '9178287902',
                  //7576606447
                  message: message,
              }),
              headers: {"Content-Type": "application/json"}
          })
              .then(function (response) {
                  console.log(response.json());
              })
              .catch(error => console.log(error));
      } else {
          message = `Picked up  for ${this.props.ride.child_id}, for ${this.props.ride.ride_name}.`;

          // send text upon successful ride creation
          fetch('http://localhost:3002/api/picked_up_child', {
              method: 'POST',
              body: JSON.stringify({
                  to: '9178287902',
                  message: message,
              }),
              headers: {"Content-Type": "application/json"}
          })
              .then(function (response) {
                  console.log(response.json());
              })
              .catch(error => console.log(error));
      }
      Alert.alert('The parent has been notified')

  };

  renderMap = () => {
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
  };

  convertLatLong = (coordinates) => {
      console.log('entered con');
        // parse string to json
        const oldCoords = JSON.parse(coordinates);
        // this.setState({'tempCoords': coordinates});
        // console.log({"latitude":oldCoords['lat'], "longitude":oldCoords['lng']});
        return {"latitude":oldCoords['lat'], "longitude":oldCoords['lng']}
  };

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

  renderMapRoute = () => {
      if (this.state.inMap === true) {
            // this.setState({routeRendered: true});
      console.log('entered render map');
          return <MapViewDirections
              origin={this.convertLatLong(this.props.ride.pickup_loc)}
              destination={this.convertLatLong(this.props.ride.dropoff_loc)}
              apikey={'AIzaSyB9B01b8XaDo3LQ205C3MgYg7WpR0iatGE'}
              strokeWidth={3}
              strokeColor="#2F95DC"
              mode={"driving"}
              optimizeWaypoints={true}
              onReady={result => {
                  console.log(result.duration/20);
                  this.setState({'rideDuration': Math.ceil(result.duration)})
                  this.mapView.fitToCoordinates(result.coordinates, {});
              }}
          />

       } else {
          return;
      }

  };

  onRegionChange(region) {
      console.log(region);
    this.setState({ region });
  }

  conditionaldriver(){
    if (this.props.ride.driver == "N/A"){
      return
    }
    else {
      return <View style = {{flexDirection: 'row'}}>
          <Text style = {{fontSize: 20}}> Pickup by: {this.props.ride.driver} </Text>
          <Text style = {styles.rightColumn}> {this.props.ride.rating}/10 </Text>
        </View>
    }
  };

  renderAvatar(){
    if(this.props.ride.child_id == "Guneet") {
    return <Avatar
      rounded
      size="large"
      source={{
        uri: "https://media.licdn.com/dms/image/C5603AQHwmCadcgL5TA/profile-displayphoto-shrink_800_800/0?e=1557964800&v=beta&t=CN0W9lB6z_ce1e1GmzX1NOxHScX-oXLThwYZaKbghdo",
      }}
    />
  } else if(this.props.ride.child_id == "Emma") {
    return  <Avatar
      rounded
      size="large"
      source={{
        uri: "https://image.shutterstock.com/image-photo/young-african-black-child-making-260nw-505302700.jpg",
      }}
    />
    }
    else{
      return <Avatar
        rounded
        size="large"
        source={{
          uri: "https://maxcdn.icons8.com/Share/icon/Users//user_male_circle_filled1600.png",
        }}
      />
    }
  }

  renderButtons(){
      if(this.props.ride.driver != ""){
      return <View style={styles.textButtonRow}>
      <View style = {{borderWidth: 1, borderRadius: 5, marginRight: 15}}>
      <TouchableOpacity onPress={() => {this.sendText('pickup')}}>
          <View style = {{flexDirection: 'row', backgroundColor: '#3ec300', padding: 10, borderRadius:5}}>
            <Ionicons name='ios-arrow-dropright' size='20' color = 'white' />
            <Text style={{fontWeight: 'bold', color: 'white'}}>   Notify Parent of Pickup</Text>
          </View>
      </TouchableOpacity>
      </View>

      <View style = {{borderWidth: 1, borderRadius: 5, marginLeft: 15}}>
      <TouchableOpacity onPress={() => {this.sendText('end')}}>
          <View style = {{flexDirection: 'row', backgroundColor: '#c32f27', padding: 10,borderRadius:5}}>
            <Ionicons name='ios-checkmark-circle-outline' size='20' color = 'white' />
            <Text style={{fontWeight: 'bold', color: 'white'}}>   Complete Ride</Text>
          </View>
      </TouchableOpacity>
      </View>
    </View>
    }
  }

  render(){
    if (this.state.inMap == false){
        // this.setState({routeRendered: false});

        return(
      <ScrollView>
      <InfoText text="Your Request" />


        {this.renderButtons()}

      <InfoText text="For:" />
      <View style={styles.userRow}>
      <View style={styles.userImage}>
        {this.renderAvatar()}
      </View>
      <View>
            <Text style={{ fontSize: 16 }}>{this.props.ride.child_id}</Text>
      </View>
      <View style = {{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity style={{marginLeft: 80, marginRight: 10}} onPress={() => Communications.phonecall('3018019811', true)}>
            <View style = {{backgroundColor: '#3ec300', borderWidth: 1, padding: 20,  borderColor: '#3ec300', borderRadius: 50}}>
              <Icon name='phone' size='20' color = 'white' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 5}} onPress={() => Communications.text('3018019811')}>
            <View style = {{backgroundColor: '#1162c4', borderWidth: 1, padding: 20, borderColor: 'blue', borderRadius: 50}}>
              <Icon name='message' size='20' color = 'white' />
            </View>
        </TouchableOpacity>
      </View>
      </View>

      <InfoText text="Ride Details:" />


        <View style={styles.userRow}>
      <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: "https://www.electronicdesign.com/sites/electronicdesign.com/files/styles/article_featured_retina/public/PSMA_QA_promo.png",
              }}
            />
      </View>
      <View style = {{width: WIDTH}}>
          <Text style={{ fontSize: 16 }}> Needed: {this.props.ride.ride_name} </Text>
          <Text style={{ fontSize: 16 }}> Pickup: </Text>
          <Text style={{ fontSize: 16, marginHorizontal: 10}}>{this.props.ride.pickup_title} </Text>
          <Text style={{ fontSize: 16 }}> Dropoff: </Text>
          <Text>{this.props.ride.dropoff_title} </Text>
          <Text style={{ fontSize: 16 }}> At: {this.props.ride.pickup_time} </Text>
          <Text style={{ fontSize: 16 }}> On: {this.props.ride.pickup_date} </Text>
        </View>
        </View>
      <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity style = {styles.acceptButton} onPress = {this.inMap}>
          <Text> Tap to see route! </Text>
        </TouchableOpacity>
      </View>



      </ScrollView>

    )
  }
  else {
    return(
      <View>
      <MapView
          style={{height: 320, top: 0, marginHorizontal: 5}}
          // initialRegion={this.state.region}
         loadingEnabled = {true}
         loadingIndicatorColor="#666666"
         loadingBackgroundColor="#eeeeee"
         moveOnMarkerPress = {false}
         showsUserLocation={true}
         showsCompass={true}
         showsPointsOfInterest = {false}
         region={this.state.region}
         // onRegionChange={() => this.onRegionChange()}
          ref={c => this.mapView = c}
          // initialRegion={this.convertLatLong(this.props.ride.pickup_loc)}
          >

         {this.renderMarkers()}
          {this.renderMapRoute()}
        </MapView>
          <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 15}}>
          <Text style={{fontWeight: 'bold'}}> Estimated Ride Duration: {this.state.rideDuration} Minutes</Text>
           </View>
          <View style = {{flexDirection: 'row'}}>

            <TouchableOpacity style = {styles.acceptButton} onPress = {this.inMap}>
          <Text> Tap to return! </Text>
        </TouchableOpacity>
      </View>

      <View style = {{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <TouchableOpacity style={{marginHorizontal: 30}} onPress={() => Communications.phonecall('3018019811', true)}>
            <View style = {{backgroundColor: '#3ec300', borderWidth: 1, padding: 20,  borderColor: '#3ec300', borderRadius: 50}}>
              <Icon name='phone' size='30' color = 'white' />
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 30}} onPress={() => Communications.text('3018019811')}>
            <View style = {{backgroundColor: '#1162c4', borderWidth: 1, padding: 20, borderColor: '#337ca0', borderRadius: 50}}>
              <Icon name='message' size='30' color = 'white' />
            </View>
        </TouchableOpacity>
      </View>

      </View>
    )
  }
}
}

const styles = StyleSheet.create({
  detailsView:{
    fontSize: 20,
    textAlign: 'left',
  },
  acceptButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2F95DC',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH/2 - 10,
    height: 30,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    color: '#2F95DC',
  },
  delButton: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH/2 - 10,
    height: 30,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#ffffff'
  },
  userImage: {
    marginRight: 12,
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  textButtonRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 8,
    paddingTop: 6,
  },
})


export default AcceptedRideDetail
