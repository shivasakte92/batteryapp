import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { View, Text, TextInput, Button, Image, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Geolocation from '@react-native-community/geolocation';

const Battery = ({ navigation }) => {

  const [search, setSearch] = useState('');
  // const [latitude, setLatitude] = useState();
  // const [longitude, setLongitude] = useState();

  function getAddressFromCoordinates(latitude, longitude) {
    return new Promise((resolve) => {
      const HERE_API_KEY = '3GzkggI08nYWBv-EwZB4VayGY5FyVL0eLYYY0jGSm84';
      const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${HERE_API_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude}`
      console.log(latitude,longitude)
      fetch(url)
        .then(res => res.json())
        .then((resJson) => {
          console.log(resJson);
          // the response had a deeply nested structure :/
          if (resJson
            && resJson.Response
            && resJson.Response.View
            && resJson.Response.View[0]
            && resJson.Response.View[0].Result
            && resJson.Response.View[0].Result[0]) {
            resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
            console.log(resJson.Response.View[0].Result[0].Location.Address.Label);
          } else {
            resolve()
          }
        })
        .catch((e) => {
          console.log('Error in getAddressFromCoordinates', e)
          resolve()
        })
    })
  }

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization("whenInUse");
      if(auth === "granted") {
        Geolocation.getCurrentPosition(info => console.log(info));
      }
    }
  
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log(PermissionsAndroid.RESULTS.GRANTED);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition((position) => {
          // console.log(position);
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          // setLatitude(position.coords.latitude);
          // setLongitude(position.coords.longitude);
          getAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
        }, error => console.error(error), { enableHighAccuracy: true, timeout: 20000, maximumAge: 3600000 });
        // Geolocation.requestAuthorization();
      }else{
        console.log(granted);
        console.log("Permission not granted");
      }
    }
  }

  

  useEffect(() => {
    // console.log(latitude,longitude)
    // getAddressFromCoordinates(latitude, longitude);
    requestPermissions();
  }, []);

  return (
    <View>
      <Text>Battery Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          auth()
          .signOut()
          .then(() => console.log('User signed out!'));
          }
        }
      />
      {/* <Button
        title="Press"
        onPress={() => {
          
          }
        }
      /> */}
    </View>


  );
}

const style = StyleSheet.create({

});

export default Battery;