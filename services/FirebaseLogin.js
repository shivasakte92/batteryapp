import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const FirebaseAuth = ({email,password}) => {

    auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        return(alert(error.code));
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        return(alert(error.code));
      }
  
      console.error(error);
      return(alert(error));
    });
  }

export const FirebaseSignup = ({name,phoneNum,email,password}) => {

  // const [userUID, setUserUID] = useState();

  auth()
    .createUserWithEmailAndPassword(email,password,name,phoneNum)
    .then(() => {
      console.log('User account created & signed in!');
      const update = {
        displayName: `${name}`
      };

      // database()
      // .ref('/users/')
      // .on('value', snapshot => {
      //   console.log('User data: ', snapshot.val());
      // });
      
      auth().currentUser.updateProfile(update);
      // auth().currentUser.updatePhoneNumber(phoneNum);
      // setUserUID(auth().currentUser.uid);
      // console.log(auth().currentUser.uid);
      database()
      .ref(`/users/${auth().currentUser.uid}`)
      .update({
        name: 'Shiva',
        email: `${auth().currentUser.email}`,
        phonuNumber: `${phoneNum}`,
      })
      .then(() => console.log('Data set.'));
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        return(alert(error.code));
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        return(alert(error.code));
      }
  
      console.error(error);
      return(alert(error));
    });
}