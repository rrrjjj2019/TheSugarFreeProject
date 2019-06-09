import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback, Image, Text, StyleSheet} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import {Container, Icon, Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';

import NavigationContainer from './NavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';
import WeatherDisplay from './WeatherDisplay';
import {connect} from 'react-redux';
import {setToast} from '../states/toast';


class MainScreen extends React.Component{
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);

        this.handleIntake = this.handleIntake.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {
            Toast.show({
                text: nextProps.toast,
                position: 'bottom',
                duration: appMetrics.toastDuration
            })
            this.props.dispatch(setToast(''));
        }
    }
   /* componentDidMount() {
        console.log(this.props);
    }*/
    

    render(){
        const {navigate} = this.props.navigation;
        console.log("In MainScreen");
        console.log(this.props);
        if((this.props.todaySum/this.props.sugar_should_intake*100).toFixed(1) > 100){
            return (
                <NavigationContainer
                    navigate={navigate}
                    title="SugerFreeProject"
                    titleLeft={80}
                    titleTop={40}>
                        <View style={styles.progressCircleWarning}>
                            <ProgressCircle
                                percent={(this.props.todaySum/this.props.sugar_should_intake*100).toFixed(1)}
                                radius={90}
                                borderWidth={25}
                                shadowColor="#eeeeee"
                                color= "#AE0600"
                                bgColor="#fff">
                                <Text style={styles.disp}>{(this.props.todaySum/this.props.sugar_should_intake*100).toFixed(1)}%</Text>
                            </ProgressCircle>
                        </View>
                        
                        <View style={styles.progressCircle1}>
                            <ProgressCircle
                                percent={80}
                                radius={90}
                                borderWidth={25}
                                color="#FF7700"
                                shadowColor="#eeeeee"
                                bgColor="#fff">
                                <Text style={styles.disp}>{'streak\n 3 days'}</Text>
                            </ProgressCircle>
                        </View>
                        <View style={styles.progressCircle2}>
                            <ProgressCircle
                                percent={100}
                                radius={90}
                                borderWidth={25}
                                color="#06AE00"
                                shadowColor="#eeeeee"
                                bgColor="#fff">
                                <Text style={styles.disp}>{'Goal'}</Text>
                                <Text style={styles.disp}>{this.props.sugar_should_intake}</Text>
                            </ProgressCircle>
                        </View>
                </NavigationContainer>
    
            );
        }
        else{
            return (
                <NavigationContainer
                    navigate={navigate}
                    title="SugerFreeProject"
                    titleLeft={80}
                    titleTop={40}>
                        <View style={styles.progressCircle0}>
                            <ProgressCircle
                                percent={(this.props.todaySum/this.props.sugar_should_intake*100).toFixed(1)}
                                radius={90}
                                borderWidth={25}
                                color= "#06AE00"
                                shadowColor="#eeeeee"
                                bgColor="#fff">
                                <Text style={styles.disp}>{(this.props.todaySum/this.props.sugar_should_intake*100).toFixed(1)}%</Text>
                            </ProgressCircle>
                        </View>
                        
                        <View style={styles.progressCircle1}>
                            <ProgressCircle
                                percent={80}
                                radius={90}
                                borderWidth={25}
                                color="#FF7700"
                                shadowColor="#eeeeee"
                                bgColor="#fff">
                                <Text style={styles.disp}>{'streak\n 3 days'}</Text>
                            </ProgressCircle>
                        </View>
                        <View style={styles.progressCircle2}>
                            <ProgressCircle
                                percent={100}
                                radius={90}
                                borderWidth={25}
                                color="#06AE00"
                                shadowColor="#eeeeee"
                                bgColor="#fff">
                                <Text style={styles.disp}>{'Goal'}</Text>
                                <Text style={styles.disp}>{this.props.sugar_should_intake}</Text>
                            </ProgressCircle>
                        </View>
                </NavigationContainer>
    
            );
        }
        
    }

    handleIntake(){
        this.props.navigation.navigate('Add');
    }

}

const styles = StyleSheet.create({

    progressCircle0: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        //color: "#06AE00",
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressCircle1: {
        position: 'absolute',
        top: 300,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressCircle2: {
        position: 'absolute',
        top: 500,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    disp: {
        fontWeight: '900',
        fontSize: 30
    },
    progressCircleWarning: {
        //color: "#AE0600",
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default connect((state, ownProps) => ({
    toast: state.toast,
    //...state.user
    ...state.userForm,
    ...state.post
}))(MainScreen);
