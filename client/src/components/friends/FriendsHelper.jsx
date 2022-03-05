import React, { useContext } from 'react';
import { UserContext } from '../providers/UsersProvider';
import { ChallengeContext } from '../providers/ChallengeProvider.jsx';

// Components
import Friends from './Friends.jsx';

const FriendsHelper = () => {
  const user = useContext(UserContext);
  const challenge = useContext(ChallengeContext);

  return (
    <Friends
      user={user.uid}
      friends={Object.keys(user.friends)}
      CUID={challenge.CUID}
    />
  );
};

export default FriendsHelper;