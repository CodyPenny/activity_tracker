import { getDoc } from "firebase/firestore";
import { set } from "firebase/database";
import { getRef, auth } from ".";

/**
 * Creates a new user document 
 * @param {*} user 
 * @returns new user document
 */
 export const createUserProfileDocument = async (user) => {

    if (!user) return;
    
    try {
      const { email, photoURL, displayName, uid } = user;
      const uRef = getRef("users", uid );
      await set( uRef , {
        email,
        photoURL: photoURL ? photoURL : '',
        displayName,
      });

    } catch (error) {
      console.error('createUserProfileDocument Error:', error);
      return 'createUserProfileDocument Error';
    }
  };

  /**
 * 
 * @param {*} UID user's firestore unique ID
 * @returns 
 */
export const getUserDocument = async (UID) => {
    if (!UID) return null;
  
    const uRef = getRef('users', UID);
  
    try {
        const uDoc = await getDoc( uRef );
  
      //TODO: add default friends

      return uRef;
    } catch (error) {
      console.error('getUserDocument Error:', error);
      return 'getUserDocument Error';
    }
  };
  
/**
 * 
 * @returns user's uid
 */
export const getUserUid = async() => {
  return await auth.currentUser.uid
}

  /**
 * 
 * @param {*} UID 
 * @returns 
 */
export const getUser = async (UID) => {
  if (!UID) return null;

  try {
    const fRef = getRef('users', UID);
    const fDoc = await getDoc(fRef)


    return fDoc.data();
  } catch (error) {
    console.error('getUserDocument Error:', error);
    return 'getUserDocument Error';
  }
};