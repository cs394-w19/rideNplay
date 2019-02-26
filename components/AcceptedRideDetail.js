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
import InfoText from '../components/InfoText';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { Avatar, ListItem } from 'react-native-elements';
import moment from 'moment'

const WIDTH = Dimensions.get('window').width;

class AcceptedRideDetail extends React.Component {
  state = {
    region: { // Map button
      latitude: 42.045273,
      longitude: -87.686790,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0221,},
      inMap: false,
  }


  // the ride object is passed in, just style it with components and such nicely
  // springin = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.create(250, 'easeIn', 'scaleY'))
  // }
  inMap = () => {
    this.setState({inMap: !this.state.inMap})
  }

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


  render(){
    if (this.state.inMap == false){
    return(
      <View>
      <InfoText text="Your Request:" />
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
      <InfoText text="For:" />
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
      <View>
          <Text style={{ fontSize: 16 }}> Needed: {this.props.ride.ride_name} </Text>
          <Text style={{ fontSize: 16 }}> Pickup: {this.props.ride.pickup_loc} </Text>
          <Text style={{ fontSize: 16 }}> Dropoff: {this.props.ride.dropoff_loc} </Text>
          <Text style={{ fontSize: 16 }}> At: {this.props.ride.pickup_time} </Text>
          <Text style={{ fontSize: 16 }}> On: {this.props.ride.pickup_date} </Text>
        </View>
        </View>
      <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity style = {styles.acceptButton} onPress = {this.inMap}>
          <Text> Tap to see route! </Text>
        </TouchableOpacity>
      </View>

      </View>

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
         onRegionChange={() => this.onRegionChange()}>
         {this.renderMarkers()}
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
})


export default AcceptedRideDetail
