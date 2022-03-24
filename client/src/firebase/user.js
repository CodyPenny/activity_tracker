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

/**
 * Gets the user's current completed count
 * @param {*} u_uid user's id
 * @returns count value
 */
 export const getUserCompletedCount = async ( u_uid ) => {
  try {
    const u_ref = getRef('users', u_uid)
    const count = await get( u_ref )
    if(count){
      return count.val().completed
    }
    return 0
  } catch (error) {
    console.error('getUserCompletedCount error:', error)
  }
}

/**
 * Gets the wins count of the user
 * @param {*} u_uid user id
 * @returns the wins count
 */
 export const getUserWinsCount = async ( u_uid ) => {
  try {
    const u_ref = getRef('users', u_uid)
    const count = await get( u_ref )
    if(count){
      return count.val().wins
    }
    return 0
  } catch (error) {
    console.error('getUserWinsCount error:', error)
  }
}

/**
 * Increments the completed count of the user
 * @param {*} u_uid user id
 * @param {*} newVal incremented completed value
 */
export const setUserCompletedCount = async ( u_uid, newVal ) => {
  try {
    const u_ref = getRef('users', u_uid)
    await update( u_ref, {
      'completed': newVal
    })
  } catch (error) {
    console.error('setUserCompletedCount error:', error)
  }
}

/**
 * Sets the wins count of the user
 * @param {*} u_uid user id
 * @param {*} newVal incremented win value
 */
export const setUserWinCount = async ( u_uid, newVal ) => {
  try {
    const u_ref = getRef('users', u_uid)
    await update( u_ref, {
      'wins': newVal
    })
  } catch (error) {
    console.error('setUserWinCount error:', error)
  }
}
