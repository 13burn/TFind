import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"

const spearmint = "rgb(69, 176, 140)"
const ebony = "rgb(85, 93, 80)"
const kelly_green = "rgb(76, 187, 23)"
const mimosa = "#EDDEBA"

const RestView = ({item}) => {
    console.log(item)
    return (
        <View style={Styles.mainTheme}>
            <View>
                <Image style={Styles.image} source={{ uri: item.image_url }}/>
            </View>
            <View style={{margin:6, justifyContent:"space-between"}}>
                <Text numberOfLines={2} style={Styles.titleText}>{item.alias.replace(/-/gi, " ")}</Text>
                <Text numberOfLines={2} style={Styles.locationText}>Located in {item.location.address1}</Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    //styles for the lines
    mainTheme:{
        flexDirection:"row",
        borderWidth:3,
        backgroundColor:spearmint, 
        width:"95%",
        height:107,
        margin:5,
        borderColor:ebony,
        borderTopLeftRadius:14,
        borderBottomLeftRadius:14,
        borderTopRightRadius:18,
        borderBottomRightRadius:45
    },
    image:{
        height:90, 
        width:90, 
        borderRadius:10, 
        margin:5,
        elevation:2
    },
    titleText:{
        width:"65%",
        fontSize:20
    },
    locationText:{
        width:"65%",

    }
});

export default RestView;