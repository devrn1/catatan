import React from "react";
import { View, TouchableOpacity, Text, Dimensions,Linking, Image } from "react-native";
import {styleDrawer} from "./style";
import  Icon from "react-native-vector-icons/MaterialIcons";


const data = [
    {
        idKey:"1",
        text:"Dashboard",
        icon:"dashboard"
    },
    {
        idKey:"2",
        text:"Grafik List",
        icon:"library-books"
    },
    {
        idKey:"3",
        text:"Create file",
        icon:"picture-as-pdf"
    },
    {
        idKey:"4",
        text:"Masukan",
        icon:"chat-bubble"
    },
    {
        idKey:"5",
        text:"Sukai Kami",
        icon:"tag-faces"
    },
    {
        idKey:"6",
        text:"Tanya Jawab",
        icon:"headset-mic"
    },
    {
        idKey:"7",
        text:"User ID",
        icon:"person"
    },
]

const {height} = Dimensions.get("window")

const DrawerLayout = ({navigation, close}) => {

    const nextPage = (value) =>{
        const nilai = parseInt(value)
        close.closeDrawer()
        if(nilai === 1){
            navigation.navigate("HomeScreen")
        }else if(nilai === 2){
            navigation.navigate("ListGrafikScreen")
        }else if(nilai === 3){
            navigation.navigate("createScreen")
        }else if(nilai === 4){
            Linking.openURL('mailto:calonapt1@gmail.com?subject=example&body=example')
        }else if(nilai === 5){
            Linking.openURL('instagram://user?username=rizqan_23')
        }else if(nilai === 6){
            Linking.openURL('instagram://user?username=rizqan_23')
        }else if(nilai === 7){
            navigation.navigate("User_id")
        }
    }

    const renderlist = (value) => {
        return(
            <TouchableOpacity onPress={()=>nextPage(value.idKey)} key={value.idKey} style={styleDrawer.touch}>
                <Icon name={value.icon} size={height / 30} color="#32CD32" />
                <Text style={styleDrawer.textList}>{value.text}</Text>
            </TouchableOpacity>
        )
    }

    return(
    <View style={styleDrawer.component}>
        <View style={styleDrawer.boxprofile}>
            <Image source={require('../../asset/img/logo1.png')} style={styleDrawer.img}/>
            <Text style={styleDrawer.text_title}>CaKu</Text>
        </View>
        {data.map(value=>{return renderlist(value)})}
    </View>
    )
}

export default DrawerLayout