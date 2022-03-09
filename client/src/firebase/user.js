import { set, get } from "firebase/database";
import { getRef, auth } from ".";

/**
 * Creates a new user document 
 * Use uppercase for simpler queries
 * @param {*} user 
 * @returns new user document
 */
 export const createUserProfileDocument = async (user) => {

    if (!user) return;
    
    try {
      const { email, photoURL, displayName, uid } = user;
      const uRef = getRef("users", uid );
      await set( uRef , {
        email: email.toUpperCase(),
        photoURL: photoURL ? photoURL : '',
        displayName: displayName.toUpperCase(),
        id: uid,
        completed: 0,
        wins: 0
      });

    } catch (error) {
      console.error('createUserProfileDocument Error:', error);
      return 'createUserProfileDocument Error';
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
 * @returns user data
 */
export const getUser = async (UID) => {
  if (!UID) return null;

  try {
    const fRef = getRef('users', UID);
    const snapshot = await get( fRef )
    return snapshot.val();

  } catch (error) {
    console.error('getUser Error:', error);
    return 'getUserDocument Error';
  }
};
