import React, { useState, useEffect } from 'react'
import {View, TouchableOpacity, Modal, Text, Dimensions, ScrollView, Alert} from 'react-native'
import { styleDesc } from './style'
import { keyboard_backspaceIcon, more_vertIcon, keyboard_arrow_upIcon, keyboard_arrow_downIcon } from '../../../asset/icon'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from "@react-native-community/async-storage";
import {
    LineChart,
  } from "react-native-chart-kit";
import moment from 'moment'
import LoadingScreen from '../../loading'
import formatRupiah from '../../rupiah'


const {height, width} = Dimensions.get("window")
const dataModal = [
    {
        id:1,
        name:"convert pdf"
    },
    {
        id:2,
        name:"convert doc"
    }
]

const DescriptionScreen = ({navigation, route}) => {

    const [modalHeader, setmodalHeader] = useState(false)
    const [AllList, setAllList] = useState([])
    const [value_rp, setvalue_rp] = useState("")
    const {name, icon} = route.params
    const [value_exel, setvalue_exel] = useState([])
    const [value_date, setvalue_date ] = useState("7")
    const [value_drop_down, setvalue_drop_down ] = useState(false)
    const [value_labels, setvalue_labels] = useState([])
    const [value_data, setvalue_data] = useState([])
    const [load, setload]=useState(false)
    const [data_data, setdata_data] = useState([])

    const tanggalOptions = () => {
        var date = new Date().toISOString().substr(0, 10)
        return date
    }

    function getSum(total, num) {
        return total + Math.round(num);
    }

    let day = moment().format("d")
    let tanggal = moment().format("D")
    let start = ""
    let end = ""
    // console.log(tanggal - 7)
    switch (parseInt(day)) {
        case 0:
            end = tanggal
            start = parseInt(tanggal) - 7
          break;
        case 1:
            start = tanggal
            end = parseInt(tanggal) + 7
          break;
        case 2:
            start = parseInt(tanggal) - 1
            end = parseInt(tanggal) + 5
          break;
        case 3:
            start = parseInt(tanggal) - 2
            end = parseInt(tanggal) + 4
          break;
        case 4:
            start = parseInt(tanggal) - 3
            end = parseInt(tanggal) + 3
          break;
        case 5:
            start = parseInt(tanggal) - 4
            end = parseInt(tanggal) + 2
          break;
        case  6:
            start = parseInt(tanggal) - 5
            end = parseInt(tanggal) + 1
    }

    useEffect(()=>{
        // labels: [1,2,3,4,5,6,7],
        // datasets: [
        //   {
        //     data: [
        //       Math.random() * 100,
        //       Math.random() * 100,
        //       Math.random() * 100,
        //       Math.random() * 100,
        //       Math.random() * 100,
        //       Math.random() * 100
        //     ]
        //   }
        // ]
        const money = []
        const bulan_value = []
        const list_data = []
        const list_wekend = []
        AsyncStorage.getItem("ListData").then(index=>{
            if(index != null){
                JSON.parse(index).map(value=>{
                    // let tanggal = value.tanggal.slice(2,4)
                    // let bulan = value.tanggal.slice(5,7)
                    // let tahun = value.tanggal.slice(8,12)
                    if(value.keterangan.toUpperCase() === name.toUpperCase()){
                        // alert(JSON.stringify(value)) 
                        list_data.push(value)
                        money.push(parseInt(value.Rp))
                    }
                })
            }
            for(let a=0; a<=30; a++){
                bulan_value.push({
                    id:bulan_value.length + 1,
                    value:[]
                })
            }
            bulan_value.map(res=>{
                list_data.map(cek=>{
                    if(parseInt(res.id) === parseInt(cek.tanggal.slice(2,4))){
                        res.value.push(cek)
                    }
                })
            })

            //   alert(start + " " +end )
            const labels = [] //tanggal
            const labels_date = [] //tanggal
            const data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] //jumlah
            const true_data = []
            bulan_value.map(res=>{
                if(parseInt(res.id) >= start && parseInt(res.id) <= end){
                    labels.push(res.id.toString())
                    res.value.map(cek=>{
                        list_wekend.push(cek)
                    })
                }
            })

            for(let a=1; a<=31; a++){
                list_wekend.map(b=>{
                    if(parseInt(b.tanggal.slice(2,3)) !== 0 ){
                        if(parseInt(a) === parseInt(b.tanggal.slice(2,4))){
                            data[a] = parseInt(data[a]) + parseInt(b.Rp)
                        }
                    }else{
                        if(parseInt(a) === parseInt(b.tanggal.slice(3,4))){
                            data[a] = parseInt(data[a]) + parseInt(b.Rp)
                        }
                    }
                })
            }

            for(let a=parseInt(start); a<=parseInt(end); a++){
                true_data.push(data[a])
                // console.log(data[a])
            }
            // alert(JSON.stringify(list_wekend))
            // alert(JSON.stringify(labels))
            // alert(JSON.stringify(true_data))
            // console.log(labels)
            // console.log(true_data)
            // console.log(labels)
            // console.log(true_data)
            setdata_data(data)
            setvalue_labels(labels)
            setvalue_data(true_data)
            setvalue_exel(list_wekend)
            setAllList(bulan_value)
            setvalue_rp(money.reduce(getSum, 0))
            if(labels.length >= 1  && true_data.length >= 1){
                setload(true)
            }
        })
    },[])

    const onPress_date = (index) => {
        setload(true)
        setvalue_labels(null)
        setvalue_data(null)
        const list_wekend = []
        const labels = [] //tanggal
        const true_data = []
        if(index === 7){
            AllList.map(res=>{
                if(parseInt(res.id) >= parseInt(start) && parseInt(res.id) <= parseInt(end)){
                    labels.push(res.id.toString())
                    res.value.map(cek=>{
                        list_wekend.push(cek)
                    })
                }
            })
            for(let a=parseInt(start); a<=parseInt(end); a++){
                true_data.push(data_data[a])
            }
        }else if(index === 15){
            AllList.map(res=>{
                if(parseInt(res.id) >= 1 && parseInt(res.id) <= 15){
                    // alert(JSON.stringify(res))
                    labels.push(res.id.toString())
                    res.value.map(cek=>{
                        list_wekend.push(cek)
                    })
                }
            })
            for(let a=1; a<=15; a++){
                true_data.push(data_data[a])
            }
        }else if(index === 31){
            AllList.map(res=>{
                if(parseInt(res.id) >= 1 && parseInt(res.id) <= 31){
                    // alert(JSON.stringify(res))
                    labels.push(res.id.toString())
                    res.value.map(cek=>{
                        list_wekend.push(cek)
                    })
                }
            })
            for(let a=0; a<=30; a++){
                true_data.push(data_data[a])
            }
        }
        setvalue_labels(labels)
        setvalue_data(true_data)

        // console.log(labels)
        // console.log(true_data)
        if(labels.length >= 1  && true_data.length >= 1){
            setload(true)
        }
        setvalue_exel(list_wekend)
        setvalue_date(index) 
        setvalue_drop_down(false)
    }

    const renderExcel= (value) => {
        return(
            <View key={value.idKey} style={styleDesc.boxExcel1}>
                        <View style={styleDesc.boxExcelNo1}>
                            <Text>{value.tanggal.slice(2,4)}</Text>
                        </View>
                        <View style={styleDesc.boxExcelDesc1}>
                            <Text>{value.note}</Text>
                        </View>
                        <View style={styleDesc.boxExcelJumlah1}>
                            <Text>{formatRupiah(value.Rp)}</Text>
                        </View>
                </View>   
        )
    }

    const drop_down = () => {
        return(
            <View style={styleDesc.box_down}>
                {[7,15,31].map(index=>{
                    return(
                        <TouchableOpacity key={index.toString()} onPress={()=>onPress_date(index)} style={styleDesc.touch_down}>
                            <Text>{index} day</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const right_chart = () => {
        if(parseInt(value_date) === 7){
            return width - width/30
        }else if(parseInt(value_date) === 15){
            return width * 2
        }else if(parseInt(value_date) === 31){
            return width * 3
        }
    }

    const convert_pdf = () =>{
        const response = [{
            name:name,
            value:[]
        }]
        value_exel.map(res=>{
            response[0].value.push(res)
        })
        // alert(JSON.stringify(response))
        setmodalHeader(false)
         navigation.navigate("PDFScreen",{'start':moment(), 'end':moment(), 'id_screen':2,'value_render':response})
    }

    return(
        <View style={styleDesc.box}>
            <Modal transparent={true} visible={modalHeader} onRequestClose={()=>setmodalHeader(false)}>
                <TouchableOpacity style={styleDesc.boxModal} onPress={()=>setmodalHeader(false)}>
                    <View style={styleDesc.boxcompoModal}>
                        {dataModal.map(value=>{
                            return(
                                <TouchableOpacity onPress={()=>value.id === 1 ? convert_pdf() : alert("kaga ada")} key={value.name} style={styleDesc.touchModal}>
                                    <Text style={styleDesc.textModal}>{value.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
            <View style={styleDesc.boxHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>{keyboard_backspaceIcon}</TouchableOpacity>
                <TouchableOpacity onPress={()=>setmodalHeader(true)}>{more_vertIcon}</TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styleDesc.boxOne}>
                <View style={styleDesc.boxRow}>
                        <View style={styleDesc.boxIcon}>
                            <Icon name={icon} size={height / 23} color="gray"/>
                        </View>
                        <View style={styleDesc.boxIconDesc}>
                            <Text style={styleDesc.textIcon}>{name}</Text>
                            <Text style={styleDesc.textRp}>Rp.{formatRupiah(value_rp)}</Text>
                        </View>
                </View>
                <View style={styleDesc.boxRow2}>
                        <View style={styleDesc.boxIcon}>
                            <Icon name="today" size={height / 30} color="gray"/>
                        </View>
                        <TouchableOpacity style={styleDesc.touch_drop} onPress={()=> value_drop_down === true? setvalue_drop_down(false) : setvalue_drop_down(true)}>
                            <Text style={styleDesc.textDesc}>{value_date} day</Text>{value_drop_down === false ? keyboard_arrow_downIcon : keyboard_arrow_upIcon }
                        </TouchableOpacity>
                        {value_drop_down === true ? drop_down() : null}
                </View>
                <View style={styleDesc.boxRow2}>
                        <View style={styleDesc.boxIconDesc}>
                        </View>
                </View>
                <View style={styleDesc.boxRow2}>
                        <View style={styleDesc.boxIcon}>
                            <Icon name="account-balance-wallet" size={height / 30} color="gray" style={{marginVertical:height / 100}}/>
                        </View>
                        <View style={styleDesc.boxIconDesc}>
                            <Text style={styleDesc.textDesc}>CASH</Text>
                        </View>
                </View>
                {load === false ? (
                    <View style={{width:'100%', height : height / 5, justifyContent:'center', alignItems:'center'}}>
                        <LoadingScreen/>
                    </View>
                ) : (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <LineChart
                            data={{
                              labels: value_labels,
                              datasets: [
                                {
                                    data: value_data
                                }
                              ]
                            }}
                            width={right_chart()} // from react-native
                            height={height / 2.5}
                            yAxisLabel="Rp."
                            yAxisInterval={1}
                            yLabelsOffset={10} // optional, defaults to 1
                            chartConfig={{
                              backgroundColor: "green",
                              backgroundGradientFrom: "#fff",
                              backgroundGradientTo: "#fff",
                              decimalPlaces: 0, // optional, defaults to 2dp
                              color: () => `#32CD32`,
                              labelColor: () => `black`,
                              propsForDots: {
                                r: "5",
                                strokeWidth: "2",
                                stroke: "#f9f9f9"
                              }
                            }}
                            bezier
                            style={{
                              marginVertical: height / 50,
                            //   borderRadius: 16
                            }}
                            />
                </ScrollView> 
                )}
                <Text style={styleDesc.text_ket}>Keterangan.</Text>
                <View style={styleDesc.boxExcel}>
                        <View style={styleDesc.boxExcelNo}>
                            <Text>Tgl.</Text>
                        </View>
                        <View style={styleDesc.boxExcelDesc}>
                            <Text>Description</Text>
                        </View>
                        <View style={styleDesc.boxExcelJumlah}>
                            <Text>Jumlah</Text>
                        </View>
                </View>
                    {value_exel.map(value=> renderExcel(value))}
            </View>
            </ScrollView>
        </View>
    )
}

export default DescriptionScreen