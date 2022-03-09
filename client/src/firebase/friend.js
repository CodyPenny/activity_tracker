import { getRef, performUpdate, getCollection, getDocsAsAList, db } from '../firebase/index.js'
import { query, ref, orderByChild, orderByKey, get, startAt, endAt, limitToFirst, set, onValue } from "firebase/database";
import { resetPasswordWithEmail } from './auth.js';



// export const addFriend = async (UID, friendUID) => {
//     if (!UID || !friendUID) return null;
  
//     const uRef = getRef('users', UID);
//     const fRef = getRef('users', friendUID);
  
//     try {
//       const fDoc = await fRef.get();
  
//       if (fDoc.exists) {
//         const uDoc = await uRef.get();
//         const userUpdates = {
//           friends: { ...{ [friendUID]: 1 }, ...uDoc.data().friends }
//         };
//         const friendUpdates = {
//           friends: { ...{ [UID]: 1 }, ...fDoc.data().friends }
//         };
  
//         await Promise.all([
//           performUpdate(uRef, userUpdates),
//           performUpdate(fRef, friendUpdates)
//         ]);
  
//         return fDoc.data().displayName;
//       }
  
//       return false;
//     } catch (error) {
//       console.error('addFriend Error:', error);
//       return 'addFriend Error';
//     }
//   };

/**
 * Adds friend uid to the user uid on a joint collection
 * Also adds its reverse
 * @param {*} friend 
 * @param {*} user 
 */
  export const addFriendToUser = async (friend, user) => {
    const u_Ref = getRef("friends", user)
    const f_Ref = getRef("friends", friend)

    await set( u_Ref, {
      [friend]: true
    })
    await set( f_Ref, {
      [user]: true
    })
  }

  /**
   * Performs a partial and full text search -reason for using realtime db
   * @param {*} text search input
   * @returns 
   */
  export const searchMatchingFriends = async ( text ) => {
    const results = []
    const db_Ref = getCollection("users")
    const snapshot = await get(query( db_Ref, ...[ orderByChild("displayName"), startAt(text), endAt(text + '\uf8ff'), limitToFirst(10) ] ))
    
    //TODO: filter out self
    snapshot.forEach( doc => { 
      results.push( doc.val() ) 
    } )
   
    return results

   // const q = query(friend_Ref, where("displayName", "startAt", text));
   // const snapshot = await getDocs(q);
    //return snapshot.docs.map(doc => doc.data());

  }


  export const getFriendsCollection = ( uid ) => {
    return getRef("friends", uid)
  }