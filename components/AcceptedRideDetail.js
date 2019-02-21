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
  }

  render(){
    return(
      <View>
        <Text style = {styles.header}>
         {this.props.ride.ride_id} Details:
        </Text>
      <ScrollView style = {styles.detailsView}>
        {this.conditionaldriver()}
        <Text style = {{fontSize: 20}}> For: {this.props.ride.child_id} {'\n'} </Text>
        <View style = {{flexDirection: 'row'}}>
          <Text style = {styles.detailsView}> From: {this.props.ride.pickup_loc} </Text>
          <Text style = {styles.rightColumn}> At: {this.props.ride.pickup_time}</Text>
        </View>
          <Text style = {{fontSize: 70, left: 0, marginBottom: 10}}> | </Text>
          <Text style = {styles.detailsView}> Dest: {this.props.ride.dropoff_loc} {'\n'}</Text>
      </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    
  },
  detailsView:{
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  rightColumn:{
    textAlign: 'right',
    fontSize: 20,
  }
})


export default AcceptedRideDetail
