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
      <View>

        <View style = {{flexDirection: 'row', marginHorizontal: 10}}>
          <Text style = {{fontSize: 20}}>
            <Text style = {{fontWeight: 'bold'}}>{this.props.ride.driver} </Text>
            is picking up
            <Text style = {{fontWeight: 'bold'}}> {this.props.ride.child_id} </Text>
            <Text>at</Text>
            <Text style = {{fontWeight: 'bold'}}> {this.props.ride.pickup_time} </Text>
            <Text>from</Text>
            <Text style = {{fontWeight: 'bold'}}> {this.props.ride.pickup_loc}</Text>.
            <Text style = {{fontWeight: 'bold'}}> {this.props.ride.driver} </Text>
            <Text>will bring</Text>
            <Text style = {{fontWeight: 'bold'}}> {this.props.ride.child_id} </Text>
            <Text>to</Text>
            <Text style = {{fontWeight: 'bold'}}> {this.props.ride.dropoff_loc}</Text>.
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsView:{
    fontSize: 20,
    textAlign: 'left',
  }
})


export default AcceptedRideDetail
