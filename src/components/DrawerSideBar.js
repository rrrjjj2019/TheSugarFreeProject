import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Platform, ImageBackground} from 'react-native'

import {Container, Content, Thumbnail, Icon, Badge, Button, Text as NbText} from 'native-base';
import appColors from '../styles/colors';

export default class DrawerSideBar extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    };

    render() {
      const {navigate} = this.props;
      console.log("~~~~~~~~~~~In Drawer~~~~~~~~~~");
      console.log(this.props);
      return (
        <Container style={styles.drawer}>
            <ImageBackground source={require('../images/account-bg.jpg')} style={styles.header}>
                <Thumbnail large source={require('../images/account.jpg')} />
                <Text>{this.props.name}</Text>
            </ImageBackground>
            <Button block transparent style={styles.item} onPress={() => navigate('')}>
                <Icon name='calendar-today' type='MaterialCommunityIcons' style={styles.icon} />
                <Text style={styles.text}>Today</Text>
                <Badge primary style={styles.badge}>
                    <NbText style={styles.badgeText}>20</NbText>
                </Badge>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('MyRecordScreen')}>
                <Icon name='line-graph' type='Entypo' style={styles.icon} />
                <Text style={styles.text}>My Records</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('RecentDrinks')}>
                <Icon name='list-ol' type='FontAwesome5' style={styles.icon} />
                <Text style={styles.text}>Recent Drinks</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('SetGoalScreen')}>
                <Icon name='settings-outline' type='MaterialCommunityIcons' style={styles.icon} />
                <Text style={styles.text}>Set My Goal</Text>
            </Button>
            <Button block transparent style={styles.item} onPress={() => navigate('Tips')}>
                <Icon name='newspaper-o' type='FontAwesome' style={styles.icon} />
                <Text style={styles.text}>Tips from doctors</Text>
            </Button>


        </Container>
    );
    }
}

const styles = {
    drawer: {
        flex: 1,
        backgroundColor: appColors.primaryLight
    },
    header: {
        width: undefined,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#666',
        marginBottom: 16
    },
    item: {
        alignItems: 'center'
    },
    icon: {
        color: appColors.primaryLightText
    },
    text: {
        color: appColors.primaryLightText,
        fontSize: (Platform.OS === 'ios') ? 17 : 19,
        fontWeight: 'bold',
        flex: 1,
        marginHorizontal: 12
    }
};
