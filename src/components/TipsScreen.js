import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';

import {connect} from 'react-redux';

import {setToast} from '../states/toast';

import {Container, Header, Content, Title, Left, Right, Body, Icon, Button, Item, Label, Input, Text} from 'native-base';
import appColors from '../styles/colors';


class TipsScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        
    };

    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        
    }

    render() {
        
        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='arrow-left' type='FontAwesome'  style={{fontSize: 24}} />
                    </Button></Left>
                    <Body><Title>Tips from doctors</Title></Body>
                    <Right></Right>
                </Header>
                <Content style={styles.content}>
                    <Text style={styles.text}>
                        加州大學洛杉磯分校在大鼠的研究發現，飲食中加入高果糖持續6週後，大鼠的反應遲鈍，腦中突觸的反應明顯下降。人類也一樣。發表在《神經》期刊的研究也發現，多吃蔬果全穀類、少喝含糖飲料，可以預防大腦因年齡增長而縮小。

                        吃糖也對心理不利，特別是憂鬱症和躁鬱症，甜到憂傷不是說說而已。

                        發表在《科學報告期刊（Journal Scientific Reports）》 的研究發現，每天吃超過67公克糖的男性，約等於兩罐可樂，5年後情緒障礙的發病風險，和只吃39.5公克的人相比，增加23％。

                        吃太多的糖也驅動焦慮症。

                        太多糖使得血糖穩定崩解，大腦渴求食物，身體顫抖、虛弱、焦慮。而且糖吃太多，腦源性神經滋養因子（brain-derived neurotrophic factor, BDNF）的蛋白質將會減少， BDNF被認為在降低焦慮、恐懼、壓力反應，扮演重要角色。
                    </Text>
                </Content>
            </Container>
        );
    }

    handleGoBack() {
         this.props.navigation.goBack();
    }

}

const styles = {
    content: {
        backgroundColor: appColors.primaryLight
    },
    text: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 30
    },
    header:{
        backgroundColor: 'white'
    },
    container:{
        marginTop: 24
    }
};

export default connect(state => ({
   
}))(TipsScreen);
