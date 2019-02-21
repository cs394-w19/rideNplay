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
         Alert
       } from 'react-native'
import Moment from 'moment';
let firebase = require("firebase");

const WIDTH = Dimensions.get('window').width;

class RequestedRideDetail extends React.Component {
  componentWillMount(){
    console.log(this.props.ride) //the correct ride object is already passed in.
  }

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

  acceptRide = () => {
    const ride = this.props.ride
    this.createNewRide(ride.ride_id, ride.ride_desc,
      ride.ride_name, ride.submitter_id,
      ride.child_id, ride.pickup_loc, ride.dropoff_loc, ride.pickup_time, "Me!", 10)
  }

  render(){
    return(
      <View style = {{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style = {styles.acceptButton} onPress ={this.acceptRide}>
        <View>
          <Text style = {{fontSize: 18}}> Accept Ride </Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.delButton}>
        <View>
          <Text style = {{fontSize: 18}}> Delete Ride </Text>
        </View>
        </TouchableOpacity>
      </View>

    )
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
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH/2 - 10,
    height: 30,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#48e25b'
  },
  delButton: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH/2 - 10,
    height: 30,
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: '#e24848'
  }
})


export default RequestedRideDetail
