import React from 'react';
import { ScrollView, Switch, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { ExpoConfigView } from '@expo/samples';
import InfoText from '../components/InfoText';
import Chevron from '../components/Chevron';
import BaseIcon from '../components/Icon'
import Colors from '../components/Colors'
import Profile from '../components/Profile'
//For reference: https://github.com/nattatorn-dev/react-native-user-profile/blob/master/screens/Profile3/Profile.js


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
})

export default class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    if (navigation.getParam('inProfile')){
    return {
      headerTitle: 'Profile',
      headerLeft: (<Button
            onPress={() => params.handle()}
            title="<Back"
            color="blue"
          />)
    }
  }
  else {
    return {
      headerTitle: 'Settings'
    }
  }
  };

  state = {
    pushNotifications: true,
    inProfile: false,
  };

  onPressOptions = () => {
    this.props.navigation.navigate('options')
  };

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  };

  toggleIn = () => {
    this.setState(state => ({
      inProfile: !state.inProfile,
    }))
    this.props.navigation.setParams({ inProfile: !this.state.inProfile, handle: this.toggleOut})
  }

  toggleOut = () => {
    this.setState(state => ({
      inProfile: !state.inProfile,
    }))
    this.props.navigation.setParams({ inProfile: !this.state.inProfile })
  }

  render() {
    if(this.state.inProfile == false) {
    return (
     <ScrollView style={styles.scroll}>
     <InfoText text="Your Profile" />
     <TouchableOpacity style={styles.userRow} onPress={() => this.toggleIn()}>
      <View style={styles.userImage}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: "https://media.licdn.com/dms/image/C4E03AQFX7svploE2hA/profile-displayphoto-shrink_800_800/0?e=1557964800&v=beta&t=o-EihqNTmsbF4jYCrxg2RhEm3u-f7KAbIUnMQXCDq_g",
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>David Kim</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              Davidkim@gmail.com
            </Text>
          </View>
      </TouchableOpacity>

      <InfoText text="Your Account" />

      <View>
          <ListItem
              hideChevron
              title="Driver Mode"
              containerStyle={styles.listItemContainer}
              rightElement={
                  <Switch
                      onValueChange={this.onChangePushNotifications}
                      value={this.state.pushNotifications}
                  />
              }
              leftIcon={
                  <BaseIcon
                      containerStyle={{
                          backgroundColor: '#FFADF2',
                      }}
                      icon={{
                          type: 'material',
                          name: 'ios-car',
                      }}
                  />
              }
          />

          <ListItem
            hideChevron
            title="Push Notifications"
            containerStyle={styles.listItemContainer}
            rightElement={
              <Switch
                onValueChange={this.onChangePushNotifications}
                value={this.state.pushNotifications}
              />
            }
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FFADF2',
                }}
                icon={{
                  type: 'material',
                  name: 'notifications',
                }}
              />
            }
          />

          <ListItem
            title="Location"
            rightTitle="New York"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#57DCE7' }}
                icon={{
                  type: 'material',
                  name: 'place',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Language"
            rightTitle="English"
            rightTitleStyle={{ fontSize: 15 }}
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#FEA8A1' }}
                icon={{
                  type: 'material',
                  name: 'language',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
         <InfoText text="More" />
        <View>
          <ListItem
            title="About rideNplay"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#A4C8F0' }}
                icon={{
                  type: 'ionicon',
                  name: 'md-information-circle',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Terms and Policies"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{ backgroundColor: '#C6C7C6' }}
                icon={{
                  type: 'entypo',
                  name: 'light-bulb',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Share our App"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#C47EFF',
                }}
                icon={{
                  type: 'entypo',
                  name: 'share',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Rate Us"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#FECE44',
                }}
                icon={{
                  type: 'entypo',
                  name: 'star',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
          <ListItem
            title="Send FeedBack"
            onPress={() => this.onPressOptions()}
            containerStyle={styles.listItemContainer}
            leftIcon={
              <BaseIcon
                containerStyle={{
                  backgroundColor: '#00C001',
                }}
                icon={{
                  type: 'materialicon',
                  name: 'feedback',
                }}
              />
            }
            rightIcon={<Chevron />}
          />
        </View>
      </ScrollView>



    );
}
else{
  return(
    <View>
    <Profile name='Nick Miller'/>
    </View>
    )
  }
}
}
