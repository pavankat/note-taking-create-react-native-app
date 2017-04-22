import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#48BBEC',
        paddingBottom: 10
    },
    name: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 10,
        marginBottom: 5,
        color: 'white'
    },
    handle: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white'
    },
    image: {
        height: 125,
        width: 125,
        borderRadius: 65,
        marginTop: 10,
        alignSelf: 'center'
    }
});

//this is a pure component, because it doesn't have state - it will take in its data from its parent component
export default class Badge extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}}/>
                <Text style={styles.name}> {this.props.userInfo.name} </Text>
                <Text style={styles.handle}> {this.props.userInfo.login} </Text>
            </View>
        )
    }
};

//react gives us propTypes to make it so that the userInfo prop is required or react will throw an error
    //we're doing this here because the component above is so reliant on the userInfo prop that the parent will pass in, and without it - this component is nothing
Badge.propTypes = {
    userInfo: React.PropTypes.object.isRequired
};



