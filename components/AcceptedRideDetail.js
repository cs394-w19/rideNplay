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
import { MKButton, MKTextField, MKColor } from 'react-native-material-kit'
import Moment from 'moment';
import { extendMoment } from 'moment-range';


class AcceptedRideDetail extends React.Component {
  render(){
    return(
      <View style = {styles.detailsView}>

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
