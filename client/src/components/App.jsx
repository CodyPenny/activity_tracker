import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BoxWrapper } from './styles/appStyles.js';

// Componenets 
import Landing from './landing/Landing.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import ForgotPassword from './auth/ForgotPassword.jsx';
import ResetConfirmation from './auth/ResetConfirmation.jsx';
import Home from './home/Home.jsx';
import EditProfile from './profile/EditProfile.jsx';
import SearchFriends from './search/SearchFriends.jsx';
import FriendPage from './friends/FriendPage.jsx';

const App = () => {
  
  return (
    <BoxWrapper 
      w={['100%','500px']} 
      h={'min(100vh, 850px)'}>
      <Router>
        <Routes>
          <Route path="/" element={<FriendPage />} />  
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="reset" element={<ForgotPassword/>} />
            <Route path="reset_confirmation" element={<ResetConfirmation/>}/>
            <Route path="home" element={<Home />} />
            <Route path="editProfile" element={<EditProfile/>} />
            {/* <Route path="friends" element={<FriendsHelper/>} /> */}
            <Route path="friends" element={<FriendPage/>} />
            <Route path="searchFriends" element={<SearchFriends/>} />  
        </Routes>
      </Router> 
    </BoxWrapper>
  );
};

export default App;
