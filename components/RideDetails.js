import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



const WIDTH = Dimensions.get('window').width;

export const RideDetails = function(props) {
    return (
        <View>
        <TouchableOpacity onPress={() => props.openDetails()} style={styles.container}>
            <View style={styles.leftCol}>
                <Text style={{fontSize:8}}>{'\u25A0'}</Text>
            </View>

            <View style={styles.centerCol}>
                    <Text style = {{fontSize: 20}}>Ride Description</Text>
            </View>
            <View style={styles.rightCol}>
                <Ionicons name="ios-car" color="#000000" size={25} style={{alignSelf: "center"}}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.container}>
            <View style={styles.leftCol}>
                <Text style={{fontSize:8}}>{'\u25A0'}</Text>
            </View>

            <View style={styles.centerCol}>
              <Text style = {{fontSize: 20}}>Who Needs a Ride?</Text>
            </View>
            <View style={styles.rightCol}>
                <FontAwesome name="child" color="#000000" size={25} style={{alignSelf: "center"}}/>
            </View>
        </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10,
        width: (WIDTH-40),
        height: 35,
        borderRadius: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
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
        flex: 4,
        fontSize: 20,
      },
    rightCol: {
        flex:1,
        borderLeftWidth: 1,
        borderColor: "#ededed"
      }
})
