import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image, Text, Button,TouchableHighlight, TouachableNativeFeedback } from 'react-native';

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
import {listUsers} from '../states/user-actions';

class SettingScreen2 extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool.isRequired,
        creatingVote: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        //users: PropTypes.array.isRequired
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
    }

    /*componentDidMount() {
        
        this.props.dispatch(listUsers());
        
        //var a = this.props.user.users[0].age;
    }*/

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
        console.log("sssssssss");
        console.log(this.props);
        return (
            <View style={styles.inputcontainer}>
                <View style={styles.title_container}>
                    <Text style = {styles.title}>The</Text>
                    <Text style = {styles.title}>SugarFree</Text>
                    <Text style = {styles.title}>Project</Text>
                    
                </View>
                
                <View style={styles.recommended_intake_container}>
                    <Text style = {styles.recommended_intake}>Your daily recommended</Text>
                    <Text style = {styles.recommended_intake}>sugar intake is {this.props.sugar_should_intake}g</Text>
                </View>
                    

                <TouchableWithoutFeedback  onPress={this.handleSubmitForm}>
                    <View style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Go!</Text>
                    </View>
                </TouchableWithoutFeedback >
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
        this.props.navigation.navigate('Main');
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
    },
    recommended_intake_container:{
        marginBottom: 40
    },
    recommended_intake:{
        fontSize: 20,
        textAlign:'center',
        fontWeight: "300",
        color: 'black',
        width: 225
    }
};

export default connect((state, ownProps) => ({
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast,
    ...state.userForm,
    ...state.user
    
    //...state.userForm
}))(SettingScreen2);
