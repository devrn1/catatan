import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, PermissionsAndroid, Platform, Dimensions, Modal, TextInput, ScrollView, } from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { more_vertIcon, keyboard_backspaceIconWhite, save_altIcon } from '../../../asset/icon';
import AsyncStorage from '@react-native-community/async-storage';
import ToastAndroidScreen from '../../ToastAndroid';
import formatRupiah from '../../rupiah';


const {width, height} = Dimensions.get("window")
const data = [1,2,3,4,5]

const PDFScreen = ({navigation, route}) => {

    const [filePath, setfielPath] = useState("")
    const {start, end, id_screen, value_render} = route.params
    const [dataList, setDataList] = useState([])
    const [modal_label, setmodal_label]= useState(false)
    const [value_label, setvalue_label]= useState("")
    const [input,setinput]=useState(null)

    useEffect(()=>{

        AsyncStorage.getItem("ListData").then(value=>{
            let data_true = []
            if(value != null){
                JSON.parse(value).map(index=>{
                    let tanggal = index.tanggal.slice(2,4)
                    let bulan = index.tanggal.slice(5,7)
                    let tahun = index.tanggal.slice(8,12)
                    
                    if(parseInt(tahun) >= parseInt(start.format("YYYY")) &&
                    parseInt(tahun) <= parseInt(end.format("YYYY")) &&
                    parseInt(bulan) >= parseInt(start.format("MM")) &&
                    parseInt(bulan) <=  parseInt(end.format("MM"))){
                        
                        if(parseInt(start.format("YYYY")) === parseInt(end.format("YYYY"))  &&  
                        parseInt(start.format("MM")) === parseInt(end.format("MM"))){
                            if(parseInt(tanggal) >= parseInt(start.format("DD")) && parseInt(tanggal) <= parseInt(end.format("DD"))){
                                // alert(JSON.stringify(index) + "sama bulan")
                                data_true.push(index)
                            }
                        }else if(parseInt(start.format("YYYY")) === parseInt(end.format("YYYY"))  &&  
                        parseInt(start.format("MM")) !== parseInt(end.format("MM"))){
                            if(parseInt(bulan) === parseInt(start.format("MM")) &&
                            parseInt(tanggal) >= parseInt(start.format("DD")) &&
                            parseInt(tanggal) <= 31){
                                // alert(JSON.stringify(index) + "beda bulan dan awal bulal")
                                data_true.push(index)
                            }else if(parseInt(bulan) === parseInt(end.format("MM")) &&
                            parseInt(tanggal) <= parseInt(end.format("DD")) &&
                            parseInt(tanggal.slice(1,2)) >= 1 ){
                                // alert(JSON.stringify(index) + "beda bulan dan akhir bulan")
                                data_true.push(index)
                            }else{
                                // alert(JSON.stringify(index) + "beda bulan di tengah teanga")
                                data_true.push(index)
                            }
                        }
                    }
                })
            }

            //////////////////////////////////////////
            let objKeterangan = []
            AsyncStorage.getItem("ListKeterangan").then(index=>{
                if(index != null){
                    JSON.parse(index).map(res=>{
                        objKeterangan.push({
                            name:res.text,
                            value:[]
                        })
                    })
                }
                data_true.map(x=>{
                    objKeterangan.map(y=>{
                        if(x.keterangan.toUpperCase() === y.name.toUpperCase()){
                            y.value.push(x)
                        }
                    })
                })
                if(parseInt(id_screen) === 1 ){
                    setDataList(objKeterangan)
                }else{
                    setDataList(value_render)
                }
                // alert(JSON.stringify(objKeterangan))
            })
        })
    },[])

    const askPermission = ()=> {
        async function requestExternalWritePermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'CameraExample App External Storage Write Permission',
                message:
                  'CameraExample App needs access to Storage data in your SD Card ',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //If WRITE_EXTERNAL_STORAGE Permission is granted
              //changing the state to show Create PDF option
              createPDF();
            } else {
              alert('WRITE_EXTERNAL_STORAGE permission denied');
            }
          } catch (err) {
            alert('Write permission err', err);
            console.warn(err);
          }
        }
        //Calling the External Write permission function
        if (Platform.OS === 'android') {
          requestExternalWritePermission();
        } else {
          createPDF();
        }
      }

      const createPDF = async() => {
        let options = {
          //Content to print
          html:
            `
            <h3 style="font-size: 18px;">Documentasi Data Pengeluaran dan Pemasukan keuangan Anda.</h3>
            <div style="flex-direction: row; justify-content: flex-end; align-items: center; text-align: center; display: flex;">
                <div style="text-align: start; align-items: flex-start;">
                    <p style="margin-right: 2vh; font-size: 14px;">${start.format("DD MMMM")} - <br>${end.format("DD MMMM")}</p>
                </div>
                <h2 style="font-weight: 500;">${start.format("YYYY")}</h2>
                </div>
                ${dataList.map(value=>{
                    const Rp = []
                    function getSum(total, num) {
                        return total + Math.round(num);
                    }
                    value.value.map(index=>{
                        Rp.push(parseInt(index.Rp))
                    })
                    return `<h4 style="font-size: 16px; margin-block-end: 0.8em;">${value.name}</h4>
                    <div style="flex-direction: row; display: flex; border-style: solid; border-width: 1px; width: 100%;">
                        <div style="color: black; padding: 5px 0px; width: 10%; text-align: center; font-weight: bold; font-size: 13px;">Tgl.</div>
                        <div style="color: black; padding: 5px 0px; width: 65%; text-align: center; font-weight: bold; font-size: 13px; border-left-width: 1px; border-right-width: 1px; border-right-style: solid; border-left-style: solid; border-color: black;">Description</div>
                        <div style="color: black; padding: 5px 0px; width: 25%; text-align: center; font-weight: bold; font-size: 13px;">Jumlah</div>
                    </div>
                    ${value.value.map(index=>{
                        return`<div style="flex-direction: row; display: flex; width: 100%;">
                            <div style="padding: 5px 0px; width: 10%; text-align: center; font-weight: bold; font-size: 13px;">${index.tanggal.slice(2,4)}</div>
                            <div style="padding: 5px 0.5%; width: 64%; text-align: start; font-weight: bold; font-size: 13px; border-left-width: 1px; border-right-width: 1px; border-right-style: solid; border-left-style: solid; border-color: white;">${index.note}</div>
                            <div style="padding: 5px 0.5%; width: 24%; text-align: end; font-weight: bold; font-size: 13px;">Rp.${formatRupiah(index.Rp)}</div>
                        </div>
                        `
                    })}
                    <!-- === -->
                    <div style="flex-direction: row; display: flex; border-style: solid; border-width: 1px; width: 100%;">
                        <div style="color: black; padding: 5px 0px; width: 75%; text-align: center; font-weight: bold; font-size: 13px; border-left-width: 0px; border-right-width: 1px; border-right-style: solid; border-left-style: solid; border-color: black;">Total</div>
                        <div style="color: black; padding: 5px 0px; width: 25%; text-align: center; font-weight: bold; font-size: 13px; ">Rp.${Rp.reduce(getSum, 0)}</div>
                    </div>`   
                }
            )}
            `,
          //File Name
          fileName: value_label,
          //File directory
          directory: 'catatan keuangan',
          height:height,
          width:width,
        };
        let file = await RNHTMLtoPDF.convert(options);
        ToastAndroidScreen("success " + file.filePath)
        // console.log(file.filePath);
        setfielPath({filePath:file.filePath});
      }

      const renderExcel= (value) => {
        return (
            <View key={value.idKey} style={styles.boxExcel1}>
                        <View style={value%2!==0 ? styles.boxExcelNo1 : styles.boxExcelNo2}>
                            <Text style={styles.textExecl}>{value.tanggal.slice(2,4)}</Text>
                        </View>
                        <View style={value%2!==0 ? styles.boxExcelDesc1 : styles.boxExcelDesc2}>
                            <Text style={styles.textExecl}>{value.note}</Text>
                        </View>
                        <View style={value%2!==0 ? styles.boxExcelJumlah1 : styles.boxExcelJumlah2}>
                            <Text style={styles.textExeclJumlah}>Rp.{formatRupiah(value.Rp)}</Text>
                        </View>
                </View>   
        )
    }

    const render_keterangan = (value) => {
        const Rp = []
        function getSum(total, num) {
            return total + Math.round(num);
        }
        value.value.map(index=>{
            Rp.push(parseInt(index.Rp))
        })

        const render_modal = () => {
            return(
                <View style={styles.box_modal}>
                    <View style={styles.card_modal}>
                        <Text style={styles.text_modal1}>name file pdf</Text>
                        <TextInput
                        style={styles.input_modal}
                        placeholder="your name fikle"
                        onChangeText={text=>setvalue_label(text)}
                        autoFocus={true}
                        />
                        <View style={styles.modal_row}>
                            <Text style={styles.text_modal2}  onPress={()=>setmodal_label(false)}>Batal</Text>
                            <Text style={styles.text_modal2} onPress={()=>{
                                setmodal_label(false)
                                askPermission()
                                }}>Oke</Text>
                        </View>
                    </View>
                </View>
            )
        }

        return(
            <View style={{width:'100%'}} key={value.name}>
                <Modal transparent={true} visible={modal_label} animationType="fade" onRequestClose={()=>setmodal_label(false)} >
                    {render_modal()}
                </Modal>

                    <View style={styles.boxRow}>
                    <Text style={styles.textTitle}>{value.name}</Text>
                    </View>
                    <View style={styles.boxExcel}>
                        <View style={styles.boxExcelNo}>
                            <Text style={styles.textHeader}>Tgl.</Text>
                        </View>
                        <View style={styles.boxExcelDesc}>
                            <Text style={styles.textHeader}>Description</Text>
                        </View>
                        <View style={styles.boxExcelJumlah}>
                            <Text style={styles.textHeader}>Jumlah</Text>
                        </View>
                </View>
                    {value.value.map(value=> renderExcel(value))}
                    <View style={styles.boxExcel}>
                        <View style={styles.boxJumlah}>
                            <Text style={styles.textHeader}>Total</Text>
                        </View>
                        <View style={styles.boxExcelJumlah}>
                            <Text style={styles.textHeader}>Rp.{Rp.reduce(getSum, 0)}</Text>
                        </View>
                </View>
                </View>
        )
    }

    return (
        <View style={styles.box}>
            <View style={styles.boxHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>{keyboard_backspaceIconWhite}</TouchableOpacity>
                <TouchableOpacity onPress={()=>setmodal_label(true)}>{save_altIcon}</TouchableOpacity>
            </View>
            <View style={styles.boxRight}>
                {/* <Text style={styles.textRight}>1/3</Text> */}
            </View>
            <View style={styles.boxpdf}>
                    <ScrollView style={{marginBottom:height / 10}}>
                <View style={styles.boxKertas}>
                    <Text style={{fontSize:height / 45, fontWeight:'bold', color:"#000", marginVertical:height / 100}}>Documentasi Data Pengeluaran dan Pemasukan keuangan Anda.</Text>
                    <View style={styles.boxRight}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <View style={{marginRight:width / 30}}>
                    <Text style={styles.texttgl}>{start.format("DD MMMM")} - </Text>
                    <Text style={styles.texttgl}>{end.format("DD MMMM")}</Text>
                    </View>
                    <Text style={styles.textThn}>{start.format("YYYY")}</Text>
                    </View>
                    </View>
                    {dataList.map(value=>render_keterangan(value))}
                </View>
                    </ScrollView>
            </View>
        </View>
      );
}

export default PDFScreen

const styles = StyleSheet.create({
    box:{
        width:width,
        height:height,
        backgroundColor:"rgba(0,0,0,0.4)",
        flex:1
    },
    boxHeader:{
        width:width,
        height:height / 13 ,
        flexDirection:'row',
        justifyContent:'space-between',

        backgroundColor:"rgba(0,0,0,0.5)",
        paddingHorizontal:width / 28,
        alignItems:'center'
    },
    boxRight:{
        width:'100%',
        paddingHorizontal:width / 28,
        marginVertical:height / 100,
        alignItems:'flex-end'
    },
    boxpdf:{
        width:'100%',
        paddingHorizontal:width / 30,
    },
    boxKertas:{
        width:'100%',
        paddingVertical:height / 30,
        paddingHorizontal:width / 25,
        backgroundColor:'#fff',
        alignItems:'center',
    },
    boxExcel:{
        flexDirection:'row',
        width:'99%',
        borderWidth:0.5,
        borderColor:'#000',
        marginTop:height / 200,
    },
    boxExcel1:{
        flexDirection:'row',
        width:'100%',
        borderColor:'#fff',
    },
    boxExcelNo:{
        width:"13%",
        height:height / 25,
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
    },
    boxExcelDesc:{
        width:"57%",
        height:height / 25,
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderLeftWidth:0.5,
        borderRightWidth:0.5,
        borderColor:'#000'
    },
    boxExcelJumlah:{
        width:"30%",
        height:height / 25,
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
    },
    boxExcelNo1:{
        width:"13%",
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red',
    },
    boxExcelDesc1:{
        width:"57%",
        paddingHorizontal:width / 50,
        alignItems:'flex-start',
        justifyContent:'center',
        // backgroundColor:'green',
        paddingVertical:height / 150
    },
    boxExcelJumlah1:{
        width:"30%",
        paddingHorizontal:width / 50,
        alignItems:'flex-end',
        justifyContent:'flex-start',
        paddingVertical:height / 100,
        // backgroundColor:'orange',
    },
    boxExcelNo2:{
        width:"13%",
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.07)',
    },
    boxExcelDesc2:{
        width:"57%",
        paddingHorizontal:width / 50,
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.07)',
        paddingVertical:height / 150
    },
    boxExcelJumlah2:{
        width:"30%",
        paddingHorizontal:width / 50,
        alignItems:'flex-end',
        justifyContent:'flex-start',
        paddingVertical:height / 100,
        backgroundColor:'rgba(0,0,0,0.07)',
    },
    boxJumlah:{
        width:"70%",
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        // paddingVertical:height / 100,
        backgroundColor:'#fff',
        borderRightColor:'#000',
        borderRightWidth:0.5
    },
    boxRow:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:height / 100,
    },

    // text
    textRight:{
        fontSize:height / 45,
        color:'#000',
        fontWeight:'bold'
    },
    textExecl:{
        fontSize:height / 55,
        color:'#000'
    },
    textExeclJumlah:{
        fontSize:height / 55,
        color:'#000',
        fontWeight:'bold'
    },
    textHeader:{
        fontSize:height / 55,
        fontWeight:'bold',
        color:'#000'
    },
    texttgl:{
        fontSize:height / 55,
        color:'gray'
    },
    textTitle:{
        fontSize:height / 40,
        color:'#000'
    },
    textThn:{
        fontSize:height / 50,
        color:'gray',
        fontWeight:'bold',
    },

    // modal
    box_modal:{
        width:"100%",
        height:'100%',
        backgroundColor:'rgba(0,0,0,0.1)',
        justifyContent:'flex-end',
        padding:height / 30
    },
    card_modal:{
        width:'100%',
        paddingVertical:height / 50,
        paddingHorizontal:width / 25,
        backgroundColor:'#f5f5f5',
        borderRadius:height / 100,
        alignItems:'center'
    },
    input_modal:{
        width:'100%',
        height : height / 19,
        backgroundColor:'#fff',
        borderRadius:height / 100,
        paddingHorizontal:width / 50,
        fontSize:height / 48,
        borderColor:'#d3d3d3',
        borderWidth:0.5
    },
    modal_row:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:height / 50
    },
    text_modal1:{
        fontSize:height / 43,
        color:'#000',
        textTransform:'capitalize',
        marginBottom:height / 40
    },
    text_modal2:{
        fontSize:height / 45,
        color:'blue',
        fontWeight:'bold'
    }
  });