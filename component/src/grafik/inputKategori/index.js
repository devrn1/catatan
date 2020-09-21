import React, { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Dimensions, FlatList } from "react-native";
import { styleInputData } from "../../Home/inputData/style";
import { clearIcon, saveIcon, deleteIcon } from "../../../asset/icon";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import {change_list_, change_list_grafik} from '../../../redux.js/action/index'
import ToastAndroidScreen from "../../ToastAndroid";

const IconNameList = ["dashboard","library-books","account-balance-wallet","android","bookmark","card-travel","chrome-reader-mode","face","flight-takeoff","g-translate","important-devices","markunread-mailbox","opacity","polymer","store","directions-boat","ev-station","local-airport","local-grocery-store"]
const {width, height} = Dimensions.get("window")

const InputKategoriScreen = ({navigation, route, change_list_, change_list_grafik, list_, list_grafik}) => {

    const [IconName, setIconName] = useState("")
    const [ListKategori, setlistKeterangan] = useState([])
    const [inputText, setinputText] = useState("")
    const [warning, setwarning] = useState(false)
    const [list_data, setlist_data] = useState([])
    ///
    const {value,options} = route.params

    useEffect(()=>{
        if(options === 1){
            setIconName(IconNameList[0])
        }else{
            setIconName(value.icon)
            setinputText(value.text)
            AsyncStorage.getItem("ListData").then(value=>{
                if(value!=null){
                    setlist_data(JSON.parse(value))
                }
            })
        }
        AsyncStorage.getItem("ListKeterangan").then(value=>{
            if(value!=null){
                setlistKeterangan(JSON.parse(value))
            }
        })
    },[])

    const AddKategori = () => {
        const data = {
            idKey:parseInt(ListKategori.length) + 1,
            text:inputText,
            icon:IconName,
            jumlahDay:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            jumlahRp:[]
        }
        ListKategori.push(data)
        AsyncStorage.setItem("ListKeterangan", JSON.stringify(ListKategori))
        change_list_grafik(ListKategori)
        // alert(JSON.stringify(ListKategori))
        ToastAndroidScreen("Data diTambahkan")
        navigation.goBack()
    }

    const editKategori = () => {
        ListKategori.map(index=>{
            if(parseInt(index.idKey) === parseInt(value.idKey)){
                index.idKey = index.idKey
                index.text = inputText
                index.icon = IconName
            }
        })
        list_data.map(index=>{
            if(index.keterangan.toUpperCase() === value.text.toUpperCase()){
                index.idKey = index.idKey,
                index.Rp = index.Rp
                index.note = index.note
                index.keterangan = inputText
                index.method = index.method
                index.tanggal = index.tanggal
            }
        })
        change_list_(list_data)
        change_list_grafik(ListKategori)
        AsyncStorage.setItem("ListData", JSON.stringify(list_data))
        AsyncStorage.setItem("ListKeterangan", JSON.stringify(ListKategori))
        ToastAndroidScreen("Data diRubah")
        navigation.goBack()
    }

    const delete_data = () => {
        const obj_true = []
        const obj_true2 = []
        ListKategori.map(index=>{
            if(parseInt(index.idKey) !== parseInt(value.idKey)){
                obj_true.push(index)
            }
        })
        list_data.map(index=>{
            if(index.keterangan.toUpperCase() !== value.text.toUpperCase()){
                obj_true2.push(index)
            }
        })
        change_list_(obj_true2)
        change_list_grafik(obj_true)
        AsyncStorage.setItem("ListData", JSON.stringify(obj_true2))
        AsyncStorage.setItem("ListKeterangan", JSON.stringify(obj_true))
        ToastAndroidScreen("Data diHapus")
        navigation.goBack()
    }

    const optionsPress = () => {
        return options === 1 ? AddKategori() : editKategori()
    }

    return(
        <View style={style.box}>
            <View style={styleInputData.boxHeader}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>{clearIcon}</TouchableOpacity>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {options === 1 ? null : (
                <TouchableOpacity style={styleInputData.touchDelete} onPress={()=>delete_data() }>
                <Text style={styleInputData.textSave}>delete</Text>
                {deleteIcon}
                </TouchableOpacity>
            )}
            <TouchableOpacity style={styleInputData.touchSave} onPress={()=>inputText !== "" ? optionsPress() : setwarning(true) }>
                <Text style={styleInputData.textSave}>SAVE</Text>
                {saveIcon}
                </TouchableOpacity>
            </View>
            </View>
            <View style={style.boxInput}>
                <Text style={style.text}>Nama Kategori</Text>
                <TextInput
                    style={style.input}
                    placeholder="your kategori"
                    onChangeText={text=>setinputText(text)}
                    value={inputText}
                />
                {warning === true ? <Text style={{fontSize:height / 55, color:"red", marginTop:height / 300}}>colom wajib diisi.</Text> :false }
                <Text style={style.textIcon}>Icon</Text>
                    <FlatList
                    data={IconNameList}
                    numColumns={5}
                    keyExtractor={index=>index.toString()}
                    renderItem={({item})=>{
                        return item !== IconName ? (
                            <TouchableOpacity key={item} style={style.touchIcon} onPress={()=>setIconName(item)}>
                                <Icon name={item} size={height / 16.5} color="#000" />
                            </TouchableOpacity>
                        ):(
                            <View key={item} style={style.touchIcon}>
                                <Icon name={item} size={height / 15.5} color="#000" />
                                <View style={{height:'100%', width:'100%', position:'absolute',backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'center', alignItems:'center'}}>
                                <Icon name="done-all" size={height / 23} color="#fff" />
                                </View>
                            </View>
                        )
                    }}
                    />
                    {options === 2 ? <Text style={{color:'red', fontSize:height / 55, marginTop:height / 30, textTransform:"lowercase"}}>Ketika Anda Merubah Nama Kategori Maka Data Dengan Nama Kategori Awal Akan mengikuti.</Text>: false}
            </View>
        </View>
    )
}

// export default InputKategoriScreen
const mapStateToProps = state =>{
    let {list_, list_grafik} = state.Reducer
    return {list_, list_grafik}
  }
export default connect(mapStateToProps,{change_list_, change_list_grafik})(InputKategoriScreen)



const style = StyleSheet.create({
    box:{
        width:'100%',
        height:"100%",
        flex:1
    },
    boxInput:{
        width:'100%',
        paddingHorizontal:width / 15,
        paddingTop:height / 50
    },

    // input
    input:{
        width:'100%',
        height:height / 18,
        borderBottomColor:'#d3d3d3',
        borderBottomWidth:1,
        paddingHorizontal:width / 100,
        fontSize:height / 45,
        textAlignVertical:"center"
    },

    // touch
    touchIcon:{
        marginHorizontal:width / 40,
        marginVertical:height / 200
    },

    // text
    text:{
        fontSize:height / 40,
        color:'#000',
        // fontWeight:'bold'
    },
    textIcon:{
        fontSize:height / 40,
        color:'#000',
        marginTop:height / 50,
        marginBottom:height / 75,
        // fontWeight:'bold'
    }
})