import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import * as FirebaseAPI from "../modules/firebaseAPI";
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
    }

  static navigationOptions = {
    title: 'Links',
  };

  state = {
      email: "Enter email",
      password: "Enter password",
  };

  ComponentDidMount(){
      this.watchAuthState(this.props.navigation);
  }

  watchAuthState(navigation){
      firebase.auth().onAuthStateChanged(function(user){
          if (user){
            navigation.navigate("Main");
          }
      });
  }

  createUser(){
      FirebaseAPI.createUser(this.state.email, this.state.password)
  }

  signIn(){

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.text}>Create an account below</Text>
            <TextInput 
                style={styles.TextInput}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
            />
            <TextInput 
                style={styles.TextInput}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
            />
            <TouchableOpacity
                style={{}}
                onPress={()=>this.signIn()}>
                <View>
                    <Text>Log In Existing</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{}}
                onPress={()=>this.createUser()}>
                <View>
                    <Text>Create New User</Text>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignContent: 'space-around'
    },
    textContainer: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 50,
      paddingTop: '50%'
    },
    textInput: {
        fontSize: 17,
        lineHeight: 24,
        width: "75%"
    },
    text: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      width: "75%",
      marginBotton: "10%",
      textAlign: 'center',
    },
  });
