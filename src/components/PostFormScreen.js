import React from 'react';
import PropTypes from 'prop-types';
import {
  View
} from 'react-native';


import {connect} from 'react-redux';
import {/*createPost, input, inputDanger*/createPost, inputDrink, inputSugar, inputDangerDrink, inputDangerSugar} from '../states/post-actions';
import {setToast} from '../states/toast';

import {Container, Header, Content, Title, Left, Right, Body, Icon, Button, Item, Label, Input} from 'native-base';
import appColors from '../styles/colors';

//import {getMoodIcon} from '../utilities/weather';

class PostFormScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,

        //inputValue: PropTypes.string,
        //inputDanger: PropTypes.bool
        inputDrink: PropTypes.string,
        inputSugar: PropTypes.string,
        inputDangerDrink: PropTypes.bool,
        inputDangerSugar: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputDrinkChange = this.handleInputDrinkChange.bind(this);
        this.handleInputSugarChange = this.handleInputSugarChange.bind(this);
        this.handleCreatPost = this.handleCreatPost.bind(this);
    }

    render() {
        //const {inputValue, inputDanger} = this.props;
        const {inputDrink, inputSugar, inputDangerDrink, inputDangerSugar} = this.props;
        return (
            <View style={styles.screenContainer}>
                <Header style={styles.header}>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='arrow-left' type='FontAwesome'  style={{fontSize: 24, color:'black'}} />
                    </Button></Left>
                    <Body><Title>New Post</Title></Body>
                    <Right><Button transparent onPress={this.handleCreatPost}>
                        <Icon name='check' type='FontAwesome' style={{fontSize: 24, color:'black'}} />
                    </Button></Right>
                </Header>
                <Content style={styles.content}>


                    <Item regular error={inputDangerDrink} style={styles.item}>
                        {/* <Label>What's on your mind?</Label> */}
                        <Input autoFocus multiline maxLength={1024} placeholder="What are you drinking?"
                            style={styles.input} value={inputDrink}
                            onChange={this.handleInputDrinkChange} />
                    </Item>
                    <Item regular error={inputDangerSugar} style={styles.item}>
                        <Input autoFocus multiline maxLength={1024} placeholder="And how much sugar in that?"
                            style={styles.input} value={inputSugar}
                            onChange={this.handleInputSugarChange} />
                    </Item>
                </Content>
            </View>
        );
    }
//this is in <Content></content>
// <Item regular error={inputDanger} style={styles.item}>
//                        {/* <Label>What's on your mind?</Label> */}
//                        <Input autoFocus multiline maxLength={1024} placeholder="What's on your mind?"
//                             style={styles.input} value={inputValue}
//                             onChange={this.handleInputChange} />
//                    </Item>
//*/ 
    handleGoBack() {
         this.props.navigation.goBack();
    }

    /*handleInputChange(e) {
        const {inputDanger: danger, dispatch} = this.props;
        const inputValue = e.nativeEvent.text;
        if (danger)
            dispatch(inputDanger(false));
        dispatch(input(inputValue));
    }*/
    handleInputDrinkChange(e) {
        const {inputDangerDrink: danger, dispatch} = this.props;
        const inputValue = e.nativeEvent.text;
        if (danger)
            dispatch(inputDangerDrink(false));
        dispatch(inputDrink(inputValue));
    }
    handleInputSugarChange(e) {
        const {inputDangerSugar: danger, dispatch} = this.props;
        const inputValue = e.nativeEvent.text;
        if (danger)
            dispatch(inputDangerSugar(false));
        dispatch(inputSugar(inputValue));
    }

    handleCreatPost() {
        //######## need to change mood to userId
        const {/*mood, inputValue, dispatch*/name, inputDrink, inputSugar, dispatch} = this.props;
        console.log('name');
        console.log(name);
        const {goBack} = this.props.navigation;
        if (/*inputValue*/inputDrink && inputSugar) {
            dispatch(createPost(/*mood, inputValue, inputDrink, inputSugar*/name, inputDrink, inputSugar)).then(() => {
                dispatch(setToast('Posted.'));
            });
            goBack();
        } else {
            dispatch(inputDangerDrink(true));
            dispatch(inputDangerSugar(true));
            //dispatch(inputDanger(true));
        }
    }
}

const styles = {
    content: {
        backgroundColor: 'white'
    },

    item: {
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        backgroundColor: 'white',
        borderColor :'white'
    },
    input: {
        height: 100,
        borderColor: 'rgb(0, 204, 203)',
        borderWidth: 2,
        textAlign: 'center',
        marginVertical: 10,
        borderRadius:20,
        width: 220,
    },
    screenContainer:{
        flex:1,
        justifyContent:'center',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginTop: 24
    },
    header:{
        backgroundColor: 'white',
    },
};

export default connect(state => ({
    ...state.postForm,
    ...state.userForm
}))(PostFormScreen);
