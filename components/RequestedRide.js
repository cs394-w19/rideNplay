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
import { Avatar, ListItem } from 'react-native-elements';

this.width = Dimensions.get('window').width
const Ride = (props) => {
    return(
        <ListItem
        style = {styles.info}
        leftAvatar={{
          source: { uri: "http://images5.fanpop.com/image/photos/30200000/Nick-3-nick-miller-30219108-300-300.jpg" },
          showEditButton: true,
        }}
        title={props.rideTitle}
        subtitle={props.rideDesc}
        chevron
        >
        </ListItem>
    );
}

const styles = StyleSheet.create({
  info: {
    // padding: 10,
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

//
// <View style = {styles.info}>
//   <Text style = {styles.title}> {props.rideTitle} </Text>
//   <Text> {props.rideDesc} </Text>
// </View>
