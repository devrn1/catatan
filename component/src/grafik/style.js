import { StyleSheet, Dimensions } from "react-native";

const {height, width} = Dimensions.get("window")

export const styleListGrafik = StyleSheet.create({
    box:{
        width:width,
        flex:1,
        height:1,
        backgroundColor:'#fff'
    },
    boxAbsolute:{
        position:'absolute',
        height:"100%",
        width:"100%",
        justifyContent:"flex-end",
        alignItems:'center',
        padding:height / 50
    },
    boxList:{
        width:'100%',
        paddingHorizontal:width / 50,
        // marginTop:height / 50,
        // paddingTop:height / 50,
        flex:2
        // paddingBottom:height / 8
    },
    boxRp:{
        width:'100%',
        height:height / 13,
        alignItems:'center',
        justifyContent:"center"
    },
    boxRow:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    boxStrip:{
        marginTop:height / 100,
        marginBottom:height / 150
    },
    boxRow:{width:'100%', flexDirection:'row', justifyContent:"space-between", alignItems:'center'},

    // text
    textTitle:{
        fontSize:height / 40,
        fontWeight:'bold',
        margin:height / 70,
        color:'#000',
    },
    textList1:{
        fontSize:height / 40,
        color:'#000',
        fontWeight:'bold',
        textTransform:"capitalize"
    },
    textList2:{
        fontSize:height / 35,
        color:'#000',
        // fontWeight:'bold'
    },
    textList3:{
        fontSize:height / 55,
        color:'gray',
        textTransform:"capitalize"
        // fontWeight:'bold'
    },
    textList4:{
        fontSize:height / 50,
        color:'#000',
        // fontWeight:'bold'
        textTransform:"capitalize"
    },

    // toch
    touchAdd:{
        padding:height / 100,
        backgroundColor:'#32CD32',
        borderRadius:100
    },
    touchList:{
        width:'100%',
        paddingVertical:height / 100,
        paddingHorizontal:width / 50,
        backgroundColor:'#fff',
        borderRadius:height / 100,
        borderWidth:2,
        marginBottom:height / 100,
        borderColor:"rgba(0,0,0,0.07)"
    },
    touchEdit:{
        padding:height / 180,
        borderRadius:height / 100,
        backgroundColor:"rgba(0,0,0,0.3)",
        justifyContent:"center",
        alignItems:'center'
    }
})