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

this.width = Dimensions.get('window').width
class Ride extends React.Component {
    state = {
      background: '#edeeef'
    }


    componentWillMount(){
      console.log('\n\n\n' + this.props.rideAge+ '\n\n\n')
      if(this.props.rideAge){
        return
      }
    }
    render(){return(
        <ListItem style = {{
          backgroundColor: this.state.background,
          borderColor: '#858687',
          borderBottomWidth: 1,
          width: '100%'
        }}
        leftAvatar={{
          source: { uri: "http://images5.fanpop.com/image/photos/30200000/Nick-3-nick-miller-30219108-300-300.jpg" },
          showEditButton: true,
        }}
        title = {this.props.rideTitle}
        subtitle={this.props.rideDesc}
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
