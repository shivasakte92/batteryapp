import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { style } from './Details.Styles';
import { FirebaseSignup } from '../../services/FirebaseLogin';

const Details = ({ navigation }) => {

  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  // Handle the button press
  async function UpdateDetails({name,email}) {
    const update = {
      displayName: `${name}`
    };
    // const displayemail = {
    //   email: `${email}`
    // };
    console.log('here',name,email);
    auth().currentUser.updateProfile(update);
    auth().currentUser.updateEmail(email);

    // updateEmail(auth().currentUser, `${email}`).then(() => {
    //   console.log('Email updated');
    // }).catch((error) => {
    //   console.log('Unable to update email',error)
    // });

    database()
      .ref(`/users/${auth().currentUser.uid}`)
      .update({
        name: `${name}`,
        email: `${auth().currentUser.email}`,
        phonuNumber: `${auth().currentUser.phoneNumber}`,
      })
      .then(() => console.log('Data set.'));
  }

  return (
    <View style={ style.loginContainer }>
      <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground 
        imageStyle={{ borderRadius: 20, opacity: 0.6}}
        source={require('../../src/images/background3.jpg')} style={style.image}>
          <View style={ style.inputPane }>
            <View>
              <View style={ style.emailInput }>
                <Icon name="user" size={30} color="black" style={{paddingVertical: 20}} />
                <TextInput
                  style={style.input, {paddingHorizontal: 13}}
                  onChangeText={setName}
                  placeholder='Name'
                  value={name}
                />
              </View>
              {/* <View style={ style.emailInput }>
                <Icon name="hashtag" size={25} color="black" style={{paddingVertical: 20}} />
                <TextInput
                  style={style.input}
                  onChangeText={setPhoneNum}
                  placeholder='Phone Number'
                  value={phoneNum}
                />
              </View> */}



              <View style={ style.emailInput }>
                <Icon name="envelope" size={30} color="black" style={{paddingVertical: 20}} />
                <TextInput
                  style={style.input, {paddingHorizontal: 13}}
                  onChangeText={setEmail}
                  placeholder='Email'
                  value={email}
                />
              </View>
              {/* <View style={ style.emailInput }>
                <Icon name="key" size={30} color="black" style={{paddingVertical: 20}} />
                <TextInput
                  style={style.input}
                  onChangeText={setPassword}
                  placeholder='Password'
                  secureTextEntry={true}
                  value={password}
                />
              </View> */}
            </View>     
            <View style={ style.settingPane }>
              <TouchableOpacity 
                  activeOpacity={0.7}
                  // style={style.loginButton}
                  // onPress={() => navigation.navigate('Login')}
                  >
                  <Icon name="gear" size={28} color="white" style={{paddingVertical: 20, paddingHorizontal: 10}} />
              </TouchableOpacity>

              <View style={style.switchPane}>
              <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Login')}
                  >
                <Text style={{ color: 'white', paddingHorizontal: 10 }}>Go to Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        <TouchableOpacity 
          activeOpacity={0.7}
          style={style.loginButton}
          onPress={() => {
              // console.log(email)
              const response = UpdateDetails({name,email});
              // console.log(response);
            }
          }
          >
        <Text style={style.loginButtonText}>UPDATE</Text>
      </TouchableOpacity>
        
    </View>
  );
    
    }    

export default Details;