import React from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native'

const LoadingScreen = () => {
    return <ActivityIndicator size="large" color="green"/>
}

export default LoadingScreen

const style=StyleSheet.create({
    box:{
        width:'100%',
        alignItems:'center'
    }
})