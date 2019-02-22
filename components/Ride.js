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
    return(
        <ListItem style = {styles.info}
        leftAvatar={{
          source: { uri: "http://images5.fanpop.com/image/photos/30200000/Nick-3-nick-miller-30219108-300-300.jpg" },
          showEditButton: true,
        }}
        title = {props.rideTitle}
        subtitle={props.rideDesc}
        chevron>
        </ListItem>

    )
}

const styles = StyleSheet.create({
  info: {
    backgroundColor: '#edeeef',
    borderColor: '#858687',
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
