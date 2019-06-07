import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image, Text,TouchableHighlight, TouachableNativeFeedback, Dimensions, ScrollView} from 'react-native';

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

import AgeGenderWeightTextInput from './AgeGenderWeightTextInput';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'


class MyRecordScreen extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool.isRequired,
        creatingVote: PropTypes.bool.isRequired,
        toast: PropTypes.string.isRequired,
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
                        <View style={styles.weeklySugarIntake1}>
                            <Text style={styles.weeklySugarIntakeText}>This week: 64g</Text>
                        </View>
                        <View style={styles.weeklySugarIntake2}>
                            <Text style={styles.weeklySugarIntakeText}>last week: 100g</Text>
                        </View>
                        <LineChart
                            data={chartData}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                        />
                    </View>

                    <View style={{ height: 130, marginTop: -120 }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}
                        >
                            <Category content="50g" day="MON"/>
                            <Category content="60g" day="TUE"/>
                            <Category content="69g" day="WEN"/>
                            <Category content="35g" day="THU"/>
                            <Category content="77g" day="FRI"/>
                            <Category content="5g" day="SAT"/>
                            <Category content="0g" day="SUN"/>
                        </ScrollView>
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
        borderRadius:20,
        backgroundColor:'black',
        width:200,
        height:40,
        justifyContent:'center',
        alignSelf: 'center',
        marginBottom:20
    },
    weeklySugarIntakeText:{
        color: 'white',
        textAlign:'center',
        fontWeight: "500"
    },
    ScrollViewContentContainer:{
        height: 900,
        width: 900,
    },
    ScrollViewContainer:{
        flex: 1
    }
};

export default connect((state, ownProps) => ({
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast
}))(MyRecordScreen);
