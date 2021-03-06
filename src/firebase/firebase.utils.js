import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDZ465c6ZwreOwXxOlQgngJv0kStlq0M-M',
  authDomain: 'ecommerce-db-be851.firebaseapp.com',
  projectId: 'ecommerce-db-be851',
  storageBucket: 'ecommerce-db-be851.appspot.com',
  messagingSenderId: '947190247738',
  appId: '1:947190247738:web:bd7e766fa792dc036d6003',
  measurementId: 'G-EFV14D36YT',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }
  return userRef;
};


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
