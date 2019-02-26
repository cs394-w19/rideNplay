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
import { ListItem } from 'react-native-elements'
import moment from 'moment'

this.width = Dimensions.get('window').width
class Ride extends React.Component {
    state = {
      subtitle: this.props.rideDesc,
      style: 'black'
    }


    componentWillMount(){
      console.log('\n\n\n' + moment(this.props.rideAge).diff(moment(),'days') + '\n\n\n')
      if(moment(this.props.rideAge).diff(moment(),'days') < 0){
        this.setState({subtitle: 'THIS RIDE HAS EXPIRED', style: 'red'})
      }
      else {
        this.setState({subtitle: this.props.rideDesc})
      } //the correct ride object is already passed in.
    }
    render(){return(
        <ListItem style = {{
          borderColor: '#858687',
          borderBottomWidth: 1,
          width: '100%'
        }}
        leftAvatar={{
          source: { uri: "http://images5.fanpop.com/image/photos/30200000/Nick-3-nick-miller-30219108-300-300.jpg" },
          showEditButton: true,
        }}
        title = {this.props.rideTitle}
        subtitle={this.state.subtitle}
        subtitleStyle={{color: this.state.style}}
        chevron>
        </ListItem>

    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
})

export default Ride
