import React from 'react';
import { View, Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, Navigation } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CenterIcon from '../components/CenterIcon';
import HomeScreen from '../screens/HomeScreen';
import NewRide from '../screens/NewRide';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      style={{backgroundColor:"#00BFD8"}}
      name={
        Platform.OS === 'ios'
          ? `ios-car`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  NewRide: NewRide,
});

LinksStack.navigationOptions = {
  tabBarLabel: '+',
  tabBarIcon: ({ focused }) => (
    <View style={{
          alignItems: 'center',
          height: 80,
          width: 80,
          borderRadius: 100,
          backgroundColor: 'blue',
          paddingTop: 15}}>
    <CenterIcon
      size={50}
     style={{backgroundColor:"#00BFD8", size: '80px'}}
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-link'}
    />
    </View>
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
