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
    backgroundColor: '#e5e5e5',
    borderColor: 'black',
    borderBottomWidth: 1,
    width: '100%'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
})

export default Ride
