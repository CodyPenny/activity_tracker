import { onValue, set, update, get } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { getRef } from '../firebase/index.js'


/**
 * Creates a document in the challenge collection 
 * 
 * @param {*} criteria challenge conditions and data
 */
export const createChallenge = async ( criteria ) => {
  const cuid = uuidv4()

  try {
    criteria.uid = cuid
    const c_ref = getRef("challenges", cuid)
    await set( c_ref, criteria )
    return cuid
    
  } catch (error) {
    console.error('createChallenge error:', error)
  }

}

/**
 * Adds the friend id to the challenge id
 * Creates the reverse index for efficient lookups
 * @param {*} f_uid friend id
 * @param {*} c_uid challenge id
 * @returns 
 */
export const addUserToChallenge = async ( u_uid, c_uid) => {
  try {
    const c_u_ref = getRef("challenges-user", c_uid)
    const u_c_ref = getRef("user-challenges", u_uid) 

    await update( c_u_ref, {
      [u_uid] : true
    })

    await update( u_c_ref, {
      [c_uid]: true
    })

    return

  } catch (error) {
    console.error('addFriendToChallenge error:', error)
  }
}


/**
 * Looks up the participant count for a challenge
 * @param {*} cuid challenge uid
 */
export const getChallengeMemberCount = async ( cuid ) => {
  let count = 0;
  try {
    const c_u_ref = getRef("challenges-user", cuid)
      onValue( c_u_ref, ( members ) => {
       members.forEach( doc => { 
         count++ 
        })
      })
    return count
    
  } catch (error) {
    console.error('getChallengeMemberCount error:', error)
  }
}

/**
 * 
 * @param {*} c_uid challenge uid
 * @returns challenge data
 */
export const getChallenge = async ( c_uid ) => {
   if (!c_uid) return null

   try {
     const c_ref = getRef('challenges', c_uid)
     const snapshot = await get( c_ref )
     return snapshot.val();
     
   } catch (error) {
    console.error('getChallenge Error:', error);
    return 'getUserDocument Error';
   }
}

/**
 * 
 * @param {*} uid user's uid
 * @returns reference to the challenges associated with a user's uid
 */
export const getUserChallengeCollection = ( uid ) => {
  return getRef("user-challenges", uid) 
}

