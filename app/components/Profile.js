import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Badge from './Badge';
import Separator from './helpers/Separator';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        padding: 10
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }
});

export default class Profile extends Component{
    getRowTitle(item){
        //if item is public_repos get rid of _ otherwise just use the item as it is
        item = (item === 'public_repos') ? item.replace('_', ' ') : item;

        //item[0].toUpperCase() returns the first letter capitalized
        //item.slice(1) will return the item starting at character 1
        return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
    }
    render(){
        //cache this to save typing
        var userInfo = this.props.userInfo;

        //map over these keys that are in userInfo so we can make a view for each of these
        var topicArr = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];

        //here we create those views 
            //and then use them in the component later
        var list = topicArr.map((item, index) => {
            if(!userInfo[item]){ //if the item is not in the array return an empty view
                //react needs a key to know which one is which
                return <View key={index}/> 
            } else { //if the item is in the array
                return (
                    <View key={index}>
                        <View style={styles.rowContainer}>
                            {/* getRowTitle formats the topicArr element into what we want to look at*/}
                            <Text style={styles.rowTitle}> {this.getRowTitle(item)} </Text>
                            <Text style={styles.rowContent}> {userInfo[item]} </Text>
                        </View>
                        <Separator />
                    </View>
                )
            }
        });

        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo}/>
                {list}
            </ScrollView>
        )

    }
};

Profile.propTypes = {
    userInfo: React.PropTypes.object.isRequired
}