import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Image} from 'react-native';
import {Container, Header, Button, Icon, Left, Right, Body, Title, Drawer} from 'native-base';
import SearchButtonWithModal from './SearchButtonWithModal';
import DrawerSideBar from './DrawerSideBar';

export default class NavigationContainer extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        title: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.handleOpenAdd = this.handleOpenAdd.bind(this);
    }

    render() {
        const {title, navigate} = this.props;
        return (
            <Drawer

                ref={(el) => this.drawer = el}
                content={<DrawerSideBar navigate={navigate} name={this.props.name}/>}
                onClose={this.closeDrawer}
                tweenHandler={(ratio) => ({
                    mainOverlay: {
                        opacity: ratio,
                        backgroundColor: appColors.mask
                    }
                })}>
                <Container>

                    <Header transparent>
                        <Left><Button transparent onPress={this.openDrawer}>
                            <Icon name='menu' style={styles.icon}/>
                        </Button></Left>
                        <Body><Title style={styles.title}>{title}</Title></Body>
                        <Right>
                            <Button transparent  onPress={this.handleOpenAdd}>
                                <Icon name='ios-add' type='Ionicons' style={styles.icon} />
                            </Button>
                        </Right>
                    </Header>
                    


                </Container>
                {this.props.children}
            </Drawer>
        );
    }

    openDrawer() {
        this.drawer._root.open();
    }

    closeDrawer() {
        this.drawer._root.close();
    }
    handleOpenAdd(){
        this.props.navigate('PostForm');
    }
}

const styles = StyleSheet.create({
    title: {
        color:'black'
    },

    icon: {
        color: 'black'
    }

});
