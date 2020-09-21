/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'

import HomeScreen from './component/src/Home';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InputDataScreen from './component/src/Home/inputData';
import { createDrawerNavigator } from "@react-navigation/drawer";
import ListGrafikScreen from './component/src/grafik';
import DrawerLayout from './component/src/drawer';
import InputKategoriScreen from './component/src/grafik/inputKategori';
import DescriptionScreen from './component/src/grafik/descGrafik';
import createScreen from './component/src/createDoc';
import PDFScreen from './component/src/createDoc/PDF';
import User_id from './component/src/user id';
import reducer from './component/redux.js/reducer';
import SplashScreen from './component/src';
import { StatusBar } from 'react-native';

const stack = createStackNavigator()

const Navigation = () => {
  return(
    <Provider store={createStore(reducer)}>
      <StatusBar barStyle = "dark-content" hidden = {true} backgroundColor = "#fff" translucent = {true}/>
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen component={HomeScreen} name="HomeScreen" options={{headerShown:false}} />
        <stack.Screen component={InputDataScreen} name="InputDataScreen" options={{headerShown:false}} />
        <stack.Screen component={ListGrafikScreen} name="ListGrafikScreen" options={{headerShown:false}} />
        <stack.Screen component={DrawerLayout} name="DrawerLayout" options={{headerShown:false}} />
        <stack.Screen component={InputKategoriScreen} name="InputKategoriScreen" options={{headerShown:false}} />
        <stack.Screen component={DescriptionScreen} name="DescriptionScreen" options={{headerShown:false}} />
        <stack.Screen component={createScreen} name="createScreen" options={{headerShown:false}} />
        <stack.Screen component={PDFScreen} name="PDFScreen" options={{headerShown:false}} />
        <stack.Screen component={User_id} name="User_id" options={{headerShown:false}} />
      </stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

const funcDrawer = createDrawerNavigator()

const Drawer = () => {
    return(
      <NavigationContainer>
      <funcDrawer.Navigator>
        <funcDrawer.Screen component={HomeScreen} name="HomeScreen" />
        <funcDrawer.Screen component={ListGrafikScreen} name="ListGrafikScreen"/>
      </funcDrawer.Navigator>
      </NavigationContainer>
    )
}

const App = () => {
  const [splash, setsplash] = useState(false)
  useEffect(()=>{
    setTimeout(()=>{
      setsplash(true)
    },3000)
  },[])
  return splash === false ? <SplashScreen/> : Navigation()
}

export default App;