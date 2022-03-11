import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/Feed';
import CreateStory from '../screens/CreateStory';
import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";
import firebase from 'firebase'

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
     constructor(props) {
          super(props);
          //define the states
          this.state = {
               light_theme: true,
          };
     }
     componentDidMount() {
          this.fetchUser();
     }
     async fetchUser() {
          let theme;
          //fetches the user for us based on their unique id, 
          //which we can find from the firebase.auth().currentUser.uid.
          await firebase
               .database()
               .ref("/users/" + firebase.auth().currentUser.uid)
               .on('value', function (snapshot) {
                    theme = snapshot.val().current_theme

               })
          this.setState({
               light_theme: theme === 'light' ? true : false,
          })
     }
     render() {

          return (
               <Tab.Navigator
                    labeled={false}
                    barStyle={this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
                    screenOptions={({ route }) => ({
                         tabBarIcon: ({ focused, color, size }) => {
                              let iconName;
                              if (route.name === 'Feed') {
                                   iconName = focused ? 'book' : 'book-outline';
                              }
                              else if (route.name === 'CreateStory') {
                                   iconName = focused ? 'create' : 'create-outline';
                              }
                              return <Ionicons name={iconName} size={size} color={color} />;
                         },
                    })}

                    tabBarOptions={{
                         activeTintColor: 'pink',
                         inactiveTintColor: 'grey',
                    }}>
                    <Tab.Screen name="Feed" component={Feed} />
                    <Tab.Screen name="CreateStory" component={CreateStory} />

               </Tab.Navigator>
          )
     }
}


const styles = StyleSheet.create({
     bottomTabStyle: {
          backgroundColor: "#2f345d",
          height: "8%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
          position: "absolute"
     },
     bottomTabStyleLight: {
          backgroundColor: "light",
          height: "8%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: "hidden",
          position: "absolute"

     },
     icons: {
          width: RFValue(30),
          height: RFValue(30)
     }
});
