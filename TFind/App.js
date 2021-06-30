import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import * as Location from 'expo-location';
import RestView from './src/RestView';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import yelp from "./src/yelp"

const spearmint = "rgb(69, 176, 140)"
const ebony = "rgb(85, 93, 80)"
const kelly_green = "rgb(76, 187, 23)"
const mimosa = "#EDDEBA" //rgb(237, 222, 186)


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [restaurantList, setRestaurantList] = useState(false)

  const Yelp = new yelp
  //console.log(Yelp)
  //Yelp.request(1,1)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getRests = async () => {
    let data = null
    if (location) {
      data = await Yelp.request(location.coords.latitude, location.coords.longitude)
      setRestaurantList(data.businesses)
      console.log("data type:", typeof(data.businesses))
    }
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("location found")
    text = JSON.stringify(location);
  }
  
  console.log("rest list:", Boolean(restaurantList))
  return (
    <View style={styles.container}>
      {/* insert logic to change styles here */}
      {!restaurantList?
        
      <TouchableOpacity
        
        style={styles.searchButton}
        onPress={() => getRests()}
        disabled={!location}
          >
          {!location?  
          <Text numberOfLines={2} style={styles.searchText}>waiting for location</Text>: 
          <Text numberOfLines={2} style={styles.searchText}>Find me some tacos</Text>   }
      </TouchableOpacity>
      :
      <View style={styles.restList}>
        <FlatList 
              data={restaurantList}
              keyExtractor={(item) => item.id}
              renderItem={RestView }
        />
      </View>
      
      }

    </View >
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight(),
    flex: 1,
    backgroundColor: mimosa,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton:{
    width:300, 
    height:300,
    borderRadius:150,
    borderWidth:10, 
    borderColor:ebony,
    backgroundColor:spearmint,
    alignContent:"center",
    justifyContent:"center"
  },
  searchText:{
    alignSelf:"center",
    fontSize:25,
    justifyContent:"center"
    
  },
  restList:{
    margin:20,
    width:"95%"
  }
});
