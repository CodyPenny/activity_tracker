import { set, update, get } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { getRef } from '../firebase/index.js'
import { getUserCompletedCount, getUserWinsCount, setUserCompletedCount, setUserWinCount } from './user.js';
import * as dayjs from 'dayjs'


/**
 * Creates a document in the challenge collection 
 * 
 * @param {*} criteria challenge conditions and data
 */
export const createChallenge = async ( criteria ) => {
  const cuid = uuidv4()
  const date = dayjs().format('YYYY-MM-DDTHH:mm:ss');

  try {
    criteria.uid = cuid
    criteria.time = date
    const c_ref = getRef("challenges", cuid)
    await set( c_ref, criteria )
    return cuid
    
  } catch (error) {
    return null
  }

}

/**
 * Adds the friend id to the challenge id
 * Creates the reverse index for efficient lookups
 * @param {*} f_uid friend id
 * @param {*} c_uid challenge id
 * @returns 
 */
export const addUserToChallenge = async ( u_uid, c_uid, displayName) => {
  //console.log('name coming through addUserToChall', displayName)
  try {
    const c_u_ref = getRef("challenges-user", c_uid)
    const u_c_ref = getRef("user-challenges", u_uid) 

    await update( c_u_ref, {
      [u_uid] : {
        streak: 0,
        name: displayName
      }
    })

    await update( u_c_ref, {
      [c_uid]: true
    })

    return

  } catch (error) {
    return null
  }
}

/**
 * Gets list of streaks by all challenge participants
 * @param {*} c_uid 
 */
export const getStreakToChallenges = async (c_uid) => {
  try {
    const c_u_ref = getRef("challenges-user", c_uid)
    const current_point = await get( c_u_ref )
    if ( current_point ) {
      const res = []
      current_point.forEach(doc => {
        res.push(doc.val())
      })
      return res
    } else {
      return []
    }
    
  } catch (error) {
    return []
  }
}

/**
 * Get's user's current streak value for challenge
 * @param {*} cuid 
 * @param {*} uuid 
 */
export const getUserStreakCount = async ( cuid, uuid) => {
  try {
    const c_u_ref = getRef("challenges-user", `${cuid}/${uuid}`)
    const curr_val = await get( c_u_ref );
    if( curr_val ) {
      return curr_val.val().streak
    }
    return 0
    
  } catch (error) {
    return 0
  }
}

/**
 * Increments the streak of the user
 * @param {*} c_uid challenge id
 * @param {*} u_uid user id
 * @param {*} duration challenge duration
 * @param {*} status  challenge's completed status
 * @param {*} name user's name
 */
export const addStreakToChallenge = async ( c_uid, u_uid, streak, status, name ) => {
  try {
    const path_str = `${c_uid}/${u_uid}`;
    const c_u_ref = getRef("challenges-user", path_str)
    let val = await getUserStreakCount( c_uid, u_uid )
    let incremented = val + 1
    // increment does not exceed streak points
    if(incremented <= streak){
      await update( c_u_ref, {'streak': incremented})
    }

    // challenge is completed
    if(incremented === streak){
      if(!status){
        // we have a winner
        await setWinnerToChallenge( c_uid, u_uid, name )
        return
      } 
      // update just completed, already a winner
      let curr_completed = await getUserCompletedCount( u_uid )
      await setUserCompletedCount( u_uid, curr_completed + 1 )
    }

  } catch (error) {
  }
}

/**
 * Sets the winner of the challenge
 * Updates the user's and challenge's profile
 * @param {*} c_uid challenge id
 * @param {*} u_uid user id
 * @param {*} name user's display name
 */
export const setWinnerToChallenge = async ( c_uid, u_uid, name ) => {
  //console.log('setting winner to challenge')
  try {
    const c_ref = getRef('challenges', c_uid)
    await update( c_ref, {
      'completed': true,
      'winner': name
    })
    // also update the user's completed stats wins and completed
    let curr_completed = await getUserCompletedCount( u_uid )
    await setUserCompletedCount( u_uid, curr_completed + 1 )
    let curr_wins = await getUserWinsCount( u_uid )
    await setUserWinCount( u_uid, curr_wins + 1 )

  } catch (error) {
  }
}

/**
 * Looks up the participant count for a challenge
 * Using onValue method does not return a promise but undefined, async await also does not work, throws error
 * @param {*} cuid challenge uid
 */
export const getChallengeMemberCount = async ( cuid ) => {
  let count = 0;
  try {
    const c_u_ref = getRef("challenges-user", cuid)
    const members = await get( c_u_ref );
       members.forEach( doc => { 
         count++ 
        })
        return count
    
  } catch (error) {
    return 0
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
    return 
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

