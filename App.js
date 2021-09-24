import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';

import Login from './screens/login/Login';
import Signup from './screens/signup/Signup';
// import Home from './screens/dashboard/HomeStackScreen';
import Main from './screens/dashboard/Main';
import Settings from './screens/settings/Settings';
import ManageOrder from './screens/management/ManageOrder';
import Battery from './screens/Battery/Battery';
import Details from './screens/login/Details';

const NonUserStack = createStackNavigator();
const UserStack = createStackNavigator();
const Tab = createBottomTabNavigator();
let isAdmin;

const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{headerShown: false}} name="Main" component={Main} />
      <HomeStack.Screen options={{headerShown: false}} name="Battery" component={Battery} />
    </HomeStack.Navigator>
  );
}

const App = () => {

  const [adminUID, setadminUID] = useState('');

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    // isAdmin = '';
    if(user && user.uid){
    database()
    .ref(`/admin/${user.uid}`)
    .on('value', snapshot => {
      // console.log(snapshot);
      if(snapshot.exists()){
      setadminUID(snapshot.val().uid);
      isAdmin = snapshot.val().uid;
      // console.log(isAdmin);
      // console.log(adminUID);
      setUser(user);
      }else{
        setUser(user);
        console.log(user);
        
      }
      // console.log(snapshot.val().uid);
    },error => {
        console.error(error);
    });
  }
    // console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
    
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // console.log(subscriber);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // const adminuid = adminUID.uid;
  

  if (!user) {
    return (
      <NavigationContainer>
        <NonUserStack.Navigator>
          <NonUserStack.Screen options={{headerShown: false}} name="Login" component={Login} />
          <NonUserStack.Screen options={{headerShown: false}} name="Signup" component={Signup} />          
        </NonUserStack.Navigator>
      </NavigationContainer>
    );
  }
  else if(user.uid === isAdmin){
    // console.log(isAdmin);
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'user' : 'user';
              } else if (route.name === 'ManageOrder') {
                iconName = focused ? 'gear' : 'gear';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={25} color={color} />;
            },
            tabBarActiveTintColor: "dodgerblue",
            tabBarInactiveTintColor: "gray",
            tabBarShowLabel: false,
            tabBarStyle: [
              {
                display: "flex"
              },
              null
            ]
          })}
        >
          <Tab.Screen options={{headerShown: false}} name="Home" component={Main} />
          <Tab.Screen options={{headerShown: false}} name="Settings" component={Settings} />
          <Tab.Screen options={{headerShown: false}} name="ManageOrder" component={ManageOrder} />
        </Tab.Navigator>
      </NavigationContainer>
    );

  }
  else if(user && user.displayName && user.email){
    // console.log(isAdmin);
    // console.log(user.displayName);
    return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'user' : 'user';
            } else if (route.name === 'Battery') {
              iconName = focused ? 'user' : 'user';
            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          tabBarActiveTintColor: "dodgerblue",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              display: "flex"
            },
            null
          ]
        })}
      >
        <Tab.Screen options={{headerShown: false}} name="Home" component={HomeStackScreen} />
        <Tab.Screen options={{headerShown: false}} name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
      }else {
        return(

      <NavigationContainer>
        <NonUserStack.Navigator>
          <NonUserStack.Screen options={{headerShown: false}} name="Details" component={Details} />
        </NonUserStack.Navigator>
      </NavigationContainer>

        );
      }

}

export default App;