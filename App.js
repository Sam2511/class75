import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import SearchScreen from './screens/SearchScreen'
import TransactionScreen from './screens/TransactionScreen'
import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component{
  render(){
    return <AppContainer/>
  }
}

const TabNavigator= createBottomTabNavigator({
  Transaction: {screen: TransactionScreen},
  Search: {screen: SearchScreen}
},{
defaultNavigationOptions: ({navigation})=>({
  tabBarIcon: ()=>{
    if(navigation.state.routeName==="Transaction"){
        return(
          <Image style = {{width: 40, height: 40}} source= {require("./assets/book.png")} />
        )
    }
    else if(navigation.state.routeName==="Search"){
      return(
        <Image style = {{width: 40, height: 40}} source= {require("./assets/searchingbook.png")} />
      )
  }
  }
})
})

 const switchNavigator= createSwitchNavigator({
   LoginScreen: {screen: LoginScreen},
   TabNavigator: {screen:TabNavigator}
 })

const AppContainer= createAppContainer(switchNavigator)



