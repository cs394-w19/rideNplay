import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

export default class DateTimePickerTester extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: "",
      title: this.props.name
    }
  }



  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handlePicked = (picked) => {

    if(this.props.mode == "date"){
    this.setState({title: moment(picked).format('MM/DD/YYYY').toString()})
    console.log('A date has been picked: ', picked);
    this._hideDateTimePicker();
    this.props.set(picked)
    }
    else if(this.props.mode == "time"){
    this.setState({title: moment(picked).format("h:mm A").toString()})
    console.log('A time has been picked: ', picked);
    this._hideDateTimePicker();
    this.props.set(picked)
    }
  };

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text style={styles.dateText}> {this.state.title} </Text>
        </TouchableOpacity>
        <DateTimePicker
          mode={this.props.mode}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handlePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }


}


const styles = StyleSheet.create({
  dateText: {
    fontSize: 20,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
