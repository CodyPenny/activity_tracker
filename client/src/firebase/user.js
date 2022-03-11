import { set, get, update } from "firebase/database";
import { getRef, auth, storage } from ".";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

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
        uid,
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

/**
 * Saves the image to the storage and updates the db
 * @param {*} image avatar image file- png, jpeg, jpg
 * @param {*} uid user's uid
 */
export const saveImageToStorage = async ( image, uid ) => {
  try {
    if(image){
      const metadata = {
        contentType: image.type
      };
      const storageRef = ref(storage, `user_profiles/${uid}/${image.name}`)
      const snapshot = await uploadBytes( storageRef, image, metadata )
      const url = await getDownloadURL(snapshot.ref)
      await updateUserAvatar( url, uid )
    }
    
  } catch (error) {
    console.error('saveImageToUserProfile Error:', error);
  }
}

/**
 * Updates the user's profile with the avatar url
 * @param {*} url storage reference url
 * @param {*} uid user's uid
 */
export const updateUserAvatar = async ( url, uid ) => {
  try {
    const uRef = getRef('users', uid);
    await update( uRef, {
      photoURL: url
    })

  } catch (error) {
    console.error('updateUserAvatar:', error);
  }
}