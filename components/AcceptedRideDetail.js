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
    console.log(this.props.pickupLoc)
  }
  render(){
    return(
      <View style = {styles.detailsView}>
        <Text> Ride Detail Here </Text>
        <Text> get picked up in {this.props.pickupLoc} </Text>
        <Text> get dropped off in {this.props.dropoffLoc} </Text>
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
