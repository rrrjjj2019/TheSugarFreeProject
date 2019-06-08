import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';
import {connect} from 'react-redux';

class AgeGenderWeightTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
      <TextInput
        {...this.props}
        style={styles.TextInputStyle}
        onChangeText={/*(text) => this.setState({text})*/ this.props.onChangeText}
        value={this.props.value}
      />
    );
  }
}

const styles = {
  TextInputStyle: {
    height: 40,
    borderColor: 'rgb(100, 204, 203)',
    borderWidth: 2,
    textAlign: 'center',
    marginVertical: 10,
    borderRadius:20,
    width: 220,
  }
};

// skip this line if using Create React Native App
// AppRegistry.registerComponent('AwesomeProject', () => UselessTextInput);

export default connect(state => ({
    //searchText: state.search.searchText,
}))(AgeGenderWeightTextInput);
