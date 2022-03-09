import { set } from 'firebase/database';
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
    const u_c_ref = getRef("user-challenges", user_uid) // todo: overrides instead of appending

    await set( c_ref, criteria )
    await set( c_u_ref, {
      [user_uid] : true
    })
    await set( u_c_ref, {
      [cuid] : true
    })

    return cuid
    
  } catch (error) {
    console.error('createChallenge error:', error)
  }


  // generate cuid
  //add data to challenge
  // set index in junction table both ways
  // return cuid so friends can be added to the cuid
}









/**
 * 
 * @param {*} CUID 
 * @param {*} UID 
 * @returns 
 */
export const setUserChallenges = async (CUID, UID) => {
    if (!CUID || !UID) return;
  
    const uRef = getRef('users', UID);
  
    try {
      const uDoc = await uRef.get();
      const updates = { challenges: [CUID, ...uDoc.data().challenges] };
      await performUpdate(uRef, updates);
  
      return;
    } catch (error) {
      console.error('setUserChallenges Error:', error);
      return ' setUserChallenges Error';
    }
  };

  /**
   * 
   * @param {*} CUID 
   * @param {*} UID 
   * @param {*} additionalData 
   * @returns 
   */
  export const challengeAdjustMember = async (CUID, UID, additionalData) => {
    if (!CUID || !UID) return;
  
    try {
      const cRef = getRef('challenges', CUID);
      const cDoc = await cRef.get();
  
      if (cDoc.data().members[UID] === undefined) {
        const updates = {
          members: { ...{ [UID]: { currentStreak: 0 } }, ...cDoc.data().members },
          memberCount: cDoc.data().memberCount + 1
        };
        await performUpdate(cRef, updates);
      }
  
      return;
    } catch (error) {
      console.error('challengeAddNewMember Error:', error);
      return 'challengeAddNewMember Error';
    }
  };