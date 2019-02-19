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
         Alert
       } from 'react-native'
import Moment from 'moment';

class AcceptedRideDetail extends React.Component {
  componentWillMount(){
    console.log(this.props.ride) //the correct ride object is already passed in.
  }

  // the ride object is passed in, just style it with components and such nicely
  


  render(){
    return(
      <View style = {styles.detailsView}>
        <Text> Ride Detail Here </Text>
        <Text> get picked up in {this.props.ride.pickup_loc} </Text>
        <Text> get dropped off in {this.props.ride.dropoff_loc} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsView:{
    backgroundColor: 'white'
  }
})


export default AcceptedRideDetail
