import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, DrawerLayoutAndroid, StatusBar } from "react-native";
import { styleHome } from "./style"
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerIcon, addIcon } from "../../asset/icon";
import DrawerLayout from "../drawer";
import { change_list_, change_list_grafik } from "../../redux.js/action";
import { connect } from "react-redux";
import formatRupiah from "../rupiah";

const Bulantext = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

const HomeScreen = ({navigation, list_, list_grafik}) =>{
    const [valueListData, setvalueListData] = useState([])
    const [valueRP, setValueRp] = useState("")
    const [drawer, setdrawer] = useState("")

    useEffect(()=>{
        AsyncStorage.getItem("ListData").then(value=>{
            const data = []
            if(value != null){
                JSON.parse(value).map(item=>{
                    data.push(item)
                })
            }
            setvalueListData(data)
        })
    },[])

    const render_Rp = () => {
            const Rp = []
            var tgl = tanggalOptions().slice(8,10)
            var bulan = tanggalOptions().slice(5,7)
            if(list_.length !== 0){
                list_.map(item=>{
                    if(parseInt(item.tanggal.slice(5,7)) === parseInt(bulan) && parseInt(item.tanggal.slice(2,4)) === parseInt(tgl)){
                        Rp.push(item.Rp)
                    }
                })
            }else{
                valueListData.map(item=>{
                    if(parseInt(item.tanggal.slice(5,7)) === parseInt(bulan) && parseInt(item.tanggal.slice(2,4)) === parseInt(tgl)){
                        Rp.push(item.Rp)
                    }
                })
            }
            return Rp.reduce(getSum, 0)
    }

    const tanggalOptions = () => {
        var date = new Date().toISOString().substr(0, 10)
        return date
    }

    const renderValue = (item) =>{
        var tgl = tanggalOptions().slice(8,10)
        var bulan = tanggalOptions().slice(5,7)
        if(parseInt(item.tanggal.slice(5,7)) === parseInt(bulan) && parseInt(item.tanggal.slice(2,4)) === parseInt(tgl)){
        return(
            <TouchableOpacity key={item.idKey} onPress={()=>navigation.navigate("InputDataScreen", {detail:item, options:2})} style={styleHome.boxList} activeOpacity={0.5}>
                <View style={{paddingRight:10}}>
                    <Text style={styleHome.textList1}>{item.keterangan}</Text>
                    <Text style={styleHome.textList2}>{item.note}</Text>
                </View>
                    <Text style={styleHome.textValue2}>Rp.{formatRupiah(item.Rp)}</Text>
            </TouchableOpacity>
        )
    }
    }

    function getSum(total, num) {
        return total + Math.round(num);
    }

    var OpenDrawer = () => {
        drawer.openDrawer()
    }

    return(
        <DrawerLayoutAndroid
              drawerWidth={250}           
              ref={(_drawer) => setdrawer(_drawer)}
              drawerPosition="left"
              renderNavigationView={() =>{return <DrawerLayout navigation={navigation} close={drawer} />}}>
            <StatusBar barStyle = "dark-content" hidden = {true} backgroundColor = "#fff" translucent = {true}/>
            <View style={styleHome.BoxBg}>
            <View style={styleHome.boxHeader}>
                <Text onPress={()=>OpenDrawer()}>{DrawerIcon}</Text>
                {/* <Text>icon</Text> */}
            </View>
            <View style={styleHome.boxBg2}>
                <View style={styleHome.boxDate}>
                    <View style={styleHome.componentBoxDate}>
                        <Text style={styleHome.textDate1}>{tanggalOptions().slice(8,10)}</Text>
                        <View>
                            <Text style={styleHome.textDate2}>{parseInt(tanggalOptions().slice(5,6)) != 0 ? Bulantext[parseInt(tanggalOptions().slice(5,7)) - 1] : Bulantext[parseInt(tanggalOptions().slice(6,7)) - 1] }</Text>
                            <Text style={styleHome.textDate2}>{tanggalOptions().slice(0,4)}</Text>
                        </View>
                    </View>
                        <Text style={parseInt(valueRP) < 0 ? styleHome.textValuered : styleHome.textValuered}>Rp.{formatRupiah(render_Rp())}</Text>
                </View>
                {list_.length !== 0 ? list_.map(value=> { return renderValue(value)}) : valueListData.map(value=> { return renderValue(value)})}
            </View>
            <View style={styleHome.boxAbsolute}>
            <TouchableOpacity onPress={()=>navigation.navigate("InputDataScreen", {options:1})} style={styleHome.boxTouch }>{addIcon}</TouchableOpacity>
            <View>
            </View>
            </View>
        </View>
        </DrawerLayoutAndroid>
    )
};

// export default HomeScreen
const mapStateToProps = state =>{
    let {list_, list_grafik} = state.Reducer
    return {list_, list_grafik}
}
export default connect(mapStateToProps,{change_list_, change_list_grafik})(HomeScreen)
