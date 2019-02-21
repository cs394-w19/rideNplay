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
          <Text> {props.rideDesc} </Text>
        </View>

    )
}

const styles = StyleSheet.create({
  info: {
    padding: 10,
    backgroundColor: '#edeeef',
    borderColor: '#858687',
    borderBottomWidth: 1
    // borderRightWidth: 0
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
})

export default Ride
