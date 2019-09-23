import React from 'react';
import PropTypes from 'prop-types';
import {View, ListView, TouchableWithoutFeedback, Image, Text,TouchableHighlight, TouachableNativeFeedback, Dimensions, ScrollView} from 'react-native';

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

import {listPosts, listMorePosts} from '../states/post-actions';
const moment = require('moment');


class MyRecordScreen extends React.Component {
    static propTypes = {
        creatingPost: PropTypes.bool,
        creatingVote: PropTypes.bool,
        toast: PropTypes.string,
        dispatch: PropTypes.func,
        posts: PropTypes.array,
    };

    constructor(props) {
        super(props);

        this.d = new Date();
        
        this.sevenDaySugar = [];

        this.state = {
            fabActive: false,
            text: 'blue',
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)
            })
        };

        this.handleFabClose = this.handleFabClose.bind(this);
        this.handleCreatePost = this.handleCreatePost.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listPosts(this.props.name));
        //this.resetSevenDaySugar();
        //this.computeSugar();
    }

    componentWillReceiveProps(nextProps) {
        //this.computeSugar();
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration,
                testString:"test"
            })
            this.props.dispatch(setToast(''));
        }

        const {name, dispatch, posts} = this.props;
        if (name !== nextProps.name) {
            this.props.dispatch(listPosts(nextProps.name));
        }
        if (posts !== nextProps.posts) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.posts)
            });
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        console.log("In MyRecordScreen")
        console.log(this.props);
        //console.log(this.props.posts);
        console.log(this.props.posts.length);
        //var i
        //for (i = 0; i < 2; i++) {
            /*if(this.props.posts[0] !== undefined){
                //moment(this.props.posts[0]['ts'] * 1000).calendar()
                //console.log(this.props.posts[0]['ts']);
            }*/
            
        //}
        this.resetSevenDaySugar();
        this.computeSugar();
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
                                <Text style={styles.weeklySugarIntakeText}>This week: {this.sumSevenDay()}g</Text>
                            </View>
                            <View style={styles.weeklySugarIntake2}>
                                <Text style={styles.weeklySugarIntakeText}>last week: 0g</Text>
                            </View>
                        
                        
                        
                            <LineChart
                                data={{
                                    labels: [`${moment().subtract(6, 'days').format('dddd')}`, `${moment().subtract(5, 'days').format('dddd')}`, `${moment().subtract(4, 'days').format('dddd')}`, `${moment().subtract(3, 'days').format('dddd')}`, `${moment().subtract(2, 'days').format('dddd')}`, `${moment().subtract(1, 'days').format('dddd')}`, `${moment().format('dddd')}` ],
                                    datasets: [{
                                    data: [ this.sevenDaySugar[6], this.sevenDaySugar[5], this.sevenDaySugar[4], this.sevenDaySugar[3], this.sevenDaySugar[2], this.sevenDaySugar[1], this.sevenDaySugar[0] ],
                                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` ,// optional
                                    strokeWidth: 2 // optional
                                    }]
                                }}
                                width={Dimensions.get('window').width}
                                height={220}
                                chartConfig={{
                                backgroundGradientFrom: '#1E2923',
                                backgroundGradientTo: '#08130D',
                                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                strokeWidth: 2}} // optional, default 3}
                            />
                        
                    </View>

                    

                    <View style={{ height: 130, marginTop: -120}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}
                        >

                        <Category content={this.computeStr(this.sevenDaySugar[6])} day={this.computeDay(moment().subtract(6, 'days').format('dddd'))}/>
                        <Category content={this.computeStr(this.sevenDaySugar[5])} day={this.computeDay(moment().subtract(5, 'days').format('dddd'))}/>
                        <Category content={this.computeStr(this.sevenDaySugar[4])} day={this.computeDay(moment().subtract(4, 'days').format('dddd'))}/>
                        <Category content={this.computeStr(this.sevenDaySugar[3])} day={this.computeDay(moment().subtract(3, 'days').format('dddd'))}/>    
                        <Category content={this.computeStr(this.sevenDaySugar[2])} day={this.computeDay(moment().subtract(2, 'days').format('dddd'))}/>
                        <Category content={this.computeStr(this.sevenDaySugar[1])} day={this.computeDay(moment().subtract(1, 'days').format('dddd'))}/>
                        <Category content={this.computeStr(this.sevenDaySugar[0])} day={this.computeDay(moment().format('dddd'))}/>
                            
                        </ScrollView>
                    </View>

                </Container>
            </View>
        );
    }

    sumSevenDay(){
        var i;
        var sum = 0;
        for(i=0; i<7; i++){
            sum = sum + this.sevenDaySugar[i];
        }
        return sum;
    }

    resetSevenDaySugar(){
        var i;
        for(i=0; i<7; i++){
            this.sevenDaySugar[i] = 0;
        }
    }

    computeStr(temp_int){
        return `${temp_int}g`;
    }

    computeDay(day){
        //debugger;
        //console.log(this.props.posts[0]['ts']);
        if(day == "Sunday"){
            return "SUN";
        }else if(day == "Saturday"){
            return "SAT";
        }else if(day == "Friday"){
            return "FRI";
        }else if(day == "Thursday"){
            return "THU";
        }else if(day == "Wednesday"){
            return "WEN";
        }else if(day == "Tuesday"){
            return "TUE";
        }else if(day == "Monday"){
            return "MON";
        }
    }

    computeSugar(){
        var i;
        console.log("###### In computeSugar ##########");
        console.log(`this.props.posts.length = ${this.props.posts.length}`);
        console.log(`this.sevenDaySugar = ${this.sevenDaySugar}`);
        for(i = 0; i<this.props.posts.length; i++){
            console.log(i);
            console.log(`moment(this.props.posts[i]['ts'] * 1000).format('dddd') = ${ moment(this.props.posts[i]['ts'] * 1000).format('dddd')}`);
            console.log(`moment().format('dddd') = ${moment().format('dddd')}`);
           if( moment(this.props.posts[i]['ts'] * 1000).format('dddd') === moment().format('dddd') ){
                if(this.sevenDaySugar[0] === undefined){
                    this.sevenDaySugar[0] = 0;
                }
                this.sevenDaySugar[0] = this.sevenDaySugar[0] + parseInt(this.props.posts[i]['sugar']);
            }else if( moment(this.props.posts[i]['ts'] * 1000).format('dddd') === moment().subtract(1, 'days').format('dddd') ){
                if(this.sevenDaySugar[1] === undefined){
                    this.sevenDaySugar[1] = 0;
                }
                this.sevenDaySugar[1] = this.sevenDaySugar[1] + parseInt(this.props.posts[i]['sugar']);
            }else if( moment(this.props.posts[i]['ts'] * 1000).format('dddd') === moment().subtract(2, 'days').format('dddd') ){
                if(this.sevenDaySugar[2] === undefined){
                    this.sevenDaySugar[2] = 0;
                }
                this.sevenDaySugar[2] = this.sevenDaySugar[2] + parseInt(this.props.posts[i]['sugar']);
            }else if( moment(this.props.posts[i]['ts'] * 1000).format('dddd') === moment().subtract(3, 'days').format('dddd') ){
                if(this.sevenDaySugar[3] === undefined){
                    this.sevenDaySugar[3] = 0;
                }
                this.sevenDaySugar[3] = this.sevenDaySugar[3] + parseInt(this.props.posts[i]['sugar']);
            }else if( moment(this.props.posts[i]['ts'] * 1000).format('dddd') === moment().subtract(4, 'days').format('dddd') ){
                if(this.sevenDaySugar[4] === undefined){
                    this.sevenDaySugar[4] = 0;
                }
                this.sevenDaySugar[4] = this.sevenDaySugar[4] + parseInt(this.props.posts[i]['sugar']);
            }else if( moment(this.props.posts[i]['ts'] * 1000).format('dddd') === moment().subtract(5, 'days').format('dddd') ){
                if(this.sevenDaySugar[5] === undefined){
                    this.sevenDaySugar[5] = 0;
                }
                this.sevenDaySugar[5] = this.sevenDaySugar[5] + parseInt(this.props.posts[i]['sugar']);
            }else if( moment(this.props.posts[i]['ts'] * 1000).format('dddd') === moment().subtract(6, 'days').format('dddd') ){
                if(this.sevenDaySugar[6] === undefined){
                    this.sevenDaySugar[6] = 0;
                }
                this.sevenDaySugar[6] = this.sevenDaySugar[6] + parseInt(this.props.posts[i]['sugar']);
            }
        }

        //return this.sevenDaySugar;
        /*if(this.props.posts[0] !== undefined){
            console.log(this.props.posts[0]['ts']);
        }*/
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

    /*retuenScreenWidth(){
        return screenWidth = Dimensions.get('window').width;
    }
    
    returnChartData(){
        if(this.props.posts.length !== 0){
            return chartData = {
                labels: [`${moment().subtract(6, 'days').format('dddd')}`, `${moment().subtract(5, 'days').format('dddd')}`, `${moment().subtract(4, 'days').format('dddd')}`, `${moment().subtract(3, 'days').format('dddd')}`, `${moment().subtract(2, 'days').format('dddd')}`, `${moment().subtract(1, 'days').format('dddd')}`, `${moment().format('dddd')}` ],
                datasets: [{
                data: [ this.sevenDaySugar[6], this.sevenDaySugar[5], this.sevenDaySugar[4], this.sevenDaySugar[3], this.sevenDaySugar[2], this.sevenDaySugar[1], this.sevenDaySugar[0] ],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` ,// optional
                strokeWidth: 2 // optional
                }]
            };
        }
    }
    
    returnChartConfig(){
        if(this.props.posts.length !== 0){
            return chartConfig = {
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2 // optional, default 3
            }
        }
    }*/
    
}

//const this.sevenDaySugar = [];

/*const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
}

const chartData = {
    labels: [`${moment().subtract(6, 'days').format('dddd')}`, `${moment().subtract(5, 'days').format('dddd')}`, `${moment().subtract(4, 'days').format('dddd')}`, `${moment().subtract(3, 'days').format('dddd')}`, `${moment().subtract(2, 'days').format('dddd')}`, `${moment().subtract(1, 'days').format('dddd')}`, `${moment().format('dddd')}` ],
    datasets: [{
    data: [ this.sevenDaySugar[6], this.sevenDaySugar[5], this.sevenDaySugar[4], this.sevenDaySugar[3], this.sevenDaySugar[2], this.sevenDaySugar[1], this.sevenDaySugar[0] ],
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` ,// optional
    strokeWidth: 2 // optional
    }]
};*/


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
        justifyContent:'center'
    },
    weeklySugarIntake1:{
        borderRadius:20,
        backgroundColor:'black',
        width:200,
        height:40,
        justifyContent:'center',
        alignSelf: 'center',
        marginTop: -30,
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
    toast: state.toast,
    posts: state.post.posts,
    ...state.userForm
}))(MyRecordScreen);
