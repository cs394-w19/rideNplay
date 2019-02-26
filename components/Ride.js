import React from 'react'
import { Text,
         View,
         Image,
         TextInput,
         TouchableOpacity,
         StyleSheet,
         Dimensions
       } from 'react-native'
import * as firebase from 'firebase'
import { ListItem } from 'react-native-elements'

this.width = Dimensions.get('window').width
const Ride = (props) => {
    console.log(props);
    return(
        <ListItem style = {[styles.info, styles.acceptedRide]}
        leftAvatar={{
          source: { uri: "http://images5.fanpop.com/image/photos/30200000/Nick-3-nick-miller-30219108-300-300.jpg" },
          showEditButton: true,
        }}
        title = {props.rideTitle}
        subtitle={props.rideDesc}
        containerStyle={[(typeof props.driver !== 'undefined') ? styles.acceptedRide : styles.pendingRide]}
                  chevron>
        </ListItem>

    )
}

const styles = StyleSheet.create({
  info: {
    backgroundColor: '#edeeef',
    borderColor: '#858687',
    borderBottomWidth: 0,
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  acceptedRide: {
        backgroundColor: '#BFEECF',
    },
  pendingRide: {
      backgroundColor: '#F8E68E',
   }
});

export default Ride
