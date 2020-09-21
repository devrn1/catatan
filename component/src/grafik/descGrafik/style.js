const { StyleSheet, Dimensions } = require("react-native");

const {width, height} = Dimensions.get("window")

export const styleDesc = StyleSheet.create({
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
        justifyContent:"space-between",
        flexDirection:"row",
        height:height / 12,
        borderColor:'rgba(0,0,0,0.1)',
        borderBottomWidth:2,
        paddingTop:height / 200,
        // marginTop:height / 100
    },
    boxModal:{
        width:'100%',
        height:"100%",
        alignItems:'flex-end',
        justifyContent:'flex-start',
        padding:height / 100,
        backgroundColor:"rgba(0,0,0,0.1)"
    },
    boxcompoModal:{
        padding:height / 100,
        backgroundColor:'#fff',
        borderRadius:height / 100
    },
    boxOne:{
        paddingHorizontal:width / 50,
        paddingTop:height /35,
        paddingBottom:height / 20
    },
    boxRow:{
        flexDirection:'row', 
        alignItems:'flex-start',
        flexWrap:'wrap',
        width:'100%'
    },
    boxRow2:{
        flexDirection:'row', 
        alignItems:'center',
        flexWrap:'wrap',
        // width:'100%',backgroundColor:'green',
        justifyContent:'flex-end'
    },
    boxIcon:{
        width:'12%',
        // paddingVertical:height / 300,
        // backgroundColor:'red',
        alignItems:'flex-start',
    },
    boxIconDesc:{
        width:'88%',
        // paddingVertical:height / 50,
        // backgroundColor:'green',
        alignItems:'flex-start',
        // flexDirection:'row'
    },
    boxGrafik:{
        height:height / 3.5,
        width:"100%",
        backgroundColor:"#d3d3d3"
    },
    boxExcel:{
        flexDirection:'row',
        width:'100%',
        borderWidth:1,
        borderColor:'#d3d3d3',
        marginTop:height / 50
    },
    boxExcel1:{
        flexDirection:'row',
        width:'100%',
        borderColor:'gray',
        marginVertical:height / 200
    },
    boxExcelNo:{
        width:"13%",
        height:height / 25,
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.05)',
    },
    boxExcelDesc:{
        width:"57%",
        height:height / 25,
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.05)',
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#d3d3d3'
    },
    boxExcelJumlah:{
        width:"30%",
        height:height / 25,
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0,0,0,0.05)',
    },
    boxExcelNo1:{
        width:"13%",
        height:height / 50,
        paddingHorizontal:width / 50,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red',
    },
    boxExcelDesc1:{
        width:"57%",
        height:height / 50,
        paddingHorizontal:width / 50,
        alignItems:'flex-start',
        justifyContent:'center',
        // backgroundColor:'green',
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#d3d3d3'
    },
    boxExcelJumlah1:{
        width:"30%",
        height:height / 50,
        paddingHorizontal:width / 50,
        alignItems:'flex-end',
        justifyContent:'center',
        // backgroundColor:'orange',
    },

    //touch
    touchModal:{
        width:width / 2.5,
        height:height / 22,
        justifyContent:'center'
    },

    // text
    textModal:{
        fontSize:height / 45,
        color:'#000'
    },
    textIcon:{
        fontSize:height /35,
        color:'#000',
        marginTop:height / 150
    },
    textRp:{
        fontSize:height /23,
        color:'#32CD32',
        marginTop:height / 30,
        marginBottom:height / 50,
        // color:"green"
    },
    textDesc:{
        fontSize:height / 50,
        textTransform:"capitalize",
        color:'#000',
    },
    text_ket:{
        fontSize:height / 45,
        fontWeight:"bold",
        color:'#000'
    },

    // drop_down
    box_down:{
        width:'90%',
        paddingVertical:height / 350,
        // backgroundColor:'#d3d3d3',
        borderLeftWidth:2,
        borderBottomWidth:3,
        borderColor:'rgba(0,0,0,0.05)'
    },
    touch_down:{
        width:'100%',
        paddingVertical:height / 100,
        paddingHorizontal:width / 40,
    },
    touch_drop:{
        width:'88%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:height / 300
    }
})