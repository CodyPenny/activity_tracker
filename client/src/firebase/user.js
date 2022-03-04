import { setDoc, getDoc } from "firebase/firestore";
import { getRef, auth } from ".";

/**
 * Creates a new user document with firebase
 * @param {*} user 
 * @param {*} additionalData 
 * @returns new user document
 */
 export const createUserProfileDocument = async (user) => {

    if (!user) return;
    
    try {
      const { email, photoURL, displayName } = user;
      const createdAt = new Date();
      const uRef = doc(db, "users", user.uid)
      await setDoc( uRef , {
        email,
        photoURL,
        displayName,
        createdAt
      })
  
      const uDoc = await getDoc( uRef );
  
      return await getUserDocument(user.uid);
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