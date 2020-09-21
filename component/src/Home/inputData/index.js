import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styleInputData } from "./style";
import { walletIcon, articleIcon, bookmarksIcon, clearIcon, saveIcon, deleteIcon } from "../../../asset/icon";
import AsyncStorage from "@react-native-community/async-storage";
import moment from 'moment'
import { connect } from "react-redux";
import { change_list_grafik, change_list_ } from "../../../redux.js/action";
import ToastAndroidScreen from "../../ToastAndroid";
import formatRupiah from "../../rupiah";


const ListValueMethode = [
    {
        idKey:1,
        text:"cash"
    },
    {
        idKey:2,
        text:"kridit"
    }
]


const InputDataScreen = ({navigation, route, change_list_grafik, change_list_, list_, list_grafik}) => {

    const [valueRp, setvalueRp] = useState("0")
    const [valuenote, setvaluenote] = useState("")
    const [valueKeterangan, setvalueKeterangan] = useState("")
    const [valueMethode, setvalueMethode] = useState("")
    //////
    const [listKeterangan, setlistKeterangan] = useState([])
    const [valueListData, setvalueListData] = useState([])

    //options
    const [optionsBox, setoptionsBox] = useState("0")
    const {options, detail} = route.params

    // useEffect
    useEffect(()=>{
        setvalueMethode(ListValueMethode[0].text)
        if(parseInt(options) != 1){
            setvalueRp(detail.Rp)
            setvaluenote(detail.note)
            setvalueMethode(detail.method)
            setvalueKeterangan(detail.keterangan)
        }
        
        AsyncStorage.getItem("ListKeterangan").then(value=>{
            const keterangan = []
            if(value!=null){
                JSON.parse(value).map(item=>{
                    keterangan.push(item)
                })
            }else{
            const oush1 = {
                idKey:1,
                text:"salary",
                icon:"account-balance-wallet",
                jumlahDay:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                jumlahRp:[]
            }
            keterangan.push(oush1)
            AsyncStorage.setItem("ListKeterangan", JSON.stringify(keterangan))}
            setlistKeterangan(keterangan)
            setvalueKeterangan(keterangan[0].text)
        })


        AsyncStorage.getItem("ListData").then(value=>{
            if(value != null){
            // alert(value);
            setvalueListData(JSON.parse(value))
        }
        })
    },[])


    const saveData = () => {
        const save = {
            idKey:valueListData.length + 1,
            Rp:valueRp,
            note:valuenote,
            keterangan:valueKeterangan,
            method:valueMethode,
            tanggal:moment().format("d-DD-MM-YYYY")
        }
        valueListData.push(save)
        // alert(JSON.stringify(valueListData))
        ToastAndroidScreen("Data diTambahkan")
        change_list_(valueListData)
        AsyncStorage.setItem("ListData", JSON.stringify(valueListData))
        navigation.goBack()
    }

    const editData = () => {
        valueListData.map(value=>{
            if(parseInt(value.idKey) === parseInt(detail.idKey)){
                value.idKey=value.idKey,
                value.Rp=valueRp,
                value.note=valuenote,
                value.keterangan=valueKeterangan,
                value.method=valueMethode,
                value.tanggal=value.tanggal
            }
        })
        // alert(JSON.stringify(valueListData))
        ToastAndroidScreen("Data diRubah")
        change_list_(valueListData)
        AsyncStorage.setItem("ListData", JSON.stringify(valueListData))
        navigation.goBack()
    }

    const renderList = (value) =>{
        return(
            <TouchableOpacity style={styleInputData.touchList} key={value.idKey} onPress={()=>optionsBoxFisibel(value)}>
                <Text style={{textTransform:"capitalize", color:"#000"}}>{value.text}</Text>
            </TouchableOpacity>
        )
    }

    const optionsBoxFisibel = (value) => {
        if(parseInt(optionsBox) === 1){
            setvalueKeterangan(value.text)
        }else{
            setvalueMethode(value.text)
        }
        setoptionsBox("0")
    }

    const Boxfisibel = (value) => {
        return(
            <View style={{width:'100%', alignItems:'flex-end'}}>
                <View style={styleInputData.boxTrue}>
                    {value.map(value=>{return renderList(value)})}
                </View>
            </View>   
        )
    }

    const delete_data = () => {
        const obj_true = []
        valueListData.map(value=>{
            if(parseInt(value.idKey) !== parseInt(detail.idKey)){
                obj_true.push(value)
            }
        })
        // alert(JSON.stringify(obj_true))
        ToastAndroidScreen("Data diHapus")
        change_list_(obj_true)
        AsyncStorage.setItem("ListData", JSON.stringify(obj_true))
        navigation.goBack()
    }

    return(
        <View style={styleInputData.BoxBg}>
            <View style={styleInputData.boxHeader}>
    <TouchableOpacity onPress={()=>navigation.goBack()}>{clearIcon}</TouchableOpacity>
    <View style={{flexDirection:'row', alignItems:"center"}}>
        {parseInt(options) === 1 ? null : (
            <TouchableOpacity style={styleInputData.touchDelete} onPress={()=>delete_data()}>
            <Text style={styleInputData.textSave}>DELETE</Text>
            {deleteIcon}
            </TouchableOpacity>
        )}
            <TouchableOpacity style={styleInputData.touchSave} onPress={()=>parseInt(options) === 1 ? saveData() : editData()}>
                <Text style={styleInputData.textSave}>SAVE</Text>
                {saveIcon}
                </TouchableOpacity>
                </View>
            </View>
            <View style={styleInputData.boxBg2}>
            <View style={styleInputData.boxRow2}>
                    <Text style={styleInputData.textRp}>Rp.</Text>
                    <TextInput
                        style={styleInputData.boxInput2}
                        // placeholder="0"
                        placeholderTextColor="green"
                        value={valueRp}
                        onChangeText={(text)=>setvalueRp(text)}
                        keyboardType="numeric"
                        />
                </View>
                <View style={styleInputData.boxRow}>
                    {bookmarksIcon}
                    <TouchableOpacity style={styleInputData.boxInput} onPress={()=>setoptionsBox("1")}>
                        <Text>{valueKeterangan}</Text>
                    </TouchableOpacity>
                </View>
                {parseInt(optionsBox) === 1 ? Boxfisibel(listKeterangan) : false}
                <View style={styleInputData.boxRow}>
                    {articleIcon}
                    <TextInput
                        style={styleInputData.boxInput}
                        placeholder="note"
                        value={valuenote}
                        onChangeText={text=>setvaluenote(text)}
                    />
                </View>
                <View style={styleInputData.boxRow}>
                    {walletIcon}
                    <TouchableOpacity style={styleInputData.boxInput} onPress={()=>setoptionsBox("2")}>
                        <Text style={{textTransform:"capitalize"}}>{valueMethode}</Text>
                    </TouchableOpacity>
                </View>
                {parseInt(optionsBox) === 2 ? Boxfisibel(ListValueMethode) : false}
            </View>
            <View style={{width:'100%', alignItems:'center'}}>
            <Text style={styleInputData.textDesc}>Isi sesuai dengan apa yang Anda Masukan / Keluarkan. Bijaklah dalam penggunaan uang Anda unutk hidup Hemat...</Text>
            </View>
        </View>
    )
}

// export default InputDataScreen
const mapStateToProps = state =>{
    let {list_,list_grafik} = state.Reducer
    return {list_,list_grafik}
  }
export default connect(mapStateToProps,{change_list_, change_list_grafik})(InputDataScreen)