import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import Battery from '../Battery/Battery';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

const CarouselCardItem = ({ item, index, navigation }) => {
  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Battery')}
                  >
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
      />
      </TouchableOpacity>
      {/* <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // borderRadius: 100 / 5,
    // width: ITEM_WIDTH,
    // paddingBottom: 40,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 8,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 100 / 5,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItem