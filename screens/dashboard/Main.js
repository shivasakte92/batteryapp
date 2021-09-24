import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { View, Text, TextInput, Image, StyleSheet, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarouselCards from '../../components/CarouselCards';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    url: 'https://firebasestorage.googleapis.com/v0/b/acapbattery-6c8af.appspot.com/o/1.jpg?alt=media&token=c8de9954-9a7e-4958-b0db-8959e1678406'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    url: 'https://firebasestorage.googleapis.com/v0/b/acapbattery-6c8af.appspot.com/o/towing.jpg?alt=media&token=fea342ab-a189-4914-bc59-8f54b48bc9e5'
  }
];

// const Item = ({ url }) => (
  
//   <View>
//     <Image source={{uri:`${url}`}} imageStyle={{ borderRadius: 20, opacity: 0.8}} style={{width: 250, height: 300}} />
//     {/* <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}> */}
//       {/* <Text>{title}</Text> */}
//     {/* </View> */}
//     {/* </Image> */}
//   </View>
// );

const Main = ({ navigation }) => {

  const [search, setSearch] = useState('');

  // const renderItem = ({ item }) => (
  //   <Item title={item.url} />
  // );

  return (
    <View style={ style.mainContainer }>
      <ScrollView style={ style.scrollContainer }
        contentContainerStyle={{
          // flexGrow: 1,
          // justifyContent: 'space-between'
      }}

      >

        <View style={style.nameAndCartContainer}>
          <Image
            style={style.tinyLogo}
            source={require('../../src/images/avatar.jpg')}
          />
          <Text style={{fontSize: 20, margin: 5, marginHorizontal: 10}}>
            Hi, Shiva
          </Text>
          <View style={{position: 'absolute', right: 20, paddingVertical: 10}}>
            <Icon name="bell" size={20} color="black" style={{paddingVertical: 0}} />
          </View>
        </View>

        {/* <View style={style.searchBoxContainer}>
          <View style={style.searchBox}>
            <Icon name="search" size={20} color="grey" style={{left:40}} />  
            <TextInput
              style={{left:40, fontSize:15}}
              onChangeText={setSearch}
              placeholder='Search your items'
              value={search}
            />
          </View>
        </View> */}

        <View style={style.menuContainer}>
          <Text style={{fontSize:25, fontWeight:'bold', left: 10}}>
            Our Services
          </Text>
            <SafeAreaView>
              <FlatList
                horizontal= {true}
                data={DATA}
                style={{  }}
                showsHorizontalScrollIndicator={false}
                renderItem={ ({ item, index }) => (
                  <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Battery')}
                  >
                  <View style={{  }}>
                  <ImageBackground source={{uri: item.url}}
                    key={index}
                    style={{
                      width:260,
                      height:300,
                      borderRadius: 100 / 5,
                      resizeMode:'contain',
                      margin: 10,
                      elevation: 6,
                    }}
                    imageStyle={{ borderRadius: 100/5}}
                  />
                  </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
        </View>

        {/* <View style={style.anouncementContainer}>
          <Text style={{fontSize:25, fontWeight:'bold', left: 10, top: 20}}>
            Our Services
          </Text>
          <SafeAreaView style={style.container}>
          <CarouselCards />
          </SafeAreaView>
        </View> */}

        <View></View>

      </ScrollView>
    </View>


  );
}

const style = StyleSheet.create({

    mainContainer: {
        flex: 1,
        // flexDirection: 'column',
        // top: 10,
        // marginTop: 10,
        // marginBottom: 30,
        // marginBottom: 30
    },
    scrollContainer: {
      // flexGrow: 1,
      // flex: 1,
    },
    nameAndCartContainer: {
        flex: 2,
        marginTop: 10,
        marginLeft: 10,
        // position: 'absolute',
        // height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        // paddingHorizontal: 15,
        // top: 20
    },
    searchBoxContainer: {
      flex: 2,
      marginTop: 10,
      // position: 'absolute',
      // height: 20
    },
    searchBox: {
      // backgroundColor: 'white',
      // position: 'absolute',
      // height: 100,
      flexDirection: 'row',
      width: '95%',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 100 / 5
    },
    menuContainer: {
      flex: 5,
      marginTop: 10,
    },
    menuContainerImage: {
      // position: 'absolute', top: 50, left: 50, 
    // backgroundColor: 'red', width: 100, height: 100, borderRadius: 50,
    // shadowColor: "black",
    // shadowOffset: { height: 2},
    // shadowOpacity: 0.8,
    // elevation: 8,
      // ...Platform.select({
      //   ios: {
      //     shadowColor: '#000',
      //     shadowOffset: { width: 0, height: 2 },
      //     shadowOpacity: 0.8,
      //     shadowRadius: 2,    
      //   },
      //   android: {
      //     elevation: 10,
      //   },
      // }),
    },
    anouncementContainer: {
      flex: 5,
      marginTop: 10,
      marginBottom: 30,
      // bottom: 20
    },
    tinyLogo: {
      width: 40,
      height: 40,
      borderRadius: 100/2
    },
    container: {
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
      top: 30
    },
});

export default Main;