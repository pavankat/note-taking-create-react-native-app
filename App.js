import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';
import Main from './app/components/Main';

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Foxes sound very weird',
          component: Main
        }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  }
});
