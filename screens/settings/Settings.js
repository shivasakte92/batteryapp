import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Settings = ({ navigation }) => {

  const [search, setSearch] = useState('');

  return (
    <View>
      <Text>Settings Screen</Text>
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

export default Settings;