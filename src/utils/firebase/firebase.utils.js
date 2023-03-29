import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB0Xxw0daplGIN4qIzp1iLagg-5asVaXo8",
    authDomain: "clothing-site-db-3f124.firebaseapp.com",
    projectId: "clothing-site-db-3f124",
    storageBucket: "clothing-site-db-3f124.appspot.com",
    messagingSenderId: "45490323983",
    appId: "1:45490323983:web:bdc272ce82eab9c5db197a"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if(!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,  {
        displayName, 
        email, 
        createdAt
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }
  
  return userDocRef;
};
