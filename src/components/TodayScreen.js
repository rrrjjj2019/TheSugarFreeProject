import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image, Text, Button,TouchableHighlight, TextInput} from 'react-native';

import {Container, Icon, Fab, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import ParallaxNavigationContainer from './ParallaxNavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';
import WeatherDisplay from './WeatherDisplay';

import {connect} from 'react-redux';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';

import AgeGenderWeightTextInput from './AgeGenderWeightTextInput';

import {inputAge, inputWeight, inputGender, inputDanger, createUser, sugarGoal, inputName} from '../states/user-actions';
//import console = require('console');

class TodayScreen extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool.isRequired,
        creatingVote: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        age: PropTypes.string,
        weight: PropTypes.string,
        gender: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            fabActive: false,
            text: 'blue'
        };

        this.handleFabClose = this.handleFabClose.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);

        this.handleInputChange_AGE = this.handleInputChange_AGE.bind(this);
        this.handleInputChange_WEIGHT = this.handleInputChange_WEIGHT.bind(this);
        this.handleInputChange_GENDER = this.handleInputChange_GENDER.bind(this);
        this.handleInputChange_NAME = this.handleInputChange_NAME.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration,
                testString:"test"
            })
            this.props.dispatch(setToast(''));
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.inputcontainer}>
                <View style={styles.title_container}>
                    <Text style = {styles.title}>The</Text>
                    <Text style = {styles.title}>SugerFree</Text>
                    <Text style = {styles.title}>Project</Text>
                </View>
                    
                    
                    <AgeGenderWeightTextInput
                        getRef={el => {this.inputEl = el}}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={/*(text) => this.setState({text})*/ this.handleInputChange_AGE}
                        value={this.props.age}
                        style={styles.input1}
                        placeholder={"Your age?"}
                        placeholderTextColor={'rgb(100, 204, 203)'}
                    />
                
                    <AgeGenderWeightTextInput
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={/*(text) => this.setState({text})*/ this.handleInputChange_GENDER}
                        value={this.props.gender}
                        style={styles.input1}
                        placeholder={"Your gender?"}
                        placeholderTextColor={'rgb(100, 204, 203)'} 
                    />
                
                    <AgeGenderWeightTextInput
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={/*(text) => this.setState({text})*/this.handleInputChange_WEIGHT}
                        value={this.props.weight}
                        style={styles.input1}
                        placeholder={"Your weight?"}
                        placeholderTextColor={'rgb(100, 204, 203)'} 
                    />

                    <AgeGenderWeightTextInput
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={/*(text) => this.setState({text})*/this.handleInputChange_NAME}
                        value={this.props.name}
                        style={styles.input1}
                        placeholder={"Your name?"}
                        placeholderTextColor={'rgb(100, 204, 203)'} 
                    />

                    <TouchableWithoutFeedback onPress={this.handleSubmitForm}>
                        <View style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Go!</Text>
                        </View>
                    </TouchableWithoutFeedback>
            </View>
        );
    }

    handleFabClose() {
        this.setState({fabActive: !this.state.fabActive});
    }

    handleCreatePost(mood) {
        this.handleFabClose();
        this.props.dispatch(selectMood(mood));
        this.props.navigation.navigate('PostForm');
    }

    handleSubmitForm(){
        this.setState({testString: 'test_successfully'});
        //debugger;
        this.props.dispatch(sugarGoal(this.props.age, this.props.weight));
        this.props.dispatch(createUser(this.props.age, this.props.weight, this.props.gender, this.props.sugar_should_intake, this.props.name));
        this.props.navigation.navigate('SettingScreen2');
    }

    handleInputChange_AGE(e) {
        const age = e
        this.props.dispatch(inputAge(age));
        if (age && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputChange_WEIGHT(e) {
        const weight = e
        this.props.dispatch(inputWeight(weight));
        if (weight && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputChange_GENDER(e) {
        const gender = e
        this.props.dispatch(inputGender(gender));
        if (gender && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleInputChange_NAME(e) {
        const name = e
        this.props.dispatch(inputName(name));
        if (name && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }
}

const styles = {
    fabMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: appColors.mask
    },
    fabContainer: {
        marginLeft: 10
    },
    fab: {
        backgroundColor: appColors.primary
    },
    mood: {
        backgroundColor: appColors.primaryLightBorder
    },
    moodIcon: {
        color: appColors.primaryLightText
    },
    input1:{
        flex:1,
        alignItems: 'center',
        textAlign: 'center',
    },
    input2:{
        flex:1,
        alignItems: 'center',
    },
    input3:{
        flex:1,
        alignItems: 'center',
    },
    inputcontainer:{
        flex:1,
        justifyContent:'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    title:{
        fontSize: 43,
        textAlign:'left',
        fontWeight: "600",
        color: 'black',
        width: 225
    },
    title_container:{
        marginBottom: 40
    },
    submitButton:{
        borderRadius:20,
        backgroundColor:'rgb(100, 204, 203)',
        width:100,
        height:40,
        justifyContent:'center'
    },
    submitButtonText:{
        color: 'white',
        textAlign:'center',
        fontWeight: "500"
    }
};

export default connect((state/*, ownProps*/) => ({
    /*creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast,
    age: state.age,
    weight: state.weight,
    gender: state.gender*/
    ...state.userForm
}))(TodayScreen);
