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
         Alert
       } from 'react-native'
import { MKButton, MKTextField, MKColor } from 'react-native-material-kit'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

class AcceptedRideDetail extends React.Component {

  componentWillMount(){
    console.log(moment.range(this.props.event.startTime, this.props.event.endTime))
  }

  render(){
    return(
      <View style = {styles.detailsView}>
      <TouchableOpacity onPress = {() => {this.props.noneSelected()}}>
        <Text style = {styles.backButton}> &lt; Back </Text>
      </TouchableOpacity>
      <View style = {styles.info}>
          <Text style = {styles.title}> {this.props.event.name} </Text>
            <Text style = {styles.start}> Starts: {moment(this.props.event.startDate).format('LL')} at {this.props.event.startTime}</Text>
            <Text style = {styles.start}> Ends: {moment(this.props.event.endDate).format('LL')} at {this.props.event.endTime}</Text>
      </View>
      <View>
      <Text style = {styles.detailHeader}>Details</Text>
      <Text style = {styles.description}>{this.props.event.description}</Text>
      <TouchableOpacity style = {styles.cancelView} onPress = {this.deleteEvent}>
        <Text style = {styles.cancel}> CANCEL EVENT </Text>
      </TouchableOpacity>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  info: {
    padding: 10,
    backgroundColor: '#def',
  },
  backButton: {
      marginTop: 25,
      fontSize: 15,
      marginBottom: 10,
      marginLeft: 10,
      color: '#22f'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 15
  },
  start: {
    fontSize: 18,
    textAlign: 'center',
  },
  detailHeader: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  detailsView: {
    flex: 1,
    backgroundColor: '#fff'
  },
  description: {
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  cancel: {
      fontWeight: 'bold',
      margin: 8,
      textAlign: 'center',
      color: 'white',
  },
  cancelView: {
    alignSelf: 'center',
    backgroundColor: 'red',
    width: this.width - 175,
    borderRadius: 20,
    margin: 5
  },
})


export default AcceptedRideDetail
