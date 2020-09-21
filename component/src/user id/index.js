import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Dimensions,Clipboard } from 'react-native'
import { white_keyboard_backspaceIcon } from '../../asset/icon'
import AsyncStorage from '@react-native-community/async-storage'
import ToastAndroidScreen from '../ToastAndroid'

const {width, height} = Dimensions.get("window")

const User_id = ({navigation}) => {
    const [user_id, setuser_id] = useState("")
    const [clipboardContent, setclipboardContent] = useState(null)

    useEffect(()=>{
        const number = Math.floor(Math.random() * 1000000);
        AsyncStorage.getItem("users_id").then(value=>{
            if(value != null){
                setuser_id(value)        
            }else{
                setuser_id(number)
                AsyncStorage.setItem("users_id", number.toString())
            }
        })
    },[])
      const writeToClipboard = async () => {
        //To copy the text to clipboard
        await Clipboard.setString(user_id);
        ToastAndroidScreen('Copied to Clipboard!')
      };

    return(
        <View style={style.box}>
        <View style={style.boxHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>{white_keyboard_backspaceIcon}</TouchableOpacity>
                <Text style={style.text_title}>user id</Text>
            </View>
            <View style={style.box_row}>
                <Text style={style.text_id}>{user_id}</Text>
                <Text onPress={()=>writeToClipboard()} style={style.text_salin}>salin</Text>
            </View>
        </View>
    )
}

export default User_id

const style = StyleSheet.create({
    box:{
        width:width,
        height:height,
        flex:1,
        backgroundColor:'#fff'
    },
    boxHeader:{
        width:'100%',
        paddingHorizontal:width / 30,
        alignItems:'center',
        justifyContent:"flex-start",
        flexDirection:"row",
        height:height / 14,
        // marginBottom:height / 40,
        borderColor:'rgba(0,0,0,0.1)',
        // borderBottomWidth:2,
        // paddingTop:height / 200,
        backgroundColor:'#32CD32'
    },
    text_title:{
        fontSize:height / 40,
        marginLeft:width / 30,
        color:'#fff',
        fontWeight:"bold"
    },
    text_salin:{
        paddingHorizontal:width / 20,
        paddingVertical:height / 150,
        borderRadius:100,
        backgroundColor:'#32CD32',
        color:'#fff',
        fontSize:height / 49,
        fontWeight:'bold',
        letterSpacing:height / 500
    },
    text_id:{
        // paddingHorizontal:width / 20,
        // paddingVertical:height / 150,
        // borderRadius:100,
        // backgroundColor:'#32CD32',
        color:'#000',
        fontSize:height / 49,
        // fontWeight:'bold',
        letterSpacing:height / 500
    },
    box_row:{
        width:'100%',
        flexDirection:'row',
        paddingHorizontal:width / 30,
        justifyContent:'space-between',
        marginVertical:height / 40,
        alignItems:'center'
    }
})