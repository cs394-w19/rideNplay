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

this.width = Dimensions.get('window').width;
export default class RequestedRides extends React.Component {
    state = {
      picture: 'test'

    };

    componentWillMount() {
      console.log(this.props.parent);
      this.getPictures();
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    getPictures = () => {
        firebase.database().ref('Users/'+ this.props.parent +'/user_picture').once('value').then(snapshot => {
            if (this.isUnmounted) {
                return;
            }

            let pic = snapshot.val();
            this.setState({picture: snapshot.val()});

        });
        // console.log(this.state.picture);
    };

    render(){
      return(
        <ListItem
        style = {[styles.info, styles.acceptedRide]}
        leftAvatar={{
          source: { uri: this.state.picture },
          showEditButton: true,
        }}
        title={this.props.rideTitle}
        subtitle={this.props.rideDesc}
        chevron
        >
        </ListItem>
    );
  }
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
});


//
// <View style = {styles.info}>
//   <Text style = {styles.title}> {props.rideTitle} </Text>
//   <Text> {props.rideDesc} </Text>
// </View>
