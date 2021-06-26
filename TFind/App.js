import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import * as Location from 'expo-location';
import yelp from "./src/yelp"

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [restaurantList, setRestaurantList] = useState(false)

  const Yelp = new yelp
  console.log(Yelp)
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

  const getRests = () => {
    let data = null
    if(location){
      data = Yelp.request(location.coords.latitude, location.coords.longitude)
      setRestaurantList(data.businesses)
    }
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("location:", location)
    text = JSON.stringify(location);
  }

  return (
    

    <View style={styles.container}>
      <TouchableWithoutFeedback  onPress={() => getRests()} >
        {!location?
          <Text>no location readi</Text>:
          <Text>location ready</Text>
          }
        
      </TouchableWithoutFeedback>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
