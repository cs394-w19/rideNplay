import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;

export const PickupButton = function(props) {
    return (
        <TouchableOpacity onPress={() => {}} style={styles.container}>
            <View style={styles.leftCol}>
                <Text style={{fontSize:8}}>{'\u25A0'}</Text>
            </View>

            <View style={styles.centerCol}>
                <Text style={{fontSize:21, color:"#545454"}}>
                    Pickup location
                </Text>
            </View>
            <View style={styles.rightCol}>
                <Ionicons name="ios-pin" color="#000000" size={25} style={{alignSelf: "center"}}/>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container:{
        zIndex: 9,
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