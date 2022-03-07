import { getRef, performUpdate, getCollection, getDocsAsAList, db } from '../firebase/index.js'
import { getDocs, query, where, limit, onSnapshot, collection } from "firebase/firestore";
import { resetPasswordWithEmail } from './auth.js';


export const addFriend = async (UID, friendUID) => {
    if (!UID || !friendUID) return null;
  
    const uRef = getRef('users', UID);
    const fRef = getRef('users', friendUID);
  
    try {
      const fDoc = await fRef.get();
  
      if (fDoc.exists) {
        const uDoc = await uRef.get();
        const userUpdates = {
          friends: { ...{ [friendUID]: 1 }, ...uDoc.data().friends }
        };
        const friendUpdates = {
          friends: { ...{ [UID]: 1 }, ...fDoc.data().friends }
        };
  
        await Promise.all([
          performUpdate(uRef, userUpdates),
          performUpdate(fRef, friendUpdates)
        ]);
  
        return fDoc.data().displayName;
      }
  
      return false;
    } catch (error) {
      console.error('addFriend Error:', error);
      return 'addFriend Error';
    }
  };

  export const searchMatchingFriends = async ( text ) => {
    const friend_Ref = getCollection('users')
    const q = friend_Ref.orderByKey().startAt(text).endAt(text + '\uf8ff')
   // const q = query(friend_Ref, where("displayName", "startAt", text));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());

  }
