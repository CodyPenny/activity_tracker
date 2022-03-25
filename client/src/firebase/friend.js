import { getRef, getCollection } from '../firebase/index.js'
import { query, ref, orderByChild, orderByKey, get, startAt, endAt, limitToFirst, set, onValue, update } from "firebase/database";
import { resetPasswordWithEmail } from './auth.js';
import { getUser } from './user.js';


/**
 * Get default friends for search friends page less self and friends already added
 * @param {*} u_uid user uid
 */
export const getDefaultFriends = async ( u_uid ) => {
  const friends = [];
  const defaults = ['9axfWVP9tGPM0ojhqGIq2ytd18l2', 'DtDkNYyJYNZdT5o4wUmgBBnvh3I2', 'KGOsPZBVdnQWNPEMX95cPkHThN82', 'XSfkuy1YqoRupDcq7Cm0bf2T34w1', 'YOqcYN5EAwTfAKvfg6flpg056TF3', 'ZSYD5pogOQO0SLZaJeEfzv0wTqZ2', 'qHmVFdBIi7Oj4LbFwlccsJSleea2', 's9T3AobqH2bsMWPoTdojire6Wm22']
  let i = 0
  while(i < defaults.length){
    if( ( defaults[i] !== u_uid ) && ( await isUserFriend(u_uid, defaults[i]) === null ) ){
      //console.log('adding to friends')
      let friend = await getUser( defaults[i] )
      friends.push(friend)
    }
    i++
    if(friends.length > 2){
      break;
    }
  }
  return friends
}

/**
 * Returns null if friend id exists in user's friend list
 * @param {*} u_uid user id
 * @param {*} f_uid friend id
 */
export const isUserFriend = async ( u_uid, f_uid ) => {
  try {
    let friend_ref = getRef(`friends/${u_uid}`, f_uid )
    let res = await get( friend_ref )
    //console.log('res in isUserFriend for ', f_uid, '-', res.val())
    return res.val()
  } catch (error) {
    //console.error("isUserFriend Error", error)
  }
}

/**
 * Adds friend uid to the user uid on a joint collection
 * Also adds its reverse
 * @param {*} friend 
 * @param {*} user 
 */
  export const addFriendToUser = async (friend, user) => {
    //console.log('in add friend to user', friend, "**", user)
    const u_Ref = getRef("friends", user)
    const f_Ref = getRef("friends", friend)

    await update( u_Ref, {
      [friend]: true
    })
    await update( f_Ref, {
      [user]: true
    })
  }

  /**
   * Performs a partial and full text search -reason for using realtime db
   * @param {*} text search input
   * @returns 
   */
  export const searchMatchingFriends = async ( text, u_uid ) => {
    const results = []
    const db_Ref = getCollection("users")
    const snapshot = await get(query( db_Ref, ...[ orderByChild("displayName"), startAt(text), endAt(text + '\uf8ff'), limitToFirst(10) ] ))
    
    //filter out self
    snapshot.forEach( doc => { 
      if(doc.val().uid !== u_uid){
        results.push( doc.val() ) 
      }
    } )
   
    return results
  }


  export const getFriendsCollection = ( uid ) => {
    return getRef("friends", uid)
  }