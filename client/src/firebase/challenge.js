import { getRef, performUpdate } from '../firebase/index.js'

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