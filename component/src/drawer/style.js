const { StyleSheet, Dimensions } = require("react-native");

const {height, width} = Dimensions.get("window")

export const styleDrawer = StyleSheet.create({
    component:{
        width:"100%",
        height:'100%',
        backgroundColor:"#fff",
        flex:1
    },
    touch:{
        height:height / 16,
        paddingHorizontal:width / 30,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"flex-start"
    },

    //box
    boxprofile:{
        width:"100%",
        height:height / 4,
        backgroundColor:"#32CD32",
        marginBottom:height / 100,
        justifyContent:'flex-start',
        padding:height / 50,
        flexDirection:'row',
        alignItems:'flex-end'
    },

    //text
    textList:{
        fontSize:height / 45,
        marginLeft:width / 30
    },
    img:{
        width:width / 6.5,
        height:height / 13
    },
    text_title:{
        fontSize:height / 45,
        marginLeft:width / 50,
        marginBottom:height / 100,
        fontWeight:'bold'
    }

})