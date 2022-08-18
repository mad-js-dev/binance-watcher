import { React, Component } from "react";
import { StyleSheet, Text, View, AppRegistry } from "react-native";

export default class About extends Component {
    
    render(){
      return (
        <Text style={styles.header}>About</Text>
      )
    };
  }

  const styles = StyleSheet.create({
    header: {
      fontSize: 20
    },
  });

  