import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({

    loginContainer: {
        flex: 1,
        backgroundColor: 'grey'
    },
    loginButton: {
        height: 60,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontFamily: '',
        fontSize: 15
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      flexDirection: "column",
      borderRadius: 100 / 5
    },
    buttonContainer: {
      height: 60,
    },
    input: {
      fontSize: 16,
    },
    inputPane: {
      backgroundColor: 'rgba(215, 215, 215, 0.5)',
      borderRadius: 100 / 6,
      height: 380,
      width: '90%',
      alignSelf: 'center',
      paddingTop: 10,
      paddingLeft: 8,
      paddingRight: 8,
      position: 'absolute',
      bottom: 30,
    },
    emailInput: {
      height: 70,
      backgroundColor: 'ghostwhite',
      paddingHorizontal: 25,
      flexDirection: "row",
      justifyContent: "flex-start",
      margin: 3,
      borderRadius: 100 / 5,
    },
    settingPane: {
      flex:1,
      flexDirection: "row",
      justifyContent: 'space-between',
    },
    switchPane: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }
});