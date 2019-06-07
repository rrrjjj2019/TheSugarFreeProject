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

    render(){
        const {navigate} = this.props.navigation;
        return (
            <NavigationContainer
                navigate={navigate}
                title="SugerFreeProject"
                titleLeft={80}
                titleTop={40}>
                    <View style={styles.progessCircle0}>
                        <ProgressCircle
                            percent={30}
                            radius={90}
                            borderWidth={15}
                            color="#3399FF"
                            shadowColor="#999"
                            bgColor="#fff">
                            <Text style={{ fontSize: 30 }}>{'today\n 30%'}</Text>
                        </ProgressCircle>
                    </View>
                    <View style={styles.progessCircle1}>
                        <ProgressCircle
                            percent={80}
                            radius={90}
                            borderWidth={15}
                            color="#FF7700"
                            shadowColor="#999"
                            bgColor="#fff">
                            <Text style={{ fontSize: 30 }}>{'streak\n 3 days'}</Text>
                        </ProgressCircle>
                    </View>
                    <View style={styles.progessCircle2}>
                        <ProgressCircle
                            percent={100}
                            radius={90}
                            borderWidth={15}
                            color="#06AE00"
                            shadowColor="#999"
                            bgColor="#fff">
                            <Text style={{ fontSize: 28 }}>{'Goal\n 50g/daily'}</Text>
                        </ProgressCircle>
                    </View>
            </NavigationContainer>

        );
    }

    handleIntake(){
        this.props.navigation.navigate('Add');
    }

}

const styles = StyleSheet.create({

    progessCircle0: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progessCircle1: {
        position: 'absolute',
        top: 300,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progessCircle2: {
        position: 'absolute',
        top: 500,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default connect((state, ownProps) => ({
    toast: state.toast
}))(MainScreen);
