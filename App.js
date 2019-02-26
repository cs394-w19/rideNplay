import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
let firebase = require("firebase");
let config = {
    apiKey: "AIzaSyDpsRarS_gg94oXh6QnracvPytegM5FV7Y",
    authDomain: "ridenplay-50868.firebaseapp.com",
    databaseURL: "https://ridenplay-50868.firebaseio.com",
    projectId: "ridenplay-50868",
    storageBucket: "",
    messagingSenderId: "851433543145"
  };
  firebase.initializeApp(config);

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.readMessages = this.readMessages.bind(this);
    this.state = {
    isLoadingComplete: false,
    numMessages: 0,
  };


      //Example code for how to use Firebase functions
    this.createNewRide("Ride1", "Winetka School of Music", "Ride to Orchestra Rehearsal","jessday2","child1","WSM","Home","3:45pm", "02/26/2018","N/A","-");
    this.createNewRide("Ride2","Evanston U12 Team Practice","Ride to Soccer Practice","ceceparekh4","child2","Long Field","Home","5:30pm","02/26/2018","N/A","-");
    this.createNewRide("Ride3","Wilmette School of Dance","Ride to Ballet","nickmiller5","child3","School","WSD","3:45pm","02/26/2018","Mark","-");
    this.createNewRide("Ride4","Evanston U16 Team","Ride from Soccer Practice","schmidty5","child4","School","Long Field","6:30pm","02/26/2018","N/A","-");
    this.createNewRide("Ride5","ETHS Debate Team","Ride to Debate Meet","jessday2","child4","School","Home","7:30pm","02/26/2018","N/A","-");
    this.createNewRide("Ride6","ETHS MT Team","Ride to Mock Trial Tournament","ceceparekh4","child4","School","Home","4:30pm","02/26/2018","N/A","-");
    // this.readRideData("Ride3");
    // this.updateRideInfo("Ride3","3:46pm","Mark")
    // // this.deleteRide("Ride4");
    // this.createNewMessageExchange("Ride3","parent1","parent3","Hi! I'd like to help!");
    // // this.readMessages("Ride3");
    // this.addNewMessage("Ride3","parent3","parent1","Thanks so much!");
    this.createNewUser("ceceparekh4","ceceparekh@gmail.com","Cece Parekh","https://www.famousbirthdays.com/faces/simone-hannah-image.jpg");
    this.createNewUser("winstonbishop3","winniethebish@gmail.com","Winston Bishop","http://images6.fanpop.com/image/photos/32400000/LM-lamorne-morris-32424473-160-160.jpg");
    this.createNewUser("jessday2","jessicaday@gmail.com","Jessica Day","https://www.famousbirthdays.com/faces/deschanel-zooey-image.jpg");
    this.createNewUser("nickmiller5","nickmiller@gmail.com","Nick Miller","http://images5.fanpop.com/image/photos/30200000/Nick-3-nick-miller-30219108-300-300.jpg");
    this.createNewUser("schmidty5","winstonschmidt@gmail.com","Winston Schmidt","http://images6.fanpop.com/image/photos/32400000/LM-lamorne-morris-32424473-160-160.jpg");
  }

//***********FIREBASE CODE****************************************************************/
//    Attributes for a given ride
//      -submitter
//      -child_user_id (from Users database)
//      -pickup_location
//      -dropoff_location
//      -time (Pickup Date/Time)
//      -driver=(default set to None)
//      -dropoff_time
//      -pickup_time
//      -rating (Star rating)


createNewUser(id,user_email,user_name,user_picture) {
  firebase.database().ref('Users/'+id).set({
      user_id:id,
      user_name:user_name,
      user_email:user_email,
      user_picture:user_picture,
    }).then((data) => {
      //success callback
        if (data) {
            console.log(data);
        }
    }).catch((error) => {
      //error callback
      console.log('error ', error);
    })
}

// Create new ride on Firebase with ride_id, with all fields completed
//      ***When calling function, if we don't have info, just leave that field with "N/A" or "-" (but include something)
  createNewRide(id, ride_desc, ride_name, submitter_id, child_user_id, pickup_loc, dropoff_loc, pickup_time, pickup_date, driver,rating) {
    firebase.database().ref('Rides/'+id).set({
      ride_id:id,
      ride_desc: ride_desc,
      ride_name:ride_name,
      submitter_id:submitter_id,
      child_id:child_user_id,
      pickup_loc:pickup_loc,
      dropoff_loc:dropoff_loc,
      pickup_time:pickup_time,
      pickup_date:pickup_date,
      driver:driver,
      rating:rating
    }).then((data) => {
      //success callback
        if (data) {
            console.log(data);
        }
    }).catch((error) => {
      //error callback
      console.log('error ', error);
    })
  }


//When you find matching driver, call this function and pass the ride_id, new pickup time (requested by driver potentially), and driver name (may end up being driver_id [TBD])
  updateRideInfo(ride_id,pickup_time,driver) {
    firebase.database().ref('Rides/' + ride_id + '/').update({
      ride_id:ride_id,
      pickup_time:pickup_time,
      driver:driver
    });
  }

// Read all the attributes of a given ride_id, where "attributes" is an object with all of the attributes
// Ex: to read the dropoff location of a particular ride, you can:
//            1) call attributes["dropoff_loc"] within function
//            2) Outside function, let var=readRideData(id) and then call var["dropoff_loc"]
//            *********In general, refer to attribute names above (line 31)
  readRideData(id) {
    console.log("readRideData called!");
    return firebase.database().ref('Rides/' + id).once('value').then(snapshot => {
      const attributes = snapshot.val();
      console.log(attributes);
      // return Object.keys(attributes).map(n => Object.assign({}, attributes[n]));
      return attributes;
    })
  }

//When the ride is finished, call this function on a given ride_id to delete it
  deleteRide(id) {
    firebase.database().ref('Rides/' + id).remove();
  }


// Create new message on Firebase with ride_id, with all fields completed
// Methodology: In Messages, each ride_id has their own exchange of message, where each message is indexed by message_id a number
// This createNewMessage() function by definition composes the first message of exchange so message_id is 1
  createNewMessageExchange(ride_id, sender_id, recipient_id, message) {
    console.log('Creating new message exchange');
    let currentTime = new Date().getTime();
    firebase.database().ref(`Messages/${ride_id}/${currentTime}/`).set({
      message_id:1,
      sender_id:sender_id,
      recipient_id:recipient_id,
      message:message,
      ts: currentTime,
      hi: "hello"
    }).then((data) => {
       if (data) {
           console.log(data);
       }
    }).catch((error) => {
      //error callback
      console.log('error ', error);
    })
  }


 async readMessages(ride_id) {
    let self = this;
    return firebase.database().ref(`Messages/${ride_id}`).once('value').then((snapshot) => {
      const msgs = snapshot.val();
      console.log("Number of current messages: " + Object.keys(msgs).length);
      self.setState({
       numMessages: Number(Object.keys(msgs).length)
      });
    })
}



//When adding a subsequent message, you must check the number of messages that currently exists, and increment message_id by 1
//This function automatically finds latest message, and composes new message with incremented message_id
  async addNewMessage(ride_id,sender_id,recipient_id,message) {
    console.log(`Adding new message to ride ${ride_id}`);
    await this.readMessages(ride_id);
    console.log(`Messages count ${this.state.numMessages}`);
    let new_msg_id = this.state.numMessages + 1;
    console.log(`New message ID ${new_msg_id}`);
    let currentTime = new Date().getTime();

    firebase.database().ref(`Messages/${ride_id}/${currentTime}`).set({
      message_id: new_msg_id,
      sender_id: sender_id,
      recipient_id: recipient_id,
      message: message,
      ts: currentTime
    }).then((data) => {
      if (data) {
        console.log(data);
      }
    }).catch((error) => {
      //error callback
      console.log('error ', error);
    })
  }





/*************************************FIREBASE CODE****************************************************************/

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
