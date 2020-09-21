import React, { useState, useEffect } from "react";
import { View, Text, DrawerLayoutAndroid, TouchableOpacity, ScrollView, Dimensions, Alert } from "react-native";
import {DrawerIcon, addIcon, createIcon} from "../../asset/icon/index"
import {styleHome} from "../Home/style"
import {styleListGrafik} from "./style"
import DrawerLayout from "../drawer";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { change_list_grafik, change_list_ } from "../../redux.js/action";
import { connect } from "react-redux";
import formatRupiah from "../rupiah";

const {height} = Dimensions.get("window")

const Bulantext = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

const ListGrafikScreen = ({navigation, list_grafik, list_}) => {
    const [drawer, setdrawer] = useState("")
    const [listKategori, setlistKeterangan] = useState([])
    const [listKategoriTahun, setlistKeteranganTahun] = useState([])
    const [screenNext, setscreenNext] = useState(false)

    const tanggalOptions = () => {
        var date = new Date().toISOString().substr(0, 10)
        return date
    }

    function getSum(total, num) {
        return parseInt(total) + Math.round(parseInt(num));
    }

    useEffect(()=>{
        const keterangan = []
        const allListKeterangan = []
        
        AsyncStorage.getItem("ListKeterangan").then(value=>{
            if(value!=null){
                JSON.parse(value).map(item=>{
                    keterangan.push(item)
                    // alert(JSON.stringify(item))
                })
            }else{
                const oush1 = {
                    idKey:1,
                    text:"salary",
                    icon:"account-balance-wallet",
                    jumlahDay:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    jumlahRp:[]
                }
            keterangan.push( oush1)
            AsyncStorage.setItem("ListKeterangan", JSON.stringify(keterangan))
            }
        })
        if(list_grafik.length === 0){
            get_listdata(keterangan)
        }
        // setlistKeterangan(keterangan)
    },[])

    const get_listdata = (request) => {
        const keterangan = request
        const allListKeterangan = []
        AsyncStorage.getItem("ListData").then(value=>{
            var bulan = tanggalOptions().slice(5,7);
            if(value != null){
                JSON.parse(value).map(a=>{
                    allListKeterangan.push(a)
                    keterangan.map(b=>{
                        if( parseInt(a.tanggal.slice(5,7)) === parseInt(bulan) && b.text.toUpperCase() === a.keterangan.toUpperCase()){
                            b.jumlahRp.push(a.Rp)
                            for(var c=1; c<=b.jumlahDay.length; c++){
                                if( parseInt(a.tanggal.slice(2,3)) === 0 && parseInt(c) === parseInt(a.tanggal.slice(3,4))){
                                    b.jumlahDay[c - 1] = a.tanggal.slice(3,4)
                                }else if( parseInt(a.tanggal.slice(2,3)) !== 0 && parseInt(c) === parseInt(a.tanggal.slice(2,4))){
                                    b.jumlahDay[c - 1] = a.tanggal.slice(2,4)
                                }
                            }
                        }
                    })
                })
            }
            setlistKeterangan(keterangan)
        })
    } 

    var OpenDrawer = () => {
        drawer.openDrawer()
    }

    const renderList = (value) => {
        const oke =[]
        // alert(value.jumlahDay)
        value.jumlahDay.map(a=>{
            if(a !== 0){
                oke.push(a)
            }
        })
        return(
            <TouchableOpacity onPress={()=>navigation.navigate("DescriptionScreen", {name:value.text, icon:value.icon})} key={value.text} style={styleListGrafik.touchList}>
                <View style={styleListGrafik.boxRow}>
                    <View style={{flexDirection:'row', alignItems:"center"}}>
                        <Icon name={value.icon} size={height / 25} color="gray" style={{marginRight:height / 150}} />
                        <View>
                        <Text style={styleListGrafik.textList1}>{value.text}</Text>
                        <Text style={styleListGrafik.textList3}>{parseInt(tanggalOptions().slice(5,6)) != 0 ? Bulantext[parseInt(tanggalOptions().slice(5,7)) - 1] : Bulantext[parseInt(tanggalOptions().slice(6,7)) - 1]} {tanggalOptions().slice(0,4)}</Text>
                        </View>
                    </View>
                <TouchableOpacity onPress={()=>navigation.navigate("InputKategoriScreen", {value:value, options:2})} style={styleListGrafik.touchEdit}>{createIcon}</TouchableOpacity>
                </View>
                <View style={styleListGrafik.boxRp}>
                    <Text style={styleListGrafik.textList2}>Rp.{formatRupiah(value.jumlahRp.reduce(getSum, 0))}</Text>
                </View>
                <View style={styleListGrafik.boxRow}>
                    <Text style={styleListGrafik.textList4}>Left</Text>
                    <View>
                        <Text style={styleListGrafik.textList4}>Right</Text>
                        <Text style={styleListGrafik.textList3}>{oke.length} days</Text>
                    </View>
                </View>
                <View style={styleListGrafik.boxStrip}>
                <View style={{width:'100%',height:7.5, backgroundColor:"#d3d3d3", borderRadius:100}}/>
                <View style={{width:`${oke.length /31 * 100}%`,height:7.5, backgroundColor:"#32CD32", borderRadius:100, position:"absolute"}}/>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <DrawerLayoutAndroid
              drawerWidth={250}
              ref={(_drawer) => setdrawer(_drawer)}
              drawerPosition="left"
              renderNavigationView={() =>{return <DrawerLayout navigation={navigation} close={drawer} />}}>
            <View style={styleListGrafik.box}>
                <View style={styleHome.boxHeader}>
                    <Text onPress={()=>OpenDrawer()}>{DrawerIcon}</Text>
                </View>
                {/* <Text style={styleListGrafik.textTitle}>List Kategori</Text> */}
                <View style={styleListGrafik.boxList}>
                    <ScrollView style={{marginTop:height / 100, marginBottom:height / 50}} showsVerticalScrollIndicator={false}>
                        {list_grafik.length !== 0 ? get_listdata(list_grafik) : null }
                        {screenNext === false ? listKategori.map(value=>renderList(value)) : listKategoriTahun.map(value=>renderList(value))}
                    </ScrollView>
                </View>
            </View>
            <View style={styleListGrafik.boxAbsolute}>
                <TouchableOpacity onPress={()=>navigation.navigate("InputKategoriScreen",{options:1})} style={styleListGrafik.touchAdd}>{addIcon}</TouchableOpacity>
            </View>
        </DrawerLayoutAndroid>
    )
}

const mapStateToProps = state =>{
    let {list_, list_grafik} = state.Reducer
    return {list_, list_grafik}
  }
export default connect(mapStateToProps,{change_list_, change_list_grafik})(ListGrafikScreen)
// export default ListGrafikScreen