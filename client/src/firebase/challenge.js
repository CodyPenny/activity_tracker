import { set, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { getRef, performUpdate } from '../firebase/index.js'


/**
 * Creates a document in the challenge collection and also an index 
 * in joint collection to lookup challenges by user and users by challenges
 * @param {*} criteria challenge conditions
 * @param {*} user_uid user's uid
 */
export const createChallenge = async ( criteria, user_uid ) => {
  const cuid = uuidv4()

  try {
    const c_ref = getRef("challenges", cuid)
    const c_u_ref = getRef("challenges-user", cuid)
    const u_c_ref = getRef("user-challenges", user_uid) 

    await set( c_ref, criteria )
    await set( c_u_ref, {
      [user_uid] : true
    })
    // user can have other challenges, use update method
    await update( u_c_ref, {
      [cuid] : true
    })

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
export const addFriendToChallenge = async ( f_uid, c_uid) => {
  try {
    const c_u_ref = getRef("challenges-user", c_uid)
    const u_c_ref = getRef("user-challenges", f_uid) 

    await update( c_u_ref, {
      [f_uid] : true
    })

    await update( u_c_ref, {
      [c_uid]: true
    })

    return

  } catch (error) {
    console.error('addFriendToChallenge error:', error)
  }
}







// /**
//  * 
//  * @param {*} CUID 
//  * @param {*} UID 
//  * @returns 
//  */
// export const setUserChallenges = async (CUID, UID) => {
//     if (!CUID || !UID) return;
  
//     const uRef = getRef('users', UID);
  
//     try {
//       const uDoc = await uRef.get();
//       const updates = { challenges: [CUID, ...uDoc.data().challenges] };
//       await performUpdate(uRef, updates);
  
//       return;
//     } catch (error) {
//       console.error('setUserChallenges Error:', error);
//       return ' setUserChallenges Error';
//     }
//   };

//   /**
//    * 
//    * @param {*} CUID 
//    * @param {*} UID 
//    * @param {*} additionalData 
//    * @returns 
//    */
//   export const challengeAdjustMember = async (CUID, UID, additionalData) => {
//     if (!CUID || !UID) return;
  
//     try {
//       const cRef = getRef('challenges', CUID);
//       const cDoc = await cRef.get();
  
//       if (cDoc.data().members[UID] === undefined) {
//         const updates = {
//           members: { ...{ [UID]: { currentStreak: 0 } }, ...cDoc.data().members },
//           memberCount: cDoc.data().memberCount + 1
//         };
//         await performUpdate(cRef, updates);
//       }
  
//       return;
//     } catch (error) {
//       console.error('challengeAddNewMember Error:', error);
//       return 'challengeAddNewMember Error';
//     }
//   };