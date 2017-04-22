import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, ActivityIndicatorIOS } from 'react-native';

import api from '../utils/api';
import Dashboard from './Dashboard';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    loading: {
    	color: '#111'
    }
});

export default class Main extends Component {
	constructor(props){
	    super(props); //call the React Component that we're extending

	    //initialize username so we can hold onto the username that the user types into the input
	    //isLoading boolean to toggle the spinner
	    //error boolean to allow us to show an error message if something happens
	    this.state = {
	        username: '',
	        isLoading: false,
	        error: false
	    }
	    this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
	    this.setState({
	    	//we grab the text from the input (TextInput below) because we binded scope to this from the input.
	        username: event.nativeEvent.text.toLowerCase()
	    })
	}
	handleSubmit(){
	    // update our indicatorIOS spinner
	    this.setState({
	        isLoading: true
	    });

	    //you can see this when you do cmd + d on the ios screen and then Start Remote JS Debugging
	    console.log('SUMBIT', this.state.username);

	    // fetch data from github
	    //rerout to the next passing that github information
	    // update our indicatorIOS spinner

	    //this returns a promise so we can use .then on it
	    api.getBio(this.state.username)
	        .then((res) => {
	        	//github returns a message of Not Found if the username is not found
	            if(res.message === 'Not Found'){
	            	//we update error in the state to User not found and set isLoading in state to false because we're not loading anymore
	                this.setState({
	                    error: 'User not found',
	                    isLoading: false
	                })
	            } else { //we found the user from the github api
	            	//send the data to the next Component 
	            	console.log(res)
	                this.props.navigator.push({
	                    title: res.name || "Select an Option",
	                    component: Dashboard,
	                    passProps: {userInfo: res}
	                });

	                //change all of these properties in the state to false and empty string because we finished a search
	                this.setState({
	                    isLoading: false,
	                    error: false,
	                    username: ''
	                })
	            }
	        });
	}
	render() {
		var showErr = (
		  this.state.error ? <Text> {this.state.error} </Text> : <View></View>
		);

		//sync up the value of the input field (TextInput) to the username in state
		//onChange -> run the handleChange function when the input changes
		//you need to bind this because otherwise the this in the handleChange function would be different, and we can't have that!

		//onPress -> whenever someone clicks the button, it will run the handleSubmit function
		//underlayColor -> whenever someone clicks the button, the background of the button will go green.
	    return(
	        <View style={styles.mainContainer}>
	            <Text style={styles.title}> Search for a Github User </Text>
	            <TextInput
	                style={styles.searchInput}
	                value={this.state.username}
	                onChange={this.handleChange} />
	            <TouchableHighlight
	                style={styles.button}
	                onPress={this.handleSubmit.bind(this)}
	                underlayColor="green">
	                <Text style={styles.buttonText}> SEARCH </Text>
	            </TouchableHighlight>

	            	{/*
					this gives an error for some reason:

	            	<ActivityIndicatorIOS
	            	  animating={this.state.isLoading}
	            	  style={styles.loading}
	            	  size="large"
	            	/>
	            	*/}

	            {showErr}

	        </View>
	    )
	}
};

