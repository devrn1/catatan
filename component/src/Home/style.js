import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get("window")

export const styleHome = StyleSheet.create({
    // box
    BoxBg:{
        width:width,
        height:height,
        backgroundColor:"#fff",
        flex:1
    },
    boxHeader:{
        width:width,
        height:height / 14 ,
        backgroundColor:"#32CD32",
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:width / 28,
        alignItems:'center'
    },
    boxBg2:{
        width:width,
        paddingHorizontal:width / 35
    },
    boxDate:{
        width:'100%', 
        paddingVertical:height / 100,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor:'#d3d3d3'
    },
    componentBoxDate:{
        flexDirection:'row',
        alignItems:'center'
    },
    boxList:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:height / 200
    },
    boxAbsolute:{
        position:'absolute', 
        alignItems:'center', 
        width:'100%',
        justifyContent:'flex-end', 
        height:'100%',
        paddingBottom:height / 40
    },
    boxTouch:{
        padding:height / 100,
        backgroundColor:'#32CD32',
        borderRadius:100
    },

    // text
    textDate1:{
        fontSize:height / 19,
        color:'#000',
        marginRight:width/100
    },
    textDate2:{
        fontSize:height / 53,
        color:'#000',
        marginRight:width/60
    },
    textValue:{
        fontSize:height / 40,
        color:'green'
    },
    textValuered:{
        fontSize:height / 40,
        color:'red'
    },
    textValue2:{
        fontSize:height / 45,
        color:'green'
    },
    textList1:{
        fontSize:height / 42,
        color:'#000'
    },
    textList2:{
        fontSize:height / 55,
        color:'#000'
    }
})