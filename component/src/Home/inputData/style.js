import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get("window")

export const styleInputData = StyleSheet.create({
    // box
    BoxBg:{
        width:width,
        height:height,
        backgroundColor:"#fff",
        flex:1,
    },
    boxHeader:{
        width:width,
        height:height / 13 ,
        // backgroundColor:"green",
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:width / 28,
        alignItems:'center',
        marginTop:height/100
    },
    boxBg2:{
        width:width,
        paddingLeft:width / 35
    },
    boxRow:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:height / 100
    },
    boxRow2:{
        width:'100%',
        flexDirection:'row',
        justifyContent:"flex-end",
        alignItems:'center',
        marginVertical:height / 100
    },
    boxInput:{
        width:width / 1.2,
        height:height / 20,
        borderBottomWidth:1.5,
        // backgroundColor:'red',
        fontSize:height / 45,
        borderBottomColor:'#d3d3d3',
        textAlignVertical:"center",
        justifyContent:"center",
        paddingHorizontal:width / 50
    },
    boxInput2:{
        width:width / 1.45,
        height:height / 13,
        borderBottomWidth:1.5,
        // backgroundColor:'red',
        fontSize:height / 18,
        borderBottomColor:'#d3d3d3',
        textAlignVertical:"bottom",
        color:"green"
    },
    boxTrue:{
        backgroundColor:'#fff', 
        borderBottomWidth:2, 
        borderLeftWidth:2, 
        paddingBottom:5, 
        borderColor:"rgba(0,0,0,0.08)"
    },

    // text
    textRp:{
        fontSize:height / 18,
        color:'green',
        paddingBottom:height / 70
    },
    textSave:{
        color:'#fff',
        fontSize:height / 50,
        marginRight:width / 100,
        textTransform:"lowercase"
    },

    //touch
    touchList:{
        width:width / 1.2,
        paddingVertical:height / 100,
        paddingHorizontal:width/ 60
    },
    touchSave:{
        paddingHorizontal:width / 50,
        paddingVertical:height / 300,
        borderRadius:height / 100,
        backgroundColor:'#32CD32',
        color:"#fff",
        flexDirection:'row',
        alignItems:'center'
    },
    touchDelete:{
        paddingHorizontal:width / 50,
        paddingVertical:height / 300,
        borderRadius:height / 100,
        backgroundColor:'red',
        color:"#fff",
        flexDirection:'row',
        alignItems:'center',
        marginRight:width / 25
    },
    textDesc:{
        fontSize:height / 50,
        color:'gray',
        width:'90%',
        textTransform:"capitalize",
        marginTop:height / 40, 
    }

})