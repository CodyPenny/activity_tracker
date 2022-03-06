import { getRef, performUpdate } from '../firebase/index.js'

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

