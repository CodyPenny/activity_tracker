import { set, get, update, remove } from "firebase/database";
import { getRef, auth, storage } from ".";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getUserChallengeCollection } from "./challenge";

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
      return 
    }
  };

  /**
   * Deletes the user from the users collection
   * Deletes the user from challenges
   * Deletes the challenges of the user if only user
   * @param {*} u_uid user uid
   */
export const deleteUserFromCollections = async ( u_uid ) => {
  const u_c_ref = getUserChallengeCollection( u_uid )
  if(u_c_ref){
    const challenges = []
    const u_c = await get(u_c_ref)
      u_c.forEach( doc => {
        challenges.push(doc.key)
      })
    // iterate through challenges
    for (let i = 0; i < challenges.length; i++){
      const users = []
      const c_u_ref = getRef('challenges-user', challenges[i])
      const c_u = await get(c_u_ref)
        c_u.forEach( doc => {
          users.push(doc.key)
        })
      // if only 1 key delete the challenge -user and delete challenge
      if (users.length === 1){
        await remove(c_u_ref)
        const c_ref = getRef('challenges', challenges[i])
        await remove(c_ref)
      } else {
        // if more than one -just remove the user from the challenge -don't delete challenege
        const c_u_u_ref = getRef(`challenges-user/${challenges[i]}`, u_uid )
        await remove(c_u_u_ref)
      }

    }
    // remove the challenge references of the user
    await remove(u_c_ref)
  }
  // remove user from users collection
  const u_ref = getRef('users', u_uid)
  await remove( u_ref )

}

  
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
    return 
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
    return 0
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
    return 0
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
  }
}
