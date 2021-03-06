import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions
} from "react-native";

import {Icon} from 'native-base';
const SCREEN_HEIGHT = Dimensions.get("window").height;
import * as Animatable from 'react-native-animatable'

class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    }

    componentWillMount(){
        this.loginHeight = new Animated.Value(150)
    }

    increaseHeightOfLogin = () =>{
        Animated.timing(this.loginHeight,{toValue:SCREEN_HEIGHT, duration:500}).start()
    }

    decreaseHeightOfLogin = () => {
        Animated.timing(this.loginHeight, {
            toValue: 150,
            duration: 500
        }).start()
    }

    render(){
        const headerTextOpacity = this.loginHeight.interpolate({
            inputRange:[150, SCREEN_HEIGHT],
            outputRange:[1,0]
        })
        const marginTop = this.loginHeight.interpolate({
            inputRange:[150, SCREEN_HEIGHT],
            outputRange:[25,100]
        })

        const headerBackArrowOpacity = this.loginHeight.interpolate({
            inputRange:[150, SCREEN_HEIGHT],
            outputRange:[0,1]
        })

        return(
            <View style={{flex: 1}}>
                <Animated.View style={{position: 'absolute', height:60, width:60, top:60, left:25, zIndex:100, opacity: headerBackArrowOpacity}} >
                    <TouchableOpacity onPress={() => this.decreaseHeightOfLogin()}>
                        <Icon name="md-arrow-back" style={{color:'black'}} />
                    </TouchableOpacity>
                </Animated.View>
                <ImageBackground source={require("../assets/login_bg.jpg")} style={{flex: 1}}>
                    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                        <Animatable.View animation="zoomIn" iterationCount={1} style={{backgroundColor: "transparent", height: 100, width: 100, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>RidenPlay</Text>
                        </Animatable.View>
                    </View>
                    <Animatable.View animation="slideInUp" iterationCount={1}>
                        <Animated.View style={{height:this.loginHeight, backgroundColor:'white'}}>
                            <Animated.View style={{opacity:headerTextOpacity, alignItems:'flex-start', paddingHorizontal:25, marginTop:marginTop}}><Text style={{fontSize:24}}>Get Moving</Text></Animated.View>
                            <TouchableOpacity onPress = {()=>this.increaseHeightOfLogin()}>
                                <View style={{marginTop:25, paddingHorizontal:25, flexDirection:'row'}}>
                                    <Image source={require('../assets/flag.png')} style={{height: 24, width: 24, resizeMode:'contain'}}/>
                                    <View pointerEvents="none" style={{flexDirection:"row", flex:1}}>
                                    <Text style={{fontSize:20, paddingHorizontal:10}}>+1</Text>
                                    <TextInput style={{flex: 1, fontSize:20}} placeholder="Enter your mobile number" underlineColorAndroid="transparent"></TextInput>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        <View style={{height:70, backgroundColor:'white', alignItems: 'flex-start', justifyContent:'center' ,borderTopColor: '#e8e8ec', borderWidth:1, paddingHorizontal:25}}>
                            <Text style={{color:'#5a7fdf', fontWeight:'bold'}}>
                                Or connect using a social account
                            </Text>
                        </View>
                    </Animatable.View>
                </ImageBackground>
            </View>
        );
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});