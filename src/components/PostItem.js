import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Platform} from 'react-native';

import {connect} from 'react-redux';

import {setToast} from '../states/toast';

import moment from 'moment';
import {ListItem, Icon} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';


class PostItem extends React.Component {
    static propTypes = {
        id: PropTypes.number,

        //text: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        posts: PropTypes.array,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {id/*, mood, text*/, ts/*, clearVotes, cloudsVotes, drizzleVotes, rainVotes, thunderVotes, snowVotes, windyVotes, tooltipOpen*/} = this.props;
        console.log("In PostItem");
        console.log(this.props);
        return (
            <ListItem style={StyleSheet.flatten(styles.listItem)}>
                <View style={styles.post}>
                    
                    <View style={styles.wrap}>
                        <Text style={styles.ts}>{moment(ts * 1000).calendar()}</Text>
                        <Text style={styles.text}>drink: {this.props.drinkName}</Text>
                        <Text style={styles.text}>sugar: {this.props.sugar}g</Text> 
                    </View>
                </View>
            </ListItem>
        );
    }


}

/*
 * When styling a large number of components, use StyleSheet.
 * StyleSheet makes it possible for a component to refer to a style object by ID
 * instead of creating a new style object every time.
 */
const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: 0
    },
    post: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor : 'white',
        marginLeft : 20,
        borderColor: 'rgb(0, 204, 203)',
        borderWidth: 5,
        borderRadius:20,
    },
    mood: {
        width: 48,
        marginLeft: 12,
        marginRight: 8,
        top: 12,
        alignItems: 'center'
    },

    wrap: {
        flex: 1
    },
    ts: {
        color: 'black',
        textAlign: 'center',
        fontSize: 23,
        fontWeight: "600"
    },
    text: {
        fontSize: 17,
        fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto',
        color: appColors.text,
        marginTop: 4,
        marginBottom: 4,
        textAlign: 'center',
    }
});

export default connect((state, ownProps) => ({
    posts: state.post.posts
}))(PostItem);
