import React from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
import {ListItem} from 'react-native-elements'
import moment from 'moment'

this.width = Dimensions.get('window').width;

class Ride extends React.Component {
    state = {
        subtitle: this.props.rideDesc,
        style: 'black',
        expiredRide: false
    };


    componentWillMount() {
        if (moment(this.props.rideAge).diff(moment(), 'days') < 0) {
            this.setState({subtitle: `Ride expired ${moment().diff(moment(this.props.rideAge), 'days')} days ago.`, expiredRide: true})
        }
        else {
            this.setState({subtitle: this.props.rideDesc, expiredRide: false})
        } //the correct ride object is already passed in.
    }

    checkDriver(ride){
        let expired = moment(ride.rideAge).diff(moment(), 'days') < 0;
        // returns a bool whether a ride has a driver or not and is not expired.
        if (typeof ride.driver !== 'undefined' && !expired) {
            return `Driver: ${ride.driver}`;
        } else if (typeof ride.driver === 'undefined' && expired) {
            return 'No driver found.'
        } else {
            return 'Searching for driver.'
        }
    }

    render() {
        return (
            <ListItem style={styles.info}
                      leftAvatar={{
                          source: {uri: "http://images5.fanpop.com/image/photos/30200000/Nick-3-nick-miller-30219108-300-300.jpg"},
                          showEditButton: true,
                      }}
                      title={this.props.rideTitle}
                      rightTitle={this.checkDriver(this.props)}
                      rightTitleStyle={styles.driverInfo}
                      subtitle={this.state.subtitle}
                      subtitleStyle={{color: this.state.style}}
                      // long conditional to check for expired ride, if it's not expired, it checks if it's pending or accepted
                      containerStyle={[(this.state.expiredRide === true) ? styles.expiredRide : ((typeof this.props.driver !== 'undefined') ? styles.acceptedRide : styles.pendingRide)]}
                      chevron>
            </ListItem>

        )
    }
}

const styles = StyleSheet.create({
    info: {
        backgroundColor: '#edeeef',
        width: '100%'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    driverInfo:{
        fontSize: 13,
        fontWeight: 'bold'

    },
    acceptedRide: {
        backgroundColor: '#BFEECF',
    },
    pendingRide: {
        backgroundColor: '#F8E68E',
    },
    expiredRide: {
        backgroundColor: '#EFA7A7',
    }
});

export default Ride;
