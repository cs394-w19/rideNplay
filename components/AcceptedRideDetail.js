import React from 'react'
import { View,
         Text,
         StyleSheet,
         Image,
         ScrollView,
         TouchableOpacity,
         PanResponder,
         Animated,
         Dimensions,
         Alert,
         LayoutAnimation,
       } from 'react-native'
import Moment from 'moment';
import { Header } from 'react-native-elements'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

class AcceptedRideDetail extends React.Component {
  state = {
    
    index: 0,
    routes: [
      { key: 'one', title: 'Info' },
      { key: 'two', title: 'See Route' },
    ]
  
  };

  componentWillMount(){
    console.log(this.props.ride) //the correct ride object is already passed in.
  }

  // the ride object is passed in, just style it with components and such nicely
  springin = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(250, 'easeIn', 'scaleY'))
  }
    
  conditionaldriver(){
    if (this.props.ride.driver == "N/A"){
      return
    }
    else {
      return <View style = {{flexDirection: 'row'}}>
          <Text style = {{fontSize: 20}}> Pickup by: {this.props.ride.driver} </Text>
          <Text style = {styles.rightColumn}> {this.props.ride.rating}/10 </Text>
        </View>
    }
  };

  
  render(){
    const firstRoute = () => (
    <ScrollView style = {styles.detailsView}>
         {this.conditionaldriver()}
         <Text style = {{fontSize: 20}}> For: {this.props.ride.child_id} {'\n'} </Text>
         <View style = {{flexDirection: 'row'}}>
          <Text style = {styles.detailsView}> From: {this.props.ride.pickup_loc} </Text>
           <Text style = {styles.rightColumn}> At: {this.props.ride.pickup_time}</Text>
         </View>
           <Text style = {styles.detailsView}> Dest: {this.props.ride.dropoff_loc} {'\n'}</Text>
       </ScrollView>
    );

  const secondRoute = () => (
    <View>
      <Image
        style={{width: 450, height: 600}}
        source={require('./map.png')}
      />
    </View>
    );

    return(
      <TabView
          navigationState={this.state}
          renderScene={SceneMap({
          one: firstRoute,
          two: secondRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          >{this.springin()}</TabView>
     // </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsView:{
    backgroundColor: 'whitesmoke',
    fontSize: 20,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  rightColumn:{
    textAlign: 'right',
    fontSize: 20,
    position: 'absolute',
    right: 5
  }
})


export default AcceptedRideDetail
