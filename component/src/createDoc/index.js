import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, DrawerLayoutAndroid } from "react-native"
import DrawerLayout from '../drawer'
import { styleHome } from '../Home/style'
import { DrawerIcon } from '../../asset/icon'
import CalendarPicker from 'react-native-calendar-picker';

const createScreen = ({navigation}) => {

    const [drawer, setdrawer] = useState("")
    const [selectedEndDate, setselectedEndDate] = useState("")
    const [selectedStartDate, setselectedStartDate] = useState("")
    const [end, setend] = useState("")
    const [start, setstart] = useState("")

    var OpenDrawer = () => {
        drawer.openDrawer()
    }

    const onDateChange =(value,type) =>{
        if (type === 'END_DATE') {
            setselectedEndDate(value)
        } else {
            setselectedEndDate(null)
            setselectedStartDate(value)
            // .format("D-M-YYYY")
        }
      }

    return(
        <DrawerLayoutAndroid
              drawerWidth={250}
              ref={(_drawer) => setdrawer(_drawer)}
              drawerPosition="left"
              renderNavigationView={() =>{return <DrawerLayout navigation={navigation} close={drawer} />}}>
            <View style={style.box}>
                <View style={styleHome.boxHeader}>
                    <Text onPress={()=>OpenDrawer()}>{DrawerIcon}</Text>
                </View>
                <View style={{marginVertical:height / 100}}>
                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={new Date(2010, 12, 3)}
                        maxDate={new Date(2030, 12, 3)}
                        previousTitle="Back"
                        nextTitle="Next"
                        todayBackgroundColor="orange"
                        selectedDayColor="#66ff33"
                        selectedDayTextColor="#000000"
                        scaleFactor={375}
                        textStyle={{
                            fontFamily: 'Cochin',
                            color: '#000000',
                        }}
                        onDateChange={(value, type)=>onDateChange(value,type)}
                    />
                </View>
                <View style={style.boxDesc}>
                    <View style={{flexDirection:'row'}}>
                        {selectedStartDate !== "" ?  <Text style={style.texttgl}>{selectedStartDate.format("DD MMMM YYYY")}</Text> : null}
                        <Text>  -  </Text>
                        {selectedStartDate !== "" && selectedEndDate !== null?  <Text style={style.texttgl}>{selectedEndDate.format("DD MMMM YYYY")}</Text> : null}
                    </View>
                <TouchableOpacity style={style.boxTouch} onPress={()=> selectedStartDate !== "" && selectedEndDate !== "" ? navigation.navigate("PDFScreen",{'start':selectedStartDate, 'end':selectedEndDate, 'id_screen':1,'value_render':[]}) : alert("isi tanggal")}>
                    <Text style={style.text}>create PDF</Text>
                </TouchableOpacity>
            <TouchableOpacity style={style.boxTouch} onPress={()=>alert("coming soon")}>
                <Text style={style.text}>create Doc</Text>
            </TouchableOpacity>
            </View>
        </View>
        </DrawerLayoutAndroid>
    )
}

export default createScreen

const {width, height} = Dimensions.get("window")

const style = StyleSheet.create({
    box:{
        width:width,
        height:height,
        backgroundColor:'#fff',
        flex:1
    },
    boxTouch:{
        width:"80%",
        height:height / 15,
        borderRadius:height / 100,
        backgroundColor:'#32CD32',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:height / 15
    },
    boxDesc:{
        width:'100%',
        flex:2,
        // justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
        paddingTop:height / 15
    },
    text:{
        fontSize:height / 40,
        color:'#fff',
        fontWeight:'bold'
    },
    texttgl:{
        fontSize:15,
        marginBottom:height / 30
    }
})

