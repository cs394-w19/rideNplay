import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

export default class DateTimePickerTester extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      title: props.name,
      selectedDate: ""
  };

  }



  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    // this.setState({title: moment(date).format('MM/DD/YYYY').toString()})
    this.setState({ selectedDate: date.toString() });
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
  };

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text style={styles.dateText}> {this.state.title}</Text>
        </TouchableOpacity>
        <DateTimePicker
          mode={this.props.mode}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
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
