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
         Button,
         Alert,
       } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements';
import Moment from 'moment';
import MapViewDirections from 'react-native-maps-directions';

let firebase = require("firebase");
import InfoText from '../components/InfoText';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

const WIDTH = Dimensions.get('window').width;

class RequestedRideDetail extends React.Component {
  state = {
    region: { // Map button
      latitude: 42.045273,
      longitude: -87.686790,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0221,},
      inMap: false,
  };

  createNewRide(id, ride_desc, ride_name, submitter_id, child_user_id, pickup_loc, dropoff_loc, pickup_time,driver,rating) {
    firebase.database().ref('Rides/'+id).set({
      ride_id:id,
      ride_desc: ride_desc,
      ride_name:ride_name,
      submitter_id:submitter_id,
      child_id:child_user_id,
      pickup_loc:pickup_loc,
      dropoff_loc:dropoff_loc,
      pickup_time:pickup_time,
      driver:driver,
      rating:rating
    })
  }

  inMap = () => {
    this.setState({inMap: !this.state.inMap})
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

  onRegionChange(region) {
    this.setState({ region });
  }

  acceptRide() {
    const ride = this.props.ride

    firebase.database().ref('Rides/'+ride.ride_id).remove()

    this.createNewRide(ride.ride_id, ride.ride_desc,
      ride.ride_name, ride.submitter_id,
      ride.child_id, ride.pickup_loc, ride.dropoff_loc, ride.pickup_time, "Me!", 10)

    this.props.goBack()
  }

  accept = () => {
    Alert.alert(
      'Are you sure you want to accept this ride?',
      " ",
      [
        {text: 'Yes!', onPress: () => this.acceptRide()},
        {text: 'Undo', onPress: () => {null}}
      ],
      { cancelable: false }
    )
  };

  delete(){
     firebase.database().ref('Rides/'+this.props.ride.ride_id).remove()
     this.props.goBack()
  }
  deleteRide = () => {
    Alert.alert(
      'Are you sure you want to delete this ride?',
      " ",
      [
        {text: 'OK', onPress: () => this.delete()},
        {text: 'Undo', onPress: () => {null}}
      ],
      { cancelable: false }
    )

  };

  convertLatLong(coordinates) {
    return {"latitude":coordinates['lat'], "longitude":coordinates['lng']}
  }

  render(){
    if (this.state.inMap === false){
        // ToDo: Remove hardcoded email. and include more info about parent

        return(
      <ScrollView>
      <InfoText text="Parent Info" />
      <View style={styles.userRow}>
      <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: "http://images5.fanpop.com/image/photos/30200000/Nick-3-nick-miller-30219108-300-300.jpg",
              }}
            />
      </View>
        <View>
            <Text style={{ fontSize: 16 }}>{this.props.ride.submitter_id}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              nickmiller@gmail.com
            </Text>
      </View>
      </View>
      <InfoText text="Rider" />
      <View style={styles.userRow}>
      <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: "https://www.healthyfood.co.nz/wp-content/uploads/2017/01/Should-your-child-be-dairy-free-iStock_64414757.jpg",
              }}
            />
      </View>
      <View>
            <Text style={{ fontSize: 16 }}>{this.props.ride.child_id}</Text>
      </View>
      </View>

      <InfoText text="Ride Details" />


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
      <View>
          <Text style={{ fontSize: 16 }}> Description: {this.props.ride.ride_name} </Text>
          <Text style={{ fontSize: 16 }}> Pickup Location: {this.props.ride.pickup_loc} </Text>
          <Text style={{ fontSize: 16 }}> Drop Off Location: {this.props.ride.dropoff_loc} </Text>
          <Text style={{ fontSize: 16 }}> Time: {this.props.ride.pickup_time} </Text>
        </View>
        </View>
      <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity style = {styles.acceptButton} onPress = {this.inMap}>
          <Text> Tap to see route! </Text>
        </TouchableOpacity>
      </View>

        <InfoText text="Accept Ride?" stle={{}} />


        <View style = {{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style = {styles.acceptButton} onPress ={this.accept}>
        <View>
          <Text style = {{fontSize: 18, color: '#2F95DC'}}> Accept Ride </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.delButton} onPress = {this.deleteRide}>
        <View>
          <Text style = {{fontSize: 18, color: 'red'}}> Delete Ride </Text>
        </View>
        </TouchableOpacity>
      </View>

      </ScrollView>

    )
  }
  else {
    return(
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
         onRegionChange={() => this.onRegionChange()}

      >
          <MapViewDirections
              origin={this.convertLatLong(this.props.ride.pickup_loc)}
              destination={this.convertLatLong(this.props.ride.dropoff_loc)}
              apikey={'AIzaSyDH304hN4miatGEDoExStAAbCAJZDsyz8g'}
              strokeWidth={3}
              strokeColor="rgb(0,139,241)"
          />
          {/*{this.renderMarkers()}*/}

      </MapView>
        <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity style = {styles.acceptButton} onPress = {this.inMap}>
          <Text> Tap to return! </Text>
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
    textAlign: 'center',
  },
  centerAlignView:{
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
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
})


export default RequestedRideDetail
