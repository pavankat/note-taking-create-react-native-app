import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import api from '../utils/api';

const styles= StyleSheet.create({
	container: {
	  marginTop: 65,
	  flex: 1
	},
	image: {
	  height: 350
	},
	buttonText: {
	  fontSize: 24,
	  color: 'white',
	  alignSelf: 'center'
	}
});

//shows you if the object passed down from the parent ok:
	// <Text> {JSON.stringify(this.props.userInfo)} </Text>
export default class Dashboard extends Component{
	//this seems completely stupid, but it might be the only way we can share styles
	makeBackground(btn){
		var obj = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1
		}
		if(btn === 0){
			obj.backgroundColor = '#48BBEC';
		}else if (btn === 1){
			obj.backgroundColor = '#E77AAE';
		}else{
			obj.backgroundColor = '#758BF4';
		}

		return obj;
	}

	goToProfile(){
		//when this function runs -> send the user to the profile component
		this.props.navigator.push({
		    component: Profile,
		    title: 'Profile Page',
		    passProps: {userInfo: this.props.userInfo}
		})
	}

	goToRepos(){
		//get the repos from the api we made from the api.js file 
		//then pass the userInfo and the repos to the Repositories component
		api.getRepos(this.props.userInfo.login)
		    .then((res) => {
		        this.props.navigator.push({
		            component: Repositories,
		            title: 'Repos Page',
		            passProps: {
		                userInfo: this.props.userInfo,
		                repos: res
		            }
		        });
		    });
	}
	
	goToNotes(){
		api.getNotes(this.props.userInfo.login)
		  .then((jsonRes) => {
		    jsonRes = jsonRes || {}; //when jsonRes the argument comes in as undefined, it'll set jsonRes to {}

		    this.props.navigator.push({
		      component: Notes,
		      title: 'Notes',
		      passProps: {
		        notes: jsonRes,
		        userInfo: this.props.userInfo
		      }
		    });
		  });
	}

    render() {
        return (
        	<View style={styles.container}>
	        	<Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
	        	<TouchableHighlight
	        	    style={this.makeBackground(0)}
	        	    onPress={this.goToProfile.bind(this)}
	        	    underlayColor="#88D4F5">
	        	      <Text style={styles.buttonText}>View Profile</Text>
	        	</TouchableHighlight>
	        	<TouchableHighlight
	        	    style={this.makeBackground(1)}
	        	    onPress={this.goToRepos.bind(this)}
	        	    underlayColor="#E39EBF">
	        	      <Text style={styles.buttonText}>View Repositories</Text>
	        	</TouchableHighlight>
	        	<TouchableHighlight
	        	    style={this.makeBackground(2)}
	        	    onPress={this.goToNotes.bind(this)}
	        	    underlayColor="#9BAAF3">
	        	      <Text style={styles.buttonText}>Take Notes</Text>
	        	</TouchableHighlight>
        	</View>
        )
    }
}