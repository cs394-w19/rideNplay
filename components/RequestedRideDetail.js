import React from 'react'
import { Text,
         View,
         Image,
         TextInput,
         TouchableOpacity,
         StyleSheet,
         Dimensions,
         Alert
       } from 'react-native'
import * as firebase from 'firebase'
this.width = Dimensions.get('window').width


const RequestedRideDetail= (props) => {

  confirmEvent = () => {
    Alert.alert(
      'Ride Confirmed',
      'This event has been added to your Rides list',
      [
        {text: 'OK', onPress: () => props.selectRequestedEvent(props.event)},
        {text: 'Undo', onPress: () => {null}}
      ],
      { cancelable: false }
    )
  }

  deleteEvent = () => {
    Alert.alert(
      'Ride Deleted',
      'This Ride has been deleted',
      [
        {text: 'OK', onPress: () => props.deleteRequestedEvent(props.event.uid)},
        {text: 'Undo', onPress: () => {null}}
      ],
      { cancelable: false }
    )
  }
    return(
      <View>
      <TouchableOpacity style = {styles.event}>
        <View style = {styles.info}>
          <Text style = {styles.title}> Ride Title </Text>
        </View>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  footer: {
    flexDirection: 'row'
  },
  cause: {
    flex: 2
  },
  price: {
    flex: 1,
    textAlign: 'right'
  },
  confirmDelete: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    height: 40,
    alignItems: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#bbb',
  },
  confirm: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'green',
    color: 'white'
  },
  delete: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#d50202',
    color: 'white'
  },
})


export default RequestedRideDetail
