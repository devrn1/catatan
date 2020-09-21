import React from 'react'
import {StatusBar, View, Image, StyleSheet, Dimensions, Text } from 'react-native'

const SplashScreen = () => {
    return(
        <View style={style.box}>
            <StatusBar barStyle = "dark-content" hidden = {true} backgroundColor = "#fff" translucent = {true}/>
            <Image style={style.img} source={require('../asset/img/logo1.png')}/>
            <Text style={style.text}>Catatan keuangan</Text>
        </View>
    )
}

export default SplashScreen
const {width, height} = Dimensions.get("window")

const style=StyleSheet.create({
    box:{
        width:width,
        height:height,
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:height / 40
    },
    img:{
        width:width / 5,
        height:height / 10,
        marginBottom:height / 100
    },
    text:{
        fontSize:height / 40,
        fontWeight:"bold",
        color:"#000"
    }
})