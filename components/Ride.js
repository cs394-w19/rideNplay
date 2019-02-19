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

this.width = Dimensions.get('window').width
const Ride = (props) => {
    return(
        <View style = {styles.info}>
          <Text style = {styles.title}> {props.rideTitle} </Text>
        </View>

    )
}

const styles = StyleSheet.create({
  event: {
    marginHorizontal: 12,
    marginTop: 12
  },
  info: {
    padding: 10,
    backgroundColor: '#72d843',
    borderColor: 'black',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
})

export default Ride
