import React from 'react';
import PropTypes from 'prop-types';
import {View,  TouchableWithoutFeedback, Image, Text,TouchableHighlight, TouachableNativeFeedback, Dimensions, ScrollView} from 'react-native';

import {Container, Icon, Fab, Toast, Header, Left, Body, Right, Button, Title} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import ParallaxNavigationContainer from './ParallaxNavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';
import WeatherDisplay from './WeatherDisplay';
import Category from './GridContent';

import {connect} from 'react-redux';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';
import {createGoalIncrease} from '../states/user-actions'

import AgeGenderWeightTextInput from './AgeGenderWeightTextInput';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'


class SetGoalScreen extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool,
        creatingVote: PropTypes.bool,
        toast: PropTypes.string,
        dispatch: PropTypes.func.isRequired
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
        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleIncrease = this.handleIncrease.bind(this);
        this.handleDecrease = this.handleDecrease.bind(this);
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
        console.log("In SetGoalScreen");
        console.log(this.props);
        console.log(this.props[0].sugar_should_intake);
        return (
            
            
            
            <View style={styles.screenContainer}>
                <Container>
                    <Header style={styles.header}>
                        <Left>
                            <Button transparent onPress={this.handleGoBack}>
                            <Icon name='arrow-back' style={styles.icon} />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.headerTitle}>MyRecord</Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    
                    <View style={styles.chartContainer}>
                        <View style={styles.arrow}>
                            <TouchableWithoutFeedback  onPress={this.handleIncrease}>
                                <View style={styles.submitButton}>
                                    <Image source={require('../images/arrowUp.png')}
                                        style={{ flex: 2, width: 120, height: 150, resizeMode: 'cover' }}
                                    />
                                </View>
                            </TouchableWithoutFeedback >
                        </View>
                        <View style={styles.weeklySugarIntake2}>
                            <Text style={styles.dailySugarIntakeText}>{this.props[0].sugar_should_intake}g/day</Text>
                        </View>
                        <View style={styles.arrow}>
                            <TouchableWithoutFeedback  onPress={this.handleDecrease}>
                                <View style={styles.submitButton}>
                                    <Image source={require('../images/arrowDown.png')}
                                        style={{ flex: 2, width: 120, height: 150, resizeMode: 'cover' }}
                                    />
                                </View>
                            </TouchableWithoutFeedback >
                        </View>
                    </View>
                </Container>
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
        this.props.navigation.navigate('Today');
    }

    handleGoBack(){
        this.props.navigation.navigate('Main');
    }

    handleIncrease(){
        this.props.dispatch(createGoalIncrease(this.props.name, this.props[0].sugar_should_intake+5));
    }

    handleDecrease(){
        this.props.dispatch(createGoalIncrease(this.props.name, this.props[0].sugar_should_intake-5));
    }
}

const screenWidth = Dimensions.get('window').width;
const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [ 20, 45, 28, 80, 99, 43 ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` ,// optional
      strokeWidth: 2 // optional
    }]
};
const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  }

const styles = {
    screenContainer:{
        flex:1,
        justifyContent:'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginTop: 25
    },
    title:{
        fontSize: 43,
        textAlign:'left',
        fontWeight: "600",
        color: 'black',
        width: 225
    },
    title_container:{
        marginTop:-100,
        marginBottom: 40,
        justifyContent:'flex-start'
    },
    submitButton:{
        width:100,
        height:100,
        justifyContent:'center',
        alignItems: 'center'
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
    },
    inputContainer:{
        flex:1,
        justifyContent:'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    header:{
        backgroundColor: 'white',
    },
    headerTitle:{
        color: 'black',
        fontSize: 25,
        fontWeight: "500"
    },
    icon:{
        color: 'black'
    },
    chartContainer:{
        flex:1,
        justifyContent:'center'
    },
    weeklySugarIntake1:{
        borderRadius:20,
        backgroundColor:'black',
        width:200,
        height:40,
        justifyContent:'center',
        alignSelf: 'center',
        marginTop: -60,
        marginBottom:20
    },
    weeklySugarIntake2:{
        width:300,
        height:150,
        justifyContent:'center',
        alignSelf: 'center',
        marginBottom:20
    },
    dailySugarIntakeText:{
        color: 'black',
        textAlign:'center',
        fontWeight: "800",
        fontSize: 60
    },
    ScrollViewContentContainer:{
        height: 900,
        width: 900,
    },
    ScrollViewContainer:{
        flex: 1
    },
    arrow:{
        justifyContent:'center',
        alignSelf: 'center',
        flex:1
    },
    iconArrow:{
        color: 'black',
        size: 50
    }
};

export default connect((state, ownProps) => ({
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast,
    ...state.userForm,
    ...state.user.users
}))(SetGoalScreen);
