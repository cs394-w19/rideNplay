import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GooglePlacesInput from '../components/GooglePlacesInput';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export class PickupButton extends React.Component {
    sendDetails(details) {
      this.props.save(details)
    }

    renderTitle(){
      if(this.props.title == "Pickup Location"){
        return <Text style = {{fontSize: 20}}> {this.props.title} </Text>
      }
      else {
        return <Text style = {{fontSize: 12}}> {this.props.title} </Text>
      }
    }


    render(){
      return (
        <TouchableOpacity onPress = {() => this.props.viewModal()}style={styles.container}>
          <View style={styles.leftCol}>
              <Text style={{fontSize:8}}>{'\u25A0'}</Text>
          </View>
            <View style={styles.centerCol}>
              {this.renderTitle()}
            </View>
            <View style={styles.rightCol}>
                <Ionicons name="ios-pin" color="#000000" size={25} style={{alignSelf: "center"}}/>
            </View>
        </TouchableOpacity>


    )
  }
}

const styles = StyleSheet.create({
    complete: {
      position: 'absolute',
      height: HEIGHT,
      width: WIDTH
    },
    container:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30,
        width: (WIDTH-40),
        height: 40,
        borderRadius: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: "#000000",
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    leftCol: {
        flex: 1,
        alignItems: "center"
      },
    centerCol: {
        flex: 4
      },
    rightCol: {
        flex:1,
        borderLeftWidth: 1,
        borderColor: "#ededed"
      }
})
